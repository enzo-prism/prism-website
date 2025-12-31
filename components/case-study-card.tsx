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

export default function CaseStudyCard({ business, category, location, slug }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-2xl"
    >
      <Card className="relative h-full rounded-2xl border border-neutral-200 bg-white shadow-none transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md">
        <CardContent className="space-y-2 p-5 pt-5">
          <Badge className={buildCategoryPillClasses(category)}>{category}</Badge>
          <h3 className="text-lg font-semibold lowercase text-neutral-900">
            {business}
          </h3>
          <p className="text-sm lowercase text-neutral-500">{location}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
