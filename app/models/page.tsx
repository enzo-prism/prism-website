import type { Metadata } from "next"
import ModelsPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Prism Models | Real People. Real Smiles. Real Opportunities.",
  description:
    "Join Prism Models for free whitening, professional photos, and paid creative projects that help dental practices tell real stories.",
  openGraph: {
    title: "Prism Models | Real People. Real Smiles. Real Opportunities.",
    description:
      "We work with everyday people who love being on camera so our dental clients can tell real stories. Complimentary whitening, professional shoots, and paid creative work.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/models",
  },
}

export default function ModelsPage() {
  return <ModelsPageClient />
}
