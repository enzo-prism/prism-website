import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import OffersClientPage from "./client-page"

const PAGE_TITLE = "special offers for prism clients"
const PAGE_DESCRIPTION =
  "browse the latest limited-time offers from prism for websites, apps, and design support, all crafted to launch momentum quickly."
const CANONICAL_URL = "https://www.design-prism.com/offers"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: "exclusive offers on our web design, app development, and design services.",
    url: CANONICAL_URL,
    images: ["/prism-opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: "exclusive offers on our web design, app development, and design services.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
}

export default function OffersPage() {
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">how our offers work</h2>
            <p>
              time-boxed, high–leverage engagements to ship real outcomes fast. each offer includes
              strategy, execution, and clear deliverables.
            </p>
          </div>
        </div>
      </section>
      <Navbar />
      <main>
        <OffersClientPage />
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
    </>
  )
}
