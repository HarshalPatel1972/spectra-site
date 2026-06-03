"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full border border-border bg-surface-0"></div>
  }

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className="flex items-center justify-center w-10 h-10 border border-border rounded-full bg-surface-0 hover:bg-surface-1 transition-colors text-[18px]"
      aria-label="Toggle theme"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  )
}
