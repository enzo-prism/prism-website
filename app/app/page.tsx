import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Eye, ShieldCheck, Trash2, UsersRound } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FaqList } from '@/components/prism/faq-list'
import { FinalCta } from '@/components/prism/final-cta'
import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { AppHero } from '@/components/prism-app/AppHero'
import { AppPhone } from '@/components/prism-app/AppPhone'
import { AppSteps } from '@/components/prism-app/AppSteps'
import { AppStoreButton } from '@/components/prism-app/AppStoreButton'
import { AppTour } from '@/components/prism-app/AppTour'
import { AppWidgets } from '@/components/prism-app/AppWidgets'
import {
  FAQSchema,
  SoftwareApplicationSchema,
  WebPageSchema,
} from '@/components/schema-markup'
import {
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FAQ,
  PRISM_APP_ID,
  PRISM_APP_NAME,
  PRISM_APP_STEPS,
  PRISM_APP_TOUR,
  PRISM_APP_TRUST,
} from '@/lib/prism-app'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_URL = 'https://www.design-prism.com/app'
const DEMO_NOTE =
  'Screens show the app’s built-in demo. Bayview Dental is a fictional practice.'
const TRUST_ICONS = [Eye, UsersRound, ShieldCheck, Trash2] as const

export const metadata: Metadata = {
  ...buildRouteMetadata({
    titleStem: 'Prism app for iPhone',
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
        description={PRISM_APP_DESCRIPTION}
        applicationCategory="BusinessApplication"
        operatingSystems={['iOS 18.0 or later']}
        url={PAGE_URL}
      />
      <WebPageSchema
        name="Prism app for iPhone"
        description={PRISM_APP_DESCRIPTION}
        url={PAGE_URL}
      />
      <FAQSchema questions={[...PRISM_APP_FAQ]} />

      <main className="flex-1" id="main-content" tabIndex={-1}>
        <AppHero demoNote={DEMO_NOTE} />

        <Section
          id="inside"
          aria-labelledby="prism-app-inside-title"
          className="scroll-mt-20 pb-8 sm:pb-12"
        >
          <SectionHeader
            id="prism-app-inside-title"
            eyebrow="Inside the app"
            title="your numbers, in plain English."
            description={`Six screens that tell you what happened on your website and what it means. ${DEMO_NOTE} Floating cards are drawn with the demo’s numbers.`}
          />
          <AppTour steps={PRISM_APP_TOUR} />
        </Section>

        <Section aria-labelledby="prism-app-widgets-title">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="prism-app-widgets-title"
                eyebrow="Widgets"
                title="keep an eye on it from your Home Screen."
                description="Add Prism to your Home Screen or Lock Screen to see your visits and Google clicks without opening the app."
              />
            </Reveal>
            <div>
              <AppWidgets />
              <p className="mt-4 text-xs leading-5 text-subtle">
                Illustrative widget layouts with the demo’s numbers.
              </p>
            </div>
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
                  eyebrow="Get started"
                  title="how to get started."
                  titleClassName="max-w-[14ch]"
                />
                <AppSteps steps={PRISM_APP_STEPS} className="mt-9" />
                <AppStoreButton
                  location="prism app get started"
                  size="lg"
                  className="mt-9 w-full sm:w-auto"
                />
              </div>
              <div className="mx-auto w-[60vw] max-w-[18rem]">
                <AppPhone
                  src="/prism-app/signin.jpg"
                  alt="Prism app sign-in screen with Continue with Apple, Continue with Google, and Explore a Demo."
                  sizes="(min-width: 1024px) 288px, 60vw"
                />
              </div>
            </div>
          </SpotlightCard>
          <InlineWaitlistCta
            location="prism app inline cta"
            title="not a Prism client yet? start on the waitlist."
            className="mt-16"
          />
        </Section>

        <Section aria-labelledby="prism-app-trust-title">
          <SectionHeader
            id="prism-app-trust-title"
            eyebrow="Privacy"
            title="your data stays simple."
            description="Prism shows totals from your own accounts and asks for very little from you."
          >
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
          </SectionHeader>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {PRISM_APP_TRUST.map((item, index) => {
              const Icon = TRUST_ICONS[index]
              return (
                <li key={item.title}>
                  <Reveal delay={index * 80} className="h-full">
                    <SpotlightCard className="h-full rounded-2xl border border-white/[0.08] bg-card p-6">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </span>
                      <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">
                        {item.body}
                      </p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section aria-labelledby="prism-app-faq-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeader
              id="prism-app-faq-title"
              eyebrow="FAQ"
              title="before you download."
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

        <FinalCta location="prism app final cta" />
      </main>
      <Footer />
    </div>
  )
}
