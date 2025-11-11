"use client"

import type { MotionProps, Variants } from "framer-motion"

export const fadeInUp = (offset = 32, duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: offset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.19, 1, 0.22, 1] },
  },
})

export const staggerChildren = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const floatLoop = (
  distance = 6,
  duration = 6,
  delay = 0
): MotionProps["animate"] => ({
  y: [0, -distance, 0],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay,
  },
})

export const pulseOpacity = (
  min = 0.5,
  duration = 3
): MotionProps["animate"] => ({
  opacity: [1, min, 1],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
})

export const hoverTilt: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  hover: {
    rotateX: 1.5,
    rotateY: -1.5,
    y: -6,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
}
