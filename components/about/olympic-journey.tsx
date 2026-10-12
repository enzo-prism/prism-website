import PoleVaultCarousel from '@/components/pole-vault-carousel'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section } from '@/components/prism/section'

/** Milestones from the about timeline (components/scrolling-timeline.tsx). */
const MILESTONES = [
  { date: 'March 2015', text: 'First pole vault competition. Did not clear the bar.' },
  { date: 'March 2023', text: 'First Philippine National Track and Field Championship.' },
  { date: 'May 2023', text: 'Signed the contract and went pro.' },
] as const

export function OlympicJourney() {
  return (
    <Section id="olympic-journey" aria-labelledby="olympic-journey-title">
      <div className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-10">
        <div className="flex flex-col items-start lg:col-start-1 lg:row-start-1 lg:self-end">
          <Eyebrow>the other job</Eyebrow>
          <h2
            id="olympic-journey-title"
            className="text-title text-gradient mt-5 max-w-[12ch] text-balance pb-1"
          >
            Olympic journey.
          </h2>
          <p className="text-lead mt-5 max-w-[36ch] text-pretty text-muted-foreground">
            Pole vaulting for the Philippines on the path to LA 2028.
          </p>
        </div>

        <Reveal className="w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <PoleVaultCarousel />
        </Reveal>

        <ol className="w-full max-w-md border-t border-white/[0.08] lg:col-start-1 lg:row-start-2 lg:self-start">
          {MILESTONES.map((milestone) => (
            <li
              key={milestone.date}
              className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-white/[0.08] py-4"
            >
              <span className="font-mono text-xs text-subtle">{milestone.date}</span>
              <span className="text-[15px] text-foreground/90">{milestone.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export default OlympicJourney
