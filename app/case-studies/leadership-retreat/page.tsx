import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Leadership Retreat case study',
  description:
    'How Prism built a compelling event presence that drives registrations for the Leadership Retreat, a boutique annual dental leadership gathering.',
  path: '/case-studies/leadership-retreat',
})

export default function LeadershipRetreatCaseStudyPage() {
  return <MinimalCaseStudyPage slug="leadership-retreat" />
}
