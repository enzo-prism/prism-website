import type { Metadata } from 'next'

import { ChevronDown } from 'lucide-react'

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
const PAGE_DESCRIPTION = 'Invite-only ads in ChatGPT, set up by Prism.'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/chatgpt-ads',
  ogImage: false,
})

const shellClass = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
const sectionLabelClass =
  'font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground'
const sectionTitleClass =
  'mt-3 max-w-[16ch] text-[clamp(2rem,4.5vw,3.3rem)] font-medium leading-[1.04] tracking-[-0.045em] text-balance'
const sectionLedeClass =
  'mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg'
const primaryPillClass =
  'inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary bg-clip-padding px-6 text-sm font-medium text-primary-foreground transition-all select-none hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px'
const secondaryPillClass =
  'inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card bg-clip-padding px-6 text-sm font-medium text-foreground shadow-xs transition-all select-none hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px'

const reasons = [
  {
    title: 'The ask is already happening',
    body: 'People tell ChatGPT what they need in plain language. You can be present in that moment, not after they have bounced to a search results page.',
  },
  {
    title: 'Beside the answer, not on top of it',
    body: 'Ads appear as labeled cards under a reply. They do not rewrite ChatGPT’s answer, and they do not pretend to be the model.',
  },
  {
    title: 'Private by design',
    body: 'Advertisers do not receive the chat. Prism helps you show up with a useful offer while OpenAI keeps the conversation on OpenAI’s side.',
  },
  {
    title: 'Early, quiet, high-signal',
    body: 'This is still a small, selective channel. The businesses that get it right now will understand it before it is crowded.',
  },
] as const

const steps = [
  {
    title: 'A partner sends a code',
    body: 'Prism, or someone in our network, invites a business they trust. There is no public waitlist.',
  },
  {
    title: 'Unlock this page',
    body: 'The code is the door. It keeps the program limited to operators we actually want to work with.',
  },
  {
    title: 'Book 30 minutes',
    body: 'A focused call with Prism. We learn the business, the offer, and whether ChatGPT ads are a fit.',
  },
  {
    title: 'We set the ads up',
    body: 'Creative, targeting, landing paths, and the operating cadence. You leave with a plan and an owner.',
  },
] as const

const faqs = [
  {
    question: 'Who can run ChatGPT ads with Prism?',
    answer:
      'Select businesses in Prism’s network: companies we already work with, or that a trusted partner believes are a fit. An invite code is required.',
  },
  {
    question: 'How do I get a code?',
    answer:
      'From Prism or from a partner who was given one to share. If you do not have a code, this program is not open yet for your business.',
  },
  {
    question: 'What happens on the call?',
    answer:
      'Thirty minutes. We look at your offer, your market, and how ChatGPT ads should be set up. Then we outline next steps to launch.',
  },
  {
    question: 'Do ads change ChatGPT’s answers?',
    answer:
      'No. Ads are labeled and kept separate from the model’s reply. They show when a conversation has commercial intent.',
  },
  {
    question: 'Is this the same as Google Ads?',
    answer:
      'No. This is a new surface inside ChatGPT. Prism still runs Google, Meta, and TikTok when those are the right channels. This page is only for ChatGPT ads.',
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
        <section className="overflow-x-clip pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className={shellClass}>
            <div
              className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${styles.rise}`}
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
                  Prism × ChatGPT Ads
                </span>
              </p>
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] shadow-xs">
                Invite only
              </span>
            </div>
            <h1
              className={`mt-7 max-w-[14ch] text-[clamp(3rem,9vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-balance ${styles.rise} ${styles.riseDelay1}`}
            >
              Ads, inside ChatGPT.
            </h1>
            <p
              className={`mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl ${styles.rise} ${styles.riseDelay2}`}
            >
              People already say what they want. Select businesses can be there
              when they do. OpenAI is working with Prism to bring ChatGPT ads
              to companies in our network.
            </p>
            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start lg:gap-16">
              <div
                className={`flex flex-col gap-6 ${styles.rise} ${styles.riseDelay3}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    className={`${primaryPillClass} w-full sm:w-auto`}
                    href="#access"
                  >
                    Get started
                  </a>
                  <a
                    className={`${secondaryPillClass} w-full sm:w-auto`}
                    href="#why"
                  >
                    Why it works
                  </a>
                </div>
                <p className="border-t border-border pt-5 text-base leading-relaxed text-pretty">
                  <strong className="font-semibold">
                    A code is required.
                  </strong>{' '}
                  This is not an open waitlist. Partners share access with
                  businesses they trust.
                </p>
              </div>
              <div className={`${styles.rise} ${styles.riseDelay4}`}>
                <ChatGptAdsConversation />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-24" id="why">
          <div className={shellClass}>
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-16">
              <div className="md:sticky md:top-28 md:self-start">
                <p className={sectionLabelClass}>Why this matters</p>
                <h2 className={sectionTitleClass}>Demand, already in words.</h2>
                <p className={sectionLedeClass}>
                  Search ads guess from keywords. ChatGPT ads meet a person who
                  has already described the job to be done.
                </p>
              </div>
              <ol className="m-0 list-none border-t border-border p-0">
                {reasons.map((reason, index) => (
                  <li
                    className="grid gap-1.5 border-b border-border py-6 transition-colors sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6"
                    key={reason.title}
                  >
                    <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-muted-foreground sm:pt-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="grid gap-1.5">
                      <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                        {reason.title}
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                        {reason.body}
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-24" id="program">
          <div className={shellClass}>
            <p className={sectionLabelClass}>The program</p>
            <h2 className={sectionTitleClass}>Reserved for a small network.</h2>
            <p className={sectionLedeClass}>
              ChatGPT ads are powerful, and they are not for everyone. Prism
              opens this only for businesses we know, or that a trusted partner
              is willing to stand behind.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <article
                  className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-card p-6 shadow-xs ring-1 ring-foreground/10 transition-shadow hover:shadow-[0_16px_40px_-20px_rgb(16_16_16/0.25)]"
                  key={step.title}
                >
                  <span
                    className="pointer-events-none absolute -top-3 right-4 text-[4.5rem] font-medium leading-none tracking-[-0.06em] text-foreground/[0.05]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-(--cga-accent)">
                    Step {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 text-lg font-medium tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-[calc(var(--prism-header-height,72px)+1.25rem)] border-t border-border py-16 sm:py-24"
          id="access"
        >
          <div className={shellClass}>
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-16">
              <div className="md:sticky md:top-28 md:self-start">
                <p className={sectionLabelClass}>Access</p>
                <h2 className={sectionTitleClass}>Enter your invite code.</h2>
                <p className={sectionLedeClass}>
                  If a Prism partner sent you, they gave you a code. That is
                  the only way through. After it unlocks, you can book the
                  setup call.
                </p>
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
            <p className={sectionLabelClass}>Questions</p>
            <h2 className={sectionTitleClass}>Before you ask for a code.</h2>
            <div className="mt-10 border-t border-border">
              {faqs.map((faq) => (
                <details className="group border-b border-border" key={faq.question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium tracking-[-0.02em] transition-colors select-none hover:text-foreground/75 sm:text-lg [&::-webkit-details-marker]:hidden">
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
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <div className={`${shellClass} flex flex-col items-center text-center`}>
            <p className={sectionLabelClass}>Invite only</p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4.5vw,3.3rem)] font-medium leading-[1.04] tracking-[-0.045em] text-balance">
              Have a code? The door is open.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Use the code your partner sent you. No code yet? Ask the person
              who pointed you here.
            </p>
            <a className={`mt-8 ${primaryPillClass}`} href="#access">
              Enter invite code
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ServiceSchema
        serviceId="chatgpt-ads-service"
        name="ChatGPT ads for select businesses"
        description="Invite-only ChatGPT advertising setup for businesses in Prism's network, scoped on a 30-minute call."
        serviceType="Digital advertising"
        areaServed="United States"
        offerDetails={{
          name: 'ChatGPT ads setup with Prism',
          description:
            'Invite-only ChatGPT ads, scoped with Prism on a 30-minute call. No public price.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema questions={[...faqs]} />
    </div>
  )
}
