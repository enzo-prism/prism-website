import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import PricingPageClient from './client-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pricing',
  description:
    'Compare Prism website, content, dental marketing, and ongoing creative plans. Join the waitlist and agree on scope before work begins.',
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
