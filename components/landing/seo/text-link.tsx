import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type TextLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

/** Inline action link with a trailing arrow (DESIGN.md inline link grammar). */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
      />
    </Link>
  )
}

export default TextLink
