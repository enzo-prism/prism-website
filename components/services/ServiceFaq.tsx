import { Section, SectionHeader } from '@/components/prism/section'
import { Reveal } from '@/components/prism/reveal'
import { FaqList } from '@/components/prism/faq-list'

export type ServiceFaqItem = {
  question: string
  answer: string
}

type ServiceFaqProps = {
  items: readonly ServiceFaqItem[]
  /** Unique per page so accordion values never collide. */
  idPrefix: string
  title?: string
  description?: string
}

/**
 * Split FAQ for the service pages: a sticky header on the left and the
 * native-details FaqList on the right, so every answer is in the HTML for
 * crawlers. The first answer starts open; FAQSchema mirrors the items.
 */
export function ServiceFaq({
  items,
  idPrefix,
  title = 'questions, answered.',
  description,
}: ServiceFaqProps) {
  const headingId = `${idPrefix}-faq-title`

  return (
    <Section aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id={headingId}
            eyebrow="FAQ"
            title={title}
            description={description}
            titleClassName="max-w-[12ch]"
          />
        </Reveal>
        <Reveal delay={80}>
          <FaqList items={items} name={`${idPrefix}-faq`} defaultOpen={0} />
        </Reveal>
      </div>
    </Section>
  )
}

export default ServiceFaq
