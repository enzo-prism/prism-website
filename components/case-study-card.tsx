"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

interface CaseStudyCardProps {
  title: string
  client: string
  industry: string
  location: string
  description: string
  slug: string
  compact?: boolean
}

export default function CaseStudyCard({
  title,
  client,
  industry,
  location,
  description,
  slug,
  compact = false,
}: CaseStudyCardProps) {
  const isChrisWong = client.toLowerCase().includes("christopher wong") || client.toLowerCase().includes("chris wong")

  return (
    <Link href={`/case-studies/${slug}`} onClick={() => trackCTAClick(`view case study`, client)} className="block">
      <div className="border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-colors hover:bg-neutral-50 h-full relative">
        {isChrisWong && (
          <div className="absolute top-3 right-3 text-xs text-neutral-400 italic lowercase">case study available</div>
        )}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">{industry}</div>
            <div className="text-sm text-neutral-500 lowercase">{location}</div>
          </div>
          <h3 className="text-lg font-bold lowercase">{title}</h3>
          <p className="text-neutral-600 lowercase">{client}</p>
          {!compact && <p className="text-neutral-600 lowercase">{description}</p>}
          <div className="flex items-center text-sm font-medium text-neutral-900 lowercase pt-2">
            read case study <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
