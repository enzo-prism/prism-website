import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'We Are Saplings case study',
  description:
    'How Prism built a joyful, mission-driven digital presence for We Are Saplings, a nature-based early-childhood education program.',
  path: '/case-studies/we-are-saplings',
})

export default function WeAreSaplingsCaseStudyPage() {
  return <MinimalCaseStudyPage slug="we-are-saplings" />
}
