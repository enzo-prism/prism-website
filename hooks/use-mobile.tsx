"use client"

import { useState, useEffect } from "react"

/**
 * A custom hook to detect if the user is on a mobile device based on a media query.
 * Enhanced with better SSR handling and fallback detection.
 * @param {string} query - The media query string to match against. Defaults to '(max-width: 768px)'.
 * @returns {boolean} - True if the media query matches, false otherwise.
 */
export function useMobile(query = "(max-width: 768px)"): boolean {
  // Initialize with a reasonable default based on common screen sizes
  const [isMobile, setIsMobile] = useState(() => {
    // For SSR, try to make an educated guess if possible
    if (typeof window === "undefined") {
      return false // Default to false for SSR
    }
    // Quick check on client-side
    return window.innerWidth <= 768
  })
  
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    // This effect should only run on the client side.
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Function to update the state based on the media query match status.
    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    // Set the initial state immediately on hydration
    handleResize()

    // Add an event listener to handle changes in the media query status.
    mediaQuery.addEventListener("change", handleResize)

    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      mediaQuery.removeEventListener("change", handleResize)
    }
  }, [query]) // Re-run the effect if the query changes.

  // During SSR and before hydration, provide a stable value
  if (!isHydrated && typeof window === "undefined") {
    return false
  }

  return isMobile
}
