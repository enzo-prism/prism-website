"use client"

import Link from "next/link"
import type { ClientInfo } from "@/lib/clients"
import { trackNavigation, trackExternalLinkClick } from "@/utils/analytics"
import { buildCategoryPillClasses, CATEGORY_DOT_CLASS } from "@/lib/category-styles"

type Props = ClientInfo & {
  interactive?: boolean
}

export default function ClientCard({
  title,
  location,
  category,
  href,
  website,
  interactive = true,
}: Props) {
  const url = href || website
  const sublabel = location || "client"

  const content = (
    <div
      className="rounded-2xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
      role="group"
      aria-label={`${title}${location ? ` — ${location}` : ""}`}
    >
      <div className="text-[15px] sm:text-base font-semibold text-neutral-900 dark:text-white leading-relaxed">
        {title}
      </div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {sublabel}
      </div>
      {category ? (
        <div className={`mt-2 ${buildCategoryPillClasses(category)}`}>
          <span className={CATEGORY_DOT_CLASS} aria-hidden />
          <span>{category}</span>
        </div>
      ) : null}
    </div>
  )

  if (url && interactive) {
    const isExternal = /^https?:\/\//i.test(url)
    return (
      <Link
        href={url}
        aria-label={`${title}${location ? ` — ${location}` : ""}`}
        onClick={() => {
          trackNavigation("client_card", url)
          if (isExternal) trackExternalLinkClick(url, title)
        }}
        className="group/client block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-2xl"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return content
}
