import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

interface SeoTextSectionProps extends HTMLAttributes<HTMLElement> {
  title: string
  children: ReactNode
}

export default function SeoTextSection({ title, children, className, ...rest }: SeoTextSectionProps) {
  return (
    <section
      className={cn("px-4 py-12 sm:py-16 border-t border-neutral-100 bg-white", className)}
      {...rest}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 lowercase">
          {title}
        </h2>
        <div className="prose prose-neutral max-w-none text-neutral-700">
          {children}
        </div>
      </div>
    </section>
  )
}


