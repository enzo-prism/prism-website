import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental Strategies case study',
  description:
    'How Prism built a complete digital presence for Dental Strategies, led by Dr. Michael Njo, from brand and patient journeys to search and analytics.',
  path: '/case-studies/michael-njo-dds',
  ogImage: '/case-studies/michael-njo-dds-home-desktop.jpg',
})

export default function MichaelNjoDDSCaseStudyPage() {
  return <MinimalCaseStudyPage slug="michael-njo-dds" />
}
