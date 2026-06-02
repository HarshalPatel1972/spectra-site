import { Logo } from '../../components/Logo'
import Link from 'next/link'

export default function LegacyAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-void text-surface font-sans">
      <header className="max-w-[1000px] mx-auto px-8 h-24 flex items-center justify-between border-b border-border-dark">
        <Logo />
        <Link href="/" className="text-graphite hover:text-surface transition-colors font-medium">← Return</Link>
      </header>

      <main className="max-w-[800px] mx-auto px-8 py-24">
        <h1 className="font-serif text-[48px] font-light tracking-widest text-graphite text-center mb-24 opacity-60">
          IN MEMORIAM
        </h1>

        <div className="space-y-32">
          
          <article className="border-t border-border-dark pt-8">
            <h2 className="font-serif text-[39px] text-surface mb-2">SHA-1</h2>
            <div className="font-mono text-[14px] text-graphite mb-8 tracking-widest">1995 — 2017</div>
            <p className="font-sans text-[20px] text-surface font-light leading-relaxed">
              Served reliably for 22 years until the SHAttered attack demonstrated
              a practical chosen-prefix collision. SHA-1 is survived by SHA-256,
              SHA-384, and SHA-3. It leaves behind approximately 15% of internet
              certificates still bearing its signature. Migration is ongoing.
            </p>
          </article>

          <article className="border-t border-border-dark pt-8">
            <h2 className="font-serif text-[39px] text-surface mb-2">MD5</h2>
            <div className="font-mono text-[14px] text-graphite mb-8 tracking-widest">1991 — 2004</div>
            <p className="font-sans text-[20px] text-surface font-light leading-relaxed">
              Formally broken in 2004 with demonstrated collision attacks.
              Preimage resistance has held, but MD5 is no longer considered
              cryptographically secure for any use. Interred.
            </p>
          </article>

          <article className="border-t border-border-dark pt-8">
            <h2 className="font-serif text-[39px] text-surface mb-2">3DES</h2>
            <div className="font-mono text-[14px] text-graphite mb-8 tracking-widest">1978 — 2023</div>
            <p className="font-sans text-[20px] text-surface font-light leading-relaxed">
              Deprecated by NIST SP 800-131A Rev 2, with key generation
              prohibited after December 31, 2023. A foundational algorithm
              that outlived its expected service life by decades.
            </p>
          </article>

          <article className="border-t border-border-dark pt-8">
            <h2 className="font-serif text-[39px] text-surface mb-2">RSA</h2>
            <div className="font-mono text-[14px] text-graphite mb-8 tracking-widest">1977 — 2033*</div>
            <p className="font-sans text-[20px] text-surface font-light leading-relaxed">
              Still in service. Will be retired by CNSA 2.0 exclusive-use
              requirements in 2033 at the latest. The HNDL threat makes
              earlier retirement strongly advisable for sensitive data.
            </p>
          </article>

        </div>

        <footer className="mt-48 pt-12 border-t border-border-dark text-center font-mono text-[14px] text-graphite">
          Find these algorithms in your codebase: <span className="text-surface">spectra scan .</span>
        </footer>
      </main>
    </div>
  )
}
