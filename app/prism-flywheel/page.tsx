import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import PrismFlywheelClient from "./client-page"

export const metadata: Metadata = {
  title: "The Prism Flywheel: Powering Exponential Growth | Design Prism",
  description: "Discover Prism's Flywheel: A compounding system using frontier AI like Grok and Claude to build maximum leverage for your business growth.",
  keywords: [
    "AI-powered growth flywheel",
    "frontier AI for business leverage",
    "compounding content systems",
    "AI business automation",
    "growth engine technology",
    "Prism flywheel methodology"
  ],
  openGraph: {
    title: "The Prism Flywheel: Compounding Leverage for Unstoppable Growth",
    description: "Harness frontier AI and cutting-edge tech to build a self-reinforcing system that transforms code and content into revenue.",
    url: "https://design-prism.com/prism-flywheel",
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
    title: "The Prism Flywheel: Compounding Leverage for Unstoppable Growth",
    description: "Build maximum leverage through code, content, and AI-driven decisions.",
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
    </>
  )
} 