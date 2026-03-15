import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'family first smile care case study | dental website',
  description:
    'how we created a modern, patient‑friendly website for family first smile care with clear services, comfort highlights, and conversion paths.',
  path: '/case-studies/family-first-smile-care',
})

export default function FamilyFirstSmileCareCase() {
  return <MinimalCaseStudyPage slug="family-first-smile-care" />
}
