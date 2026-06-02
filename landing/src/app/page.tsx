'use client'

import Link from 'next/link'
import { Logo } from '../components/Logo'
import { useEffect, useState } from 'react'

export default function Home() {
  const [qrsCount, setQrsCount] = useState(0);

  useEffect(() => {
    const duration = 400; // matching QRS materializer time conceptually
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Scan Reveal Line */}
      <div className="scan-reveal-line" />
      
      <div className="scan-reveal-content flex flex-col flex-1">
        
        {/* Header */}
        <header className="border-b border-border bg-void">
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
          <section className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-[45%] flex flex-col pt-12">
              <div className="text-[11px] font-sans font-semibold tracking-[0.12em] text-brand mb-6 uppercase">
                Cryptographic Intelligence Platform
              </div>
              <h1 className="flex flex-col text-[clamp(3.5rem,5.5vw,6rem)] leading-[1.1] tracking-[-0.02em] font-serif font-extrabold text-text-primary mb-8">
                When did SHA-1 appear in your repository?
              </h1>
              <p className="font-sans text-[1.125rem] text-text-secondary leading-[1.6] mb-10 max-w-lg">
                Not "do you use SHA-1?" Most engineers know they do. The harder question: which commit introduced it, who owns it, and what does replacing it cost? Spectra answers that question.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-[14px]">
                <div className="bg-surface-1 border border-border text-text-primary px-6 py-4 rounded-sm flex items-center font-mono">
                  <span className="text-text-muted mr-4">$</span> brew install harshalpatel1972/tap/spectra
                </div>
                <Link href="/playground" className="flex items-center justify-center px-6 py-4 border border-border text-text-primary font-sans font-medium hover:bg-surface-1 transition-colors">
                  Try in Browser →
                </Link>
              </div>
              <div className="mt-8 text-center sm:text-left text-[0.875rem] text-text-muted font-sans">
                No account. No telemetry. Open source under MIT.
              </div>
            </div>
            
            {/* TERMINAL ANIMATION */}
            <div className="lg:w-[55%] w-full rounded-sm overflow-hidden shadow-2xl bg-surface-0 border border-border p-6 font-mono text-[13px] text-text-secondary leading-[1.5]">
              <div className="mb-4">
                <span className="text-text-muted">$ </span>
                <span className="text-text-primary">spectra scan .</span>
              </div>
              <div className="mb-4">▓▓░ Mapping cryptographic landscape...</div>
              
              <div className="flex gap-4 mb-6">
                <div className="text-critical font-bold w-20 shrink-0">CRITICAL</div>
                <div className="flex-1">
                  <div className="text-text-primary font-bold">RSA-2048 (×14)</div>
                  <div className="text-text-muted mb-1">src/auth/jwt.go:47 · src/auth/jwt.go:52 · pkg/crypto/sign.go:12 +11 more</div>
                  <div>Key size: 2048 bits · QRS: 90/100</div>
                  <div>Migration: MEDIUM → ML-KEM-1024 (FIPS 203)</div>
                  <div>Compliance: CNSA 2.0 exclusive use deadline Jan 2033 [6y 7m]</div>
                  <div>Introduced: commit a4f2c81 · alice@co.com · Mar 14, 2023</div>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="text-high font-bold w-20 shrink-0">HIGH</div>
                <div className="flex-1">
                  <div className="text-text-primary font-bold">ECDSA/P-256 (×7)</div>
                  <div className="text-text-muted mb-1">certs/api-server.pem · certs/internal-ca.pem +5 more</div>
                  <div>QRS: 85/100</div>
                  <div>Migration: HARD → Certificate chain re-issuance required</div>
                  <div>Compliance: CNSA 2.0 exclusive use deadline Jan 2033</div>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="text-medium font-bold w-20 shrink-0">MEDIUM</div>
                <div className="flex-1">
                  <div className="text-text-primary font-bold">AES-128 (×3)</div>
                  <div className="text-text-muted mb-1">config/tls.yaml:14 · config/db.yaml:8 · config/s3.yaml:22</div>
                  <div>QRS: 25/100 — Grover halves effective key size to 64 bits</div>
                  <div>Migration: EASY → Change key length to 256 bits</div>
                </div>
              </div>

              <div className="text-text-muted mb-2">──────────────────────────────────────────────────────────────</div>
              <div>QRS: <span className="qrs-materialize font-bold text-text-primary">{qrsCount}/100</span>    CPS: 31/100    CAI: 34/100</div>
              <div>Compliance gaps: 47 (CNSA 2.0) · 3 (PCI DSS v4.0)</div>
              <div>Migration waves: 3    Estimated effort: 8 weeks (2 engineers)</div>
              <div>On track for CNSA 2.0 (applications): <span className="text-safe">✓ YES</span> — if migration starts Q3 2026</div>
              <div className="text-text-muted mt-2 mb-2">──────────────────────────────────────────────────────────────</div>
              <div>CBOM → ./spectra-out/spectra-cbom.json  [CycloneDX 1.7, 23 components]</div>
              <div>HTML → ./spectra-out/spectra-report.html</div>
            </div>
          </section>

          {/* STANDARDS SECTION */}
          <section className="text-center pt-24 border-t border-border">
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-bold text-text-primary mb-12">Every finding is grounded in published standards.</h2>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 font-sans text-[14px] text-text-secondary max-w-4xl mx-auto">
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">NIST FIPS 203</span><span>ML-KEM — Key Establishment</span></div>
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">NIST FIPS 204</span><span>ML-DSA — Digital Signatures</span></div>
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">NIST SP 800-131A Rev 2</span><span>Transition Requirements</span></div>
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">NSA CNSA 2.0</span><span>National Security Algorithm Suite</span></div>
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">PCI DSS v4.0</span><span>Req 4.2.1: Strong Cryptography</span></div>
              <div className="flex flex-col items-center"><span className="text-text-primary font-bold mb-1">CycloneDX 1.7</span><span>CBOM Specification</span></div>
            </div>
          </section>

          {/* TRUST SECTION */}
          <section className="border-t border-border pt-24 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans text-[1rem] leading-[1.6] text-text-primary">
              <div className="flex flex-col gap-4">
                <div className="h-8 w-8 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <p>Spectra has no telemetry. No accounts. No analytics. Your code never leaves your machine during a local scan. The playground API deletes submitted code within 60 seconds.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-8 w-8 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <p>We scan Spectra itself. Our own QRS is 8/100. <a href="https://github.com/HarshalPatel1972/spectra" className="text-brand hover:text-brand-dim transition-colors font-medium">View our CBOM →</a></p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-8 w-8 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </div>
                <p>Every finding links to the specific NIST, NSA, or IETF document that defines it as a vulnerability. Not our opinion. The standard.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
