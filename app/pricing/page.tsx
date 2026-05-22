import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import PricingPageClient from './client-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pricing | Prism',
  description:
    'Prism pricing starts with a free Growth Dashboard, Light Audit, normally $500 Deep Growth Audit, focused 60-day sprints, and optional ongoing growth partner support.',
  path: '/pricing',
  ogImage: '/prism-opengraph.png',
})

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <PricingPageClient />
      </main>
      <Footer />
    </div>
  )
}
