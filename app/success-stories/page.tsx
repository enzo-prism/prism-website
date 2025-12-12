import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    name: "Coast Periodontics",
    industry: "Dental practice · San Diego",
    before: "Visibility score 64 · Dated layout · No analytics",
    after: "Score 94 · 38% more booking requests",
    quote:
      "“Prism rebuilt everything in under a week. We finally have a site that looks as premium as our care—and we can see exactly where every lead comes from.”",
    logo: "/placeholder-logo.svg",
    screenshot: "/coast-periodontics.png",
  },
  {
    name: "Laguna Beach Dental Arts",
    industry: "Cosmetic dentistry · Orange County",
    before: "Low SEO coverage · Fragmented content",
    after: "Top 3 rankings for 12 services · +42% organic bookings",
    quote:
      "“The Grow plan paired weekly SEO sprints with beautiful storytelling. Patients mention the site on every consult call now.”",
    logo: "/placeholder-logo.png",
    screenshot: "/laguna-beach-dental-arts.png",
  },
  {
    name: "Olympic Bootworks",
    industry: "Retail & e-commerce · Tahoe",
    before: "Manual ads · No automations · Slow checkout",
    after: "Scale plan + automation = 2.4x ROAS in 60 days",
    quote:
      "“Scale plugged ads, analytics, and nurture flows together. We know exactly which campaigns fuel in-store and online sales.”",
    logo: "/prism-logo-new.svg",
    screenshot: "/olympic-bootworks.png",
  },
]

export const metadata: Metadata = {
  title: "Success stories | prism",
  description: "See how Prism launches AI-powered websites that drive real growth for local brands.",
  alternates: {
    canonical: "https://www.design-prism.com/success-stories",
  },
}

export default function SuccessStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white" style={{ textTransform: "none" }}>
      <Navbar />
      <main className="flex-1">
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <RevealOnScroll>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">proof</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Real businesses. Real results.</h1>
              <p className="mt-5 text-lg text-white/80">
                Every launch is tied to revenue or patient goals. Here are a few of our favorite AI-powered wins.
              </p>
            </RevealOnScroll>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-10">
            {caseStudies.map((study, index) => (
              <RevealOnScroll key={study.name} delay={index * 0.05}>
                <article className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <Image src={study.logo} alt={`${study.name} logo`} width={48} height={48} className="h-10 w-10 object-contain" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-slate-900">{study.name}</h2>
                        <p className="text-sm text-slate-500">{study.industry}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">before</p>
                      <p className="mt-2 text-base text-slate-700">{study.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">after</p>
                      <p className="mt-2 text-base text-slate-900">{study.after}</p>
                    </div>
                  </div>
                  <blockquote className="text-lg text-slate-700">“{study.quote.replace(/“|”/g, "")}”</blockquote>
                  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={study.screenshot}
                      alt={`${study.name} screenshot`}
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.2} className="mt-12 flex flex-col items-center gap-4 text-center">
            <Button asChild className="rounded-2xl bg-slate-900 px-8 py-6 text-base font-semibold text-white">
              <Link href="/get-started">I want results like these → Get Started</Link>
            </Button>
          </RevealOnScroll>
        </section>
      </main>
      <Footer />
    </div>
  )
}
