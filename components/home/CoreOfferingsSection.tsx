"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

const offerings = [
  {
    eyebrow: "websites",
    title: "high-performing websites",
    copy: "conversion-first experiences built to earn trust, capture leads, and adapt fast.",
    points: [
      "ai-search ready seo foundations",
      "conversion copy, forms, and automations",
      "core web vitals tuned for every device",
    ],
    href: "/websites",
    trackingLabel: "websites",
  },
  {
    eyebrow: "paid ads",
    title: "local ads that scale",
    copy: "google, meta, tik tok, and yelp campaigns tuned every week to lower cost per lead.",
    points: [
      "campaign builds that mirror your offers",
      "daily budget and audience optimization",
      "landing page and funnel alignment",
    ],
    href: "/ads",
    trackingLabel: "ads",
  },
  {
    eyebrow: "local listings",
    title: "map pack domination",
    copy: "google, apple, yelp, and bing listings polished to stay accurate and rank higher.",
    points: [
      "category, service, and attribute tuning",
      "review engine and fast response workflows",
      "monthly reporting on calls, clicks, visits",
    ],
    href: "/local-listings",
    trackingLabel: "local listings",
  },
]

export default function CoreOfferingsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-[0.85]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-16 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top_right,_#7c3aed40,_transparent_65%)] blur-3xl"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center text-white/90">
          <p className="text-sm uppercase tracking-[0.32em] text-white/40">for ambitious local teams</p>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight lowercase sm:text-5xl md:text-6xl">
            websites, ads, and listings in one partner
          </h2>
          <p className="mt-6 text-base text-white/70 md:text-lg">
            we build every digital touchpoint so your small business shows up first, looks trustworthy,
            and converts more nearby customers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {offerings.map((offering) => (
            <article
              key={offering.title}
              className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/8 p-6 text-left shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-md transition-transform duration-300 ease-out hover:translate-y-[-6px] hover:shadow-[0_35px_90px_rgba(15,23,42,0.35)]"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {offering.eyebrow}
                </span>
                <h3 className="mt-4 text-2xl font-semibold lowercase text-white sm:text-3xl">
                  {offering.title}
                </h3>
                <p className="mt-4 text-sm text-white/70 md:text-base">{offering.copy}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/60">
                  {offering.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4"
                    >
                      <span className="absolute left-0 top-[0.45rem] h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium lowercase text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
                >
                  <Link
                    href={offering.href}
                    onClick={() => trackCTAClick(`view details ${offering.trackingLabel}`, "core offerings section")}
                  >
                    view details
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
