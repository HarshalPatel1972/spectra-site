'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Header() {
  const navItems = [
    { text: 'The Quantum Threat', href: '/what-happens' },
    { text: 'Playground', href: '/playground' },
    { text: 'Documentation', href: 'https://spectra-security-docs.vercel.app' },
    { text: 'Download', href: '/download' },
    { text: 'GitHub ↗', href: 'https://github.com/HarshalPatel1972/spectra' },
  ];

  return (
    <header className="border-b border-border/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between relative">
        
        {/* Logo Section */}
        <div className="relative z-20 flex items-center">
          <Link href="/">
            <Logo />
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
                  </span>
                </a>
              ) : (
                <Link href={item.href} className="hover:text-text-primary transition-colors py-4 flex items-center group">
                  <span className="relative">
                    {item.text}
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
