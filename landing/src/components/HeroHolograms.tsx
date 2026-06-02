'use client'

import { motion } from 'framer-motion'
import { Lock, Key, ShieldCheck, Binary, FileBadge, Hash } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroHolograms() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Function to create a 3D chunky token style
  const getTokenStyle = (bgGrad: string, borderBottom: string, borderRight: string, shadow: string) => 
    `absolute hidden xl:flex items-center justify-center rounded-[1.25rem] border-t border-l border-white/20 bg-gradient-to-br ${bgGrad} ${shadow} text-white font-bold`

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Shield - Top Right - Brand Cyan */}
      <motion.div
        className={getTokenStyle(
          'from-brand to-[#1A7A7A]',
        ) + " w-24 h-24 top-[10%] right-[15%] z-20"}
        style={{
          borderBottom: '10px solid #105252',
          borderRight: '6px solid #156B6B',
        }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={44} className="drop-shadow-md" />
      </motion.div>

      {/* 2. Key - Bottom Left - Critical Red */}
      <motion.div
        className={getTokenStyle(
          'from-[#FF4560] to-[#A01D31]',
        ) + " w-20 h-20 bottom-[20%] left-[10%] z-20"}
        style={{
          borderBottom: '10px solid #630C1A',
          borderRight: '6px solid #8B1226',
        }}
        animate={{
          y: [0, 20, 0],
          rotate: [-12, 0, -12],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Key size={36} className="drop-shadow-md" />
      </motion.div>

      {/* 3. Lock - Center Right Background - Medium Yellow */}
      <motion.div
        className={getTokenStyle(
          'from-[#F5C842] to-[#B89222]',
        ) + " w-20 h-20 top-[45%] right-[5%] z-0"}
        style={{
          borderBottom: '10px solid #755B11',
          borderRight: '6px solid #9A7818',
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [10, -5, 10],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Lock size={36} className="drop-shadow-md" />
      </motion.div>

      {/* 4. Binary - Bottom Right - High Orange */}
      <motion.div
        className={getTokenStyle(
          'from-[#FF8F40] to-[#B3591C]',
        ) + " w-16 h-16 bottom-[10%] right-[30%] z-20"}
        style={{
          borderBottom: '8px solid #662E0A',
          borderRight: '4px solid #8C4010',
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [-10, 10, -10],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Binary size={28} className="drop-shadow-md" />
      </motion.div>

      {/* 5. Hash - Top Left - Safe Green */}
      <motion.div
        className={getTokenStyle(
          'from-[#4ADEA8] to-[#25946C]',
        ) + " w-16 h-16 top-[20%] left-[20%] z-20"}
        style={{
          borderBottom: '8px solid #12573D',
          borderRight: '4px solid #1B7855',
        }}
        animate={{
          y: [0, 25, 0],
          rotate: [15, 0, 15],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Hash size={28} className="drop-shadow-md" />
      </motion.div>
    </div>
  )
}
