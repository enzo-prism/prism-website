import type { Metadata } from "next"
import dynamic from "next/dynamic"
import PricingDentalClient from "./client-page"
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export const metadata: Metadata = {
  title: "dental pricing",
  description:
    "transparent pricing plans designed specifically for dental practices. choose between starter and pro plans to grow your practice and attract more patients.",
}

export default function PricingDentalPage() {
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">built for dental practices</h2>
            <p>
              packages include seo, online booking, and review capture—everything you need to attract
              and convert new patients.
            </p>
          </div>
        </div>
      </section>
      <Navbar />
      <main>
        <PricingDentalClient />
      </main>
      <Footer />
    </>
  )
}
