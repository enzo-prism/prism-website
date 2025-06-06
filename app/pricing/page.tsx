import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingClient from "./client-page"
import { ServiceSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "pricing",
  description:
    "transparent pricing plans designed for business owners. choose between starter and pro plans to grow your business and attract more customers.",
}

export default function PricingPage() {
  const services = [
    {
      id: "https://prism.agency/#starter-plan",
      name: "Starter Plan",
      description:
        "DIY playbooks for website makeover, mobile booking, review engine, ad leads and AI-search visibility.",
      url: "https://prism.agency/pricing",
      lowPrice: 1000,
      highPrice: 11000,
    },
    {
      id: "https://prism.agency/#pro-plan",
      name: "Pro Plan",
      description:
        "Done-for-you service: we build everything including website makeover, booking, review engine and lead generation.",
      url: "https://prism.agency/pricing",
      lowPrice: 3000,
      highPrice: 32000,
    },
  ]
  return (
    <>
      <Navbar />
      <main>
        <ServiceSchema services={services} />
        <PricingClient />
      </main>
      <Footer />
    </>
  )
}
