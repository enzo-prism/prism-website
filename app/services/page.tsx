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
        <SeoTextSection
          title="why teams choose prism"
          subtitle="we rebuild the digital experience end-to-end—research, design, engineering, analytics, and enablement—so your team ships faster and converts more."
          variant="compact"
          showDivider={false}
        >
          <p>
            Whether you need a full website relaunch, a design sprint to unblock a launch, or a growth partner that monitors performance, we bring a dedicated crew that has shipped for dental practices, healthcare groups, retailers, and nonprofits. We align on measurable goals, publish a weekly cadence, and keep iterating until the dashboard proves the lift.
          </p>
          <ul>
            <li><strong>Strategy & research:</strong> positioning, patient or customer journeys, and competitive analysis that inform every decision.</li>
            <li><strong>Design & build:</strong> mobile-first UX, conversion copy, and fast front-end implementation that stays on brand.</li>
            <li><strong>Growth enablement:</strong> analytics, CRM/phone integrations, and campaign support so your team can scale the results.</li>
          </ul>
        </SeoTextSection>
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
