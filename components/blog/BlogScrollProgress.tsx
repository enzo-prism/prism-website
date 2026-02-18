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
      className="fixed inset-x-0 z-40 h-1.5 overflow-hidden rounded-full bg-border/80"
      style={{
        top: "calc(var(--prism-header-height, 4rem) - 1px)",
        pointerEvents: "none",
      }}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-300 shadow-[0_0_22px_rgba(56,189,248,0.7)] ring-1 ring-cyan-200/55 transition-[width] duration-200 motion-reduce:transition-none"
        style={{ width: `${scrollProgress}%` }}
      />
      <div
        className="absolute left-0 right-0 top-full h-6 opacity-0"
        aria-hidden
      />
    </div>
  )
}
