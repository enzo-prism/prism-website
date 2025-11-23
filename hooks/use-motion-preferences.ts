"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

type MotionPreferenceOptions = {
  respectReducedMotion?: boolean
  respectCoarsePointer?: boolean
}

export function useMotionPreferences(options: MotionPreferenceOptions = {}) {
  const { respectReducedMotion = true, respectCoarsePointer = true } = options
  const prefersReducedMotion = useReducedMotion()
  const [isCoarsePointer, setIsCoarsePointer] = useState(() => {
    if (typeof window === "undefined" || !respectCoarsePointer) return false
    return window.matchMedia("(pointer: coarse)").matches
  })

  useEffect(() => {
    if (!respectCoarsePointer || typeof window === "undefined") return
    const mediaQuery = window.matchMedia("(pointer: coarse)")
    const handleChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches)

    setIsCoarsePointer(mediaQuery.matches)
    mediaQuery.addEventListener?.("change", handleChange)

    return () => mediaQuery.removeEventListener?.("change", handleChange)
  }, [respectCoarsePointer])

  const allowMotion = !(
    (respectReducedMotion && prefersReducedMotion) ||
    (respectCoarsePointer && isCoarsePointer)
  )

  return {
    allowMotion,
    prefersReducedMotion: Boolean(prefersReducedMotion),
    isCoarsePointer,
  }
}

