'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

// Simple client-side implementation of QRS logic for the calculator
function computeBaseQRS(algo: string): number {
  if (algo.includes('RSA')) return 90
  if (algo.includes('ECDSA') || algo.includes('ECC') || algo.includes('DH')) return 85
  if (algo.includes('SHA-1') || algo.includes('MD5')) return 70
  if (algo.includes('DES') || algo.includes('RC4')) return 65
  if (algo.includes('AES')) return 20
  if (algo.includes('ML-') || algo.includes('SLH-')) return 0
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
      setUsages({ ...usages, [algo]: 10 })
    }
  }

  const toggleExposure = (exp: string) => {
    if (exposure.includes(exp)) {
      setExposure(exposure.filter(e => e !== exp))
    } else {
      setExposure([...exposure, exp])
    }
  }

  useEffect(() => {
    if (algorithms.length === 0) {
      setQrs(0)
      return
    }

    let maxQRS = 0
    algorithms.forEach(algo => {
      let score = computeBaseQRS(algo)
      
      const count = usages[algo] || 0
      if (count >= 21) score += 10
      else if (count >= 6) score += 5
      else if (count >= 2) score += 2

      if (exposure.includes('public_api')) score += 5
      if (exposure.includes('customer_data')) score += 5

      score = Math.min(100, score)
      if (score > maxQRS) maxQRS = score
    })

    setQrs(Math.floor(maxQRS))
  }, [algorithms, usages, exposure])

  return (
    <div className="min-h-screen bg-void text-surface font-sans flex flex-col">
      

      <main className="max-w-[1200px] mx-auto px-8 py-24 grid md:grid-cols-3 gap-16 flex-1 w-full">
        <div className="md:col-span-2 space-y-16">
          <div>
            <h1 className="font-serif text-[39px] font-light text-surface mb-4">Quantum Risk Score Calculator</h1>
            <p className="font-sans text-[14px] text-graphite leading-relaxed">Calculate your codebase's exposure to cryptographically relevant quantum computers based on the QRS framework.</p>
          </div>

          <section>
            <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-6">1. Active Algorithms</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['RSA-2048', 'RSA-4096', 'ECDSA/P-256', 'SHA-1', 'SHA-256', 'AES-128', 'AES-256', 'DES', 'ML-KEM'].map(algo => (
                <button
                  key={algo}
                  onClick={() => toggleAlgo(algo)}
                  className={`p-4 border font-sans text-[14px] text-left transition-colors ${
                    algorithms.includes(algo) 
                      ? 'bg-calibration/20 border-calibration text-surface' 
                      : 'bg-obsidian border-border-dark text-graphite hover:border-graphite'
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </section>

          {algorithms.length > 0 && (
            <section className="animate-[finding-emerge_300ms_cubic-bezier(0,0,0.2,1)_forwards]">
              <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-6">2. Usage Frequency</div>
              <div className="space-y-4">
                {algorithms.map(algo => (
                  <div key={algo} className="bg-obsidian p-6 border border-border-dark">
                    <div className="flex justify-between mb-4 font-sans text-[14px]">
                      <span className="text-surface">{algo}</span>
                      <span className="text-calibration tabular-nums">{usages[algo]} files</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={usages[algo]}
                      onChange={(e) => setUsages({...usages, [algo]: parseInt(e.target.value)})}
                      className="w-full accent-calibration"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-6">3. Contextual Exposure</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { id: 'public_api', label: 'Public-facing API' },
                { id: 'internal', label: 'Internal Services' },
                { id: 'customer_data', label: 'Customer Data' },
                { id: 'test_infra', label: 'Test Infrastructure' },
              ].map(exp => (
                <button
                  key={exp.id}
                  onClick={() => toggleExposure(exp.id)}
                  className={`p-4 border font-sans text-[14px] text-left transition-colors ${
                    exposure.includes(exp.id)
                      ? 'bg-calibration/20 border-calibration text-surface' 
                      : 'bg-obsidian border-border-dark text-graphite hover:border-graphite'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Results Panel */}
        <div>
          <div className="sticky top-24 bg-obsidian border border-border-dark p-8">
            <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-8">Estimated QRS</div>
            
            <div className="flex justify-center mb-12">
              <div className={`font-mono text-[96px] leading-none tabular-nums ${
                qrs >= 80 ? 'text-critical' :
                qrs >= 60 ? 'text-high' :
                qrs >= 40 ? 'text-medium' :
                'text-safe'
              }`}>
                {qrs}<span className="text-[31px] text-graphite align-bottom ml-2">/100</span>
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="font-mono text-[14px] uppercase tracking-widest mb-4">
                {qrs >= 80 ? <span className="text-critical">CRITICAL RISK</span> : qrs >= 60 ? <span className="text-high">HIGH RISK</span> : qrs >= 40 ? <span className="text-medium">MEDIUM RISK</span> : <span className="text-safe">SAFE</span>}
              </div>
              <p className="font-sans text-[14px] text-graphite leading-relaxed">
                {qrs >= 80 ? 'Critical exposure to Harvest Now, Decrypt Later attacks.' : 
                 qrs >= 60 ? 'Significant exposure requiring immediate migration planning.' :
                 qrs === 0 ? 'Select algorithms to calculate your score.' :
                 'Cryptographic posture is strong.'}
              </p>
            </div>

            <Link href="/playground" className="block text-center w-full py-4 bg-calibration text-surface font-sans text-[14px] font-medium transition-colors hover:bg-calibration-light">
              Simulate Migration →
            </Link>
            <p className="text-center text-[12px] text-graphite font-mono mt-6">
              $ spectra scan .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
