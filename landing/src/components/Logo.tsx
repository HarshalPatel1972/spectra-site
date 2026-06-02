'use client';

import { motion } from 'framer-motion';

export function Logo({ className = "", withText = true, isHovered = false }: { className?: string, withText?: boolean, isHovered?: boolean }) {
  
  const bars = [
    { id: 'bar-1', x: 2, y: 9.6, w: 2, h: 12.8, color: 'currentColor' },
    { id: 'bar-2', x: 8, y: 6.4, w: 2, h: 19.2, color: 'currentColor' },
    { id: 'bar-3', x: 14, y: 0, w: 2, h: 32, color: '#2EC4C4' },
    { id: 'bar-4', x: 20, y: 4, w: 2, h: 24, color: 'currentColor' },
    { id: 'bar-5', x: 26, y: 8, w: 2, h: 16, color: 'currentColor' },
  ];

  return (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      
      {/* HTML-based Logo for LayoutId Animation */}
      <div className="relative w-[32px] h-[32px] overflow-visible">
        {!isHovered && bars.map((bar) => (
          <motion.div 
            key={bar.id}
            layoutId={bar.id}
            className="absolute rounded-sm"
            style={{ 
              left: bar.x, 
              top: bar.y, 
              width: bar.w, 
              height: bar.h, 
              backgroundColor: bar.color === 'currentColor' ? '#E8EAF6' : bar.color 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        ))}
      </div>
      
      {/* The Wordmark */}
      {withText && (
        <span className="font-serif text-[18px] tracking-[0.05em] text-ink uppercase transition-colors duration-300 group-hover:text-brand">
          SPECTRA
        </span>
      )}
    </div>
  );
}
