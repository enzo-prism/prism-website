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
      className="pointer-events-none fixed inset-x-0 z-40 h-[2px] overflow-hidden"
      style={{ top: "calc(var(--prism-header-height, 4rem) - 1px)" }}
    >
      <div
        className="bg-spectrum h-full origin-left opacity-90 will-change-transform transform-gpu"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  )
}
