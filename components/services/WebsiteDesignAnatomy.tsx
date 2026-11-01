import type { CSSProperties } from 'react'
import Image from 'next/image'
import { Menu, Phone as PhoneIcon, Star } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { cn } from '@/lib/utils'

import styles from './website-design-anatomy.module.css'

/**
 * The four design principles on /website-design. Each number matches a pin
 * on the drawn page beside it, so the list reads as annotations on a layout.
 */
export const WEBSITE_DESIGN_PRINCIPLES = [
  {
    title: 'say it on the first screen.',
    body: 'What you do, who it is for, and how to reach you, visible before anyone scrolls.',
  },
  {
    title: 'put proof where people decide.',
    body: 'Reviews, real photos, and credentials sit beside the buttons, not on a page nobody opens.',
  },
  {
    title: 'keep it light enough to load fast.',
    body: 'Images, fonts, and motion are tuned so the design shows up quickly on any connection.',
  },
  {
    title: 'make the next step obvious.',
    body: 'Every page leads to a call, a booking, or an inquiry, kept within thumb reach on phones.',
  },
] as const

function Pin({
  n,
  className,
  style,
}: {
  n: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <span className={cn(styles.pin, className)} style={style}>
      {n}
    </span>
  )
}

function Bar({ width, className }: { width: string; className?: string }) {
  return <span className={cn(styles.bar, className)} style={{ width }} />
}

function Stars() {
  return (
    <span className={styles.stars}>
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className={styles.star} strokeWidth={0} />
      ))}
    </span>
  )
}

/** Centres a pin on a line box of `lineHeight` design pixels. */
const onLine = (lineHeight: number, offset = 0): CSSProperties => ({
  top: `calc(${offset + lineHeight / 2} * var(--u) - 11px)`,
})

const centred: CSSProperties = { top: '50%', marginTop: -11 }

const HEADLINE = 'Family dentistry, without the nerves.'
const PROOF = 'Loved by local families'

/**
 * A drawn practice website (made up, no client data): the desktop page in a
 * browser window and its phone version straddling the window's edge, each
 * principle pinned to the part of the page it shapes. Real words sit only on
 * what the pins point at; everything else is filler. Narrow columns show the
 * phone alone with all four pins. Decorative to assistive tech; the ordered
 * list carries the content.
 */
function PageAnatomy() {
  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <div aria-hidden="true" className={styles.figure}>
        <div className={styles.stage}>
          <div className={styles.window}>
            <div className={styles.chrome}>
              <span className={styles.light} />
              <span className={styles.light} />
              <span className={styles.light} />
              <span className={styles.url}>yourpractice.com</span>
            </div>
            <div className={styles.site}>
              <div className={styles.nav}>
                <span className={cn(styles.bar, styles.wordmark)} />
                <span className={styles.navLinks}>
                  <Bar width="calc(30 * var(--u))" />
                  <Bar width="calc(26 * var(--u))" />
                  <Bar width="calc(34 * var(--u))" />
                </span>
              </div>

              <div className={styles.hero}>
                <Pin n={1} className={styles.pinGutter} style={onLine(23.5, 26)} />
                <p className={styles.headline}>{HEADLINE}</p>
                <div className={styles.lines}>
                  <Bar width="92%" />
                  <Bar width="64%" />
                </div>
                <div className={styles.actions}>
                  <span className={cn(styles.button, styles.buttonPrimary)}>
                    Book a visit
                  </span>
                  <span className={cn(styles.button, styles.buttonSecondary)}>
                    <PhoneIcon className={styles.icon} />
                    Call us
                  </span>
                </div>
                <div className={styles.proof}>
                  <Pin n={2} className={styles.pinGutter} style={centred} />
                  <Stars />
                  {PROOF}
                </div>
              </div>

              <div className={styles.cards}>
                <Pin n={3} className={styles.pinGutter} style={onLine(24)} />
                {CARDS.map((card) => (
                  <div key={card.label} className={styles.card}>
                    <Image
                      src={card.src}
                      alt=""
                      fill
                      sizes="160px"
                      className={styles.photo}
                    />
                    <span className={styles.cardLabel}>{card.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.more}>
                <Bar width="38%" />
                <Bar width="86%" />
                <Bar width="72%" />
              </div>
            </div>
          </div>

          <div className={styles.phone}>
            <div className={styles.phoneBody}>
              <div className={styles.screen}>
                <span className={styles.island} />
                <div className={styles.phoneNav}>
                  <span className={cn(styles.bar, styles.wordmark)} />
                  <Menu className={styles.menu} strokeWidth={2} />
                </div>
                <div className={styles.phoneContent}>
                  <p className={styles.phoneHeadline}>
                    <Pin
                      n={1}
                      className={cn(styles.pinPhone, styles.compactOnly)}
                      style={onLine(18.8)}
                    />
                    {HEADLINE}
                  </p>
                  <div className={styles.phoneProof}>
                    <Pin
                      n={2}
                      className={cn(styles.pinPhone, styles.compactOnly)}
                      style={centred}
                    />
                    <Stars />
                    Loved by families
                  </div>
                  <div className={styles.phonePhotoWrap}>
                    <Pin
                      n={3}
                      className={cn(styles.pinPhone, styles.compactOnly)}
                      style={centred}
                    />
                    <div className={styles.phonePhoto}>
                      <Image
                        src="/illustrations/website-design/practice-room.webp"
                        alt=""
                        fill
                        sizes="240px"
                        className={styles.photo}
                      />
                    </div>
                  </div>
                  <div className={styles.phoneLines}>
                    <Bar width="90%" />
                    <Bar width="58%" />
                  </div>
                  <div className={styles.phoneTiles}>
                    <span className={styles.phoneTile} />
                    <span className={styles.phoneTile} />
                  </div>
                </div>
                <div className={styles.callBar}>
                  <Pin n={4} className={styles.pinCallBar} style={centred} />
                  <span className={cn(styles.button, styles.buttonSecondary)}>
                    <PhoneIcon className={styles.icon} />
                    Call
                  </span>
                  <span className={cn(styles.button, styles.buttonPrimary)}>
                    Book a visit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] text-subtle">
        Illustrative page layout
      </figcaption>
    </figure>
  )
}

const CARDS = [
  { label: 'Cleanings', src: '/illustrations/website-design/cleanings.webp' },
  { label: 'Aligners', src: '/illustrations/website-design/aligners.webp' },
] as const

export function WebsiteDesignAnatomy() {
  return (
    <Section aria-labelledby="website-design-principles-title">
      <Reveal>
        <div className="relative isolate grid gap-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div
            aria-hidden="true"
            className="bg-dots absolute inset-0 -z-10 opacity-50"
          />
          <div
            aria-hidden="true"
            className="absolute -left-32 top-1/3 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent)] blur-2xl"
          />
          <div className="flex flex-col gap-8">
            <SectionHeader
              id="website-design-principles-title"
              eyebrow="Design principles"
              title="every design choice has a job."
              description="Good website design is not decoration. Each decision on the page helps a visitor understand you, trust you, and reach out."
              titleClassName="max-w-[15ch]"
            />
            <ol className="flex flex-col gap-5">
              {WEBSITE_DESIGN_PRINCIPLES.map((principle, index) => (
                <li key={principle.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[11px] font-semibold text-background"
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
                      {principle.title}
                    </h3>
                    <p className="max-w-[46ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <PageAnatomy />
        </div>
      </Reveal>
    </Section>
  )
}

export default WebsiteDesignAnatomy
