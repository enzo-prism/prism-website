"use client"

import { useState, useEffect } from "react"

/**
 * A custom hook to detect if the user is on a mobile device based on a media query.
 * @param {string} query - The media query string to match against. Defaults to '(max-width: 768px)'.
 * @returns {boolean} - True if the media query matches, false otherwise.
 */
export function useMobile(query = "(max-width: 768px)"): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // This effect should only run on the client side.
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Function to update the state based on the media query match status.
    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    // Set the initial state.
    handleResize()

    // Add an event listener to handle changes in the media query status.
    // Using addEventListener is the modern approach.
    mediaQuery.addEventListener("change", handleResize)

    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      mediaQuery.removeEventListener("change", handleResize)
    }
  }, [query]) // Re-run the effect if the query changes.

  return isMobile
}
