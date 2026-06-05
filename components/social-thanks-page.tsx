'use client'

import Image from 'next/image'
import Link from 'next/link'

import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { LOGO_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { trackCTAClick, trackExternalLinkClick } from '@/utils/analytics'

type Channel = {
  label: string
  handle: string
  href: string
}

type SocialThanksPageProps = {
  channel: Channel
}

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@the_design_prism'
const MARBLE_APP_STORE_URL =
  'https://apps.apple.com/us/app/marble-fit/id6757725234'
const BECOME_A_CLIENT_PATH = '/get-started'
const WALL_OF_LOVE_PATH = '/wall-of-love'

// Shared premium hover language from the core CTA system: a gentle lift, a
// warm gold-tinted glow (#d8bc79), and the site's signature easing curve.
const actionCardBaseClassName =
  'group flex min-h-[4.5rem] w-full items-center gap-4 rounded-xl border px-5 py-4 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none'

const quietActionCardClassName = cn(
  actionCardBaseClassName,
  'border-white/12 bg-white/[0.03] hover:border-[#d8bc79]/35 hover:bg-white/[0.06] hover:shadow-[0_24px_48px_-30px_rgba(216,188,121,0.5)]',
)

const primaryActionCardClassName = cn(
  actionCardBaseClassName,
  'border-[#f5f0e8]/70 bg-[#f5f0e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_40px_-26px_rgba(245,240,232,0.72)] hover:border-white hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_30px_60px_-26px_rgba(216,188,121,0.45),0_22px_44px_-24px_rgba(245,240,232,0.85)]',
)

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 352.28 398.67"
      aria-hidden="true"
      focusable="false"
      className={cn('h-5 w-auto fill-current', className)}
    >
      <path d="M137.17 156.98v-15.56c-5.34-.73-10.76-1.18-16.29-1.18C54.23 140.24 0 194.47 0 261.13c0 40.9 20.43 77.09 51.61 98.97-20.12-21.6-32.46-50.53-32.46-82.31 0-65.7 52.69-119.28 118.03-120.81Z" />
      <path d="M140.02 333c29.74 0 54-23.66 55.1-53.13l.11-263.2h48.08c-1-5.41-1.55-10.97-1.55-16.67h-65.67l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-9.24 0-17.95-2.31-25.61-6.34C105.3 323.9 121.6 333 140.02 333ZM333.13 106V91.37c-18.34 0-35.43-5.45-49.76-14.8 12.76 14.65 30.09 25.22 49.76 29.43Z" />
      <path d="M283.38 76.57c-13.98-16.05-22.47-37-22.47-59.91h-17.59c4.63 25.02 19.48 46.49 40.06 59.91ZM120.88 205.92c-30.44 0-55.21 24.77-55.21 55.21 0 21.2 12.03 39.62 29.6 48.86-6.55-9.08-10.45-20.18-10.45-32.2 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-67.05c-5.34-.73-10.76-1.18-16.29-1.18-.96 0-1.9.05-2.85.07v51.49c-5.16-1.61-10.61-2.55-16.29-2.55Z" />
      <path d="M333.13 106v51.04c-34.05 0-65.61-10.89-91.37-29.38v133.47c0 66.66-54.23 120.88-120.88 120.88-25.76 0-49.64-8.12-69.28-21.91 22.08 23.71 53.54 38.57 88.42 38.57 66.66 0 120.88-54.23 120.88-120.88V144.33c25.76 18.49 57.32 29.38 91.37 29.38v-65.68c-6.57 0-12.97-.71-19.14-2.03Z" />
      <path d="M241.76 261.13V127.66c25.76 18.49 57.32 29.38 91.37 29.38V106c-19.67-4.21-37-14.77-49.76-29.43-20.58-13.42-35.43-34.88-40.06-59.91h-48.08l-.11 263.2c-1.1 29.47-25.36 53.13-55.1 53.13-18.42 0-34.72-9.1-44.75-23.01-17.57-9.25-29.6-27.67-29.6-48.86 0-30.44 24.77-55.21 55.21-55.21 5.68 0 11.13.94 16.29 2.55v-51.49C71.83 158.5 19.14 212.08 19.14 277.78c0 31.78 12.34 60.71 32.46 82.31C71.23 373.87 95.12 382 120.88 382c66.65 0 120.88-54.23 120.88-120.88Z" />
    </svg>
  )
}

function YouTubeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 180"
      preserveAspectRatio="xMidYMid"
      aria-hidden="true"
      focusable="false"
      className={cn('h-4 w-auto', className)}
    >
      <path
        fill="red"
        d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
      />
      <path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
    </svg>
  )
}

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 814 1000"
      aria-hidden="true"
      focusable="false"
      className={cn('h-[1.05rem] w-auto fill-current', className)}
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

type ActionTone = 'quiet' | 'primary'

type ActionCardProps = {
  title: string
  detail: string
  href: string
  external?: boolean
  tone?: ActionTone
  location: string
  icon: React.ReactNode
}

function ActionCard({
  title,
  detail,
  href,
  external = false,
  tone = 'quiet',
  location,
  icon,
}: ActionCardProps) {
  const label = title.toLowerCase()
  const isPrimary = tone === 'primary'

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={() => {
        if (external) {
          trackExternalLinkClick(href, label)
        } else {
          trackCTAClick(label, location)
        }
      }}
      data-cta-text={label}
      data-cta-location={location}
      className={isPrimary ? primaryActionCardClassName : quietActionCardClassName}
    >
      <span
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-lg border',
          isPrimary
            ? 'border-black/10 bg-black/[0.04] text-[#050505]'
            : 'border-white/12 bg-white/[0.04] text-[#f5f0e8]',
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-[0.97rem] font-medium tracking-[-0.01em]',
            isPrimary ? 'text-[#050505]' : 'text-[#f5f0e8]',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'mt-1 block font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em]',
            isPrimary ? 'text-[#050505]/55' : 'text-[#8f877b]',
          )}
        >
          {detail}
        </span>
      </span>
      <PixelishIcon
        src="/pixelish/arrow-right.svg"
        alt=""
        size={12}
        aria-hidden="true"
        invert={!isPrimary}
        className={cn(
          'shrink-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none',
          isPrimary ? 'opacity-60' : 'opacity-50 group-hover:opacity-100',
        )}
      />
    </Link>
  )
}

export default function SocialThanksPage({ channel }: SocialThanksPageProps) {
  const platform = channel.label.toLowerCase()
  const headerLocation = `${platform} landing header`
  const actionsLocation = `${platform} landing actions`

  return (
    <div className="flex min-h-dvh flex-col bg-black text-[#f5f0e8]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        <header className="flex items-center justify-between gap-4 py-5">
          <Link
            href="/"
            aria-label="Prism home"
            data-cta-text="prism home"
            data-cta-location={headerLocation}
            className="inline-flex min-w-0 items-center gap-3 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/12 bg-white">
              <Image
                src={LOGO_CONFIG.src}
                alt=""
                width={40}
                height={40}
                className={`h-full w-full object-contain ${LOGO_CONFIG.className}`}
                priority
              />
            </span>
            <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.22em]">
              prism
            </span>
          </Link>

          <Link
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-text={`${platform} profile`}
            data-cta-location={headerLocation}
            onClick={() =>
              trackExternalLinkClick(channel.href, `${platform} profile`)
            }
            className="max-w-[46vw] truncate font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f877b] transition-colors hover:text-[#f5f0e8] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:max-w-none"
          >
            {channel.handle}
          </Link>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col justify-center py-14"
        >
          <span
            aria-hidden="true"
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-white/[0.04]"
          >
            {platform === 'tiktok' ? (
              <TikTokGlyph />
            ) : (
              <PixelishIcon
                src="/pixelish/socials-instagram.svg"
                alt=""
                size={20}
              />
            )}
          </span>

          {/* Heading font, size, tracking, and balance come from the global
              pixel heading voice in app/globals.css (main h1 rules). */}
          <h1 className="mt-8">
            Thanks for supporting us on {channel.label}
          </h1>

          <p className="mt-4 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.22em] text-[#8f877b]">
            where to next
          </p>

          <nav
            aria-label={`${channel.label} page actions`}
            className="mt-10 grid gap-3"
          >
            <ActionCard
              title="Go deeper on YouTube"
              detail="prism guides for founders"
              href={YOUTUBE_CHANNEL_URL}
              external
              location={actionsLocation}
              icon={<YouTubeGlyph />}
            />
            <ActionCard
              title="Download Marble for iOS"
              detail="track workout progress"
              href={MARBLE_APP_STORE_URL}
              external
              location={actionsLocation}
              icon={<AppleGlyph />}
            />
            <ActionCard
              title="See the Wall of Love"
              detail="kind words from clients"
              href={WALL_OF_LOVE_PATH}
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/emoji-heart.svg"
                  alt=""
                  size={15}
                  aria-hidden="true"
                />
              }
            />
            <ActionCard
              title="Become a client"
              detail="start with a free audit"
              href={BECOME_A_CLIENT_PATH}
              tone="primary"
              location={actionsLocation}
              icon={
                <PixelishIcon
                  src="/pixelish/lens-plus.svg"
                  alt=""
                  size={15}
                  aria-hidden="true"
                  invert={false}
                />
              }
            />
          </nav>
        </main>

        <footer className="border-t border-white/12 py-5 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.22em] text-[#8f877b]">
          © prism
        </footer>
      </div>
    </div>
  )
}
