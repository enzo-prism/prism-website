import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import YouTubeLandingPage from "./youtube-landing-page"

const PAGE_TITLE = "youtube community | prism"
const PAGE_DESCRIPTION =
  "explore the exact youtube tactics prism uses to build modern growth systems for ambitious brands and business owners."
const CANONICAL_URL = "https://www.design-prism.com/youtube"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism YouTube community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

export default function YouTubePage() {
  return (
    <>
      <YouTubeLandingPage />
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
