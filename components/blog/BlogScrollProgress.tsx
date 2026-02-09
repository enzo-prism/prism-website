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
          setScrollProgress(Math.min(progress, 100))
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
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-neutral-200">
      <div
        className="h-full bg-neutral-900 transition-[width] duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}
