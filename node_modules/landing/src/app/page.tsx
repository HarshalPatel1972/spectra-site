'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { GlobeWireframe } from '@/components/GlobeWireframe'
import { Code, Terminal, Coffee, GitCommit } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════
   SPECTRA LANDING — Phase 5 Koyeb-Pattern Implementation
   ═══════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  function copyInstall() {
    navigator.clipboard.writeText('brew install HarshalPatel1972/tap/spectra')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  /* ── Scroll-triggered fade-up ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -64px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Terminal typewriter ── */
  const termRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = termRef.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('typing')
        const lines = el.querySelectorAll('.line')
        lines.forEach((line, i) => {
          ;(line as HTMLElement).style.animationDelay = `${i * 80}ms`
        })
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ── Tab content ── */
  const tabData = [
    {
      label: 'Engineers',
      features: [
        { title: 'One-Command Scan', body: 'Run spectra scan . and get a complete cryptographic inventory of your codebase in seconds.' },
        { title: 'IDE Integration', body: 'VS Code extension highlights weak cryptography inline as you code.' },
        { title: 'Pre-Commit Hooks', body: 'Block new SHA-1 or RSA-1024 from entering your codebase automatically.' },
        { title: 'CBOM Export', body: 'Generate CycloneDX 1.7 CBOMs for every repository.' },
      ]
    },
    {
      label: 'Security Leads',
      features: [
        { title: 'Risk Dashboard', body: 'See aggregate QRS across all repositories in one view.' },
        { title: 'Migration Planning', body: 'Prioritized action plan ranked by risk × effort × frequency.' },
        { title: 'Compliance Mapping', body: 'Map findings to CNSA 2.0, NIST SP 800-131A, and FIPS 140-3.' },
        { title: 'Trend Tracking', body: 'Track QRS improvement over sprints and releases.' },
      ]
    },
    {
      label: 'CISOs',
      features: [
        { title: 'Executive Reports', body: 'Board-ready HTML reports with risk scores and migration timelines.' },
        { title: 'Regulatory Coverage', body: 'Automated evidence for PCI DSS v4.0, CNSA 2.0, and NIST compliance.' },
        { title: 'Portfolio View', body: 'Org-wide cryptographic posture across hundreds of repositories.' },
        { title: 'Deadline Awareness', body: 'CNSA 2.0 timeline tracking: 2030 software, 2033 firmware, 2035 browsers.' },
      ]
    },
    {
      label: 'CI/CD',
      features: [
        { title: 'GitHub Actions', body: 'Fail builds when QRS exceeds threshold. Block PRs that introduce weak cryptography.' },
        { title: 'GitLab CI', body: 'Native .gitlab-ci.yml integration with artifact upload.' },
        { title: 'Exit Codes', body: '0 = clean, 1 = findings above threshold, 2 = runtime error.' },
        { title: 'SARIF Output', body: 'Upload results to GitHub Security tab with full code location mapping.' },
      ]
    },
  ]

  /* ── Testimonials ── */
  const testimonials = [
    {
      quote: '"WE FOUND RSA-1024 IN OUR PAYMENT SERVICE ON THE FIRST SCAN. SPECTRA PAID FOR ITSELF IN THE FIRST FIVE MINUTES."',
      name: 'SARAH CHEN',
      title: 'VP Engineering, Fintech Startup',
    },
    {
      quote: '"EVERY SECURITY TOOL TELLS YOU WHAT\'S WRONG. SPECTRA TELLS YOU WHAT IT COSTS TO FIX IT AND WHAT TO FIX FIRST."',
      name: 'MARCUS JOHNSON',
      title: 'CISO, Healthcare Platform',
    },
    {
      quote: '"WE WENT FROM \'WE PROBABLY USE SHA-1 SOMEWHERE\' TO A COMPLETE CRYPTOGRAPHIC INVENTORY IN UNDER A MINUTE."',
      name: 'PRIYA PATEL',
      title: 'Security Lead, SaaS Company',
    },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 flex flex-col items-center text-center overflow-hidden  ">
        {/* Globe wireframe bg */}
        <GlobeWireframe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,90vw)] h-[min(900px,90vw)] opacity-[0.06] pointer-events-none z-0 text-text-primary" />


        {/* Floating algorithm chips */}
        <div className="absolute inset-0 pointer-events-none z-[1] hidden md:block">
          <div className="absolute top-[28%] left-[8%] flex items-center bg-raised border border-border rounded-[var(--radius-md)] shadow-[var(--shadow-float)] font-mono text-[var(--body-xs)] text-text-secondary px-3 py-2 whitespace-nowrap animate-[float_6s_ease-in-out_infinite]">
            RSA-2048 <span className="ml-2 px-[6px] py-[2px] rounded-[var(--radius-pill)] text-[0.7rem] font-semibold bg-[rgba(255,69,96,0.15)] text-critical">QRS: 90</span>
          </div>
          <div className="absolute top-[20%] right-[10%] flex items-center bg-raised border border-border rounded-[var(--radius-md)] shadow-[var(--shadow-float)] font-mono text-[var(--body-xs)] text-text-secondary px-3 py-2 whitespace-nowrap animate-[float_6s_ease-in-out_infinite_1.5s]">
            ECDSA/P-256 <span className="ml-2 px-[6px] py-[2px] rounded-[var(--radius-pill)] text-[0.7rem] font-semibold bg-[rgba(255,143,64,0.15)] text-high-risk">QRS: 85</span>
          </div>
          <div className="absolute top-[65%] left-[6%] flex items-center bg-raised border border-border rounded-[var(--radius-md)] shadow-[var(--shadow-float)] font-mono text-[var(--body-xs)] text-text-secondary px-3 py-2 whitespace-nowrap animate-[float_6s_ease-in-out_infinite_0.8s]">
            SHA-1 <span className="ml-2 px-[6px] py-[2px] rounded-[var(--radius-pill)] text-[0.7rem] font-semibold bg-[rgba(255,143,64,0.15)] text-high-risk">QRS: 70</span>
          </div>
          <div className="absolute top-[60%] right-[8%] flex items-center bg-raised border border-border rounded-[var(--radius-md)] shadow-[var(--shadow-float)] font-mono text-[var(--body-xs)] text-text-secondary px-3 py-2 whitespace-nowrap animate-[float_6s_ease-in-out_infinite_2.2s]">
            AES-128 <span className="ml-2 px-[6px] py-[2px] rounded-[var(--radius-pill)] text-[0.7rem] font-semibold bg-[rgba(245,200,66,0.15)] text-medium">QRS: 25</span>
          </div>
        </div>

        <div className="relative z-[2] max-w-[900px] w-full px-6 md:px-12 mx-auto">

          <h1 className="display-headline mb-8">
            SEE EVERY<br/>
            <span className="text-accent">CIPHER.</span><br/>
            OWN YOUR<br/>MIGRATION.
          </h1>

          <p className="font-body text-[var(--body-lg)] text-text-secondary max-w-[560px] mx-auto mb-10 leading-[1.6]">
            Spectra scans your codebases, certificates, and dependencies to find
            quantum-vulnerable cryptography — then scores it, maps it, and shows
            you the path forward.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
            <button onClick={copyInstall} className="inline-flex items-center gap-3 px-6 py-[14px] bg-raised border border-[var(--accent-border)] rounded-[var(--radius-sm)] font-mono text-[var(--code-md)] text-accent cursor-pointer transition-all duration-[120ms] select-all hover:bg-[var(--accent-glow)] hover:border-accent">
              {copied ? 'Copied!' : 'brew install HarshalPatel1972/tap/spectra'}
              {!copied && <span className="opacity-60 text-[0.8em]">⊕</span>}
            </button>
            <Link href="/playground" className="btn-secondary">Try in Browser</Link>
          </div>

          <p className="font-mono text-[var(--body-xs)] text-text-muted tracking-[0.04em] uppercase">
            No account · No telemetry · MIT License · CycloneDX 1.7
          </p>
        </div>

        {/* Terminal peeking below */}
        <div className="relative z-[3] mt-20 mx-auto max-w-[720px] w-full px-6 md:px-12">
          <div className="terminal">
            <div className="terminal-titlebar">
              <div className="traffic-lights">
                <div className="traffic-light red" />
                <div className="traffic-light amber" />
                <div className="traffic-light green" />
              </div>
            </div>
            <div className="terminal-body" ref={termRef}>
              <div className="line"><span className="t-cmd">$</span> <span className="t-path">spectra scan</span> <span className="t-flag">./payment-service</span></div>
              <div className="line t-dim">▓ Mapping cryptographic landscape... 847 files</div>
              <div className="line"></div>
              <div className="line"><span className="t-crit">CRITICAL</span>  <span className="t-file">RSA-2048</span>  <span className="t-file">src/auth/jwt.go:47</span>          <span className="t-label">QRS:</span> <span className="t-num">90</span></div>
              <div className="line"><span className="t-high">HIGH    </span>  <span className="t-file">ECDSA/P-256</span> <span className="t-file">tls/certs/api.pem</span>         <span className="t-label">QRS:</span> <span className="t-num">85</span></div>
              <div className="line"><span className="t-high">HIGH    </span>  <span className="t-file">SHA-1</span>      <span className="t-file">src/legacy/hash.go:12</span>     <span className="t-label">QRS:</span> <span className="t-num">70</span></div>
              <div className="line"><span className="t-med">MEDIUM  </span>  <span className="t-file">AES-128</span>    <span className="t-file">config/tls.yaml:8</span>         <span className="t-label">QRS:</span> <span className="t-num">25</span></div>
              <div className="line"></div>
              <div className="line t-sep">──────────────────────────────────────────────────────────────</div>
              <div className="line"><span className="t-label">QRS:</span> <span className="t-crit">83/100</span>  <span className="t-label">CPS:</span> <span className="t-num">31/100</span>  <span className="t-label">Compliance gaps:</span> <span className="t-num">47</span>  <span className="t-label">CNSA 2.0</span></div>
              <div className="line"><span className="t-arrow">→</span> <span className="t-path">CBOM</span> <span className="t-dim">./spectra-out/spectra-cbom.json</span>  <span className="t-dim">[CycloneDX 1.7]</span></div>
              <div className="line"><span className="t-arrow">→</span> <span className="t-path">HTML</span> <span className="t-dim">./spectra-out/spectra-report.html</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — TRUST BAR
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 border-t border-border-subtle border-b border-b-border-subtle  overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex items-center gap-12">
          <span className="font-mono text-[var(--body-xs)] font-medium tracking-[var(--tracking-overline)] uppercase text-text-muted whitespace-nowrap shrink-0 relative z-10  pr-8 shadow-[16px_0_16px_var(--color-void)] hidden md:block">
            Trusted foundation
          </span>
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:animation-play-state-paused">
              {[...['MIT License', 'No Telemetry', 'CycloneDX 1.7', 'CNSA 2.0', 'Open Source', 'NIST SP 800-131A'], ...['MIT License', 'No Telemetry', 'CycloneDX 1.7', 'CNSA 2.0', 'Open Source', 'NIST SP 800-131A']].map((badge, idx) => (
                <span key={`${badge}-${idx}`} className="inline-flex items-center gap-2 font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] text-text-secondary px-4 py-2 bg-raised border border-border rounded-[var(--radius-pill)] whitespace-nowrap shrink-0 transition-colors hover:text-text-primary hover:border-text-muted">
                  <span className="text-accent text-[0.9em]">✓</span> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — SCANNER CARDS (4-column)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="display-xl text-text-primary">FOUR SCANNERS.<br/><span className="text-accent">ONE COMMAND.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-[var(--radius-lg)] overflow-hidden">
            {[
              { badge: 'CODE SCANNER', title: 'Source Code', body: 'Detects RSA, ECC, SHA-1 across Go, Python, Java, JavaScript, Rust, and C/C++ using language-specific pattern matching.' },
              { badge: 'CERT SCANNER', title: 'Certificates', body: 'Parses X.509 PEM/DER files and extracts signature algorithm, public key type, key size, and expiry dates.' },
              { badge: 'DEP SCANNER', title: 'Dependencies', body: 'Cross-references go.mod, package.json, requirements.txt, Cargo.toml against 40+ known cryptographic libraries.' },
              { badge: 'CONFIG SCANNER', title: 'Configuration', body: 'Scans YAML, JSON, TOML, ENV, and properties files for algorithm names, TLS versions, and cipher suite settings.' },
            ].map((card, i) => (
              <div key={card.badge} className={`p-8 bg-raised transition-colors duration-150 hover:bg-high ${i < 3 ? 'border-r border-border max-lg:border-r-0' : ''} ${i < 2 ? 'max-md:border-b max-md:border-border' : ''} ${i === 2 ? 'max-lg:border-b max-lg:border-border' : ''}`}>
                <div className="feature-badge mb-6">{card.badge}</div>
                <h3 className="font-heading text-[var(--heading-md)] font-bold text-text-primary mb-3">{card.title}</h3>
                <p className="text-[var(--body-sm)] text-text-secondary leading-[1.6]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — TAB FEATURE SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  relative overflow-hidden fade-up">
        <div className="absolute inset-0 -fine pointer-events-none opacity-50" />
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
          <div className="text-center mb-12">
            <h2 className="display-xl text-text-primary mb-8">SPECTRA<br/>WORKS FOR</h2>
            <div className="flex justify-center mb-16">
              <div className="tab-row">
                {tabData.map((tab, i) => (
                  <button key={tab.label} className={`tab-item ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-center">
            {/* Feature list */}
            <ul className="list-none flex flex-col gap-3">
              {tabData[activeTab].features.map((feat, i) => (
                <li key={i} className="p-5 bg-raised border border-border rounded-[var(--radius-md)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-glow)] transition-all duration-150 cursor-default">
                  <div className="font-mono text-[var(--body-xs)] font-semibold tracking-[0.06em] uppercase text-text-primary mb-2 flex items-center gap-3">
                    <span className="text-accent font-mono">→</span> {feat.title}
                  </div>
                  <div className="text-[var(--body-sm)] text-text-secondary leading-[1.5]">{feat.body}</div>
                </li>
              ))}
            </ul>

            {/* Visual panel — terminal */}
            <div className="bg-raised border border-border rounded-[var(--radius-lg)] overflow-hidden h-[440px] flex flex-col max-lg:h-[300px]">
              <div className="px-6 py-4 bg-high border-b border-border font-mono text-[var(--body-xs)] text-text-secondary tracking-[0.04em]">
                spectra output — {tabData[activeTab].label.toLowerCase()}
              </div>
              <div className="flex-1 p-6 overflow-y-auto font-mono text-[var(--code-sm)] leading-[1.7]">
                {tabData[activeTab].features.map((feat, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-accent">→ {feat.title}</div>
                    <div className="text-text-muted ml-4">{feat.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — STATS BAR
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="bg-raised border border-border rounded-[var(--radius-xl)] p-10 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-8 md:gap-0">
            {[
              { num: '8', label: 'Languages Supported' },
              { num: '40+', label: 'Crypto Dependencies Mapped' },
              { num: 'CDX 1.7', label: 'CBOM Format' },
              { num: '100%', label: 'Offline · No Telemetry' },
            ].map((stat, i) => (
              <div key={stat.label} className="contents">
                <div className="text-center px-8">
                  <div className="font-display font-[900] text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-[-0.02em] text-text-primary leading-none mb-2">{stat.num}</div>
                  <div className="font-mono text-[var(--body-xs)] font-medium tracking-[var(--tracking-overline)] uppercase text-text-muted">{stat.label}</div>
                </div>
                {i < 3 && <div className="hidden md:block w-px h-12 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — INTEGRATIONS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
            <div>
              <h2 className="font-heading text-[var(--heading-xl)] font-[800] text-text-primary mb-5 leading-[1.2]">Works with your<br/>existing toolchain</h2>
              <p className="text-text-secondary leading-[1.7] mb-8">Spectra integrates with the tools you already use. Scan locally, in CI/CD, or as a pre-commit hook. Output to terminal, JSON, HTML, or CycloneDX CBOM.</p>
              <Link href="/download" className="btn-primary">Get Started</Link>
            </div>
            <div className="flex flex-col gap-3 bg-raised border border-border rounded-[var(--radius-lg)] p-6 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)]">
              <div className="flex w-max animate-marquee items-center gap-3 hover:animation-play-state-paused">
                {[
                  ...Object.entries({
                    'GitHub Actions': 'githubactions',
                    'VS Code': <Code className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Docker': 'docker',
                    'GitLab CI': 'gitlab',
                    'Pre-commit': <GitCommit className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Homebrew': 'homebrew'
                  }),
                  ...Object.entries({
                    'GitHub Actions': 'githubactions',
                    'VS Code': <Code className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Docker': 'docker',
                    'GitLab CI': 'gitlab',
                    'Pre-commit': <GitCommit className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Homebrew': 'homebrew'
                  })
                ].map(([name, icon], idx) => (
                  <div key={`${name}-${idx}`} className="w-[120px] aspect-square shrink-0 flex flex-col items-center justify-center gap-2 bg-high border border-border rounded-[var(--radius-md)] p-3 transition-all duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--accent-glow)] group">
                    {typeof icon === 'string' ? (
                      <img src={`https://cdn.simpleicons.org/${icon}/1A1A1A`} alt={name} className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-150" />
                    ) : (
                      icon
                    )}
                    <span className="font-mono text-[0.55rem] text-text-secondary text-center leading-tight uppercase tracking-[0.04em] group-hover:text-text-primary transition-colors duration-150">{name}</span>
                  </div>
                ))}
              </div>

              <div className="flex w-max animate-marquee-reverse items-center gap-3 hover:animation-play-state-paused">
                {[
                  ...Object.entries({
                    'npm': 'npm',
                    'Terminal': <Terminal className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Go': 'go',
                    'Python': 'python',
                    'Java': <Coffee className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'JavaScript': 'javascript'
                  }),
                  ...Object.entries({
                    'npm': 'npm',
                    'Terminal': <Terminal className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'Go': 'go',
                    'Python': 'python',
                    'Java': <Coffee className="w-8 h-8 text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-150" strokeWidth={1.5} />,
                    'JavaScript': 'javascript'
                  })
                ].map(([name, icon], idx) => (
                  <div key={`${name}-${idx}`} className="w-[120px] aspect-square shrink-0 flex flex-col items-center justify-center gap-2 bg-high border border-border rounded-[var(--radius-md)] p-3 transition-all duration-150 hover:border-[var(--accent-border)] hover:bg-[var(--accent-glow)] group">
                    {typeof icon === 'string' ? (
                      <img src={`https://cdn.simpleicons.org/${icon}/1A1A1A`} alt={name} className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-150" />
                    ) : (
                      icon
                    )}
                    <span className="font-mono text-[0.55rem] text-text-secondary text-center leading-tight uppercase tracking-[0.04em] group-hover:text-text-primary transition-colors duration-150">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  relative overflow-hidden fade-up">
        <GlobeWireframe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] pointer-events-none text-text-primary" />
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
          <div className="font-display font-[900] text-[clamp(1.75rem,3.5vw,3.25rem)] uppercase leading-[1.05] text-text-primary text-center max-w-[860px] mx-auto mb-10">
            {testimonials[activeTestimonial].quote}
          </div>
          <div className="flex items-center gap-4 justify-center mb-12">
            <div className="w-11 h-11 rounded-full bg-raised border-2 border-[var(--accent-border)] shrink-0 flex items-center justify-center font-mono text-accent text-[0.8rem] font-bold">
              {testimonials[activeTestimonial].name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-mono text-[var(--body-sm)] font-semibold text-text-primary uppercase tracking-[0.04em]">{testimonials[activeTestimonial].name}</div>
              <div className="font-mono text-[var(--body-xs)] text-text-secondary">{testimonials[activeTestimonial].title}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center bg-raised border border-border rounded-[var(--radius-pill)] p-2 w-fit mx-auto">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`px-5 py-2 rounded-[var(--radius-pill)] font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] border-none cursor-pointer whitespace-nowrap transition-all duration-150 ${activeTestimonial === i ? 'bg-high text-text-primary' : 'bg-transparent text-text-secondary hover:text-text-primary'}`}>
              {t.name.split(' ')[0]}
            </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — FEATURE GRID (Output Formats)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="display-xl text-text-primary mb-4">EVERYTHING IN<br/><span className="text-accent">ONE SCAN</span></h2>
            <p className="text-text-secondary text-[var(--body-lg)]">Every output format you need, from CLI to boardroom.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Terminal Report', body: 'Color-coded CLI output with severity badges, QRS scores, and a prioritized action plan.', cta: 'View Sample' },
              { title: 'HTML Report', body: 'Self-contained, dark-themed HTML report ready for CISO presentations. No external dependencies.', cta: 'View Template' },
              { title: 'JSON Export', body: 'Machine-readable findings export for integration with SIEM, ticketing, and custom tooling.', cta: 'View Schema' },
              { title: 'CycloneDX CBOM', body: 'Industry-standard Cryptography Bill of Materials in CycloneDX 1.7 format.', cta: 'Learn More' },
              { title: 'Quantum Risk Score', body: 'Proprietary 0-100 score combining algorithm weakness, key size, frequency, and migration effort.', cta: 'How QRS Works' },
              { title: 'Action Plan', body: 'Ranked remediation list: what to fix first based on risk × effort × frequency.', cta: 'View Example' },
            ].map(card => (
              <div key={card.title} className="bg-raised border border-border rounded-[var(--radius-lg)] overflow-hidden transition-all duration-200 hover:border-[var(--accent-border)] hover:-translate-y-[2px]">
                <div className="h-[180px] bg-high border-b border-border flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,var(--accent-glow),transparent_70%)]" />
                  <span className="font-display font-[900] text-[clamp(1.25rem,2.5vw,2rem)] uppercase text-text-primary tracking-[-0.01em] text-center px-6 relative">{card.title}</span>
                </div>
                <div className="p-6">
                  <p className="text-[var(--body-sm)] text-text-secondary leading-[1.6] mb-4">{card.body}</p>
                  <span className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-accent inline-flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-150">
                    {card.cta}<span>›</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — COMPLIANCE LIST
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col border border-border rounded-[var(--radius-lg)] overflow-hidden">
            {[
              { icon: 'NSA', title: 'NSA CNSA 2.0', body: 'Commercial National Security Algorithm Suite — quantum-resistant requirements for national security systems.' },
              { icon: 'NIST', title: 'NIST SP 800-131A Rev 2', body: 'Transitioning the Use of Cryptographic Algorithms — deprecation timelines for legacy algorithms.' },
              { icon: 'PCI', title: 'PCI DSS v4.0', body: 'Payment Card Industry Data Security Standard — cryptographic requirements for payment processing.' },
              { icon: 'FIPS', title: 'FIPS 140-3', body: 'Security Requirements for Cryptographic Modules — federal validation standards.' },
              { icon: 'CDX', title: 'CycloneDX 1.7', body: 'OWASP standard for Cryptography Bill of Materials — interoperable crypto asset inventory.' },
              { icon: 'PQC', title: 'NIST FIPS 203/204/205', body: 'Post-Quantum Cryptography standards: ML-KEM, ML-DSA, SLH-DSA — the algorithms replacing RSA and ECC.' },
            ].map((item, i) => (
              <div key={item.title} className={`flex items-center gap-5 px-8 py-6 bg-raised transition-colors duration-150 hover:bg-high ${i < 5 ? 'border-b border-border' : ''} max-sm:flex-wrap`}>
                <div className="w-11 h-11 shrink-0 bg-high border border-border rounded-[var(--radius-md)] flex items-center justify-center font-mono text-[var(--body-xs)] font-bold text-accent">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-mono text-[var(--body-sm)] font-semibold text-text-primary uppercase tracking-[0.04em] mb-1">{item.title}</div>
                  <div className="text-[var(--body-sm)] text-text-secondary">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — PRICING
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="display-xl text-text-primary">START FREE.<br/><span className="text-accent">SCALE WHEN READY.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Open Source', name: 'CLI', price: 'FREE', priceLabel: 'forever',
                features: ['Full local scanning', '8 language support', 'Terminal + JSON output', 'CycloneDX CBOM', 'Pre-commit hooks', 'MIT Licensed'],
                cta: 'Download', href: '/download', featured: false,
              },
              {
                tier: 'Team', name: 'CI APP', price: '$49', priceLabel: '/month',
                features: ['Everything in CLI', 'GitHub Actions integration', 'GitLab CI integration', 'HTML executive reports', 'Trend tracking', 'Priority support'],
                cta: 'Get Started', href: '/download', featured: true,
              },
              {
                tier: 'Enterprise', name: 'PLATFORM', price: 'CUSTOM', priceLabel: 'contact us',
                features: ['Everything in CI App', 'Portfolio-wide dashboard', 'SAML/SSO', 'Compliance evidence export', 'Dedicated support', 'Custom integrations'],
                cta: 'Talk to an Expert', href: 'mailto:harshal@spectra.dev', featured: false,
              },
            ].map(plan => (
              <div key={plan.name} className={`bg-raised border rounded-[var(--radius-lg)] p-8 flex flex-col gap-6 transition-colors duration-200 hover:border-[var(--accent-border)] ${plan.featured ? 'border-[var(--accent-border)] bg-[var(--accent-glow)]' : 'border-border'}`}>
                <div className="font-mono text-[var(--body-xs)] font-semibold tracking-[var(--tracking-badge)] uppercase text-text-secondary">{plan.tier}</div>
                <div className="font-display font-[900] text-[clamp(1.5rem,3vw,2.5rem)] uppercase tracking-[-0.01em] text-text-primary">{plan.name}</div>
                <div>
                  <span className="font-display font-[900] text-[var(--display-lg)] uppercase text-text-primary leading-none">{plan.price}</span>
                  <span className="font-body text-[var(--body-sm)] font-normal text-text-secondary ml-2">{plan.priceLabel}</span>
                </div>
                <ul className="list-none flex flex-col gap-3 flex-1">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-3 text-[var(--body-sm)] text-text-secondary leading-[1.5]">
                      <span className="text-accent font-mono font-bold shrink-0">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={plan.featured ? 'btn-primary justify-center' : 'btn-secondary justify-center'}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 11 — BLOG / CHANGELOG
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  fade-up">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="display-xl text-text-primary">LATEST FROM<br/><span className="text-accent">SPECTRA</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'DEEP DIVE', date: 'JUN 2026', title: 'The Cryptographic Debt Nobody Is Talking About', excerpt: 'Your codebase is full of RSA-2048 and SHA-1. Here\'s what that costs when quantum arrives.' },
              { category: 'CASE STUDY', date: 'MAY 2026', title: 'Scan of the Month: Payment Microservice', excerpt: 'We scanned a real-world payment service and found 47 compliance gaps across 3 standards.' },
              { category: 'RELEASE', date: 'MAY 2026', title: 'Spectra v0.5 — Config Scanner', excerpt: 'New scanner for YAML, JSON, TOML config files. Plus improved QRS accuracy and action plans.' },
            ].map(post => (
              <Link key={post.title} href="/blog" className="bg-raised border border-border rounded-[var(--radius-lg)] overflow-hidden flex flex-col transition-all duration-200 hover:border-[var(--accent-border)] hover:-translate-y-[2px] no-underline">
                <div className="h-[180px]  flex items-center justify-center border-b border-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,var(--accent-glow),transparent_70%)]" />
                  <span className="relative font-display font-[900] text-[clamp(1.25rem,2.5vw,2rem)] uppercase text-text-primary tracking-[-0.01em] text-center px-6">{post.category}</span>
                </div>
                <div className="flex items-center gap-3 px-6 pt-5">
                  <span className="inline-block px-[10px] py-[3px] bg-accent text-text-on-accent rounded-[var(--radius-pill)] font-mono text-[0.65rem] font-semibold tracking-[0.06em] uppercase">{post.category}</span>
                  <span className="font-mono text-[var(--body-xs)] text-text-muted tracking-[0.04em] ml-auto">{post.date}</span>
                </div>
                <div className="px-6 pt-4 pb-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-[var(--heading-sm)] font-bold text-text-primary leading-[1.4] mb-3">{post.title}</h3>
                  <p className="text-[var(--body-sm)] text-text-secondary leading-[1.6] flex-1 mb-5 line-clamp-3">{post.excerpt}</p>
                  <span className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-accent inline-flex items-center gap-2">
                    <span>›</span> Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 12 — CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 lg:py-32  text-center relative overflow-hidden">
        <GlobeWireframe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.06] pointer-events-none text-text-primary" />
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
          <h2 className="display-xl text-text-primary max-w-[700px] mx-auto mb-10">KNOW YOUR<br/>CRYPTOGRAPHY<br/>BEFORE <span className="text-accent">QUANTUM</span><br/>KNOWS IT FOR YOU</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/download" className="btn-primary">Get Started</Link>
            <Link href="/playground" className="btn-secondary">Try in Browser</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 13 — FOOTER (FULL TEAL)
          ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-accent text-text-on-accent py-20 pb-10 relative overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`}} />
        
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
          {/* Footer top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-12 pb-12 border-b border-[rgba(6,8,16,0.15)] mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6 no-underline">
                <div className="flex items-center gap-[3px] h-[20px]">
                  <span className="block w-[2px] h-[8px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                  <span className="block w-[2px] h-[12px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                  <span className="block w-[2px] h-[20px] rounded-[1px] bg-[rgba(6,8,16,0.9)]" />
                  <span className="block w-[2px] h-[15px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                  <span className="block w-[2px] h-[10px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                </div>
                <span className="font-heading font-[800] text-[1.1rem] tracking-[0.06em] uppercase text-[rgba(6,8,16,0.9)] leading-normal py-1">SPECTRA</span>
              </div>
              <p className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.6)] leading-[1.6] mb-6">Cryptographic intelligence<br/>for the post-quantum era</p>
              <a href="https://github.com/HarshalPatel1972/spectra" className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.7)] no-underline">
                <span className="text-[rgba(6,8,16,0.9)]">›</span> View on GitHub <span className="text-[rgba(6,8,16,0.9)]">‹</span>
              </a>
            </div>

            {/* Product */}
            <div>
              <span className="inline-block px-4 py-1 bg-[rgba(6,8,16,0.12)] rounded-[var(--radius-sm)] font-mono text-[var(--body-xs)] font-bold tracking-[var(--tracking-overline)] uppercase text-[rgba(6,8,16,0.85)] mb-5">Product</span>
              <ul className="list-none flex flex-col gap-3">
                {['CLI Scanner', 'Playground', 'Download', 'Changelog', 'Roadmap'].map(link => (
                  <li key={link}><a href="#" className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.65)] no-underline hover:text-[rgba(6,8,16,0.95)] transition-colors duration-[120ms]">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <span className="inline-block px-4 py-1 bg-[rgba(6,8,16,0.12)] rounded-[var(--radius-sm)] font-mono text-[var(--body-xs)] font-bold tracking-[var(--tracking-overline)] uppercase text-[rgba(6,8,16,0.85)] mb-5">Resources</span>
              <ul className="list-none flex flex-col gap-3">
                {['Documentation', 'Blog', 'CNSA 2.0 Guide', 'QRS Methodology', 'API Reference'].map(link => (
                  <li key={link}><a href="#" className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.65)] no-underline hover:text-[rgba(6,8,16,0.95)] transition-colors duration-[120ms]">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <span className="inline-block px-4 py-1 bg-[rgba(6,8,16,0.12)] rounded-[var(--radius-sm)] font-mono text-[var(--body-xs)] font-bold tracking-[var(--tracking-overline)] uppercase text-[rgba(6,8,16,0.85)] mb-5">Legal</span>
              <ul className="list-none flex flex-col gap-3">
                {['Security Policy', 'Privacy Policy', 'MIT License', 'Contributing'].map(link => (
                  <li key={link}><a href="#" className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.65)] no-underline hover:text-[rgba(6,8,16,0.95)] transition-colors duration-[120ms]">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="font-mono text-[var(--body-xs)] text-[rgba(6,8,16,0.5)] tracking-[0.04em]">© 2026 Harshal Patel. MIT Licensed.</span>
            <div className="flex gap-3">
              <a href="https://github.com/HarshalPatel1972/spectra" className="w-9 h-9 flex items-center justify-center bg-[rgba(6,8,16,0.1)] border border-[rgba(6,8,16,0.15)] rounded-[var(--radius-sm)] text-[rgba(6,8,16,0.7)] no-underline hover:bg-[rgba(6,8,16,0.2)] hover:text-[rgba(6,8,16,0.95)] transition-all duration-[120ms] text-[0.9em]">
                GH
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
