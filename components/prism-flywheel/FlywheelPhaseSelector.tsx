"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

type FlywheelPhase = {
  number: number
  title: string
  details: string
}

interface FlywheelPhaseSelectorProps {
  phases: FlywheelPhase[]
}

export default function FlywheelPhaseSelector({ phases }: FlywheelPhaseSelectorProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const activeDetails = phases.find((phase) => phase.number === activePhase)

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {phases.map((phase) => {
          const isActive = activePhase === phase.number
          return (
            <motion.button
              key={phase.number}
              type="button"
              className={`group flex flex-col items-center space-y-2 transition-all ${
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={isActive}
              onClick={() => setActivePhase(isActive ? null : phase.number)}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isActive
                    ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white"
                    : "border-neutral-300 dark:border-neutral-700"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-white dark:text-neutral-900" : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {phase.number}
                </span>
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {phase.title.split(" ")[0]}
              </span>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeDetails ? (
          <motion.div
            className="mt-8 text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
              {activeDetails.title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {activeDetails.details}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
