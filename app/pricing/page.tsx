import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import PricingPageClient from "./client-page"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Pricing | Prism",
  description: "Clear pricing for Prism’s website builds and growth systems. Start with a plan, then launch fast with a high-performing site.",
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
