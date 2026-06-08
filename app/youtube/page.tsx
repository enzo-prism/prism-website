import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import YouTubeLandingPage from "./youtube-landing-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = 'Prism on YouTube: growth tactics'
const PAGE_DESCRIPTION =
  'Watch the exact tactics Prism uses to build modern growth systems for ambitious local brands and business owners, free on YouTube.'
const CANONICAL_URL = "https://www.design-prism.com/youtube"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/youtube",
  index: false,
  ogImage: "/prism-opengraph.png",
})

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
