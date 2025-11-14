import SeoTextSection from "@/components/seo-text-section"
import VideoPlayer from "@/components/video-player"
import type { Metadata } from "next"
import DesignsPageClient from "./DesignsPageClient"

export const metadata: Metadata = {
  title: "graphic design portfolio & creative services | prism",
  description:
    "browse award-winning logos, branding, marketing assets, and social graphics that show how intentional design elevates your brand and captures attention.",
  openGraph: {
    title: "graphic design portfolio & creative services | prism",
    description:
      "browse award-winning logos, branding, marketing assets, and social graphics that show how intentional design elevates your brand and captures attention.",
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
      <section className="px-4 py-16 sm:py-20">
        <div id="designs-founder-vsl" className="mx-auto max-w-3xl text-left">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">hear from our founder</p>
          <VideoPlayer
            className="mt-4"
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763152551/design-1_ftpmsw.mp4"
            title="Founder Enzo Sison on design as the silent multiplier"
            caption="Enzo explains why inconsistent design erodes trust, how Prism builds cohesive systems across every touchpoint, and how sharper visuals lift awareness, conversion, and loyalty without hiring an internal team."
            schema={{
              id: "https://www.design-prism.com/designs#founder-vsl",
              name: "Founder Enzo Sison on design as the silent multiplier",
              description:
                "Enzo Sison shares why design is the silent multiplier, how Prism creates cohesive, premium systems across sites, listings, ads, and assets, and how that elevates awareness, conversion, and lifetime value.",
              thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/design-1_ftpmsw.jpg",
              uploadDate: "2025-01-24",
              duration: "PT60S",
              contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763152551/design-1_ftpmsw.mp4",
              embedUrl: "https://www.design-prism.com/designs#founder-vsl",
              creatorName: "Enzo Sison",
            }}
          />
        </div>
      </section>

      <section className="px-4 pt-8 pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">design with purpose</h2>
            <p>design is the connective tissue for every engagement we take on.</p>
            <p>
              we pair beauty with performance, aligning every asset to the outcomes you care about&mdash;so your website,
              campaigns, and internal tools all speak in the same voice.
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
