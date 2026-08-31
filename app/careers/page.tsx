import type { Metadata } from 'next'
import CareersClientPage from './client-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Careers at Prism',
  description: 'Check the current hiring status and open roles at Prism.',
  path: '/careers',
  ogImage: '/prism-opengraph.png',
})

export default function CareersPage() {
  return <CareersClientPage />
}
