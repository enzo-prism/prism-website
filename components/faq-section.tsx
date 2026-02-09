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
      "border-t border-border/60 bg-transparent",
      className
    )}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-3 text-2xl font-semibold text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
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
                className="overflow-hidden rounded-md border border-border/60 bg-card/40 shadow-none border-b-0"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-foreground hover:bg-muted/50 hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-muted-foreground">
                  <span className="pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 text-base text-muted-foreground leading-relaxed">
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
