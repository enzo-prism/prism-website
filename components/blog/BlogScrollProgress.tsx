"use client"

import { useEffect, useRef, useState } from "react"

const SMOOTHING_FACTOR = 0.22

export default function BlogScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const getScrollProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    if (docHeight <= 0) {
      return 0
    }

    const progress = (scrollTop / docHeight) * 100
    return Math.max(0, Math.min(progress, 100))
  }

  const animateProgress = () => {
    const target = targetProgressRef.current
    const nextProgress =
      currentProgressRef.current + (target - currentProgressRef.current) * SMOOTHING_FACTOR

    currentProgressRef.current =
      Math.abs(target - nextProgress) < 0.1 ? target : nextProgress

    setScrollProgress(currentProgressRef.current)

    if (currentProgressRef.current !== target) {
      rafRef.current = requestAnimationFrame(animateProgress)
      return
    }

    rafRef.current = null
  }

  const updateTargetProgress = () => {
    targetProgressRef.current = getScrollProgress()

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animateProgress)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", updateTargetProgress, { passive: true })
    window.addEventListener("resize", updateTargetProgress, { passive: true })
    updateTargetProgress()

    return () => {
      window.removeEventListener("scroll", updateTargetProgress)
      window.removeEventListener("resize", updateTargetProgress)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
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
        className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-300 shadow-[0_0_22px_rgba(56,189,248,0.7)] ring-1 ring-cyan-200/55 will-change-transform transform-gpu motion-reduce:transition-none"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />
      <div
        className="absolute left-0 right-0 top-full h-6 opacity-0"
        aria-hidden
      />
    </div>
  )
}
