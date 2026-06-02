'use client'

import Link from 'next/link'
import { Logo } from '../components/Logo'
import { useEffect, useState } from 'react'

export default function Home() {
  const [qrsCount, setQrsCount] = useState(0);

  useEffect(() => {
    const duration = 800; // --duration-count
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
    }, 1000); // delay before counting

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-ink font-sans">
      <div className="scan-line" />
      
      {/* Header */}
      <header className="border-b border-border-light bg-surface">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="flex gap-8 text-[14px] font-medium text-graphite">
            <Link href="/what-happens" className="hover:text-ink transition-colors">The Quantum Threat</Link>
            <Link href="/playground" className="hover:text-ink transition-colors">Playground</Link>
            <a href="https://github.com/HarshalPatel1972/spectra/tree/main/docs" className="hover:text-ink transition-colors">Documentation</a>
          </nav>
          <div className="flex gap-6 items-center text-[14px]">
            <a href="https://github.com/HarshalPatel1972/spectra" className="text-graphite hover:text-ink transition-colors font-medium">GitHub ↗</a>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-24 space-y-32">
        
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-[40%] flex flex-col pt-12">
            <h1 className="flex flex-col text-[61px] leading-[1.05] tracking-tight mb-8">
              <span className="font-serif font-light text-ink">Find every cipher.</span>
              <span className="font-serif font-light text-ink">Know your risk.</span>
              <span className="font-sans font-semibold text-calibration">Own your migration.</span>
            </h1>
            <p className="font-serif text-[20px] font-light text-graphite leading-relaxed mb-10 max-w-md">
              Spectra scans codebases, certificates, and dependencies for quantum-vulnerable cryptography. It generates CycloneDX 1.7 CBOMs, maps compliance gaps against CNSA 2.0 and NIST SP 800-131A, and produces a prioritized migration plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-[14px] font-mono">
              <div className="bg-void text-surface px-6 py-4 rounded-sm flex items-center">
                <span className="text-graphite mr-4">$</span> brew install harshalpatel1972/tap/spectra
              </div>
              <Link href="/playground" className="flex items-center px-6 py-4 border border-border-dark text-ink font-sans font-medium hover:bg-ghost transition-colors">
                → Try in Browser
              </Link>
            </div>
          </div>
          
          <div className="lg:w-[60%] w-full rounded-md overflow-hidden shadow-2xl bg-void p-6 font-mono text-[14px] text-graphite leading-relaxed">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#facc15] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e] opacity-80" />
            </div>
            <div>
              <span className="text-graphite">$ </span>
              <span className="text-surface">spectra scan ./myapp</span>
            </div>
            <div className="mt-2 mb-4">▓ Scanning 847 files in 12 packages...</div>
            <div className="space-y-1 mt-6 opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_1s_forwards]">
              <div><span className="text-critical">CRITICAL</span>  <span className="font-bold text-surface">RSA-2048</span>     auth/jwt.go:47              QRS: 90</div>
            </div>
            <div className="space-y-1 opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_1.1s_forwards]">
              <div><span className="text-critical">CRITICAL</span>  <span className="font-bold text-surface">RSA-2048</span>     pkg/crypto/key.go:12        QRS: 90</div>
            </div>
            <div className="space-y-1 opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_1.2s_forwards]">
              <div><span className="text-high">HIGH</span>      <span className="font-bold text-surface">SHA-1</span>        legacy/hash_util.go:91      QRS: 70</div>
            </div>
            <div className="space-y-1 opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_1.3s_forwards]">
              <div><span className="text-high">HIGH</span>      <span className="font-bold text-surface">ECDSA/P-256</span>  certs/api.pem               QRS: 85</div>
            </div>
            
            <div className="mt-6 border-t border-border-dark pt-4 opacity-0 animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_1.6s_forwards]">
              <div>Aggregate QRS: <span className="text-surface">83/100 — <span className="text-critical">CRITICAL</span></span></div>
              <div>Compliance: <span className="text-surface">47 gaps with CNSA 2.0</span></div>
              <div className="mt-4 text-surface">Run <span className="text-calibration-light">spectra simulate --from RSA --to ML-KEM</span> to generate your migration plan.</div>
            </div>
          </div>
        </section>

        {/* EVIDENCE SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: QRS */}
          <div className="bg-paper border border-border-light p-8 rounded-sm">
            <h3 className="text-[14px] text-graphite mb-6 font-medium uppercase tracking-wider">Quantum Risk Score</h3>
            <div className="font-mono text-[61px] tracking-tight leading-none text-ink mb-2">
              {qrsCount}<span className="text-graphite text-[31px]">/100</span>
            </div>
            <div className="text-critical font-medium text-[14px] mb-8 uppercase tracking-widest">— Critical</div>
            <div className="h-1 w-full qrs-bar mb-8" />
            <div className="space-y-3 font-mono text-[14px]">
              <div className="flex justify-between"><span className="text-graphite">CRITICAL findings</span><span className="text-ink">14</span></div>
              <div className="flex justify-between"><span className="text-graphite">HIGH findings</span><span className="text-ink">32</span></div>
              <div className="flex justify-between"><span className="text-graphite">MEDIUM findings</span><span className="text-ink">8</span></div>
            </div>
          </div>
          
          {/* Column 2: Terminal Output */}
          <div className="bg-void p-8 rounded-sm text-[14px] font-mono text-graphite overflow-x-auto shadow-inner">
            <div className="mb-4">
              <span className="text-graphite">$ </span>
              <span className="text-surface">spectra scan --code</span>
            </div>
            <div className="text-high mb-1">HIGH  SHA-1  user.go:12  QRS: 70</div>
            <div className="text-critical mb-1">CRIT  RSA    tls.pem     QRS: 90</div>
            <div className="text-medium mb-1">MED   AES    db.go:44    QRS: 45</div>
            <div className="text-safe mb-1">SAFE  ML-KEM auth.go:11  QRS: 0</div>
            <div className="mt-6 border-t border-border-dark pt-4">
              Found 4 ciphers.
            </div>
          </div>
          
          {/* Column 3: CBOM JSON */}
          <div className="bg-void p-8 rounded-sm text-[14px] font-mono text-graphite overflow-x-auto shadow-inner">
            <pre className="text-calibration-light opacity-80">{`{
  "bomFormat": "CycloneDX",
  "specVersion": "1.7",
  "components": [
    {
      "type": "cryptographic-asset",
      "name": "RSA-2048",
      "cryptoProperties": {
        "assetType": "algorithm",
        "algorithmProperties": {
          "primitive": "public-key",
          "executionEnvironment": "software"
        }
      }
    }
  ]
}`}</pre>
          </div>
        </section>

        {/* STANDARDS SECTION */}
        <section className="text-center">
          <h2 className="font-serif text-[25px] font-light text-ink mb-12">Every finding is grounded in published standards.</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 font-mono text-[14px] text-graphite max-w-4xl mx-auto">
            <div className="flex flex-col items-center"><span className="text-ink mb-1">NIST FIPS 203</span><span>ML-KEM — Key Establishment</span></div>
            <div className="flex flex-col items-center"><span className="text-ink mb-1">NIST FIPS 204</span><span>ML-DSA — Digital Signatures</span></div>
            <div className="flex flex-col items-center"><span className="text-ink mb-1">NIST SP 800-131A Rev 2</span><span>Transition Requirements</span></div>
            <div className="flex flex-col items-center"><span className="text-ink mb-1">NSA CNSA 2.0</span><span>National Security Algorithm Suite</span></div>
            <div className="flex flex-col items-center"><span className="text-ink mb-1">PCI DSS v4.0</span><span>Req 4.2.1: Strong Cryptography</span></div>
            <div className="flex flex-col items-center"><span className="text-ink mb-1">CycloneDX 1.7</span><span>CBOM Specification</span></div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="max-w-4xl mx-auto">
          <div className="overflow-x-auto border border-border-light bg-paper rounded-sm">
            <table className="w-full text-left text-[14px] font-sans">
              <thead className="border-b border-border-light text-graphite font-medium">
                <tr>
                  <th className="py-4 px-6 font-normal">Feature</th>
                  <th className="py-4 px-6 font-mono text-center">grep</th>
                  <th className="py-4 px-6 font-mono text-center">SCA tools</th>
                  <th className="py-4 px-6 font-mono text-center text-ink font-bold">Spectra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-ink">
                <tr><td className="py-3 px-6">Code-level detection</td><td className="py-3 px-6 text-center">✓</td><td className="py-3 px-6 text-center text-graphite">○</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">Certificate scanning</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">Dependency manifest scanning</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">Config file scanning</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">Quantum Risk Score (QRS)</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">CycloneDX 1.7 CBOM</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">CNSA 2.0 compliance gaps</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">Migration simulation</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center text-graphite">✗</td><td className="py-3 px-6 text-center">✓</td></tr>
                <tr><td className="py-3 px-6">No telemetry</td><td className="py-3 px-6 text-center">✓</td><td className="py-3 px-6 text-center text-graphite">○</td><td className="py-3 px-6 text-center">✓</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* INTEGRATION SECTION */}
        <section className="text-center pb-12">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[16px] text-ink font-medium font-sans mb-12">
            <span>GitHub Actions</span>
            <span className="text-border-light">·</span>
            <span>VS Code</span>
            <span className="text-border-light">·</span>
            <span>Docker</span>
            <span className="text-border-light">·</span>
            <span>Pre-commit</span>
            <span className="text-border-light">·</span>
            <span>GitLab CI</span>
            <span className="text-border-light">·</span>
            <span>JetBrains</span>
            <span className="text-border-light">·</span>
            <span>npm</span>
            <span className="text-border-light">·</span>
            <span>Homebrew</span>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="border-t border-border-light pt-24 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-sans text-[16px] leading-relaxed text-ink">
            <p>
              Spectra has no telemetry. No accounts. No analytics. Your code never leaves your machine during a local scan. The playground API deletes submitted code within 60 seconds.
            </p>
            <p>
              We scan Spectra itself. Our own QRS is 8/100. <a href="https://github.com/HarshalPatel1972/spectra" className="text-calibration hover:text-calibration-light transition-colors">View our CBOM →</a>
            </p>
            <p>
              Every finding links to the specific NIST, NSA, or IETF document that defines it as a vulnerability. Not our opinion. The standard.
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
