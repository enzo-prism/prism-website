"use client"

import { useMemo, useState } from "react"
import CaseStudyCard from "@/components/case-study-card"
import { trackNavigation } from "@/utils/analytics"
const iconWrapperClassName = "h-3.5 w-3.5 shrink-0"

export type CaseStudyListItem = {
  id: string
  client: string
  category: string
  location: string
  slug: string
}

const CATEGORY_ICON_MAP: Record<string, string> = {
  all: "/pixelish/folder.svg",
  dentistry: "/pixelish/user.svg",
  retail: "/pixelish/handbag.svg",
  education: "/pixelish/document-letter.svg",
  nonprofit: "/pixelish/emoji-heart.svg",
  consulting: "/pixelish/briefcase.svg",
  event: "/pixelish/calendar.svg",
  "private resort": "/pixelish/house.svg",
  "online community": "/pixelish/users.svg",
}

const FALLBACK_ICON_SRC = "/pixelish/lens-plus.svg"

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
          const iconSrc = CATEGORY_ICON_MAP[category] ?? FALLBACK_ICON_SRC

          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category)
                trackNavigation("case_study_filter", category)
              }}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] font-pixel transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <span
                className={`${iconWrapperClassName} ${isActive ? "opacity-100" : "opacity-90"}`}
                aria-hidden="true"
              >
                <img
                  src={iconSrc}
                  alt=""
                  width={14}
                  height={14}
                  className={`h-full w-full object-contain ${isActive ? "invert-0" : "dark:invert"}`}
                />
              </span>
              <span>{category}</span>
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
