import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const cs = CASE_STUDIES.find((cs) => cs.slug === 'dr-christopher-wong')
const structured = cs?.structured

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dr. Wong dental M&A relaunch',
  description:
    'How Prism took Silicon Valley Dental from ownership-transition risk to a future-proof, AI-powered practice in Palo Alto, brand and tracking included.',
  path: '/case-studies/dr-christopher-wong',
  ogImage: structured?.heroImage ?? '/dr-wong-polaroids.png',
})

export default function ChristopherWongCaseStudyPage() {
  return <MinimalCaseStudyPage slug="dr-christopher-wong" />
}
