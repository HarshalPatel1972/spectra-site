'use client'

import Link from 'next/link'
import { Logo } from '../components/Logo'
import { HeroHolograms } from '../components/HeroHolograms'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

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
      setTimeout(() => setTerminalStep(2), 1200), // critical finding
      setTimeout(() => setTerminalStep(3), 1900), // high finding
      setTimeout(() => setTerminalStep(4), 2600), // medium finding
      setTimeout(() => setTerminalStep(5), 3300)  // summary
    ];

    return () => {
      clearTimeout(timer);
      steps.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Enterprise Background Layer */}
      <div className="hero-glow z-0 pointer-events-none" />

      {/* Scan Reveal Line */}
      <div className="scan-reveal-line" />
      
      <div className="scan-reveal-content flex flex-col flex-1 z-10 relative">
        
        {/* Header */}
        

        <main className="max-w-[1200px] mx-auto px-8 py-32 space-y-40 flex-1 w-full z-10 relative">
          
          {/* V2 HERO SECTION (Centered) */}
          <section className="flex flex-col items-center text-center relative z-20">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[12px] font-sans font-bold tracking-[0.2em] text-brand mb-8 uppercase flex items-center gap-4 bg-brand/5 border border-brand/20 px-6 py-2 rounded-full backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
              The Standard in Cryptographic Intelligence
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[clamp(3rem,6vw,6.5rem)] leading-[1.05] tracking-[-0.03em] font-serif font-extrabold text-gradient mb-8 max-w-5xl"
            >
              When did SHA-1 appear in your <span className="text-gradient-brand">repository?</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-[1.25rem] text-text-secondary leading-[1.6] mb-12 max-w-3xl"
            >
              Not "do you use SHA-1?" Most engineers know they do. The harder question: which commit introduced it, who owns it, and what does replacing it cost? Spectra answers that question in milliseconds.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/download" className="btn-premium btn-premium-brand w-full sm:w-auto">
                Download Spectra
              </Link>
              <div 
                className="btn-premium btn-premium-outline font-mono cursor-copy group w-full sm:w-auto"
                onClick={() => navigator.clipboard.writeText('brew install harshalpatel1972/tap/spectra')}
              >
                <span className="text-brand mr-3 group-hover:text-brand-dim transition-colors">$</span> 
                brew install harshalpatel1972/tap/spectra
              </div>
            </motion.div>
            
          </section>

          {/* V2 TERMINAL UI (Glassmorphic) */}
          <section className="relative z-10 w-full mt-24">
            <motion.div 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 25, delay: 0.5 }}
              className="glass-panel rounded-2xl overflow-hidden terminal-shadow relative"
            >
              {/* Glossy Mac-like Header */}
              <div className="h-12 bg-white/[0.03] border-b border-white/5 flex items-center px-6 justify-between shrink-0 relative backdrop-blur-sm">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                </div>
                <div className="font-mono text-[12px] text-text-muted absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  spectra-scan
                </div>
                <div></div>
              </div>

              {/* Terminal Content - Gradient fade at bottom using mask-image */}
              <div className="p-8 font-mono text-[14px] text-text-secondary leading-[1.7] h-[500px] overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}>
                <div className="mb-6">
                  <span className="text-brand">$ </span>
                  <span className="text-white font-medium">spectra scan .</span>
                </div>
                
                <div className={`transition-opacity duration-300 ${terminalStep >= 1 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <div className="mb-8 flex items-center gap-3">
                    <span className="animate-pulse text-brand">▓▓░</span> 
                    Mapping cryptographic landscape...
                  </div>
                </div>
                
                <div className={`transition-all duration-500 transform ${terminalStep >= 2 ? 'opacity-100 translate-y-0 h-auto mb-8' : 'opacity-0 translate-y-4 h-0 mb-0 overflow-hidden'} flex gap-6`}>
                  <div className="text-critical font-bold w-24 shrink-0 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    CRITICAL
                  </div>
                  <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-lg">
                    <div className="text-white font-bold text-[15px] mb-1">RSA-2048 (×14)</div>
                    <div className="text-text-muted mb-3 text-[13px] bg-black/20 p-2 rounded">src/auth/jwt.go:47 · pkg/crypto/sign.go:12 +12 more</div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span>Key size: 2048 bits</span>
                      <span className="text-critical font-bold bg-critical/10 px-2 py-0.5 rounded">QRS: 90/100</span>
                    </div>
                    <div className="mt-2 text-white/60">Migration: MEDIUM → ML-KEM-1024 (FIPS 203)</div>
                    <div className="text-text-muted mt-1">Introduced: commit a4f2c81 · Mar 14, 2023</div>
                  </div>
                </div>

                <div className={`transition-all duration-500 transform ${terminalStep >= 3 ? 'opacity-100 translate-y-0 h-auto mb-8' : 'opacity-0 translate-y-4 h-0 mb-0 overflow-hidden'} flex gap-6`}>
                  <div className="text-high font-bold w-24 shrink-0 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    HIGH
                  </div>
                  <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-lg">
                    <div className="text-white font-bold text-[15px] mb-1">ECDSA/P-256 (×7)</div>
                    <div className="text-text-muted mb-3 text-[13px] bg-black/20 p-2 rounded">certs/api-server.pem +6 more</div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span>Algorithm Type: Elliptic Curve</span>
                      <span className="text-high font-bold bg-high/10 px-2 py-0.5 rounded">QRS: 85/100</span>
                    </div>
                    <div className="mt-2 text-white/60">Migration: HARD → Certificate chain re-issuance</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </section>

          {/* THE TOOLCHAIN (Bento Box Grid) */}
          <section className="pt-32 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold text-gradient mb-6">The Spectra Toolchain</h2>
              <p className="text-text-secondary text-[1.25rem] max-w-2xl mx-auto">A unified suite designed to map, score, and remediate cryptographic risk across the entire software development lifecycle.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* CLI (Spans 2 columns) */}
              <div className="glass-panel p-10 rounded-2xl hover:border-brand/30 transition-all duration-300 group lg:col-span-2 flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors"></div>
                <div>
                  <div className="w-12 h-12 bg-white/5 text-brand rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand group-hover:text-void transition-colors shadow-lg shadow-black/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Spectra CLI</h3>
                  <p className="text-text-secondary text-[16px] leading-relaxed max-w-md">The core scanning engine. Runs locally in milliseconds. Generates CBOMs, calculates QRS, and integrates seamlessly into shell scripts and local dev environments.</p>
                </div>
                <div className="mt-8 font-mono text-[13px] text-text-muted bg-black/30 p-3 rounded-lg border border-white/5 inline-block self-start">
                  $ spectra scan ./src
                </div>
              </div>

              {/* CI (Spans 1 column) */}
              <div className="glass-panel p-10 rounded-2xl hover:border-brand/30 transition-all duration-300 group lg:col-span-1 flex flex-col relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors"></div>
                <div className="w-12 h-12 bg-white/5 text-brand rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand group-hover:text-void transition-colors shadow-lg shadow-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Spectra CI</h3>
                <p className="text-text-secondary text-[16px] leading-relaxed">Automated pull request scanning. Blocks the merging of new vulnerable cryptographic primitives natively in GitHub.</p>
              </div>

              {/* VS Code (Spans 1 column) */}
              <div className="glass-panel p-10 rounded-2xl hover:border-brand/30 transition-all duration-300 group lg:col-span-1 flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 bg-white/5 text-brand rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand group-hover:text-void transition-colors shadow-lg shadow-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">VS Code</h3>
                <p className="text-text-secondary text-[16px] leading-relaxed">Inline cryptographic risk analysis as you type. Get immediate feedback and migration recommendations before you commit.</p>
              </div>

              {/* Action (Spans 2 columns) */}
              <div className="glass-panel p-10 rounded-2xl hover:border-brand/30 transition-all duration-300 group lg:col-span-2 flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 group-hover:bg-brand/10 transition-colors"></div>
                <div>
                  <div className="w-12 h-12 bg-white/5 text-brand rounded-xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand group-hover:text-void transition-colors shadow-lg shadow-black/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Spectra Action</h3>
                  <p className="text-text-secondary text-[16px] leading-relaxed max-w-md">The official GitHub Action. Perfect for dropping into existing CI/CD pipelines to generate CBOM artifacts and enforce compliance gates on every build.</p>
                </div>
                <div className="mt-8">
                  <Link href="/download" className="text-brand hover:text-white transition-colors font-bold flex items-center gap-2 text-[15px]">
                    Install Action <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
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
          <section className="border-t border-border/50 pt-24 pb-24">
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
        
        {/* BOTTOM CTA SECTION (GAMIFIED FLOATING DESIGN) */}
        <section className="bg-surface-0 border-t border-brand/20 relative py-32 flex flex-col items-center justify-center overflow-hidden">
          <HeroHolograms />
          <div className="z-10 text-center relative max-w-2xl mx-auto px-8">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold text-text-primary mb-6 drop-shadow-sm">
              Ready to secure your cryptography?
            </h2>
            <p className="font-sans text-[1.125rem] text-text-secondary leading-[1.6] mb-10">
              Join the teams using Spectra to map, score, and remediate cryptographic risk across their entire software development lifecycle.
            </p>
            <Link href="/download" className="btn-push btn-push-solid px-14 py-5 text-[16px]">
              GET STARTED
            </Link>
          </div>
        </section>

        {/* GLOBAL FOOTER */}
        <footer className="bg-surface-0 border-t border-border py-12">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-text-secondary text-[14px]">© 2026 Harshal Patel. MIT Licensed.</span>
            </div>
            <div className="flex gap-6 text-[14px] text-text-secondary">
              <a href="https://spectra-security-docs.vercel.app" className="hover:text-text-primary transition-colors">Documentation</a>
              <a href="https://github.com/HarshalPatel1972/spectra/blob/main/SECURITY.md" className="hover:text-text-primary transition-colors">Security</a>
              <a href="https://github.com/HarshalPatel1972/spectra/blob/main/PRIVACY.md" className="hover:text-text-primary transition-colors">Privacy</a>
              <a href="https://github.com/HarshalPatel1972/spectra" className="hover:text-text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
