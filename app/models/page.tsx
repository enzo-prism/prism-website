import type { Metadata } from "next"
import ModelsPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Prism Models | Real People. Real Smiles. Real Growth.",
  description:
    "Join Prism Models to be the face of confident smiles. Get complimentary whitening, professional photos, and paid creative opportunities for dental brand campaigns.",
  openGraph: {
    title: "Prism Models | Real People. Real Smiles. Real Growth.",
    description:
      "We partner with real people who love being on camera to help dental clients tell authentic stories. Complimentary whitening, professional shoots, and paid opportunities.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/models",
  },
}

export default function ModelsPage() {
  return <ModelsPageClient />
}

