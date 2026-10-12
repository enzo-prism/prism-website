import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'

export type ServiceStep = {
  title: string
  body: string
  icon: LucideIcon
  /** Short timing or phase label, e.g. "First". */
  detail?: string
}

type ServiceStepsProps = {
  idPrefix: string
  eyebrow?: string
  title: string
  description?: string
  steps: readonly ServiceStep[]
}

/**
 * "How it works" as one contained panel: a spectrum hairline across the top,
 * and the steps as columns joined by a rail (rows on mobile).
 */
export function ServiceSteps({
  idPrefix,
  eyebrow = 'How it works',
  title,
  description,
  steps,
}: ServiceStepsProps) {
  const headingId = `${idPrefix}-steps-title`

  return (
    <Section aria-labelledby={headingId}>
      <Reveal>
        <div className="spectrum-rule relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card">
          <div
            aria-hidden="true"
            className="bg-dots absolute inset-0 -z-10 opacity-[0.35] mask-fade-b"
          />
          <div className="px-6 pb-4 pt-12 sm:px-12 sm:pt-16">
            <SectionHeader
              id={headingId}
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
            />
          </div>

          <ol className="relative grid gap-px border-t border-white/[0.06] md:mt-10 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="relative flex flex-col gap-4 px-6 py-9 sm:px-10 sm:py-12 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/[0.06] md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset]">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.6}
                      />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-subtle">
                      {String(index + 1).padStart(2, '0')}
                      {step.detail ? (
                        <span className="ml-2 text-muted-foreground">
                          · {step.detail}
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <h3 className="text-heading mt-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="max-w-[38ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </Reveal>
    </Section>
  )
}

export default ServiceSteps
