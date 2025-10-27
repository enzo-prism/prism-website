"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

import Footer from "@/components/footer"
import FreeAnalysisSection from "@/components/free-analysis-section"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Play } from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const YOUTUBE_URL = "https://www.youtube.com/@the_design_prism"

const playbooks = [
  "Websites that turn clicks into customers",
  "SEO + local listings that rank higher",
  "Paid ads that scale profitably",
  "AI automations that save time and increase output",
]

const services = [
  "Custom websites built to convert",
  "Local SEO + listings that drive calls",
  "Paid ads across Google, Meta, TikTok, and Yelp",
  "Analytics and automation setup",
]

const testimonials = [
  {
    quote:
      "Prism helped us apply the same systems they teach on YouTube — and the growth was immediate.",
    author: "sr4 Partners",
  },
  {
    quote: "Our website isn’t just pretty — it performs. Prism made it a real sales engine.",
    author: "Dr. Chris Wong, Wong Dental",
  },
]

export default function YouTubeLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <PageViewTracker title="YouTube Community" />
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_120deg,_rgba(255,255,255,0.12),_rgba(13,13,13,0.8))] opacity-40" />
          <div className="mx-auto max-w-4xl px-6 py-24 sm:py-28 md:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">impossible is temporary</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              From YouTube Tactics to Real Growth
            </h1>
            <div className="mt-6 space-y-4 text-base text-neutral-200 sm:text-lg">
              <p>You’ve seen the videos — now apply the playbooks.</p>
              <p>On YouTube, Prism shares the same strategies we use to help real businesses grow.</p>
              <p>From better websites to smarter ads and AI systems — every video is built to help you grow faster.</p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="inverted" className="rounded-full px-8 py-3 text-base font-semibold">
                <Link href="/pricing">👉 Work With Prism</Link>
              </Button>
              <Button asChild size="lg" variant="outline-inverted" className="rounded-full px-8 py-3 text-base">
                <Link href="/refer">💸 Refer &amp; Earn</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why We Share</h2>
                <p className="text-base text-neutral-600 sm:text-lg">
                  Our videos aren’t theory — they’re the exact systems we build for clients.
                </p>
                <p className="text-base text-neutral-600 sm:text-lg">
                  We show what works, why it works, and how you can use it.
                </p>
              </div>
              <div className="space-y-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">The playbooks</p>
                <ul className="space-y-3 text-base text-neutral-700">
                  {playbooks.map((playbook) => (
                    <li key={playbook} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900/10 text-neutral-900">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>{playbook}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="link" className="px-0 text-base font-semibold text-neutral-900 hover:text-neutral-700">
                  <Link href="/websites">See What We Build →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What We Do</h2>
              <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
                We help founders and small teams apply what they learn from YouTube — directly to their business.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-700"
                  >
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-4 w-fit rounded-full px-8 py-3 text-base">
                <Link href="/get-started">
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Where Design Meets Growth</h2>
                <p className="text-base text-neutral-600 sm:text-lg">
                  Every tutorial and teardown combines clean design with smart strategy.
                </p>
                <p className="text-base text-neutral-600 sm:text-lg">Because growth looks better when it’s built right.</p>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
                <div className="relative grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                  <div className="flex flex-col gap-3 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Deep Dives</p>
                    <p className="text-base font-medium text-white sm:text-lg">
                      Tutorials, teardowns, and walkthroughs that pair bold design with precise strategy.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Real Systems</p>
                    <p className="text-base font-medium text-white sm:text-lg">
                      Websites, automations, and campaigns built exactly like what we show on YouTube.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/5 px-6 py-4">
                  <Link
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
                  >
                    <Play className="h-4 w-4" />
                    Subscribe on YouTube →
                  </Link>
                  <Button asChild size="sm" variant="outline-inverted" className="rounded-full border-white/40 px-4">
                    <Link href={YOUTUBE_URL} target="_blank" rel="noreferrer">
                      Subscribe →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FreeAnalysisSection />

        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-900 px-6 py-16 text-white sm:px-10">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Partner with Prism</h2>
                <p className="text-base text-neutral-200">
                  👤 Business Owners: Let’s design a system that turns your traffic into customers.
                </p>
                <Button asChild size="lg" variant="inverted" className="rounded-full px-8 py-3 text-base font-semibold">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <p className="text-base text-neutral-200">
                  💸 Referrals: Earn up to $1,000 when you send a client our way.
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="rounded-full px-8 py-3 text-base"
                >
                  <Link href="/refer">Refer &amp; Earn</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What Clients Say</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <blockquote
                    key={testimonial.author}
                    className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8"
                  >
                    <p className="text-base font-medium text-neutral-800 sm:text-lg">“{testimonial.quote}”</p>
                    <cite className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
                      {testimonial.author}
                    </cite>
                  </blockquote>
                ))}
              </div>
              <Button
                asChild
                variant="link"
                className="px-0 text-base font-semibold text-neutral-900 hover:text-neutral-700"
              >
                <Link href="https://www.youtube.com/@the_design_prism" target="_blank" rel="noreferrer">
                  Follow along for tactical growth videos → @the_design_prism
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
