import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import PodcastClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism podcast | founders · journeys · lessons",
  description:
    "each episode, founder enzo sison sits down with builders in the arena to unpack wins, missteps, and frameworks you can apply to your business.",
  openGraph: {
    title: "prism podcast | founders · journeys · lessons",
    description:
      "each episode, founder enzo sison sits down with builders in the arena to unpack wins, missteps, and frameworks you can apply to your business.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/podcast",
  },
}

export default function PodcastPage() {
  return (
    <>
      <h1 className="sr-only">Prism Podcast | Founders · Journeys · Lessons</h1>
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
