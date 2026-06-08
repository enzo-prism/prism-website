import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Exquisite Dentistry brand relaunch',
  description:
    'How Prism turned a legacy Beverly Hills dental brand into a modern, trackable growth engine, with a new site, SEO, and full-funnel analytics.',
  path: '/case-studies/exquisite-dentistry',
  ogImage: '/exquisite-dentistry-consultation.png',
})

export default function ExquisiteDentistryCaseStudyPage() {
  return <MinimalCaseStudyPage slug="exquisite-dentistry" />
}
