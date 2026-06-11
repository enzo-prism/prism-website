import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Practice Transitions Institute case study',
  description:
    'How Prism built authority infrastructure for Practice Transitions Institute, a San Mateo dental transition consultancy with a proven process.',
  path: '/case-studies/practice-transitions-institute',
  ogImage: '/case-studies/practice-transitions-institute-home-desktop.jpg',
})

export default function PracticeTransitionsInstituteCaseStudyPage() {
  return <MinimalCaseStudyPage slug="practice-transitions-institute" />
}
