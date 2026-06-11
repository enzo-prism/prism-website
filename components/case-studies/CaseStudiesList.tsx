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
  description?: string
  clientLogo?: string
  hasExplainerVideo?: boolean
  screenshotSrc?: string
  metric?: { value: string; label: string }
}

type FilterGroup = {
  key: string
  label: string
  /** Categories claimed by this group; omitted for "all" and the catch-all. */
  categories?: string[]
  iconSrc: string
}

const FILTER_GROUPS: FilterGroup[] = [
  { key: "all", label: "all", iconSrc: "/pixelish/folder.svg" },
  {
    key: "dentistry",
    label: "dentistry",
    categories: ["dentistry"],
    iconSrc: "/pixelish/user.svg",
  },
  {
    key: "consulting",
    label: "consulting",
    categories: ["consulting"],
    iconSrc: "/pixelish/briefcase.svg",
  },
  {
    key: "nonprofit-community",
    label: "nonprofit & community",
    categories: ["nonprofit", "online community"],
    iconSrc: "/pixelish/emoji-heart.svg",
  },
  {
    key: "more-industries",
    label: "more industries",
    iconSrc: "/pixelish/handbag.svg",
  },
]

const CLAIMED_CATEGORIES = new Set(
  FILTER_GROUPS.flatMap((group) => group.categories ?? []),
)

function matchesGroup(group: FilterGroup, category: string) {
  if (group.key === "all") return true
  if (group.categories) return group.categories.includes(category)
  // Catch-all group: any category no named group claims.
  return !CLAIMED_CATEGORIES.has(category)
}

export default function CaseStudiesList({ studies }: { studies: CaseStudyListItem[] }) {
  const [activeGroupKey, setActiveGroupKey] = useState<string>("all")

  const groupsWithCounts = useMemo(
    () =>
      FILTER_GROUPS.map((group) => ({
        ...group,
        count: studies.filter((study) => matchesGroup(group, study.category))
          .length,
      })).filter((group) => group.count > 0),
    [studies],
  )

  const filteredStudies = useMemo(() => {
    const group = FILTER_GROUPS.find((item) => item.key === activeGroupKey)
    if (!group || group.key === "all") return studies
    return studies.filter((study) => matchesGroup(group, study.category))
  }, [activeGroupKey, studies])

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="filter case studies">
        {groupsWithCounts.map((group) => {
          const isActive = activeGroupKey === group.key

          return (
            <button
              key={group.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActiveGroupKey(group.key)
                trackNavigation("case_study_filter", group.key)
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
                  src={group.iconSrc}
                  alt=""
                  width={14}
                  height={14}
                  className={`h-full w-full object-contain ${isActive ? "invert-0" : "dark:invert"}`}
                />
              </span>
              <span>{group.label}</span>
              <span className={isActive ? "opacity-80" : "opacity-60"}>
                {group.count}
              </span>
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
            description={study.description}
            hasExplainerVideo={study.hasExplainerVideo}
            screenshotSrc={study.screenshotSrc}
            metric={study.metric}
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
