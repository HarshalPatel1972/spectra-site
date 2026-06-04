import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-accent text-text-on-accent py-20 pb-10 relative overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`}} />
      
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 relative z-[1]">
        {/* Footer top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-12 pb-12 border-b border-[rgba(6,8,16,0.15)] mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 no-underline">
              <div className="flex items-end gap-[3px] h-[20px]">
                <span className="block w-[2px] h-[8px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                <span className="block w-[2px] h-[12px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                <span className="block w-[2px] h-[20px] rounded-[1px] bg-[rgba(6,8,16,0.9)]" />
                <span className="block w-[2px] h-[15px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
                <span className="block w-[2px] h-[10px] rounded-[1px] bg-[rgba(6,8,16,0.5)]" />
              </div>
              <span className="font-heading font-[800] text-[1.1rem] tracking-[0.06em] uppercase text-[rgba(6,8,16,0.9)] leading-normal py-1">SPECTRA</span>
            </Link>
            <p className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.6)] leading-[1.6] mb-6">Cryptographic intelligence<br/>for the post-quantum era</p>
            <a href="https://github.com/HarshalPatel1972/spectra" className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.7)] no-underline">
              <span className="text-[rgba(6,8,16,0.9)]">›</span> View on GitHub <span className="text-[rgba(6,8,16,0.9)]">‹</span>
            </a>
          </div>

          {/* Product */}
          <div>
            <span className="inline-block px-4 py-1 bg-[rgba(6,8,16,0.12)] rounded-[var(--radius-sm)] font-mono text-[var(--body-xs)] font-bold tracking-[var(--tracking-overline)] uppercase text-[rgba(6,8,16,0.85)] mb-5">Product</span>
            <ul className="list-none flex flex-col gap-3">
              {[
                { name: 'CLI Scanner', href: '/' },
                { name: 'Playground', href: '/playground' },
                { name: 'Download', href: '/download' },
                { name: 'Changelog', href: '/blog' },
                { name: 'Roadmap', href: '/roadmap' }
              ].map(link => (
                <li key={link.name}><Link href={link.href} className="font-mono text-[var(--body-xs)] font-medium tracking-[0.04em] uppercase text-[rgba(6,8,16,0.65)] no-underline hover:text-[rgba(6,8,16,0.95)] transition-colors duration-[120ms]">{link.name}</Link></li>
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
  )
}
