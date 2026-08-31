import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Canary Cove case study',
  description:
    'How Prism shaped the website and inquiry path for Canary Cove, a fully staffed private beachfront estate on Ambergris Caye, Belize.',
  path: '/case-studies/canary-cove',
  ogImage: '/case-studies/canary-cove-home-desktop.jpg',
})

export default function CanarycoveCaseStudyPage() {
  return <MinimalCaseStudyPage slug="canary-cove" />
}
