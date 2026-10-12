import { ChartLine, Cog, Palette } from 'lucide-react'

import { LandingHero } from '@/components/landing/landing-hero'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'

const SERVICES = [
  {
    icon: Palette,
    title: 'design systems that convert',
    desc: 'Landing pages, flows, and brand systems that turn attention into leads.',
  },
  {
    icon: Cog,
    title: 'software engineering',
    desc: 'Custom apps and automations that personalize and remove friction.',
  },
  {
    icon: ChartLine,
    title: 'data analysis & experimentation',
    desc: 'Instrumentation, dashboards, and tests to lift conversion and LTV.',
  },
] as const

const OUTCOMES = ['More qualified leads', 'Higher conversion rates', 'Stronger LTV'] as const

/** /smb body: hero plus the three-part Prism stack (server rendered). */
export default function SMBClientPage() {
  return (
    <>
      <LandingHero
        location="smb hero"
        eyebrow="Small business AI"
        title="design, software, and data: accelerated by AI."
        description="We design, engineer, and analyze systems that grow leads, improve conversion, and increase lifetime value."
        secondary={{ label: 'Learn how it works', href: '/prism-flywheel' }}
        glow="violet"
      >
        <ul className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {OUTCOMES.map((outcome) => (
            <li
              key={outcome}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-muted-foreground"
            >
              {outcome}
            </li>
          ))}
        </ul>
      </LandingHero>

      <Section aria-labelledby="smb-services-title" className="pt-4 sm:pt-6">
        <SectionHeader
          id="smb-services-title"
          eyebrow="Services we deliver"
          title="the Prism stack."
          description="Design, software engineering, and data analysis, implemented and measured with you."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {SERVICES.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 80}>
                <SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-heading text-foreground">{item.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-7 text-muted-foreground">{item.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </>
  )
}
