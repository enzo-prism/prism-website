"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
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
    <section className="mt-16 rounded-md border border-border/60 bg-card/30 p-6 shadow-none backdrop-blur-sm sm:p-8">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground font-pixel">recent launches</span>
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          see the sites clients launch with prism
        </h2>
      </div>

      <div className="mt-6 space-y-6">
        <ToggleGroup
          type="single"
          value={activeCategory}
          onValueChange={value => setActiveCategory(value || ALL_CATEGORY)}
          variant="outline"
          size="sm"
          className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-2 rounded-md border border-border/60 bg-muted/30 p-1"
        >
          <ToggleGroupItem value={ALL_CATEGORY} aria-label="show all website launches" className="px-3">
            all ({projects.length})
          </ToggleGroupItem>
          {categorySummary.map(category => (
            <ToggleGroupItem
              key={category.value}
              value={category.value}
              aria-label={`show ${category.label.toLowerCase()} websites`}
              className="px-3"
            >
              {category.label} ({category.count})
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

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
                  <div className="flex h-full flex-col justify-between rounded-md border border-border/60 bg-card/30 p-6 shadow-none backdrop-blur-sm transition hover:-translate-y-1 hover:bg-card/45">
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground font-pixel">{project.category}</span>
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="mt-6">
                      <Button asChild className="rounded-md" onClick={() => trackCTAClick("portfolio-click", project.title)}>
                        <Link href={project.url} target="_blank" rel="noopener noreferrer">
                          view site
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
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
