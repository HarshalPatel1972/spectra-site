'use client'

import Link from 'next/link'
import { Logo } from '../../components/Logo'
import { useState } from 'react'

export default function DownloadPage() {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const CopyIcon = ({ code }: { code: string }) => (
    <button 
      onClick={() => handleCopy(code)}
      className="absolute top-4 right-4 p-2 text-text-muted hover:text-brand transition-colors bg-surface-1 rounded"
    >
      {copiedCode === code ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-safe"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Enterprise Background Layer */}
      <div className="bg-grid absolute inset-0 z-0 pointer-events-none" />
      <div className="hero-glow z-0 pointer-events-none opacity-50" />
      
      <div className="flex flex-col flex-1 z-10 relative">
        
        {/* Header */}
        <header className="border-b border-border/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden md:flex gap-8 text-[14px] font-medium text-text-secondary">
              <Link href="/what-happens" className="hover:text-text-primary transition-colors">The Quantum Threat</Link>
              <Link href="/playground" className="hover:text-text-primary transition-colors">Playground</Link>
              <a href="/docs" className="hover:text-text-primary transition-colors">Documentation</a>
              <Link href="/download" className="text-brand transition-colors font-semibold">Download</Link>
            </nav>
            <div className="flex gap-6 items-center text-[14px]">
              <a href="https://github.com/HarshalPatel1972/spectra" className="text-text-secondary hover:text-text-primary transition-colors font-medium">GitHub ↗</a>
            </div>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto px-8 py-24 flex-1 w-full">
          
          <div className="mb-16 border-b border-border/50 pb-12">
            <h1 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-bold mb-4">Install Spectra</h1>
            <p className="text-[1.125rem] text-text-secondary max-w-2xl">
              Get the cryptographic intelligence scanner running locally in seconds. Spectra requires zero configuration to map your baseline.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* macOS / Linux */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-2">macOS / Linux</h3>
                <p className="text-[14px] text-text-secondary">Install the CLI globally via Homebrew.</p>
              </div>
              <div className="md:w-2/3 w-full bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4">
                  <span className="font-mono text-[11px] text-text-muted">bash</span>
                </div>
                <div className="p-6 font-mono text-[14px] text-text-primary leading-[1.6]">
                  <div className="text-text-secondary mb-2"># Add the tap and install</div>
                  <div><span className="text-brand">$</span> brew install harshalpatel1972/tap/spectra</div>
                </div>
                <CopyIcon code="brew install harshalpatel1972/tap/spectra" />
              </div>
            </div>

            {/* Go Developer */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-2">Go Toolchain</h3>
                <p className="text-[14px] text-text-secondary">Compile from source. Requires Go 1.21+.</p>
              </div>
              <div className="md:w-2/3 w-full bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4">
                  <span className="font-mono text-[11px] text-text-muted">bash</span>
                </div>
                <div className="p-6 font-mono text-[14px] text-text-primary leading-[1.6]">
                  <div><span className="text-brand">$</span> go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest</div>
                </div>
                <CopyIcon code="go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest" />
              </div>
            </div>

            {/* Docker */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-2">Docker</h3>
                <p className="text-[14px] text-text-secondary">Run the scanner directly from ghcr.io without local dependencies.</p>
              </div>
              <div className="md:w-2/3 w-full bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4">
                  <span className="font-mono text-[11px] text-text-muted">bash</span>
                </div>
                <div className="p-6 font-mono text-[14px] text-text-primary leading-[1.6]">
                  <div className="text-text-secondary mb-2"># Mount current directory and scan</div>
                  <div><span className="text-brand">$</span> docker run --rm -v $(pwd):/w ghcr.io/harshalpatel1972/spectra scan /w</div>
                </div>
                <CopyIcon code="docker run --rm -v $(pwd):/w ghcr.io/harshalpatel1972/spectra scan /w" />
              </div>
            </div>

            {/* GitHub Action */}
            <div className="flex flex-col md:flex-row gap-8 items-start pt-12 border-t border-border/50">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-2">GitHub Action</h3>
                <p className="text-[14px] text-text-secondary">Enforce cryptographic hygiene in CI.</p>
                <a href="https://github.com/HarshalPatel1972/spectra-action" className="text-brand hover:text-brand-dim transition-colors text-[14px] font-medium mt-4 inline-block">View Action Documentation →</a>
              </div>
              <div className="md:w-2/3 w-full bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4">
                  <span className="font-mono text-[11px] text-text-muted">spectra.yml</span>
                </div>
                <div className="p-6 font-mono text-[14px] text-text-primary leading-[1.6] whitespace-pre">
{`name: Cryptographic Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: HarshalPatel1972/spectra-action@v1
        with:
          fail-on-critical: true
          generate-cbom: true`}
                </div>
                <CopyIcon code={`name: Cryptographic Scan\non: [push, pull_request]\n\njobs:\n  scan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: HarshalPatel1972/spectra-action@v1\n        with:\n          fail-on-critical: true\n          generate-cbom: true`} />
              </div>
            </div>

            {/* VS Code */}
            <div className="flex flex-col md:flex-row gap-8 items-start pt-12 border-t border-border/50">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-2">VS Code Extension</h3>
                <p className="text-[14px] text-text-secondary">Inline risk analysis as you type.</p>
                <a href="https://github.com/HarshalPatel1972/spectra-vscode" className="text-brand hover:text-brand-dim transition-colors text-[14px] font-medium mt-4 inline-block">View Marketplace Page →</a>
              </div>
              <div className="md:w-2/3 w-full bg-surface-0 border border-border/80 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="h-10 bg-surface-1 border-b border-border/50 flex items-center px-4">
                  <span className="font-mono text-[11px] text-text-muted">bash</span>
                </div>
                <div className="p-6 font-mono text-[14px] text-text-primary leading-[1.6]">
                  <div><span className="text-brand">$</span> code --install-extension harshalpatel1972.spectra-vscode</div>
                </div>
                <CopyIcon code="code --install-extension harshalpatel1972.spectra-vscode" />
              </div>
            </div>

          </div>

        </main>
        
        {/* GLOBAL FOOTER */}
        <footer className="bg-surface-0 border-t border-border py-12 mt-12">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-text-secondary text-[14px]">© 2026 Harshal Patel. MIT Licensed.</span>
            </div>
            <div className="flex gap-6 text-[14px] text-text-secondary">
              <a href="/docs" className="hover:text-text-primary transition-colors">Documentation</a>
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
