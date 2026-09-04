import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((cs) => cs.slug === 'sacramento-dental-medicine')
const structured = cs?.structured

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Sacramento Dental Medicine redesign',
  description:
    'Prism’s live redesign for an Antelope family practice: a mobile-first scheduler, a dedicated emergency path, and search-ready Dentist schema.',
  path: '/case-studies/sacramento-dental-medicine',
  ogImage:
    structured?.heroImage ??
    '/case-studies/sacramento-dental-medicine-home-desktop.jpg',
})

export default function SacramentoDentalMedicineCaseStudyPage() {
  return <MinimalCaseStudyPage slug="sacramento-dental-medicine" />
}
