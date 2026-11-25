import { ArrowUpRight } from 'lucide-react'

import { DisclosurePanel } from '@/components/prism/disclosure-panel'
import { Section } from '@/components/prism/section'
import type { CaseStudyFact } from '@/lib/case-study-facts'

type CaseStudyFactsProps = {
  facts: CaseStudyFact[]
}

/**
 * The case study's plain facts as a crawlable definition list inside a compact
 * native disclosure, so readers and AI agents can lift verified facts without
 * crowding the visual layout.
 */
export default function CaseStudyFacts({ facts }: CaseStudyFactsProps) {
  if (facts.length === 0) return null

  return (
    <Section aria-labelledby="case-study-facts-title" className="py-8 sm:py-10">
      <h2 id="case-study-facts-title" className="sr-only">
        the short version.
      </h2>
      <DisclosurePanel
        eyebrow="Facts"
        summary="Project facts, live links, and verification dates"
        meta={`${facts.length} facts`}
      >
        <dl>
          {facts.map((fact, index) => (
            <div
              key={`${fact.label}-${index}`}
              className="grid gap-1 border-t border-white/[0.06] py-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="text-eyebrow text-subtle">{fact.label}</dt>
              <dd className="text-pretty text-sm leading-6 text-foreground">
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
      </DisclosurePanel>
    </Section>
  )
}
