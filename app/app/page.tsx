import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { PhoneFrame } from '@/components/case-studies/PhoneFrame'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FaqList } from '@/components/prism/faq-list'
import { FinalCta } from '@/components/prism/final-cta'
import { InlineWaitlistCta } from '@/components/prism/inline-waitlist-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { AppStoreButton } from '@/components/prism-app/AppStoreButton'
import { AppTour } from '@/components/prism-app/AppTour'
import { AppWidgets } from '@/components/prism-app/AppWidgets'
import {
  FAQSchema,
  SoftwareApplicationSchema,
  WebPageSchema,
} from '@/components/schema-markup'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FACTS,
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
        <section
          aria-labelledby="prism-app-title"
          className="relative isolate overflow-x-clip"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[640px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(38%_48%_at_72%_42%,oklch(0.66_0.16_258/24%),transparent_70%),radial-gradient(32%_42%_at_90%_60%,oklch(0.63_0.19_295/18%),transparent_70%)] blur-2xl" />
          </div>

          <div className="prism-container grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-24">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <Image
                  src="/prism-app/app-icon.png"
                  alt=""
                  width={128}
                  height={128}
                  priority
                  className="size-16 rounded-[1.05rem] border border-white/10"
                />
                <Eyebrow>Prism for iPhone</Eyebrow>
              </div>
              <h1
                id="prism-app-title"
                className="text-display text-gradient mt-7 max-w-[11ch] text-balance pb-1"
              >
                your website, at a glance.
              </h1>
              <p className="text-lead mt-6 max-w-[42ch] text-pretty text-muted-foreground">
                See how your website is doing in a few seconds, and hear about
                it when something good happens.
              </p>
              <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <AppStoreButton location="prism app hero" className="w-full sm:w-auto" />
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <a href="#inside">
                    See what’s inside
                    <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-subtle">
                {PRISM_APP_FACTS.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <p className="mt-3 max-w-[46ch] text-sm leading-6 text-muted-foreground">
                For Prism clients. Anyone can explore the demo.
              </p>
            </div>

            <div>
              <div className="mx-auto grid max-w-[33rem] grid-cols-2 items-start gap-4 sm:gap-6">
                <PhoneFrame
                  src="/prism-app/summary.jpg"
                  alt={PRISM_APP_TOUR[0].alt}
                  sizes="(min-width: 1024px) 256px, 44vw"
                  priority
                />
                <PhoneFrame
                  src="/prism-app/updates.jpg"
                  alt={PRISM_APP_TOUR[5].alt}
                  sizes="(min-width: 1024px) 256px, 44vw"
                  priority
                  className="mt-12 sm:mt-16"
                />
              </div>
              <p className="mt-6 text-center text-xs leading-5 text-subtle">
                {DEMO_NOTE}
              </p>
            </div>
          </div>
        </section>

        <Section
          id="inside"
          aria-labelledby="prism-app-inside-title"
          className="scroll-mt-20"
        >
          <SectionHeader
            id="prism-app-inside-title"
            eyebrow="Inside the app"
            title="your numbers, in plain English."
            description="Six screens that tell you what happened on your website and what it means."
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
            <Reveal delay={100}>
              <AppWidgets />
              <p className="mt-4 text-xs leading-5 text-subtle">
                Illustrative widget layouts with the demo’s numbers.
              </p>
            </Reveal>
          </div>
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
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRISM_APP_TRUST.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 80} className="h-full">
                  <Card className="h-full gap-0 p-6">
                    <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[15px] leading-6 text-muted-foreground">
                      {item.body}
                    </p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        <Section aria-labelledby="prism-app-start-title">
          <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
              <div>
                <SectionHeader
                  id="prism-app-start-title"
                  eyebrow="Get started"
                  title="how to get started."
                  titleClassName="max-w-[14ch]"
                />
                <ol className="mt-10 flex flex-col gap-7">
                  {PRISM_APP_STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-5">
                      <span className="pt-1 font-mono text-[11px] tabular-nums text-subtle">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 max-w-[46ch] text-pretty text-[15px] leading-6 text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <AppStoreButton
                  location="prism app get started"
                  size="lg"
                  className="mt-10 w-full sm:w-auto"
                />
              </div>
              <PhoneFrame
                src="/prism-app/signin.jpg"
                alt="Prism app sign-in screen with Continue with Apple, Continue with Google, and Explore a Demo."
                sizes="(min-width: 1024px) 288px, 64vw"
                className="mx-auto w-[64vw] max-w-[18rem]"
              />
            </div>
          </div>
          <InlineWaitlistCta
            location="prism app inline cta"
            title="not a Prism client yet? start on the waitlist."
            className="mt-16"
          />
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
