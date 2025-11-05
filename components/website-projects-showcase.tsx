"use client"

import { useMemo, useState } from "react"

import MinimalWebsiteList from "@/components/minimal-website-list"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface WebsiteProject {
  id: string
  title: string
  url: string
  category: string
  description: string
}

interface WebsiteProjectsShowcaseProps {
  projects: WebsiteProject[]
}

const ALL_CATEGORY = "all"

function formatCategoryLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function WebsiteProjectsShowcase({ projects }: WebsiteProjectsShowcaseProps) {
  const categorySummary = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach(project => {
      const key = project.category.trim().toLowerCase()
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([value, count]) => ({
        value,
        count,
        label: formatCategoryLabel(value),
      }))
  }, [projects])

  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY)

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return projects
    }

    return projects.filter(project => project.category.trim().toLowerCase() === activeCategory)
  }, [activeCategory, projects])

  const activeLabel = activeCategory === ALL_CATEGORY ? "all industries" : formatCategoryLabel(activeCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">toggle the industries</span>
        <p className="max-w-xl text-sm text-neutral-600">
          pick a category to surface the launches closest to your world. the filter updates the list instantly.
        </p>
      </div>

      <ToggleGroup
        type="single"
        value={activeCategory}
        onValueChange={value => setActiveCategory(value || ALL_CATEGORY)}
        variant="outline"
        size="sm"
        className="mx-auto flex w-full max-w-2xl justify-center gap-2 bg-white/60 p-1"
      >
        <ToggleGroupItem value={ALL_CATEGORY} aria-label="show all website launches" className="px-3">
          <span className="text-sm font-medium">all</span>
          <span className="ml-2 text-xs text-neutral-500">{projects.length}</span>
        </ToggleGroupItem>
        {categorySummary.map(category => (
          <ToggleGroupItem
            key={category.value}
            value={category.value}
            aria-label={`show ${category.label.toLowerCase()} websites`}
            className="px-3"
          >
            <span className="text-sm font-medium">{category.label}</span>
            <span className="ml-2 text-xs text-neutral-500">{category.count}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="text-center text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">
        showing {filteredProjects.length} {filteredProjects.length === 1 ? "launch" : "launches"} · {activeLabel}
      </div>

      {filteredProjects.length > 0 ? (
        <MinimalWebsiteList projects={filteredProjects} />
      ) : (
        <div className="mt-6">
          <Empty className="border border-neutral-200 bg-white">
            <EmptyHeader>
              <EmptyTitle>no websites in that mix yet</EmptyTitle>
              <EmptyDescription>
                toggle another category or reach out—chances are we have a similar build in progress we can walk you through.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <span className="text-neutral-500">we keep shipping new launches monthly.</span>
            </EmptyContent>
          </Empty>
        </div>
      )}
    </div>
  )
}
