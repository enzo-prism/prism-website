import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Rebellious Aging case study',
  description:
    'How Prism built the brand identity, content-first website, and multi-channel audience engine (Substack, YouTube, TikTok, Facebook community) for Rebellious Aging.',
  path: '/case-studies/rebellious-aging',
  ogImage: '/case-studies/rebellious-aging-home-desktop.jpg',
})

export default function RebelliousAgingCaseStudyPage() {
  return <MinimalCaseStudyPage slug="rebellious-aging" />
}
