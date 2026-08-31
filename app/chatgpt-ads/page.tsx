import type { Metadata } from 'next'

import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'

import BrandLogo from '@/components/brand-logo'
import ChatGptAdsAccess from '@/components/chatgpt-ads/ChatGptAdsAccess'
import ChatGptAdsConversation from '@/components/chatgpt-ads/ChatGptAdsConversation'
import styles from '@/components/chatgpt-ads/chatgpt-ads.module.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { verifyChatGptAdsInvite } from '@/lib/chatgpt-ads-invites'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'ChatGPT Ads'
const PAGE_DESCRIPTION =
  'Prism-managed ChatGPT ads strategy, campaign setup, landing paths, and measurement for eligible advertisers.'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/chatgpt-ads',
})

const shellClass = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
const sectionLabelClass =
  'font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground'
const sectionTitleClass =
  'mt-3 max-w-[17ch] text-[clamp(2.2rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.052em] text-balance'
const sectionLedeClass =
  'mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg'
const primaryPillClass =
  'group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary bg-clip-padding px-6 text-sm font-medium text-primary-foreground transition-all select-none hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px'
const secondaryPillClass =
  'inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card bg-clip-padding px-6 text-sm font-medium text-foreground shadow-xs transition-all select-none hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px'

const trustPrinciples = [
  {
    index: '01',
    title: 'The answer stays independent.',
    body: 'Ads run separately from the model. Advertisers cannot shape, rank, or alter ChatGPT’s response.',
  },
  {
    index: '02',
    title: 'The conversation stays private.',
    body: 'Advertisers do not receive chats, history, memories, or personal details.',
  },
  {
    index: '03',
    title: 'The placement stays visible.',
    body: 'Ads appear below a response, clearly marked as sponsored and separate from the answer.',
  },
] as const

const intentMoments = [
  {
    label: 'Need',
    title: 'The customer explains the job.',
    body: 'Not just a keyword. They can describe the outcome, constraints, timing, and location in their own words.',
  },
  {
    label: 'Match',
    title: 'Your offer earns relevance.',
    body: 'The campaign needs a clear reason to appear: a useful product, service, or next step that fits the ask.',
  },
  {
    label: 'Action',
    title: 'The path to act is immediate.',
    body: 'A labeled placement can move an interested person to the right landing page, offer, or booking flow.',
  },
] as const

const steps = [
  {
    title: 'Verify the Prism invitation',
    body: 'Enter the code from Prism or your referrer to unlock our private consultation. The code does not create or guarantee OpenAI advertising access.',
  },
  {
    title: 'Sharpen the offer',
    body: 'We decide what deserves the click, who it is for, and where that attention should land.',
  },
  {
    title: 'Build the system',
    body: 'Prism prepares the campaign, creative direction, landing path, measurement, and operating plan.',
  },
  {
    title: 'Launch and learn',
    body: 'We use the tools available to your account, read aggregate performance, and refine what happens next.',
  },
] as const

const faqs = [
  {
    question: 'Where do ads appear in ChatGPT?',
    answer:
      'OpenAI says ads can appear below the end of a response. They are clearly labeled as sponsored and visually separate from the organic answer.',
  },
  {
    question: 'Do ads influence ChatGPT’s answers?',
    answer:
      'No. OpenAI says ads run on separate systems from the chat model. Advertisers cannot shape, rank, or alter ChatGPT’s responses.',
  },
  {
    question: 'Can advertisers see conversations?',
    answer:
      'No. Advertisers do not receive chats, history, memories, or personal details. They receive aggregate, non-identifying performance data such as views and clicks.',
  },
  {
    question: 'Can any business join?',
    answer:
      'OpenAI provides its own advertiser sign-up and controls product availability, account eligibility, and approval. Prism’s invitation-only service is separate: our code unlocks a private strategy call, not OpenAI access.',
  },
  {
    question: 'What happens on the 30-minute call?',
    answer:
      'We examine your offer, audience, landing path, and readiness. You leave knowing whether the channel fits and what Prism would build next.',
  },
] as const

type ChatGptAdsPageProps = {
  searchParams?: Promise<{ code?: string | string[] }>
}

function firstQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export default async function ChatGptAdsPage({
  searchParams,
}: ChatGptAdsPageProps) {
  const params = searchParams ? await searchParams : {}
  const code = firstQueryValue(params.code)
  const invite = code ? verifyChatGptAdsInvite(code) : null
  const rejected = Boolean(code && !invite)

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.surface}>
        <section className={`relative overflow-x-clip ${styles.heroBackdrop}`}>
          <div className={`${shellClass} pt-14 pb-8 sm:pt-20 sm:pb-12`}>
            <div
              className={`flex flex-wrap items-center justify-between gap-4 ${styles.rise}`}
            >
              <p className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span className={styles.pulse} />
                <span className="inline-flex items-center gap-2">
                  <BrandLogo
                    brand="openai"
                    theme="light"
                    decorative
                    className="h-4 w-4"
                  />
                  Prism for ChatGPT Ads
                </span>
              </p>
              <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] shadow-xs backdrop-blur-sm">
                Independent managed service
              </span>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.03fr)_minmax(26rem,0.97fr)] lg:items-end lg:gap-14">
              <div>
                <h1
                  className={`max-w-[11ch] text-[clamp(3.4rem,8.8vw,7.7rem)] font-medium leading-[0.86] tracking-[-0.067em] text-balance ${styles.rise} ${styles.riseDelay1}`}
                >
                  Ads, inside ChatGPT.
                </h1>
                <p
                  className={`mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-[1.35rem] ${styles.rise} ${styles.riseDelay2}`}
                >
                  The next search bar is a conversation. Prism is an independent
                  agency that helps eligible advertisers plan campaigns, landing
                  paths, and measurement. OpenAI controls access, approvals,
                  placement, and delivery.
                </p>
                <div
                  className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${styles.rise} ${styles.riseDelay3}`}
                >
                  <a
                    className={`${primaryPillClass} w-full sm:w-auto`}
                    href="#access"
                  >
                    Enter invite code
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    className={`${secondaryPillClass} w-full sm:w-auto`}
                    href="#how-it-works"
                  >
                    See how it works
                  </a>
                </div>
              </div>
              <div className={`${styles.rise} ${styles.riseDelay4}`}>
                <ChatGptAdsConversation />
              </div>
            </div>

            <div className="mt-16 grid border-y border-border sm:grid-cols-3 lg:mt-20">
              {[
                ['Prism access', 'Consultation code required'],
                ['Placement', 'Sponsored, below the response'],
                ['Next step', '30 minutes with Prism'],
              ].map(([label, value], index) => (
                <div
                  className={`py-5 sm:px-6 ${index > 0 ? 'border-t border-border sm:border-t-0 sm:border-l' : ''}`}
                  key={label}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background" id="principles">
          <div className={`${shellClass} py-16 sm:py-24`}>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background/50">
                  The trust standard
                </p>
                <h2 className="mt-4 max-w-[13ch] text-[clamp(2.35rem,5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.055em] text-balance">
                  Earn attention. Never borrow trust.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-background/62 text-pretty sm:text-lg">
                  The ad gets its own space. The answer stays independent. The
                  placement has to earn the next click on its own.
                </p>
              </div>
              <ol className="m-0 list-none border-t border-background/14 p-0">
                {trustPrinciples.map((principle) => (
                  <li
                    className="grid gap-3 border-b border-background/14 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                    key={principle.title}
                  >
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-background/42 sm:pt-1.5">
                      {principle.index}
                    </span>
                    <span>
                      <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                        {principle.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-background/58 text-pretty sm:text-base">
                        {principle.body}
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 flex flex-col justify-between gap-5 border-t border-background/14 pt-5 text-sm text-background/52 sm:flex-row sm:items-center">
              <p className="max-w-2xl leading-relaxed text-pretty">
                OpenAI says advertisers receive aggregate, non-identifying
                performance data such as total views and clicks.
              </p>
              <a
                className="inline-flex shrink-0 items-center gap-1.5 font-medium text-background transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
                href="https://developers.openai.com/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAI&apos;s current ads documentation
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="border-t border-border py-16 sm:py-24"
          id="how-it-works"
        >
          <div className={shellClass}>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className={sectionLabelClass}>The moment</p>
                <h2 className={sectionTitleClass}>
                  Intent, with the context still attached.
                </h2>
                <p className={sectionLedeClass}>
                  Search starts with a query. ChatGPT can start with a fully
                  described need. That changes the standard for relevance.
                </p>
              </div>
              <div className={`relative ${styles.intentRail}`}>
                {intentMoments.map((moment, index) => (
                  <article
                    className="relative grid gap-4 pb-10 pl-14 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:pl-16"
                    key={moment.label}
                  >
                    <span className="absolute top-0 left-0 inline-flex size-9 items-center justify-center rounded-full bg-card font-mono text-[10px] font-semibold ring-1 ring-foreground/14 shadow-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-(--cga-accent)">
                      {moment.label}
                    </p>
                    <div>
                      <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                        {moment.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                        {moment.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-24" id="program">
          <div className={shellClass}>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className={sectionLabelClass}>The Prism program</p>
                <h2 className={sectionTitleClass}>
                  From invitation to a real campaign.
                </h2>
                <p className={sectionLedeClass}>
                  A Prism invitation unlocks our consultation, not platform
                  access. If your OpenAI account is eligible, Prism can turn the
                  opportunity into a clear offer, credible destination, and
                  measured launch.
                </p>
              </div>
              <ol className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 shadow-[0_1px_2px_rgb(16_16_16/0.04),0_28px_72px_-44px_rgb(16_16_16/0.26)]">
                {steps.map((step, index) => (
                  <li
                    className="group grid gap-3 border-b border-border p-6 last:border-b-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6 sm:p-7"
                    key={step.title}
                  >
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-(--cga-accent) sm:pt-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <h3 className="text-xl font-medium tracking-[-0.03em]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
                        {step.body}
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          className={`scroll-mt-[calc(var(--prism-header-height,72px)+1.25rem)] border-t border-border ${styles.accessBackdrop}`}
          id="access"
        >
          <div className={`${shellClass} py-16 sm:py-24`}>
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
              <div>
                <p className={sectionLabelClass}>Private Prism access</p>
                <h2 className={sectionTitleClass}>
                  One code. One focused call.
                </h2>
                <p className={sectionLedeClass}>
                  Enter the invitation from Prism or your referring partner.
                  Once verified, Enzo&apos;s private 30-minute booking link
                  appears here. This code has no effect on OpenAI account
                  eligibility.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-5">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Format
                    </p>
                    <p className="mt-1 text-sm font-medium">Zoom</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-medium">30 minutes</p>
                  </div>
                </div>
              </div>
              <ChatGptAdsAccess
                initialInvite={invite}
                initialError={rejected ? 'That code is not recognized.' : null}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-24" id="faq">
          <div className={shellClass}>
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div>
                <p className={sectionLabelClass}>Clear answers</p>
                <h2 className={sectionTitleClass}>Before you use your code.</h2>
              </div>
              <div className="border-t border-border">
                {faqs.map((faq) => (
                  <details
                    className="group border-b border-border"
                    key={faq.question}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium tracking-[-0.02em] transition-colors select-none hover:text-foreground/70 sm:text-lg [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDown
                        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground text-pretty">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <div
            className={`${shellClass} flex flex-col items-center text-center`}
          >
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] shadow-xs">
              Prism invitation required
            </span>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.4rem,5vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.055em] text-balance">
              The code unlocks a focused Prism strategy call.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Verify your Prism invitation, book the call, and assess whether
              the channel fits. OpenAI separately controls advertiser access and
              approval.
            </p>
            <a className={`mt-8 ${primaryPillClass}`} href="#access">
              Verify invitation
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ServiceSchema
        serviceId="chatgpt-ads-service"
        name="Prism-managed ChatGPT ads service"
        description="ChatGPT advertising strategy, campaign setup, landing paths, and measurement for eligible advertisers, scoped on a 30-minute call with Prism."
        serviceType="Digital advertising"
        areaServed="United States"
        offerDetails={{
          name: 'ChatGPT ads strategy and setup with Prism',
          description:
            'Prism-managed ChatGPT ads strategy and setup for eligible advertisers, scoped on a 30-minute call. OpenAI separately controls platform access and approval. No public price.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema questions={[...faqs]} />
    </div>
  )
}
