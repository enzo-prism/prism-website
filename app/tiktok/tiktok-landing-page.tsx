"use client"

import Link from "next/link"

import Footer from "@/components/footer"
import FreeAnalysisSection from "@/components/free-analysis-section"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

export default function TikTokLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <PageViewTracker title="TikTok Community" />
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/85 to-neutral-950" />
            <div className="pointer-events-none absolute inset-y-0 right-[-20%] hidden w-2/3 rotate-6 bg-gradient-to-br from-white/10 via-white/0 to-white/5 blur-3xl lg:block" />
            <div className="pointer-events-none absolute left-1/2 top-16 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-neutral-700/20 blur-3xl" />
          </div>
          <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 pt-24 sm:pt-28 md:pt-32">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              From TikTok to Transformation
            </h1>
            <div className="space-y-4 text-base text-neutral-200 sm:text-lg">
              <p>You’ve seen the clips. Now build what they talk about.</p>
              <p>
                At Prism, we turn the same business principles you see on TikTok into real growth for founders and business
                owners.
              </p>
              <p>
                We design websites, systems, and campaigns that attract customers, drive revenue, and make your brand stand
                out.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="inverted" className="rounded-full px-8 py-3 text-base font-semibold">
                <Link href="/pricing">👉 Work With Prism</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="rounded-full px-8 py-3 text-base transition"
              >
                <Link href="/refer">💸 Refer &amp; Earn</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Why Prism Exists</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                We believe great design and business growth go hand in hand.
              </h2>
              <p className="mt-6 text-base text-neutral-600 sm:text-lg">
                That’s why we study the best entrepreneurs every day — and use those lessons to build smarter systems for our
                clients.
              </p>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">Our focus:</p>
              <ul className="mt-6 space-y-3 text-base text-neutral-800 sm:text-lg">
                <li>• Design that drives revenue</li>
                <li>• Marketing that’s measurable</li>
                <li>• Websites that evolve with your business</li>
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
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What We Do</h2>
              <p className="mt-6 text-base text-neutral-600 sm:text-lg">
                We help founders and local businesses build the digital foundation for growth:
              </p>
              <ul className="mt-6 space-y-3 text-base text-neutral-800 sm:text-lg">
                <li>✅ High-converting websites</li>
                <li>✅ SEO + local listing optimization</li>
                <li>✅ Ad campaigns (Google, Meta, TikTok, Yelp)</li>
                <li>✅ Analytics + automation setup</li>
              </ul>
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
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Principles in Practice</h2>
              <p className="text-base text-neutral-600 sm:text-lg">We don’t just post advice — we use it.</p>
              <p className="text-base text-neutral-600 sm:text-lg">
                Every TikTok insight, from customer obsession to design thinking, is applied in the systems we build.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
                <p className="font-semibold text-neutral-900">Strategy</p>
                <p className="mt-2">
                  Tailored roadmaps focused on acquisition, retention, and lifetime value.
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
                <p className="font-semibold text-neutral-900">Design &amp; Build</p>
                <p className="mt-2">
                  Conversion-first websites and automations that show results.
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm sm:col-span-2">
                <p className="font-semibold text-neutral-900">Optimization</p>
                <p className="mt-2">Ongoing improvements with creative updates and performance reviews.</p>
              </div>
            </div>
          </div>
        </section>

        <FreeAnalysisSection />

        <section className="border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:py-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to Grow?</h2>
              <div className="space-y-6 text-base sm:text-lg">
                <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
                  <p className="text-neutral-100">
                    👤 Business Owners: Let’s design a site that turns visitors into customers.
                  </p>
                  <div className="mt-4">
                    <Button
                      asChild
                      size="lg"
                      variant="inverted"
                      className="rounded-full px-6 py-3 text-base font-semibold"
                    >
                      <Link href="/pricing">Get Started →</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
                  <p className="text-neutral-100">💸 Referrals: Earn up to $1,000 when you send a client our way.</p>
                  <div className="mt-4">
                    <Button
                      asChild
                      size="lg"
                      variant="outline-inverted"
                      className="rounded-full px-6 py-3 text-base"
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
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">What Clients Say</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Prism helps businesses turn attention into results.
              </h2>
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
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">Case Studies</p>
                <p className="mt-3 text-sm text-neutral-600">
                  Explore how businesses use Prism to turn attention into growth.
                </p>
                <div className="mt-4">
                  <Button asChild variant="link" className="h-auto px-0 text-sm font-semibold text-neutral-900">
                    <Link href="/case-studies">See the Results →</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-900/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">Resources</p>
                <p className="mt-3 text-sm text-neutral-600">
                  Get playbooks and insights you can apply right now.
                </p>
                <div className="mt-4">
                  <Button asChild variant="link" className="h-auto px-0 text-sm font-semibold text-neutral-900">
                    <Link href="/blog">Read the Blog →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
