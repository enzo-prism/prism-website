"use client"

import HeroReviewSliderCard from "@/components/home/HeroReviewSliderCard"
import ClientsSection from "@/components/home/Clients"
import GrowthHeadline from "@/components/home/GrowthHeadline"
import ReferralSection from "@/components/home/ReferralSection"
import SegmentsRail from "@/components/home/SegmentsRail"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section relative min-h-[90svh] flex items-center justify-center bg-white pt-14 md:pt-16">
          <div className="container relative mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
              <HeroReviewSliderCard className="w-full max-w-sm sm:max-w-md" />
            </div>
          </div>
        </section>

        <GrowthHeadline />

        {/* New homepage sections per updated structure */}
        <ClientsSection />
        <SegmentsRail />
        <ReferralSection />

      </main>
      <Footer />
    </div>
  )
}
