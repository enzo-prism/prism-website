"use client"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
          <Accordion type="multiple" className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-neutral-900 hover:bg-neutral-100 hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-neutral-500">
                  <span className="pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 text-base text-neutral-700 leading-relaxed">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
