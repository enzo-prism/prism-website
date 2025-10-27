"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

const benefits = [
  "A 10-minute Loom recording",
  "Actionable recommendations",
  "A clear path to more traffic and sales",
]

export default function FreeAnalysisSection() {
  return (
    <section className="relative border-b border-neutral-200 bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_rgba(12,12,12,0.95))] opacity-60" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Free Website Analysis
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            See what Prism would build for you — before you ever sign.
          </h2>
          <p className="max-w-2xl text-base text-neutral-200 sm:text-lg">
            We’ll review your site, uncover growth opportunities, and map out next steps.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">You’ll receive:</p>
            <ul className="space-y-4 text-base text-neutral-100 sm:text-lg">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white" />
                  <span className="text-neutral-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 text-neutral-100 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)]">
            <p className="text-base text-neutral-200 sm:text-lg">
              Claim your free analysis to see exactly how Prism can accelerate your growth.
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="w-full rounded-full px-8 py-3 text-base font-semibold text-neutral-950"
              >
                <Link href="/get-started">Claim Your Free Analysis</Link>
              </Button>
              <p className="mt-3 text-xs text-white/60">We’ll respond within one business day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
