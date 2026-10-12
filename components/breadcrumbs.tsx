import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbSchema } from '@/components/schema-markup'
import { canonicalUrl } from '@/lib/canonical'
import { cn } from '@/lib/utils'

type Breadcrumb = {
  name: string
  url: string
}

export default function Breadcrumbs({
  items,
  className,
  includeSchema = true,
}: {
  items: Breadcrumb[]
  className?: string
  /** Set false for placeholder trails (e.g. Suspense fallbacks) that must not emit JSON-LD. */
  includeSchema?: boolean
}) {
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: canonicalUrl(item.url),
  }))

  // Filter out "home" if it's the first item to avoid duplication with the icon
  const cleanItems = items.filter((item, index) => {
    if (index === 0 && item.name.toLowerCase() === 'home' && item.url === '/')
      return false
    return true
  })

  return (
    <>
      {includeSchema ? <BreadcrumbSchema items={schemaItems} /> : null}
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'mb-4 flex w-full max-w-full min-w-0 items-center overflow-x-auto py-3 text-[13px] font-medium tracking-[-0.005em] text-muted-foreground scrollbar-hide',
          className,
        )}
      >
        <div className="inline-flex min-w-max items-center pr-1">
          <Link
            href="/"
            className="flex min-h-10 shrink-0 items-center rounded-sm text-current opacity-85 transition-[color,opacity] hover:text-foreground hover:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            aria-label="home"
          >
            <Home size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>

          {cleanItems.map((item, index) => {
            const isLastItem = index === cleanItems.length - 1

            return (
              <div key={item.url + index} className="flex items-center">
                <ChevronRight
                  size={14}
                  className="mx-1.5 shrink-0 text-current opacity-40"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />

                {isLastItem ? (
                  <span
                    className="max-w-[calc(100vw-13rem)] truncate text-foreground sm:max-w-md md:max-w-xl"
                    aria-current="page"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="whitespace-nowrap rounded-sm text-current opacity-85 transition-[color,opacity] hover:text-foreground hover:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}
