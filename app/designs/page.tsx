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
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">design with purpose</h2>
            <p>
              from brand identities to marketing assets, our work emphasizes clarity, usability, and
              conversion—so every pixel pulls its weight.
            </p>
          </div>
        </div>
      </section>
      <DesignsPageClient />
    </>
  )
}
