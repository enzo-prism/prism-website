import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Infobell IT Solutions case study',
  description:
    'How Prism clarified Infobell IT Solutions’ global AI, high-performance computing, product-engineering, and software portfolio for enterprise buyers.',
  path: '/case-studies/infobell-it',
  ogImage: '/case-studies/infobell-it-home-desktop.jpg',
})

export default function InfobellITCaseStudyPage() {
  return <MinimalCaseStudyPage slug="infobell-it" />
}
