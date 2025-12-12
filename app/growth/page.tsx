import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    name: "SEO & Content",
    price: "$900/mo",
    description: "Monthly search intelligence, publishing, and optimization.",
    bullets: [
      "Editorial calendar & AI-assisted outlines",
      "On-page optimization + schema updates",
      "Local ranking guardrails & reporting",
    ],
  },
  {
    name: "Ad Campaign Management",
    price: "20% of ad spend",
    description: "Performance creative + landing pages for Google, Meta, and TikTok.",
    bullets: [
      "Full-funnel creative & copy",
      "Landing pages tied to each ad set",
      "Weekly dashboards + recommendations",
    ],
  },
  {
    name: "Automation Setup",
    price: "from $1,000",
    description: "Route leads, trigger nurture sequences, and score intent signals.",
    bullets: [
      "CRM + routing integrations",
      "Auto-responses & nurture journeys",
      "Attribution + pipeline visibility",
    ],
  },
]

export const metadata: Metadata = {
  title: "Growth retainers | prism",
  description: "Turn your Prism-built site into a full growth engine with SEO, ads, and automation retainers.",
  alternates: {
    canonical: "https://www.design-prism.com/growth",
  },
}

export default function GrowthPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1" style={{ textTransform: "none" }}>
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <RevealOnScroll>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">growth</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Now that your site is live — let&apos;s make it visible.
              </h1>
              <p className="mt-5 text-lg text-white/80">
                We help small businesses turn websites into growth engines through SEO, ads, and automation.
              </p>
            </RevealOnScroll>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <RevealOnScroll key={service.name} delay={index * 0.05}>
                <div className="flex h-full flex-col rounded-3xl border border-slate-200 p-6 shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{service.name}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{service.price}</p>
                  <p className="mt-2 text-base text-slate-600">{service.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span aria-hidden>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.15} className="mt-12 flex flex-col items-center gap-4 text-center">
            <Button asChild className="rounded-2xl bg-slate-900 px-8 py-6 text-base font-semibold">
              <Link href="/get-started?plan=grow">Book a Growth Review →</Link>
            </Button>
            <p className="text-sm text-slate-500">
              We'll review your current data, set quarterly priorities, and begin within 7 days.
            </p>
          </RevealOnScroll>
        </section>
      </main>
      <Footer />
    </div>
  )
}
