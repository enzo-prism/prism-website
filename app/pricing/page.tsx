import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingClient from "./client-page"

export const metadata: Metadata = {
  title: "pricing",
  description:
    "transparent pricing plans designed for business owners. choose between starter and pro plans to grow your business and attract more customers.",
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingClient />
      </main>
      <Footer />
    </>
  )
}
