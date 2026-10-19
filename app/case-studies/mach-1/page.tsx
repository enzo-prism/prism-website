import type { Metadata } from 'next'

import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { Mach1Launch } from '@/components/case-studies/mach-1/Mach1Launch'
import { Mach1Stack } from '@/components/case-studies/mach-1/Mach1Stack'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Mach 1 case study',
  description:
    'How Prism relaunched mach1ai.com around customers’ own words and built the private growth tools its team runs on, from content to campaigns.',
  // Its share card comes from SOCIAL_IMAGE_EXCEPTIONS (lib/seo/rules.ts).
  path: '/case-studies/mach-1',
})

const LOCATION = 'mach-1 case study'

/**
 * Flagship case study: the shared template plus the launch (the new site in
 * numbers, its phone film, and four of its pages) and the growth stack (the
 * private tools, drawn as illustrations rather than screenshots).
 */
export default function Mach1CaseStudyPage() {
  return (
    <MinimalCaseStudyPage
      slug="mach-1"
      heroFilm="/case-studies/mach-1/site-film-desktop.mp4"
      afterStory={
        <>
          <Mach1Launch trackedLocation={`${LOCATION} launch`} />
          <Mach1Stack />
          <div className="prism-container pb-8 sm:pb-12">
            <InlineWaitlistCta
              location={`${LOCATION} inline cta`}
              title="your launch, and the tools behind it."
            />
          </div>
        </>
      }
    />
  )
}
