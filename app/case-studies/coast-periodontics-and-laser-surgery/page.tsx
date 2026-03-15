import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Coast Periodontics and Laser Surgery Case Study',
  description:
    'How Prism built a calming, authority-driven digital presence for Coast Periodontics and Laser Surgery — a specialist periodontic practice. Brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics.',
  path: '/case-studies/coast-periodontics-and-laser-surgery',
})

export default function CoastPeriodonticsCaseStudyPage() {
  return <MinimalCaseStudyPage slug="coast-periodontics-and-laser-surgery" />
}
