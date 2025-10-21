import type { Metadata } from "next"
import SummerWebsiteMakeoverClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Summer Website Makeover Offer | Prism",
  description:
    "Triple your traffic and conversions in 30 days with Prism's Summer Website Makeover—full-stack rebuild, SEO, and CRO with guaranteed results.",
  openGraph: {
    title: "☀️ Summer Website Makeover - Guaranteed Growth | Prism",
    description:
      "Let Prism transform your website into a 24/7 growth engine. 3x traffic & conversions in 30 days, or we work for free until we do.",
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
