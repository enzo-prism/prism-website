"use client"

import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    title: "Translate momentum into momentum",
    description:
      "We audit your clips and comments, identify the sparks that resonate, and turn them into on-brand web journeys that capture intent."
  },
  {
    title: "Design for clarity over noise",
    description:
      "From landing pages to lead capture, every surface is stripped to the essentials so visitors can act fast on the idea that brought them here."
  },
  {
    title: "Measure what matters",
    description:
      "Dashboards focus on a handful of signals: the stories people repeat, the offers they choose, and the channels that keep CAC in check."
  }
]

const rhythm = [
  {
    label: "Week 1",
    description: "Align on the TikTok stories to activate and capture the metrics that define success."
  },
  {
    label: "Weeks 2-3",
    description: "Ship focused pages, flows, and follow-up that mirror the promise viewers heard in your clips."
  },
  {
    label: "Week 4+",
    description: "Tighten the loop with experiments, reporting, and refreshed narratives as new clips ship."
  }
]

const proofPoints = [
  {
    quote:
      "Prism helped us preserve the personality of our TikTok presence while making it effortless for viewers to become leads.",
    author: "Sasha R., Founder"
  },
  {
    quote:
      "They focus on momentum instead of vanity. Every iteration connected directly to the metrics our team cares about.",
    author: "Marco D., Growth Lead"
  }
]

export default function TikTokLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-4 py-24 sm:py-28 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">Prism for TikTok</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Minimal systems for ideas that already resonate.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg">
              You know which TikTok moments spark action. Prism builds the infrastructure that meets that attention with focus:
              clean pages, intentional flows, and signals that show what to double down on next.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                <Link href="/get-started">Work With Prism</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-neutral-300 px-8 py-3 text-base text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/refer">Refer &amp; Earn</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What focus feels like</h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Our approach keeps the experience light, fast, and obvious. Every interaction supports the story already told in
                your feed.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex flex-col gap-3 rounded-3xl border border-neutral-200 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-neutral-900">{pillar.title}</h3>
                  <p className="text-sm text-neutral-600 sm:text-base">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">A calm rhythm for compounding results</h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Simple cadences make it easier to sustain the energy that TikTok creates. We focus on a few decisive moves each
                week.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {rhythm.map((item) => (
                <div key={item.label} className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">{item.label}</p>
                  <p className="text-sm text-neutral-600 sm:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Proof in the details</h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Teams choose Prism when they want a measured partner. These are the themes we hear most often.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <blockquote
                  key={point.quote}
                  className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-neutral-200 p-6 sm:p-8"
                >
                  <p className="text-base font-medium text-neutral-800 sm:text-lg">“{point.quote}”</p>
                  <cite className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">{point.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
            <div className="flex flex-col gap-6 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready when the next clip hits</h2>
              <p className="mx-auto max-w-2xl text-sm text-neutral-300 sm:text-base">
                Let’s pair your TikTok presence with a minimalist acquisition engine that feels as clean as it performs.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="rounded-full bg-white px-8 py-3 text-base font-semibold text-neutral-950">
                  <Link href="/get-started">Start the project</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 px-8 py-3 text-base text-white hover:bg-white/10"
                >
                  <Link href="/refer">Share Prism with a friend</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
