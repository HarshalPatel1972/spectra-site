'use client'

import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { GlobeWireframe } from '@/components/GlobeWireframe'

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
      <div className="bg-raised border border-border hover:border-accent hover:bg-[var(--accent-glow)] transition-all duration-200 rounded-[var(--radius-lg)] px-6 py-5 flex items-center gap-5 w-[320px] text-left cursor-pointer group">
        <div className="w-10 h-10 flex items-center justify-center text-text-primary group-hover:text-accent transition-colors bg-high rounded-[var(--radius-md)]">
          {icon}
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.06em] font-bold text-text-secondary">{topText}</span>
          <span className="font-heading text-[var(--heading-sm)] font-bold text-text-primary">{bottomText}</span>
        </div>
        {command && (
          <div className="text-text-muted group-hover:text-accent transition-colors">
            {isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </div>
        )}
        {link && (
          <div className="text-text-muted group-hover:text-accent transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        )}
      </div>
    );

    if (command) {
      return (
        <button onClick={() => handleCopy(command)} className="border-none bg-transparent p-0">
          {content}
        </button>
      );
    }
    
    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline">
          {content}
        </a>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-void text-text-primary flex flex-col relative overflow-hidden">
      
      <GlobeWireframe className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.06] pointer-events-none text-text-primary z-0" />

      <main className="flex-1 w-full relative z-10 flex flex-col items-center py-32">
        
        {/* FOREGROUND CTA */}
        <div className="text-center max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
          <p className="overline mb-6">Install Spectra</p>
          <h1 className="display-headline mb-16">
            SECURE ANYWHERE.<br/><span className="text-accent">ANYTIME.</span>
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>}
              topText="Install via Homebrew" 
              bottomText="macOS & Linux" 
              command="brew install harshalpatel1972/tap/spectra" 
            />
            
            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>}
              topText="Get the GitHub App" 
              bottomText="Automated CI/CD" 
              link="https://github.com/HarshalPatel1972/spectra-action" 
            />

            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}
              topText="Pull Docker Image" 
              bottomText="ghcr.io" 
              command="docker run --rm -v $(pwd):/w ghcr.io/harshalpatel1972/spectra scan /w" 
            />

            <DownloadButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
              topText="VS Code Extension" 
              bottomText="Inline Risk Analysis" 
              command="code --install-extension harshalpatel1972.spectra-vscode" 
            />
          </div>
        </div>

        {/* Detailed Installation Guide */}
        <section className="mt-32 max-w-4xl mx-auto px-6 md:px-12 w-full z-20 relative">
          <div className="bg-raised border border-border rounded-[var(--radius-xl)] p-10 md:p-12">
            <h2 className="display-xl text-text-primary mb-12">DETAILED<br/><span className="text-accent">INSTALLATION</span></h2>
            
            <div className="space-y-8">
              {/* macOS / Linux */}
              <div className="pb-8 border-b border-border">
                <h3 className="font-heading text-[var(--heading-md)] font-bold text-text-primary mb-3 flex items-center gap-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-high border border-border rounded-[var(--radius-md)] text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg></span>
                  macOS / Linux
                </h3>
                <p className="text-text-secondary mb-5 text-[var(--body-sm)] leading-[1.6]">The easiest way to install Spectra on macOS or Linux is via Homebrew. This will download the latest pre-compiled binary and add it to your PATH.</p>
                <div className="bg-void border border-border rounded-[var(--radius-md)] p-4 font-mono text-[var(--code-md)] flex flex-wrap items-center justify-between gap-4 group">
                  <span className="text-text-primary"><span className="text-accent mr-2">$</span>brew install harshalpatel1972/tap/spectra</span>
                  <button onClick={() => handleCopy('brew install harshalpatel1972/tap/spectra')} className="font-mono text-[var(--body-xs)] font-bold tracking-[0.04em] uppercase text-text-muted hover:text-accent transition-colors ml-auto border-none bg-transparent cursor-pointer">
                    {copiedCode === 'brew install harshalpatel1972/tap/spectra' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Windows */}
              <div className="pb-8 border-b border-border">
                <h3 className="font-heading text-[var(--heading-md)] font-bold text-text-primary mb-3 flex items-center gap-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-high border border-border rounded-[var(--radius-md)] text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span>
                  Windows
                </h3>
                <p className="text-text-secondary mb-5 text-[var(--body-sm)] leading-[1.6]">For Windows users, we recommend using Docker to run the Spectra container against your local workspace.</p>
                <div className="bg-void border border-border rounded-[var(--radius-md)] p-4 font-mono text-[var(--code-md)] flex flex-wrap items-center justify-between gap-4 group">
                  <span className="text-text-primary"><span className="text-accent mr-2">$</span>docker run --rm -v %cd%:/w ghcr.io/harshalpatel1972/spectra scan /w</span>
                  <button onClick={() => handleCopy('docker run --rm -v %cd%:/w ghcr.io/harshalpatel1972/spectra scan /w')} className="font-mono text-[var(--body-xs)] font-bold tracking-[0.04em] uppercase text-text-muted hover:text-accent transition-colors ml-auto border-none bg-transparent cursor-pointer">
                    {copiedCode === 'docker run --rm -v %cd%:/w ghcr.io/harshalpatel1972/spectra scan /w' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Build from Source */}
              <div>
                <h3 className="font-heading text-[var(--heading-md)] font-bold text-text-primary mb-3 flex items-center gap-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-high border border-border rounded-[var(--radius-md)] text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></span>
                  Build from Source (Go)
                </h3>
                <p className="text-text-secondary mb-5 text-[var(--body-sm)] leading-[1.6]">If you have Go 1.21+ installed, you can compile and install the CLI directly from source.</p>
                <div className="bg-void border border-border rounded-[var(--radius-md)] p-4 font-mono text-[var(--code-md)] flex flex-wrap items-center justify-between gap-4 group">
                  <span className="text-text-primary"><span className="text-accent mr-2">$</span>go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest</span>
                  <button onClick={() => handleCopy('go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest')} className="font-mono text-[var(--body-xs)] font-bold tracking-[0.04em] uppercase text-text-muted hover:text-accent transition-colors ml-auto border-none bg-transparent cursor-pointer">
                    {copiedCode === 'go install github.com/HarshalPatel1972/spectra/cmd/spectra@latest' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
