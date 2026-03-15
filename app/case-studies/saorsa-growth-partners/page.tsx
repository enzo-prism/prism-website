import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'saorsa growth partners case study',
  description:
    'Clarity, credibility, and lead capture for a focused advisory firm.',
  path: '/case-studies/saorsa-growth-partners',
})

export default function SaorsaGrowthPartnersPage() {
  return <MinimalCaseStudyPage slug="saorsa-growth-partners" />
}
