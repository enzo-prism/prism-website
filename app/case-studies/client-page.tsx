"use client"

import CaseStudyCard from "@/components/case-study-card"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import { CASE_STUDIES } from "@/lib/case-study-data"

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageViewTracker title="Case Studies" />
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">case studies</p>
              <h1 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
                recent client work
              </h1>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  business={study.client}
                  category={study.category}
                  location={study.location}
                  slug={study.slug}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
