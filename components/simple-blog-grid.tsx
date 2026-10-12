import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SimpleBlogGridProps {
  children: ReactNode
  posts?: unknown[]
  className?: string
}

/** Responsive grid for SimpleBlogPostCard rails (1, 2, then 3 columns). */
export default function SimpleBlogGrid({ children, className }: SimpleBlogGridProps) {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3", className)}>
      {children}
    </div>
  )
}
