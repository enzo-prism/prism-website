import type { Metadata } from "next"
import AISEOBoostClientPage from "./client-page"
import { ServiceSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "ai seo boost™ - get recommended by ai bots | prism",
  description:
    "make chatgpt, gemini & perplexity name-drop your brand first. specialized ai search optimization that gets you recommended by ai bots 24/7. 90-day guarantee.",
  openGraph: {
    title: "🤖 ai seo boost™ - own the ai answer box | prism",
    description:
      "turn ai search engines into your 24/7 referral machine. get recommended first by chatgpt, gemini & perplexity with our specialized ai seo optimization.",
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
    canonical: "https://www.design-prism.com/offers/ai-seo-boost",
  },
}

export default function AISEOBoostPage() {
  return (
    <>
      <AISEOBoostClientPage />
      <ServiceSchema
        serviceId="ai-seo-boost"
        name="AI SEO Boost™"
        description={metadata.description || "AI search optimization that helps your brand get recommended across AI assistants."}
        serviceType="AI SEO services"
        areaServed="United States"
        offerDetails={{
          name: "AI SEO Boost™ offer",
          description: "A focused, 90-day sprint to increase brand recommendations in AI assistants and AI Overviews.",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          url: "https://www.design-prism.com/offers/ai-seo-boost",
        }}
      />
    </>
  )
}
