import type { Metadata } from "next"

import FreeAnalysisForm from "@/components/forms/FreeAnalysisForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import RevealOnScroll from "@/components/reveal-on-scroll"

export const metadata: Metadata = {
  title: "Free analysis | prism",
  description: "Request a free review of your current website, Google listing, and visibility metrics.",
  alternates: {
    canonical: "https://www.design-prism.com/free-analysis",
  },
}

export default function FreeAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <PageViewTracker title="Free Analysis" />
      <Navbar />
      <main className="flex-1" style={{ textTransform: "none" }}>
        <section className="border-b border-black/10 bg-white px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <RevealOnScroll>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/60">free analysis</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Get a free analysis of your current website and visibility.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-lg text-black/70">
                We'll review your site, Google listing, and performance — then show you how AI-powered design could double
                your traffic.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr,1.05fr]">
            <RevealOnScroll>
              <div className="space-y-6 rounded-3xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">you'll receive</p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    A concise plan with data-backed recommendations.
                  </h2>
                </div>
                <ul className="space-y-4 text-sm text-black/70">
                  <li className="flex items-start gap-3">
                    <span aria-hidden>🔍</span>
                    <span>Technical and SEO health score with prioritized fixes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden>📊</span>
                    <span>Visibility snapshot across Google, Maps, and social channels.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden>✨</span>
                    <span>Design and messaging improvements tailored to your offers.</span>
                  </li>
                </ul>
                <div className="rounded-2xl border border-dashed border-black/15 bg-white p-5 text-sm text-black/70">
                  <p>Need it sooner? Mention your timeline in the notes—we'll prioritize urgent requests.</p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <FreeAnalysisForm />
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
