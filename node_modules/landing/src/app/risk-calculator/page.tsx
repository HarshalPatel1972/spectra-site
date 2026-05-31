'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, ArrowRight, Activity, Server, Users, Settings } from 'lucide-react'

// Simple client-side implementation of QRS logic for the calculator
function computeBaseQRS(algo: string): number {
  if (algo.includes('RSA')) return 90
  if (algo.includes('ECDSA') || algo.includes('ECC') || algo.includes('DH')) return 85
  if (algo.includes('SHA-1') || algo.includes('MD5')) return 70
  if (algo.includes('DES') || algo.includes('RC4')) return 65
  if (algo.includes('AES')) return 20 // Safe against Shor, needs Grover adjustment (double key size)
  if (algo.includes('ML-') || algo.includes('SLH-')) return 0 // PQC Safe
  return 50
}

export default function QRSCalculator() {
  const [algorithms, setAlgorithms] = useState<string[]>([])
  const [usages, setUsages] = useState<Record<string, number>>({})
  const [exposure, setExposure] = useState<string[]>([])
  const [qrs, setQrs] = useState(0)

  const toggleAlgo = (algo: string) => {
    if (algorithms.includes(algo)) {
      setAlgorithms(algorithms.filter(a => a !== algo))
      const newUsages = { ...usages }
      delete newUsages[algo]
      setUsages(newUsages)
    } else {
      setAlgorithms([...algorithms, algo])
      setUsages({ ...usages, [algo]: 10 }) // default 10 usages
    }
  }

  const toggleExposure = (exp: string) => {
    if (exposure.includes(exp)) {
      setExposure(exposure.filter(e => e !== exp))
    } else {
      setExposure([...exposure, exp])
    }
  }

  // Real-time QRS calculation
  useEffect(() => {
    if (algorithms.length === 0) {
      setQrs(0)
      return
    }

    let maxQRS = 0
    algorithms.forEach(algo => {
      let score = computeBaseQRS(algo)
      
      // Frequency boost
      const count = usages[algo] || 0
      if (count >= 21) score += 10
      else if (count >= 6) score += 5
      else if (count >= 2) score += 2

      // Exposure context boost (synthetic for the calculator)
      if (exposure.includes('public_api')) score += 5
      if (exposure.includes('customer_data')) score += 5

      score = Math.min(100, score)
      if (score > maxQRS) maxQRS = score
    })

    setQrs(Math.floor(maxQRS))
  }, [algorithms, usages, exposure])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
          &larr; <Shield className="w-5 h-5" /> Back
        </Link>
        <div className="font-mono text-sm tracking-widest text-slate-500 uppercase">QRS Calculator</div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">What is your Quantum Risk Score?</h1>
            <p className="text-slate-400">Calculate your exposure to cryptographically relevant quantum computers in real-time.</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">1</span>
              Which algorithms do you actively use?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['RSA-2048', 'RSA-4096', 'ECDSA/P-256', 'SHA-1', 'SHA-256', 'AES-128', 'AES-256', 'DES', 'ML-KEM'].map(algo => (
                <button
                  key={algo}
                  onClick={() => toggleAlgo(algo)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    algorithms.includes(algo) 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium' 
                      : 'bg-slate-900 border-white/10 hover:border-white/30'
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </section>

          {algorithms.length > 0 && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">2</span>
                How many usages (roughly)?
              </h2>
              <div className="space-y-4">
                {algorithms.map(algo => (
                  <div key={algo} className="bg-slate-900 p-4 rounded-lg border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-white">{algo}</span>
                      <span className="text-indigo-400 font-mono">{usages[algo]} files</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={usages[algo]}
                      onChange={(e) => setUsages({...usages, [algo]: parseInt(e.target.value)})}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">3</span>
              Where is it used?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 'public_api', label: 'Public-facing API', icon: Activity },
                { id: 'internal', label: 'Internal only', icon: Server },
                { id: 'customer_data', label: 'Customer data', icon: Users },
                { id: 'test_infra', label: 'Test infrastructure', icon: Settings },
              ].map(exp => (
                <button
                  key={exp.id}
                  onClick={() => toggleExposure(exp.id)}
                  className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                    exposure.includes(exp.id)
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium' 
                      : 'bg-slate-900 border-white/10 hover:border-white/30'
                  }`}
                >
                  <exp.icon className="w-4 h-4 opacity-70" />
                  {exp.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Floating Results Panel */}
        <div>
          <div className="sticky top-24 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="text-sm uppercase tracking-widest text-slate-500 font-bold mb-6">Estimated Score</div>
            
            <div className="flex justify-center mb-8 relative">
              {/* Circular progress could go here, for now a big number */}
              <div className={`text-8xl font-black ${
                qrs >= 80 ? 'text-red-500' :
                qrs >= 60 ? 'text-orange-500' :
                qrs >= 40 ? 'text-yellow-500' :
                'text-emerald-500'
              }`}>
                {qrs}
              </div>
              <div className="absolute -bottom-4 font-mono text-slate-400">/ 100</div>
            </div>

            <div className="text-center mb-8">
              <div className="font-bold text-lg text-white mb-2">
                {qrs >= 80 ? 'CRITICAL RISK' : qrs >= 60 ? 'HIGH RISK' : qrs >= 40 ? 'MEDIUM RISK' : 'SAFE'}
              </div>
              <p className="text-sm text-slate-400">
                {qrs >= 80 ? 'Your infrastructure is highly vulnerable to Harvest Now, Decrypt Later attacks.' : 
                 qrs >= 60 ? 'You have significant exposure that requires immediate planning.' :
                 qrs === 0 ? 'Select algorithms to calculate your score.' :
                 'Your cryptographic posture is strong, but requires continuous monitoring.'}
              </p>
            </div>

            <Link href="/playground" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors">
              Get Migration Plan <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs text-slate-500 mt-4">
              Or run <code className="text-slate-400">spectra scan .</code> locally
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
