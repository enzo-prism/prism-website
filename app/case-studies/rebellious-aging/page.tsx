import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Rebellious Aging Case Study',
  description:
    'How Prism built an audience platform for Rebellious Aging — a contrarian wellness brand challenging how people think about getting older. Brand design, custom website, SEO/AEO, and enterprise analytics.',
  path: '/case-studies/rebellious-aging',
})

export default function RebelliousAgingCaseStudyPage() {
  return <MinimalCaseStudyPage slug="rebellious-aging" />
}
