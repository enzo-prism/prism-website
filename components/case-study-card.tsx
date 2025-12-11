"use client"

import Link from "next/link"
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
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-2xl"
    >
      <div className="relative h-full rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md">
        <div className="space-y-2">
          <div className={buildCategoryPillClasses(category)}>
            <span>{category}</span>
          </div>
          <h3 className="text-lg font-semibold lowercase text-neutral-900">{business}</h3>
          <p className="text-sm lowercase text-neutral-500">{location}</p>
        </div>
      </div>
    </Link>
  )
}
