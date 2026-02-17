"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { buildCategoryPillClasses } from "@/lib/category-styles"

interface CaseStudyCardProps {
  business: string
  clientLogo?: string
  category: string
  location: string
  slug: string
}

export default function CaseStudyCard({
  business,
  clientLogo,
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
            {clientLogo ? (
              <div className="relative h-10 w-[120px] shrink-0 overflow-hidden rounded-md border border-border/60 bg-background/85 px-2 py-1">
                <Image
                  src={clientLogo}
                  alt={`${business} logo`}
                  fill
                  sizes="120px"
                  className="object-contain p-1"
                />
              </div>
            ) : null}
          </div>

          <h3 className={`text-lg font-semibold text-foreground ${clientLogo ? "mt-3" : "mt-4"}`}>
            {business}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
