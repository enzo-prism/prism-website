import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Grace Dental Santa Rosa relaunch',
  description:
    'How Prism partnered with Grace Dental (Tingjen Ji, DDS MSD) on a post-M&A relaunch: new brand, modern site, and full acquisition and tracking setup.',
  path: '/case-studies/grace-dental-santa-rosa',
  ogImage: '/case-studies/grace-dental-santa-rosa-home-desktop.jpg',
})

export default function GraceDentalSantaRosaCase() {
  return <MinimalCaseStudyPage slug="grace-dental-santa-rosa" />
}
