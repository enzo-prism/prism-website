import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Practice Transitions Institute Case Study',
  description:
    'How Prism built authority infrastructure for Practice Transitions Institute — a dental transition consultancy in San Mateo, CA. Brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics.',
  path: '/case-studies/practice-transitions-institute',
})

export default function PracticeTransitionsInstituteCaseStudyPage() {
  return <MinimalCaseStudyPage slug="practice-transitions-institute" />
}
