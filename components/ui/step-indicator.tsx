"use client"

import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  /** Step number to display */
  number: number
  /** Whether this step is currently active */
  isActive?: boolean
  /** Whether this step is completed */
  isCompleted?: boolean
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Visual variant */
  variant?: "default" | "gradient" | "minimal"
  /** Additional CSS classes */
  className?: string
}

export default function StepIndicator({
  number,
  isActive = false,
  isCompleted = false,
  size = "md",
  variant = "default",
  className,
}: StepIndicatorProps) {
  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-base",
    lg: "h-16 w-16 text-lg",
  }

  const baseClasses =
    "flex items-center justify-center rounded-md border font-semibold font-pixel tracking-[0.12em] transition-[transform,background-color,border-color,color,box-shadow] duration-200"

  const variantClasses = {
    default: cn(
      "border-border/60 bg-card text-foreground shadow-none",
      "hover:-translate-y-0.5 hover:border-border hover:bg-card/80",
      isActive &&
        "border-white/30 bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
      isCompleted && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
    ),
    gradient: cn(
      "border-border/60 bg-card text-foreground shadow-none",
      "hover:-translate-y-0.5 hover:border-border hover:bg-card/80",
      isActive &&
        "border-white/30 bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.14)]",
      isCompleted && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
    ),
    minimal: cn(
      "border-border/60 bg-background text-muted-foreground shadow-none",
      "hover:-translate-y-0.5 hover:border-border hover:bg-muted/20 hover:text-foreground",
      isActive && "border-white/30 bg-primary text-primary-foreground",
      isCompleted && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
    ),
  }

  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {isCompleted ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <span>{number}</span>
      )}
    </div>
  )
}
