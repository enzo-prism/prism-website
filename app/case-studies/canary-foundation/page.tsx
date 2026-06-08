import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Canary Foundation case study',
  description:
    'How Prism built a mission-driven website and brand for Canary Foundation, a nonprofit pioneering early cancer detection, with enterprise analytics.',
  path: '/case-studies/canary-foundation',
})

export default function CanaryFoundationCaseStudyPage() {
  return <MinimalCaseStudyPage slug="canary-foundation" />
}
