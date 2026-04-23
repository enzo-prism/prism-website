'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type FAQBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] }

type FAQItem = {
  question: string
  answer: FAQBlock[]
}

type HomeFAQSectionProps = {
  faqItems: FAQItem[]
  tone?: 'dark' | 'light'
}

export default function HomeFAQSection({
  faqItems,
  tone = 'dark',
}: HomeFAQSectionProps) {
  const isDark = tone === 'dark'

  const renderParagraph = (content: string) => {
    const chunks = content.split(/(\*\*.+?\*\*)/g)

    return chunks.map((chunk, index) => {
      if (chunk.startsWith('**') && chunk.endsWith('**')) {
        return <strong key={`${content}-${index}`}>{chunk.slice(2, -2)}</strong>
      }
      return <span key={`${content}-${index}`}>{chunk}</span>
    })
  }

  return (
      <div
        className={cn(
          'rounded-[2rem] px-4 sm:px-8',
          isDark
            ? 'border border-white/12 bg-black/30 shadow-[0_18px_48px_rgba(0,0,0,0.16)]'
            : 'border border-black/8 bg-[#ffffff] shadow-[0_18px_48px_rgba(15,23,42,0.04)]',
        )}
    >
      <Accordion type="single" collapsible>
        {faqItems.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className={cn(
              'py-1',
              isDark ? 'border-white/12' : 'border-black/8',
            )}
          >
            <AccordionTrigger
              className={cn(
                'text-left text-[0.98rem] font-semibold leading-6 hover:no-underline sm:text-[1.05rem] sm:leading-7',
                isDark ? 'text-[#f5f0e8]' : 'text-[#0a0a0b]',
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                'space-y-4 pb-6 text-sm leading-7',
                isDark ? 'text-[#b8afa2]' : 'text-[rgba(15,23,42,0.72)]',
              )}
            >
              {item.answer.map((block, index) => {
                if (block.type === 'list') {
                  return (
                    <ul key={`list-${index}`} className="space-y-2 pl-5">
                      {block.items.map((itemText) => (
                        <li key={itemText} className="list-disc">
                          {itemText}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={`paragraph-${index}`}>
                    {renderParagraph(block.content)}
                  </p>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
