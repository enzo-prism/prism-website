"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const ROTATION_INTERVAL = 3200
const ROTATING_WORDS = [
  "websites",
  "map app listings",
  "google ads",
  "instagram ads",
  "tiktok ads",
]

export default function GrowthHeadline() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveIndex(0)
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % ROTATING_WORDS.length)
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  const longestWordLength = useMemo(() => {
    return ROTATING_WORDS.reduce((max, word) => Math.max(max, word.length), 0)
  }, [])

  const activeWord = ROTATING_WORDS[activeIndex]

  return (
    <section className="relative border-y border-neutral-100 bg-white/90 py-16 dark:border-neutral-900 dark:bg-neutral-950/80 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-700" aria-hidden="true" />
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-5xl dark:text-neutral-50">
              <span className="inline-flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
                <span
                  className="relative inline-flex h-[1.2em] items-center justify-center overflow-hidden"
                  style={{ width: `${longestWordLength + 2}ch` }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWord}
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-1 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    >
                      {activeWord}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-neutral-500 dark:text-neutral-300">that grow your business.</span>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
              every channel we touch is engineered to capture attention, build trust, and convert curious visitors into loyal customers.
            </p>
          </div>
          <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-700" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

