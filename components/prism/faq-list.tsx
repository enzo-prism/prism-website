import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export type FaqListItem = {
  question: string
  answer: ReactNode
}

type FaqListProps = {
  items: readonly FaqListItem[]
  /**
   * Shared `name` makes the items an exclusive accordion in browsers that
   * support it (one open at a time); older browsers simply allow several.
   */
  name: string
  /** Index of the item that starts open; omit for all closed. */
  defaultOpen?: number
  className?: string
}

/**
 * FAQ accordion built on native <details>/<summary>, styled to the shadcn
 * Accordion. Every answer is in the server HTML, so search engines and AI
 * crawlers read it even while it is collapsed (Radix unmounts closed
 * content). Server component, zero client JS; the open animation lives in
 * `.prism-faq` in globals.css.
 */
export function FaqList({ items, name, defaultOpen, className }: FaqListProps) {
  return (
    <div className={cn('border-t border-white/[0.08]', className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          name={name}
          open={index === defaultOpen ? true : undefined}
          className="prism-faq group/faq border-b border-white/[0.08]"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-left text-[17px] font-medium tracking-[-0.01em] text-foreground transition-colors hover:text-foreground/85 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-subtle transition-transform duration-200 group-open/faq:rotate-180"
            />
          </summary>
          <div className="max-w-[64ch] pb-6 pr-8 text-pretty text-[15px] leading-7 text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

export default FaqList
