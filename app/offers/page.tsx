import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top"; // Assuming you have this component
import type { Metadata } from "next";
import OffersClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Special Offers for Prism Clients",
  description:
    "Browse the latest limited-time offers from Prism for websites, apps, and design support, all crafted to launch momentum quickly.",
  openGraph: {
    title: "Special Offers for Prism Clients",
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
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">how our offers work</h2>
            <p>
              time-boxed, high–leverage engagements to ship real outcomes fast. each offer includes
              strategy, execution, and clear deliverables.
            </p>
          </div>
        </div>
      </section>
      <Navbar />
      <main>
        <OffersClientPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
