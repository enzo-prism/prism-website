import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Canary Cove case study',
  description:
    'How Prism shaped the brand, website, and SEO for Canary Cove, a boutique residential development on the coast of California, with analytics built in.',
  path: '/case-studies/canary-cove',
  ogImage: '/case-studies/canary-cove-home-desktop.jpg',
})

export default function CanarycoveCaseStudyPage() {
  return <MinimalCaseStudyPage slug="canary-cove" />
}
