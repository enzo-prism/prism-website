'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

type FlywheelPhase = {
  number: number
  title: string
  details: string
}

interface FlywheelPhaseSelectorProps {
  phases: FlywheelPhase[]
}

/** Segmented phase picker under the flywheel visual; one phase is always shown. */
export default function FlywheelPhaseSelector({
  phases,
}: FlywheelPhaseSelectorProps) {
  const [activePhase, setActivePhase] = useState<number>(phases[0]?.number ?? 1)
  const activeDetails = phases.find((phase) => phase.number === activePhase)

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-2">
        {phases.map((phase) => {
          const isActive = activePhase === phase.number
          return (
            <button
              key={phase.number}
              type="button"
              className={cn(
                'inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                isActive
                  ? 'border-white/30 bg-white/[0.08] text-foreground'
                  : 'border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground',
              )}
              aria-pressed={isActive}
              onClick={() => setActivePhase(phase.number)}
            >
              <span className="font-mono text-[11px] tabular-nums text-subtle">
                {String(phase.number).padStart(2, '0')}
              </span>
              {phase.title.split(' ')[0]}
            </button>
          )
        })}
      </div>

      {activeDetails ? (
        <div
          key={activeDetails.number}
          className="prism-rise mx-auto mt-6 max-w-md text-center"
          aria-live="polite"
        >
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            {activeDetails.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {activeDetails.details}
          </p>
        </div>
      ) : null}
    </div>
  )
}
