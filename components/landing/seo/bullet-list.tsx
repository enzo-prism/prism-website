import type { ReactNode } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type BulletListProps = {
  items: readonly ReactNode[]
  className?: string
  itemClassName?: string
  /** "check" for deliverables, "dot" for neutral lists. */
  marker?: "check" | "dot"
}

/** Token-styled list for the SEO landers (lucide check or a quiet dot). */
export function BulletList({ items, className, itemClassName, marker = "check" }: BulletListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn("flex gap-3 text-pretty text-[15px] leading-7 text-muted-foreground", itemClassName)}
        >
          {marker === "check" ? (
            <span
              aria-hidden="true"
              className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
            >
              <Check className="size-3 text-foreground" strokeWidth={2.25} />
            </span>
          ) : (
            <span aria-hidden="true" className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-white/40" />
          )}
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default BulletList
