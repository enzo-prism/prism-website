import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'

/**
 * What working with Prism is like, after the proof on /case-studies:
 * a split with the headline on the left and three ruled points on the
 * right (deliberately not cards, so it never stacks against the gallery).
 * Promises how we work, never an outcome.
 */
export const WORK_WITH_PRISM = {
  eyebrow: 'Working with Prism',
  title: 'your team, amplified.',
  description:
    'We get to know your people, from the front desk to the founder, and build alongside them. You keep doing what you do best, backed by the kind of design and engineering most businesses never get access to.',
  points: [
    {
      title: 'frontier tools. proven practice.',
      body: 'We build with the newest design, engineering, and AI tools, and the practices that hold up for years. Your site runs like software you keep improving, not a template you are stuck with.',
    },
    {
      title: 'one team across every channel.',
      body: 'Website, search, content, ads, and analytics come from the same people who know your business, so every piece makes the others work harder.',
    },
    {
      title: 'the tech, handled.',
      body: 'We carry the tech and the marketing so they stop being the thing you worry about, and you get back to the part of your business you love.',
    },
  ],
} as const

export default function WorkWithPrism() {
  return (
    <Section aria-labelledby="work-with-prism-title" className="pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <Reveal className="lg:col-span-5">
          <SectionHeader
            id="work-with-prism-title"
            eyebrow={WORK_WITH_PRISM.eyebrow}
            title={WORK_WITH_PRISM.title}
            description={WORK_WITH_PRISM.description}
          />
        </Reveal>

        <Reveal delay={90} className="lg:col-span-7">
          <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {WORK_WITH_PRISM.points.map((point, index) => (
              <li
                key={point.title}
                className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:py-8"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tabular-nums text-subtle sm:pt-1.5"
                >
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-heading text-foreground">{point.title}</h3>
                  <p className="mt-3 max-w-[56ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
