import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck } from 'lucide-react'

import CaseStudiesList from '@/components/case-studies/CaseStudiesList'
import { PhoneFrame } from '@/components/case-studies/PhoneFrame'
import { WorkCard } from '@/components/case-studies/WorkCard'
import WorkPattern from '@/components/case-studies/WorkPattern'
import WorkWithPrism from '@/components/case-studies/WorkWithPrism'
import {
  CURRENT_CASE_STUDIES,
  WORK_GROUPS,
  getDesktopShot,
  getHostLabel,
  getMobileShot,
  getVerifiedMetric,
  getWorkGroup,
  getWorkLedger,
  orderForGallery,
} from '@/components/case-studies/work-index'
import Footer from '@/components/footer'
import HomeCountUp from '@/components/home/HomeCountUp'
import Navbar from '@/components/navbar'
import { ClientLogoRail } from '@/components/prism/client-logo-rail'
import { FinalCta } from '@/components/prism/final-cta'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import {
  BreadcrumbSchema,
  CollectionPageSchema,
  ItemListSchema,
} from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { WAITLIST_CTA } from '@/lib/waitlist'

const SITE = 'https://www.design-prism.com'

const ledger = getWorkLedger()
const galleryStudies = orderForGallery(CURRENT_CASE_STUDIES)

// One source/window line under the ledger when every metric shares it.
const metricSources = Array.from(
  new Set(
    ledger.metrics.map(({ metric }) =>
      [metric.sourceName, metric.dateRange].filter(Boolean).join(', '),
    ),
  ),
)

const filters = WORK_GROUPS.map((group) => ({
  key: group.key,
  label: group.label,
  count: galleryStudies.filter((study) => getWorkGroup(study) === group.key)
    .length,
}))

const railStudies = CURRENT_CASE_STUDIES.flatMap((study) => {
  const src = getMobileShot(study.slug)
  return src ? [{ slug: study.slug, client: study.client, src }] : []
})

function LedgerCell({
  label,
  value,
  note,
  href,
  className,
}: {
  label: string
  value: string
  note: string
  href?: string
  className?: string
}) {
  const body = (
    <>
      <dt className="text-eyebrow text-subtle">{label}</dt>
      <dd className="mt-3 flex items-baseline justify-between gap-2">
        <HomeCountUp
          value={value}
          className="text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl"
        />
        {href ? (
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-subtle transition-[transform,color] duration-300 group-hover/ledger:-translate-y-0.5 group-hover/ledger:translate-x-0.5 group-hover/ledger:text-foreground"
          />
        ) : null}
      </dd>
      <dd className="mt-2 text-[13px] leading-5 text-muted-foreground">{note}</dd>
    </>
  )

  if (href) {
    return (
      <div className={className}>
        <Link
          href={href}
          className="group/ledger block h-full p-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-6"
        >
          {body}
        </Link>
      </div>
    )
  }

  return <div className={`p-5 sm:p-6 ${className ?? ''}`}>{body}</div>
}

function GalleryClosingTile() {
  return (
    <TrackedLink
      href={WAITLIST_CTA.href}
      label="Join the waitlist from work gallery tile"
      location="case studies gallery tile"
      className="group/next relative isolate flex h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-7"
    >
      <span aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-[radial-gradient(55%_70%_at_20%_100%,oklch(0.66_0.21_29/22%),transparent_70%),radial-gradient(55%_70%_at_85%_100%,oklch(0.66_0.16_258/26%),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-[12%] bottom-0 -z-10 h-px bg-spectrum opacity-80"
      />
      <span className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
        <span className="prism-live-dot" aria-hidden="true" />
        Fully booked
      </span>
      <span className="block">
        <span className="block text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-[1.75rem]">
          your business, next.
        </span>
        <span className="mt-3 block max-w-[30ch] text-sm leading-6 text-muted-foreground">
          The next intake starts in <WaitlistIntakeMonth />. Waitlist members
          get first pick.
        </span>
        <span className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors group-hover/next:bg-primary/90">
          {WAITLIST_CTA.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/next:translate-x-0.5"
          />
        </span>
      </span>
    </TrackedLink>
  )
}

export default function CaseStudiesPage() {
  const galleryItems = galleryStudies.map((study) => {
    const metric = getVerifiedMetric(study)
    return {
      slug: study.slug,
      group: getWorkGroup(study),
      featured: Boolean(metric),
      card: (
        <WorkCard
          slug={study.slug}
          client={study.client}
          industry={study.industry}
          location={study.location}
          description={study.description}
          screenshotSrc={getDesktopShot(study.slug)}
          host={getHostLabel(study.websiteUrl)}
          metric={metric}
          hasExplainerVideo={Boolean(study.explainerVideo)}
          featured={Boolean(metric)}
          compactOnMobile
        />
      ),
    }
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section
          id="case-studies-hero"
          aria-labelledby="work-hero-title"
          className="relative isolate overflow-x-clip pt-12 sm:pt-20"
        >
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-x-0 top-0 -z-10 h-[760px] opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[-14rem] -z-10 h-[34rem] w-[70rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/20%),transparent)] blur-2xl"
          />
          <div aria-hidden="true" className="bg-noise absolute inset-0 -z-10 opacity-[0.05]" />

          <div className="prism-container">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <div className="prism-rise">
                  <WaitlistStatus />
                </div>
                <h1
                  id="work-hero-title"
                  className="prism-rise text-display text-gradient mt-8 max-w-[18ch] text-balance pb-2 [--rise-delay:80ms]"
                >
                  <span className="block">different markets.</span>{' '}
                  <span className="text-spectrum prism-spectrum-pan block">
                    same two problems.
                  </span>
                </h1>
                <p className="prism-rise text-lead mt-6 max-w-[48ch] text-pretty text-muted-foreground [--rise-delay:160ms]">
                  A dentist in Palo Alto, a kids’ foundation in Belize, a boot
                  fitter in Tahoe. Every one needed more people to find them,
                  and more of those people to choose them.
                </p>
                <div className="prism-rise mt-9 flex flex-col gap-3 sm:flex-row [--rise-delay:240ms]">
                  <WaitlistButton location="case studies hero" size="xl" />
                  <Button asChild variant="outline" size="xl">
                    <a href="#case-studies-list">
                      Browse the work
                      <ArrowDown aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="prism-rise lg:col-span-5 [--rise-delay:320ms]">
                <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-card/70 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] backdrop-blur-md">
                  <LedgerCell
                    label="Client stories"
                    value={String(ledger.stories)}
                    note="Current clients, each with a live site."
                    className="border-b border-r border-white/[0.06]"
                  />
                  <LedgerCell
                    label="Locations"
                    value={String(ledger.locations)}
                    note={`Across ${ledger.countries} countries.`}
                    className="border-b border-white/[0.06]"
                  />
                  {ledger.metrics.slice(0, 2).map(({ study, metric }, index) => (
                    <LedgerCell
                      key={study.slug}
                      label={study.client}
                      value={metric.value}
                      note={metric.label}
                      href={`/case-studies/${study.slug}`}
                      className={index === 0 ? 'border-r border-white/[0.06]' : undefined}
                    />
                  ))}
                </dl>
                {metricSources.length > 0 ? (
                  <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-subtle">
                    <BadgeCheck aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                    <span>
                      Search metrics: {metricSources.join('; ')}. Projects
                      without a verified metric do not show one.
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {railStudies.length > 0 ? (
            <div aria-hidden="true" className="relative mt-16 sm:mt-24">
              <div className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-2/3 max-w-5xl bg-[radial-gradient(50%_60%_at_25%_60%,oklch(0.66_0.21_29/14%),transparent_70%),radial-gradient(50%_60%_at_75%_60%,oklch(0.63_0.19_295/16%),transparent_70%)] blur-2xl" />
              <Marquee duration={90} gap="1.25rem" pauseOnHover={false}>
                {railStudies.map((study) => (
                  <div key={study.slug} className="w-[148px] shrink-0 sm:w-[188px]">
                    <PhoneFrame
                      src={study.src}
                      alt=""
                      sizes="(min-width: 640px) 188px, 148px"
                    />
                  </div>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
          ) : null}

          <ClientLogoRail
            label="Loved by B2B and consumer brands"
            className="pt-14 sm:pt-16"
          />
        </section>

        <WorkPattern />

        <Section
          id="case-studies-list"
          aria-labelledby="work-gallery-title"
          className="scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] pt-12 sm:pt-16"
        >
          <Reveal>
            <SectionHeader
              id="work-gallery-title"
              eyebrow={`${ledger.stories} client stories`}
              title="one standard. every market."
              description="Filter by industry. Every story opens on the live site, then shows who they needed to reach and how we got them found and chosen."
            />
          </Reveal>

          <div className="mt-12 sm:mt-14">
            <CaseStudiesList
              filters={filters}
              items={galleryItems}
              closingTile={<GalleryClosingTile />}
            />
          </div>

        </Section>

        <WorkWithPrism />

        <FinalCta
          location="case studies final cta"
          title="love your business again."
          secondary={{ label: 'Read what clients say', href: '/wall-of-love' }}
        />
      </main>
      <Footer />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE },
          { name: 'Work', url: `${SITE}/case-studies` },
        ]}
      />
      <CollectionPageSchema
        name="Prism case studies"
        description="Different markets, same two problems: getting found and getting chosen. Live websites and verified results from Prism's current clients across dental, founder-led, nonprofit, community, retail, and hospitality work."
        url={`${SITE}/case-studies`}
        isPartOfId={`${SITE}/#website`}
      />
      <ItemListSchema
        name="Prism case study highlights"
        url={`${SITE}/case-studies`}
        items={galleryStudies.map((study) => {
          const metric = getVerifiedMetric(study)
          const shot = getDesktopShot(study.slug)
          return {
            name: study.title,
            description: metric
              ? `${study.description} Verified metric: ${metric.value} ${metric.label}.`
              : study.description,
            url: `${SITE}/case-studies/${study.slug}`,
            image: shot ? `${SITE}${shot}` : undefined,
            // "CaseStudy" is not a real schema.org type; model each item as an
            // Article, matching the detail-page schema.
            itemType: 'Article',
          }
        })}
      />
    </div>
  )
}
