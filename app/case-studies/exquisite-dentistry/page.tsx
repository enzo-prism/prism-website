import type { Metadata } from 'next'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Case Study: Exquisite Dentistry brand relaunch',
  description:
    'Turning a legacy Beverly Hills brand into a modern, trackable growth engine.',
  path: '/case-studies/exquisite-dentistry',
  ogImage: '/exquisite-dentistry-consultation.png',
})

export default function ExquisiteDentistryCaseStudyPage() {
  return <MinimalCaseStudyPage slug="exquisite-dentistry" />
}
