import { FileText } from 'lucide-react'
import Link from 'next/link'

export default function ChangelogPage() {
  const logs = [
    {
      version: 'v0.3.0',
      date: 'May 2026',
      title: 'The Distribution Architecture',
      changes: [
        'Launched Interactive Next.js 15 Web Platform',
        'Released VS Code Extension (`spectra.scanWorkspace`)',
        'Released Spectra CI GitHub App for Pull Request interception',
        'Added drag-and-drop CBOM Viewer UI',
        'Added `spectra badge` CLI generation tool',
        'Compiled scanner core to WASM for browser testing'
      ]
    },
    {
      version: 'v0.2.0',
      date: 'April 2026',
      title: 'The Intelligence Engine',
      changes: [
        'Added SQLite persistence (`~/.spectra/state.db`)',
        'Added CNSA 2.0 and PCI DSS v4.0 compliance cross-referencing',
        'Introduced Cryptographic Agility Index (CAI) calculation',
        'Added network TLS endpoint scanner (`spectra endpoint`)',
        'Added container registry scanning support',
        'Released `executive_report.html` CIS0 reporting template'
      ]
    },
    {
      version: 'v0.1.0',
      date: 'March 2026',
      title: 'The Core Discovery Tool',
      changes: [
        'Initial release of `spectra scan .`',
        'Support for Go, Python, Java, JavaScript, Rust, C++',
        'CycloneDX 1.7 CBOM generation implementation',
        'Quantum Risk Score (QRS) foundational algorithm',
        'Detection for RSA, ECDSA, SHA-1, AES, and ML-KEM/ML-DSA'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold mb-12">
          &larr; Back to Spectra
        </Link>
        
        <div className="text-center mb-16">
          <FileText className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-6">Changelog</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything we've shipped to make cryptographic migration visible.
          </p>
        </div>

        <div className="space-y-12">
          {logs.map((log, i) => (
            <div key={i} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline">
                <div className="md:col-span-1 mb-4 md:mb-0 text-slate-500 font-mono">
                  <span className="block text-indigo-400 font-bold text-lg">{log.version}</span>
                  {log.date}
                </div>
                
                <div className="md:col-span-3 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">{log.title}</h2>
                  <ul className="space-y-3 text-slate-400">
                    {log.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0"></span>
                        <span dangerouslySetInnerHTML={{ __html: change.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded text-sm">$1</code>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
