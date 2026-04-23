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
}: {
  items: Breadcrumb[]
  className?: string
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
      <BreadcrumbSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'mb-4 flex w-full max-w-full min-w-0 items-center overflow-x-auto py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(15,23,42,0.56)] scrollbar-hide font-pixel',
          className,
        )}
      >
        <div className="inline-flex min-w-max items-center pr-1">
          {/* Home icon */}
          <Link
            href="/"
            className="flex shrink-0 items-center text-current opacity-80 transition-opacity hover:opacity-100"
            aria-label="home"
          >
            <Home size={16} strokeWidth={2} />
          </Link>

          {/* Iterate through breadcrumb items */}
          {cleanItems.map((item, index) => {
            const isLastItem = index === cleanItems.length - 1

            return (
              <div key={item.url + index} className="flex items-center">
                <ChevronRight
                  size={14}
                  className="mx-2 shrink-0 opacity-40"
                  strokeWidth={2}
                />

                {isLastItem ? (
                  <span
                    className="max-w-[calc(100vw-13rem)] truncate text-current opacity-100 sm:max-w-md md:max-w-xl"
                    aria-current="page"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="whitespace-nowrap text-current opacity-80 transition-opacity hover:opacity-100"
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
