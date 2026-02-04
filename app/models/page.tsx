import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ModelsPageClient from "./client-page"

const PAGE_TITLE = "Prism Models"
const PAGE_DESCRIPTION =
  "join prism models for free whitening, professional photos, and paid creative projects that help dental practices tell real stories."
const CANONICAL_URL = "https://www.design-prism.com/models"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "prism models | real people. real smiles. real opportunities.",
    description:
      "we work with everyday people who love being on camera so our dental clients can tell real stories. complimentary whitening, professional shoots, and paid creative work.",
    images: ["/prism-opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "prism models | real people. real smiles. real opportunities.",
    description:
      "we work with everyday people who love being on camera so our dental clients can tell real stories. complimentary whitening, professional shoots, and paid creative work.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
}

export default function ModelsPage() {
  return (
    <>
      <ModelsPageClient />
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
