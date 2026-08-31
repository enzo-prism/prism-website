import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'We Are Saplings case study',
  description:
    'How Prism built a joyful, character-led digital presence for We Are Saplings and its emotional-learning stories, mindfulness, and play resources.',
  path: '/case-studies/we-are-saplings',
  ogImage: '/case-studies/we-are-saplings-home-desktop.jpg',
})

export default function WeAreSaplingsCaseStudyPage() {
  return <MinimalCaseStudyPage slug="we-are-saplings" />
}
