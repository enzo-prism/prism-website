import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Canary Foundation Case Study',
  description:
    'How Prism built a mission-driven digital presence for Canary Foundation — a nonprofit pioneering early cancer detection. Brand design, custom website, SEO/AEO, and enterprise analytics.',
  path: '/case-studies/canary-foundation',
})

export default function CanaryFoundationCaseStudyPage() {
  return <MinimalCaseStudyPage slug="canary-foundation" />
}
