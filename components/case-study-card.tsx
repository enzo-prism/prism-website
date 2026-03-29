"use client"

import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { buildCategoryPillClasses } from "@/lib/category-styles"

interface CaseStudyCardProps {
  business: string
  category: string
  location: string
  slug: string
  hasExplainerVideo?: boolean
}

export default function CaseStudyCard({
  business,
  category,
  location,
  slug,
  hasExplainerVideo = false,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="block rounded-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <Card className="relative h-full rounded-md bg-card/30 shadow-none backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-card/45">
        <CardContent className="flex h-full flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <Badge className={buildCategoryPillClasses(category)}>{category}</Badge>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {business}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>

          {hasExplainerVideo ? (
            <div className="mt-5 flex items-center gap-2 border-t border-border/50 pt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <PlayCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>explainer video</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}
