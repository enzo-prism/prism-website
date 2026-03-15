import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'town centre dental case study — family dentistry growth',
  description:
    'how we helped town centre dental modernize their web presence, streamline booking, and build sustainable acquisition in brentwood, ca.',
  path: '/case-studies/town-centre-dental',
})

export default function TownCentreDentalCase() {
  return <MinimalCaseStudyPage slug="town-centre-dental" />
}
