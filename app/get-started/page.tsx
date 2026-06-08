import type { Metadata } from 'next'

import DashboardIntakeSection from '@/components/get-started/DashboardIntakeSection'
import Footer from '@/components/footer'
import GrowthProcessSection from '@/components/get-started/GrowthProcessSection'
import Navbar from '@/components/navbar'
import { WebPageSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Get started with a free Growth Dashboard'
const PAGE_DESCRIPTION =
  'Create your free Prism Growth Dashboard and we will review your website, search visibility, proof, offer, tracking, and clearest path to growth.'
const CANONICAL_URL = 'https://www.design-prism.com/get-started'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/get-started',
  ogImage: '/prism-opengraph.png',
})

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#F5F5F2]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <GrowthProcessSection />
        <DashboardIntakeSection />
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
