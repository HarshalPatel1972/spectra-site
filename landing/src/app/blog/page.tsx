import Link from 'next/link'
import { Shield, Calendar, Clock } from 'lucide-react'

export default function BlogIndex() {
  const posts = [
    {
      slug: 'the-cryptographic-debt-nobody-is-talking-about',
      title: 'The Cryptographic Debt Nobody Is Talking About',
      excerpt: 'Most organizations are tracking their open-source vulnerabilities, but are entirely blind to the cryptographic primitives deeply embedded in their codebases that will be broken by quantum computers.',
      date: 'Oct 24, 2026',
      readTime: '6 min read'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="font-bold text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" /> Spectra
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/what-happens" className="hover:text-white">The Threat</Link>
          <a href="https://docs.spectra.tools" className="hover:text-white">Docs</a>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Blog & Insights</h1>
        <p className="text-xl text-slate-400 mb-16">
          Thoughts on post-quantum cryptography, static analysis, and the future of secure software development.
        </p>

        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mb-3">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</div>
                </div>
                <h2 className="text-2xl font-bold text-slate-200 group-hover:text-indigo-400 transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="text-indigo-400 text-sm font-bold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article &rarr;
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
