import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section } from '@/components/prism/section'

/**
 * Every fact here comes from the timeline in components/scrolling-timeline.tsx
 * or the about copy. Do not add numbers that are not on the timeline.
 */
const FACTS = [
  {
    value: '2',
    label: 'Apple internships',
    detail: 'Find My, AirPlay, and more. 2020 and 2021.',
  },
  {
    value: 'D1',
    label: 'track and field',
    detail: 'Cal Poly, then a B.S. in engineering in 2022.',
  },
  {
    value: 'May 2023',
    label: 'went pro, started Prism',
    detail: 'Left the full-time job and burned the ships.',
  },
  {
    value: 'LA 2028',
    label: 'the next bar',
    detail: 'Pole vaulting for the Philippines.',
  },
] as const

export function AboutManifesto() {
  return (
    <Section aria-labelledby="motto-title" className="pt-4 sm:pt-8">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-40 mask-fade-b" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(60%_80%_at_50%_0%,color-mix(in_oklch,var(--spectrum-violet)_14%,transparent),transparent_70%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-[12%] top-0 h-px bg-spectrum opacity-70" />

        <div className="flex flex-col items-center px-6 pb-12 pt-16 text-center sm:px-12 sm:pb-16 sm:pt-24">
          <Eyebrow>the prism motto</Eyebrow>
          <Reveal>
            <h2
              id="motto-title"
              className="text-display mt-7 max-w-[12ch] text-balance pb-2"
            >
              <span className="text-gradient">impossible is </span>
              <span className="text-spectrum prism-spectrum-pan">temporary.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lead mx-auto mt-7 max-w-[40ch] text-pretty text-muted-foreground">
              In March 2015, at his first pole vault competition, Enzo didn&apos;t
              clear the bar. Eight years later, he went pro. That is the whole
              idea behind Prism.
            </p>
          </Reveal>
        </div>

        <dl className="grid grid-cols-2 border-t border-white/[0.08] lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 80}
              className="flex flex-col gap-2 border-white/[0.08] p-6 even:border-l sm:p-8 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0"
            >
              <dt className="order-2 text-[15px] font-medium text-foreground">{fact.label}</dt>
              <dd className="order-1 text-[2rem] font-semibold leading-none tracking-[-0.045em] text-foreground sm:text-[2.6rem]">
                {fact.value}
              </dd>
              <dd className="order-3 text-[13px] leading-5 text-subtle">{fact.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  )
}

export default AboutManifesto
