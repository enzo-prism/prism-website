import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import WallOfLoveClientPage from "./client-page"
import { quotesData } from "@/content/wall-of-love-data"
import { sanitizeReviewText } from "@/lib/schema-helpers"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "testimonials | dentists & local brands working with prism",
  description: "explore feedback from dental practices, nonprofits, and local retailers that partner with prism for high-performing websites and growth systems.",
  path: "/wall-of-love",
  ogImage: "/prism-opengraph.png",
})

export default function WallOfLovePage() {
  const defaultReviewRating = {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
  }

  const reviewListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: quotesData.slice(0, 50).map((quote, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: quote.client,
        },
        reviewBody: sanitizeReviewText(quote.text),
        reviewRating: defaultReviewRating,
        itemReviewed: {
          "@type": "Organization",
          "@id": "https://www.design-prism.com/#organization",
          name: "Prism",
        },
      },
    })),
  }

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <Navbar />
      <WallOfLoveClientPage />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewListSchema) }} />
    </>
  )
}
