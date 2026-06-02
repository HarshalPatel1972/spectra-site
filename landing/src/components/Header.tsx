'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);

  const navItems = [
    { text: 'The Quantum Threat', href: '/what-happens', layoutId: 'bar-1', color: 'currentColor' },
    { text: 'Playground', href: '/playground', layoutId: 'bar-2', color: 'currentColor' },
    { text: 'Documentation', href: 'https://spectra-security-docs.vercel.app', layoutId: 'bar-3', color: '#2EC4C4' },
    { text: 'Download', href: '/download', layoutId: 'bar-4', color: 'currentColor' },
    { text: 'GitHub ↗', href: 'https://github.com/HarshalPatel1972/spectra', layoutId: 'bar-5', color: 'currentColor' },
  ];

  return (
    <header className="border-b border-border/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between relative">
        
        {/* Logo Section */}
        <div 
          onMouseEnter={() => setHasAnimated(true)} 
          className="relative z-20 flex items-center"
        >
          <Link href="/">
            <Logo isHovered={hasAnimated} />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex gap-8 text-[14px] font-medium text-text-secondary items-center h-full relative z-10">
          {navItems.map((item) => (
            <div key={item.text} className="relative flex items-center h-full">
              {item.href.startsWith('http') ? (
                <a href={item.href} className="hover:text-text-primary transition-colors py-4 flex items-center group">
                  <span className="relative">
                    {item.text}
                    {/* The flying underline with spiral animation */}
                    {hasAnimated && (
                      <motion.div 
                        layoutId={item.layoutId}
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: item.color === 'currentColor' ? '#E8EAF6' : item.color }}
                        animate={{ rotate: 720 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                      />
                    )}
                  </span>
                </a>
              ) : (
                <Link href={item.href} className="hover:text-text-primary transition-colors py-4 flex items-center group">
                  <span className="relative">
                    {item.text}
                    {/* The flying underline with spiral animation */}
                    {hasAnimated && (
                      <motion.div 
                        layoutId={item.layoutId}
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: item.color === 'currentColor' ? '#E8EAF6' : item.color }}
                        animate={{ rotate: 720 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                      />
                    )}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        
      </div>
    </header>
  )
}
