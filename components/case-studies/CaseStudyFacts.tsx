import { ArrowUpRight } from 'lucide-react'

import { Section, SectionHeader } from '@/components/prism/section'
import type { CaseStudyFact } from '@/lib/case-study-facts'

type CaseStudyFactsProps = {
  facts: CaseStudyFact[]
}

/**
 * The case study's plain facts as a definition list (client, site, industry,
 * location, services, dated results, case study dates), so readers and AI
 * agents can lift them without parsing the story. Values come from
 * getCaseStudyFacts (lib/case-study-facts.ts); nothing here adds a claim.
 */
export default function CaseStudyFacts({ facts }: CaseStudyFactsProps) {
  if (facts.length === 0) return null

  return (
    <Section aria-labelledby="case-study-facts-title" className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeader
            id="case-study-facts-title"
            eyebrow="Facts"
            title="the short version."
          />
        </div>
        <dl className="lg:col-span-7">
          {facts.map((fact, index) => (
            <div
              key={`${fact.label}-${index}`}
              className="grid gap-1 border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="text-eyebrow text-subtle">{fact.label}</dt>
              <dd className="text-pretty text-[15px] leading-7 text-foreground">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white/60"
                  >
                    {fact.value}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
