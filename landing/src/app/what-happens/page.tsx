'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

// Minimal custom SVGs matching Lucide stroke style (1.5px)
const Icons = {
  Payment: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
  ),
  VPN: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  ),
  Cert: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><path d="m10 15-1 4 1-1 1 1-1-4"></path></svg>
  ),
  Bank: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="12"></rect><polygon points="12 2 2 8 22 8 12 2"></polygon><line x1="8" y1="14" x2="8" y2="18"></line><line x1="16" y1="14" x2="16" y2="18"></line></svg>
  ),
  Auth: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
  ),
  API: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
  )
}

export default function WhatHappensPage() {
  const [stage, setStage] = useState(1);

  // Auto-progress through stages for the cinematic effect
  useEffect(() => {
    let timer: any;
    if (stage === 1) timer = setTimeout(() => setStage(2), 3000);
    else if (stage === 2) timer = setTimeout(() => setStage(3), 4000);
    else if (stage === 3) timer = setTimeout(() => setStage(4), 5000);
    
    return () => clearTimeout(timer);
  }, [stage]);

  const getLineColor = () => {
    if (stage === 1) return 'var(--color-brand)';
    if (stage === 2) return 'var(--color-critical)';
    if (stage >= 3) return 'var(--color-brand)';
    return 'var(--color-brand)';
  };

  const getLineClasses = () => {
    // Stage 1: Static
    // Stage 2: Danger (animates color)
    // Stage 3: Danger (static)
    // Stage 4: Safe (animates back to safe)
    return "transition-colors duration-[400ms] ease-in-out";
  };

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Scan Reveal Animation Line */}
      <div className="scan-reveal-line" />
      
      <div className="scan-reveal-content flex flex-col min-h-screen">
        <header className="border-b border-border bg-void">
          <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-text-secondary font-mono text-[14px] ml-4">/ the-quantum-threat</span>
            </Link>
            <nav className="hidden md:flex gap-8 text-[14px] font-medium text-text-secondary">
              <Link href="/what-happens" className="text-brand transition-colors font-semibold">The Quantum Threat</Link>
              <Link href="/playground" className="hover:text-text-primary transition-colors">Playground</Link>
              <a href="https://spectra-security-docs.vercel.app" className="hover:text-text-primary transition-colors">Documentation</a>
              <Link href="/download" className="hover:text-text-primary transition-colors">Download</Link>
            </nav>
            <div className="flex gap-6 items-center text-[14px]">
              <a href="https://github.com/HarshalPatel1972/spectra" className="text-text-secondary hover:text-text-primary transition-colors font-medium">GitHub ↗</a>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row relative">
          
          {/* Left panel: Narrative Text */}
          <div className="lg:w-1/3 p-12 lg:p-24 border-r border-border bg-surface-0 flex flex-col justify-center z-10">
            <div className="space-y-16">
              
              <div className={`transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-[11px] font-sans font-bold tracking-[0.12em] text-brand mb-4 uppercase">Act I — The World Changed</h2>
                <h3 className="font-serif text-[2rem] font-bold mb-4">The Cryptographic Foundation</h3>
                <p className="text-text-secondary text-[1rem] leading-relaxed">
                  RSA and ECC secure the world's infrastructure. Payments, VPNs, certificates, and APIs trust these math problems because classical computers cannot solve them in a human lifetime.
                </p>
              </div>

              <div className={`transition-opacity duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                <h2 className="text-[11px] font-sans font-bold tracking-[0.12em] text-critical mb-4 uppercase">Act II — And Nobody Noticed</h2>
                <h3 className="font-serif text-[2rem] font-bold mb-4">Shor's Algorithm</h3>
                <p className="text-text-secondary text-[1rem] leading-relaxed">
                  A cryptographically relevant quantum computer (CRQC) collapses the timeline. What took a billion years takes hours. The connections immediately turn hostile. The problem: nobody knows where all their RSA is deployed.
                </p>
              </div>

              <div className={`transition-opacity duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                <h2 className="text-[11px] font-sans font-bold tracking-[0.12em] text-brand mb-4 uppercase">Act III — The Instrument</h2>
                <h3 className="font-serif text-[2rem] font-bold mb-4">Discovery & Mapping</h3>
                <p className="text-text-secondary text-[1rem] leading-relaxed">
                  Spectra isolates and identifies every vulnerable primitive. It does not panic; it calculates. It generates a CycloneDX CBOM and assigns a precise Quantum Risk Score (QRS).
                </p>
              </div>

              <div className={`transition-opacity duration-1000 ${stage >= 4 ? 'opacity-100' : 'opacity-20'}`}>
                <h2 className="text-[11px] font-sans font-bold tracking-[0.12em] text-safe mb-4 uppercase">Act IV — The Path Forward</h2>
                <h3 className="font-serif text-[2rem] font-bold mb-4">PQC Migration</h3>
                <p className="text-text-secondary text-[1rem] leading-relaxed">
                  With full visibility, migration waves replace RSA with ML-KEM and ML-DSA, restoring cryptographic integrity ahead of the CNSA 2.0 mandate.
                </p>
              </div>

            </div>
          </div>

          {/* Right panel: Visualization */}
          <div className="lg:w-2/3 bg-void relative flex items-center justify-center p-12 overflow-hidden">
            
            {/* The Network SVG */}
            <div className="relative w-full max-w-[800px] aspect-square">
              
              {/* Connecting Paths */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {/* Center to nodes */}
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
                <line x1="50%" y1="50%" x2="10%" y2="50%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
                <line x1="50%" y1="50%" x2="90%" y2="50%" stroke={getLineColor()} strokeWidth="1.5" className={getLineClasses()} />
              </svg>

              {/* Nodes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-1 p-6 border border-border text-text-primary z-10 shadow-2xl">
                <Icons.Bank />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">Core API</div>
              </div>

              <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.Payment />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">Payments</div>
              </div>

              <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.VPN />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">Gateway</div>
              </div>

              <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.Cert />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">x509</div>
              </div>

              <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.Auth />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">JWT Auth</div>
              </div>

              <div className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.API />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">Microservice</div>
              </div>

              <div className="absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 bg-void p-4 border border-border text-text-primary z-10">
                <Icons.API />
                <div className="text-center mt-2 font-mono text-[10px] text-text-secondary uppercase">Microservice</div>
              </div>
              
              {/* Stage 3 Terminal Overlay */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-surface-0 border border-border p-6 shadow-2xl z-20 font-mono text-[12px] transition-all duration-700 ${stage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="text-text-muted mb-2">$ spectra scan .</div>
                <div className="text-critical mb-1">CRITICAL  RSA-2048 (×14)</div>
                <div className="text-text-primary mb-4 ml-24">Key size: 2048 bits · QRS: 90/100</div>
                <div className="text-high mb-1">HIGH      ECDSA/P-256 (×7)</div>
                <div className="text-text-primary mb-4 ml-24">QRS: 85/100</div>
                <div className="text-text-muted mt-4">──────────────────────────────</div>
                <div className="text-text-primary">QRS: <span className="qrs-materialize font-bold text-critical">83/100</span></div>
                <div className="text-text-primary mt-2">Generating migration plan: spectra simulate --to ML-KEM</div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
