import { HOMEPAGE_HOW_IT_WORKS } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader, SplitTitle } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'

const STEP_COLORS = [
  'var(--spectrum-red)',
  'var(--spectrum-green)',
  'var(--spectrum-violet)',
]

export default function HomeHowToGetIn() {
  return (
    <Section id="how-it-works" aria-labelledby="home-how-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <SectionHeader
            id="home-how-title"
            eyebrow={HOMEPAGE_HOW_IT_WORKS.eyebrow}
            title={<SplitTitle text={HOMEPAGE_HOW_IT_WORKS.title} />}
          />
        </Reveal>
        <Reveal
          delay={100}
          className="flex flex-col items-start gap-3 lg:items-end"
        >
          <WaitlistButton location="homepage how it works" />
          <p className="text-[13px] text-subtle">
            Next intake: <WaitlistIntakeMonth />
          </p>
        </Reveal>
      </div>

      <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
        <span
          aria-hidden="true"
          className="absolute left-[16.6%] right-[16.6%] top-[3.25rem] hidden h-px bg-[linear-gradient(90deg,var(--spectrum-red),var(--spectrum-yellow),var(--spectrum-green),var(--spectrum-blue),var(--spectrum-violet))] opacity-60 md:block"
        />
        {HOMEPAGE_HOW_IT_WORKS.steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 110} className="h-full">
              <div
                data-home-step=""
                className="relative flex h-full flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-card p-6 sm:p-7 md:items-center md:text-center"
              >
                <span
                  className="relative grid size-11 place-items-center rounded-full border border-white/12 bg-background font-mono text-sm font-medium text-foreground"
                  style={{
                    boxShadow: `0 0 0 4px var(--card), 0 0 24px -2px ${STEP_COLORS[index]}`,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-heading mt-2 text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-[34ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
