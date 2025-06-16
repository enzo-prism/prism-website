import type { Metadata } from "next"
import AISEOBoostClientPage from "./client-page"

export const metadata: Metadata = {
  title: "AI SEO Boost™ - Get Recommended by AI Bots | Prism",
  description:
    "Make ChatGPT, Gemini & Perplexity name-drop your brand first. Specialized AI search optimization that gets you recommended by AI bots 24/7. 90-day guarantee.",
  openGraph: {
    title: "🤖 AI SEO Boost™ - Own the AI Answer Box | Prism",
    description:
      "Turn AI search engines into your 24/7 referral machine. Get recommended first by ChatGPT, Gemini & Perplexity with our specialized AI SEO optimization.",
    images: [
      {
        url: "/offers/ai-seo-boost-card.png",
        width: 1200,
        height: 630,
        alt: "Prism AI SEO Boost Offer - Get Recommended by AI Bots",
      },
    ],
  },
  alternates: {
    canonical: "https://design-prism.com/offers/ai-seo-boost",
  },
}

export default function AISEOBoostPage() {
  return <AISEOBoostClientPage />
}