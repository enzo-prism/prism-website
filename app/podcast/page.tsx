import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import PodcastClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism podcast | founders · journeys · lessons",
  description:
    "every episode our founder enzo sison sits down with another builder who's in the arena—unpacking the wins, wrong turns, and frameworks you can swipe for your own business.",
  openGraph: {
    title: "prism podcast | founders · journeys · lessons",
    description:
      "every episode our founder enzo sison sits down with another builder who's in the arena—unpacking the wins, wrong turns, and frameworks you can swipe for your own business.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/podcast",
  },
}

export default function PodcastPage() {
  return (
    <>
      <PodcastClientPage />
      <SeoTextSection title="about the prism podcast">
        <p>
          candid conversations with founders and operators about what actually works—pricing, hiring,
          positioning, and growth. zero fluff, actionable lessons you can apply to your team this week.
        </p>
      </SeoTextSection>
    </>
  )
}