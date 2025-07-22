"use client"

import React from "react"
import type { BlogFrontmatter } from "@/lib/mdx"

interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

interface SimpleBlogGridProps {
  children: React.ReactNode
  posts: BlogPost[]
  className?: string
}

export default function SimpleBlogGrid({ children, className = "" }: SimpleBlogGridProps) {
  return (
    <div
      className={`
        grid gap-6 w-full
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        ${className}
      `}
    >
      {children}
    </div>
  )
}