import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import { Apple, ArrowRight, Calendar } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import RecentShootsSection from "./recent-shoots-section"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "office & team photography for dental practices | prism"
const PAGE_DESCRIPTION =
  "book a single shoot day to capture your team, lobby, and operatory moments so every digital touchpoint feels authentic."
const CANONICAL_URL = "https://www.design-prism.com/dental-photography/office-team"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/dental-photography/office-team",
  ogImage: "/prism-opengraph.png",
})

const recentShoots = [
  {
    practice: "Christopher B. Wong, DDS",
    location: "San Francisco, CA",
    date: "June 2024",
    website: "https://www.chriswongdds.com",
    summary: "Team portraits, operatory vibes, and candid patient journey moments captured in a single afternoon.",
    shots: [
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989227/Post-4_cbdv72.webp", alt: "Christopher B. Wong DDS office" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989227/Polaroids_iep3fj.webp", alt: "Christopher B. Wong DDS polaroids" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-12_uj6ocp.webp", alt: "Christopher B. Wong DDS team" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-13_vdeedx.webp", alt: "Christopher B. Wong DDS candid" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-14_fwupg6.webp", alt: "Christopher B. Wong DDS waiting room" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-6_uhnnyg.webp", alt: "Christopher B. Wong DDS provider" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-11_nohz6f.webp", alt: "Christopher B. Wong DDS operatory" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-10_uwocux.webp", alt: "Christopher B. Wong DDS macro" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-9_njmhxx.webp", alt: "Christopher B. Wong DDS candid two" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-7_d8rmrk.webp", alt: "Christopher B. Wong DDS smile" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-8_jmfidt.webp", alt: "Christopher B. Wong DDS doctor" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post_e0ayi2.webp", alt: "Christopher B. Wong DDS lifestyle" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-3_ozzl2t.webp", alt: "Christopher B. Wong DDS hallway" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-2_hdbi3u.webp", alt: "Christopher B. Wong DDS tech" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-5_dib4rp.webp", alt: "Christopher B. Wong DDS lounge" },
      { src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-1_fvwhxy.webp", alt: "Christopher B. Wong DDS team selfie" }
    ]
  }
]

const appleMapsShowcase = {
  src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762536247/Screenshot_2025-11-07_at_9.22.02_AM_ytszq1.webp",
  alt: "Christopher B. Wong DDS listing on Apple Maps featuring Prism photography"
}

export default function OfficeTeamPhotographyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-200 text-white">
          <div className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761852734/models_2_x9gxtj.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761853323/thumbnail_yscklx.webp"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-neutral-950/80" aria-hidden />
          </div>
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                office + team shoots
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                one button to book the office shoot patients actually want to see.
              </h1>
              <p className="mt-6 text-base text-neutral-200 md:text-lg">
                give us a date and we&apos;ll capture portraits, lobby vibes, and candid team moments that plug straight into your website, ads, and
                recruiting funnels.
              </p>
              <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="w-full rounded-full px-8 py-3 text-base lowercase transition hover:scale-105 sm:w-auto">
                  <Link href="/book-a-shoot">
                    book a shoot
                    <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <RecentShootsSection shoots={recentShoots} />

        <section className="border-y border-neutral-200 bg-neutral-900 px-4 py-16 text-white sm:py-20">
          <div className="container mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-neutral-950 px-6 py-12 text-center sm:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
              gear
            </span>
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">gear for patient before &amp; after photos</h3>
            <p className="text-base text-white/80 sm:text-lg">
              See the exact lighting, macro, and retractors we pack so your team can capture clinical-grade progress shots between Prism visits.
            </p>
            <Button asChild variant="inverted" size="lg" className="w-full rounded-full px-8 py-3 text-base lowercase sm:w-auto">
              <Link href="/dental-photography/before-after">
                view the guide
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600">
                <Apple className="h-4 w-4" aria-hidden />
                apple maps
              </div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">how it shows on Apple Maps</h3>
              <p className="mt-4 text-base text-neutral-600">
                every photo from the shoot feeds straight into your Apple Business Connect listing. the result: a premium, credible first impression when
                patients search on their iPhone.
              </p>
              <Button asChild variant="ghost" className="mt-6 w-full px-4 py-2 text-sm lowercase text-neutral-900 sm:w-fit">
                <Link href="/local-listings">
                  learn more about listings
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="flex-1">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                <Image
                  src={appleMapsShowcase.src}
                  alt={appleMapsShowcase.alt}
                  width={1280}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
