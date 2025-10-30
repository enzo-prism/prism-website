import type { Metadata } from "next"

import TikTokLandingPage from "./tiktok-landing-page"

export const metadata: Metadata = {
  title: "from tiktok to transformation | prism",
  description:
    "you’ve seen the clips. now build what they talk about. prism turns tiktok insights into high-performing websites that help founders attract customers, grow revenue, and stand out online.",
  openGraph: {
    title: "from tiktok to transformation | prism",
    description:
      "from tiktok to transformation. partner with prism to turn social insights into high-performing websites, measurable marketing, and adaptive systems that convert attention into real growth.",
    url: "https://www.design-prism.com/tiktok",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "from tiktok to transformation",
    description:
      "from tiktok to transformation. partner with prism to turn social insights into high-performing websites, measurable marketing, and adaptive systems that convert attention into real growth.",
    creator: "@designprism"
  },
  alternates: {
    canonical: "https://www.design-prism.com/tiktok"
  }
}

export default function TikTokPage() {
  return <TikTokLandingPage />
}
