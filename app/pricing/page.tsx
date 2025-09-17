import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import PricingClient from "./client-page"

export const metadata: Metadata = {
  title: "Pricing | Transparent Web Design Plans for Dentists & SMBs",
  description:
    "Compare design sprints, website subscriptions, and growth accelerator plans with clear deliverables, unlimited iterations, and analytics support.",
}

export default function PricingPage() {
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">simple, transparent pricing</h2>
            <p>
              start small or scale fast. every plan includes design, development, and analytics
              baked-in—so you can launch quickly and grow with confidence.
            </p>
          </div>
        </div>
      </section>
      <Navbar />
      <main>
        <PricingClient />
      </main>
      <Footer />
    </>
  )
}
