import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((item) => item.slug === 'mataria-dental-group')

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'case study: mataria dental group m&a launch',
  description:
    'how prism relaunched mataria dental group in torrance with a new dental website, listings, content, social campaigns, and analytics.',
  path: '/case-studies/mataria-dental-group',
  ogImage: cs?.structured?.heroImage ?? '/mataria-hero.png',
})

export default function MatariaDentalGroupCaseStudyPage() {
  return <MinimalCaseStudyPage slug="mataria-dental-group" />
}
