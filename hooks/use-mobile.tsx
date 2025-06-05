"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile(query = `(max-width: ${MOBILE_BREAKPOINT}px)`): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Ensure window is defined (for SSR/build time)
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(query)
      const listener = () => setMatches(mediaQueryList.matches)

      // Set initial state
      listener()

      // Add listener for changes
      mediaQueryList.addEventListener("change", listener)

      // Cleanup listener on component unmount
      return () => {
        mediaQueryList.removeEventListener("change", listener)
      }
    }
  }, [query])

  return matches
}
