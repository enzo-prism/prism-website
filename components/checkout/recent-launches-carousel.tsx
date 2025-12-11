"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { trackCTAClick } from "@/utils/analytics"
import type { WebsiteProject } from "@/lib/website-projects"

const ALL_CATEGORY = "all"

const formatCategoryLabel = (value: string) =>
  value
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

type RecentLaunchesCarouselProps = {
  projects: WebsiteProject[]
}

export default function RecentLaunchesCarousel({ projects }: RecentLaunchesCarouselProps) {
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
    if (activeCategory === ALL_CATEGORY) return projects
    return projects.filter(project => project.category.trim().toLowerCase() === activeCategory)
  }, [activeCategory, projects])

  const activeLabel = activeCategory === ALL_CATEGORY ? "all industries" : formatCategoryLabel(activeCategory)

  return (
    <section className="mt-16 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">recent launches</span>
        <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
          see the sites clients launch with prism
        </h2>
        <p className="text-sm text-neutral-600 sm:text-base">
          A sampling of sites we designed, wrote, and built across healthcare, retail, nonprofit, and services—toggle the industries to see the matches.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">toggle the industries</span>
          <p className="max-w-2xl text-sm text-neutral-600">
            pick a category to surface the launches closest to your world. the filter updates the list instantly.
          </p>
        </div>

        <ToggleGroup
          type="single"
          value={activeCategory}
          onValueChange={value => setActiveCategory(value || ALL_CATEGORY)}
          variant="outline"
          size="sm"
          className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-2 bg-neutral-50 p-1"
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

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              {filteredProjects.map(project => (
                <CarouselItem
                  key={project.id}
                  className="basis-[90%] pl-4 sm:basis-[70%] md:basis-[55%] lg:basis-[45%] xl:basis-[38%]"
                >
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-wider text-neutral-500">{project.category}</span>
                      <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
                      <p className="text-sm text-neutral-600">{project.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm font-semibold text-neutral-900">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
                        onClick={() => trackCTAClick("portfolio-click", project.title)}
                      >
                        view site
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/websites#recent-work"
                        className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900"
                      >
                        see all
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-8" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
