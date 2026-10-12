import { ArrowRight } from 'lucide-react'

import { WorkCard } from '@/components/case-studies/WorkCard'
import {
  getDesktopShot,
  getHostLabel,
  getRelatedWork,
  getVerifiedMetric,
} from '@/components/case-studies/work-index'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'

type CaseStudyMoreWorkProps = {
  slug: string
  trackedLocation: string
}

/** Three other current-client stories (never former clients). */
export default function CaseStudyMoreWork({
  slug,
  trackedLocation,
}: CaseStudyMoreWorkProps) {
  const related = getRelatedWork(slug, 3)
  if (related.length === 0) return null

  return (
    <Section aria-labelledby="case-study-more-work-title" className="py-12 sm:py-16">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            id="case-study-more-work-title"
            eyebrow="More work"
            title="more sites we built."
          />
          <TrackedLink
            href="/case-studies"
            label={`All work from ${slug} more work row`}
            location={trackedLocation}
            className="group/all inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            See all work
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5"
            />
          </TrackedLink>
        </div>
      </Reveal>

      <ul className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {related.map((study, index) => (
          <Reveal
            as="li"
            key={study.slug}
            delay={index * 90}
            className={index === 2 ? 'min-w-0 md:hidden lg:block' : 'min-w-0'}
          >
            <WorkCard
              slug={study.slug}
              client={study.client}
              industry={study.industry}
              location={study.location}
              screenshotSrc={getDesktopShot(study.slug)}
              host={getHostLabel(study.websiteUrl)}
              metric={getVerifiedMetric(study)}
              hasExplainerVideo={Boolean(study.explainerVideo)}
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
