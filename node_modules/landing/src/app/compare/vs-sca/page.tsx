import { Shield, Box, Activity, GitCommit, Search } from 'lucide-react'
import Link from 'next/link'

export default function CompareSCAPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold mb-12">
          &larr; Back to Spectra
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Box className="w-12 h-12 text-slate-500" />
            <span className="text-4xl text-slate-600 font-light">vs</span>
            <Shield className="w-12 h-12 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Spectra vs. Generic SCA Tools</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Spectra is <strong>not</strong> a replacement for Snyk, Trivy, or Dependabot. 
            They solve entirely different problems and are highly complementary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Software Composition Analysis (SCA)</h2>
            <p className="text-slate-500 mb-6 font-medium">Snyk, Trivy, Dependabot</p>
            
            <h3 className="font-bold text-slate-300 mb-3 uppercase text-sm tracking-wider">The Goal</h3>
            <p className="text-slate-400 mb-6">Find known vulnerabilities (CVEs) in your third-party dependencies.</p>
            
            <h3 className="font-bold text-slate-300 mb-3 uppercase text-sm tracking-wider">The Blind Spot</h3>
            <p className="text-red-400/90 mb-4 font-medium border-l-2 border-red-500/50 pl-4">
              A dependency with zero CVEs can still use RSA-2048 or SHA-1 internally.
            </p>
            <p className="text-red-400/90 font-medium border-l-2 border-red-500/50 pl-4">
              A file with no dependencies can still manually call `crypto.createHash('md5')`.
            </p>
          </div>

          <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Spectra</h2>
            <p className="text-indigo-300/70 mb-6 font-medium relative z-10">Cryptographic Intelligence</p>
            
            <h3 className="font-bold text-indigo-300 mb-3 uppercase text-sm tracking-wider relative z-10">The Goal</h3>
            <p className="text-indigo-100 mb-6 relative z-10">Discover your exact cryptographic exposure (algorithms, key sizes, curves) and quantify your quantum risk.</p>
            
            <h3 className="font-bold text-indigo-300 mb-3 uppercase text-sm tracking-wider relative z-10">The Capability</h3>
            <p className="text-indigo-100 font-medium border-l-2 border-indigo-400 pl-4 relative z-10 mb-4">
              Scans your 1st-party code, certificates, configs, and containers—not just dependency manifests.
            </p>
            <p className="text-indigo-100 font-medium border-l-2 border-indigo-400 pl-4 relative z-10">
              Generates a CBOM (Cryptographic Bill of Materials), preparing you for CNSA 2.0.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center mb-16">
          <h3 className="text-xl font-bold text-white mb-4">The Ideal Setup</h3>
          <p className="text-slate-400">
            Run your SCA tool to patch CVEs. <br/>
            Run Spectra to eliminate algorithmic debt and prepare for Q-Day.
          </p>
        </div>

        <div className="text-center">
          <Link href="/playground" className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all">
            See the Difference in the Playground
          </Link>
        </div>
      </div>
    </div>
  )
}
