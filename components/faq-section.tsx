import { Section, SectionHeader } from "@/components/prism/section"
import { serializeJsonLd } from "@/components/schema-markup"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  className?: string
  /** "compact" stacks the header above the list with tighter spacing. */
  variant?: "default" | "compact"
}

/**
 * Shared FAQ band for the long-tail landers: a sticky header on the left and
 * a shadcn Accordion on the right, plus FAQPage JSON-LD for every item so
 * each answer stays visible to crawlers.
 */
export default function FAQSection({
  title = "frequently asked questions.",
  subtitle,
  items,
  className,
  variant = "default",
}: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const compact = variant === "compact"

  return (
    <Section className={cn(compact && "py-14 sm:py-16", className)} aria-label={title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <div
        className={cn(
          "grid gap-10",
          compact ? "mx-auto max-w-3xl" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20",
        )}
      >
        <div className={cn(!compact && "lg:sticky lg:top-28 lg:self-start")}>
          <SectionHeader
            eyebrow="FAQ"
            title={title}
            description={subtitle}
            titleClassName={cn(
              "max-w-[14ch]",
              compact && "text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] font-semibold leading-[1] tracking-[-0.045em]",
            )}
          />
        </div>
        <Accordion type="multiple" className="border-t border-white/[0.08]">
          {items.map((item, index) => (
            <AccordionItem
              key={`${item.question}-${index}`}
              value={`faq-${index}`}
              className="border-white/[0.08]"
            >
              <AccordionTrigger className="min-h-14 gap-6 py-5 text-[17px] text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-0 [&>svg]:text-subtle">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[64ch] pb-6 text-pretty text-[15px] leading-7 text-muted-foreground">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
