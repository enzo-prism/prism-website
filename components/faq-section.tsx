"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  className?: string
  variant?: "default" | "compact"
}

export default function FAQSection({ 
  title = "frequently asked questions",
  subtitle,
  items, 
  className,
  variant = "default" 
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const paddingClasses = {
    default: "py-12 sm:py-16",
    compact: "py-8 sm:py-10"
  }

  // Generate FAQ schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section className={cn(
      "px-4",
      paddingClasses[variant],
      "border-t border-neutral-100 bg-white",
      className
    )}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-3 lowercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index}
              className="bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-100 transition-colors"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-neutral-900 pr-4">
                  {item.question}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform",
                    openItems.includes(index) && "rotate-180"
                  )}
                />
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={cn(
                  "px-6 overflow-hidden transition-all duration-300",
                  openItems.includes(index) ? "max-h-96 pb-4" : "max-h-0"
                )}
              >
                <p className="text-neutral-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}