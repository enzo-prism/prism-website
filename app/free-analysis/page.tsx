import type { Metadata } from "next"
import Link from "next/link"

import FreeAnalysisForm from "@/components/forms/FreeAnalysisForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

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
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-black/10 bg-white px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/60">free analysis</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Get a free analysis of your current website and visibility.
            </h1>
            <p className="text-lg text-black/70">
              We will review your site, Google listing, and performance — then show you how AI-powered design could double
              your traffic. No cost, no commitment.
            </p>
            <p className="text-sm text-black/60">
              Need a deeper crawl and prioritized fixes? See our{" "}
              <Link href="/seo/audit" className="font-semibold text-black underline underline-offset-4">
                seo audit service
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr,1.05fr]">
            <div className="space-y-6 rounded-3xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">what you will receive</p>
                <h2 className="mt-3 text-2xl font-semibold">
                  A concise plan with data-backed recommendations.
                </h2>
              </div>
              <p className="text-sm text-black/70">
                Our team analyzes your online presence and delivers actionable insights within 48 hours.
                Here is what your free analysis includes:
              </p>
              <ul className="space-y-4 text-sm text-black/70">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Technical and SEO health score with prioritized fixes to improve your search rankings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Visibility snapshot across Google Search, Google Maps, and social channels.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Design and messaging improvements tailored to your specific offers and target audience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Competitor comparison showing how you stack up against similar businesses in your area.</span>
                </li>
              </ul>
              <div className="rounded-2xl border border-dashed border-black/15 bg-white p-5 text-sm text-black/70">
                <p><strong>Need it sooner?</strong> Mention your timeline in the notes — we prioritize urgent requests and can often deliver within 24 hours.</p>
              </div>
            </div>
            <FreeAnalysisForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
