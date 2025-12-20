import Image from "next/image"
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

const FOUNDER_LETTER_LINES = [
  "i built prism after watching owners get stuck in tools instead of running the business.",
  "you shouldn't need a full team just to get found online.",
  "we take full ownership of your website, local seo, and ads.",
  "we handle the build, tracking, and upkeep.",
  "you approve the direction and tell us what matters.",
  "we run the system and report back.",
  "if you want a status check, you can message me anytime.",
]

const HOW_IT_WORKS_STEPS = [
  {
    title: "quick intake + kickoff",
    description: "tell us your goals, offers, and timeline. we confirm the plan and start the build.",
  },
  {
    title: "build + tracking setup",
    description: "we design the site, write the copy, and set up tracking and forms.",
  },
  {
    title: "launch + keep improving",
    description: "we go live, watch results, and keep improving on grow and scale.",
  },
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
                <p className="text-sm font-semibold text-neutral-700 lowercase">
                  marketing shouldn't steal your nights.
                </p>
                <h1 className="text-balance text-3xl font-semibold tracking-tight lowercase sm:text-4xl md:text-5xl">
                  get found on google + google maps — and get more calls.
                </h1>
                <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                  your day is full. marketing gets pushed to nights + weekends.
                </p>
                <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                  you need growth, not another project to manage.
                </p>
                <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                  prism builds and runs your website, local seo, and ads — so you get your time back.
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

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex flex-col items-center gap-3 md:items-start">
                  <div className="h-20 w-20 overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm">
                    <Image
                      src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp"
                      alt="Enzo Sison headshot"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold lowercase text-neutral-500">
                    enzo sison · founder
                  </p>
                </div>
                <div className="space-y-3 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    founder letter
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight lowercase sm:text-3xl">
                    a note from the founder
                  </h2>
                  <div className="space-y-2 text-sm text-neutral-700 lowercase sm:text-base">
                    {FOUNDER_LETTER_LINES.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    <p className="text-sm font-semibold text-neutral-900 lowercase">
                      - enzo sison, founder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                how it works
              </p>
              <h2 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
                how it works
              </h2>
              <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                three simple steps. no chaos. no guessing.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 lowercase">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <HeroCtas showNote={false} location="homepage how it works" />
            </div>
          </div>
        </section>

        <ImpactGraphSection />
        <ClientsSection />
        <SegmentsRail />

        <section className="border-y border-neutral-100 bg-neutral-50 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
                ready to get your time back?
              </h2>
              <p className="text-balance text-sm text-neutral-600 lowercase sm:text-base">
                pick a plan or explore real case studies before you decide.
              </p>
              <HeroCtas showNote={false} location="homepage bottom cta" className="pt-2" />
            </div>
          </div>
        </section>

        <ReferralSection />
      </main>
      <Footer />
    </div>
  )
}
