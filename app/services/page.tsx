import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import ServicesClient from "./client-page"

export const metadata: Metadata = {
  title: "Website, App & Growth Services | Prism Digital Agency",
  description:
    "Explore tailored website rebuilds, design sprints, and growth retainers built for fast-moving dental teams and small businesses that need measurable ROI.",
  openGraph: {
    title: "Website, App & Growth Services | Prism Digital Agency",
    description:
      "Explore tailored website rebuilds, design sprints, and growth retainers built for fast-moving dental teams and small businesses that need measurable ROI.",
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
