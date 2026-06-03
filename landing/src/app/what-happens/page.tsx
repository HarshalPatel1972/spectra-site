'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/Footer'

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
    if (stage === 1) return 'var(--color-accent)';
    if (stage === 2) return 'var(--color-critical)';
    if (stage >= 3) return 'var(--color-accent)';
    return 'var(--color-accent)';
  };

  const getLineClasses = () => {
    return "transition-colors duration-[400ms] ease-in-out";
  };

  return (
    <div className="flex flex-col min-h-screen bg-void text-text-primary">
      <main className="flex-1 pt-[60px] flex flex-col lg:flex-row relative z-10">
        
        {/* Left panel: Narrative Text */}
        <div className="w-full lg:w-[45%] lg:min-h-[calc(100vh-60px)] p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-border bg-deep flex flex-col justify-center">
          <div className="space-y-20 max-w-[600px] mx-auto w-full">
            
            <div className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="font-mono text-[var(--body-xs)] font-bold tracking-[0.06em] text-text-secondary mb-4 uppercase">Act I — The World Changed</h2>
              <h3 className="display-xl mb-6">THE CRYPTOGRAPHIC<br/><span className="text-accent">FOUNDATION</span></h3>
              <p className="text-text-secondary text-[var(--body-lg)] leading-[1.6]">
                RSA and ECC secure the world's infrastructure. Payments, VPNs, certificates, and APIs trust these math problems because classical computers cannot solve them in a human lifetime.
              </p>
            </div>

            <div className={`transition-all duration-1000 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'}`}>
              <h2 className="font-mono text-[var(--body-xs)] font-bold tracking-[0.06em] text-critical mb-4 uppercase">Act II — And Nobody Noticed</h2>
              <h3 className="display-xl mb-6 text-critical">SHOR'S<br/>ALGORITHM</h3>
              <p className="text-text-secondary text-[var(--body-lg)] leading-[1.6]">
                A cryptographically relevant quantum computer (CRQC) collapses the timeline. What took a billion years takes hours. The connections immediately turn hostile. The problem: nobody knows where all their RSA is deployed.
              </p>
            </div>

            <div className={`transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'}`}>
              <h2 className="font-mono text-[var(--body-xs)] font-bold tracking-[0.06em] text-accent mb-4 uppercase">Act III — The Instrument</h2>
              <h3 className="display-xl mb-6">DISCOVERY<br/>& MAPPING</h3>
              <p className="text-text-secondary text-[var(--body-lg)] leading-[1.6]">
                Spectra isolates and identifies every vulnerable primitive. It does not panic; it calculates. It generates a CycloneDX CBOM and assigns a precise Quantum Risk Score (QRS).
              </p>
            </div>

            <div className={`transition-all duration-1000 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'}`}>
              <h2 className="font-mono text-[var(--body-xs)] font-bold tracking-[0.06em] text-safe mb-4 uppercase">Act IV — The Path Forward</h2>
              <h3 className="display-xl mb-6 text-safe">PQC<br/>MIGRATION</h3>
              <p className="text-text-secondary text-[var(--body-lg)] leading-[1.6]">
                With full visibility, migration waves replace RSA with ML-KEM and ML-DSA, restoring cryptographic integrity ahead of the CNSA 2.0 mandate.
              </p>
            </div>

          </div>
        </div>

        {/* Right panel: Visualization */}
        <div className="w-full lg:w-[55%] lg:min-h-[calc(100vh-60px)] bg-void relative flex flex-col items-center justify-center p-8 lg:p-20 overflow-hidden section-grid-bg">
          
          {/* The Network SVG */}
          <div className="relative w-full max-w-[800px] aspect-square lg:aspect-auto lg:h-[800px]">
            
            {/* Connecting Paths */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* Center to nodes */}
              <line x1="50%" y1="50%" x2="20%" y2="20%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
              <line x1="50%" y1="50%" x2="20%" y2="80%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
              <line x1="50%" y1="50%" x2="80%" y2="80%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
              <line x1="50%" y1="50%" x2="10%" y2="50%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
              <line x1="50%" y1="50%" x2="90%" y2="50%" stroke={getLineColor()} strokeWidth="2" className={getLineClasses()} opacity="0.6" />
            </svg>

            {/* Nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-high p-6 border border-border text-text-primary z-10 shadow-[var(--shadow-float)] rounded-[var(--radius-lg)]">
              <Icons.Bank />
              <div className="text-center mt-3 font-mono text-[10px] text-accent uppercase tracking-widest font-bold">Core API</div>
            </div>

            <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.Payment />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">Payments</div>
            </div>

            <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.VPN />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">Gateway</div>
            </div>

            <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.Cert />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">x509</div>
            </div>

            <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.Auth />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">JWT Auth</div>
            </div>

            <div className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.API />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">Service A</div>
            </div>

            <div className="absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 bg-raised p-4 border border-border text-text-secondary hover:text-text-primary transition-colors z-10 rounded-[var(--radius-md)]">
              <Icons.API />
              <div className="text-center mt-2 font-mono text-[10px] uppercase tracking-widest">Service B</div>
            </div>
            
            {/* Stage 3 Terminal Overlay */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-40px)] max-w-[500px] z-20 transition-all duration-700 ${stage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="terminal !mx-0">
                <div className="terminal-titlebar">
                  <div className="traffic-lights">
                    <div className="traffic-light red" />
                    <div className="traffic-light amber" />
                    <div className="traffic-light green" />
                  </div>
                  <span className="terminal-filename">spectra — bash</span>
                </div>
                <div className="terminal-body">
                  <div className="line"><span className="t-cmd">$</span> <span className="t-path">spectra scan</span> <span className="t-flag">.</span></div>
                  <div className="line"><span className="t-crit">CRITICAL</span>  <span className="t-file">RSA-2048</span>  <span className="t-file">(×14)</span>          <span className="t-label">QRS:</span> <span className="t-num">90</span></div>
                  <div className="line"><span className="t-high">HIGH    </span>  <span className="t-file">ECDSA/P-256</span> <span className="t-file">(×7)</span>         <span className="t-label">QRS:</span> <span className="t-num">85</span></div>
                  <div className="line t-sep">──────────────────────────────────────────────────────────────</div>
                  <div className="line"><span className="t-label">QRS:</span> <span className="t-crit">83/100</span></div>
                  <div className="line mt-2 text-text-secondary">Generating migration plan: spectra simulate --to ML-KEM</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
