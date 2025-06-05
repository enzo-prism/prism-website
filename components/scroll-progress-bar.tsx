"use client"

import { useEffect, useState } from "react"

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100))
    }

    // Update on scroll
    window.addEventListener("scroll", updateScrollProgress, { passive: true })

    // Update on resize (in case content height changes)
    window.addEventListener("resize", updateScrollProgress, { passive: true })

    // Initial calculation with a small delay to ensure DOM is ready
    setTimeout(updateScrollProgress, 100)

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-1 bg-gray-200 z-[60] shadow-sm">
      <div className="h-full bg-black transition-all duration-200 ease-out" style={{ width: `${scrollProgress}%` }} />
    </div>
  )
}
