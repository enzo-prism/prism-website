"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"
import { cn } from "@/lib/utils"
import CoreImage from "@/components/core-image"
import { useState } from "react"

interface BlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string // Blog post thumbnail image
  featured?: boolean
  compact?: boolean
  gradientClass: string // New prop for gradient class
}

export default function BlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} onClick={() => trackCTAClick(`view blog post`, title)} className="block">
      <div className="border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-all hover:shadow-sm h-full relative group">
        {featured && (
          <div className="absolute top-3 left-3 text-xs text-white bg-black/80 px-3 py-1 rounded-full lowercase z-10">
            featured
          </div>
        )}
        
        {/* Always use gradient for thumbnail */}
        <div className={cn("relative w-full aspect-[4/3]", gradientClass)} />
        <div className="p-5 space-y-3 border-t border-neutral-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">{category}</div>
            <div className="text-sm text-neutral-500 lowercase">{date}</div>
          </div>
          <h3 className="text-lg font-bold lowercase group-hover:text-neutral-700 transition-colors">{title}</h3>
          {!compact && <p className="text-neutral-600 lowercase">{description}</p>}
          <div className="flex items-center text-sm font-medium text-neutral-900 lowercase pt-2 group-hover:translate-x-0.5 transition-transform">
            read post <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
