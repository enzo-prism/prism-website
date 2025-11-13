import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: "Website pricing | prism",
  description:
    "Transparent pricing for Prism’s beautifully designed business websites. Choose Launch, Grow, or Scale and move from concept to live site in days.",
  openGraph: {
    title: "Website pricing | prism",
    description:
      "See Prism’s Launch, Grow, and Scale plans—high-performing websites built fast with SEO, analytics, and automation.",
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
