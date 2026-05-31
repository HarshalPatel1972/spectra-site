'use client'

import { motion } from 'framer-motion'
import { Server, Database, Key, ShieldAlert, ArrowRight, ShieldCheck, FileText, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WhatHappensPage() {
  const [stage, setStage] = useState<'healthy' | 'q-day' | 'recovering'>('healthy')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">
          &larr; Back to Spectra
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setStage(stage === 'healthy' ? 'q-day' : stage === 'q-day' ? 'recovering' : 'healthy')}
            className={`px-4 py-2 rounded-md font-bold transition-all ${
              stage === 'healthy' ? 'bg-red-600 hover:bg-red-700 text-white' : 
              stage === 'q-day' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 
              'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {stage === 'healthy' ? 'Simulate Q-Day' : stage === 'q-day' ? 'Run Spectra Migration' : 'Reset Simulation'}
          </button>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          What Happens If Quantum Computers Arrive Tomorrow?
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Right now, your infrastructure is protected by mathematics. RSA-2048 is secure because factoring large integers is hard. ECDSA is secure because the discrete logarithm problem is hard. A quantum computer running Shor&apos;s algorithm solves both in polynomial time.
        </p>
      </section>

      {/* Visualization Canvas */}
      <section className="w-full max-w-6xl mx-auto px-8 pb-32">
        <div className="relative aspect-video rounded-2xl border border-white/10 bg-slate-900/50 shadow-2xl overflow-hidden flex items-center justify-center">
          
          {/* Animated Background */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-[0.03] pointer-events-none">
            {Array.from({length: 144}).map((_, i) => <div key={i} className="bg-white rounded-sm" />)}
          </div>

          {/* Central Nodes Wrapper */}
          <div className="relative w-full h-full max-w-4xl max-h-[600px] flex items-center justify-center">
            
            {/* The Internet (Center) */}
            <motion.div 
              className={`absolute w-32 h-32 rounded-full flex flex-col items-center justify-center z-20 border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-900 transition-colors duration-1000 ${
                stage === 'healthy' ? 'border-emerald-500 shadow-emerald-500/20' : 
                stage === 'q-day' ? 'border-red-600 shadow-red-600/50' : 
                'border-indigo-500 shadow-indigo-500/30'
              }`}
            >
              {stage === 'q-day' ? <ShieldAlert className="w-12 h-12 text-red-500 mb-1" /> : <Lock className={`w-12 h-12 mb-1 ${stage === 'healthy' ? 'text-emerald-500' : 'text-indigo-400'}`} />}
              <span className="font-bold text-xs uppercase tracking-wider">{stage === 'q-day' ? 'Compromised' : 'Secure Core'}</span>
            </motion.div>

            {/* Connecting Lines & Outer Nodes */}
            {[
              { id: 1, angle: 0, label: 'Payment API', icon: Server, algo: 'RSA-2048' },
              { id: 2, angle: 72, label: 'Auth DB', icon: Database, algo: 'ECDSA' },
              { id: 3, angle: 144, label: 'VPN Gateway', icon: Key, algo: 'Diffie-Hellman' },
              { id: 4, angle: 216, label: 'Cert Authority', icon: FileText, algo: 'RSA-4096' },
              { id: 5, angle: 288, label: 'JWT Signer', icon: ShieldCheck, algo: 'ECDSA' },
            ].map((node, i) => (
              <div key={node.id} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${node.angle}deg)` }}>
                {/* Connecting Line */}
                <motion.div 
                  className={`absolute h-[2px] right-[50%] origin-right transition-colors duration-1000 ${
                    stage === 'healthy' ? 'bg-emerald-500/50' : 
                    stage === 'q-day' ? 'bg-red-500/50' : 
                    'bg-indigo-500/50'
                  }`}
                  style={{ width: '250px' }}
                >
                  {/* Data packet animation */}
                  <motion.div 
                    className={`h-full w-4 rounded-full ${
                      stage === 'healthy' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 
                      stage === 'q-day' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 
                      'bg-indigo-400 shadow-[0_0_10px_#818cf8]'
                    }`}
                    animate={stage === 'q-day' ? { x: [250, 0], opacity: [0, 1, 0] } : { x: [0, 250], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                  {/* Algorithm Label */}
                  <div className="absolute top-[-20px] left-[100px] text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 whitespace-nowrap" style={{ transform: `rotate(-${node.angle}deg)` }}>
                    {stage === 'recovering' ? (node.algo.includes('RSA') ? 'ML-KEM' : 'ML-DSA') : node.algo}
                  </div>
                </motion.div>

                {/* Node */}
                <motion.div 
                  className={`absolute left-[calc(50%-250px-24px)] w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-slate-900 z-10 transition-colors duration-1000 ${
                    stage === 'healthy' ? 'border-emerald-500/50 text-emerald-400' : 
                    stage === 'q-day' ? 'border-red-500 text-red-500 bg-red-500/10' : 
                    'border-indigo-500/50 text-indigo-400 bg-indigo-500/10'
                  }`}
                  style={{ transform: `rotate(-${node.angle}deg)` }}
                >
                  <node.icon className="w-6 h-6" />
                  <div className="absolute -bottom-8 whitespace-nowrap text-sm font-medium text-slate-300">
                    {node.label}
                  </div>
                  {stage === 'q-day' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 text-2xl">
                      ❌
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Status Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className={`p-4 rounded-lg border backdrop-blur-md transition-colors duration-500 ${
              stage === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/20' : 
              stage === 'q-day' ? 'bg-red-500/20 border-red-500/30' : 
              'bg-indigo-500/20 border-indigo-500/30'
            }`}>
              {stage === 'healthy' && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="font-mono text-sm">STATUS: SECURE</span>
                  <span className="text-sm">Classical cryptography intact.</span>
                </div>
              )}
              {stage === 'q-day' && (
                <div className="flex justify-between items-center text-red-400">
                  <span className="font-mono text-sm font-bold">STATUS: COMPROMISED (Q-DAY)</span>
                  <span className="text-sm">Shor&apos;s algorithm has factored all RSA and ECC keys.</span>
                </div>
              )}
              {stage === 'recovering' && (
                <div className="flex justify-between items-center text-indigo-400">
                  <span className="font-mono text-sm">STATUS: MIGRATING TO PQC</span>
                  <span className="text-sm">Replacing RSA with ML-KEM. Spectra action plan executing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t border-white/10 bg-slate-900/50 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Where Does Your Code Stand?</h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Spectra scans your codebase, certificates, and dependencies to find exactly which algorithms you need to migrate. Free. Open source. No account.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold text-lg">
          Start Your Migration <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
