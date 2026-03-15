import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Wine Country Root Canal Case Study',
  description:
    'How Prism built a calming, conversion-focused digital presence for Wine Country Root Canal — a Napa Valley endodontic practice. Brand design, custom website, SEO/AEO, local listing optimization, and enterprise analytics.',
  path: '/case-studies/wine-country-root-canal',
})

export default function WineCountryRootCanalCaseStudyPage() {
  return <MinimalCaseStudyPage slug="wine-country-root-canal" />
}
