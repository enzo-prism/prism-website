import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Replit builder role closed',
  description:
    'This Prism role is no longer open. Visit the careers page for the current hiring status.',
  path: '/careers/replit-builder',
  ogImage: '/prism-opengraph.png',
  index: false,
})

export default function ReplitBuilderJobPage() {
  permanentRedirect('/careers')
}
