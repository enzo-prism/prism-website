import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"

import AiWebsiteLaunchClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "AI Website Builder for Small Businesses | Prism"
const PAGE_DESCRIPTION =
  "Get a modern, SEO-ready website built with AI in 48 hours for just $400. No subscriptions—launch fast and start growing with Prism."
const CANONICAL_URL = "https://www.design-prism.com/ai-website-launch"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/ai-website-launch",
  ogImage: "/prism-opengraph.png",
})

export default function AiWebsiteLaunchPage() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <main>
        <AiWebsiteLaunchClientPage />
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
