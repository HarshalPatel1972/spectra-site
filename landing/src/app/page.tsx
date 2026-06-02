'use client'

import Link from 'next/link'
import { Logo } from '../components/Logo'
import { useEffect, useState } from 'react'

export default function Home() {
  const [qrsCount, setQrsCount] = useState(0);
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    // QRS Materializer
    const duration = 400; 
    const target = 83;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    
    function update(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      setQrsCount(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    
    const timer = setTimeout(() => {
      requestAnimationFrame(update);
    }, 1200); // Trigger after terminal starts printing

    // Terminal Staggered Reveal
    const steps = [
      setTimeout(() => setTerminalStep(1), 500),  // scanning...
      setTimeout(() => setTerminalStep(2), 1000), // critical finding
      setTimeout(() => setTerminalStep(3), 1500), // high finding
      setTimeout(() => setTerminalStep(4), 2000), // medium finding
      setTimeout(() => setTerminalStep(5), 2500)  // summary
    ];

    return () => {
      clearTimeout(timer);
      steps.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Enterprise Background Layer */}
      <div className="bg-grid absolute inset-0 z-0 pointer-events-none" />
      <div className="hero-glow z-0 pointer-events-none" />

      {/* Scan Reveal Line */}
      <div className="scan-reveal-line" />
      
      <div className="scan-reveal-content flex flex-col flex-1 z-10 relative">
        
        {/* Header */}
        <header className="border-b border-border/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
            <Logo />
            <nav className="flex gap-8 text-[14px] font-medium text-text-secondary">
              <Link href="/what-happens" className="hover:text-text-primary transition-colors">The Quantum Threat</Link>
              <Link href="/playground" className="hover:text-text-primary transition-colors">Playground</Link>
              <a href="/docs" className="hover:text-text-primary transition-colors">Documentation</a>
            </nav>
            <div className="flex gap-6 items-center text-[14px]">
              <a href="https://github.com/HarshalPatel1972/spectra" className="text-text-secondary hover:text-text-primary transition-colors font-medium">GitHub ↗</a>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-8 py-24 space-y-32 flex-1 w-full">
          
          {/* HERO SECTION */}
          <section className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-[45%] flex flex-col">
              <div className="text-[11px] font-sans font-semibold tracking-[0.12em] text-brand mb-6 uppercase flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand/50"></span>
                Cryptographic Intelligence Platform
              </div>
              <h1 className="flex flex-col text-[clamp(3rem,5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] font-serif font-extrabold text-text-primary mb-6 drop-shadow-sm">
                When did SHA-1 appear in your repository?
              </h1>
              <p className="font-sans text-[1.125rem] text-text-secondary leading-[1.6] mb-10 max-w-lg">
                Not "do you use SHA-1?" Most engineers know they do. The harder question: which commit introduced it, who owns it, and what does replacing it cost? Spectra answers that question.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-[14px]">
                <div 
                  className="bg-surface-0/50 backdrop-blur-sm border border-border/80 hover:border-brand/40 text-text-primary px-6 py-4 rounded-md flex items-center font-mono cursor-copy transition-all group"
                  onClick={() => navigator.clipboard.writeText('brew install harshalpatel1972/tap/spectra')}
                >
                  <span className="text-brand mr-4 group-hover:text-brand-dim transition-colors">$</span> 
                  <span>brew install harshalpatel1972/tap/spectra</span>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>
                <Link href="/playground" className="flex items-center justify-center px-8 py-4 rounded-md bg-brand/10 border border-brand/30 text-brand font-sans font-semibold hover:bg-brand/20 hover:border-brand/50 transition-all shadow-[0_0_20px_rgba(46,196,196,0.15)]">
                  Try in Browser →
                </Link>
              </div>
              <div className="mt-8 text-center sm:text-left text-[0.875rem] text-text-muted font-sans flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                No account. No telemetry. Open source under MIT.
              </div>
            </div>
            
            {/* TERMINAL UI */}
            <div className="lg:w-[55%] w-full rounded-xl overflow-hidden terminal-shadow bg-surface-0 border border-border/80 backdrop-blur-xl">
              {/* Terminal Header */}
              <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                </div>
                <div className="font-mono text-[11px] text-text-muted absolute left-1/2 -translate-x-1/2">
                  spectra — bash — 80x24
                </div>
                <div></div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-[13px] text-text-secondary leading-[1.6] h-[480px] overflow-hidden">
                <div className="mb-4">
                  <span className="text-brand">$ </span>
                  <span className="text-text-primary">spectra scan .</span>
                </div>
                
                <div className={`transition-opacity duration-300 ${terminalStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mb-6 flex items-center gap-2">
                    <span className="animate-pulse text-brand">▓▓░</span> 
                    Mapping cryptographic landscape...
                  </div>
                </div>
                
                <div className={`transition-all duration-500 transform ${terminalStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex gap-4 mb-6`}>
                  <div className="text-critical font-bold w-20 shrink-0">CRITICAL</div>
                  <div className="flex-1">
                    <div className="text-text-primary font-bold">RSA-2048 (×14)</div>
                    <div className="text-text-muted mb-1 text-[12px]">src/auth/jwt.go:47 · pkg/crypto/sign.go:12 +12 more</div>
                    <div>Key size: 2048 bits · QRS: 90/100</div>
                    <div>Migration: MEDIUM → ML-KEM-1024 (FIPS 203)</div>
                    <div className="text-text-muted">Introduced: commit a4f2c81 · Mar 14, 2023</div>
                  </div>
                </div>

                <div className={`transition-all duration-500 transform ${terminalStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex gap-4 mb-6`}>
                  <div className="text-high font-bold w-20 shrink-0">HIGH</div>
                  <div className="flex-1">
                    <div className="text-text-primary font-bold">ECDSA/P-256 (×7)</div>
                    <div className="text-text-muted mb-1 text-[12px]">certs/api-server.pem +6 more</div>
                    <div>QRS: 85/100</div>
                    <div>Migration: HARD → Certificate chain re-issuance</div>
                  </div>
                </div>

                <div className={`transition-all duration-500 transform ${terminalStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex gap-4 mb-6`}>
                  <div className="text-medium font-bold w-20 shrink-0">MEDIUM</div>
                  <div className="flex-1">
                    <div className="text-text-primary font-bold">AES-128 (×3)</div>
                    <div className="text-text-muted mb-1 text-[12px]">config/tls.yaml:14 +2 more</div>
                    <div>QRS: 25/100 — Grover halves effective key</div>
                  </div>
                </div>

                <div className={`transition-all duration-500 transform ${terminalStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="text-border/50 mb-3 border-t border-dashed w-full"></div>
                  <div className="bg-surface-1/50 p-3 rounded-md border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>QRS: <span className="qrs-materialize font-bold text-critical text-[14px]">{qrsCount}/100</span></div>
                      <div className="text-text-muted">CPS: 31/100</div>
                      <div className="text-text-muted">CAI: 34/100</div>
                    </div>
                    <div>Compliance gaps: <span className="text-text-primary font-medium">47</span> (CNSA 2.0)</div>
                    <div className="text-[12px] text-text-muted mt-2">CBOM → ./spectra-out/spectra-cbom.json</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STANDARDS SECTION */}
          <section className="text-center pt-24 border-t border-border/50">
            <h2 className="font-serif text-[clamp(1.75rem,2.5vw,2.5rem)] font-bold text-text-primary mb-12">Every finding is grounded in published standards.</h2>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 font-sans text-[14px] text-text-secondary max-w-4xl mx-auto">
              {[
                { title: "NIST FIPS 203", desc: "ML-KEM — Key Establishment" },
                { title: "NIST FIPS 204", desc: "ML-DSA — Digital Signatures" },
                { title: "NIST SP 800-131A", desc: "Transition Requirements" },
                { title: "NSA CNSA 2.0", desc: "National Security Algorithm Suite" },
                { title: "PCI DSS v4.0", desc: "Req 4.2.1: Strong Cryptography" },
                { title: "CycloneDX 1.7", desc: "CBOM Specification" }
              ].map((std, i) => (
                <div key={i} className="flex flex-col items-center group cursor-default">
                  <span className="text-text-primary font-bold mb-1 group-hover:text-brand transition-colors">{std.title}</span>
                  <span className="text-[13px]">{std.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TRUST SECTION */}
          <section className="border-t border-border/50 pt-24 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans text-[1rem] leading-[1.6] text-text-secondary">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-12 h-12 bg-brand/10 border border-brand/20 items-center justify-center rounded-xl text-brand shadow-[0_0_15px_rgba(46,196,196,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <p>Spectra has <strong className="text-text-primary font-medium">no telemetry</strong>. No accounts. No analytics. Your code never leaves your machine during a local scan. The API deletes submitted code immediately.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-12 h-12 bg-brand/10 border border-brand/20 items-center justify-center rounded-xl text-brand shadow-[0_0_15px_rgba(46,196,196,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <p>We scan Spectra itself. Our own QRS is 8/100. <br/><a href="https://github.com/HarshalPatel1972/spectra" className="text-brand hover:text-brand-dim transition-colors font-semibold mt-2 inline-block">View our CBOM &rarr;</a></p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-12 h-12 bg-brand/10 border border-brand/20 items-center justify-center rounded-xl text-brand shadow-[0_0_15px_rgba(46,196,196,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </div>
                <p>Every finding links to the specific NIST, NSA, or IETF document that defines it as a vulnerability. Not our opinion. <strong className="text-text-primary font-medium">The standard.</strong></p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
