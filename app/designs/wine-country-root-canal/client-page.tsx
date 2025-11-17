"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

export default function WineCountryRootCanalDesignReview() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <PageViewTracker title="Wine Country Root Canal Design Review" />
      <Navbar />
      <main className="flex-1">
        <section className="bg-white px-4 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">design board</p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">wine country root canal</h1>
                <p className="text-base text-neutral-600 sm:text-lg">
                  One board for every deliverable—site polish, patient packets, and referral assets—so the team can react fast.
                </p>
                <Link
                  href="/case-studies/wine-country-root-canal"
                  className="inline-flex items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  view latest case study
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-900 shadow-2xl shadow-black/20">
                <Image
                  src="/Wine Country Root Canal.webp"
                  alt="Wine Country Root Canal web concepts"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" aria-hidden />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
