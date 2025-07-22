"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"
import { cn } from "@/lib/utils"

interface SimpleBlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string
  featured?: boolean
  compact?: boolean
  gradientClass: string
}

export default function SimpleBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
}: SimpleBlogPostCardProps) {
  return (
    <Link 
      href={`/blog/${slug}`} 
      onClick={() => trackCTAClick(`view blog post`, title)} 
      className="block h-full"
    >
      <div className="border border-neutral-200 rounded-lg overflow-hidden h-full flex flex-col transition-opacity hover:opacity-90">
        {featured && (
          <div className="absolute top-3 left-3 text-xs text-white bg-black/80 px-3 py-1 rounded-full lowercase z-10">
            featured
          </div>
        )}
        
        {/* Simple gradient thumbnail */}
        <div className={cn("relative w-full aspect-[4/3] overflow-hidden", gradientClass)} />
        
        <div className="p-5 space-y-3 border-t border-neutral-100 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase w-fit">
              {category}
            </div>
            <div className="text-sm text-neutral-500 lowercase">{date}</div>
          </div>
          
          <h3 className="text-lg font-bold lowercase">
            {title}
          </h3>
          
          {!compact && (
            <p className="text-neutral-600 lowercase flex-1">
              {description}
            </p>
          )}
          
          <div className="flex items-center text-sm font-medium text-neutral-900 lowercase pt-2">
            read post 
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}