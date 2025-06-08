import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OffersClientPage from "./client-page"
import ScrollToTop from "@/components/scroll-to-top" // Assuming you have this component

export const metadata: Metadata = {
  title: "Current Offers",
  description:
    "Check out the latest offers and promotions from Prism. Don't miss out on great deals for websites, apps, and designs.",
  openGraph: {
    title: "Current Offers | Prism",
    description: "Explore special offers on our digital services.",
    url: "https://prism.agency/offers", // Replace with your actual domain
  },
}

export default function OffersPage() {
  return (
    <>
      <Navbar />
      <main>
        <OffersClientPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
