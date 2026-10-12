import { quotesData, isClientQuote } from '@/content/wall-of-love-data'
import { CASE_STUDIES, getCaseStudyMetric } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
  SOCIAL_PROOF,
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
const CURRENT_CLIENT_LOCATIONS = new Set(
  CURRENT_CASE_STUDIES.map((study) => study.location),
)

export const HOMEPAGE_HERO = {
  titleLead: 'make your business',
  titleAccent: 'impossible to ignore.',
  subheading:
    'Websites, content, and ads from one team. Built so the right people find you, trust you, and choose you.',
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
  proof: [
    { value: `${CURRENT_CASE_STUDIES.length}`, label: 'client case studies' },
    { value: `${CURRENT_CLIENT_LOCATIONS.size}`, label: 'cities' },
    {
      value: SOCIAL_PROOF.combinedAudience,
      label: 'followers on our own channels',
    },
  ],
} as const

export const HOMEPAGE_NUMBERS = {
  eyebrow: 'by the numbers',
  title: 'numbers, not adjectives.',
  description:
    'We publish results we can source and date. Here is what that looks like right now.',
  note: `Verified ${PROOF_METRICS_VERIFIED_AT}. Search results from Google Search Console, latest complete 90 days vs the same window a year earlier. New users from ${CONNECTED_CLIENT_TRAFFIC.source}, summed across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites for ${CONNECTED_CLIENT_TRAFFIC.month}. Lifetime views from YouTube Studio, including earlier channel content.`,
  stats: [
    {
      value: DR_WONG_SEARCH_METRIC.value,
      label: 'Google Search impressions for Dr. Wong, year over year',
      href: '/case-studies/dr-christopher-wong',
    },
    {
      value: BELIZE_SEARCH_METRIC.value,
      label: 'Google Search impressions for Belize Kids, year over year',
      href: '/case-studies/belize-kids-foundation',
    },
    {
      value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
      label: `new users across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} client sites we track, ${CONNECTED_CLIENT_TRAFFIC.month}`,
      href: '/case-studies',
    },
    {
      value: SOCIAL_PROOF.youtube.activity,
      label: 'lifetime views on the Prism YouTube channel',
      href: '/content',
    },
  ],
} as const

export const HOMEPAGE_SERVICES = {
  eyebrow: 'what we do',
  title: 'one team. every channel.',
  description:
    'Your website, content, and ads, built together so each one makes the others work harder.',
} as const

export const HOMEPAGE_CASE_STUDIES = {
  eyebrow: 'up close',
  title: 'real clients. real launches.',
  description:
    'Four businesses, four different problems, one team behind every pixel.',
  slugs: [
    'dr-christopher-wong',
    'belize-kids-foundation',
    'exquisite-dentistry',
    'olympic-bootworks',
  ],
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
