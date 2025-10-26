import type { Metadata } from "next"

import TikTokLandingPage from "./tiktok-landing-page"

export const metadata: Metadata = {
  title: "Prism for TikTok Founders | design-prism.com",
  description:
    "Turn TikTok inspiration into a growth engine. Discover how Prism builds websites, SEO, ads, and analytics grounded in the clips you love.",
  openGraph: {
    title: "Prism for TikTok Founders | design-prism.com",
    description:
      "You’ve seen the clips. Now build what they talk about. Partner with Prism for modern websites, SEO, ads, and analytics that convert attention into growth.",
    url: "https://www.design-prism.com/tiktok",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism for TikTok Founders",
    description:
      "You’ve seen the clips. Now build what they talk about. Partner with Prism for modern websites, SEO, ads, and analytics that convert attention into growth.",
    creator: "@designprism"
  },
  alternates: {
    canonical: "https://www.design-prism.com/tiktok"
  }
}

export default function TikTokPage() {
  return <TikTokLandingPage />
}
