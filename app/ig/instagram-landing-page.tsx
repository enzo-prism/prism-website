"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const missionPoints = [
  "Make growth simple and accessible",
  "Fuse strategy with beautiful design",
  "Help business owners win online, every day",
]

const services = [
  "Custom websites that convert",
  "SEO + local listing optimization",
  "Paid ad campaigns (Google, Meta, TikTok, Yelp)",
  "Analytics + automation setup",
]

const testimonials = [
  {
    quote:
      "Our new site from Prism changed everything — we now look as good online as we do in person.",
    author: "Dr. Chris Wong, Wong Dental",
  },
  {
    quote: "They blend creative design with real business strategy.",
    author: "sr4 Partners",
  },
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300">Prism on Instagram</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              From Instagram Inspiration to Real Growth
            </h1>
            <div className="mt-6 space-y-4 text-base text-neutral-200 sm:text-lg">
              <p>You’ve seen the posts. Now build what they inspire.</p>
              <p>
                At Prism, we take the same insights we share on Instagram — from founders, designers, and business leaders —
                and turn them into real growth for entrepreneurs and brands.
              </p>
              <p>
                We design high-performing websites and systems that help business owners attract customers, grow faster, and
                stand out online.
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
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why We Share What We Share</h2>
                <p className="text-base text-neutral-600 sm:text-lg">
                  Prism’s Instagram isn’t just content — it’s a reflection of how we think.
                </p>
                <p className="text-base text-neutral-600 sm:text-lg">
                  We share insights from the world’s best entrepreneurs and apply them directly to our clients’ businesses.
                </p>
              </div>
              <div className="space-y-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">The mission is simple</p>
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
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What We Do for Business Owners</h2>
              <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
                We help business owners build and scale their digital presence:
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
              <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
                You’ve seen the principles in action — now see what happens when we apply them to your business.
              </p>
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
                  Every post we share — whether it’s a quote, insight, or story — reflects a principle we use every day at
                  Prism.
                </p>
                <p className="text-base text-neutral-600 sm:text-lg">
                  We don’t just post ideas about growth and design. We build it into every website, campaign, and system we
                  create for our clients.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
                <div className="relative grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                  <div className="flex flex-col gap-3 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Instagram Reels</p>
                    <p className="text-base font-medium text-white sm:text-lg">
                      Clip breakdowns, carousel scripts, and frameworks that spark the first click.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Prism Client Work</p>
                    <p className="text-base font-medium text-white sm:text-lg">
                      Launch-ready sites, campaigns, and systems built on those very principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-900 px-6 py-16 text-white sm:px-10">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Take the Next Step</h2>
                <p className="text-base text-neutral-200">
                  👉 If you’re a business owner:
                  <br />
                  Let’s design a website that helps your business grow.
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
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Businesses Growing With Prism</h2>
              <p className="text-base text-neutral-600 sm:text-lg">
                Trusted by growing businesses, entrepreneurs, and creators.
              </p>
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
                <Link href="https://www.instagram.com/the_design_prism" target="_blank" rel="noreferrer">
                  Follow along on Instagram → @the_design_prism
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
