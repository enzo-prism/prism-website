import Image from "next/image"
import type { Metadata } from "next"

import GetStartedForm from "@/components/forms/GetStartedForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import RevealOnScroll from "@/components/reveal-on-scroll"

const planLabels: Record<string, string> = {
  launch: "Launch plan selected",
  grow: "Grow plan selected",
  scale: "Scale plan selected",
}

export const metadata: Metadata = {
  title: "Get started | prism",
  description:
    "Tell Prism about your business so we can craft a beautifully designed website plan in under 24 hours.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const selectedPlan = resolvedSearchParams?.plan?.toLowerCase() ?? ""
  const budgetValueMap: Record<string, string> = {
    launch: "<500",
    grow: "500-1000",
    scale: "1000+",
  }
  const selectedBudgetValue = budgetValueMap[selectedPlan] ?? ""
  const planNote = selectedPlan ? planLabels[selectedPlan] : null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <main className="flex-1" style={{ textTransform: "none" }}>
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr,0.9fr]">
            <RevealOnScroll>
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                    intake form
                  </p>
                  <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                    Let's build your new business website.
                  </h1>
                  <p className="text-lg text-slate-600">
                    Tell us about your business — we'll use your answers to craft a custom website plan within 24 hours.
                  </p>
                  {planNote ? (
                    <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      <span className="text-base" aria-hidden>
                        ✅
                      </span>
                      {planNote}
                    </p>
                  ) : null}
                </div>
                <GetStartedForm defaultBudgetValue={selectedBudgetValue} selectedPlan={selectedPlan} />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white">
                <div className="absolute inset-0 opacity-40">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)]" />
                </div>
                <div className="relative space-y-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                    your preview
                  </p>
                  <h2 className="text-3xl font-semibold leading-snug">
                    Get a storyboard of your website's design, messaging, and growth plan.
                  </h2>
                  <p className="text-base text-white/80">
                    We map your offer, design direction, SEO priorities, and launch gameplan into a private preview link
                    so you can react before anything goes live.
                  </p>
                  <ul className="space-y-3 rounded-2xl bg-white/5 p-5 text-sm text-white/90 backdrop-blur">
                    <li className="flex items-start gap-3">
                      <span className="text-lg" aria-hidden>
                        🎯
                      </span>
                      <span>Page-by-page layout, messaging, and call-to-action flow.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg" aria-hidden>
                        📈
                      </span>
                      <span>Priority keywords plus a simple roadmap to strengthen your search presence.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg" aria-hidden>
                        ⚙️
                      </span>
                      <span>Recommended forms, automations, and integrations to streamline your operations.</span>
                    </li>
                  </ul>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src="/prism-get-started.webp"
                      alt="Website plan preview"
                      width={900}
                      height={700}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
