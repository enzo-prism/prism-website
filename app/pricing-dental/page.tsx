import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PricingDentalClient from "./client-page"
import { ServiceSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "dental pricing",
  description:
    "transparent pricing plans designed specifically for dental practices. choose between starter and pro plans to grow your practice and attract more patients.",
}

export default function PricingDentalPage() {
  const services = [
    {
      id: "https://prism.agency/#starter-dental-plan",
      name: "Starter Dental Plan",
      description:
        "Playbooks to create a standout dental website, streamline scheduling and boost leads from search, ads and AI.",
      url: "https://prism.agency/pricing-dental",
      lowPrice: 1000,
      highPrice: 11000,
    },
    {
      id: "https://prism.agency/#pro-dental-plan",
      name: "Pro Dental Plan",
      description:
        "Full-service marketing for dental practices with website build, scheduling, review engine and lead generation.",
      url: "https://prism.agency/pricing-dental",
      lowPrice: 3000,
      highPrice: 32000,
    },
  ]
  return (
    <>
      <Navbar />
      <main>
        <ServiceSchema services={services} />
        <PricingDentalClient />
      </main>
      <Footer />
    </>
  )
}
