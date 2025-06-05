"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to detect if the current viewport matches a mobile media query.
 * @param query The media query string to match against. Defaults to '(max-width: 768px)'.
 * @returns True if the media query matches, false otherwise.
 */
export function useMobile(query = "(max-width: 768px)"): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Ensure window is defined (for SSR compatibility during build or in Node.js environments)
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Set the initial state
    setMatches(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener for changes
    // Using addEventListener/removeEventListener for modern browsers
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [query]) // Re-run effect if the query changes

  return matches
}
