'use client'

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(`Scroll progress for ${color}: ${latest}`);
  });

  // Sync to global store
  useEffect(() => {
    const unsubscribe = absorbLevel.onChange((latest) => {
      // 4 is the total number of hero cards being sucked
      useLiquidStore.getState().updateElement(id || color, color, latest, 4);
    });
    return () => unsubscribe();
  }, [absorbLevel, color, id]);

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
      <motion.div 
        style={{ opacity: 1 }} 
        className="fixed top-20 right-20 bg-black text-white p-2 font-mono text-xs z-50 rounded"
      >
        {Math.round(absorbLevel.get() * 100)}%
      </motion.div>
    </motion.div>
  );
}
