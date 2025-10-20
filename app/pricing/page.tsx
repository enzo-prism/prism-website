import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Pricing | Prism",
  description:
    "Transparent monthly pricing for Prism’s growth-engine subscription. Choose your site plan, add local listings, ads, or content, and scale with a single partner.",
  openGraph: {
    title: "Prism Pricing",
    description:
      "Transparent monthly pricing for Prism’s growth-engine subscription. Choose your site plan, add local listings, ads, or content, and scale with a single partner.",
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
      </main>
      <Footer />
    </div>
  )
}
