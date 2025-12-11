"use client"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { PersonSchema } from "@/components/schema-markup"
import ScrollingTimeline from "@/components/scrolling-timeline"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import PoleVaultCarousel from "@/components/pole-vault-carousel"
import Image from "next/image"
import Link from "next/link"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export default function AboutClientPage() {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="About Prism" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🌉</div>
                <h1 className="text-4xl font-bold tracking-tighter lowercase sm:text-5xl md:text-6xl">our story</h1>
                <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase md:text-xl">
                  enzo sison built prism to pursue his passions for tech, business, and athletics at the highest level — and to connect with others chasing excellence in their own fields.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LA 2028 Olympic Journey (moved below the single video section) */}
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-8 md:mb-10">
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

        <section className="px-4 pb-12 md:pb-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="overflow-hidden rounded-3xl border border-neutral-100 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765247213/Gemini_Generated_Image_7xl9or7xl9or7xl9_zxuiin.webp"
                alt="Gemini-generated artwork for Prism"
                width={1792}
                height={2400}
                className="h-auto w-full object-cover"
                sizes="(min-width: 768px) 896px, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-16 md:py-24">
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
