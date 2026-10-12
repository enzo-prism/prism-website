import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import { HOMEPAGE_NUMBERS } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'

/** Verified proof band: two client search results and Prism's own reach. */
export default function HomeNumbers() {
  return (
    <Section aria-labelledby="home-numbers-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-end lg:gap-16">
        <Reveal>
          <SectionHeader
            id="home-numbers-title"
            eyebrow={HOMEPAGE_NUMBERS.eyebrow}
            title={HOMEPAGE_NUMBERS.title}
            description={HOMEPAGE_NUMBERS.description}
          />
        </Reveal>

        <Reveal delay={120}>
          <ul className="spectrum-rule grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
            {HOMEPAGE_NUMBERS.stats.map((stat, index) => (
              <li
                key={stat.label}
                className={[
                  'border-white/[0.07]',
                  index % 2 === 0 ? 'border-r' : '',
                  index < 2 ? 'border-b' : '',
                ].join(' ')}
              >
                <Link
                  data-home-stat=""
                  href={stat.href}
                  className="group/stat flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-white/[0.025] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-8"
                >
                  <span className="flex items-start justify-between gap-3">
                    <HomeCountUp
                      value={stat.value}
                      className="text-[clamp(2.4rem,1.6rem+3vw,4.25rem)] font-semibold leading-none tracking-[-0.055em] text-foreground tabular-nums"
                    />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/stat:-translate-y-0.5 group-hover/stat:translate-x-0.5 group-hover/stat:text-foreground"
                    />
                  </span>
                  <span className="max-w-[26ch] text-pretty text-[13px] leading-snug text-muted-foreground sm:text-[15px]">
                    {stat.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-pretty text-[12px] leading-relaxed text-subtle">
            {HOMEPAGE_NUMBERS.note}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
