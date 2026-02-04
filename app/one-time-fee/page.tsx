import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ClientPage from "./client-page"

const PAGE_TITLE = "one-time design for $750 | prism"
const PAGE_DESCRIPTION =
  "get a perfect logo, banner, flyer, or any single custom design asset crafted by prism's pros for $750. unlimited revisions until you love it."
const CANONICAL_URL = "https://www.design-prism.com/one-time-fee"

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
        alt: "Prism one-time design",
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

export default function OneTimeFee() {
  return (
    <>
      <ClientPage />
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
