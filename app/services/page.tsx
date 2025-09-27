import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import ServicesClient from "./client-page"

export const metadata: Metadata = {
  title:
    "Websites, Ads & Local SEO Services for Small Businesses | Prism",
  description:
    "Explore website rebuilds, paid ads management, and local listing optimization packages built to help small businesses win more local customers with measurable ROI.",
  openGraph: {
    title:
      "Websites, Ads & Local SEO Services for Small Businesses | Prism",
    description:
      "Explore website rebuilds, paid ads management, and local listing optimization packages built to help small businesses win more local customers with measurable ROI.",
    url: "https://design-prism.com/services",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Services",
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesClient />
        <SeoTextSection title="services overview">
          <p>
            choose a starting point—website, app, design system, or growth—and we tailor the engagement
            to your goals. every plan includes research, weekly iterations, and analytics, with clear
            deliverables and timelines.
          </p>
        </SeoTextSection>
      </main>
      <Footer />
    </>
  )
} 
