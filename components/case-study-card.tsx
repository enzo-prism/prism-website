"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { buildCategoryPillClasses } from "@/lib/category-styles"

interface CaseStudyCardProps {
  business: string
  category: string
  location: string
  slug: string
}

export default function CaseStudyCard({
  business,
  category,
  location,
  slug,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="block rounded-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <Card className="relative h-full rounded-md bg-card/30 shadow-none backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-card/45">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <Badge className={buildCategoryPillClasses(category)}>{category}</Badge>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {business}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
