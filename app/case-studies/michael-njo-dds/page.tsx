import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Michael Njo DDS case study',
  description:
    'How Prism built a complete digital presence for Michael Njo DDS, a San Mateo general dental practice with deep community roots, from brand to analytics.',
  path: '/case-studies/michael-njo-dds',
  ogImage: '/case-studies/michael-njo-dds-home-desktop.jpg',
})

export default function MichaelNjoDDSCaseStudyPage() {
  return <MinimalCaseStudyPage slug="michael-njo-dds" />
}
