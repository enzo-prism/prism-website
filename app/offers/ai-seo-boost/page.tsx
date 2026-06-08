import type { Metadata } from "next"
import AISEOBoostClientPage from "./client-page"
import { ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'AI SEO Boost: get recommended by AI',
  description: 'Make ChatGPT, Gemini, and Perplexity name-drop your brand first with AI SEO Boost, specialized optimization that gets you recommended 24/7.',
  path: "/offers/ai-seo-boost",
  index: false,
  ogImage: "/offers/ai-seo-boost-card.png",
})

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
