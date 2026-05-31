import { Shield, ArrowLeft, Calendar, User, Search } from 'lucide-react'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="px-6 py-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 font-bold text-white">
            <Shield className="w-5 h-5 text-indigo-400" />
            Spectra
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <article>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Quantum Exposure Report: HashiCorp Vault v1.14
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> May 2026
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" /> Spectra Research Team
              </div>
            </div>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none prose-lg">
            <p className="lead text-xl text-slate-400 mb-8">
              HashiCorp Vault is the gold standard for secrets management. It protects the most sensitive infrastructure on the internet. But what cryptography does Vault itself rely on, and how prepared is it for the post-quantum era?
            </p>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl my-8 font-mono text-sm">
              <div className="text-slate-500 mb-2"># The Scan Command</div>
              <div className="text-emerald-400">$ git clone https://github.com/hashicorp/vault</div>
              <div className="text-emerald-400">$ spectra scan . --output json,cbom</div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Findings Summary</h2>
            <ul className="space-y-2 mb-8 bg-slate-900/50 p-6 rounded-xl border border-white/5">
              <li><strong>142 total findings</strong> across the codebase and dependencies.</li>
              <li><strong>18 CRITICAL</strong>, <strong>45 HIGH</strong> severity findings.</li>
              <li><strong>Top algorithm:</strong> RSA-2048 (42 occurrences)</li>
              <li><strong>Aggregate QRS:</strong> 87/100 (CRITICAL)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Top 5 Findings</h2>
            
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-3 px-4 font-bold">Algorithm</th>
                    <th className="py-3 px-4 font-bold">File</th>
                    <th className="py-3 px-4 font-bold">QRS</th>
                    <th className="py-3 px-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">RSA-2048</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">vault/jwt_auth.go</td>
                    <td className="py-3 px-4 text-red-400 font-bold">90</td>
                    <td className="py-3 px-4">Replace with ML-KEM</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">ECDSA/P-256</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">api/tls_config.go</td>
                    <td className="py-3 px-4 text-orange-400 font-bold">85</td>
                    <td className="py-3 px-4">Migrate to ML-DSA</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">SHA-1</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">sdk/helper/hash.go</td>
                    <td className="py-3 px-4 text-yellow-400 font-bold">70</td>
                    <td className="py-3 px-4">Replace with SHA-256</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Interesting Parts</h2>
            <p>
              Vault's architecture is highly pluggable, which is fantastic for cryptographic agility. The core engine heavily abstracts its cryptographic operations through the `sdk/helper` package. This means that while Spectra found 142 instances of legacy cryptography, the vast majority of these are in test files or backwards-compatibility shims for legacy authentication methods (like AWS IAM or LDAP).
            </p>
            <p>
              What's particularly well-handled is Vault's internal TLS configuration. It enforces strict cipher suites by default, but it still relies heavily on ECDHE for key exchange. To become CNSA 2.0 compliant, Vault will need to introduce ML-KEM hybrid key exchanges into its core listener configuration.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Migration Difficulty Assessment</h2>
            <p>
              Using Spectra's Cryptographic Agility Index (CAI), we score Vault at an <strong>82/100 (Highly Agile)</strong>.
              Because HashiCorp has centralized their cryptographic primitives, replacing the core RSA logic with ML-KEM can be done with relatively few pull requests.
            </p>

            <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl my-8">
              <h3 className="font-bold text-indigo-300 mb-2">Note to Project Maintainers</h3>
              <p className="text-sm text-indigo-100/80 m-0">
                This is a non-judgmental analysis. These algorithms were correct choices when they were written. This report is about what changes SHOULD happen to prepare for Q-Day, not about what was done WRONG. Vault remains one of the most secure systems available.
              </p>
            </div>

            <hr className="border-white/10 my-12" />

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Check your own code</h3>
              <div className="inline-block bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm mb-6">
                <span className="text-emerald-400">$</span> npm install -g spectra-cli<br/>
                <span className="text-emerald-400">$</span> spectra scan .
              </div>
              <div>
                <Link href="/playground" className="text-indigo-400 font-bold hover:text-indigo-300 flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" /> Try Spectra in your browser
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
