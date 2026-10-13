import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Check, Search, Sparkles } from 'lucide-react'

import {
  CURRENT_CASE_STUDIES,
  getVerifiedMetric,
} from '@/components/case-studies/work-index'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader, SplitTitle } from '@/components/prism/section'
import { CASE_STUDY_FRAMING, TWO_PROBLEMS } from '@/lib/case-study-framing'
import { cn } from '@/lib/utils'

/**
 * Three examples per problem, picked to span different markets so the
 * point lands: the market changes, the problem does not. Search metrics
 * only appear where the study publishes a verified one.
 */
const EXAMPLES = {
  found: ['belize-kids-foundation', 'dr-christopher-wong', 'rebellious-aging'],
  chosen: ['olympic-bootworks', 'waikiki-dental', 'leadership-retreat'],
} as const

const current = new Map(CURRENT_CASE_STUDIES.map((study) => [study.slug, study]))

function examplesFor(key: keyof typeof EXAMPLES) {
  return EXAMPLES[key].flatMap((slug) => {
    const study = current.get(slug)
    const framing = CASE_STUDY_FRAMING[slug]
    if (!study || !framing) return []
    const metric = key === 'found' ? getVerifiedMetric(study) : undefined
    return [{ slug, client: study.client, who: framing.who, metric }]
  })
}

const audiences = CURRENT_CASE_STUDIES.flatMap((study) => {
  const framing = CASE_STUDY_FRAMING[study.slug]
  return framing ? [{ slug: study.slug, who: framing.who, client: study.client }] : []
})

/**
 * "The pattern" on /case-studies: a rail of who each client needed to
 * reach (all different), then the two problems they shared (be found, be
 * chosen) as one split panel with what Prism builds for each and three
 * clients from different markets as examples.
 */
export default function WorkPattern() {
  const halves = [
    { key: 'found', icon: Search, ...TWO_PROBLEMS.found, examples: examplesFor('found') },
    { key: 'chosen', icon: Sparkles, ...TWO_PROBLEMS.chosen, examples: examplesFor('chosen') },
  ] as const

  return (
    <Section
      id="the-pattern"
      aria-labelledby="work-pattern-title"
      className="pb-8 pt-16 sm:pb-10 sm:pt-24"
    >
      <Reveal>
        <SectionHeader
          id="work-pattern-title"
          eyebrow="The pattern"
          title={<SplitTitle text="be found. be chosen." />}
          description="Every business here sells something different to someone different. Every one needed the same two things, and we build both with the same frontier design and engineering."
        />
      </Reveal>

      {audiences.length > 0 ? (
        <Reveal delay={60} className="-mx-5 mt-12 sm:mx-0 sm:mt-14">
          <Marquee
            label="Who our clients needed to reach"
            duration={70}
            gap="0.75rem"
          >
            {audiences.map((item) => (
              <span
                key={item.slug}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-foreground"
              >
                {item.who}
                <span className="text-[12px] text-subtle">{item.client}</span>
              </span>
            ))}
          </Marquee>
        </Reveal>
      ) : null}

      <Reveal delay={120} className="mt-6 sm:mt-8">
        <ol className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] md:grid-cols-2">
          {halves.map((half, index) => {
            const Icon = half.icon
            return (
              <li
                key={half.key}
                className={cn(
                  'flex flex-col gap-6 p-6 sm:p-8 lg:p-10',
                  index === 1 &&
                    'border-t border-white/[0.06] md:border-l md:border-t-0',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <span className="font-mono text-xs tabular-nums text-subtle">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-heading text-foreground">{half.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {half.problem}
                  </p>
                </div>

                <div>
                  <p className="text-eyebrow text-subtle">What we build</p>
                  <ul className="mt-3 grid gap-2.5">
                    {half.builds.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-foreground">
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {half.examples.length > 0 ? (
                  <div className="mt-auto border-t border-white/[0.06] pt-5">
                    <p className="text-eyebrow text-subtle">Three markets, same problem</p>
                    <ul className="mt-2 divide-y divide-white/[0.06]">
                      {half.examples.map((example) => (
                        <li key={example.slug}>
                          <Link
                            href={`/case-studies/${example.slug}`}
                            className="group/example flex min-h-12 items-center justify-between gap-4 py-2.5 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                          >
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-foreground">
                                {example.client}
                              </span>
                              <span className="block text-[13px] text-subtle">
                                {example.who}
                              </span>
                            </span>
                            <span className="flex shrink-0 items-center gap-3">
                              {example.metric ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums text-foreground">
                                  <BadgeCheck
                                    aria-hidden="true"
                                    className="size-3.5 text-subtle"
                                  />
                                  {example.metric.value}
                                  <span className="sr-only">
                                    {' '}
                                    {example.metric.label}, {example.metric.sourceName}
                                  </span>
                                </span>
                              ) : null}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 text-subtle transition-[transform,color] duration-300 group-hover/example:-translate-y-0.5 group-hover/example:translate-x-0.5 group-hover/example:text-foreground"
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </Reveal>
    </Section>
  )
}
