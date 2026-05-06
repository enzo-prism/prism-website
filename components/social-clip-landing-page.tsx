'use client'

import Link from 'next/link'

import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { trackCTAClick, trackExternalLinkClick } from '@/utils/analytics'

type Channel = {
  label: string
  handle: string
  href: string
  iconSrc: string
}

type LandingAction = {
  label: string
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
  otherChannel: Channel
  hiddenSectionDetailIds?: string[]
  headerLabel?: string
  title?: string
  description?: string
  metaLine?: string
  actionLinks?: readonly LandingAction[]
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

function CreditSection({ section }: { section: CreditSection }) {
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
      <CreditList credits={section.credits} />
    </section>
  )
}

function ChannelLink({
  href,
  iconSrc,
  label,
  location,
}: {
  href: string
  iconSrc: string
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
        trackCTAClick(label, location)
        if (external) {
          trackExternalLinkClick(href, label)
        }
      }}
      data-cta-text={label}
      data-cta-location={location}
      className="group inline-flex min-h-10 items-center gap-3 border border-border px-3 font-mono text-[10px] uppercase tracking-normal text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <PixelishIcon
        src={iconSrc}
        alt=""
        size={14}
        aria-hidden="true"
        className="opacity-70 transition-opacity group-hover:opacity-100"
      />
      <span>{label}</span>
    </Link>
  )
}

export default function SocialClipLandingPage({
  channel,
  otherChannel,
  hiddenSectionDetailIds = [],
  headerLabel = 'Prism credits',
  title = 'credit roll.',
  description = 'A minimal public list for the business builders and athletes whose clips help Prism teach founders how to grow successful companies.',
  metaLine = '120 names. public clips. credit, not endorsement.',
  actionLinks,
}: SocialClipLandingPageProps) {
  const visibleCreditSections = creditSections.map((section) =>
    hiddenSectionDetailIds.includes(section.id)
      ? { ...section, detail: undefined }
      : section,
  )
  const visibleActions = actionLinks ?? [
    {
      label: channel.label,
      href: channel.href,
      iconSrc: channel.iconSrc,
    },
    {
      label: otherChannel.label,
      href: otherChannel.href,
      iconSrc: otherChannel.iconSrc,
    },
    {
      label: 'home',
      href: '/',
      iconSrc: '/pixelish/house.svg',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
          <Link
            href="/"
            aria-label="Prism home"
            onClick={() => trackCTAClick('prism home', `${channel.label.toLowerCase()} landing header`)}
            data-cta-text="prism home"
            data-cta-location={`${channel.label.toLowerCase()} landing header`}
            className="inline-flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <PixelIconFrame iconSrc={channel.iconSrc} size={16} />
            <span className="truncate font-mono text-[10px] uppercase tracking-normal">
              {headerLabel}
            </span>
          </Link>

          <Link
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCTAClick(channel.handle, `${channel.label.toLowerCase()} landing header`)
              trackExternalLinkClick(channel.href, channel.handle)
            }}
            data-cta-text={channel.handle}
            data-cta-location={`${channel.label.toLowerCase()} landing header`}
            className="max-w-[46vw] truncate font-mono text-[10px] uppercase tracking-normal text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:max-w-none"
          >
            {channel.handle}
          </Link>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 py-14 sm:py-20">
          <section aria-labelledby="social-clips-title" className="max-w-4xl">
            <h1
              id="social-clips-title"
              className="max-w-[9ch] text-6xl font-medium leading-[0.9] tracking-normal sm:text-7xl"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="mt-5 max-w-2xl font-mono text-[10px] uppercase leading-5 tracking-normal text-muted-foreground">
              {metaLine}
            </p>
            <nav
              aria-label={`${channel.label} page actions`}
              className="mt-8 flex flex-wrap gap-2"
            >
              {visibleActions.map((action) => (
                <ChannelLink
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  iconSrc={action.iconSrc}
                  label={action.label}
                  location={`${channel.label.toLowerCase()} landing actions`}
                />
              ))}
            </nav>
          </section>

          <div className="mt-16 space-y-16 sm:mt-20">
            {visibleCreditSections.map((section) => (
              <CreditSection key={section.title} section={section} />
            ))}
          </div>
        </main>

        <footer className="flex flex-col gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-normal text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>sources</span>
            {sourceLinks.map((source) => (
              <Link
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackCTAClick(source.label, `${channel.label.toLowerCase()} landing sources`)
                  trackExternalLinkClick(source.href, source.label)
                }}
                data-cta-text={source.label}
                data-cta-location={`${channel.label.toLowerCase()} landing sources`}
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {source.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => trackCTAClick('contact', `${channel.label.toLowerCase()} landing footer`)}
            data-cta-text="contact"
            data-cta-location={`${channel.label.toLowerCase()} landing footer`}
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            contact
            <PixelishIcon
              src="/pixelish/arrow-right.svg"
              alt=""
              size={12}
              aria-hidden="true"
              className="opacity-70"
            />
          </Link>
        </footer>
      </div>
    </div>
  )
}
