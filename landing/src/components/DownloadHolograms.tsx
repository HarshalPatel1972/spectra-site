'use client'

import { motion } from 'framer-motion'
import { Terminal, Code2, ShieldCheck, Key, Lock, Binary, Hash } from 'lucide-react'
import { useEffect, useState } from 'react'

export function DownloadHolograms() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Function to create a 3D chunky token style (reused from HeroHolograms)
  const getTokenStyle = (bgGrad: string, borderBottom: string, borderRight: string, shadow: string) => 
    `absolute hidden xl:flex items-center justify-center rounded-[1.25rem] border-t border-l border-white/20 bg-gradient-to-br ${bgGrad} ${shadow} text-white font-bold`

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* 1. Isometric Terminal Window - Left */}
      <motion.div
        className="absolute top-[20%] left-[5%] w-[300px] bg-surface-0 border border-border/50 rounded-xl shadow-2xl overflow-hidden hidden xl:block"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '-20px 20px 40px rgba(0,0,0,0.5)',
        }}
        animate={{
          y: [0, -30, 0],
          rotateX: [20, 25, 20],
          rotateY: [30, 35, 30],
          rotateZ: [-5, -2, -5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-8 bg-surface-1 border-b border-border/50 flex items-center px-3 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-critical"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-medium"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-safe"></div>
          <Terminal size={14} className="ml-auto text-text-muted" />
        </div>
        <div className="p-4 font-mono text-[12px] text-brand">
          $ spectra scan .<br/>
          <span className="text-text-primary">Scanning cryptography...</span><br/>
          <span className="text-critical">CRITICAL: RSA-2048 detected</span><br/>
          <span className="text-text-muted">Migration: ML-KEM-1024</span>
        </div>
      </motion.div>

      {/* 2. Isometric VS Code Window - Right */}
      <motion.div
        className="absolute top-[30%] right-[5%] w-[250px] bg-surface-0 border border-border/50 rounded-xl shadow-2xl overflow-hidden hidden xl:block"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '20px 30px 50px rgba(0,0,0,0.5)',
        }}
        animate={{
          y: [0, 20, 0],
          rotateX: [15, 20, 15],
          rotateY: [-25, -30, -25],
          rotateZ: [5, 2, 5]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="h-8 bg-surface-1 border-b border-border/50 flex items-center px-3">
          <Code2 size={14} className="text-brand" />
          <span className="ml-2 text-[10px] text-text-muted font-sans">jwt.go - VS Code</span>
        </div>
        <div className="p-4 font-mono text-[10px] leading-relaxed text-text-secondary">
          <span className="text-[#F5C842]">import</span> "crypto/rsa"<br/><br/>
          <span className="text-brand">func</span> GenerateKey() {'{'}<br/>
          &nbsp;&nbsp;key, err := rsa.GenerateKey(<span className="underline decoration-critical decoration-wavy text-critical font-bold border-b border-critical/30">2048</span>)<br/>
          {'}'}
        </div>
      </motion.div>

      {/* 3. Isometric GitHub Action Box - Bottom Center */}
      <motion.div
        className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[220px] bg-surface-0 border border-border/50 rounded-xl shadow-2xl overflow-hidden hidden xl:block"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 30px 60px rgba(46,196,196,0.1)',
        }}
        animate={{
          y: [0, -15, 0],
          rotateX: [40, 45, 40],
          rotateY: [0, -5, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="h-8 bg-surface-1 border-b border-border/50 flex items-center px-3 gap-2 text-text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <span className="text-[10px] font-sans">Checks</span>
        </div>
        <div className="p-3 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-critical/20 flex items-center justify-center text-critical">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-text-primary">Spectra CI</span>
            <span className="text-[10px] text-text-muted">Blocked: RSA-2048 found</span>
          </div>
        </div>
      </motion.div>

      {/* FLOATING TOKENS (Reused from Hero) */}
      <motion.div
        className={getTokenStyle('from-brand to-[#1A7A7A]', '10px solid #105252', '6px solid #156B6B', 'shadow-[0_15px_30px_rgba(0,0,0,0.4)]') + " w-20 h-20 bottom-[30%] left-[20%] z-20"}
        style={{ borderBottom: '10px solid #105252', borderRight: '6px solid #156B6B' }}
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={36} className="drop-shadow-md" />
      </motion.div>

      <motion.div
        className={getTokenStyle('from-[#FF4560] to-[#A01D31]', '10px solid #630C1A', '6px solid #8B1226', 'shadow-[0_15px_30px_rgba(0,0,0,0.4)]') + " w-16 h-16 top-[15%] left-[30%] z-20"}
        style={{ borderBottom: '8px solid #630C1A', borderRight: '4px solid #8B1226' }}
        animate={{ y: [0, 20, 0], rotate: [-12, 0, -12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Key size={28} className="drop-shadow-md" />
      </motion.div>

      <motion.div
        className={getTokenStyle('from-[#F5C842] to-[#B89222]', '10px solid #755B11', '6px solid #9A7818', 'shadow-[0_15px_30px_rgba(0,0,0,0.4)]') + " w-16 h-16 bottom-[15%] right-[25%] z-0"}
        style={{ borderBottom: '8px solid #755B11', borderRight: '4px solid #9A7818' }}
        animate={{ y: [0, -15, 0], rotate: [10, -15, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Lock size={28} className="drop-shadow-md" />
      </motion.div>

    </div>
  )
}
