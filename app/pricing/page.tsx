import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: "prism pricing | build your plan",
  description:
    "transparent monthly pricing for prism’s growth-engine subscription. choose your site plan, add listings, ads, or content, and scale with a single partner.",
  openGraph: {
    title: "prism pricing | build your plan",
    description:
      "transparent monthly pricing for prism’s growth-engine subscription. choose your site plan, add listings, ads, or content, and scale with a single partner.",
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
