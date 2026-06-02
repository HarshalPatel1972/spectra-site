'use client';

import { motion } from 'framer-motion';

export function Logo({ className = "", withText = true }: { className?: string, withText?: boolean }) {
  // Define variants for the continuous pulse animation
  const barVariants = {
    animate: (custom: number) => ({
      height: [16, 8, 16, 12, 16],
      opacity: [0.8, 1, 0.7, 1, 0.8],
      transition: {
        duration: 2 + custom * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * 0.2,
      }
    }),
    hover: {
      height: 16,
      opacity: 1,
      scaleY: 1.2,
      filter: "brightness(1.5) drop-shadow(0 0 4px currentColor)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
      whileHover="hover"
      initial="animate"
      animate="animate"
    >
      {/* The Emission Spectrum Mark */}
      <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        {/* Background bounding rect removed to let bars float freely */}
        
        {/* SAFE */}
        <motion.rect x="4" y="2" width="1" height="16" fill="#16A34A" 
          custom={1} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* LOW */}
        <motion.rect x="10" y="2" width="1" height="16" fill="#22C55E" 
          custom={2} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* MEDIUM */}
        <motion.rect x="20" y="2" width="2" height="16" fill="#FACC15" 
          custom={3} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* HIGH */}
        <motion.rect x="28" y="2" width="2" height="16" fill="#F97316" 
          custom={4} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* HIGH-CRITICAL boundary (Gradient) */}
        <defs>
          <linearGradient id="hc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <motion.rect x="36" y="2" width="3" height="16" fill="url(#hc-grad)" 
          custom={5} variants={barVariants} style={{ originY: 0.5, color: '#EF4444' }} />
        
        {/* CRITICAL */}
        <motion.rect x="43" y="2" width="3" height="16" fill="#EF4444" 
          custom={6} variants={barVariants} style={{ originY: 0.5 }} />
      </svg>
      
      {/* The Wordmark */}
      {withText && (
        <span className="font-serif text-[18px] tracking-[0.05em] text-ink uppercase transition-colors duration-300 group-hover:text-brand">
          SPECTRA
        </span>
      )}
    </motion.div>
  );
}
