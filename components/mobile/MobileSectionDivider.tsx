import React from "react"

import { cn } from "@/lib/utils"

interface MobileSectionDividerProps {
  variant?: "default" | "gradient" | "dotted" | "wave" | "minimal"
  spacing?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const spacingStyles = {
  sm: "my-8",
  md: "my-12",
  lg: "my-14",
  xl: "my-16"
}

/** Quiet section break for MDX posts. Static, decorative, and hidden from assistive tech. */
export function MobileSectionDivider({
  variant = "default",
  spacing = "md",
  className = ""
}: MobileSectionDividerProps) {
  const wrapper = cn(spacingStyles[spacing], className)

  if (variant === "gradient") {
    return (
      <div aria-hidden="true" className={cn("relative flex items-center", wrapper)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/30" />
      </div>
    )
  }

  if (variant === "dotted") {
    return (
      <div aria-hidden="true" className={cn("flex items-center justify-center gap-2", wrapper)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-white/25" />
        ))}
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div aria-hidden="true" className={cn("flex items-center justify-center", wrapper)}>
        <svg
          width="100"
          height="20"
          viewBox="0 0 100 20"
          className="text-white/25"
          focusable="false"
        >
          <path
            d="M0,10 Q25,0 50,10 T100,10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div aria-hidden="true" className={wrapper}>
        <div className="mx-auto h-px w-16 bg-white/15" />
      </div>
    )
  }

  // Default variant
  return (
    <div aria-hidden="true" className={cn("flex items-center", wrapper)}>
      <div className="h-px flex-1 bg-white/[0.08]" />
      <div className="mx-4 flex gap-2">
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/35" />
        <span className="size-1.5 rounded-full bg-white/20" />
      </div>
      <div className="h-px flex-1 bg-white/[0.08]" />
    </div>
  )
}
