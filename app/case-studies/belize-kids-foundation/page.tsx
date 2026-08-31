import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Belize Kids case study',
  description:
    'How Prism built a warm, conversion-focused website for Belize Kids, Don Listwin’s nonprofit supporting children’s education, health, and well-being in Belize.',
  path: '/case-studies/belize-kids-foundation',
  ogImage: '/case-studies/belize-kids-foundation-home-desktop.jpg',
})

export default function BelizeKidsFoundationCaseStudyPage() {
  return <MinimalCaseStudyPage slug="belize-kids-foundation" />
}
