"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface MobileSectionDividerProps {
  variant?: "default" | "gradient" | "dotted" | "wave" | "minimal"
  spacing?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const spacingStyles = {
  sm: "my-6",
  md: "my-8",
  lg: "my-12",
  xl: "my-16"
}

export function MobileSectionDivider({
  variant = "default",
  spacing = "md",
  className = ""
}: MobileSectionDividerProps) {
  const spacingClass = spacingStyles[spacing]
  const reduceMotion = useReducedMotion()

  if (variant === "gradient") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="relative mx-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/50" />
      </motion.div>
    )
  }

  if (variant === "dotted") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.1 }}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (variant === "wave") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="flex items-center justify-center px-8">
          <svg 
            width="100" 
            height="20" 
            viewBox="0 0 100 20" 
            className="text-muted-foreground/60"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0,10 Q25,0 50,10 T100,10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    )
  }

  if (variant === "minimal") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="mx-auto h-px w-16 bg-border" />
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
      className={`${spacingClass} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="mx-4 h-px flex-1 bg-border/60" />
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/70" />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
        </div>
        <div className="mx-4 h-px flex-1 bg-border/60" />
      </div>
    </motion.div>
  )
}
