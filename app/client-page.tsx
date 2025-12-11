"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

import HeroReviewSliderCard from "@/components/home/HeroReviewSliderCard"
import ClientsSection from "@/components/home/Clients"
import GrowthHeadline from "@/components/home/GrowthHeadline"
import ReferralSection from "@/components/home/ReferralSection"
import SegmentsGrid from "@/components/home/SegmentsGrid"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Prism Agency" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section relative min-h-[90svh] flex items-center justify-center bg-white pt-14 md:pt-16">
          <div className="container relative mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
              <HeroReviewSliderCard className="w-full max-w-sm sm:max-w-md" />
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link href="/pricing">
                  <Button
                    className="rounded-full px-7 py-5 text-base sm:text-lg lowercase hardware-hover touch-feedback"
                    onClick={() => trackCTAClick("view pricing", "hero section")}
                  >
                    build your dream <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <GrowthHeadline />

        {/* New homepage sections per updated structure */}
        <ClientsSection />
        <SegmentsGrid />
        <ReferralSection />

      </main>
      <Footer />
    </div>
  )
}
