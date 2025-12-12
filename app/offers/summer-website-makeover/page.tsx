import type { Metadata } from "next"
import SummerWebsiteMakeoverClientPage from "./client-page"

export const metadata: Metadata = {
  title: "summer website makeover offer | prism",
  description:
    "triple your traffic and conversions in 30 days with prism's summer website makeover—full-stack rebuild, seo, and cro with guaranteed results.",
  alternates: {
    canonical: "https://www.design-prism.com/offers/summer-website-makeover",
  },
  openGraph: {
    title: "☀️ summer website makeover - guaranteed growth | prism",
    description:
      "let prism transform your website into a 24/7 growth engine. 3x traffic & conversions in 30 days, or we work for free until we do.",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630", // Replace with a specific offer image
        width: 1200,
        height: 630,
        alt: "Prism Summer Website Makeover Offer",
      },
    ],
  },
}

export default function SummerWebsiteMakeoverPage() {
  return <SummerWebsiteMakeoverClientPage />
}
