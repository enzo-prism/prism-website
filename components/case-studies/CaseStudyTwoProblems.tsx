import { BadgeCheck, Search, Users, Sparkles } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import type { CaseStudyResultMetric } from '@/lib/case-study-data'
import { TWO_PROBLEMS, type CaseStudyFraming } from '@/lib/case-study-framing'
import { cn } from '@/lib/utils'

type CaseStudyTwoProblemsProps = {
  clientName: string
  framing: CaseStudyFraming
  /** Verified search metric, shown as the receipt under "be found." */
  metric?: CaseStudyResultMetric
  className?: string
}

/**
 * The Work section's one idea on a single client: who this business needs
 * to reach, then what Prism built so more of them find it (be found) and
 * more of those people say yes (be chosen). One contained panel split down
 * the middle, so it reads differently from the three story cards after it.
 */
export default function CaseStudyTwoProblems({
  clientName,
  framing,
  metric,
  className,
}: CaseStudyTwoProblemsProps) {
  const halves = [
    {
      key: 'found',
      icon: Search,
      title: TWO_PROBLEMS.found.title,
      body: framing.found,
      receipt: metric,
    },
    {
      key: 'chosen',
      icon: Sparkles,
      title: TWO_PROBLEMS.chosen.title,
      body: framing.chosen,
      receipt: undefined,
    },
  ] as const

  return (
    <Section
      aria-labelledby="case-study-two-problems-title"
      className={cn('pt-16 sm:pt-20', className)}
    >
      <Reveal>
        <SectionHeader
          id="case-study-two-problems-title"
          eyebrow="Same two problems"
          title="different market. same two problems."
          description={`Like every business we work with, ${clientName} needed more of the right people to find them, and more of those people to choose them.`}
        />
      </Reveal>

      <Reveal delay={90} className="mt-12 sm:mt-14">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
          <div className="flex flex-col gap-4 border-b border-white/[0.06] p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
              <Users aria-hidden="true" className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-eyebrow text-subtle">The right people</p>
              <p className="mt-2 max-w-[52ch] text-pretty text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-2xl">
                {framing.audience}
              </p>
            </div>
          </div>

          <ol className="grid md:grid-cols-2">
            {halves.map((half, index) => {
              const Icon = half.icon
              return (
                <li
                  key={half.key}
                  className={cn(
                    'flex flex-col gap-5 p-6 sm:p-8',
                    index === 1 &&
                      'border-t border-white/[0.06] md:border-l md:border-t-0',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-subtle">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-heading text-foreground">{half.title}</h3>
                  <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
                    {half.body}
                  </p>
                  {half.receipt ? (
                    <p className="mt-auto flex items-start gap-2 border-t border-white/[0.06] pt-4 text-[13px] leading-5 text-muted-foreground">
                      <BadgeCheck
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-subtle"
                      />
                      <span>
                        <span className="font-semibold text-foreground">
                          {half.receipt.value}
                        </span>{' '}
                        {half.receipt.label}
                        {half.receipt.sourceName ? (
                          <span className="text-subtle">
                            {' '}
                            ({half.receipt.sourceName})
                          </span>
                        ) : null}
                      </span>
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </Reveal>
    </Section>
  )
}
