"use client"

import { useEffect, useState } from "react"

export default function BlogScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
          setScrollProgress(Math.max(0, Math.min(progress, 100)))
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scrollProgress)}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-border/55"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-300 shadow-[0_0_16px_rgba(56,189,248,0.5)] transition-[width] duration-200 motion-reduce:transition-none"
        style={{ width: `${scrollProgress}%` }}
      />
      <div
        className="absolute left-0 right-0 top-full h-6 opacity-0"
        aria-hidden
      />
    </div>
  )
}
