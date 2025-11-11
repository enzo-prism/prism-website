"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface OrbitalDotProps {
  className?: string
  size?: number
  color?: string
  duration?: number
}

export default function OrbitalDot({
  className,
  size = 64,
  color = "#ffffff",
  duration = 6,
}: OrbitalDotProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full border border-white/30"
        style={{ borderColor: `${color}40` }}
      />
      {!prefersReducedMotion ? (
        <motion.span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  )
}
