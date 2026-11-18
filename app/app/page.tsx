import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CornerDownRight,
  Eye,
  ShieldCheck,
  Trash2,
  UsersRound,
} from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FaqList } from '@/components/prism/faq-list'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { AppDemo } from '@/components/prism-app/AppDemo'
import { AppHero } from '@/components/prism-app/AppHero'
import { AppPhone } from '@/components/prism-app/AppPhone'
import { AppSteps } from '@/components/prism-app/AppSteps'
import { AppStoreButton } from '@/components/prism-app/AppStoreButton'
import { AppWidgets } from '@/components/prism-app/AppWidgets'
import {
  FAQSchema,
  SoftwareApplicationSchema,
  WebPageSchema,
} from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import {
  PRISM_APP_DEMO_BRANCH,
  DEMO_LEADS,
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FAQ,
  PRISM_APP_HOME_SCREEN_NAME,
  PRISM_APP_ID,
  PRISM_APP_NAME,
  PRISM_APP_PROSPECT,
  PRISM_APP_RELEASES,
  PRISM_APP_STEPS,
  PRISM_APP_STORE_URL,
  PRISM_APP_TOUR,
  PRISM_APP_TRUST,
  PRISM_APP_VERSION,
} from '@/lib/prism-app'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_URL = 'https://www.design-prism.com/app'
const TRUST_ICONS = [Eye, UsersRound, ShieldCheck, Trash2] as const

// One named website-client quote (never an Instagram comment, never a quote
// that still needs consent). Renders nothing if the record changes.
const CLIENT_QUOTE_ID = 1
const clientQuote = quotesData.find(
  (quote) =>
    quote.id === CLIENT_QUOTE_ID &&
    isClientQuote(quote) &&
    !quote.requiresConsent,
)

export const metadata: Metadata = {
  ...buildRouteMetadata({
    titleStem: 'Prism Grow: website lead tracking for iPhone',
    description: PRISM_APP_DESCRIPTION,
    path: '/app',
  }),
  // Safari's Smart App Banner, on this page only.
  itunes: { appId: PRISM_APP_ID },
}

export default function PrismAppPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <SoftwareApplicationSchema
        appId="prism-ios"
        name={PRISM_APP_NAME}
        alternateName={PRISM_APP_HOME_SCREEN_NAME}
        description={PRISM_APP_DESCRIPTION}
        applicationCategory="BusinessApplication"
        operatingSystems={['iOS 18.0 or later']}
        softwareVersion={PRISM_APP_VERSION}
        downloadUrl={PRISM_APP_STORE_URL}
        url={PAGE_URL}
      />
      <WebPageSchema
        name={`${PRISM_APP_NAME} for iPhone`}
        description={PRISM_APP_DESCRIPTION}
        url={PAGE_URL}
      />
      <FAQSchema questions={[...PRISM_APP_FAQ]} />

      <main className="flex-1" id="main-content" tabIndex={-1}>
        <AppHero />

        <Section
          id="inside"
          aria-labelledby="prism-app-inside-title"
          className="scroll-mt-16 pt-10 sm:pt-12"
        >
          <AppDemo
            steps={PRISM_APP_TOUR}
            header={
              <SectionHeader
                id="prism-app-inside-title"
                eyebrow="Interactive demo"
                title="follow a website lead."
                description="Explore Bayview Dental’s fictional website. Start with the forms people used, then open Updates for the latest inquiry or Report for the monthly comparison."
              />
            }
          />
        </Section>

        <Section aria-labelledby="prism-app-report-title" className="pt-0 sm:pt-0">
          <div className="grid items-center gap-8 border-t border-white/10 pt-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeader
              id="prism-app-report-title"
              eyebrow="Monthly reports"
              title="compare leads month to month."
              description="Bring the numbers to your next team meeting. Each report pairs website inquiries with visits, search activity and the work Prism shipped. Share it as a PDF or text."
            />
            <figure className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
              <figcaption className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
                <span>Bayview Dental · Demo</span><span>Website leads · 2026</span>
              </figcaption>
              <dl className="mt-6 space-y-4">
                {[
                  { month: 'September', count: DEMO_LEADS.october.previous },
                  { month: 'October', count: DEMO_LEADS.october.count },
                ].map(({ month, count }) => (
                  <div key={month} className="grid grid-cols-[5rem_1fr_2rem] items-center gap-3">
                    <dt className="text-sm text-muted-foreground">{month}</dt>
                    <dd className="col-span-2 flex items-center gap-4">
                      <span aria-hidden="true" className="h-2 flex-1 rounded-full bg-muted">
                        <span className={month === 'October' ? 'block h-full rounded-full bg-spectrum-green' : 'block h-full rounded-full bg-muted-foreground'}
                          style={{ width: `${(count / DEMO_LEADS.october.count) * 100}%` }} />
                      </span>
                      <span className="w-8 text-right font-mono text-lg">{count}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-white/10 pt-4 text-body-md">
                October brought in {DEMO_LEADS.october.count - DEMO_LEADS.october.previous} more inquiries, up {DEMO_LEADS.october.change} from September.
              </p>
            </figure>
          </div>
          <details className="mt-10 border-y border-white/10 py-5">
            <summary className="cursor-pointer rounded-sm text-body-md font-medium focus-visible:outline-2 focus-visible:outline-offset-4">
              See visits and Google clicks in the iPhone widgets
            </summary>
            <div className="mt-5 grid items-center gap-6 lg:grid-cols-2">
              <p className="max-w-prose text-muted-foreground">Pin a website to your Home Screen or Lock Screen to see 28 days of traffic. Open Prism Grow to check the inquiries your forms received.</p>
              <AppWidgets />
            </div>
          </details>
        </Section>

        <Section
          id="whats-new"
          aria-labelledby="prism-app-releases-title"
          className="scroll-mt-16 border-y border-white/[0.08] bg-card"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <SectionHeader
              id="prism-app-releases-title"
              eyebrow="Release notes"
              title="what’s new."
            />
            <ol className="divide-y divide-white/10">
              {PRISM_APP_RELEASES.map((release) => (
                <li
                  key={release.version}
                  className="grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[6rem_1fr] sm:gap-8"
                >
                  <div className="flex items-baseline gap-3 sm:block">
                    <p className="font-mono text-4xl font-medium tracking-tight text-foreground">
                      <span className="sr-only">Version </span>
                      {release.version}
                    </p>
                    <time dateTime={release.date} className="mt-2 block font-mono text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
                      }).format(new Date(release.date))}
                    </time>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className={release.version === PRISM_APP_VERSION
                          ? 'size-2 rounded-full bg-foreground'
                          : 'size-2 rounded-full border border-current'}
                      />
                      {release.status}
                    </p>
                    <h3 className="mt-3 text-heading text-balance">{release.title}</h3>
                    <ul className="mt-4 list-disc space-y-2 pl-4 text-body-md text-muted-foreground marker:text-subtle">
                      {release.changes.map((change) => <li key={change}>{change}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section aria-labelledby="prism-app-start-title">
          <SpotlightCard
            beam
            className="overflow-hidden rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-10 lg:p-14"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
              <div>
                <SectionHeader
                  id="prism-app-start-title"
                  eyebrow="For Prism clients"
                  title="see your own leads."
                  titleClassName="max-w-[14ch]"
                />
                <AppSteps steps={PRISM_APP_STEPS} className="mt-9" />
                <AppStoreButton
                  location="prism app get started"
                  size="lg"
                  className="mt-9 w-full sm:w-auto"
                />
                <p className="mt-8 flex max-w-[46ch] gap-3 border-t border-white/[0.08] pt-6 text-[15px] leading-6 text-muted-foreground">
                  <CornerDownRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-subtle"
                  />
                  <span>
                    <span className="block font-medium text-foreground">
                      {PRISM_APP_DEMO_BRANCH.title}
                    </span>
                    {PRISM_APP_DEMO_BRANCH.body}
                  </span>
                </p>
              </div>
              <div className="mx-auto w-[60vw] max-w-[18rem]">
                <AppPhone
                  src="/prism-app/signin-1-5.jpg"
                  alt="Prism Grow sign-in screen with Continue with Email, Continue with Apple, Continue with Google, and Other Ways to Get Started."
                  sizes="(min-width: 1024px) 288px, 60vw"
                />
              </div>
            </div>
          </SpotlightCard>
        </Section>

        <Section
          aria-labelledby="prism-app-prospect-title"
          className="border-y border-white/[0.06] bg-white/[0.015]"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                id="prism-app-prospect-title"
                eyebrow={PRISM_APP_PROSPECT.eyebrow}
                title={PRISM_APP_PROSPECT.title}
                description={PRISM_APP_PROSPECT.body}
              />
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <WaitlistButton
                  location="prism app prospect band"
                  className="w-full sm:w-auto"
                />
                <WaitlistStatus asLink={false} />
              </div>
            </div>

            {clientQuote ? (
              <Reveal>
                <figure className="rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-8">
                  <Eyebrow>What clients say</Eyebrow>
                  <blockquote className="mt-5 text-heading text-pretty text-foreground">
                    <p>&ldquo;{clientQuote.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 text-[15px] leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {clientQuote.client}
                    </span>
                    <span aria-hidden="true" className="px-1.5 text-subtle">
                      ·
                    </span>
                    Website Design client
                  </figcaption>
                  <TrackedLink
                    href="/wall-of-love"
                    label="see why clients love prism"
                    location="prism app prospect band"
                    className="group/link mt-5 inline-flex min-h-10 items-center gap-1.5 text-[15px] font-medium text-foreground/90 transition-colors hover:text-foreground"
                  >
                    See why clients love Prism
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                    />
                  </TrackedLink>
                </figure>
              </Reveal>
            ) : null}
          </div>
        </Section>

        <Section aria-labelledby="prism-app-trust-title">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              id="prism-app-trust-title"
              eyebrow="Privacy"
              title="your leads stay private."
            />
            <Link
              href="/app/privacy"
              className="group/link inline-flex min-h-10 items-center gap-1.5 text-[15px] font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              Read the app privacy policy
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
          <ul className="mt-10 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card sm:grid-cols-2 lg:grid-cols-4">
            {PRISM_APP_TRUST.map((item, index) => {
              const Icon = TRUST_ICONS[index]
              return (
                <li
                  key={item.title}
                  className="border-white/[0.08] p-6 max-sm:[&:not(:first-child)]:border-t sm:max-lg:[&:nth-child(even)]:border-l sm:max-lg:[&:nth-child(n+3)]:border-t lg:[&:not(:first-child)]:border-l"
                >
                  <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-subtle"
                    />
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section aria-labelledby="prism-app-faq-title" className="pt-0 sm:pt-0">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeader
              id="prism-app-faq-title"
              eyebrow="FAQ"
              title="questions about lead tracking."
            >
              <Link
                href="/app/support"
                className="group/link inline-flex min-h-10 items-center gap-1.5 text-[15px] font-medium text-foreground/90 transition-colors hover:text-foreground"
              >
                App support
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                />
              </Link>
            </SectionHeader>
            <FaqList items={PRISM_APP_FAQ} name="prism-app-faq" defaultOpen={0} />
          </div>
        </Section>

        <FinalCta location="prism app final cta" title="track the leads your site brings in." />
      </main>
      <Footer />
    </div>
  )
}
