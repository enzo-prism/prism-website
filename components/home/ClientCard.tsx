"use client"

import Link from "next/link"
import type { ClientInfo } from "@/lib/clients"
import { trackNavigation, trackExternalLinkClick } from "@/utils/analytics"
import { buildCategoryPillClasses } from "@/lib/category-styles"
import { ArrowUpRight, MoveRight } from "lucide-react"

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
  const isExternal = url ? /^https?:\/\//i.test(url) : false
  const sublabel = location || "client"

  const content = (
    <div
      className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 text-left transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 group-focus-visible/client:border-neutral-300 group-focus-visible/client:bg-neutral-50 group-focus-visible/client:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:group-focus-visible/client:border-neutral-700 dark:group-focus-visible/client:bg-neutral-800"
      role="group"
      aria-label={`${title}${location ? ` — ${location}` : ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover/client:opacity-100 group-focus-visible/client:opacity-100"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/0 to-transparent dark:from-white/10 dark:via-white/0" />
        <div className="absolute inset-0 motion-reduce:hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-neutral-900/5 to-transparent transition-transform duration-1000 ease-out group-hover/client:translate-x-full group-focus-visible/client:translate-x-full dark:via-white/10" />
        </div>
      </div>

      {url && interactive ? (
        <span
          className="absolute right-3 top-3 inline-flex h-9 w-9 translate-y-1 scale-95 items-center justify-center rounded-full border border-neutral-200 bg-white/70 text-neutral-500 opacity-0 shadow-sm transition-[opacity,transform] duration-300 ease-out group-hover/client:opacity-100 group-hover/client:translate-y-0 group-hover/client:scale-100 group-focus-visible/client:opacity-100 group-focus-visible/client:translate-y-0 group-focus-visible/client:scale-100 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300"
          aria-hidden="true"
        >
          {isExternal ? <ArrowUpRight className="h-4 w-4" /> : <MoveRight className="h-4 w-4" />}
        </span>
      ) : null}

      <div className="text-[15px] font-semibold leading-relaxed text-neutral-900 group-hover/client:text-neutral-950 group-focus-visible/client:text-neutral-950 sm:text-base dark:text-white dark:group-hover/client:text-white dark:group-focus-visible/client:text-white">
        {title}
      </div>
      <div className="text-sm leading-relaxed text-neutral-500 transition-colors duration-300 ease-out group-hover/client:text-neutral-600 group-focus-visible/client:text-neutral-600 dark:text-neutral-400 dark:group-hover/client:text-neutral-300 dark:group-focus-visible/client:text-neutral-300">
        {sublabel}
      </div>
      {category ? (
        <div
          className={`mt-2 ${buildCategoryPillClasses(
            category
          )} transition-transform duration-300 ease-out group-hover/client:-translate-y-0.5 group-focus-visible/client:-translate-y-0.5`}
        >
          <span>{category}</span>
        </div>
      ) : null}
    </div>
  )

  if (url && interactive) {
    return (
      <Link
        href={url}
        aria-label={`${title}${location ? ` — ${location}` : ""}`}
        onClick={() => {
          trackNavigation("client_card", url)
          if (isExternal) trackExternalLinkClick(url, title)
        }}
        className="group/client block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 hardware-hover touch-feedback"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return content
}
