"use client"

import { useEffect, useRef } from "react"

/** Thin spectrum reading-progress hairline pinned to the top of long guides. */
const SMOOTHING_FACTOR = 0.18

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const getScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (docHeight <= 0) {
        return 0
      }

      const scrollPercent = (scrollTop / docHeight) * 100

      return Math.min(Math.max(scrollPercent, 0), 100)
    }

    // Write the transform straight to the DOM node instead of through React
    // state: the smoothing loop runs at frame rate while scrolling, and a
    // setState per frame re-renders this component ~60x/sec for a purely
    // visual style write. The easing math and rendered output are unchanged.
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

    // Update on scroll
    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true })

    // Update on resize (in case content height changes)
    window.addEventListener("resize", scheduleProgressUpdate, { passive: true })

    // Initial calculation
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden"
    >
      <div
        ref={barRef}
        className="bg-spectrum h-full origin-left opacity-90 will-change-transform transform-gpu"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
