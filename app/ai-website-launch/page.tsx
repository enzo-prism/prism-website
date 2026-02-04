import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"

import AiWebsiteLaunchClientPage from "./client-page"

const PAGE_TITLE = "AI Website Builder for Small Businesses | Prism"
const PAGE_DESCRIPTION =
  "Get a modern, SEO-ready website built with AI in 48 hours for just $400. No subscriptions—launch fast and start growing with Prism."
const CANONICAL_URL = "https://www.design-prism.com/ai-website-launch"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "https://www.design-prism.com/ai-website-launch",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    type: "website",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism helps small businesses launch high-performing websites fast.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

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
