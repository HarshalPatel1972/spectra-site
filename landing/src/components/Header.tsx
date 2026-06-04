'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { text: 'The Quantum Threat', href: '/what-happens' },
    { text: 'Playground', href: '/playground' },
    { text: 'Docs', href: 'https://spectra-security-docs.vercel.app' },
    { text: 'Download', href: '/download' },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1280px] z-[100] flex items-center justify-between gap-4 pointer-events-none">
        <nav className="pointer-events-auto w-full md:w-auto h-[60px] flex items-center justify-between md:justify-start px-6 bg-[rgba(253,252,247,0.85)] backdrop-blur-[16px] border border-border-subtle shadow-card rounded-[var(--radius-xl)] gap-8">
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center no-underline">
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-4 list-none">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isExternal = item.href.startsWith('http');
              const linkClass = `block px-[14px] py-[6px] font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase no-underline rounded-[var(--radius-pill)] transition-colors duration-[120ms] ${
                isActive ? 'text-accent bg-raised' : 'text-text-secondary hover:text-text-primary hover:bg-raised'
              }`;

              return isExternal ? (
                <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.text}
                </a>
              ) : (
                <Link key={item.text} href={item.href} className={linkClass}>
                  {item.text}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-2 bg-transparent border-none"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-[2px] transition-transform duration-200 ${drawerOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-[2px] transition-opacity duration-200 ${drawerOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-[2px] transition-transform duration-200 ${drawerOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </nav>

        {/* Right actions (Buttons placed outside the pill but on the same plane) */}
        <div className="hidden md:flex items-center gap-3 shrink-0 pointer-events-auto">
          <a href="https://github.com/HarshalPatel1972/spectra" target="_blank" rel="noopener noreferrer"
            className="btn-secondary !py-[10px] !px-[20px] !text-[var(--body-xs)]"
          >
            Star on GitHub
          </a>
          <Link href="/download" className="btn-primary btn-hydrogen !py-[10px] !px-[20px] !text-[var(--body-xs)]">
            Get Started
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed top-[60px] left-0 right-0 bottom-0 bg-void z-[99] p-8 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col items-start gap-2">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              const linkClass = "font-mono text-[var(--body-md)] font-medium tracking-[0.04em] uppercase no-underline text-text-secondary hover:text-text-primary py-3 px-4 w-full";
              return isExternal ? (
                <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass} onClick={() => setDrawerOpen(false)}>
                  {item.text}
                </a>
              ) : (
                <Link key={item.text} href={item.href} className={linkClass} onClick={() => setDrawerOpen(false)}>
                  {item.text}
                </Link>
              );
            })}
          </div>
          <Link href="/download" className="btn-primary w-full justify-center" onClick={() => setDrawerOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </>
  )
}
