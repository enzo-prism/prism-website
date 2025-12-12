import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: "website pricing | prism",
  description:
    "transparent pricing for prism’s beautifully designed business websites. choose launch, grow, or scale and move from concept to live site in days.",
  openGraph: {
    title: "website pricing | prism",
    description:
      "see prism’s launch, grow, and scale plans—high-performing websites built fast with seo, analytics, and automation.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/pricing",
  },
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <PricingPageClient />
      </main>
      <Footer />
    </div>
  )
}
