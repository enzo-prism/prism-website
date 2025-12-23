import type { Metadata } from "next"
import ModelsPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Prism Models",
  description:
    "join prism models for free whitening, professional photos, and paid creative projects that help dental practices tell real stories.",
  openGraph: {
    title: "prism models | real people. real smiles. real opportunities.",
    description:
      "we work with everyday people who love being on camera so our dental clients can tell real stories. complimentary whitening, professional shoots, and paid creative work.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/models",
  },
}

export default function ModelsPage() {
  return <ModelsPageClient />
}
