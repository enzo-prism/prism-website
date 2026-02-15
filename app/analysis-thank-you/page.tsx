import type { Metadata } from "next"

import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Analysis received | prism",
  description: "We're preparing your free analysis—book a call if you want a live walkthrough.",
  path: "/analysis-thank-you",
  index: false,
})

export default function AnalysisThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-4xl flex-col gap-10">
            <RevealOnScroll>
              <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="flex justify-center" aria-hidden="true">
                    <PixelishIcon src="/pixelish/mail.svg" alt="" size={36} invert={false} aria-hidden="true" />
                  </span>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">analysis submitted</p>
                    <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                      Your free website analysis is on the way.
                    </h1>
                    <p className="text-base text-slate-600">
                      We’re reviewing everything and will send your report within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid gap-6 sm:grid-cols-2">
              <RevealOnScroll>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">walkthrough</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">Book a 15-minute call</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Review your results live, ask questions, and decide on next steps together.
                  </p>
                  <Button
                    asChild
                    className="mt-5 w-full rounded-full border border-black bg-black px-6 py-3 text-base font-semibold text-white hover:bg-black/90"
                  >
                    <a
                      href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Book a 15-minute Prism kickoff call"
                    >
                      Book my call →
                    </a>
                  </Button>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">next</p>
                  <div className="mt-3 space-y-3 text-sm text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-900">Ready to get started?</p>
                      <Link href="/get-started" className="text-slate-900 underline-offset-4 hover:underline">
                        Start your plan →
                      </Link>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email us</p>
                      <a
                        href="mailto:support@design-prism.com"
                        className="text-slate-900 underline-offset-4 hover:underline"
                      >
                        support@design-prism.com
                      </a>
                    </div>
                    <p>Based in Silicon Valley, CA</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
