'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

export default function WhatHappensPage() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Cinematic timing sequence
    const timers = [
      setTimeout(() => setStage(1), 1000),  // The Threat
      setTimeout(() => setStage(2), 4000),  // The Timeline
      setTimeout(() => setStage(3), 7000),  // The Math
      setTimeout(() => setStage(4), 10000), // The Call to Action & Nav
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen bg-void text-surface font-sans flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Navigation chrome - appears only at the end */}
      <div 
        className={`absolute top-0 left-0 right-0 p-8 flex justify-between items-center transition-opacity duration-1000 ${
          stage >= 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Logo className="opacity-80" />
        <Link href="/" className="text-graphite hover:text-surface transition-colors font-medium">← Back</Link>
      </div>

      <main className="max-w-3xl mx-auto px-8 text-center space-y-16">
        
        <div className={`transition-all duration-1000 transform ${
          stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="font-serif text-[39px] font-light tracking-tight mb-4 text-surface">
            The earliest credible quantum threat window is 2030–2035.
          </h2>
          <p className="font-mono text-[14px] text-graphite uppercase tracking-widest">
            Shor's Algorithm / NSA CNSA 2.0
          </p>
        </div>

        <div className={`transition-all duration-1000 transform ${
          stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="font-serif text-[39px] font-light tracking-tight text-surface">
            The average enterprise cryptographic migration takes 3–5 years.
          </h2>
        </div>

        <div className={`transition-all duration-1000 transform ${
          stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="font-serif text-[48px] font-light text-critical tracking-tight">
            The math on that is uncomfortable.
          </h2>
        </div>

        <div className={`transition-all duration-1000 transform pt-12 ${
          stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link href="/" className="inline-flex items-center px-8 py-4 border border-border-dark text-surface font-sans font-medium hover:bg-[#111218] transition-colors">
            Find your cryptography →
          </Link>
        </div>

      </main>

    </div>
  )
}
