'use client'

import Link from 'next/link'
import { Logo } from '../../components/Logo'
import { DownloadHolograms } from '../../components/DownloadHolograms'
import { useState } from 'react'

export default function DownloadPage() {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const DownloadButton = ({ icon, topText, bottomText, command, link }: { icon: React.ReactNode, topText: string, bottomText: string, command?: string, link?: string }) => {
    const isCopied = copiedCode === command;

    const content = (
      <div className="bg-surface-0 border border-border/80 hover:border-brand hover:scale-105 transition-all duration-300 rounded-[1rem] px-6 py-4 flex items-center gap-5 shadow-2xl w-[320px] text-left cursor-pointer group relative overflow-hidden">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        <div className="w-10 h-10 flex items-center justify-center text-text-primary group-hover:text-brand transition-colors">
          {icon}
        </div>
        <div className="flex flex-col z-10">
          <span className="text-[11px] uppercase tracking-wider font-bold text-text-muted">{topText}</span>
          <span className="text-[16px] font-bold text-text-primary">{bottomText}</span>
        </div>
        {command && (
          <div className="ml-auto text-text-muted group-hover:text-brand transition-colors z-10">
            {isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-safe"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </div>
        )}
        {link && (
          <div className="ml-auto text-text-muted group-hover:text-brand transition-colors z-10">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        )}
      </div>
    );

    if (command) {
      return (
        <button onClick={() => handleCopy(command)}>
          {content}
        </button>
      );
    }
    
    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-void text-text-primary font-sans flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <header className="border-b border-border/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-8 text-[14px] font-medium text-text-secondary">
            <Link href="/what-happens" className="hover:text-text-primary transition-colors">The Quantum Threat</Link>
            <Link href="/playground" className="hover:text-text-primary transition-colors">Playground</Link>
            <a href="https://spectra-security-docs.vercel.app" className="hover:text-text-primary transition-colors">Documentation</a>
            <Link href="/download" className="text-brand transition-colors font-semibold">Download</Link>
          </nav>
          <div className="flex gap-6 items-center text-[14px]">
            <a href="https://github.com/HarshalPatel1972/spectra" className="text-text-secondary hover:text-text-primary transition-colors font-medium">GitHub ↗</a>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative min-h-[800px] flex flex-col items-center justify-center py-20">
        
        {/* BACKGROUND 3D ASSETS */}
        <DownloadHolograms />

        {/* FOREGROUND CTA */}
        <div className="z-20 relative text-center max-w-4xl mx-auto px-8 w-full flex flex-col items-center">
          <h1 className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold mb-16 leading-[1.1] text-text-primary drop-shadow-2xl">
            secure anywhere,<br/>anytime
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>}
              topText="Install via Homebrew" 
              bottomText="macOS & Linux" 
              command="brew install harshalpatel1972/tap/spectra" 
            />
            
            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>}
              topText="Get the GitHub App" 
              bottomText="Automated CI/CD" 
              link="https://github.com/HarshalPatel1972/spectra-action" 
            />

            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}
              topText="Pull Docker Image" 
              bottomText="ghcr.io" 
              command="docker run --rm -v $(pwd):/w ghcr.io/harshalpatel1972/spectra scan /w" 
            />

            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
              topText="VS Code Extension" 
              bottomText="Inline Risk Analysis" 
              command="code --install-extension harshalpatel1972.spectra-vscode" 
            />
          </div>
          
          <div className="mt-16 text-[14px] text-text-muted font-mono bg-surface-1/50 px-6 py-2 rounded-full border border-border/50">
            For source compilation: <span className="text-text-primary">go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest</span>
          </div>
        </div>
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-surface-0 border-t border-border py-12 relative z-50">
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
  )
}
