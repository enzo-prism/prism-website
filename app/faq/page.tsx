import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import FinalCta from '@/components/prism/final-cta'
import { Section } from '@/components/prism/section'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { FAQSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { CAPACITY_MESSAGE } from '@/lib/waitlist'

import FaqExplorer, { type FaqTopic } from './faq-explorer'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'FAQ',
  description:
    'Answers about Prism pricing, timelines, services, and how our website, SEO, ads, and growth work fits together.',
  path: '/faq',
  ogImage: '/prism-opengraph.png',
})

/**
 * /faq content, grouped by topic. Every answer also ships in the page's
 * FAQPage schema. Keep answers free of prices and growth guarantees.
 */
const FAQ_TOPICS: readonly FaqTopic[] = [
  {
    id: 'waitlist',
    title: 'the waitlist',
    items: [
      {
        question: 'How does the waitlist work?',
        answer: `${CAPACITY_MESSAGE.headline} New work starts in monthly intakes. Join the waitlist with your goals and links, and our team reviews applications for each intake. ${CAPACITY_MESSAGE.intakeTail}`,
      },
      {
        question: 'What happens when Prism reaches out?',
        answer:
          'We confirm the scope, price, and next steps with you. Once approved, we gather the content and access needed, build the work, and review it with you before launch.',
      },
    ],
  },
  {
    id: 'working-with-prism',
    title: 'working with Prism',
    items: [
      {
        question: 'What makes Prism different?',
        answer:
          'We bring website design, engineering, content, ads, and AEO together around your business goals. You get a team that can build the work and help you understand its performance. Our case studies show dated results and their sources.',
      },
      {
        question: 'Do you work with small businesses?',
        answer:
          'Yes. We work with owners who want a stronger website, more consistent content, or help reaching customers through ads. You can start with one project and add support as your needs change.',
      },
      {
        question: 'What industries do you serve?',
        answer:
          'Our work includes dental practices, retailers, professional services, and other local businesses. Dental marketing is a particular specialty. Explore our case studies to see projects closest to your own.',
      },
      {
        question: 'How do your marketing services work together?',
        answer:
          'Your website explains the offer, content helps people understand and trust your business, ads bring it to a relevant audience, and AEO helps AI assistants find and cite you. We help you decide which part needs attention first and what to measure.',
      },
      {
        question: 'Can Prism help my business show up in ChatGPT and AI search?',
        answer:
          'Yes. AEO, or answer engine optimization, is one of Prism’s four services. We check which customer questions you appear in across ChatGPT, Google AI Overviews, Gemini, Claude, and Perplexity, fix what those engines can read about you, and re-check every month. No one can guarantee a citation, so we report what we see in dated checks.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'pricing and payments',
    items: [
      {
        question: 'How much does website design cost?',
        answer:
          'Pricing depends on your pages, content, features, and integrations. Join the waitlist and share your goals. When we can take on your project, we confirm the scope and price before work begins, including any optional ongoing care.',
      },
      {
        question: 'How do payments work?',
        answer:
          'Payment terms are included with your agreed scope before work starts. To discuss a project, join the waitlist. Our team reviews applications for each monthly intake.',
      },
      {
        question: 'Do you provide ongoing support?',
        answer:
          'Yes. Website Care covers agreed hosting, updates, and edits after launch. Content covers ongoing content work, Ads covers ongoing campaign management with weekly tuning, and AEO re-checks your customer questions across the answer engines every month. We scope the right plan with you.',
      },
    ],
  },
  {
    id: 'website-design',
    title: 'website design',
    items: [
      {
        question: "What's included in Prism website design?",
        answer:
          'Custom design for your brand, page copy, mobile-first layouts, development, search foundations, and analytics. We agree on the pages, features, content, and integrations with you before designing. Hosting, updates, and ongoing edits are available through optional Website Care.',
      },
      {
        question: 'How long does a website design project take?',
        answer:
          'Timing depends on the scope, content readiness, integrations, and review process. Tell us your target launch date when you join the waitlist. We will agree on a realistic schedule before work begins.',
      },
      {
        question: 'Can you redesign my existing website?',
        answer:
          'Yes. Share your site and what is getting in the way. We can assess the design, speed, search visibility, and path to an inquiry, then recommend focused improvements or a full redesign that builds on the pages already bringing in search traffic.',
      },
      {
        question: 'Can you add AI features to my website?',
        answer:
          'Yes, where they serve a clear purpose. Tell us what you want customers or your team to do more easily. We can assess an assistant, workflow, or other integration as part of the project scope.',
      },
      {
        question: 'Do you offer mobile app development?',
        answer:
          'Yes. App development is scoped as a custom project. Share what the app needs to do, who will use it, and any integrations so we can discuss the right approach.',
      },
    ],
  },
  {
    id: 'results',
    title: 'results and measurement',
    items: [
      {
        question: 'What results can I expect?',
        answer:
          'Results depend on your market, starting point, scope, and time frame. We agree on what success means for your business and use available data to track progress. Our case studies include the measurement periods and sources behind reported results.',
      },
      {
        question: 'How do you measure success?',
        answer:
          'We choose measures that match your goals, such as search visibility, website inquiries, calls, or bookings. We review the available data with you and distinguish observed results from estimates or gaps in tracking.',
      },
    ],
  },
] as const

const ALL_FAQ_ITEMS = FAQ_TOPICS.flatMap((topic) => [...topic.items])

const rise = (delay: number) =>
  ({ '--rise-delay': `${delay}ms` }) as CSSProperties

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section
          aria-labelledby="faq-hero-heading"
          className="relative isolate overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-12"
        >
          <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-60" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[-14rem] -z-10 h-[30rem] w-[min(60rem,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/16%),transparent)] blur-2xl"
          />
          <div className="prism-container flex flex-col items-start">
            <div className="prism-rise" style={rise(0)}>
              <WaitlistStatus />
            </div>
            <h1
              id="faq-hero-heading"
              className="text-display text-gradient prism-rise mt-6 max-w-[14ch] text-balance pb-2"
              style={rise(80)}
            >
              questions, answered.
            </h1>
            <p
              className="text-lead prism-rise mt-5 max-w-[52ch] text-pretty text-muted-foreground"
              style={rise(160)}
            >
              What to expect from your project, from the waitlist through
              launch and ongoing support.
            </p>
          </div>
        </section>

        <Section aria-label="Frequently asked questions" className="pt-4 sm:pt-6">
          <FaqExplorer topics={FAQ_TOPICS} />
        </Section>

        <FinalCta
          location="faq final cta"
          title="still curious? get on the list."
          headingId="faq-final-cta-heading"
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />
      </main>
      <Footer />
      <FAQSchema questions={ALL_FAQ_ITEMS} />
    </div>
  )
}
