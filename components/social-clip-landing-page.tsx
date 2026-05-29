'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { LOGO_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackExternalLinkClick } from '@/utils/analytics'

type Channel = {
  label: string
  handle: string
  href: string
  iconSrc: string
}

type Credit = {
  rank: number
  name: string
}

type CreditSection = {
  id: string
  title: string
  detail?: string
  iconSrc: string
  credits: Credit[]
}

type SocialClipLandingPageProps = {
  channel: Channel
  hiddenSectionDetailIds?: string[]
  headerLabel?: string
  title?: string
  description?: string
  metaLine?: string
}

const businessCredits: Credit[] = [
  { rank: 1, name: 'Elon Musk' },
  { rank: 2, name: 'Larry Page' },
  { rank: 3, name: 'Sergey Brin' },
  { rank: 4, name: 'Jeff Bezos' },
  { rank: 5, name: 'Mark Zuckerberg' },
  { rank: 6, name: 'Larry Ellison' },
  { rank: 7, name: 'Bernard Arnault & family' },
  { rank: 8, name: 'Jensen Huang' },
  { rank: 9, name: 'Warren Buffett' },
  { rank: 10, name: 'Amancio Ortega' },
  { rank: 11, name: 'Rob Walton & family' },
  { rank: 12, name: 'Jim Walton & family' },
  { rank: 13, name: 'Michael Dell' },
  { rank: 14, name: 'Alice Walton' },
  { rank: 15, name: 'Steve Ballmer' },
  { rank: 16, name: 'Carlos Slim Helú & family' },
  { rank: 17, name: 'Changpeng Zhao' },
  { rank: 18, name: 'Michael Bloomberg' },
  { rank: 19, name: 'Bill Gates' },
  { rank: 20, name: 'Françoise Bettencourt Meyers & family' },
  { rank: 21, name: 'Mukesh Ambani' },
  { rank: 22, name: 'Giancarlo Devasini' },
  { rank: 23, name: 'Thomas Peterffy' },
  { rank: 24, name: 'Julia Koch & family' },
  { rank: 25, name: 'Charles Koch & family' },
  { rank: 26, name: 'Zhang Yiming' },
  { rank: 27, name: 'Zhong Shanshan' },
  { rank: 28, name: 'Jeff Yass' },
  { rank: 29, name: 'Dieter Schwarz' },
  { rank: 30, name: 'Germán Larrea Mota Velasco & family' },
  { rank: 31, name: 'Gautam Adani' },
  { rank: 32, name: 'Tadashi Yanai & family' },
  { rank: 33, name: 'Ma Huateng' },
  { rank: 34, name: 'Robin Zeng' },
  { rank: 35, name: 'Iris Fontbona & family' },
  { rank: 36, name: 'Masayoshi Son' },
  { rank: 37, name: 'Ken Griffin' },
  { rank: 38, name: 'Jacqueline Mars' },
  { rank: 39, name: 'John Mars' },
  { rank: 40, name: 'Lukas Walton' },
  { rank: 41, name: 'Giovanni Ferrero' },
  { rank: 42, name: 'Li Ka-shing' },
  { rank: 43, name: 'Mark Mateschitz' },
  { rank: 44, name: 'Gianluigi Aponte' },
  { rank: 45, name: 'Rafaela Aponte-Diamant' },
  { rank: 46, name: 'Andrea Pignataro' },
  { rank: 47, name: 'Klaus-Michael Kühne' },
  { rank: 48, name: 'Thomas Frist Jr. & family' },
  { rank: 49, name: 'Alain Wertheimer' },
  { rank: 50, name: 'Gerard Wertheimer' },
  { rank: 51, name: 'Savitri Jindal & family' },
  { rank: 52, name: 'Stephen Schwarzman' },
  { rank: 53, name: 'Paolo Ardoino' },
  { rank: 54, name: 'Jean-Louis van der Velde' },
  { rank: 55, name: 'William Ding' },
  { rank: 56, name: 'Miriam Adelson & family' },
  { rank: 57, name: 'Alexey Mordashov & family' },
  { rank: 58, name: 'Colin Huang' },
  { rank: 59, name: 'Eduardo Saverin' },
  { rank: 60, name: 'Eric Schmidt' },
  { rank: 61, name: 'Idan Ofer' },
  { rank: 62, name: 'Eyal Ofer' },
  { rank: 63, name: 'Abigail Johnson' },
  { rank: 64, name: 'Zheng Shuliang & family' },
  { rank: 65, name: 'He Xiangjian & family' },
  { rank: 66, name: 'Marilyn Simons & family' },
  { rank: 67, name: 'Robert Pera' },
  { rank: 68, name: 'Phil Knight & family' },
  { rank: 69, name: 'Michal Strnad' },
  { rank: 70, name: 'Lakshmi Mittal' },
  { rank: 71, name: 'Elaine Marshall & family' },
  { rank: 72, name: 'Shiv Nadar' },
  { rank: 73, name: 'Henry Samueli' },
  { rank: 74, name: 'Melinda French Gates' },
  { rank: 75, name: 'Stefan Quandt' },
  { rank: 76, name: 'Reinhold Wuerth & family' },
  { rank: 77, name: 'Lyndal Stephens Greth & family' },
  { rank: 78, name: 'Len Blavatnik' },
  { rank: 79, name: 'Susanne Klatten' },
  { rank: 80, name: 'Vladimir Potanin' },
  { rank: 81, name: 'Vagit Alekperov' },
  { rank: 82, name: 'François Pinault & family' },
  { rank: 83, name: 'Jack Ma' },
  { rank: 84, name: 'MacKenzie Scott' },
  { rank: 85, name: 'Prajogo Pangestu' },
  { rank: 86, name: 'Aliko Dangote' },
  { rank: 87, name: 'Peter Thiel' },
  { rank: 88, name: 'Emmanuel Besnier' },
  { rank: 89, name: 'Leonid Mikhelson & family' },
  { rank: 90, name: 'Lei Jun' },
  { rank: 91, name: 'Andreas von Bechtolsheim & family' },
  { rank: 92, name: 'Daniel Gilbert' },
  { rank: 93, name: 'Pham Nhat Vuong' },
  { rank: 94, name: 'Vicky Safra & family' },
  { rank: 95, name: 'Jay Y. Lee' },
  { rank: 96, name: 'Cyrus Poonawalla' },
  { rank: 97, name: 'Rick Cohen & family' },
  { rank: 98, name: 'Israel Englander' },
  { rank: 99, name: 'Suleiman Kerimov & family' },
  { rank: 100, name: 'Dilip Shanghvi' },
]

const athleteCredits: Credit[] = [
  { rank: 1, name: 'Michael Phelps' },
  { rank: 2, name: 'Serena Williams' },
  { rank: 3, name: 'Lionel Messi' },
  { rank: 4, name: 'LeBron James' },
  { rank: 5, name: 'Tom Brady' },
  { rank: 6, name: 'Roger Federer' },
  { rank: 7, name: 'Simone Biles' },
  { rank: 8, name: 'Tiger Woods' },
  { rank: 9, name: 'Usain Bolt' },
  { rank: 10, name: 'Kobe Bryant' },
  { rank: 11, name: 'Novak Djokovic' },
  { rank: 12, name: 'Rafael Nadal' },
  { rank: 13, name: 'Cristiano Ronaldo' },
  { rank: 14, name: 'Stephen Curry' },
  { rank: 15, name: 'Katie Ledecky' },
  { rank: 16, name: 'Tim Duncan' },
  { rank: 17, name: "Shaquille O'Neal" },
  { rank: 18, name: 'Patrick Mahomes' },
  { rank: 19, name: 'Lewis Hamilton' },
  { rank: 20, name: 'Aaron Donald' },
]

const creditSections: CreditSection[] = [
  {
    id: 'business',
    title: 'founders + builders',
    detail: 'Forbes 2026 richest people',
    iconSrc: '/pixelish/briefcase.svg',
    credits: businessCredits,
  },
  {
    id: 'athletes',
    title: 'athletes',
    detail: 'ESPN athletes since 2000',
    iconSrc: '/pixelish/emoji-workout.svg',
    credits: athleteCredits,
  },
]

const sourceLinks = [
  {
    label: 'Forbes',
    href: 'https://forbes.co/editors-picks/los-mas-ricos-del-mundo-2026',
  },
  {
    label: 'ESPN',
    href: 'https://www.espn.com/espn/story/_/id/40446224/top-100-athletes-21st-century',
  },
] as const

function isExternalHref(href: string) {
  return href.startsWith('http')
}

function PixelIconFrame({
  iconSrc,
  size = 17,
}: {
  iconSrc: string
  size?: number
}) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-muted/30">
      <PixelishIcon src={iconSrc} alt="" size={size} aria-hidden="true" />
    </span>
  )
}

function PrismLogoFrame() {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-border bg-white">
      <Image
        src={LOGO_CONFIG.src}
        alt=""
        width={40}
        height={40}
        className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
        priority
      />
    </span>
  )
}

function CreditRow({ credit }: { credit: Credit }) {
  return (
    <li className="grid min-h-11 grid-cols-[3rem_minmax(0,1fr)] items-center border-t border-border/70 py-2.5">
      <span className="font-mono text-[10px] leading-none tracking-normal text-muted-foreground">
        {credit.rank.toString().padStart(3, '0')}
      </span>
      <span className="min-w-0 text-sm leading-5 text-foreground sm:text-[15px]">
        {credit.name}
      </span>
    </li>
  )
}

function CreditList({ credits }: { credits: Credit[] }) {
  return (
    <ol className="grid gap-x-8 border-b border-border/70 sm:grid-cols-2 lg:grid-cols-3">
      {credits.map((credit) => (
        <CreditRow key={`${credit.rank}-${credit.name}`} credit={credit} />
      ))}
    </ol>
  )
}

const CREDIT_COLLAPSE_THRESHOLD = 12

function CreditSection({ section }: { section: CreditSection }) {
  const [expanded, setExpanded] = useState(false)
  // The full lists are long; on phones (the primary audience here) we cap them
  // with a fade + "show all" so the page stays tight and premium. Desktop keeps
  // the complete list (lg:* removes the cap and hides the toggle).
  const collapsible = section.credits.length > CREDIT_COLLAPSE_THRESHOLD
  const capped = collapsible && !expanded

  return (
    <section aria-labelledby={`${section.id}-credits`} className="space-y-5">
      <div className="flex items-end justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <PixelIconFrame iconSrc={section.iconSrc} size={16} />
          <div className="min-w-0">
            <h2
              id={`${section.id}-credits`}
              className="text-xl font-medium leading-tight tracking-normal"
            >
              {section.title}
            </h2>
            {section.detail ? (
              <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-normal text-muted-foreground">
                {section.detail}
              </p>
            ) : null}
          </div>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase leading-none tracking-normal text-muted-foreground">
          {section.credits.length}
        </span>
      </div>

      <div
        className={cn(
          'relative',
          capped
            ? 'max-h-[24rem] overflow-hidden lg:max-h-none lg:overflow-visible'
            : null,
        )}
      >
        <CreditList credits={section.credits} />
        {capped ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/85 to-transparent lg:hidden"
          />
        ) : null}
      </div>

      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-border font-mono text-[10px] uppercase tracking-normal text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background active:bg-muted/40 lg:hidden"
        >
          <span>
            {expanded ? 'show less' : `show all ${section.credits.length}`}
          </span>
          <PixelishIcon
            src={
              expanded ? '/pixelish/arrow-up.svg' : '/pixelish/arrow-right.svg'
            }
            alt=""
            size={11}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      ) : null}
    </section>
  )
}

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@the_design_prism'

function YouTubeCta({ location }: { location: string }) {
  const label = 'watch on youtube'

  return (
    <Link
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackExternalLinkClick(YOUTUBE_CHANNEL_URL, label)}
      data-cta-text={label}
      data-cta-location={location}
      className="group inline-flex min-h-14 w-full items-center justify-center gap-4 border border-foreground bg-foreground px-5 font-mono text-[11px] uppercase tracking-normal text-background transition-colors hover:bg-transparent hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background active:translate-y-px sm:w-auto sm:justify-start"
    >
      <PixelishIcon
        src="/pixelish/socials-youtube.svg"
        alt=""
        size={16}
        aria-hidden="true"
        invert={false}
        className="transition-[filter,transform] group-hover:translate-x-1 group-hover:invert"
      />
      <span>{label}</span>
    </Link>
  )
}

const MARBLE_APP_STORE_URL =
  'https://apps.apple.com/us/app/marble-fit/id6757725234'

function AppStoreCta({ location }: { location: string }) {
  const label = 'download on the app store'

  return (
    <Link
      href={MARBLE_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackExternalLinkClick(MARBLE_APP_STORE_URL, label)}
      data-cta-text={label}
      data-cta-location={location}
      className="group inline-flex min-h-14 w-full items-center justify-center gap-4 border border-foreground bg-foreground px-5 font-mono text-[11px] uppercase tracking-normal text-background transition-colors hover:bg-transparent hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background active:translate-y-px sm:w-auto sm:justify-start"
    >
      <PixelishIcon
        src="/pixelish/logo-apple.svg"
        alt=""
        size={16}
        aria-hidden="true"
        invert={false}
        className="transition-[filter,transform] group-hover:translate-x-1 group-hover:invert"
      />
      <span>{label}</span>
    </Link>
  )
}

function MarbleAppCard() {
  const specs = [
    { label: 'platform', value: 'iPhone' },
    { label: 'category', value: 'Lifting tracker' },
    { label: 'designed by', value: 'Ex-Apple team' },
    { label: 'made by', value: 'Prism' },
  ]

  return (
    <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
      <div className="border border-border bg-muted/20 p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.15rem] border border-border bg-foreground shadow-[0_8px_30px_-12px_rgba(255,255,255,0.35)]">
            <PixelishIcon
              src="/pixelish/emoji-workout.svg"
              alt=""
              size={34}
              aria-hidden="true"
              invert={false}
            />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-medium leading-tight">Marble</p>
            <p className="mt-1 font-mono text-[10px] uppercase leading-none tracking-normal text-muted-foreground">
              health &amp; fitness
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px border border-border bg-border">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-black p-4">
              <dt className="font-mono text-[10px] uppercase leading-none tracking-normal text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="mt-2 text-sm leading-tight text-foreground">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function ProductsByPrism({ location }: { location: string }) {
  const features = [
    'ex-apple team',
    'built for iphone',
    'lifting tracker',
    'founders + athletes',
  ]

  return (
    <section
      aria-labelledby="products-by-prism-heading"
      className="mt-16 border-y border-border py-8 sm:mt-20"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase leading-5 tracking-normal text-muted-foreground">
            products by prism
          </p>
          <h2
            id="products-by-prism-heading"
            className="mt-3 text-3xl font-medium leading-tight tracking-normal sm:text-4xl"
          >
            Marble — the best lifting tracker on iPhone.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
            Designed and engineered by ex-Apple designers and engineers on the
            Prism team. Marble is the fastest, cleanest way to track every lift
            — built for the founders and athletes you study here.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-normal text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AppStoreCta location={location} />
          </div>
        </div>

        <MarbleAppCard />
      </div>
    </section>
  )
}

function SourceLink({
  href,
  label,
  location,
}: {
  href: string
  label: string
  location: string
}) {
  const external = isExternalHref(href)

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={() => {
        if (external) {
          trackExternalLinkClick(href, label)
        }
      }}
      data-cta-text={label}
      data-cta-location={location}
      className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {label}
    </Link>
  )
}

export default function SocialClipLandingPage({
  channel,
  hiddenSectionDetailIds = [],
  headerLabel = 'Prism',
  title = 'Why Not You',
  description = 'The frameworks, tools, and tactics used by top founders are out there. AI can help you put them to work. Decide to go for it.',
  metaLine = 'watch prism on youtube. learn the tools. build before you scale.',
}: SocialClipLandingPageProps) {
  const visibleCreditSections = creditSections.map((section) =>
    hiddenSectionDetailIds.includes(section.id)
      ? { ...section, detail: undefined }
      : section,
  )

  return (
    <div className="min-h-screen bg-black text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
          <Link
            href="/"
            aria-label="Prism home"
            data-cta-text="prism home"
            data-cta-location={`${channel.label.toLowerCase()} landing header`}
            className="inline-flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <PrismLogoFrame />
            <span className="truncate font-mono text-[10px] uppercase tracking-normal">
              {headerLabel}
            </span>
          </Link>

          <Link
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-text={`${channel.label.toLowerCase()} profile`}
            data-cta-location={`${channel.label.toLowerCase()} landing header`}
            onClick={() =>
              trackExternalLinkClick(
                channel.href,
                `${channel.label.toLowerCase()} profile`,
              )
            }
            className="max-w-[46vw] truncate font-mono text-[10px] uppercase tracking-normal text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:max-w-none"
          >
            {channel.handle}
          </Link>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 py-14 sm:py-20">
          <section aria-labelledby="social-clips-title" className="max-w-5xl">
            <h1
              id="social-clips-title"
              className="max-w-none text-5xl font-medium leading-[0.92] tracking-normal sm:text-7xl"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="mt-5 max-w-2xl font-mono text-[10px] uppercase leading-5 tracking-normal text-muted-foreground">
              {metaLine}
            </p>
            <nav aria-label={`${channel.label} page actions`} className="mt-8">
              <YouTubeCta
                location={`${channel.label.toLowerCase()} landing actions`}
              />
            </nav>
          </section>

          <ProductsByPrism
            location={`${channel.label.toLowerCase()} landing products`}
          />

          <div className="mt-16 space-y-16 sm:mt-20">
            <section
              aria-labelledby="studied-people-heading"
              className="border-y border-border py-8"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-end">
                <div>
                  <p className="font-mono text-[10px] uppercase leading-5 tracking-normal text-muted-foreground">
                    source material behind the clips
                  </p>
                  <h2
                    id="studied-people-heading"
                    className="mt-3 text-3xl font-medium leading-tight tracking-normal sm:text-4xl"
                  >
                    study the greats.
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  These lists are source material, not a scoreboard. Learn the
                  patterns, then use modern tools to build your own momentum.
                </p>
              </div>
            </section>
            {visibleCreditSections.map((section) => (
              <CreditSection key={section.title} section={section} />
            ))}
          </div>
        </main>

        <footer className="flex flex-col gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-normal text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>sources</span>
            {sourceLinks.map((source) => (
              <SourceLink
                key={source.href}
                href={source.href}
                label={source.label}
                location={`${channel.label.toLowerCase()} landing sources`}
              />
            ))}
          </div>
          <span>credit, not endorsement.</span>
        </footer>
      </div>
    </div>
  )
}
