'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

// Mock graph nodes for demonstration of Spectra Forge
const GRAPH_NODES = [
  { id: 'api.cert', type: 'Certificate', algo: 'RSA-2048', risk: 'CRITICAL', deps: ['auth.go', 'tls.go'] },
  { id: 'auth.go', type: 'Source', algo: 'RSA-2048', risk: 'CRITICAL', deps: ['jwt.go'] },
  { id: 'tls.go', type: 'Source', algo: 'AES-128', risk: 'MEDIUM', deps: [] },
  { id: 'jwt.go', type: 'Source', algo: 'SHA-1', risk: 'HIGH', deps: [] },
  { id: 'package.json', type: 'Manifest', algo: 'MD5 (dependency)', risk: 'CRITICAL', deps: [] }
]

export default function SimulatorPage() {
  const [wave, setWave] = useState<number>(0)

  const getRiskColor = (risk: string, waveTarget: number) => {
    // If wave >= target, the node has been migrated to ML-KEM
    if (wave >= waveTarget) return 'border-safe bg-safe/10 text-safe';
    
    if (risk === 'CRITICAL') return 'border-critical bg-critical/10 text-critical';
    if (risk === 'HIGH') return 'border-high bg-high/10 text-high';
    if (risk === 'MEDIUM') return 'border-medium bg-medium/10 text-medium';
    return 'border-safe bg-safe/10 text-safe';
  }

  const getAlgo = (algo: string, waveTarget: number) => {
    if (wave >= waveTarget) return 'ML-KEM';
    return algo;
  }

  return (
    <div className="min-h-screen bg-void text-surface font-sans flex flex-col">
      <header className="border-b border-border-dark px-8 h-16 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-graphite font-mono text-[14px] ml-4">/ simulate</span>
        </Link>
        <div className="font-mono text-[14px] text-graphite uppercase tracking-widest">
          Spectra Forge
        </div>
      </header>

      <main className="flex-1 grid grid-cols-3">
        {/* Sidebar Controls */}
        <div className="border-r border-border-dark p-8 flex flex-col bg-obsidian">
          <h1 className="font-serif text-[25px] font-light text-surface mb-2">Migration Simulator</h1>
          <p className="font-sans text-[14px] text-graphite mb-12">
            Calculate the blast radius of cryptographic upgrades and generate a phased migration plan.
          </p>

          <div className="space-y-8 flex-1">
            <div>
              <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-4">Migration Target</div>
              <select className="w-full bg-void border border-border-dark text-surface px-4 py-2 font-mono text-[14px] outline-none focus:border-calibration">
                <option>NIST FIPS 203 (ML-KEM)</option>
                <option>NSA CNSA 2.0</option>
              </select>
            </div>

            <div>
              <div className="font-mono text-[12px] text-graphite uppercase tracking-widest mb-4">Simulation Timeline</div>
              <div className="space-y-2">
                <button 
                  onClick={() => setWave(0)}
                  className={`w-full text-left px-4 py-3 border font-sans text-[14px] transition-colors ${wave === 0 ? 'bg-calibration/20 border-calibration text-surface' : 'border-border-dark text-graphite hover:border-graphite'}`}
                >
                  Current State (QRS: 83)
                </button>
                <button 
                  onClick={() => setWave(1)}
                  className={`w-full text-left px-4 py-3 border font-sans text-[14px] transition-colors ${wave === 1 ? 'bg-calibration/20 border-calibration text-surface' : 'border-border-dark text-graphite hover:border-graphite'}`}
                >
                  Wave 1: Edge Certificates (QRS: 45)
                </button>
                <button 
                  onClick={() => setWave(2)}
                  className={`w-full text-left px-4 py-3 border font-sans text-[14px] transition-colors ${wave === 2 ? 'bg-calibration/20 border-calibration text-surface' : 'border-border-dark text-graphite hover:border-graphite'}`}
                >
                  Wave 2: Identity/Auth (QRS: 12)
                </button>
                <button 
                  onClick={() => setWave(3)}
                  className={`w-full text-left px-4 py-3 border font-sans text-[14px] transition-colors ${wave === 3 ? 'bg-calibration/20 border-calibration text-surface' : 'border-border-dark text-graphite hover:border-graphite'}`}
                >
                  Wave 3: Dependencies (QRS: 0)
                </button>
              </div>
            </div>
          </div>

          <div className="font-mono text-[12px] text-graphite bg-void p-4 border border-border-dark">
            $ spectra simulate --target fips203
          </div>
        </div>

        {/* Graph Area */}
        <div className="col-span-2 relative p-12 overflow-hidden flex items-center justify-center bg-[#07080A]">
          {/* Node 1: api.cert */}
          <div className={`absolute top-1/4 left-1/4 p-4 border w-48 transition-colors duration-1000 ${getRiskColor(GRAPH_NODES[0].risk, 1)}`}>
            <div className="font-mono text-[12px] mb-2">{GRAPH_NODES[0].id}</div>
            <div className="font-sans font-medium text-[16px] text-surface">{getAlgo(GRAPH_NODES[0].algo, 1)}</div>
          </div>

          {/* Node 2: auth.go */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border w-48 transition-colors duration-1000 ${getRiskColor(GRAPH_NODES[1].risk, 2)}`}>
            <div className="font-mono text-[12px] mb-2">{GRAPH_NODES[1].id}</div>
            <div className="font-sans font-medium text-[16px] text-surface">{getAlgo(GRAPH_NODES[1].algo, 2)}</div>
          </div>

          {/* Node 3: tls.go */}
          <div className={`absolute top-1/4 right-1/4 p-4 border w-48 transition-colors duration-1000 ${getRiskColor(GRAPH_NODES[2].risk, 2)}`}>
            <div className="font-mono text-[12px] mb-2">{GRAPH_NODES[2].id}</div>
            <div className="font-sans font-medium text-[16px] text-surface">{GRAPH_NODES[2].algo}</div>
          </div>

          {/* Node 4: jwt.go */}
          <div className={`absolute bottom-1/4 left-1/2 p-4 border w-48 transition-colors duration-1000 ${getRiskColor(GRAPH_NODES[3].risk, 2)}`}>
            <div className="font-mono text-[12px] mb-2">{GRAPH_NODES[3].id}</div>
            <div className="font-sans font-medium text-[16px] text-surface">{getAlgo(GRAPH_NODES[3].algo, 2)}</div>
          </div>

          {/* Node 5: package.json */}
          <div className={`absolute bottom-1/4 right-1/4 p-4 border w-48 transition-colors duration-1000 ${getRiskColor(GRAPH_NODES[4].risk, 3)}`}>
            <div className="font-mono text-[12px] mb-2">{GRAPH_NODES[4].id}</div>
            <div className="font-sans font-medium text-[16px] text-surface">{getAlgo(GRAPH_NODES[4].algo, 3)}</div>
          </div>

          {/* Lines (CSS Mocked for demo) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Draw simple lines connecting the nodes */}
            <line x1="30%" y1="30%" x2="45%" y2="45%" stroke="#2A2B35" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="55%" x2="55%" y2="70%" stroke="#2A2B35" strokeWidth="2" />
          </svg>
        </div>
      </main>
    </div>
  )
}
