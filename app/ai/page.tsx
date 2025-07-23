import type { Metadata } from "next"
import PrismAIClient from "./prism-ai-client"

export const metadata: Metadata = {
  title: "Prism AI - Build Your Website with AI | Design Prism",
  description: "Describe your dream website and let Prism AI build it for you. Get started in minutes.",
  openGraph: {
    title: "Prism AI - Build Your Website with AI",
    description: "Describe your dream website and let Prism AI build it for you. Get started in minutes.",
    url: "https://design-prism.com/ai",
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
    title: "Prism AI - Build Your Website with AI",
    description: "Describe your dream website and let Prism AI build it for you.",
    images: ["/og-prism-ai.jpg"]
  }
}

export default function PrismAIPage() {
  return <PrismAIClient />
}