import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import VideoPlayer from "@/components/video-player"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: "website pricing | prism",
  description:
    "transparent pricing for prism’s beautifully designed business websites. choose launch, grow, or scale and move from concept to live site in days.",
  openGraph: {
    title: "website pricing | prism",
    description:
      "see prism’s launch, grow, and scale plans—high-performing websites built fast with seo, analytics, and automation.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/pricing",
  },
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Prism Pricing" />
      <Navbar />
      <main className="flex-1">
        <PricingPageClient />
        <section className="px-4 py-16 sm:py-20">
          <div id="pricing-founder-vsl" className="mx-auto max-w-3xl text-left">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
              hear from our founder
            </p>
            <VideoPlayer
              className="mt-4"
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763166554/pricing_ymfnqy.mp4"
              poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/pricing_ymfnqy.jpg"
              title="Founder Enzo Sison on Prism pricing"
              caption="Enzo explains how the Launch, Grow, and Scale plans work—what’s included, how pricing stays transparent, and how each tier helps teams launch fast and keep improving."
              schema={{
                id: "https://www.design-prism.com/pricing#founder-vsl",
                name: "Founder Enzo Sison on Prism pricing",
                description:
                  "Enzo Sison walks through Prism’s pricing tiers, how Launch, Grow, and Scale deliver conversion-ready websites plus ongoing optimization, and why everything stays transparent from day one.",
                thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/pricing_ymfnqy.jpg",
                uploadDate: "2025-01-24T00:00:00Z",
                duration: "PT60S",
                contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763166554/pricing_ymfnqy.mp4",
                embedUrl: "https://www.design-prism.com/pricing#founder-vsl",
                width: 1920,
                height: 1080,
                creatorName: "Enzo Sison",
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
