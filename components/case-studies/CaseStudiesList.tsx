"use client"

import { useMemo, useState } from "react"
import CaseStudyCard from "@/components/case-study-card"
import { trackNavigation } from "@/utils/analytics"

export type CaseStudyListItem = {
  id: string
  client: string
  category: string
  location: string
  slug: string
}

export default function CaseStudiesList({ studies }: { studies: CaseStudyListItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const unique = Array.from(new Set(studies.map((study) => study.category))).sort()
    return ["all", ...unique]
  }, [studies])

  const filteredStudies = useMemo(() => {
    if (activeCategory === "all") return studies
    return studies.filter((study) => study.category === activeCategory)
  }, [activeCategory, studies])

  return (
    <>
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
              className={`rounded-md border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] font-pixel transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
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
          <div className="col-span-full rounded-md border border-dashed border-border/60 bg-card/20 p-6 text-center text-sm text-muted-foreground">
            no case studies in this category yet.
          </div>
        ) : null}
      </div>
    </>
  )
}
