'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

const TIMELINE_DATA = [
  { year: 1977, name: 'DES', status: 'DEPRECATED', description: 'Data Encryption Standard. Vulnerable to brute-force attacks due to short 56-bit key size.', risk: 'CRITICAL' },
  { year: 1992, name: 'MD5', status: 'BROKEN', description: 'Message-Digest Algorithm 5. Vulnerable to severe collision attacks. Preimage resistance holds but unfit for any secure use.', risk: 'CRITICAL' },
  { year: 1995, name: 'SHA-1', status: 'BROKEN', description: 'Vulnerable to chosen-prefix collision attacks (SHAttered). Deprecated by NIST in 2011.', risk: 'CRITICAL' },
  { year: 1998, name: '3DES', status: 'DEPRECATED', description: 'Vulnerable to Sweet32 attack. NIST prohibited key generation after Dec 31, 2023.', risk: 'HIGH' },
  { year: 2001, name: 'AES-128', status: 'ACTIVE', description: 'Advanced Encryption Standard. Secure against classical attacks, but quantum Grover search effectively halves key size to 64 bits.', risk: 'MEDIUM' },
  { year: 2005, name: 'ECC P-256', status: 'ACTIVE', description: 'Elliptic Curve Cryptography. Fully broken by Shor’s algorithm running on a sufficiently large quantum computer.', risk: 'HIGH' },
  { year: 2030, name: 'RSA-2048', status: 'DEADLINE', description: 'CNSA 2.0 and NIST mandate phase-out. Fully broken by Shor’s algorithm.', risk: 'HIGH' },
  { year: 2033, name: 'ML-KEM', status: 'FUTURE', description: 'FIPS 203 Post-Quantum Key Encapsulation Mechanism. Designed to resist quantum cryptanalysis.', risk: 'SAFE' },
]

export default function TimelinePage() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const getRiskColor = (band: string) => {
    if (band === 'CRITICAL') return 'text-critical bg-critical/10 border-critical/30';
    if (band === 'HIGH') return 'text-high bg-high/10 border-high/30';
    if (band === 'MEDIUM') return 'text-medium bg-medium/10 border-medium/30';
    return 'text-safe bg-safe/10 border-safe/30';
  }

  const getStatusColor = (band: string) => {
    if (band === 'CRITICAL') return 'bg-critical';
    if (band === 'HIGH') return 'bg-high';
    if (band === 'MEDIUM') return 'bg-medium';
    return 'bg-safe';
  }

  return (
    <div className="min-h-screen bg-void text-surface font-sans flex flex-col overflow-x-hidden">
      

      <main className="flex-1 flex flex-col items-center justify-center relative px-8 py-24">
        
        <div className="text-center mb-32 max-w-2xl">
          <h1 className="font-serif text-[39px] font-light text-surface mb-6">The Cryptographic Half-Life</h1>
          <p className="font-sans text-[16px] text-graphite leading-relaxed">
            Algorithms do not break overnight. They decay. Hover over the nodes below to inspect the mathematical flaws that forced industry-wide deprecation.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative w-full max-w-6xl mx-auto h-64 flex items-center">
          {/* Base Line */}
          <div className="absolute left-0 right-0 h-px bg-border-dark" />
          
          {/* Nodes */}
          <div className="relative w-full flex justify-between items-center z-10 px-4">
            {TIMELINE_DATA.map((node, index) => (
              <div 
                key={index}
                className="relative group cursor-crosshair flex flex-col items-center"
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Year Label (Top) */}
                <div className="absolute bottom-full mb-8 font-mono text-[14px] text-graphite transition-colors group-hover:text-surface">
                  {node.year}
                </div>
                
                {/* Connecting Line (Top) */}
                <div className="absolute bottom-full mb-2 h-6 w-px bg-border-dark group-hover:bg-surface transition-colors" />

                {/* Node Point */}
                <div className={`w-3 h-3 rounded-full transition-transform duration-300 ${getStatusColor(node.risk)} ${hoveredNode === index ? 'scale-150' : ''}`} />

                {/* Connecting Line (Bottom) */}
                <div className="absolute top-full mt-2 h-6 w-px bg-border-dark group-hover:bg-surface transition-colors" />

                {/* Name Label (Bottom) */}
                <div className="absolute top-full mt-8 font-sans font-medium text-[16px] text-graphite transition-colors group-hover:text-surface whitespace-nowrap">
                  {node.name}
                </div>

                {/* Tooltip / Info Card */}
                {hoveredNode === index && (
                  <div className={`absolute top-full mt-20 w-64 p-4 border text-left z-50 backdrop-blur-md ${getRiskColor(node.risk)}`}>
                    <div className="flex justify-between items-center font-mono text-[12px] mb-2 uppercase tracking-widest">
                      <span>{node.status}</span>
                      <span>QRS: {node.risk}</span>
                    </div>
                    <div className="font-sans text-[14px] text-surface font-light leading-relaxed">
                      {node.description}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
