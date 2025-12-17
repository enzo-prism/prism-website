import type { ReactNode } from "react"

interface SimpleBlogGridProps {
  children: ReactNode
  posts?: unknown[]
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
      style={{ contain: "layout paint" }}
    >
      {children}
    </div>
  )
}
