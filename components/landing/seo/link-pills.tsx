import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type LinkPill = { label: string; href: string }

type LinkPillsProps = {
  links: readonly LinkPill[]
  className?: string
  /** Accessible name for the group, e.g. "Related SEO pages". */
  label?: string
}

/** Row of outline pills for internal links between the SEO pages. */
export function LinkPills({ links, className, label }: LinkPillsProps) {
  return (
    <nav aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group/pill inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {link.label}
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5"
          />
        </Link>
      ))}
    </nav>
  )
}

export default LinkPills
