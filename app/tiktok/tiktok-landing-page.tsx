"use client"

import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

export default function TikTokLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/85 to-neutral-950" />
            <div className="absolute inset-0">
              <div className="pointer-events-none absolute inset-y-0 right-[-20%] hidden w-2/3 rotate-6 bg-gradient-to-br from-white/10 via-white/0 to-white/5 blur-3xl lg:block" />
              <div className="pointer-events-none absolute left-1/2 top-16 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-neutral-700/20 blur-3xl" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6">
              <div className="relative hidden w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] sm:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/60 via-neutral-900/30 to-neutral-900/70" />
                <div className="relative flex aspect-[21/9] items-center justify-center text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  TikTok highlight reel placeholder
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 pt-24 sm:pt-28 md:pt-32">
            <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">
              <span>Prism</span>
              <span>From TikTok to transformation</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              From TikTok to Transformation
            </h1>
            <div className="space-y-4 text-base text-neutral-200 sm:text-lg">
              <p>You’ve seen the clips. Now build what they talk about.</p>
              <p>
                At Prism, we take the same business principles you’ve seen on our TikTok—and turn them into real results for
                founders and business owners.
              </p>
              <p>
                We design and build high-performing websites that help you attract customers, grow revenue, and stand out
                online.
              </p>
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Clips on TikTok. Clients in real life.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full bg-white px-8 py-3 text-base font-semibold text-neutral-950">
                <Link href="/get-started">→ Work With Prism</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 px-8 py-3 text-base text-white transition hover:bg-white/10"
              >
                <Link href="/refer">→ Earn for Referrals</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Why Prism Exists</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">We believe in design that drives growth.</h2>
              <p className="mt-6 text-base text-neutral-600 sm:text-lg">
                We believe business growth and great design go hand in hand. That’s why we study the best entrepreneurs every
                day—and use those same lessons to build smarter systems for our clients.
              </p>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">The goal is simple:</p>
              <ul className="mt-6 space-y-3 text-base text-neutral-800 sm:text-lg">
                <li>• Modern design that drives real revenue</li>
                <li>• Marketing that’s actually measurable</li>
                <li>• Websites that evolve as fast as business does</li>
              </ul>
            </div>
            <div>
              <Button asChild variant="link" className="h-auto px-0 text-base font-semibold text-neutral-900">
                <Link href="/websites">See What We Build →</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">What We Do</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What we do for business owners
              </h2>
              <p className="mt-6 text-base text-neutral-600 sm:text-lg">
                We help you build the digital foundation of your business:
              </p>
              <ul className="mt-6 space-y-3 text-base text-neutral-800 sm:text-lg">
                <li>✅ Custom websites that convert</li>
                <li>✅ SEO + local listing optimization</li>
                <li>✅ Ad campaigns (Google, Meta, TikTok, Yelp)</li>
                <li>✅ Analytics + automation setup</li>
              </ul>
              <p className="mt-6 text-base text-neutral-600 sm:text-lg">
                Whether you’re just starting out or scaling up, Prism is your design-growth partner.
              </p>
            </div>
            <div>
              <Button asChild size="lg" className="rounded-full bg-neutral-900 px-8 py-3 text-base text-white">
                <Link href="/get-started">Start a Project →</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Principles in Practice</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built on the principles we share</h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                Every insight we post on TikTok—from Bezos’ focus on customer obsession to Steve Jobs’ design philosophy—we
                apply inside Prism to help our clients grow.
              </p>
              <p className="text-base text-neutral-600 sm:text-lg">We don’t just share business advice. We build businesses with it.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900/80">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-neutral-900/70" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-xs font-semibold uppercase tracking-[0.35em] text-neutral-200">
                  TikTok clip placeholder
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
                  <p className="font-semibold text-neutral-900">Prism Client Work</p>
                  <p className="mt-2">
                    Screenshots of Prism-built sites—service businesses, local storefronts, and founder-led brands growing from
                    TikTok insights.
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
                  <p className="font-semibold text-neutral-900">Principles in Action</p>
                  <p className="mt-2">
                    Show how our builds reflect the customer obsession, design discipline, and velocity we talk about on TikTok.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:py-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to take the next step?</h2>
              <div className="space-y-6 text-base sm:text-lg">
                <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">If you’re a business owner</p>
                  <p className="mt-3 text-neutral-100">Let’s design a site that grows your business.</p>
                  <div className="mt-4">
                    <Button asChild size="lg" className="rounded-full bg-white px-6 py-3 text-base font-semibold text-neutral-950">
                      <Link href="/get-started">Get Started →</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">If you know a business owner</p>
                  <p className="mt-3 text-neutral-100">Earn up to $1,000 when you refer them to Prism.</p>
                  <div className="mt-4">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-white/40 px-6 py-3 text-base text-white hover:bg-white/10"
                    >
                      <Link href="/refer">Refer &amp; Earn →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Social Proof</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Trusted by local businesses and founders across the U.S.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <blockquote className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <p className="text-base font-medium text-neutral-800 sm:text-lg">
                  “Prism completely transformed our website and doubled our inquiries.”
                </p>
                <cite className="mt-4 block text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Dr. Chris Wong, Wong Dental
                </cite>
              </blockquote>
              <blockquote className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <p className="text-base font-medium text-neutral-800 sm:text-lg">“They get design and growth — a rare combo.”</p>
                <cite className="mt-4 block text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">sr4 Partners</cite>
              </blockquote>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-900/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">TikTok Highlights</p>
                <p className="mt-3 text-sm text-neutral-600">
                  Embed a carousel or looping clips from your TikTok to bridge the gap between social insights and real client wins.
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-900/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">Client Metrics</p>
                <p className="mt-3 text-sm text-neutral-600">Show before-and-after performance snapshots or testimonial reels.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
