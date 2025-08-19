import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

interface SeoTextSectionProps extends HTMLAttributes<HTMLElement> {
  title: string
  children: ReactNode
  subtitle?: string
  variant?: "default" | "compact" | "expanded"
  showDivider?: boolean
}

export default function SeoTextSection({ 
  title, 
  children, 
  subtitle,
  variant = "default",
  showDivider = true,
  className, 
  ...rest 
}: SeoTextSectionProps) {
  const paddingClasses = {
    default: "py-12 sm:py-16",
    compact: "py-8 sm:py-10",
    expanded: "py-16 sm:py-20"
  }

  const containerClasses = {
    default: "max-w-3xl",
    compact: "max-w-2xl",
    expanded: "max-w-4xl"
  }

  return (
    <section
      className={cn(
        "px-4",
        paddingClasses[variant],
        showDivider && "border-t border-neutral-100",
        "bg-white",
        className
      )}
      {...rest}
    >
      <div className={cn("mx-auto", containerClasses[variant])}>
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 lowercase">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg text-neutral-600 mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="prose prose-neutral max-w-none text-neutral-700 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-neutral-800 prose-h3:mb-3 prose-ul:my-4 prose-li:text-base">
          {children}
        </div>
      </div>
    </section>
  )
}


