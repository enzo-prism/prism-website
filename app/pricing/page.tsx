import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Pricing | Prism",
  description: "Prism pricing: Website Overhaul at $1,000 one-time or Growth Partnership at $2,000/month, plus a free expert audit.",
  path: "/pricing",
  ogImage: "/prism-opengraph.png",
})

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
