import type { HTMLAttributes, ReactNode } from "react"

import { proseClassName } from "@/components/landing/prose"
import { Eyebrow } from "@/components/prism/section"
import { cn } from "@/lib/utils"

interface SeoTextSectionProps extends HTMLAttributes<HTMLElement> {
  title: string
  children: ReactNode
  subtitle?: string
  /** Kept for API compatibility; all variants share the split reading layout. */
  variant?: "default" | "compact" | "expanded"
  showDivider?: boolean
  eyebrow?: string
}

/**
 * Long-form explainer band used near the end of SEO landers: a quiet heading
 * column beside a readable prose column (68ch measure).
 */
export default function SeoTextSection({
  title,
  children,
  subtitle,
  variant = "default",
  showDivider = true,
  eyebrow = "In depth",
  className,
  ...rest
}: SeoTextSectionProps) {
  return (
    <section
      className={cn(
        "relative",
        variant === "compact" ? "py-14 sm:py-16" : "py-20 sm:py-24",
        className,
      )}
      {...rest}
    >
      <div className="prism-container">
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16",
            showDivider && "border-t border-white/[0.08] pt-12 sm:pt-16",
          )}
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-heading mt-4 max-w-[22ch] text-balance text-foreground">{title}</h2>
            {subtitle ? (
              <p className="mt-4 max-w-[44ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className={cn(proseClassName, "max-w-[68ch] text-base sm:text-[1.0625rem]")}>{children}</div>
        </div>
      </div>
    </section>
  )
}
