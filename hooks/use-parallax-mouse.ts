"use client"

import { useEffect, useState } from "react"
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion"

interface ParallaxOptions {
  intensity?: number
  disableOnTouch?: boolean
}

export function useParallaxMouse(intensityOrOptions: number | ParallaxOptions = 18) {
  const options = typeof intensityOrOptions === "number" ? { intensity: intensityOrOptions } : intensityOrOptions
  const { intensity = 18, disableOnTouch = true } = options
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const query = window.matchMedia("(pointer: coarse)")
    setIsTouchDevice(query.matches)
    const listener = (event: MediaQueryListEvent) => setIsTouchDevice(event.matches)
    query.addEventListener?.("change", listener)
    return () => query.removeEventListener?.("change", listener)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || (disableOnTouch && isTouchDevice)) return

    const handlePointerMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const offsetX = ((event.clientX - innerWidth / 2) / innerWidth) * intensity
      const offsetY = ((event.clientY - innerHeight / 2) / innerHeight) * intensity
      x.set(offsetX)
      y.set(offsetY)
    }

    const handlePointerLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [disableOnTouch, intensity, isTouchDevice, prefersReducedMotion, x, y])

  return { style: { x: springX, y: springY } }
}
