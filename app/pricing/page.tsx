import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"

export const metadata: Metadata = {
  title: {
    absolute: "Pricing | Prism",
  },
  description:
    "Clear pricing for Prism’s website builds and growth systems. Start with a plan, then launch fast with a high-performing site.",
  openGraph: {
    title: "Pricing | Prism",
    description:
      "Clear pricing for Prism’s website builds and growth systems. Start with a plan, then launch fast with a high-performing site.",
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
