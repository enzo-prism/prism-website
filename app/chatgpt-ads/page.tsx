import { Suspense } from 'react'
import type { Metadata } from 'next'

import BrandLogo from '@/components/brand-logo'
import ChatGptAdsAccess from '@/components/chatgpt-ads/ChatGptAdsAccess'
import ChatGptAdsConversation from '@/components/chatgpt-ads/ChatGptAdsConversation'
import styles from '@/components/chatgpt-ads/chatgpt-ads.module.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'ChatGPT Ads'
const PAGE_DESCRIPTION =
  'Invite-only ads in ChatGPT, set up by Prism.'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/chatgpt-ads',
  ogImage: false,
})

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

function AccessFallback() {
  return (
    <div className={styles.accessCard}>
      <p className={styles.accessMark}>Invite required</p>
      <h2 className={styles.accessTitle}>This program is invite only.</h2>
      <p className={styles.accessBody}>Loading the access gate…</p>
    </div>
  )
}

export default function ChatGptAdsPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <div className={styles.kickerRow}>
              <p className={styles.kicker}>
                <span className={styles.pulse} />
                <span className={styles.logoLockup}>
                  <BrandLogo
                    brand="openai"
                    theme="light"
                    decorative
                    className="h-4 w-4"
                  />
                  Prism × ChatGPT Ads
                </span>
              </p>
              <span className={styles.seal}>Invite only</span>
            </div>
            <h1 className={styles.headline}>Ads, inside ChatGPT.</h1>
            <p className={styles.lede}>
              People already say what they want. Select businesses can be there
              when they do. OpenAI is working with Prism to bring ChatGPT ads to
              companies in our network.
            </p>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.emphasis}>
                  <strong>A code is required.</strong> This is not an open
                  waitlist. Partners share access with businesses they trust.
                </p>
                <div className={styles.actions}>
                  <a className={styles.primary} href="#access">
                    Get started
                  </a>
                  <a className={styles.secondary} href="#why">
                    Why it works
                  </a>
                </div>
              </div>
              <ChatGptAdsConversation />
            </div>
          </div>
        </section>

        <section className={styles.section} id="why">
          <div className={styles.shell}>
            <div className={styles.split}>
              <div>
                <p className={styles.sectionLabel}>Why this matters</p>
                <h2 className={styles.sectionTitle}>Demand, already in words.</h2>
                <p className={styles.sectionLede}>
                  Search ads guess from keywords. ChatGPT ads meet a person
                  who has already described the job to be done.
                </p>
              </div>
              <ol className={styles.reasonList}>
                {reasons.map((reason, index) => (
                  <li className={styles.reason} key={reason.title}>
                    <span className={styles.reasonIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.reasonTitle}>{reason.title}</h3>
                    <p className={styles.reasonBody}>{reason.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.section} id="program">
          <div className={styles.shell}>
            <p className={styles.sectionLabel}>The program</p>
            <h2 className={styles.sectionTitle}>Reserved for a small network.</h2>
            <p className={styles.sectionLede}>
              ChatGPT ads are powerful, and they are not for everyone. Prism
              opens this only for businesses we know, or that a trusted partner
              is willing to stand behind.
            </p>
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <article className={styles.step} key={step.title}>
                  <p className={styles.stepIndex}>
                    Step {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.access}`} id="access">
          <div className={styles.shell}>
            <div className={styles.split}>
              <div>
                <p className={styles.sectionLabel}>Access</p>
                <h2 className={styles.sectionTitle}>Enter your invite code.</h2>
                <p className={styles.sectionLede}>
                  If a Prism partner sent you, they gave you a code. That is
                  the only way through. After it unlocks, you can book the
                  setup call.
                </p>
              </div>
              <Suspense fallback={<AccessFallback />}>
                <ChatGptAdsAccess />
              </Suspense>
            </div>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.shell}>
            <p className={styles.sectionLabel}>Questions</p>
            <h2 className={styles.sectionTitle}>Before you ask for a code.</h2>
            <dl className={styles.faqList}>
              {faqs.map((faq) => (
                <div className={styles.faqItem} key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>
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
