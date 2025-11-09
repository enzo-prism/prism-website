import type { Metadata } from "next"

import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Thank you | prism",
  description: "We received your AI site brief—book a kickoff call to see your plan faster.",
  alternates: {
    canonical: "https://www.design-prism.com/thank-you",
  },
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Thank You" />
      <Navbar />
      <main className="flex-1" style={{ textTransform: "none" }}>
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-4xl flex-col gap-10">
            <RevealOnScroll>
              <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-4xl" aria-hidden>
                    ✅
                  </span>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Received</p>
                    <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                      Your AI site plan is now in progress.
                    </h1>
                    <p className="text-base text-slate-600">
                      We’re reviewing your answers and preparing a preview in under 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="rounded-3xl border border-black bg-black p-6 text-white shadow-sm sm:flex sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">next step</p>
                  <p className="text-lg font-semibold">Book a 15-minute kickoff call</p>
                  <p className="text-sm text-white/70">
                    Align goals, confirm deliverables, and pick your launch start date.
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-4 w-full rounded-full border border-white bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-white/90 sm:mt-0 sm:w-auto"
                >
                  <a
                    href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a 15-minute Prism kickoff call"
                  >
                    Book now →
                  </a>
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Email</p>
                  <a
                    href="mailto:support@design-prism.com"
                    className="text-base font-semibold text-slate-900 underline-offset-4 hover:underline"
                  >
                    support@design-prism.com
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Location</p>
                  <p className="text-base text-slate-900">Based in Silicon Valley, CA</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.25}>
              <Link
                href="/"
                className="text-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
              >
                ← Back to Home
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
