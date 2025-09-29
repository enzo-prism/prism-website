"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

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

  const activeWord = ROTATING_WORDS[activeIndex]

  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.75rem,4vw,3.5rem)] dark:text-neutral-50">
          <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span
              className="relative inline-flex min-w-[7.5rem] items-center justify-center overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeWord}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-900 px-4 py-1.5 text-base font-medium text-white shadow-sm dark:border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {activeWord}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-neutral-500 dark:text-neutral-300">that grow your business.</span>
          </span>
        </h2>

        <p className="max-w-2xl text-balance text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
          every channel we touch is engineered to capture attention, build trust, and convert curious visitors into loyal customers.
        </p>
      </div>
    </section>
  )
}

