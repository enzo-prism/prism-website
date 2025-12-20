import { MapPin, Megaphone, Smartphone } from "lucide-react"

import HeroReviewSliderCard from "@/components/home/HeroReviewSliderCard"
import ClientsSection from "@/components/home/Clients"
import HeroCtas from "@/components/home/HeroCtas"
import ImpactGraphSection from "@/components/home/ImpactGraphSection"
import ReferralSection from "@/components/home/ReferralSection"
import SegmentsRail from "@/components/home/SegmentsRail"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

const SERVICE_STRIP = [
  { icon: Smartphone, label: "websites" },
  { icon: MapPin, label: "google + maps" },
  { icon: Megaphone, label: "ads" },
]

export default function ClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section relative min-h-[90svh] flex items-center justify-center bg-white pt-14 md:pt-16">
          <div className="container relative mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
              <HeroReviewSliderCard className="w-full max-w-3xl" />

              <div className="flex flex-wrap justify-center gap-2">
                {SERVICE_STRIP.map((service) => {
                  const Icon = service.icon
                  return (
                    <span
                      key={service.label}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700"
                    >
                      <Icon className="h-4 w-4 text-neutral-500" aria-hidden />
                      <span>{service.label}</span>
                    </span>
                  )
                })}
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="text-balance text-3xl font-semibold tracking-tight lowercase sm:text-4xl md:text-5xl">
                  get found on google + google maps — without becoming a part-time marketer.
                </h1>
                <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                  prism builds and runs your website, local seo, and ads — so customers find you and
                  you get your time + energy back.
                </p>
                <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                  white-glove, custom to your business. one trusted partner. message us anytime for a
                  status check.
                </p>
              </div>

              <HeroCtas />
            </div>
          </div>
        </section>

        {/* New homepage sections per updated structure */}
        <ImpactGraphSection />
        <ClientsSection />
        <SegmentsRail />
        <ReferralSection />
      </main>
      <Footer />
    </div>
  )
}
