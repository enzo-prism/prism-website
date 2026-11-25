import type { HTMLAttributes, ReactNode } from "react"

import { proseClassName } from "@/components/landing/prose"
import { DisclosurePanel } from "@/components/prism/disclosure-panel"
import { cn } from "@/lib/utils"

interface SeoTextSectionProps extends HTMLAttributes<HTMLElement> {
  title: string
  children: ReactNode
  subtitle?: string
  /** Kept for API compatibility; all variants render as a collapsed disclosure panel. */
  variant?: "default" | "compact" | "expanded"
  showDivider?: boolean
  eyebrow?: string
}

/**
 * Long-form explainer band used near the end of SEO landers: collapsed behind
 * a native `<details>` panel so human readers get a crisp visual page while
 * every word and internal link stays in server-rendered HTML for search engines.
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
        variant === "compact" ? "py-8 sm:py-10" : "py-10 sm:py-12",
        className,
      )}
      {...rest}
    >
      <div className={cn("prism-container", showDivider && "border-t border-white/[0.08] pt-10")}>
        <DisclosurePanel
          eyebrow={eyebrow}
          title={title}
          summary={subtitle ?? "Full guide and implementation notes."}
          openLabel="Read guide"
          closeLabel="Hide guide"
        >
          <div className={cn(proseClassName, "max-w-[68ch] text-base sm:text-[1.0625rem]")}>
            {children}
          </div>
        </DisclosurePanel>
      </div>
    </section>
  )
}
