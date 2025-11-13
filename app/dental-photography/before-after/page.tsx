import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

import GuideTabs from "./GuideTabs"

export const metadata: Metadata = {
  title: "dental before + after system: in-practice guide | prism",
  description:
    "follow prism's 0->100% workflow to capture dental before-and-after photos in-house - entry, mid, and premium kit breakdowns with scripts, storage, and rollout tips.",
  alternates: {
    canonical: "https://www.design-prism.com/dental-photography/before-after"
  },
  openGraph: {
    title: "dental before + after system: in-practice guide | prism",
    description: "choose entry, mid, or premium setups to build a repeatable capture station that fuels marketing and elevates the patient reveal.",
    url: "https://www.design-prism.com/dental-photography/before-after",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "dental before + after system: in-practice guide | prism",
    description: "gear lists, workflows, and file ops so any practice can document every transformation."
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function BeforeAfterPhotographyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-28">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                in-practice playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                build a before + after system your team can run every day.
              </h1>
              <p className="mt-6 max-w-3xl text-base text-neutral-200 md:text-lg">
                follow this 0 to 100% guide to set up gear, space, scripts, and file workflows so your practice captures pro-grade before-and-afters that wow patients and fuel every marketing touchpoint.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="w-full rounded-full px-8 py-3 text-base lowercase sm:w-auto">
                  <Link href="#guide-tabs">
                    jump to the protocol
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline-inverted" size="lg" className="w-full rounded-full px-8 py-3 text-base lowercase sm:w-auto">
                  <Link href="/dental-photography">
                    see all services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <GuideTabs />

        <PageViewTracker title="Prism - Before & After Photography" />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
