import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import ScrollToTop from '@/components/scroll-to-top'
import { WebPageSchema } from '@/components/schema-markup'
import PrismFlywheelClient from './client-page'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'The Prism growth flywheel'
const PAGE_DESCRIPTION =
  'See how the Prism flywheel compounds frontier AI, content, and proof into durable leverage that keeps generating leads for your business.'
const CANONICAL_URL = 'https://www.design-prism.com/prism-flywheel'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/prism-flywheel',
})

export default function PrismFlywheelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PrismFlywheelClient />
        <FinalCta
          location="footer-flywheel"
          title="ready to build?"
          description="Transform your business with a growth system that compounds. Join leaders who choose leverage over hustle."
        />
      </main>
      <Footer />
      <ScrollToTop />
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
