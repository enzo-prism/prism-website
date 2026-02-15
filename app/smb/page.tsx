import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import { WebPageSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import SMBClientPage from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "small business ai services | gpt-5 solutions by prism"
const PAGE_DESCRIPTION =
  "leverage gpt-5 across marketing, operations, and support. prism sets up, trains, and tunes ai workflows tailored to your small business."
const CANONICAL_URL = "https://www.design-prism.com/smb"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/smb",
  ogImage: "/prism-opengraph.png",
})

export default function SMBPage() {
  return (
    <>
      <Navbar />
      <main>
        <SMBClientPage />
        <SeoTextSection title="small business ai setup">
          <p>
            we implement practical ai into small business workflows—lead handling, support replies,
            content drafting, and measurement. our approach favors accuracy, governance, and simple
            automations that save hours every week without adding risk.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
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
