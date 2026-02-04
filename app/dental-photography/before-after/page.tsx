import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"

import GuideTabs from "./GuideTabs"

const PAGE_TITLE = "dental before + after system: in-practice guide | prism"
const PAGE_DESCRIPTION =
  "follow prism's 0→100% workflow to capture dental before-and-after photos in-house, with gear tiers, scripts, storage, and rollout tips."
const CANONICAL_URL = "https://www.design-prism.com/dental-photography/before-after"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    type: "website",
    images: ["/prism-opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
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

        <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-600">
              team coverage
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">let prism capture the office, team, and candid moments</h2>
            <p className="text-base text-neutral-600 sm:text-lg">
              When you need more than before-and-afters, our on-location crew photographs the lobby, ops, and staff so every touchpoint feels cohesive.
            </p>
            <Button asChild size="lg" className="w-full rounded-full px-8 py-3 text-base lowercase sm:w-auto">
              <Link href="/dental-photography/office-team">
                explore office &amp; team shoots
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
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
