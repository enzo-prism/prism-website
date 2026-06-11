import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Belize Kids Foundation case study',
  description:
    'How Prism built a warm, conversion-focused website and brand for Belize Kids Foundation, a nonprofit expanding education and opportunity for kids in Belize.',
  path: '/case-studies/belize-kids-foundation',
  ogImage: '/case-studies/belize-kids-foundation-home-desktop.jpg',
})

export default function BelizeKidsFoundationCaseStudyPage() {
  return <MinimalCaseStudyPage slug="belize-kids-foundation" />
}
