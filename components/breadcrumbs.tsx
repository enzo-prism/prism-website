import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BreadcrumbSchema } from "@/components/schema-markup"
import { canonicalUrl } from "@/lib/canonical"
import { cn } from "@/lib/utils"

type Breadcrumb = {
  name: string
  url: string
}

export default function Breadcrumbs({ items, className }: { items: Breadcrumb[], className?: string }) {
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: canonicalUrl(item.url),
  }))

  // Filter out "home" if it's the first item to avoid duplication with the icon
  const cleanItems = items.filter((item, index) => {
    if (index === 0 && item.name.toLowerCase() === 'home' && item.url === '/') return false
    return true
  })

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav 
        aria-label="Breadcrumb" 
        className={cn(
          "flex items-center text-sm text-neutral-500 overflow-x-auto scrollbar-hide py-3 mb-4", 
          className
        )}
      >
        <div className="flex items-center min-w-max">
          {/* Home icon */}
          <Link 
            href="/" 
            className="flex items-center hover:text-neutral-900 transition-colors shrink-0" 
            aria-label="home"
          >
            <Home size={16} strokeWidth={2} />
          </Link>

          {/* Iterate through breadcrumb items */}
          {cleanItems.map((item, index) => {
            const isLastItem = index === cleanItems.length - 1

            return (
              <div key={item.url + index} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-neutral-300 shrink-0" strokeWidth={2} />
                
                {isLastItem ? (
                  <span 
                    className="font-medium text-neutral-900 truncate max-w-[200px] sm:max-w-md md:max-w-xl" 
                    aria-current="page"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.url} 
                    className="hover:text-neutral-900 transition-colors whitespace-nowrap"
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
