import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import Link from "next/link"
import PricingDentalClient from "./client-page"

export const metadata: Metadata = {
  title: "dental marketing pricing | prism",
  description:
    "transparent pricing plans designed specifically for dental practices. choose between starter and pro plans to grow your practice and attract more patients.",
  alternates: {
    canonical: "https://www.design-prism.com/pricing-dental",
  },
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
            <p>
              want to see what we ship for a{" "}
              <Link href="/dental-website">dental practice website</Link>? explore the blueprint and examples.
            </p>
            <p>
              looking for{" "}
              <Link href="/dental-practice-seo-expert">seo for dentists</Link>? see our approach and what we ship
              each month.
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
