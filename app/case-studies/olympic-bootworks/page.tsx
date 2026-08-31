import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((item) => item.slug === 'olympic-bootworks')

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Olympic Bootworks retail case study',
  description:
    'How Prism rebuilt Olympic Bootworks online around its Tahoe locations, boot-fitting expertise, repair services, and current Fantic e-bike catalog.',
  path: '/case-studies/olympic-bootworks',
  ogImage: cs?.structured?.heroImage ?? '/olympic-bootworks.png',
})

export default function OlympicBootworksCaseStudyPage() {
  return <MinimalCaseStudyPage slug="olympic-bootworks" />
}
