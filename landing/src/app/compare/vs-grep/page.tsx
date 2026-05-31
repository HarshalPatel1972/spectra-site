import { Shield, Check, X, Search } from 'lucide-react'
import Link from 'next/link'

export default function CompareGrepPage() {
  const capabilities = [
    { name: 'Find algorithm names', grep: true, spectra: true },
    { name: 'Context-aware detection', grep: false, spectra: true, grepDetail: '(matches comments/strings)' },
    { name: 'Key size extraction', grep: false, spectra: true },
    { name: 'Certificate parsing (.pem, .crt)', grep: false, spectra: true },
    { name: 'Dependency manifest scanning', grep: false, spectra: true },
    { name: 'Quantum Risk Score derivation', grep: false, spectra: true },
    { name: 'CBOM generation (CycloneDX 1.7)', grep: false, spectra: true },
    { name: 'Compliance gap mapping', grep: false, spectra: true },
    { name: 'CI/CD exit codes & failure limits', grep: false, spectra: true },
    { name: 'Migration action plan', grep: false, spectra: true },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold mb-12">
          &larr; Back to Spectra
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Search className="w-12 h-12 text-slate-500" />
            <span className="text-4xl text-slate-600 font-light">vs</span>
            <Shield className="w-12 h-12 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Spectra vs. `grep -r RSA`</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Grep is a text search tool. Spectra is a Cryptographic Intelligence Platform.
            Here is why regular expressions aren't enough for PQC migration.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-16">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-white font-bold text-base">Capability</th>
                <th className="px-6 py-4 text-center font-bold text-slate-400">grep</th>
                <th className="px-6 py-4 text-center font-bold text-indigo-400">Spectra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {capabilities.map((cap, i) => (
                <tr key={i} className="hover:bg-slate-800/20">
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {cap.name}
                    {cap.grepDetail && <span className="block text-xs text-slate-500 mt-1">{cap.grepDetail}</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {cap.grep ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {cap.spectra ? <Check className="w-5 h-5 text-indigo-500 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <Link href="/playground" className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all">
            Try Spectra in your Browser
          </Link>
        </div>
      </div>
    </div>
  )
}
