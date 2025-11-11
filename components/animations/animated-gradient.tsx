"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useParallaxMouse } from "@/hooks/use-parallax-mouse"

interface AnimatedGradientProps {
  className?: string
  colors?: [string, string]
  blur?: number
  duration?: number
  opacity?: number
  parallaxIntensity?: number
  disableParallaxOnTouch?: boolean
}

export default function AnimatedGradient({
  className,
  colors = ["#ff6ad5", "#7c3aed"],
  blur = 120,
  duration = 28,
  opacity = 0.5,
  parallaxIntensity = 14,
  disableParallaxOnTouch = true,
}: AnimatedGradientProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const query = window.matchMedia("(pointer: coarse)")
    setIsTouchDevice(query.matches)
    const listener = (event: MediaQueryListEvent) => setIsTouchDevice(event.matches)
    query.addEventListener?.("change", listener)
    return () => query.removeEventListener?.("change", listener)
  }, [])

  const parallax = useParallaxMouse({ intensity: parallaxIntensity, disableOnTouch: disableParallaxOnTouch })

  const allowAnimation = !(prefersReducedMotion || (disableParallaxOnTouch && isTouchDevice))

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      animate={allowAnimation ? { rotate: 360 } : undefined}
      transition={
        allowAnimation
          ? {
              duration,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined
      }
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-[-30%]"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${colors[0]}, transparent 60%), radial-gradient(circle at 80% 0%, ${colors[1]}, transparent 55%)`,
          filter: `blur(${blur}px)`,
        }}
        {...parallax}
      />
    </motion.div>
  )
}
