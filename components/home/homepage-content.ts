import { quotesData, isClientQuote } from '@/content/wall-of-love-data'
import { CASE_STUDIES, getCaseStudyMetric } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
  SOCIAL_PROOF,
  SOCIAL_PROOF_CHANNELS,
  TOP_REELS,
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

export type HomepageClientWinSlide = {
  /** Company / brand name shown as the prominent card label (never a person). */
  company: string
  location: string
  href: string
  contextLabel: string
  /** Portrait screenshot of the client's live website. */
  image: string
  /**
   * Optional headline result. ONLY populate from a metric that is verified
   * against the named `source` (mirrors the client's `structured.results` in
   * lib/case-study-data.ts). Never invent a value.
   */
  metric?: {
    value: string
    label: string
    source: string
  }
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
  subheading:
    'Designers, engineers, and marketers for small businesses.',
  primaryCta: { label: 'Tell us about your business', href: '/waitlist' },
  secondaryCta: { label: 'See the work', href: '#featured-work' },
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

export const HOMEPAGE_SERVICES = {
  eyebrow: 'what we do',
  title: 'shine. convert. get seen.',
  description: 'One senior team. Built to compound.',
  pillars: [
    {
      key: 'shine',
      title: 'shine.',
      lead: 'A site people remember.',
      body: 'Custom design, identity, photo, and film.',
      items: ['Website design', 'Identity', 'Photo & film'],
      links: [{ label: 'Website Design', href: '/website-design' }],
    },
    {
      key: 'convert',
      title: 'convert.',
      lead: 'Built for the tap to book.',
      body: 'Fast pages, clear proof, clean tracking.',
      items: ['Conversion pages', 'Booking flows', 'Proof', 'Tracking'],
      links: [{ label: 'See the results', href: '/case-studies' }],
    },
    {
      key: 'reach',
      title: 'get seen.',
      lead: 'Demand on every channel.',
      body: 'Short-form content, paid ads, and AI search.',
      items: ['Short-form', 'Google & Meta ads', 'Search & AI', 'Maps'],
      links: [
        { label: 'Content', href: '/content' },
        { label: 'Ads', href: '/ads' },
        { label: 'AEO', href: '/aeo' },
      ],
    },
  ],
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
 * The six featured stories (2026-10 v2; Mach 1 joined 2026-10-18 as the
 * violet band, completing the spectrum). Every line paraphrases the
 * published case study in lib/case-study-data.ts; nothing here is a client
 * quote or a number. `slugs` mirrors the stories for the former-client guard.
 */
export const HOMEPAGE_CASE_STUDIES = {
  eyebrow: 'the work',
  title: 'every business has an impossible.',
  description: 'Six clients. Six live sites.',
  /** The line above the mid-page waitlist invitation after the deck. */
  nextLine: 'your business could be the next story.',
  slugs: [
    'exquisite-dentistry',
    'canary-cove',
    'practice-transitions-institute',
    'olympic-bootworks',
    'roseville-dental-academy',
    'mach-1',
  ],
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
      slug: 'canary-cove',
      company: 'Canary Cove',
      sellsTo: 'consumers',
      industry: 'Private beachfront estate',
      location: 'San Pedro, Belize',
      host: 'canarycove.com',
      impossible:
        'Make guests feel Ambergris Caye before they book a flight.',
      built: ['Immersive visuals', 'Concierge inquiries', 'Analytics'],
      now: 'Visual storytelling, concierge inquiries, and clean analytics.',
      desktopImage: '/case-studies/scroll/canary-cove-desktop.webp',
      mobileImage: '/case-studies/scroll/canary-cove-mobile.webp',
    },
    {
      slug: 'practice-transitions-institute',
      company: 'Practice Transitions Institute',
      sellsTo: 'businesses',
      industry: 'Dental transition advisory',
      location: 'San Mateo, CA',
      host: 'practicetransitionsinstitute.com',
      impossible:
        'Earning a dentist’s trust for the biggest decision of their career before the first call.',
      built: [
        'Six-stage process',
        'Client testimonials',
        'Search content',
        'Funnel analytics',
      ],
      now: 'Clear authority from the first visit, guiding quiet research straight to consultation.',
      desktopImage:
        '/case-studies/scroll/practice-transitions-institute-desktop.webp',
      mobileImage:
        '/case-studies/scroll/practice-transitions-institute-mobile.webp',
    },
    {
      slug: 'olympic-bootworks',
      company: 'Olympic Bootworks',
      sellsTo: 'consumers',
      industry: 'Boot fitting and Fantic e-bikes',
      location: 'Tahoe, CA',
      host: 'olympicbootworks.com',
      impossible:
        'Bring a Tahoe fitting room online for riders hours away.',
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
      slug: 'roseville-dental-academy',
      company: 'Roseville Dental Academy',
      sellsTo: 'consumers',
      industry: 'Dental assisting school',
      location: 'Roseville, CA',
      host: 'rosevilledentalacademy.com',
      impossible:
        'Replace a stock template with a measurable admissions site.',
      built: [
        'Modern web platform',
        'Analytics + search setup',
        'Enrollment forms',
        'AI assistant',
      ],
      now: 'Clear program paths, fast enrollment, and end-to-end analytics.',
      desktopImage:
        '/case-studies/scroll/roseville-dental-academy-desktop.webp',
      mobileImage: '/case-studies/scroll/roseville-dental-academy-mobile.webp',
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

const FEATURED_STORY_HREFS = new Set<string>(
  HOMEPAGE_CASE_STUDIES.slugs.map((slug) => `/case-studies/${slug}`),
)

export const HOMEPAGE_MORE_WORK = {
  eyebrow: 'more work',
  /** Current clients beyond the six featured stories. */
  count: CURRENT_CASE_STUDIES.length - FEATURED_STORY_HREFS.size,
  description: 'Every live client site. Click any frame.',
} as const

export const HOMEPAGE_AUDIENCE = {
  eyebrow: 'reach',
  title: 'we built our own audience from zero.',
  description: 'Our own channels first. Same engine for clients.',
  combined: {
    value: SOCIAL_PROOF.combinedAudience,
    label: 'followers and subscribers across YouTube, Instagram, and TikTok',
  },
  highlights: [
    {
      value: SOCIAL_PROOF.youtube.activity,
      label: 'channel views on YouTube',
    },
    {
      value: SOCIAL_PROOF.tiktok.activity,
      label: 'likes on TikTok',
    },
  ],
  channels: SOCIAL_PROOF_CHANNELS.map((channel) => ({
    platform: channel.platform,
    audience: channel.audience,
    audienceLabel: channel.audienceLabel,
    url: channel.url,
  })),
  /** Single-reel receipts from Prism's own Instagram insights. */
  receipts: {
    eyebrow: 'the receipts',
    title: 'one reel reached 1.6 million accounts.',
    items: TOP_REELS.map((reel) => ({
      id: reel.id,
      views: reel.views,
      accountsReached: reel.accountsReached,
      posted: reel.posted,
      image: reel.image,
      width: reel.width,
      height: reel.height,
      label: `views on one Instagram Reel, posted ${reel.posted}`,
    })),
  },
  note: `Audience as of ${SOCIAL_PROOF.youtube.verifiedAt}. Channel totals, not deduplicated people. Channel totals come from Ayrshare. YouTube subscribers are API-rounded; channel views include earlier content. Reel numbers come from Instagram Reel insights on Prism’s own account, as of each screenshot.`,
} as const

const COMMUNITY_HANDLES = [
  'relevique',
  'helder_movement',
  'aaronwbateman',
  '_dev_khant',
  'notpharaoh_',
  'andriiikoo',
  'mr.mazamio',
] as const

export const HOMEPAGE_TESTIMONIALS = {
  eyebrow: 'wall of love',
  title: 'in their words.',
  /** The line above the mid-page waitlist invitation under the wall. */
  nextLine: 'be the next note on this wall.',
  description: 'Verbatim notes from clients and followers.',
  clientQuotes: quotesData.filter(
    (quote) => isClientQuote(quote) && !quote.requiresConsent,
  ),
  communityQuotes: COMMUNITY_HANDLES.map((handle) =>
    quotesData.find(
      (quote) => quote.client === handle && !quote.requiresConsent,
    ),
  ).filter((quote): quote is (typeof quotesData)[number] => Boolean(quote)),
} as const

export const HOMEPAGE_FOUNDER = {
  eyebrow: 'who builds it',
  title: 'built by a founder chasing LA 2028.',
  name: 'Enzo Sison',
  role: 'Founder, Prism',
  facts: [
    'Two Apple internships',
    'Cal Poly engineering',
    'D1 track and field',
    'Pole vaulter for the Philippines',
  ],
  body: 'Founded Prism in 2023. Leads the team while vaulting professionally for the Philippines toward LA 2028.',
  image:
    '/enzo-sison.webp',
  motto: 'impossible is temporary.',
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

export const HOMEPAGE_CLIENT_WINS = {
  eyebrow: 'the work',
  title: 'proof you can click.',
  description:
    'Dentists in Palo Alto. A retail and e-bike shop in Tahoe. A kids’ foundation in Belize. Every site here is live, and every one has a case study.',
  slides: [
    {
      company: 'Olympic Bootworks',
      location: 'Tahoe, CA',
      href: '/case-studies/olympic-bootworks',
      contextLabel: 'Retail + e-bike catalog',
      image: '/case-studies/olympic-bootworks-home-mobile.jpg',
    },
    {
      company: 'Belize Kids',
      location: 'San Pedro, Belize',
      href: '/case-studies/belize-kids-foundation',
      contextLabel: 'Nonprofit impact',
      image: '/case-studies/belize-kids-foundation-home-mobile.jpg',
      metric: {
        value: BELIZE_SEARCH_METRIC.value,
        label: BELIZE_SEARCH_METRIC.label,
        source: BELIZE_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      },
    },
    {
      company: 'Rebellious Aging',
      location: 'Los Gatos, CA',
      href: '/case-studies/rebellious-aging',
      contextLabel: 'Community brand',
      image: '/case-studies/rebellious-aging-home-mobile.jpg',
    },
    {
      company: 'Infobell IT Solutions',
      location: 'Bengaluru, India',
      href: '/case-studies/infobell-it',
      contextLabel: 'AI + product engineering',
      image: '/case-studies/infobell-it-home-mobile.jpg',
    },
    {
      company: 'Christopher B. Wong, DDS',
      location: 'Palo Alto, CA',
      href: '/case-studies/dr-christopher-wong',
      contextLabel: 'Dental growth',
      image: '/case-studies/dr-christopher-wong-home-mobile.jpg',
      metric: {
        value: DR_WONG_SEARCH_METRIC.value,
        label: DR_WONG_SEARCH_METRIC.label,
        source: DR_WONG_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      },
    },
    {
      company: 'Exquisite Dentistry',
      location: 'Los Angeles, CA',
      href: '/case-studies/exquisite-dentistry',
      contextLabel: 'Dental growth',
      image: '/case-studies/exquisite-dentistry-home-mobile.jpg',
    },
    {
      company: 'Roseville Dental Academy',
      location: 'Roseville, CA',
      href: '/case-studies/roseville-dental-academy',
      contextLabel: 'Education + analytics',
      image: '/case-studies/roseville-dental-academy-home-mobile.jpg',
    },
    {
      company: 'Coast Periodontics',
      location: 'San Luis Obispo, CA',
      href: '/case-studies/coast-periodontics-and-laser-surgery',
      contextLabel: 'Specialty healthcare',
      image:
        '/case-studies/coast-periodontics-and-laser-surgery-home-mobile.jpg',
    },
    {
      company: 'Canary Cove',
      location: 'San Pedro, Belize',
      href: '/case-studies/canary-cove',
      contextLabel: 'Hospitality',
      image: '/case-studies/canary-cove-home-mobile.jpg',
    },
    {
      company: 'Family First Smile Care',
      location: 'Los Gatos, CA',
      href: '/case-studies/family-first-smile-care',
      contextLabel: 'Dental growth',
      image: '/case-studies/family-first-smile-care-home-mobile.jpg',
    },
    {
      company: 'Grace Dental',
      location: 'Santa Rosa, CA',
      href: '/case-studies/grace-dental-santa-rosa',
      contextLabel: 'Dental growth',
      image: '/case-studies/grace-dental-santa-rosa-home-mobile.jpg',
    },
    {
      company: 'We Are Saplings',
      location: 'Los Angeles, CA',
      href: '/case-studies/we-are-saplings',
      contextLabel: 'Children’s emotional learning',
      image: '/case-studies/we-are-saplings-home-mobile.jpg',
    },
    {
      company: 'Dental Strategies',
      location: 'Bay Area, CA',
      href: '/case-studies/michael-njo-dds',
      contextLabel: 'Dental growth',
      image: '/case-studies/michael-njo-dds-home-mobile.jpg',
    },
    {
      company: 'Canary Foundation',
      location: 'Palo Alto, CA',
      href: '/case-studies/canary-foundation',
      contextLabel: 'Nonprofit impact',
      image: '/case-studies/canary-foundation-home-mobile.jpg',
    },
    {
      company: 'Town Centre Dental',
      location: 'Brentwood, CA',
      href: '/case-studies/town-centre-dental',
      contextLabel: 'Dental growth',
      image: '/case-studies/town-centre-dental-home-mobile.jpg',
    },
    {
      company: 'Practice Transitions Institute',
      location: 'San Mateo, CA',
      href: '/case-studies/practice-transitions-institute',
      contextLabel: 'Dental transitions',
      image: '/case-studies/practice-transitions-institute-home-mobile.jpg',
    },
    {
      company: 'Wine Country Root Canal',
      location: 'Santa Rosa, CA',
      href: '/case-studies/wine-country-root-canal',
      contextLabel: 'Specialty healthcare',
      image: '/case-studies/wine-country-root-canal-home-mobile.jpg',
    },
    {
      company: 'Leadership Retreat',
      location: 'Savannah, GA',
      href: '/case-studies/leadership-retreat',
      contextLabel: 'Events + education',
      image: '/case-studies/leadership-retreat-home-mobile.jpg',
    },
    {
      company: 'Waikiki Dental',
      location: 'Roseville, CA',
      href: '/case-studies/waikiki-dental',
      contextLabel: 'Dental growth',
      image: '/case-studies/waikiki-dental-home-mobile.jpg',
    },
    {
      company: 'Sacramento Dental Medicine',
      location: 'Antelope, CA',
      href: '/case-studies/sacramento-dental-medicine',
      contextLabel: 'Dental growth',
      image: '/case-studies/sacramento-dental-medicine-home-mobile.jpg',
    },
    {
      company: 'Mataria Dental Group',
      location: 'Torrance, CA',
      href: '/case-studies/mataria-dental-group',
      contextLabel: 'Dental growth',
      image: '/case-studies/mataria-dental-group-home-mobile.jpg',
    },
  ] satisfies readonly HomepageClientWinSlide[],
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
