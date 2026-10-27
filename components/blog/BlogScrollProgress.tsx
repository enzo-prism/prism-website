"use client"

import { useEffect, useRef } from "react"

const SMOOTHING_FACTOR = 0.22

export default function BlogScrollProgress() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastAriaValueRef = useRef(0)

  useEffect(() => {
    const getScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (docHeight <= 0) {
        return 0
      }

      const progress = (scrollTop / docHeight) * 100
      return Math.max(0, Math.min(progress, 100))
    }

    // Write the transform (and aria-valuenow) straight to the DOM instead of
    // through React state: the smoothing loop runs at frame rate while
    // scrolling, and a setState per frame re-renders this component ~60x/sec
    // for a purely visual style write. The easing math, rendered output, and
    // rounded aria-valuenow values are unchanged.
    const animateProgress = () => {
      const target = targetProgressRef.current
      const nextProgress =
        currentProgressRef.current +
        (target - currentProgressRef.current) * SMOOTHING_FACTOR

      currentProgressRef.current =
        Math.abs(target - nextProgress) < 0.1 ? target : nextProgress

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${currentProgressRef.current / 100})`
      }

      const ariaValue = Math.round(currentProgressRef.current)
      if (ariaValue !== lastAriaValueRef.current) {
        lastAriaValueRef.current = ariaValue
        containerRef.current?.setAttribute("aria-valuenow", String(ariaValue))
      }

      if (currentProgressRef.current !== target) {
        rafRef.current = requestAnimationFrame(animateProgress)
        return
      }

      rafRef.current = null
    }

    const scheduleProgressUpdate = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          // Sample scroll geometry once per frame, not once per scroll
          // event (scrollHeight reads can force layout when dirty).
          targetProgressRef.current = getScrollProgress()
          animateProgress()
        })
      }
    }

    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true })
    window.addEventListener("resize", scheduleProgressUpdate, { passive: true })
    scheduleProgressUpdate()

    return () => {
      window.removeEventListener("scroll", scheduleProgressUpdate)
      window.removeEventListener("resize", scheduleProgressUpdate)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="pointer-events-none fixed inset-x-0 z-40 h-[2px] overflow-hidden"
      style={{ top: "calc(var(--prism-header-height, 4rem) - 1px)" }}
    >
      <div
        ref={barRef}
        className="bg-spectrum h-full origin-left opacity-90 will-change-transform transform-gpu"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
