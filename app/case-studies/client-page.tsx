"use client"

import CaseStudyCard from "@/components/case-study-card"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { useMemo, useState } from "react"
import { trackNavigation } from "@/utils/analytics"

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const unique = Array.from(new Set(CASE_STUDIES.map((study) => study.category))).sort()
    return ["all", ...unique]
  }, [])

  const filteredStudies = useMemo(() => {
    if (activeCategory === "all") return CASE_STUDIES
    return CASE_STUDIES.filter((study) => study.category === activeCategory)
  }, [activeCategory])

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

            <div className="mt-6 flex flex-wrap gap-2" aria-label="filter case studies">
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category)
                      trackNavigation("case_study_filter", category)
                    }}
                    className={`rounded-full border px-3 py-1 text-sm lowercase transition ${
                      isActive
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  business={study.client}
                  category={study.category}
                  location={study.location}
                  slug={study.slug}
                />
              ))}
              {filteredStudies.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-center text-sm text-neutral-600">
                  no case studies in this category yet.
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
