import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type WaitlistNextStep = {
  icon: LucideIcon
  title: ReactNode
  body: ReactNode
  /** Render the marker as completed (thank-you route). */
  done?: boolean
}

type WaitlistNextStepsProps = {
  steps: readonly WaitlistNextStep[]
  className?: string
  /** `rail` is the compact vertical timeline; `cards` is the 3-up grid. */
  layout?: 'rail' | 'cards'
}

/**
 * "What happens next" for the waitlist funnel. Plain process copy only:
 * no spot counts, deadlines, or promised outcomes.
 */
export default function WaitlistNextSteps({
  steps,
  className,
  layout = 'rail',
}: WaitlistNextStepsProps) {
  if (layout === 'cards') {
    return (
      <ol className={cn('grid gap-3 md:grid-cols-3 md:gap-4', className)}>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <li
              key={`waitlist-step-${index}`}
              className="relative flex flex-col rounded-2xl border border-white/[0.08] bg-card p-5 text-left shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-10 place-items-center rounded-xl border',
                    step.done
                      ? 'border-transparent bg-primary text-primary-foreground'
                      : 'border-white/10 bg-white/[0.04] text-foreground',
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={step.done ? 2.5 : 1.75} />
                </span>
                <span aria-hidden="true" className="font-mono text-[11px] text-subtle">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-6 text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">
                {step.title}
              </p>
              <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">
                {step.body}
              </p>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className={cn('grid gap-5', className)}>
      {steps.map((step, index) => {
        const Icon = step.icon
        const isLast = index === steps.length - 1
        return (
          <li key={`waitlist-step-${index}`} className="relative flex gap-4">
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute bottom-[-1.25rem] left-[1.1875rem] top-11 w-px bg-gradient-to-b from-white/15 to-white/[0.04]"
              />
            ) : null}
            <span
              aria-hidden="true"
              className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-card text-foreground shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset]"
            >
              <Icon className="size-[18px]" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground">
                {step.title}
              </p>
              <p className="mt-0.5 text-pretty text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
