import { quotesData, isClientQuote } from '@/content/wall-of-love-data'
import { CASE_STUDIES, getCaseStudyMetric } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
} from '@/lib/proof-metrics'

/*
 * Homepage copy and proof (2026-10 redesign). Copy follows the prism-writing
 * skill (prism-brand pack): lowercase headlines, no em dashes, no guarantees.
 * Every number here resolves from lib/proof-metrics.ts or a verified
 * case-study metric; never type a figure into this file.
 */

export type HomepageFAQBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] }

export type HomepageFAQItem = {
  question: string
  answer: HomepageFAQBlock[]
}

const BELIZE_SEARCH_METRIC = getCaseStudyMetric('belize-kids-foundation')
const DR_WONG_SEARCH_METRIC = getCaseStudyMetric('dr-christopher-wong')

const formerClientSlugs = new Set<string>(FORMER_CLIENT_SLUGS)
const CURRENT_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => !formerClientSlugs.has(study.slug),
)

export const HOMEPAGE_HERO = {
  titleLead: 'your growth',
  titleAccent: 'team.',
  subheading: 'Designers, engineers, and marketers for small businesses.',
  primaryCta: { label: 'Tell us about your business', href: '/waitlist' },
  secondaryCta: { label: 'See the work', href: '#work' },
  /** Labels for the refracted bands, top to bottom. */
  spectrumLabels: [
    'website design',
    'content',
    'ads',
    'search',
    'ai answers',
    'reviews',
  ],
  /** Client logo rail under the refraction scene. */
  logosLabel: 'Loved by B2B and consumer brands',
} as const

export const HOMEPAGE_NUMBERS = {
  eyebrow: 'by the numbers',
  title: 'numbers, not adjectives.',
  description: 'Verified at the source.',
  note: `Verified ${PROOF_METRICS_VERIFIED_AT}. Search results from Google Search Console, latest complete 90 days vs the same window a year earlier. New users from ${CONNECTED_CLIENT_TRAFFIC.source}, summed across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites for ${CONNECTED_CLIENT_TRAFFIC.month}. Case studies count current clients only.`,
  stats: [
    {
      value: DR_WONG_SEARCH_METRIC.value,
      label: 'Search impressions · Dr. Wong',
      source: DR_WONG_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      href: '/case-studies/dr-christopher-wong',
    },
    {
      value: BELIZE_SEARCH_METRIC.value,
      label: 'Search impressions · Belize Kids',
      source: BELIZE_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      href: '/case-studies/belize-kids-foundation',
    },
    {
      value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
      label: `New users · ${CONNECTED_CLIENT_TRAFFIC.month}`,
      source: CONNECTED_CLIENT_TRAFFIC.source,
      href: '/case-studies',
    },
    {
      value: `${CURRENT_CASE_STUDIES.length}`,
      label: 'Live client sites',
      source: 'Prism case studies',
      href: '/case-studies',
    },
  ],
} as const

/** "what we do": the four services, one row each (HomeServices). */
export const HOMEPAGE_SERVICES = {
  eyebrow: 'what we do',
  title: 'four services. one team.',
  description: 'Start with the one you need. Add the rest as you grow.',
  allServices: 'All services',
} as const

export type HomepageStory = {
  /** Case study slug; the panel links to /case-studies/<slug>. */
  slug: string
  company: string
  /** Who the client sells to. Drives the B2C / B2B label. */
  sellsTo: 'consumers' | 'businesses'
  industry: string
  location: string
  /** Host shown in the browser chrome. */
  host: string
  /** The thing that felt out of reach before Prism (our framing, not a quote). */
  impossible: string
  /** What Prism built, as short chips. */
  built: readonly string[]
  /** What is live now, paraphrasing the published case study result. */
  now: string
  /** Tall full-page captures that scroll inside the frames. */
  desktopImage: string
  mobileImage: string
}

/**
 * The three featured stories (2026-11 overhaul: one dental practice, one
 * retailer, one B2B platform; the rest live on /case-studies). Every line
 * paraphrases the published case study in lib/case-study-data.ts; nothing
 * here is a client quote or a number. `slugs` mirrors the stories for the
 * former-client guard.
 */
export const HOMEPAGE_CASE_STUDIES = {
  eyebrow: 'the work',
  title: 'every business has an impossible.',
  description: `Three of our ${CURRENT_CASE_STUDIES.length} live client sites.`,
  /** The link under the deck to every live site. */
  allWork: {
    label: `See all ${CURRENT_CASE_STUDIES.length} live sites`,
    href: '/case-studies',
  },
  /** The line above the mid-page waitlist invitation after the deck. */
  nextLine: 'your business could be the next story.',
  slugs: ['exquisite-dentistry', 'olympic-bootworks', 'mach-1'],
  stories: [
    {
      slug: 'exquisite-dentistry',
      company: 'Exquisite Dentistry',
      sellsTo: 'consumers',
      industry: 'High-end dentistry',
      location: 'Los Angeles, CA',
      host: 'exquisitedentistryla.com',
      impossible:
        'Match chair-side luxury online without risking search traffic.',
      built: ['Site rebuild', 'Booking flow', 'SEO protection', 'Attribution'],
      now: 'Editorial positioning, direct booking, and full attribution.',
      desktopImage: '/case-studies/scroll/exquisite-dentistry-desktop.webp',
      mobileImage: '/case-studies/scroll/exquisite-dentistry-mobile.webp',
    },
    {
      slug: 'olympic-bootworks',
      company: 'Olympic Bootworks',
      sellsTo: 'consumers',
      industry: 'Boot fitting and Fantic e-bikes',
      location: 'Tahoe, CA',
      host: 'olympicbootworks.com',
      impossible: 'Bring a Tahoe fitting room online for riders hours away.',
      built: [
        'Site rebuild',
        'Fantic e-bike catalog',
        'Test-ride requests',
        'Owned email + domain',
      ],
      now: 'Live Fantic catalog, test-ride requests, and owned infrastructure.',
      desktopImage: '/case-studies/scroll/olympic-bootworks-desktop.webp',
      mobileImage: '/case-studies/scroll/olympic-bootworks-mobile.webp',
    },
    {
      slug: 'mach-1',
      company: 'Mach 1',
      sellsTo: 'businesses',
      industry: 'AI agent platform',
      location: 'Austin, TX',
      host: 'mach1ai.com',
      impossible:
        'Show enterprise buyers what an AI agent delivers, in their peers’ own words.',
      built: [
        'Site rebuild',
        'Customer films',
        'Content engine',
        'Campaign review',
      ],
      now: 'A site led by customers’ own words and sourced results, with private tools behind it for content, interviews, and campaigns.',
      desktopImage: '/case-studies/scroll/mach-1-desktop.webp',
      mobileImage: '/case-studies/scroll/mach-1-mobile.webp',
    },
  ] satisfies readonly HomepageStory[],
} as const

export const HOMEPAGE_TESTIMONIALS = {
  eyebrow: 'wall of love',
  title: 'in their words.',
  description: 'Verbatim notes from the people we build for.',
  clientQuotes: quotesData.filter(
    (quote) => isClientQuote(quote) && !quote.requiresConsent,
  ),
} as const

export const HOMEPAGE_HOW_IT_WORKS = {
  eyebrow: 'how to get in',
  title: 'fully booked. here’s how to get in.',
  steps: [
    {
      title: 'apply in two minutes.',
      body: 'Share your site, focus, and goal.',
    },
    {
      title: 'we review every month.',
      body: 'We read every note and pick best-fit teams.',
    },
    {
      title: 'we build together.',
      body: 'Confirm scope and price, then ship.',
    },
  ],
} as const

export const HOMEPAGE_PRODUCTS = {
  eyebrow: 'products',
  title: 'built for our team. free for yours.',
  description: 'Free, open-source tools from our studio.',
} as const

export const HOMEPAGE_FINAL_CTA = {
  title: 'tell us your impossible.',
} as const

export const HOMEPAGE_FAQ = {
  eyebrow: 'faq',
  title: 'questions, answered.',
} as const

export const HOMEPAGE_FAQ_ITEMS: HomepageFAQItem[] = [
  {
    question: 'Is this only for dentists?',
    answer: [
      {
        type: 'paragraph',
        content:
          'No. We partner with consumer brands, advisory firms, schools, hospitality estates, nonprofits, and local leaders. Dental is a deep specialty alongside clients across categories.',
      },
    ],
  },
  {
    question: 'What do you review when I join the waitlist?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Your site, search visibility, reviews, and tracking. We look for the clearest gaps between the caliber of your business and how it shows up online.',
      },
    ],
  },
  {
    question: 'Do I need to understand SEO, ads, or AI search?',
    answer: [
      {
        type: 'paragraph',
        content:
          'No. We handle strategy and execution end to end, and report what matters in plain language.',
      },
    ],
  },
  {
    question: 'Can Prism help if we already have a website?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Yes. Sometimes the right move is a ground-up rebuild. Other times it is fixing positioning, speed, conversion paths, or tracking first.',
      },
    ],
  },
  {
    question: 'What is the first step?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Join the waitlist with your site and goals. We review applications for each monthly intake, reach out when a spot opens, and confirm scope and price before work starts.',
      },
    ],
  },
] as const
