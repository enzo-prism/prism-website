import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Wine Country Root Canal case study',
  description:
    'How Prism built a calming, conversion-focused digital presence for Wine Country Root Canal, a Napa Valley endodontic and root-canal practice.',
  path: '/case-studies/wine-country-root-canal',
  ogImage: '/case-studies/wine-country-root-canal-home-desktop.jpg',
})

export default function WineCountryRootCanalCaseStudyPage() {
  return <MinimalCaseStudyPage slug="wine-country-root-canal" />
}
