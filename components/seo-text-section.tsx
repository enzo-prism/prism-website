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
        showDivider && "border-t border-border/60",
        "bg-transparent",
        className
      )}
      {...rest}
    >
      <div className={cn("mx-auto", containerClasses[variant])}>
        <h2 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="prose prose-invert max-w-none prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-foreground prose-a:underline prose-a:decoration-border/60 prose-a:underline-offset-4 hover:prose-a:decoration-border prose-strong:text-foreground">
          {children}
        </div>
      </div>
    </section>
  )
}

