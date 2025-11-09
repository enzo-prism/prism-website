"use client"

import { motion, type MotionProps } from "framer-motion"
import type { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

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
  ...motionProps
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
