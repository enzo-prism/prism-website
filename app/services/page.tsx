import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServicesClient from "./client-page"

export const metadata: Metadata = {
  title: "Services - Prism",
  description: "Tailored design and growth solutions for small businesses. Choose from our flexible tiers and add-ons.",
  openGraph: {
    title: "Services - Prism",
    description: "Tailored design and growth solutions for small businesses. Choose from our flexible tiers and add-ons.",
    url: "https://www.design-prism.com/services",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Services",
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesClient />
      </main>
      <Footer />
    </>
  )
} 