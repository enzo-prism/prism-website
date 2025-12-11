"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import Link from "next/link"

export default function SaorsaGrowthPartnersCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Saorsa Growth Partners Case Study" />
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 space-y-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">case study</p>
            <h1 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">Saorsa Growth Partners</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 lowercase">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 font-semibold text-neutral-800">
                consulting
              </span>
              <span>San Francisco, CA</span>
            </div>
            <p className="text-neutral-600 text-base md:text-lg lowercase">
              Clarity, credibility, and lead capture for a boutique advisory firm—fast-loading pages, concise offers,
              and inquiry paths that surface the right work.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm text-neutral-600 lowercase">
              <span className="rounded-full bg-neutral-100 px-3 py-1">messaging clarity</span>
              <span className="rounded-full bg-neutral-100 px-3 py-1">services overview</span>
              <span className="rounded-full bg-neutral-100 px-3 py-1">fast contact paths</span>
            </div>
            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 lowercase"
              >
                start a project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
