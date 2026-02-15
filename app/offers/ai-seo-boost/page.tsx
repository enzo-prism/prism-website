import type { Metadata } from "next"
import AISEOBoostClientPage from "./client-page"
import { ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "ai seo boost™ - get recommended by ai bots | prism",
  description: "make chatgpt, gemini & perplexity name-drop your brand first. specialized ai search optimization that gets you recommended by ai bots 24/7. 90-day guarantee.",
  path: "/offers/ai-seo-boost",
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
