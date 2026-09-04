import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((cs) => cs.slug === 'waikiki-dental')
const structured = cs?.structured

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Waikiki Dental website redesign',
  description:
    'How Prism rebuilt Waikiki Dental’s Roseville site around comfort-first care: on-site 3-step booking, 14 services, and a Pacific Premium design system.',
  path: '/case-studies/waikiki-dental',
  ogImage:
    structured?.heroImage ?? '/case-studies/waikiki-dental-home-desktop.jpg',
})

export default function WaikikiDentalCaseStudyPage() {
  return <MinimalCaseStudyPage slug="waikiki-dental" />
}
