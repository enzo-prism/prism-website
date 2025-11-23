"use client"

import { motion, type MotionProps } from "framer-motion"
import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"
import { useMotionPreferences } from "@/hooks/use-motion-preferences"

type RevealOnScrollProps = PropsWithChildren<
  {
    delay?: number
    y?: number
    className?: string
  } & MotionProps
>

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 32,
  className,
  initial,
  whileInView,
  transition,
  viewport,
  ...motionProps
}: RevealOnScrollProps) {
  const { allowMotion } = useMotionPreferences()
  const defaultInitial = { opacity: 0, y }
  const defaultWhileInView = { opacity: 1, y: 0 }
  const defaultTransition = { duration: 0.6, delay }
  const defaultViewport = { once: true, amount: 0.2 }

  if (!allowMotion) {
    return (
      <div className={cn(className)}>{children}</div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      initial={initial ?? defaultInitial}
      whileInView={whileInView ?? defaultWhileInView}
      viewport={viewport ?? defaultViewport}
      transition={transition ?? defaultTransition}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
