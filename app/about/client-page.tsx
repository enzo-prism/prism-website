"use client"

import Footer from "@/components/footer"
import { PersonSchema } from "@/components/schema-markup"
import ScrollingTimeline from "@/components/scrolling-timeline"
import dynamic from "next/dynamic"
import PoleVaultCarousel from "@/components/pole-vault-carousel"
import Image from "next/image"
import Link from "next/link"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function AboutClientPage() {
  const scrollToTimeline = () => {
    const target = document.getElementById("timeline")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative inline-flex items-center justify-center group hardware-hover touch-feedback">
                <span className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 opacity-0 blur-md transition duration-300 group-hover:opacity-70" />
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-neutral-200 shadow-sm transition">
                  <Image
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp"
                    alt="Enzo Sison headshot"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <p className="text-sm font-medium lowercase text-neutral-500">
                enzo sison · founder, prism
              </p>
              <p className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-700">
                founded in 2023
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">our story</h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  enzo sison built prism to pursue his passions for tech, business, and athletics at the highest level — and to connect with others chasing excellence in their own fields.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <button
                    type="button"
                    onClick={scrollToTimeline}
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 lowercase"
                  >
                    view timeline <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden />
                  </button>
                  <Link
                    href="https://enzosison.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50 lowercase"
                  >
                    enzosison.com <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LA 2028 Olympic Journey (moved below the single video section) */}
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-8 md:mb-10 space-y-3">
              <div className="flex justify-center" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 60"
                  className="h-10 w-20"
                  role="presentation"
                >
                  <circle cx="20" cy="30" r="12" stroke="#0072CE" strokeWidth="4" fill="none" />
                  <circle cx="50" cy="30" r="12" stroke="#000000" strokeWidth="4" fill="none" />
                  <circle cx="80" cy="30" r="12" stroke="#FECB00" strokeWidth="4" fill="none" />
                  <circle cx="35" cy="42" r="12" stroke="#00A651" strokeWidth="4" fill="none" />
                  <circle cx="65" cy="42" r="12" stroke="#E4262C" strokeWidth="4" fill="none" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter normal-case">LA 2028 olympic journey</h2>
              <p className="mx-auto mt-3 max-w-[720px] text-neutral-600 lowercase md:text-lg">
                enzo is pursuing competing in the la 2028 olympics for the philippines in pole vaulting—a journey that
                started in high school, continued through ncaa d1 at cal poly, and now continues on the international stage.
              </p>
            </div>

            {/* Minimal carousel of training/competition clips */}
            <div className="flex justify-center">
              <PoleVaultCarousel />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="px-4 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our journey</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
                scroll down to explore the key milestones in our story
              </p>
            </div>

            <ScrollingTimeline />

            {/* Add a "View more" button */}
            <div className="mt-12 text-center">
              <a
                href="https://www.instagram.com/the_design_prism/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase transition-colors"
                onClick={() => null}
              >
                follow our journey on instagram <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      {/* Person Schema for Enzo */}
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder & CEO"
        description="Founder of Prism Agency, helping businesses create digital experiences that drive real results"
        image="https://design-prism.com/enzo-avatar.png"
        url="https://design-prism.com/about"
        sameAs={[
          "https://x.com/NosisTheGod",
          "https://www.linkedin.com/in/enzo-sison",
          "https://www.instagram.com/the_design_prism/"
        ]}
      />
    </div>
  )
}
