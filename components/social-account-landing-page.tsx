import Image from 'next/image'
import Link from 'next/link'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { cn } from '@/lib/utils'

type SocialLandingLink = {
  label: string
  description: string
  href: string
  iconSrc: string
  highlight?: boolean
}

type SocialLandingStat = {
  value: string
  label: string
}

type SocialAccountLandingPageProps = {
  platform: 'Instagram' | 'TikTok'
  platformHandle: string
  platformUrl: string
  platformIconSrc: string
  eyebrow: string
  title: string
  description: string
  visualSrc: string
  visualAlt: string
  visualCaption: string
  stats: readonly SocialLandingStat[]
  links: readonly SocialLandingLink[]
  systemItems: readonly SocialLandingLink[]
}

function isExternalHref(href: string) {
  return href.startsWith('http')
}

function LinkRow({ item }: { item: SocialLandingLink }) {
  const external = isExternalHref(item.href)

  return (
    <Link
      href={item.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group flex min-h-[5.35rem] items-center gap-4 border-b border-white/12 py-4 transition-colors hover:border-white/28',
        item.highlight ? 'text-[#f5f0e8]' : 'text-[#c9c1b6]',
      )}
    >
      <span
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors',
          item.highlight
            ? 'border-[#f5f0e8]/40 bg-[#f5f0e8] text-black'
            : 'border-white/12 bg-white/[0.03] group-hover:border-white/24 group-hover:bg-white/[0.055]',
        )}
      >
        <PixelishIcon
          src={item.iconSrc}
          alt=""
          size={18}
          invert={!item.highlight}
          aria-hidden="true"
          className="h-4.5 w-4.5 opacity-85"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-[1rem] font-medium leading-tight tracking-[-0.02em] text-[#f5f0e8]">
          {item.label}
        </span>
        <span className="mt-1 block text-pretty font-sans text-[0.9rem] leading-6 text-[#8f877b]">
          {item.description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-[#8f877b] transition-transform group-hover:translate-x-1 group-hover:text-[#f5f0e8]"
      >
        →
      </span>
    </Link>
  )
}

export default function SocialAccountLandingPage({
  platform,
  platformHandle,
  platformUrl,
  platformIconSrc,
  eyebrow,
  title,
  description,
  visualSrc,
  visualAlt,
  visualCaption,
  stats,
  links,
  systemItems,
}: SocialAccountLandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-white/12 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className={coreRouteContainerClassName}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(18rem,0.64fr)] lg:items-center xl:gap-16">
              <div className="space-y-9">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2">
                  <PixelishIcon
                    src={platformIconSrc}
                    alt=""
                    size={18}
                    aria-hidden="true"
                    className="h-4 w-4 opacity-85"
                  />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[#b8afa2]">
                    {eyebrow}
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="max-w-[11ch] text-balance font-sans text-[clamp(2.45rem,7vw,5.35rem)] font-medium leading-[0.96] tracking-[-0.06em] text-[#f5f0e8]">
                    {title}
                  </h1>
                  <p className="max-w-[37rem] text-pretty font-sans text-[1.05rem] leading-8 text-[#b8afa2] sm:text-[1.18rem]">
                    {description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CoreActionLink
                    href="/get-started"
                    variant="heroPrimary"
                    label={`${platform} landing free audit`}
                    location={`${platform.toLowerCase()}_landing_hero`}
                  >
                    {FREE_AUDIT_CTA_TEXT}
                  </CoreActionLink>
                  <CoreActionLink
                    href={platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroSecondary"
                  >
                    Follow {platformHandle}
                  </CoreActionLink>
                </div>

                <dl className="grid gap-3 border-y border-white/12 py-5 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <dt className="font-sans text-[0.82rem] leading-5 text-[#8f877b]">
                        {stat.label}
                      </dt>
                      <dd className="font-sans text-[1.55rem] font-medium leading-none tracking-[-0.045em] text-[#f5f0e8]">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative mx-auto w-full max-w-[21rem] lg:mx-0 lg:justify-self-end">
                <div className="absolute inset-x-8 -top-4 h-px bg-white/20" aria-hidden="true" />
                <figure className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-3 shadow-[0_34px_80px_-60px_rgba(245,240,232,0.7)]">
                  <Image
                    src={visualSrc}
                    alt={visualAlt}
                    width={520}
                    height={974}
                    priority
                    className="h-auto w-full rounded-[1.35rem] object-contain"
                    sizes="(min-width: 1024px) 21rem, min(84vw, 21rem)"
                  />
                  <figcaption className="border-t border-white/12 px-2 pb-1 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8f877b]">
                    {visualCaption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] xl:items-start">
              <CoreSectionHeading
                eyebrow="Start here"
                title="Pick the next move."
                description="If you came from social, this is the fastest path into Prism: audit, proof, pricing, or the channel itself."
                titleClassName="max-w-[12ch]"
                descriptionClassName="max-w-[32rem]"
              />

              <div className="border-t border-white/12">
                {links.map((item) => (
                  <LinkRow key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
              <CoreSectionHeading
                eyebrow="What we build"
                title="One growth system."
                description="Prism helps dental and local-service businesses turn attention into found, trusted, booked demand."
                titleClassName="max-w-[13ch]"
                descriptionClassName="max-w-[34rem]"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {systemItems.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                        <PixelishIcon
                          src={item.iconSrc}
                          alt=""
                          size={18}
                          aria-hidden="true"
                          className="h-4 w-4 opacity-80"
                        />
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-sans text-[1rem] font-medium leading-tight tracking-[-0.025em] text-[#f5f0e8]">
                          {item.label}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#8f877b]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className={coreRouteContainerClassName}>
            <div className="border-y border-white/12 py-8 sm:py-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#797165]">
                    Ready when you are
                  </p>
                  <h2 className="max-w-[15ch] text-balance font-sans text-[clamp(1.8rem,3.4vw,2.75rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]">
                    Turn attention into booked demand.
                  </h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CoreActionLink href="/get-started" variant="heroPrimary">
                    {FREE_AUDIT_CTA_TEXT}
                  </CoreActionLink>
                  <CoreActionLink href="/case-studies" variant="heroSecondary">
                    See client work
                  </CoreActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
