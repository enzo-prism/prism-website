import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((item) => item.slug === 'olympic-bootworks')

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Olympic Bootworks: Tahoe retail goes online',
  description:
    'How Prism helped Olympic Bootworks, a legendary Tahoe boot-fitting shop, finally sell online without losing the craft that made its reputation.',
  path: '/case-studies/olympic-bootworks',
  ogImage: cs?.structured?.heroImage ?? '/olympic-bootworks-hero.png',
})

export default function OlympicBootworksCaseStudyPage() {
  return <MinimalCaseStudyPage slug="olympic-bootworks" />
}
