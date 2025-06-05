"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    // Only scroll to top when the pathname changes
    if (prevPathname.current !== pathname) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant", // Use "instant" instead of "smooth" to avoid visible scrolling
        })
      })

      prevPathname.current = pathname
    }
  }, [pathname])

  return null // This component doesn't render anything
}
