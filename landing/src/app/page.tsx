'use client'

import { motion } from 'framer-motion'
import { Terminal, Shield, ArrowRight, Activity, Globe, Database, Key, Server, Lock, GitBranch, Play } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [terminalStep, setTerminalStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep(prev => (prev < 6 ? prev + 1 : prev))
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/10 flex justify-between items-center px-8 py-4 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          Spectra
        </div>
        <nav className="flex gap-6 text-sm font-medium text-slate-300">
          <Link href="/what-happens" className="hover:text-white transition-colors">The Quantum Threat</Link>
          <a href="https://docs.spectra.tools" className="hover:text-white transition-colors">Documentation</a>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </nav>
        <div className="flex gap-4">
          <a href="https://github.com/HarshalPatel1972/spectra" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/10">
            <GitBranch className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            See every cipher.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Own your migration.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
            Spectra scans your codebases, certificates, and dependencies to find quantum-vulnerable cryptography — before it finds you.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold shadow-[0_0_20px_rgba(79,70,229,0.3)] cursor-pointer">
              <Terminal className="w-5 h-5" />
              <code className="text-sm">brew install spectra</code>
            </div>
            <Link href="/playground" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors font-semibold">
              <Play className="w-5 h-5" />
              Try in Browser
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500 font-medium">Used by engineers at forward-thinking organizations.</p>
        </div>

        {/* Terminal Animation */}
        <div className="rounded-xl border border-white/10 bg-black/60 shadow-2xl overflow-hidden backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 z-0" />
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 relative z-10">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-2 text-xs font-mono text-slate-500">spectra scan .</div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-slate-300 relative z-10 min-h-[380px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <span className="text-emerald-400">▶</span> spectra scan .
            </motion.div>
            
            {terminalStep >= 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-slate-500">▓ Scanning 1,247 files...</span>
              </motion.div>
            )}

            {terminalStep >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
                <div className="flex gap-4">
                  <span className="text-red-400 font-bold w-20">CRITICAL</span>
                  <span className="w-24 text-slate-200">RSA-2048</span>
                  <span className="w-48 truncate text-slate-400">auth/jwt.go:47</span>
                  <span className="text-slate-500">QRS: 90  → <span className="text-indigo-400">Replace with ML-KEM</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-red-400 font-bold w-20">CRITICAL</span>
                  <span className="w-24 text-slate-200">RSA-2048</span>
                  <span className="w-48 truncate text-slate-400">pkg/crypto/key.go:12</span>
                  <span className="text-slate-500">QRS: 90</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-orange-400 font-bold w-20">HIGH</span>
                  <span className="w-24 text-slate-200">SHA-1</span>
                  <span className="w-48 truncate text-slate-400">legacy/hash.go:91</span>
                  <span className="text-slate-500">QRS: 70  → <span className="text-indigo-400">Replace with SHA-256</span></span>
                </div>
              </motion.div>
            )}

            {terminalStep >= 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-2">
                <div className="flex gap-4">
                  <span className="text-orange-400 font-bold w-20">HIGH</span>
                  <span className="w-24 text-slate-200">ECDSA/P-256</span>
                  <span className="w-48 truncate text-slate-400">certs/api.pem</span>
                  <span className="text-slate-500">QRS: 85</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-yellow-400 font-bold w-20">MEDIUM</span>
                  <span className="w-24 text-slate-200">AES-128</span>
                  <span className="w-48 truncate text-slate-400">config/tls.yaml:14</span>
                  <span className="text-slate-500">QRS: 25  → <span className="text-indigo-400">Upgrade to AES-256</span></span>
                </div>
              </motion.div>
            )}

            {terminalStep >= 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 border-t border-slate-700/50 pt-4">
                <div className="text-slate-300">Aggregate QRS: <span className="text-red-400 font-bold">83/100 — CRITICAL</span></div>
                <div className="text-slate-400">Compliance: 47 gaps with CNSA 2.0 · 3 gaps with PCI DSS v4.0</div>
                <div className="text-slate-400">Action plan: 5 waves · Estimated 8 weeks · 2 engineers</div>
              </motion.div>
            )}

            {terminalStep >= 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 border-t border-slate-700/50 pt-4 text-slate-500">
                <div>CBOM generated → ./spectra-out/spectra-cbom.json</div>
                <div>HTML report  → ./spectra-out/spectra-report.html</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* The Gut Punch */}
      <section className="border-y border-white/10 bg-slate-900/50 py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 relative">
            <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
            
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Globe className="text-indigo-400" />
                The World Your Cryptography Protects
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Activity, label: "Payment processing APIs" },
                  { icon: Key, label: "Identity & Authentication tokens" },
                  { icon: Server, label: "VPN tunnels & Zero Trust boundaries" },
                  { icon: Database, label: "Encrypted internal data stores" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-red-400">
                <Lock className="text-red-400" />
                What a Quantum Computer Does to It
              </h3>
              <ul className="space-y-6 relative">
                {/* Red banner overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-red-500 text-white font-black text-2xl tracking-widest uppercase px-8 py-3 rotate-[-12deg] shadow-2xl border-2 border-red-400/50 backdrop-blur-sm bg-opacity-90">
                    Broken in Minutes
                  </div>
                </div>

                {[
                  { icon: Activity, label: "Payment processing APIs" },
                  { icon: Key, label: "Identity & Authentication tokens" },
                  { icon: Server, label: "VPN tunnels & Zero Trust boundaries" },
                  { icon: Database, label: "Encrypted internal data stores" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-slate-600 opacity-50 grayscale">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="line-through decoration-red-500/50">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              This is not a hypothetical. NSA&apos;s CNSA 2.0 requires post-quantum algorithms in new NSS systems by 2027 and exclusively by 2033. Most codebases have not started.
            </p>
            <Link href="/what-happens" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-lg transition-colors">
              See What Happens If Quantum Arrives Tomorrow
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-16 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Find', cmd: 'spectra scan ./myapp', desc: 'Discovers every algorithm in code, certificates, configs, dependencies' },
            { step: '2', title: 'Understand', cmd: 'spectra compliance --frameworks cnsa20', desc: 'Shows which findings violate which regulatory requirements, by when' },
            { step: '3', title: 'Act', cmd: 'spectra simulate --from RSA --to ML-KEM', desc: 'Shows the migration plan in ordered waves with effort estimates' }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-8 relative overflow-hidden">
              <div className="text-6xl font-black text-white/5 absolute -top-4 -right-2">{item.step}</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Step {item.step}: {item.title}</h3>
              <div className="font-mono text-sm text-indigo-400 bg-black/50 p-3 rounded mb-4 relative z-10">
                $ {item.cmd}
              </div>
              <p className="text-slate-400 relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Output Formats */}
      <section className="bg-slate-900/50 border-y border-white/10 py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Output Formats</h2>
          <p className="text-slate-400 mb-12">Export findings in the format that fits your workflow.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Terminal', 'JSON', 'CycloneDX CBOM', 'HTML Report', 'Executive PDF'].map((format, i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                {format}
              </div>
            ))}
          </div>
          <p className="text-slate-500">
            Generate CycloneDX 1.7 standard Cryptographic Bill of Materials (CBOM) out of the box.
          </p>
        </div>
      </section>

      {/* Integrations Row */}
      <section className="py-24 max-w-6xl mx-auto px-8 text-center border-b border-white/10">
        <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-8">Works Seamlessly With</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 text-slate-400 font-semibold text-lg">
          <span>GitHub Actions</span>
          <span>•</span>
          <span>VS Code</span>
          <span>•</span>
          <span>Docker</span>
          <span>•</span>
          <span>Pre-commit</span>
          <span>•</span>
          <span>GitLab CI</span>
          <span>•</span>
          <span>JetBrains</span>
        </div>
      </section>

      {/* Why Spectra */}
      <section className="py-24 max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-16 text-center">Why Spectra?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold mb-4 text-white">Not just detection</h3>
            <p className="text-slate-400">Other tools tell you what algorithm is present. Spectra tells you the risk score, migration effort, regulatory deadline, and action order.</p>
          </div>
          <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold mb-4 text-white">No data leaves your machine</h3>
            <p className="text-slate-400">Spectra is a local CLI with no telemetry, no accounts, no cloud backend. Your code never leaves your machine.</p>
          </div>
          <div className="p-8 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold mb-4 text-white">Standards-embedded</h3>
            <p className="text-slate-400">Every finding is cross-referenced against NIST SP 800-131A, NSA CNSA 2.0, and PCI DSS v4.0 with exact clause citations.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6 mb-6">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/security" className="hover:text-slate-300 transition-colors">Security Policy</Link>
          <a href="https://github.com/HarshalPatel1972/spectra" className="hover:text-slate-300 transition-colors">GitHub</a>
        </div>
        <p>Released under the MIT License. Copyright © 2026 Harshal Patel.</p>
      </footer>
    </div>
  )
}
