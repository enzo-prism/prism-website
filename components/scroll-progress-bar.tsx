"use client"

import { useEffect, useRef, useState } from "react"

const SMOOTHING_FACTOR = 0.18

export default function ScrollProgressBar() {
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

    const scrollPercent = (scrollTop / docHeight) * 100

    return Math.min(Math.max(scrollPercent, 0), 100)
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
    // Update on scroll
    window.addEventListener("scroll", updateTargetProgress, { passive: true })

    // Update on resize (in case content height changes)
    window.addEventListener("resize", updateTargetProgress, { passive: true })

    // Initial calculation
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
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 w-full bg-border/60 shadow-sm">
      <div
        className="h-full origin-left bg-foreground will-change-transform transform-gpu"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />
    </div>
  )
}
