import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import DesignsPageClient from "./DesignsPageClient"

export const metadata: Metadata = {
  title: "Graphic Design Portfolio & Creative Services | Prism",
  description:
    "Browse award-winning logos, branding, marketing assets, and social graphics that show how intentional design elevates your brand and captures attention.",
  openGraph: {
    title: "Graphic Design Portfolio & Creative Services | Prism",
    description:
      "Browse award-winning logos, branding, marketing assets, and social graphics that show how intentional design elevates your brand and captures attention.",
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

      {/* Move "design with purpose" near the bottom for all breakpoints */}
      <section className="px-4 pt-8 pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-xl font-semibold lowercase">design with purpose</h2>
            <p>
              from brand identities to marketing assets, our work emphasizes clarity, usability, and
              conversion—so every pixel pulls its weight.
            </p>
          </div>
        </div>
      </section>

      {/* SEO supporting copy */}
      <SeoTextSection title="graphic design & brand systems">
        <p>
          from logos and identity systems to pitch decks and social content, we create visual systems that
          are consistent, legible, and conversion‑focused. every asset aligns with your positioning and
          is optimized for mobile, ensuring your brand looks sharp from instagram to investor meetings.
        </p>
      </SeoTextSection>
    </>
  )
}
