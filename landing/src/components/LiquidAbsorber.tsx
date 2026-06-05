'use client'

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLiquidStore } from '@/store/useLiquidStore';

interface LiquidAbsorberProps {
  children: React.ReactNode;
  color: string;
  className?: string;
  id?: string;
}

export function LiquidAbsorber({ children, color, className = '', id }: LiquidAbsorberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setLiquid = useLiquidStore(state => state.setLiquid);
  const resetLiquid = useLiquidStore(state => state.resetLiquid);

  // Track the element's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60px", "end 0px"] // 60px is the navbar height
  });

  // Linear absorption: 0 to 1 as it scrolls past the 60px boundary
  const absorbLevel = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Literal suck effect: squeeze horizontally, stretch vertically, pull up violently, and fade out
  const scaleX = useTransform(absorbLevel, [0, 1], [1, 0.4]);
  const scaleY = useTransform(absorbLevel, [0, 1], [1, 2.5]);
  const translateY = useTransform(absorbLevel, [0, 1], [0, -120]);
  const opacity = useTransform(absorbLevel, [0, 0.8, 1], [1, 1, 0]); // stays visible until the very end of the suck
  const filter = useTransform(absorbLevel, [0, 1], ['blur(0px)', 'blur(12px)']);

  // Sync to global store
  useEffect(() => {
    const unsubscribe = absorbLevel.onChange((latest) => {
      if (latest > 0.05) {
        setLiquid(color, latest);
      } else {
        // If we are scrolling away and this was the active color, reset
        const currentState = useLiquidStore.getState();
        if (currentState.liquidColor === color && latest <= 0.05) {
          resetLiquid();
        }
      }
    });
    return () => unsubscribe();
  }, [absorbLevel, color, setLiquid, resetLiquid]);

  return (
    <motion.div 
      ref={ref}
      className={className}
      id={id}
      style={{ 
        scaleX,
        scaleY, 
        y: translateY,
        opacity,
        filter,
        transformOrigin: "top center"
      }}
    >
      {children}
    </motion.div>
  );
}
