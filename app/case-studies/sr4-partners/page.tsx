import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'SR4 Partners case study',
  description:
    'How Prism built a digital presence for SR4 Partners, a human-centered business consultancy: brand refresh, custom site, SEO/AEO, and analytics.',
  path: '/case-studies/sr4-partners',
  ogImage: '/case-studies/sr4-partners-home-desktop.jpg',
})

export default function SR4PartnersCaseStudyPage() {
  return <MinimalCaseStudyPage slug="sr4-partners" />
}
