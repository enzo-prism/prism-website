import type { Metadata } from "next"
import PrismAIClient from "./prism-ai-client"
import { WebPageSchema } from "@/components/schema-markup"

const PAGE_TITLE = "prism ai - build your website with ai | design prism"
const PAGE_DESCRIPTION =
  "describe your dream website and let prism ai build it for you. get started in minutes."
const CANONICAL_URL = "https://www.design-prism.com/ai"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "prism ai - build your website with ai",
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "Design Prism",
    images: [
      {
        url: "/og-prism-ai.jpg",
        width: 1200,
        height: 630,
        alt: "Prism AI Engine - AI Website Builder"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "prism ai - build your website with ai",
    description: "describe your dream website and let prism ai build it for you.",
    images: ["/og-prism-ai.jpg"]
  },
}

export default function PrismAIPage() {
  return (
    <>
      <PrismAIClient />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/og-prism-ai.jpg"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
