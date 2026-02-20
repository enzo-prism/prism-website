"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

type FAQBlock =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }

type FAQItem = {
  question: string
  answer: FAQBlock[]
}

type HomeFAQSectionProps = {
  faqItems: FAQItem[]
}

export default function HomeFAQSection({ faqItems }: HomeFAQSectionProps) {
  const renderParagraph = (content: string) => {
    const chunks = content.split(/(\*\*.+?\*\*)/g)

    return chunks.map((chunk, index) => {
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return <strong key={`${content}-${index}`}>{chunk.slice(2, -2)}</strong>
      }
      return <span key={`${content}-${index}`}>{chunk}</span>
    })
  }

  return (
    <Card className="border-border/60 bg-card/90">
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="px-6">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                {item.answer.map((block, index) => {
                  if (block.type === "list") {
                    return (
                      <ul key={`list-${index}`} className="space-y-2 pl-4">
                        {block.items.map((itemText) => (
                          <li key={itemText} className="list-disc">
                            {itemText}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return <p key={`paragraph-${index}`}>{renderParagraph(block.content)}</p>
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
