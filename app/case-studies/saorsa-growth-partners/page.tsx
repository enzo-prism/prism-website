import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Saorsa Growth Partners case study',
  description:
    'How Prism delivered clarity, credibility, and lead capture for Saorsa Growth Partners, a focused advisory firm, with a custom site and tracking.',
  path: '/case-studies/saorsa-growth-partners',
})

export default function SaorsaGrowthPartnersPage() {
  return <MinimalCaseStudyPage slug="saorsa-growth-partners" />
}
