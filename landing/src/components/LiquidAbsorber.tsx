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

  // Calculate absorption level (0 to 1)
  // When it hits 60px from top, it starts absorbing.
  // We use a spring to make it feel fluid and natural.
  const rawAbsorb = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const absorbLevel = useSpring(rawAbsorb, { stiffness: 100, damping: 20 });

  // Visual stretch effect for the "sucked in" look
  const scaleY = useTransform(absorbLevel, [0, 1], [1, 1.8]);
  const translateY = useTransform(absorbLevel, [0, 1], [0, -80]);
  const opacity = useTransform(absorbLevel, [0, 1], [1, 0]);
  const filter = useTransform(absorbLevel, [0, 1], ['blur(0px)', 'blur(10px)']);

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
