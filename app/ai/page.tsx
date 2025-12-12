import type { Metadata } from "next"
import PrismAIClient from "./prism-ai-client"

export const metadata: Metadata = {
  title: "prism ai - build your website with ai | design prism",
  description: "describe your dream website and let prism ai build it for you. get started in minutes.",
  alternates: {
    canonical: "https://www.design-prism.com/ai",
  },
  openGraph: {
    title: "prism ai - build your website with ai",
    description: "describe your dream website and let prism ai build it for you. get started in minutes.",
    url: "https://www.design-prism.com/ai",
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
  }
}

export default function PrismAIPage() {
  return <PrismAIClient />
}
