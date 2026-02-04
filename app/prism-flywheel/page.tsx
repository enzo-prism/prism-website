import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import PrismFlywheelClient from "./client-page"

const PAGE_TITLE = "prism flywheel | powering exponential growth"
const PAGE_DESCRIPTION =
  "discover prism's flywheel: a compounding system using frontier ai like grok and claude to build maximum leverage for your business growth."
const CANONICAL_URL = "https://www.design-prism.com/prism-flywheel"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  keywords: [
    "AI-powered growth flywheel",
    "frontier AI for business leverage",
    "compounding content systems",
    "AI business automation",
    "growth engine technology",
    "Prism flywheel methodology"
  ],
  openGraph: {
    title: "the prism flywheel: compounding leverage for unstoppable growth",
    description: "harness frontier ai and cutting-edge tech to build a self-reinforcing system that transforms code and content into revenue.",
    url: CANONICAL_URL,
    siteName: "Design Prism",
    images: [
      {
        url: "/og-prism-flywheel.jpg",
        width: 1200,
        height: 630,
        alt: "Prism Flywheel - AI-Powered Growth Engine"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "the prism flywheel: compounding leverage for unstoppable growth",
    description: "build maximum leverage through code, content, and ai-driven decisions.",
    images: ["/og-prism-flywheel.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function PrismFlywheelPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrismFlywheelClient />
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/og-prism-flywheel.jpg"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
} 
