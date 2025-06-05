import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingDentalClient from "./client-page"

export const metadata: Metadata = {
  title: "dental pricing",
  description:
    "transparent pricing plans designed specifically for dental practices. choose between starter and pro plans to grow your practice and attract more patients.",
}

export default function PricingDentalPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingDentalClient />
      </main>
      <Footer />
    </>
  )
}
