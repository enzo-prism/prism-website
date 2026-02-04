import type { Metadata } from "next"

import { WebPageSchema } from "@/components/schema-markup"
import TikTokLandingPage from "./tiktok-landing-page"

const PAGE_TITLE = "from tiktok to transformation | prism"
const PAGE_DESCRIPTION =
  "you’ve seen the clips. prism turns tiktok insights into high-performing websites and marketing systems that attract customers and grow revenue."
const CANONICAL_URL = "https://www.design-prism.com/tiktok"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "Prism",
    locale: "en_US",
    type: "website",
    images: ["/prism-opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "from tiktok to transformation",
    description: PAGE_DESCRIPTION,
    creator: "@designprism",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: CANONICAL_URL
  }
}

export default function TikTokPage() {
  return (
    <>
      <TikTokLandingPage />
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
