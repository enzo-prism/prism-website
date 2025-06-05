import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BreadcrumbSchema } from "./schema-markup"

type Breadcrumb = {
  name: string
  url: string
}

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="py-2 px-4 bg-neutral-50 border-b border-neutral-100">
        <div className="flex items-center h-6 text-xs text-gray-500 lowercase">
          {/* Home icon */}
          <div className="flex items-center h-full">
            <Link href="/" className="hover:text-gray-900 h-full flex items-center" aria-label="home">
              <div className="flex items-center justify-center h-full">
                <Home size={16} strokeWidth={2} className="transform translate-y-[-1px]" />
              </div>
            </Link>
          </div>

          {/* Iterate through all breadcrumb items */}
          {items.map((item, index) => {
            const isLastItem = index === items.length - 1

            return (
              <div key={index} className="flex items-center h-full">
                {/* Separator before each item */}
                <div className="mx-1.5 flex items-center h-full">
                  <ChevronRight size={14} strokeWidth={2} className="text-gray-400" />
                </div>

                {/* Breadcrumb item */}
                <div className="flex items-center h-full">
                  {isLastItem ? (
                    <span className="text-gray-900 font-medium transform translate-y-[0.5px]" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.url} className="hover:text-gray-900 h-full flex items-center">
                      <span className="transform translate-y-[0.5px]">{item.name}</span>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}
