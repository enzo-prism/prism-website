import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import WallOfLoveClientPage from "./client-page"
import { quotesData } from "@/content/wall-of-love-data"
import { sanitizeReviewText } from "@/lib/schema-helpers"

export const metadata: Metadata = {
  title: "testimonials | dentists & local brands working with prism",
  description:
    "explore feedback from dental practices, nonprofits, and local retailers that partner with prism for high-performing websites and growth systems.",
  openGraph: {
    title: "testimonials | dentists & local brands working with prism",
    description:
      "explore feedback from dental practices, nonprofits, and local retailers that partner with prism for high-performing websites and growth systems.",
    url: "https://design-prism.com/wall-of-love",
    images: [
      {
        url: "/prism-opengraph.png", // Using existing opengraph image
        width: 1200,
        height: 630,
        alt: "Prism Client Testimonials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "testimonials | dentists & local brands working with prism",
    description:
      "explore feedback from dental practices, nonprofits, and local retailers that partner with prism for high-performing websites and growth systems.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/wall-of-love",
  },
}

export default function WallOfLovePage() {
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
