import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Family First Smile Care case study',
  description:
    'How Prism built a modern, patient-friendly website for Family First Smile Care, with clear services, comfort highlights, and real conversion paths.',
  path: '/case-studies/family-first-smile-care',
  ogImage: '/case-studies/family-first-smile-care-home-desktop.jpg',
})

export default function FamilyFirstSmileCareCase() {
  return <MinimalCaseStudyPage slug="family-first-smile-care" />
}
