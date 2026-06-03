'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { text: 'The Quantum Threat', href: '/what-happens' },
    { text: 'Playground', href: '/playground' },
    { text: 'Documentation', href: 'https://spectra-security-docs.vercel.app' },
    { text: 'Download', href: '/download' },
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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isExternal = item.href.startsWith('http');
            return (
              <div key={item.text} className="relative flex items-center h-full">
                {isExternal ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`hover:text-brand transition-colors py-4 flex items-center group ${isActive ? 'text-brand' : 'text-text-secondary'}`}>
                    <span className="relative">
                      {item.text}
                    </span>
                  </a>
                ) : (
                  <Link href={item.href} className={`hover:text-brand transition-colors py-4 flex items-center group ${isActive ? 'text-brand' : 'text-text-secondary'}`}>
                    <span className="relative">
                      {item.text}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
          
          <div className="ml-4 flex items-center gap-4">
            <ThemeToggle />
            <a href="https://github.com/HarshalPatel1972/spectra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface-1 hover:bg-surface-2 border border-border/80 shadow-[0_3px_0_var(--color-border)] active:shadow-[0_0px_0_var(--color-border)] active:translate-y-[3px] px-4 py-2 rounded-full text-[13px] font-bold text-text-primary transition-all duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Star us on GitHub
          </a>
          </div>
        </nav>
        
      </div>
    </header>
  )
}
