import type { Metadata } from "next"
import DesignsPageClient from "./DesignsPageClient"

export const metadata: Metadata = {
  title: "graphic design portfolio & creative services | prism",
  description:
    "browse our collection of award-winning designs including logos, branding, marketing materials, and social media graphics. see how professional design can elevate your brand and capture attention.",
  openGraph: {
    title: "graphic design portfolio & creative services | prism",
    description:
      "browse our collection of award-winning designs including logos, branding, marketing materials, and social media graphics. see how professional design can elevate your brand and capture attention.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/designs",
  },
}

export default function DesignsPage() {
  return (
    <>
      <DesignsPageClient />
    </>
  )
}
