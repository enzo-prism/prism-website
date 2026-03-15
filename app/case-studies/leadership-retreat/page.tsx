import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Leadership Retreat Case Study',
  description:
    'How Prism built a compelling event presence for the Leadership Retreat — a boutique annual dental leadership gathering. Website design, brand design, SEO/AEO, and enterprise analytics.',
  path: '/case-studies/leadership-retreat',
})

export default function LeadershipRetreatCaseStudyPage() {
  return <MinimalCaseStudyPage slug="leadership-retreat" />
}
