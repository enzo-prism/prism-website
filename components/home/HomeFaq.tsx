import {
  HOMEPAGE_FAQ,
  HOMEPAGE_FAQ_ITEMS,
} from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { FaqList } from '@/components/prism/faq-list'

export default function HomeFaq() {
  return (
    <Section id="faq" aria-labelledby="home-faq-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        <Reveal>
          <SectionHeader
            id="home-faq-title"
            eyebrow={HOMEPAGE_FAQ.eyebrow}
            title={HOMEPAGE_FAQ.title}
          />
        </Reveal>
        <Reveal delay={100}>
          <FaqList
            name="home-faq"
            items={HOMEPAGE_FAQ_ITEMS.map((item) => ({
              question: item.question,
              answer: item.answer.map((block, blockIndex) =>
                block.type === 'paragraph' ? (
                  <p key={blockIndex}>{block.content}</p>
                ) : (
                  <ul key={blockIndex} className="mt-2 list-disc space-y-1 pl-5">
                    {block.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ),
              ),
            }))}
          />
        </Reveal>
      </div>
    </Section>
  )
}
