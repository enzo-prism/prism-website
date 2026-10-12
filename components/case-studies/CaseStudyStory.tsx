import { Compass, Flag, Sparkles } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { Card } from '@/components/ui/card'
import type { CaseStudyStory as CaseStudyStoryData } from '@/lib/case-study-data'
import { cn } from '@/lib/utils'

type CaseStudyStoryProps = {
  clientName: string
  story: CaseStudyStoryData
}

/**
 * Challenge, approach, result: the three-part narrative from the published
 * case-study data, as three shadcn cards. The result card carries the
 * section's one spectrum hairline.
 */
export default function CaseStudyStory({ clientName, story }: CaseStudyStoryProps) {
  const steps = [
    { key: 'challenge', label: 'The challenge', icon: Flag, body: story.situation },
    { key: 'approach', label: 'The approach', icon: Compass, body: story.approach },
    { key: 'result', label: 'The result', icon: Sparkles, body: story.result },
  ] as const

  return (
    <Section aria-labelledby="case-study-story-title" className="pt-16 sm:pt-20">
      <Reveal>
        <SectionHeader
          id="case-study-story-title"
          eyebrow="The story"
          title="how the work came together."
          description={`Where ${clientName} started, what Prism changed, and where it landed.`}
        />
      </Reveal>

      <ol className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isResult = step.key === 'result'
          return (
            <Reveal as="li" key={step.key} delay={index * 90} className="min-w-0">
              <Card
                className={cn(
                  'relative flex h-full flex-col gap-5 overflow-hidden p-6 sm:p-7',
                  isResult && 'spectrum-rule border-white/[0.14]',
                )}
              >
                {isResult ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,oklch(0.66_0.16_258/14%),transparent_75%)]"
                  />
                ) : null}
                <div className="relative flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <span className="font-mono text-xs tabular-nums text-subtle">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="relative text-heading text-foreground">
                  {step.label.toLowerCase()}.
                </h3>
                <p className="relative text-pretty text-[15px] leading-7 text-muted-foreground">
                  {step.body}
                </p>
              </Card>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
