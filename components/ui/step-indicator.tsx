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
    sm: "h-10 w-10 text-lg",
    md: "h-16 w-16 text-2xl",
    lg: "h-20 w-20 text-3xl",
  }

  const baseClasses = "flex items-center justify-center rounded-full font-bold transition-all duration-300"

  const variantClasses = {
    default: cn(
      "bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-700 shadow-sm",
      "hover:from-neutral-200 hover:to-neutral-300 hover:shadow-md hover:scale-105",
      isActive && "from-black to-neutral-800 text-white shadow-lg scale-105",
      isCompleted && "from-green-100 to-green-200 text-green-700"
    ),
    gradient: cn(
      "bg-gradient-to-br from-blue-50 to-indigo-100 text-indigo-700 shadow-md",
      "hover:from-blue-100 hover:to-indigo-200 hover:shadow-lg hover:scale-105",
      isActive && "from-blue-500 to-indigo-600 text-white shadow-xl scale-105",
      isCompleted && "from-green-400 to-emerald-500 text-white"
    ),
    minimal: cn(
      "bg-white border-2 border-neutral-200 text-neutral-600",
      "hover:border-neutral-300 hover:bg-neutral-50 hover:scale-105",
      isActive && "border-black bg-black text-white scale-105",
      isCompleted && "border-green-500 bg-green-500 text-white"
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