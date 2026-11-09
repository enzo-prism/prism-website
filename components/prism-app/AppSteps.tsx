'use client'

import { useRef } from 'react'

import { cn } from '@/lib/utils'

import styles from './app-page.module.css'
import { clamp01, useFrameLoop } from './use-frame-loop'

type AppStepsProps = {
  steps: ReadonlyArray<{ title: string; body: string }>
  className?: string
}

/** Numbered steps joined by a line that fills as the page scrolls. */
export function AppSteps({ steps, className }: AppStepsProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  useFrameLoop(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }

    const rect = list.getBoundingClientRect()
    const anchor = window.innerHeight * 0.68
    fill.style.transform = `scaleY(${clamp01((anchor - rect.top) / rect.height).toFixed(3)})`
    return false
  })

  return (
    <div className={cn('relative', className)}>
      <span aria-hidden="true" className={styles.stepsLine}>
        <span ref={fillRef} className={styles.stepsFill} />
      </span>
      <ol ref={listRef} className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-5">
            <span className={styles.stepsNumber}>{index + 1}</span>
            <div className="pt-0.5">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[46ch] text-pretty text-[15px] leading-6 text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default AppSteps
