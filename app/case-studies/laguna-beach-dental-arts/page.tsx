import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Laguna Beach Dental Arts relaunch',
  description:
    'How Prism partnered with Laguna Beach Dental Arts post-merger to relaunch the brand, ship a modern site, and stand up full-funnel acquisition and tracking.',
  path: '/case-studies/laguna-beach-dental-arts',
})

export default function LagunaBeachDentalArtsCase() {
  return <MinimalCaseStudyPage slug="laguna-beach-dental-arts" />
}
