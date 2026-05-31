import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="font-bold text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" /> Spectra
        </Link>
        <Link href="/blog" className="text-sm font-medium hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <article className="prose prose-invert prose-indigo lg:prose-lg mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              The Cryptographic Debt Nobody Is Talking About
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400 font-mono">
              <span>Oct 24, 2026</span>
              <span>&bull;</span>
              <span>Harshal Patel</span>
            </div>
          </header>

          <p className="lead text-xl text-slate-400">
            When we talk about technical debt, we usually mean messy architecture, undocumented functions, or outdated dependencies. We have tools like Dependabot and Snyk to warn us when a library has a CVE. But there is a silent, far more dangerous form of debt lurking in almost every enterprise codebase: <strong>Cryptographic Debt</strong>.
          </p>

          <h2>The Harvest Now, Decrypt Later Threat</h2>
          <p>
            Right now, nation-state actors are indiscriminately vacuuming up encrypted traffic. TLS handshakes, VPN tunnels, secure messaging protocols—they are storing it all in massive data centers. They can&apos;t decrypt it today. But they don&apos;t need to. They are waiting for Q-Day.
          </p>
          <p>
            Q-Day is the day a Cryptographically Relevant Quantum Computer (CRQC) comes online. On that day, Shor&apos;s algorithm can be used to factor the large primes that secure RSA, and solve the discrete logarithm problem that secures Elliptic Curve Cryptography (ECC).
          </p>
          <p>
            Every piece of data intercepted today that was secured with RSA, DH, or ECC will be decrypted tomorrow.
          </p>

          <h2>Why Software Composition Analysis (SCA) Fails</h2>
          <p>
            You might think your SCA tool has you covered. It doesn&apos;t. SCA tools look for CVEs in third-party packages. But hardcoding <code>RSA-1024</code> or using <code>MD5</code> is not a CVE in a library; it is a <strong>misuse of an API</strong> by your own developers.
          </p>
          <p>
            The standard library in Go (<code>crypto/rsa</code>), Python (<code>cryptography.hazmat</code>), and Java (<code>javax.crypto</code>) provides these algorithms. They are not "vulnerable packages"—they are tools. And developers are using the wrong tools.
          </p>

          <h2>Enter Spectra</h2>
          <p>
            This is why we built <strong>Spectra</strong>. Spectra doesn&apos;t just look for vulnerable packages. It performs deep static analysis to find the actual function calls, key sizes, and cryptographic primitives used in your code, dependencies, configurations, and certificates.
          </p>
          <p>
            It then assigns a <strong>Quantum Risk Score (QRS)</strong> to every finding, allowing you to prioritize the migration to NIST-approved Post-Quantum Cryptography (PQC) like ML-KEM and ML-DSA.
          </p>
          
          <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 my-8">
            <h3 className="text-white mt-0 mb-2">Ready to find your Cryptographic Debt?</h3>
            <p className="mb-4">Spectra is open-source and runs entirely locally. It takes 10 seconds to install and scan your first codebase.</p>
            <code>brew install spectra && spectra scan .</code>
          </div>
        </article>
      </main>
    </div>
  )
}
