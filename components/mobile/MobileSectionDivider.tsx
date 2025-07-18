"use client"

import React from "react"
import { motion } from "framer-motion"

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

  if (variant === "gradient") {
    return (
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="relative h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mx-8" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
      </motion.div>
    )
  }

  if (variant === "dotted") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-600 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (variant === "wave") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="flex items-center justify-center px-8">
          <svg 
            width="100" 
            height="20" 
            viewBox="0 0 100 20" 
            className="text-neutral-300 dark:text-neutral-700"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
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
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${spacingClass} ${className}`}
      >
        <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mx-auto" />
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${spacingClass} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800 mx-4" />
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
          <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
        </div>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800 mx-4" />
      </div>
    </motion.div>
  )
}