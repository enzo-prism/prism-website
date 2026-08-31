import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Front-end developer role closed',
  description:
    'This Prism role is no longer open. Visit the careers page for the current hiring status.',
  path: '/careers/front-end-developer',
  ogImage: '/prism-opengraph.png',
  index: false,
})

export default function FrontEndDeveloperJobPage() {
  permanentRedirect('/careers')
}
