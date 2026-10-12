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
  titleLead: 'impossible is',
  titleAccent: 'temporary.',
  subheading:
    'Websites, content, and ads that make your business shine online, turn visitors into customers, and reach people who have never heard of you.',
  primaryCta: { label: 'Join the waitlist', href: '/waitlist' },
  secondaryCta: { label: 'See the work', href: '#work' },
  /** Labels for the refracted bands, top to bottom. */
  spectrumLabels: [
    'website',
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
  description:
    'We publish results we can source and date. Here is what that looks like right now.',
  note: `Verified ${PROOF_METRICS_VERIFIED_AT}. Search results from Google Search Console, latest complete 90 days vs the same window a year earlier. New users from ${CONNECTED_CLIENT_TRAFFIC.source}, summed across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites for ${CONNECTED_CLIENT_TRAFFIC.month}. Case studies count current clients only.`,
  stats: [
    {
      value: DR_WONG_SEARCH_METRIC.value,
      label: 'Google Search impressions for Dr. Wong, year over year',
      source: DR_WONG_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      href: '/case-studies/dr-christopher-wong',
    },
    {
      value: BELIZE_SEARCH_METRIC.value,
      label: 'Google Search impressions for Belize Kids, year over year',
      source: BELIZE_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      href: '/case-studies/belize-kids-foundation',
    },
    {
      value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
      label: `new users in ${CONNECTED_CLIENT_TRAFFIC.month} across the client sites we track`,
      source: CONNECTED_CLIENT_TRAFFIC.source,
      href: '/case-studies',
    },
    {
      value: `${CURRENT_CASE_STUDIES.length}`,
      label: 'live client sites, each with a published case study',
      source: 'Prism case studies',
      href: '/case-studies',
    },
  ],
} as const

export const HOMEPAGE_SERVICES = {
  eyebrow: 'what we do',
  title: 'shine. convert. get seen.',
  description:
    'Everything your business needs online, from one team, built so each piece makes the others work harder.',
  pillars: [
    {
      key: 'shine',
      title: 'shine.',
      lead: 'A website and brand people remember.',
      body: 'Custom-coded sites, brand, photo, and video that look as good as your work is.',
      items: ['Custom-coded websites', 'Brand and identity', 'Photo and video'],
      links: [{ label: 'Websites', href: '/websites' }],
    },
    {
      key: 'convert',
      title: 'convert.',
      lead: 'Built so more visitors call, book, and buy.',
      body: 'Pages, booking, reviews, and tracking designed around the moment someone decides.',
      items: [
        'Conversion-first pages',
        'Booking and forms',
        'Reviews and proof',
        'Call and form tracking',
      ],
      links: [{ label: 'See the results', href: '/case-studies' }],
    },
    {
      key: 'reach',
      title: 'get seen.',
      lead: 'Fresh eyes on your business.',
      body: 'Content people watch, ads that land on a page worth landing on, and answers in search and AI.',
      items: [
        'Short-form content',
        'Google, Meta, and TikTok ads',
        'Search and AI answers',
        'Google Business Profile',
      ],
      links: [
        { label: 'Content', href: '/content' },
        { label: 'Ads', href: '/ads' },
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
 * The five featured stories (2026-10 v2). Every line paraphrases the
 * published case study in lib/case-study-data.ts; nothing here is a client
 * quote or a number. `slugs` mirrors the stories for the former-client guard.
 */
export const HOMEPAGE_CASE_STUDIES = {
  eyebrow: 'the work',
  title: 'every business has an impossible.',
  description:
    'Five businesses, each with something that felt out of reach. Here is what is live now.',
  /** The line above the mid-page waitlist invitation after the deck. */
  nextLine: 'your business could be the next story.',
  slugs: [
    'exquisite-dentistry',
    'canary-cove',
    'practice-transitions-institute',
    'olympic-bootworks',
    'roseville-dental-academy',
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
        'A website as refined as the chair-side experience, without risking the search traffic that already brought patients in.',
      built: ['Site rebuild', 'Booking flow', 'SEO protection', 'Attribution'],
      now: 'Premium positioning patients can feel online, cleaner paths to book, and the measurement to keep improving.',
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
        'Making a guest feel the beach on Ambergris Caye before they ever book a flight.',
      built: ['Immersive visuals', 'Concierge inquiries', 'Analytics'],
      now: 'A site that sells the stay the way the place does, with clean inquiry paths and measurement behind it.',
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
      now: 'Their authority is visible before a conversation starts, with measurable paths from quiet research to consultation.',
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
        'Turning a legendary fitting room into a store riders can shop from hours away.',
      built: [
        'Site rebuild',
        'Fantic e-bike catalog',
        'Test-ride requests',
        'Owned email + domain',
      ],
      now: 'Riders compare Fantic models and current pricing, request a test ride, and reach the shop directly.',
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
        'Turning a stock template site into an admissions system the school can actually measure.',
      built: [
        'Modern web platform',
        'Analytics + search setup',
        'Enrollment forms',
        'AI assistant',
      ],
      now: 'Clear paths for every program, cleaner lead capture, and the analytics to keep improving enrollment.',
      desktopImage:
        '/case-studies/scroll/roseville-dental-academy-desktop.webp',
      mobileImage: '/case-studies/scroll/roseville-dental-academy-mobile.webp',
    },
  ] satisfies readonly HomepageStory[],
} as const

const FEATURED_STORY_HREFS = new Set<string>(
  HOMEPAGE_CASE_STUDIES.slugs.map((slug) => `/case-studies/${slug}`),
)

export const HOMEPAGE_MORE_WORK = {
  eyebrow: 'more work',
  /** Current clients beyond the five featured stories. */
  count: CURRENT_CASE_STUDIES.length - FEATURED_STORY_HREFS.size,
  description:
    'Dentists in Palo Alto. A kids’ foundation in Belize. An IT firm in Bengaluru. Each one has its own case study.',
} as const

export const HOMEPAGE_AUDIENCE = {
  eyebrow: 'reach',
  title: 'we built our own audience from zero.',
  description:
    'Before we grew anyone else’s reach, we grew our own. The same playbook goes to work on your business.',
  combined: {
    value: SOCIAL_PROOF.combinedAudience,
    label: 'followers and subscribers across YouTube, Instagram, and TikTok',
  },
  highlights: [
    {
      value: SOCIAL_PROOF.youtube.activity,
      label: 'lifetime views on YouTube',
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
  note: `Audience as of ${SOCIAL_PROOF.youtube.verifiedAt}. Channel totals, not deduplicated people. YouTube views come from YouTube Studio and include earlier channel content. Reel numbers come from Instagram Reel insights on Prism’s own account, as of each screenshot.`,
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
  description:
    'From the owners we build for, and from the people who watch what we make.',
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
  body: 'Enzo founded Prism in 2023 to help small businesses turn a stronger online presence into more customer conversations. He builds Prism while pole vaulting for the Philippines on the path to LA 2028.',
  image:
    'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765426902/Enzo_s_Headshot_xg546f.webp',
  motto: 'impossible is temporary.',
} as const

export const HOMEPAGE_HOW_IT_WORKS = {
  eyebrow: 'how to get in',
  title: 'fully booked. here’s how to get in.',
  steps: [
    {
      title: 'apply in two minutes.',
      body: 'Tell us what you want help with, share your links, and say what a great year looks like.',
    },
    {
      title: 'we review every month.',
      body: 'Each intake, our team reads every application and looks for the businesses we can help most.',
    },
    {
      title: 'we build together.',
      body: 'When a spot opens, we reach out, agree on scope, and get to work.',
    },
  ],
} as const

export const HOMEPAGE_PRODUCTS = {
  eyebrow: 'products',
  title: 'built for our team. free for yours.',
  description:
    'We make our own tools to work faster. Two of them are free and open source.',
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
          'No. We work with retailers, consultants, nonprofits, schools, hospitality brands, and local services. Dental practices are a specialty, and you can explore examples in our case studies.',
      },
    ],
  },
  {
    question: 'What do you review when I join the waitlist?',
    answer: [
      {
        type: 'paragraph',
        content:
          'We review the links and goals you share: your website, search visibility, reviews, and tracking. We look for what makes your business easy to find, understand, and contact.',
      },
    ],
  },
  {
    question: 'Do I need to understand SEO, ads, or AI search?',
    answer: [
      {
        type: 'paragraph',
        content:
          'No. Prism handles the strategy and execution behind the scenes, then explains what matters in plain language.',
      },
    ],
  },
  {
    question: 'Can Prism help if we already have a website?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Yes. Sometimes the right move is a full rebuild. Sometimes it is fixing visibility, proof, content, speed, calls, forms, or tracking first.',
      },
    ],
  },
  {
    question: 'What is the first step?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Join the waitlist and share your website and goals. For each monthly intake, our team reviews applications and reaches out when we can take on your team. We agree on scope together before any work starts.',
      },
    ],
  },
] as const
