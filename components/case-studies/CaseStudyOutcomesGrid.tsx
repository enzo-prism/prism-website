import { Check } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'

type CaseStudyOutcomesGridProps = {
  eyebrow?: string
  title: string
  description?: string
  outcomes: string[]
}

/**
 * Delivered outcomes from the case-study data, as a contained panel: header
 * on the left, a checked list on the right. Copy comes straight from
 * `structured.outcomes`; nothing here adds a claim.
 */
export default function CaseStudyOutcomesGrid({
  eyebrow = 'Outcomes',
  title,
  description,
  outcomes,
}: CaseStudyOutcomesGridProps) {
  if (!outcomes || outcomes.length === 0) {
    return null
  }

  return (
    <Section aria-labelledby="case-study-outcomes-title" className="py-12 sm:py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-30 mask-fade-b" />
          <div
            aria-hidden="true"
            className="absolute -left-24 top-0 -z-10 h-72 w-96 rounded-full bg-[radial-gradient(closest-side,oklch(0.76_0.17_145/10%),transparent)] blur-2xl"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeader
                id="case-study-outcomes-title"
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </div>
            <ol className="flex flex-col lg:col-span-7">
              {outcomes.map((outcome, index) => (
                <li
                  key={outcome}
                  className="flex gap-4 border-t border-white/[0.06] py-5 first:border-t-0 first:pt-0 last:pb-0 sm:gap-5"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
                    <span className="sr-only">{index + 1}. </span>
                    {outcome}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
