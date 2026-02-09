import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import SummerWebsiteMakeoverClientPage from "./client-page"

const PAGE_TITLE = "summer website makeover offer | prism"
const PAGE_DESCRIPTION =
  "triple your traffic and conversions in 30 days with prism's summer website makeover—full-stack rebuild, seo, and cro with guaranteed results."
const CANONICAL_URL = "https://www.design-prism.com/offers/summer-website-makeover"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "summer website makeover - guaranteed growth | prism",
    description:
      "let prism transform your website into a 24/7 growth engine. 3x traffic & conversions in 30 days, or we work for free until we do.",
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Summer Website Makeover Offer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "summer website makeover - guaranteed growth | prism",
    description:
      "let prism transform your website into a 24/7 growth engine. 3x traffic & conversions in 30 days, or we work for free until we do.",
    images: ["/prism-opengraph.png"],
  },
}

export default function SummerWebsiteMakeoverPage() {
  return (
    <>
      <SummerWebsiteMakeoverClientPage />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
