import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Town Centre Dental case study',
  description:
    'How Prism helped Town Centre Dental in Brentwood modernize its web presence, streamline booking, and build sustainable new-patient acquisition.',
  path: '/case-studies/town-centre-dental',
  ogImage: '/case-studies/town-centre-dental-home-desktop.jpg',
})

export default function TownCentreDentalCase() {
  return <MinimalCaseStudyPage slug="town-centre-dental" />
}
