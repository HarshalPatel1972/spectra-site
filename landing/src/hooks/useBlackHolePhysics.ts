import { useEffect } from 'react';
import { useLiquidStore } from '@/store/useLiquidStore';

export function useBlackHolePhysics() {
  useEffect(() => {
    // Collect all suckable elements on the page.
    // We target paragraphs, headers, list items, buttons, and specific targets.
    // We avoid generic 'div' or 'span' to prevent shattering layout containers.
    const rawElements = document.querySelectorAll('h1, h2, h3, h4, p, button, li, .suck-target, .feature-badge');
    const elements = Array.from(rawElements) as HTMLElement[];

    // Configuration
    const NAVBAR_BOTTOM = 76; // Physical bottom edge of the navbar
    const SUCK_DISTANCE = 250; // Start sucking 250px below the navbar
    const MAX_CAPACITY = elements.length || 1; 

    let animationFrameId: number;

    const loop = () => {
      let totalSuckedMass = 0;
      let dominantColor = '#1A1A1A'; // Default dark color

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        
        // Track the top edge of the element, not the center, so it never overshoots
        const elementTop = rect.top;

        if (elementTop < NAVBAR_BOTTOM + SUCK_DISTANCE) {
          // 0 = just entered suck zone, 1 = fully inside navbar
          let progress = (NAVBAR_BOTTOM + SUCK_DISTANCE - elementTop) / SUCK_DISTANCE;
          
          if (progress > 1) progress = 1;
          if (progress < 0) progress = 0;

          if (progress > 0) {
            totalSuckedMass += progress;

            // Black Hole Physics:
            // - Squeeze horizontally to 0.1x (looks like a spaghetti string)
            // - Stretch vertically to 2.5x
            // - Pull upwards just enough to hit the center of the navbar, NEVER overshoot.
            // - Fade to 0 by the time progress is 0.9.
            const scaleX = 1 - (progress * 0.9); 
            const scaleY = 1 + (progress * 1.5); 
            
            // Limit translateY so it never pulls the element higher than the navbar itself
            // At progress=1, we pull it up by max 60px
            const translateY = -(progress * 60); 
            
            const blur = progress * 16;
            
            // Aggressive fade out: completely invisible before it can overshoot
            const opacity = Math.max(0, 1 - (progress * 1.2));

            el.style.transform = `scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`;
            el.style.opacity = opacity.toString();
            el.style.filter = `blur(${blur}px)`;
            el.style.transition = 'none';

            const suckColor = el.getAttribute('data-suckcolor');
            if (suckColor && progress > 0.1) {
              dominantColor = suckColor;
            }
          }
        } else {
          // Reset elements outside the horizon to save memory and ensure they return if scrolled back down
          if (el.style.transform !== '') {
            el.style.transform = '';
            el.style.opacity = '1';
            el.style.filter = '';
            el.style.transition = '';
          }
        }
      }

      // Sync the total mass of the universe into the Navbar Liquid
      const fillLevel = Math.min(1, totalSuckedMass / MAX_CAPACITY);
      useLiquidStore.getState().setGlobalBlackHoleState(fillLevel, dominantColor);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
}
