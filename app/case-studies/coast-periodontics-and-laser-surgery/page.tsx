import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Coast Periodontics case study',
  description:
    'How Prism built a calming, authority-driven digital presence for Coast Periodontics and Laser Surgery, a specialist periodontic and implant practice.',
  path: '/case-studies/coast-periodontics-and-laser-surgery',
  ogImage: '/case-studies/coast-periodontics-and-laser-surgery-home-desktop.jpg',
})

export default function CoastPeriodonticsCaseStudyPage() {
  return <MinimalCaseStudyPage slug="coast-periodontics-and-laser-surgery" />
}
