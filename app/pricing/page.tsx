import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import PricingPageClient from './client-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pricing & growth plans',
  description:
    'Prism pricing: a $300 flat-fee website, Content OS at $5,000 + $1,000/month, custom Dental OS, and Prism Infinity at $2,000/month for unlimited services.',
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
