"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

import Footer from "@/components/footer"
import FreeAnalysisSection from "@/components/free-analysis-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const missionPoints = [
  "Make growth simple and accessible",
  "Fuse design with strategy",
  "Help business owners win online",
]

const services = [
  "Custom websites that convert",
  "SEO + local listing optimization",
  "Paid ad campaigns (Google, Meta, TikTok, Yelp)",
  "Analytics + automation",
]

export default function InstagramLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_120deg,_rgba(255,255,255,0.12),_rgba(13,13,13,0.8))] opacity-40" />
          <div className="mx-auto max-w-4xl px-6 py-24 sm:py-28 md:py-32">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              From Inspiration to Action
            </h1>
            <div className="mt-6 space-y-4 text-base text-neutral-200 sm:text-lg">
              <p>You’ve seen the posts — now build what they inspire.</p>
              <p>
                At Prism, we take the insights we share on Instagram and turn them into real growth for business owners.
              </p>
              <p>
                We design high-performing websites, ads, and systems that help brands attract customers and scale.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="inverted" className="rounded-full px-8 py-3 text-base font-semibold">
                <Link href="/pricing">Work With Prism</Link>
              </Button>
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
        </section>

        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why We Share</h2>
                <p className="text-base text-neutral-600 sm:text-lg">Our Instagram isn’t just content — it’s how we think.</p>
                <p className="text-base text-neutral-600 sm:text-lg">
                  Every quote and clip reflects the principles we use to help our clients grow.
                </p>
              </div>
              <div className="space-y-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">Our mission:</p>
                <ul className="space-y-3 text-base text-neutral-700">
                  {missionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900/10 text-neutral-900">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="link"
                  className="px-0 text-base font-semibold text-neutral-900 hover:text-neutral-700"
                >
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
                We help entrepreneurs build and scale their digital presence:
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

        <FreeAnalysisSection />

        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-900 px-6 py-16 text-white sm:px-10">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Next Steps</h2>
                <p className="text-base text-neutral-200">
                  👉 If you’re a business owner:
                  <br />
                  Let’s design a website that helps you grow.
                </p>
                <Button asChild size="lg" variant="inverted" className="rounded-full px-8 py-3 text-base font-semibold">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <p className="text-base text-neutral-200">
                  💸 If you know one:
                  <br />
                  Earn up to $1,000 when you refer them to Prism.
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
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Follow Along</h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                We share insights from the world’s best founders and creators — and build those ideas into real results.
              </p>
              <Button
                asChild
                variant="link"
                className="px-0 text-base font-semibold text-neutral-900 hover:text-neutral-700"
              >
                <Link href="https://www.instagram.com/the_design_prism" target="_blank" rel="noreferrer">
                  Follow on Instagram → @the_design_prism
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
