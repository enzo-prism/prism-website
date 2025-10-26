import type { Metadata } from "next"

import TikTokLandingPage from "./tiktok-landing-page"

export const metadata: Metadata = {
  title: "From TikTok to Transformation | Prism",
  description:
    "You’ve seen the clips. Now build what they talk about. Prism turns TikTok insights into high-performing websites, marketing, and systems that drive growth.",
  openGraph: {
    title: "From TikTok to Transformation | Prism",
    description:
      "From TikTok to Transformation. Partner with Prism for modern websites, measurable marketing, and adaptive systems that convert attention into real growth.",
    url: "https://www.design-prism.com/tiktok",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "From TikTok to Transformation",
    description:
      "From TikTok to Transformation. Partner with Prism for modern websites, measurable marketing, and adaptive systems that convert attention into real growth.",
    creator: "@designprism"
  },
  alternates: {
    canonical: "https://www.design-prism.com/tiktok"
  }
}

export default function TikTokPage() {
  return <TikTokLandingPage />
}
