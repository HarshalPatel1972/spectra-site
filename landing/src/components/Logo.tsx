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
      {/* Enterprise Cyan & White Mark (matches spectra-mark.svg) */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        {/* Bar 1 */}
        <motion.rect x="2" y="9.6" width="2" height="12.8" fill="currentColor" 
          custom={1} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* Bar 2 */}
        <motion.rect x="8" y="6.4" width="2" height="19.2" fill="currentColor" 
          custom={2} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* Bar 3 (Brand Cyan) */}
        <motion.rect x="14" y="0" width="2" height="32" fill="#2EC4C4" 
          custom={3} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* Bar 4 */}
        <motion.rect x="20" y="4" width="2" height="24" fill="currentColor" 
          custom={4} variants={barVariants} style={{ originY: 0.5 }} />
        
        {/* Bar 5 */}
        <motion.rect x="26" y="8" width="2" height="16" fill="currentColor" 
          custom={5} variants={barVariants} style={{ originY: 0.5 }} />
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
