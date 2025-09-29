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
    <section className="relative border-y border-neutral-100 bg-white py-20 dark:border-neutral-900 dark:bg-neutral-950 md:py-24 lg:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex w-full flex-col space-y-10 md:space-y-12">
            <div className="mx-auto h-px w-20 max-w-[70%] bg-neutral-200 dark:bg-neutral-800" aria-hidden="true" />

            <div className="space-y-5 md:space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-600">
                built for growth
              </p>

              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-5xl lg:text-6xl dark:text-neutral-50">
                <span className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
                  <span
                    className="relative inline-flex h-[1.4em] min-h-[3rem] items-center justify-center overflow-hidden"
                    style={{
                      minWidth: `${longestWordLength + 2}ch`,
                      maxWidth: "100%",
                    }}
                    aria-live="polite"
                    aria-atomic="true"
                    role="status"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeWord}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 16, scale: 0.96 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: -16, scale: 0.96 }
                        }
                        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                        className="inline-flex min-h-[2.65rem] items-center justify-center rounded-full border border-neutral-200 bg-neutral-900 px-5 py-1.5 text-base font-medium text-white shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
                      >
                        {activeWord}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-300">that grow your business.</span>
                </span>
              </h2>

              <p className="mx-auto max-w-3xl text-balance text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
                every channel we touch is engineered to capture attention, build trust, and convert curious visitors into loyal customers.
              </p>
            </div>

            <div className="mx-auto h-px w-20 max-w-[70%] bg-neutral-200 dark:bg-neutral-800" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

