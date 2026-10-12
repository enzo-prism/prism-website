"use client"

import { useEffect, useRef, useState } from "react"

/** Thin spectrum reading-progress hairline pinned to the top of long guides. */
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden"
    >
      <div
        className="bg-spectrum h-full origin-left opacity-90 will-change-transform transform-gpu"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  )
}
