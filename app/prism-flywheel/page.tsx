import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import PrismFlywheelClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'The Prism growth flywheel'
const PAGE_DESCRIPTION =
  'See how the Prism flywheel compounds frontier AI, content, and proof into durable leverage that keeps generating leads for your business.'
const CANONICAL_URL = "https://www.design-prism.com/prism-flywheel"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/prism-flywheel",
  ogImage: "/og-prism-flywheel.jpg",
})

export default function PrismFlywheelPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrismFlywheelClient />
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/og-prism-flywheel.jpg"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
} 
