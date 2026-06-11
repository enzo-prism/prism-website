import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Infobell IT case study',
  description:
    'How Prism built a credible digital presence for Infobell IT, a managed-services and cybersecurity firm competing in a trust-driven B2B market.',
  path: '/case-studies/infobell-it',
  ogImage: '/case-studies/infobell-it-home-desktop.jpg',
})

export default function InfobellITCaseStudyPage() {
  return <MinimalCaseStudyPage slug="infobell-it" />
}
