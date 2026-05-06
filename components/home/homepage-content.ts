import { getHeroReviewCount, quotesData } from '@/content/wall-of-love-data'
import { HOTTEST_CONTENT } from '@/lib/hottest-content'

export type HomepageFAQBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] }

export type HomepageFAQItem = {
  question: string
  answer: HomepageFAQBlock[]
}

type HomepageIconCard = {
  title: string
  description: string
  iconSrc: string
}

type HomepageHeroSupportPoint = {
  label: string
  iconSrc: string
  iconInvert?: boolean
  variant?: 'default' | 'aiRecommendation'
}

type HomepageProblemPoint = {
  label: string
  text: string
  iconSrc: string
}

type HomepageProblemStackItem = {
  label: string
  iconSrc: string
}

type HomepageAiTool = {
  name: string
  logoSrc: string
  logoAlt: string
}

export type HomepageDentistWinSlide = {
  dentist: string
  practice: string
  location: string
  href: string
  contextLabel: string
  imageSrc?: string
  imageAlt: string
  objectPosition?: string
  isPlaceholder?: boolean
}

export type HomepageGrowthRampMetric = {
  day: string
  value: string
  label: string
  detail: string
}

export const HOMEPAGE_CASE_STUDY_SLUGS = [
  'dr-christopher-wong',
  'exquisite-dentistry',
  'laguna-beach-dental-arts',
  'family-first-smile-care',
  'grace-dental-santa-rosa',
  'town-centre-dental',
  'coast-periodontics-and-laser-surgery',
  'wine-country-root-canal',
] as const

const HOMEPAGE_HERO_REVIEW_COUNT = getHeroReviewCount()
const HOMEPAGE_HERO_REVIEW_COUNT_LABEL =
  HOMEPAGE_HERO_REVIEW_COUNT >= 20 ? '20+' : `${HOMEPAGE_HERO_REVIEW_COUNT}`

export const HOMEPAGE_HERO = {
  eyebrow: 'Dental growth',
  title: 'Get found. Get trusted. Get booked.',
  description: 'Premium growth systems for modern dental practices.',
  supportPoints: [
    {
      label: 'Can ChatGPT recommend you?',
      iconSrc: '/home-hero/logos/openai.svg',
      iconInvert: false,
      variant: 'aiRecommendation',
    },
    {
      label: 'Reviews',
      iconSrc: '/pixelish/award-checkmark.svg',
    },
    {
      label: 'Appointments',
      iconSrc: '/pixelish/calendar.svg',
    },
  ] satisfies readonly HomepageHeroSupportPoint[],
  socialProof: {
    headline: `${HOMEPAGE_HERO_REVIEW_COUNT_LABEL} reviews from dental and local leaders`,
    linkLabel: 'Results',
  },
  primaryCtaLabel: 'Free Practice Audit',
  secondaryCtaLabel: 'See the system',
} as const

export const HOMEPAGE_DENTIST_WINS = {
  eyebrow: 'Clients',
  title: 'Top Dentists in CA use Prism',
  description: '',
  slides: [
    {
      dentist: 'Dr. Alexie Aguil',
      practice: 'Exquisite Dentistry',
      location: 'Beverly Hills, CA',
      href: '/case-studies/exquisite-dentistry',
      contextLabel: 'Patient practice',
      imageSrc: '/dr-alexie-aguil.png',
      imageAlt: 'Dr. Alexie Aguil of Exquisite Dentistry',
      objectPosition: '68% center',
    },
    {
      dentist: 'Dr. Christopher B. Wong',
      practice: 'Silicon Valley Dental',
      location: 'Palo Alto, CA',
      href: '/case-studies/dr-christopher-wong',
      contextLabel: 'Patient practice',
      imageSrc: '/dr-chris-wong.png',
      imageAlt: 'Dr. Christopher B. Wong inside his dental practice',
      objectPosition: 'center center',
    },
    {
      dentist: 'Dr. Craig Anderson',
      practice: 'Wine Country Root Canal',
      location: 'Santa Rosa, CA',
      href: '/case-studies/wine-country-root-canal',
      contextLabel: 'Specialty practice',
      imageSrc: '/dr-craig-anderson.webp',
      imageAlt: 'Dr. Craig Anderson of Wine Country Root Canal',
      objectPosition: 'center 18%',
    },
    {
      dentist: 'Dr. Bryce Chun',
      practice: 'Coast Periodontics',
      location: 'San Luis Obispo, CA',
      href: '/case-studies/coast-periodontics-and-laser-surgery',
      contextLabel: 'Specialty practice',
      imageSrc: '/dr-bryce-chun.jpeg',
      imageAlt: 'Dr. Bryce Chun of Coast Periodontics',
      objectPosition: 'center 18%',
    },
    {
      dentist: 'Dr. Michael Narodovich',
      practice: 'Roseville Dental Academy',
      location: 'Roseville, CA',
      href: '/case-studies',
      contextLabel: 'Dental education',
      imageSrc: '/dr-narodovich-headshot.png',
      imageAlt: 'Dr. Michael Narodovich of Roseville Dental Academy',
      objectPosition: 'center 18%',
    },
    {
      dentist: 'Dr. Tim Chuang',
      practice: 'Family First Smile Care',
      location: 'Los Gatos, CA',
      href: '/case-studies/family-first-smile-care',
      contextLabel: 'Patient practice',
      imageSrc: '/dr-tim-chuang.png',
      imageAlt: 'Dr. Tim Chuang of Family First Smile Care',
      objectPosition: 'center 18%',
    },
    {
      dentist: 'Dr. Tingjen Ji',
      practice: 'Grace Dental Santa Rosa',
      location: 'Santa Rosa, CA',
      href: '/case-studies/grace-dental-santa-rosa',
      contextLabel: 'Patient practice',
      imageSrc: '/dr-ji-headshot.png',
      imageAlt: 'Dr. Tingjen Ji of Grace Dental Santa Rosa',
      objectPosition: 'center 18%',
    },
    {
      dentist: 'Dr. Gerard Banaga',
      practice: 'Town Centre Dental',
      location: 'Brentwood, CA',
      href: '/case-studies/town-centre-dental',
      contextLabel: 'Patient practice',
      imageSrc: '/dr-banaga-headshot.png',
      imageAlt: 'Dr. Gerard Banaga of Town Centre Dental',
      objectPosition: 'center center',
    },
    {
      dentist: 'Dr. Michael Njo',
      practice: 'Dental Strategies + PTI',
      location: 'San Mateo, CA',
      href: '/case-studies/michael-njo-dds',
      contextLabel: 'Practice + advisory',
      imageSrc: '/dr-michael-njo.jpeg',
      imageAlt:
        'Dr. Michael Njo of Dental Strategies and Practice Transitions Institute',
      objectPosition: 'center center',
    },
    {
      dentist: 'Liz Armato',
      practice: 'Dentist Retreat',
      location: 'San Francisco, CA',
      href: '/case-studies/leadership-retreat',
      contextLabel: 'Event website',
      imageSrc: '/liz-armato-pti.jpg',
      imageAlt: 'Liz Armato of Dentist Retreat',
      objectPosition: 'center center',
    },
    {
      dentist: 'Dr. Teagan Willes',
      practice: 'Laguna Beach Dental Arts',
      location: 'Laguna Beach, CA',
      href: '/case-studies/laguna-beach-dental-arts',
      contextLabel: 'Case study client',
      imageSrc: '/dr-teagan-willes-headshot.jpeg',
      imageAlt: 'Dr. Teagan Willes near the Laguna Beach Dental Arts practice',
      objectPosition: '70% center',
    },
    {
      dentist: 'Dr. Ahmed Mataria',
      practice: 'Mataria Dental Group',
      location: 'Torrance, CA',
      href: '/case-studies/mataria-dental-group',
      contextLabel: 'Case study client',
      imageSrc: '/dr-ahmed-mataria.jpeg',
      imageAlt: 'Dr. Ahmed Mataria of Mataria Dental Group',
      objectPosition: 'center center',
    },
  ] satisfies readonly HomepageDentistWinSlide[],
} as const

export const HOMEPAGE_GROWTH_RAMP = {
  eyebrow: 'Growth ramp',
  title: 'First 90 days.',
  microcopy: 'Aggressive targets. Real systems.',
  finePrint:
    'Targets vary by market, specialty, starting point, budget, and front-desk follow-up.',
  metrics: [
    {
      day: 'Day 30',
      value: '+25%',
      label: 'patient actions',
      detail: 'Calls, forms, booking clicks, directions.',
    },
    {
      day: 'Day 60',
      value: '+50%',
      label: 'qualified demand',
      detail: 'Higher-intent traffic and tracked source clarity.',
    },
    {
      day: 'Day 90',
      value: '10-30',
      label: 'new patient opportunities/mo',
      detail: 'Target range once website, Google, reviews, and ads compound.',
    },
  ] satisfies readonly HomepageGrowthRampMetric[],
} as const

export const HOMEPAGE_PROBLEM = {
  title: 'Patients decide fast.',
  description: 'They check Google, reviews, ChatGPT, and your website.',
  points: [
    {
      label: 'Can they find you?',
      text: '',
      iconSrc: '/pixelish/lens.svg',
    },
    {
      label: 'Do they trust you?',
      text: '',
      iconSrc: '/pixelish/award-checkmark.svg',
    },
    {
      label: 'Can ChatGPT recommend you?',
      text: '',
      iconSrc: '/pixelish/chatgpt.svg',
    },
    {
      label: 'Can they book?',
      text: '',
      iconSrc: '/pixelish/calendar.svg',
    },
  ] satisfies readonly HomepageProblemPoint[],
  stackLabel: 'What patients scan',
  stack: [
    { label: 'Website', iconSrc: '/pixelish/browser.svg' },
    { label: 'Google Maps', iconSrc: '/pixelish/lens.svg' },
    { label: 'Reviews', iconSrc: '/pixelish/emoji-heart.svg' },
    { label: 'ChatGPT', iconSrc: '/pixelish/chatgpt.svg' },
  ] satisfies readonly HomepageProblemStackItem[],
} as const

export const HOMEPAGE_AI_TOOLS = {
  title: 'Modern tools, handled quietly.',
  tools: [
    {
      name: 'Codex',
      logoSrc: '/logos/ai-tools/codex.svg',
      logoAlt: 'Codex logo',
    },
    {
      name: 'Claude Code',
      logoSrc: '/logos/ai-tools/claude.svg',
      logoAlt: 'Claude Code logo',
    },
    {
      name: 'Gemini',
      logoSrc: '/logos/ai-tools/gemini.svg',
      logoAlt: 'Gemini logo',
    },
    {
      name: 'OpenClaw',
      logoSrc: '/logos/ai-tools/openclaw.svg',
      logoAlt: 'OpenClaw logo',
    },
    {
      name: 'Grok',
      logoSrc: '/logos/ai-tools/grok.svg',
      logoAlt: 'Grok logo',
    },
    {
      name: 'Cursor',
      logoSrc: '/logos/ai-tools/cursor.svg',
      logoAlt: 'Cursor logo',
    },
  ] satisfies readonly HomepageAiTool[],
} as const

export const HOMEPAGE_PROMISE = {
  title: 'Found. Trusted. Booked.',
} as const

export const HOMEPAGE_PROMISE_CARDS: readonly HomepageIconCard[] = [
  {
    title: 'Found',
    description: 'Google Maps',
    iconSrc: '/pixelish/lens.svg',
  },
  {
    title: 'Trusted',
    description: 'Reviews',
    iconSrc: '/pixelish/award-checkmark.svg',
  },
  {
    title: 'Booked',
    description: 'Appointments',
    iconSrc: '/pixelish/users.svg',
  },
] as const

export const HOMEPAGE_SERVICES = {
  title: 'One system. Seven parts.',
  description: 'Google. Reviews. ChatGPT. Booked demand.',
  closingLine: '',
} as const

export const HOMEPAGE_SERVICE_ITEMS: readonly HomepageIconCard[] = [
  {
    title: 'Website',
    description: '',
    iconSrc: '/pixelish/browser.svg',
  },
  {
    title: 'Google Maps',
    description: '',
    iconSrc: '/pixelish/lens.svg',
  },
  {
    title: 'Reviews',
    description: '',
    iconSrc: '/pixelish/emoji-heart.svg',
  },
  {
    title: 'Ads',
    description: '',
    iconSrc: '/pixelish/device-radio.svg',
  },
  {
    title: 'Treatment pages',
    description: '',
    iconSrc: '/pixelish/document-letter.svg',
  },
  {
    title: 'Tracking',
    description: '',
    iconSrc: '/pixelish/bar-chart-average.svg',
  },
  {
    title: 'ChatGPT',
    description: '',
    iconSrc: '/pixelish/chatgpt.svg',
  },
] as const

export const HOMEPAGE_WHY_PRISM = {
  title: 'Why owner-dentists choose Prism',
} as const

export const HOMEPAGE_DIFFERENTIATORS: readonly HomepageIconCard[] = [
  {
    title: 'Simple enough for a busy practice',
    description:
      'Clear priorities, plain-English updates, and no extra homework for the doctor or front desk.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    title: 'Premium without feeling clinical',
    description:
      'A calm, modern presence that feels high-trust without turning the practice into a generic healthcare template.',
    iconSrc: '/pixelish/award.svg',
  },
  {
    title: 'One connected partner',
    description:
      'Website, Google visibility, reviews, ads, content, tracking, and AI search move together instead of fighting across vendors.',
    iconSrc: '/pixelish/command.svg',
  },
  {
    title: 'Built around patient decisions',
    description:
      'Every page, profile, and campaign is shaped around how patients compare practices before they call.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Honest and steady',
    description:
      'No loud agency promises. No confusing reports. Just the clearest next move and the work to make it happen.',
    iconSrc: '/pixelish/emoji-heart.svg',
  },
] as const

export const HOMEPAGE_HOW_IT_WORKS = {
  title: 'How it works',
  ctaLabel: 'Start free audit',
} as const

export const HOMEPAGE_HOW_IT_WORKS_STEPS = [
  {
    title: 'Submit practice',
    description: '',
  },
  {
    title: 'We audit',
    description: '',
  },
  {
    title: 'Get next steps',
    description: '',
  },
] as const

export const HOMEPAGE_PROOF = {
  title: 'Dental proof',
  description: '',
  ctaLabel: 'See dental results',
} as const

export const HOMEPAGE_CASE_STUDY_SUMMARIES: Record<string, string> = {
  'dr-christopher-wong':
    'A calmer, more credible dental presence shaped around patient trust and appointment momentum.',
  'exquisite-dentistry':
    'A premium dental website that makes it easier for patients to understand care, trust the team, and take action.',
  'laguna-beach-dental-arts':
    'A coastal dental brand presence that balances high-end care with local warmth and approachability.',
  'family-first-smile-care':
    'A family-focused practice story built to feel reassuring, organized, and easy for new patients to enter.',
  'grace-dental-santa-rosa':
    'A modern dental web presence with clearer service navigation and stronger patient confidence signals.',
  'town-centre-dental':
    'A local practice presence built to make everyday dental decisions feel simple and trustworthy.',
  'coast-periodontics-and-laser-surgery':
    'A specialist site that turns intimidating procedures into calm, confidence-building patient education.',
  'wine-country-root-canal':
    'An endodontic experience that makes urgent specialty care feel calm, precise, and easier to choose.',
}

export const HOMEPAGE_CASE_STUDY_SIGNALS: Record<
  string,
  { artifact: string; outcome: string; proof: string }
> = {
  'dr-christopher-wong': {
    artifact: 'Trust-first refresh',
    outcome: 'Clearer patient confidence',
    proof:
      'The practice story became easier to understand before the first call.',
  },
  'exquisite-dentistry': {
    artifact: 'Premium dental rebuild',
    outcome: 'Trust + booking clarity',
    proof: 'Digital presence matched the level of clinical care.',
  },
  'laguna-beach-dental-arts': {
    artifact: 'Local brand system',
    outcome: 'Premium coastal trust',
    proof:
      'The practice feels distinctive without making patients work to understand it.',
  },
  'family-first-smile-care': {
    artifact: 'Family care journey',
    outcome: 'Approachable booking path',
    proof: 'The site supports families who need clarity before choosing care.',
  },
  'grace-dental-santa-rosa': {
    artifact: 'Service clarity',
    outcome: 'Easier treatment discovery',
    proof: 'Patients can move from need to next step with less friction.',
  },
  'town-centre-dental': {
    artifact: 'Practice growth base',
    outcome: 'Local patient readiness',
    proof: 'The experience gives nearby patients a clearer reason to call.',
  },
  'coast-periodontics-and-laser-surgery': {
    artifact: 'Specialist authority',
    outcome: 'Lower patient anxiety',
    proof: 'Complex periodontal care is explained with calm, human confidence.',
  },
  'wine-country-root-canal': {
    artifact: 'Urgent-care clarity',
    outcome: 'Specialty trust',
    proof: 'Root canal care feels precise, calm, and easier to act on.',
  },
}

export const HOMEPAGE_FIT = {
  title: 'Who Prism is built for',
  fitHeading: 'Prism is a good fit if...',
  fitItems: [
    'You are an owner-dentist or dental leader who wants more qualified patients to find the practice.',
    'You care about Google Maps, reviews, patient trust, and booked appointments.',
    'Your website feels behind the quality of your care.',
    'You want clear tracking without becoming the marketing manager.',
    'You want a trusted partner you can keep working with long term.',
    'You care about premium design, clarity, and steady practice growth.',
  ],
  fitClosing: 'If that sounds like your practice, Prism was built for you.',
  notFitHeading: 'Prism may not be the right fit if...',
  notFitItems: [
    'You want the cheapest option.',
    'You want overnight results with no real strategy.',
    'You want a vendor to just take random orders.',
    'You do not value quality, patient trust, or long term growth.',
  ],
  notFitClosing:
    'We do our best work with practices that want to build something strong over time.',
} as const

export const HOMEPAGE_FINAL_CTA = {
  title: 'See what to fix first.',
  description:
    'Free audit for your website, Google profile, reviews, and booking path.',
  primaryCtaLabel: 'Start free audit',
  supportLine: '',
} as const

export const HOMEPAGE_STATS = [
  { value: '10', label: 'dental practice stories' },
  { value: '5-star', label: 'review-led trust signals' },
  { value: 'one team', label: 'website + Google + reviews + ads' },
  { value: '24/7', label: 'AI-ready discovery layer' },
] as const

export const HOMEPAGE_HERO_FACTS = [
  { value: '10', label: 'dental practice stories' },
  { value: 'one partner', label: 'from audit to execution' },
  {
    value: 'website + Google + reviews + ads',
    label: 'under one dental growth rhythm',
  },
] as const

export const HOMEPAGE_SYSTEM_STEPS = [
  {
    title: 'Visibility',
    description: 'Get found.',
  },
  {
    title: 'Trust',
    description: 'Earn confidence.',
  },
  {
    title: 'Booking',
    description: 'Turn intent into appointments.',
  },
] as const

export const HOMEPAGE_CAPABILITIES = [
  {
    title: 'Dental websites',
    description: 'Explain care clearly.',
  },
  {
    title: 'Google Maps',
    description: 'Show up locally.',
  },
  {
    title: 'Treatment pages',
    description: 'Answer patient questions.',
  },
  {
    title: 'Dental ads',
    description: 'Find the right patients.',
  },
  {
    title: 'Reviews',
    description: 'Build patient trust.',
  },
  {
    title: 'Tracking',
    description: 'Know what books.',
  },
] as const

const UNIQUE_HOTTEST_CONTENT = Array.from(
  new Map(
    HOTTEST_CONTENT.filter((item) => item.platform === 'instagram').map(
      (item) => [item.instagramUrl, item] as const,
    ),
  ).values(),
)

const HOMEPAGE_CONTENT_VIEW_COUNT = UNIQUE_HOTTEST_CONTENT.reduce(
  (sum, item) => sum + item.views,
  0,
)

function formatHomepageMetric(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }

  return `${Math.round(value / 1_000)}k`
}

export const HOMEPAGE_CONTENT_PROOF = {
  eyebrow: 'content delivery',
  summary: `${formatHomepageMetric(HOMEPAGE_CONTENT_VIEW_COUNT)}+ views across Prism content systems.`,
  href: '/hottest-content',
} as const

export const HOMEPAGE_SEARCH_PROOF = {
  src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search-olympic-bootworks_issxqh.webp',
  alt: 'Google Search Console growth for Olympic Bootworks',
  width: 498,
  height: 667,
  eyebrow: 'search visibility',
  summary: 'Local visibility that compounds.',
} as const

export const HOMEPAGE_SEARCH_CONSOLE_SLIDES = [
  {
    src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search-olympic-bootworks_issxqh.webp',
    alt: 'Google Search Console growth for Olympic Bootworks',
    width: 498,
    height: 667,
  },
  {
    src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search_lwg9un.webp',
    alt: 'Google Search Console growth for a Prism client',
    width: 495,
    height: 666,
  },
  {
    src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372191/LV-google-search_pyr1sx.webp',
    alt: 'Google Search Console growth for a Prism client in Las Vegas',
    width: 496,
    height: 667,
  },
] as const

export const HOMEPAGE_ROADMAP_PHASES = [
  {
    title: 'Visibility',
    description: 'What to fix first so patients can find you.',
  },
  {
    title: 'Trust',
    description: 'What helps patients feel ready to call.',
  },
  {
    title: 'Booking',
    description: 'What turns online attention into appointments.',
  },
] as const

export const HOMEPAGE_CTA_NOTES = [
  'Website',
  'Google',
  'Reviews',
  'Booking',
] as const

const HOMEPAGE_TESTIMONIAL_IDS = [1, 2] as const

export const HOMEPAGE_TESTIMONIALS = HOMEPAGE_TESTIMONIAL_IDS.map((id) =>
  quotesData.find((quote) => quote.id === id),
).filter((quote): quote is (typeof quotesData)[number] => Boolean(quote))

export const HOMEPAGE_FAQ_ITEMS: HomepageFAQItem[] = [
  {
    question: 'Is this only for dentists?',
    answer: [
      {
        type: 'paragraph',
        content:
          'The homepage is dental-first because Prism has deep proof in dental and healthcare-adjacent local growth. We still help select non-dental local businesses, but the free practice audit is built for dental practices.',
      },
    ],
  },
  {
    question: 'What do you review in the free practice audit?',
    answer: [
      {
        type: 'paragraph',
        content:
          'We review the website, Google presence, reviews, booking path, treatment pages, tracking, and the patient trust signals that affect whether someone calls.',
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
          'Yes. Sometimes the right move is a full rebuild. Sometimes it is fixing visibility, reviews, service pages, speed, calls, forms, or tracking first.',
      },
    ],
  },
  {
    question: 'What is the first step?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Start with the free practice audit. Submit your practice, and we will review the patient journey before recommending next steps.',
      },
    ],
  },
] as const
