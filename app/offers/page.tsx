import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"; // Assuming you have this component
import type { Metadata } from "next"
import OffersClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Current Offers",
  description:
    "Check out the latest offers and promotions from Prism. Don't miss out on great deals for websites, apps, and designs.",
  openGraph: {
    title: "Limited-Time Offers | Prism",
    description: "Exclusive offers on our web design, app development, and design services.",
    url: "https://www.design-prism.com/offers",
  },
  alternates: {
    canonical: "https://www.design-prism.com/offers",
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
