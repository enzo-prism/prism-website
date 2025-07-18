"use client"

import { motion } from "framer-motion"
import { fadeInUp, revealOnScroll } from "@/utils/animation-variants"

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: "fadeInUp" | "revealOnScroll"
}

export default function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
  variant = "fadeInUp"
}: ScrollRevealSectionProps) {
  const animationVariant = variant === "fadeInUp" ? fadeInUp : revealOnScroll

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={animationVariant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}