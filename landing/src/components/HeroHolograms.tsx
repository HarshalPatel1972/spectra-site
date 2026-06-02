'use client'

import { motion } from 'framer-motion'
import { Lock, Key, ShieldCheck, Binary, FileBadge } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroHolograms() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Shared glassmorphic container styles
  const glassStyle = "absolute hidden xl:flex items-center justify-center rounded-2xl border border-brand/20 bg-surface-1/40 backdrop-blur-md shadow-[0_0_30px_rgba(46,196,196,0.15)] text-brand"

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Shield - Top Right */}
      <motion.div
        className={`${glassStyle} w-20 h-20 top-[10%] right-[5%] z-20`}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={36} className="opacity-80 drop-shadow-[0_0_10px_rgba(46,196,196,0.5)]" />
      </motion.div>

      {/* 2. Key - Bottom Left */}
      <motion.div
        className={`${glassStyle} w-16 h-16 bottom-[15%] left-[40%] z-20 bg-critical/10 border-critical/20 text-critical shadow-[0_0_30px_rgba(255,69,96,0.15)]`}
        animate={{
          y: [0, 15, 0],
          rotate: [-10, 0, -10],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Key size={28} className="opacity-80 drop-shadow-[0_0_10px_rgba(255,69,96,0.5)]" />
      </motion.div>

      {/* 3. Lock - Center Left Background */}
      <motion.div
        className={`${glassStyle} w-24 h-24 top-[35%] left-[2%] z-0 bg-brand/5 border-brand/10 opacity-60`}
        animate={{
          y: [0, 25, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Lock size={48} className="opacity-40" />
      </motion.div>

      {/* 4. Binary - Bottom Right Background */}
      <motion.div
        className={`${glassStyle} w-16 h-16 bottom-[5%] right-[15%] z-0 bg-high/10 border-high/20 text-high opacity-70`}
        animate={{
          y: [0, -15, 0],
          rotate: [5, -5, 5],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Binary size={28} className="opacity-60" />
      </motion.div>

      {/* 5. FileBadge - Top Left */}
      <motion.div
        className={`${glassStyle} w-14 h-14 top-[15%] left-[35%] z-20 bg-medium/10 border-medium/20 text-medium shadow-[0_0_30px_rgba(245,200,66,0.15)]`}
        animate={{
          y: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <FileBadge size={24} className="opacity-80 drop-shadow-[0_0_10px_rgba(245,200,66,0.5)]" />
      </motion.div>
    </div>
  )
}
