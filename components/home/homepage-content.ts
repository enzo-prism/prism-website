import { getHeroReviewCount, quotesData } from '@/content/wall-of-love-data'
import type { BrandLogoKey, BrandLogoTheme } from '@/components/brand-logo'
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
  href?: string
  brandLogo?: BrandLogoKey
  brandLogoTheme?: BrandLogoTheme
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
  iconSrc?: string
  brandLogo?: BrandLogoKey
  brandLogoTheme?: BrandLogoTheme
}

type HomepageProblemStackItem = {
  label: string
  iconSrc?: string
  brandLogo?: BrandLogoKey
  brandLogoTheme?: BrandLogoTheme
}

type HomepageAiTool = {
  name: string
  logoSrc: string
  logoAlt: string
}

export type HomepageClientWinSlide = {
  leader: string
  company: string
  location: string
  href: string
  contextLabel: string
  /** Portrait screenshot of the client's live website used as the cover-flow cover. */
  image: string
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
  'olympic-bootworks',
  'roseville-dental-academy',
  'rebellious-aging',
  'saorsa-growth-partners',
  'belize-kids-foundation',
  'canary-cove',
] as const

const HOMEPAGE_HERO_REVIEW_COUNT = getHeroReviewCount()
const HOMEPAGE_HERO_REVIEW_COUNT_LABEL =
  HOMEPAGE_HERO_REVIEW_COUNT >= 20 ? '20+' : `${HOMEPAGE_HERO_REVIEW_COUNT}`

export const HOMEPAGE_HERO = {
  eyebrow: 'The growth system for real businesses',
  title: 'Get found. Get trusted. Get chosen.',
  titleLines: ['Get found.', 'Get trusted.', 'Get chosen.'],
  description:
    'Prism is one team that builds and runs everything that brings you customers — your website, Google search, reviews, ads, and AI visibility. One system, working together.',
  supportPoints: [
    {
      label: 'Can ChatGPT recommend you?',
      iconSrc: '/home-hero/logos/openai.svg',
      iconInvert: false,
      variant: 'aiRecommendation',
    },
    {
      label: 'One team',
      iconSrc: '/pixelish/command.svg',
    },
    {
      label: 'Measurable results',
      iconSrc: '/pixelish/bar-chart-average.svg',
    },
  ] satisfies readonly HomepageHeroSupportPoint[],
  systemStrip: [
    'Website',
    'Search',
    'Reviews',
    'Ads',
    'Content',
    'Tracking',
    'AI',
  ],
  socialProof: {
    headline: `${HOMEPAGE_HERO_REVIEW_COUNT_LABEL} reviews from founders, doctors, operators, and local leaders`,
    linkLabel: 'See results',
  },
  primaryCtaLabel: 'Get my free growth audit',
  secondaryCtaLabel: 'See how it works',
} as const

export const HOMEPAGE_CLIENT_WINS = {
  eyebrow: 'Clients',
  title: 'Great companies use Prism',
  description: '',
  slides: [
    {
      leader: 'Buck Brown',
      company: 'Olympic Bootworks',
      location: 'Tahoe, CA',
      href: '/case-studies/olympic-bootworks',
      contextLabel: 'Retail + ecommerce',
      image: '/case-studies/olympic-bootworks-home-mobile.jpg',
    },
    {
      leader: 'Dr. Alexie Aguil',
      company: 'Exquisite Dentistry',
      location: 'Beverly Hills, CA',
      href: '/case-studies/exquisite-dentistry',
      contextLabel: 'Dental growth',
      image: '/case-studies/exquisite-dentistry-home-mobile.jpg',
    },
    {
      leader: 'Dr. Christopher B. Wong',
      company: 'Silicon Valley Dental',
      location: 'Palo Alto, CA',
      href: '/case-studies/dr-christopher-wong',
      contextLabel: 'Dental growth',
      image: '/case-studies/dr-christopher-wong-home-mobile.jpg',
    },
    {
      leader: 'Roseville Dental Academy',
      company: 'Admissions platform',
      location: 'Roseville, CA',
      href: '/case-studies/roseville-dental-academy',
      contextLabel: 'Education + analytics',
      image: '/case-studies/roseville-dental-academy-home-mobile.jpg',
    },
    {
      leader: 'Rebellious Aging',
      company: 'Online community',
      location: 'Los Gatos, CA',
      href: '/case-studies/rebellious-aging',
      contextLabel: 'Community brand',
      image: '/case-studies/rebellious-aging-home-mobile.jpg',
    },
    {
      leader: 'Saorsa Growth Partners',
      company: 'Advisory firm',
      location: 'San Francisco, CA',
      href: '/case-studies/saorsa-growth-partners',
      contextLabel: 'Consulting',
      image: '/case-studies/saorsa-growth-partners-home-mobile.jpg',
    },
    {
      leader: 'Belize Kids Foundation',
      company: 'Nonprofit',
      location: 'San Pedro, Belize',
      href: '/case-studies/belize-kids-foundation',
      contextLabel: 'Nonprofit impact',
      image: '/case-studies/belize-kids-foundation-home-mobile.jpg',
    },
    {
      leader: 'Canary Cove',
      company: 'Private resort',
      location: 'San Pedro, Belize',
      href: '/case-studies/canary-cove',
      contextLabel: 'Hospitality',
      image: '/case-studies/canary-cove-home-mobile.jpg',
    },
    {
      leader: 'Infobell IT',
      company: 'Managed IT services',
      location: 'San Jose, CA',
      href: '/case-studies/infobell-it',
      contextLabel: 'B2B services',
      image: '/case-studies/infobell-it-home-mobile.jpg',
    },
    {
      leader: 'We Are Saplings',
      company: 'Education',
      location: 'New York City, NY',
      href: '/case-studies/we-are-saplings',
      contextLabel: 'Education',
      image: '/case-studies/we-are-saplings-home-mobile.jpg',
    },
    {
      leader: 'Dr. Craig Anderson',
      company: 'Wine Country Root Canal',
      location: 'Santa Rosa, CA',
      href: '/case-studies/wine-country-root-canal',
      contextLabel: 'Specialty healthcare',
      image: '/case-studies/wine-country-root-canal-home-mobile.jpg',
    },
  ] satisfies readonly HomepageClientWinSlide[],
} as const

export const HOMEPAGE_GROWTH_RAMP = {
  eyebrow: 'What to expect',
  title: 'First 90 days.',
  microcopy: 'Clear targets. Real systems. No guesswork.',
  finePrint:
    'Targets vary by market, offer, starting point, budget, and team follow-through.',
  metrics: [
    {
      day: 'Day 30',
      value: '+25%',
      label: 'qualified actions',
      detail: 'Calls, forms, booking clicks, demos, directions, or inquiries.',
    },
    {
      day: 'Day 60',
      value: '+50%',
      label: 'qualified demand',
      detail: 'Higher-intent traffic and clearer source attribution.',
    },
    {
      day: 'Day 90',
      value: '10-30',
      label: 'growth opportunities/mo',
      detail: 'Target range once website, search, proof, ads, and AI compound.',
    },
  ] satisfies readonly HomepageGrowthRampMetric[],
} as const

export const HOMEPAGE_PROBLEM = {
  eyebrow: 'Why it works',
  title: 'Buyers check everything before they choose.',
  description:
    'Your website. Your reviews. Your Google listing. Even ChatGPT. If one piece is weak, people quietly pick someone else — and you never find out why.',
  closingLine: 'Prism makes every one of those checks work in your favor.',
  points: [
    {
      label: 'Can people find you?',
      text: 'Search and maps decide who gets seen.',
      iconSrc: '/pixelish/lens.svg',
    },
    {
      label: 'Do they trust you?',
      text: 'Reviews and proof decide who makes the shortlist.',
      iconSrc: '/pixelish/award-checkmark.svg',
    },
    {
      label: 'Can AI recommend you?',
      text: 'ChatGPT and AI search now answer before you can.',
      iconSrc: '/pixelish/chatgpt.svg',
      brandLogo: 'openai',
      brandLogoTheme: 'dark',
    },
    {
      label: 'Is the next step easy?',
      text: 'Calls, forms, and booking decide who gets chosen.',
      iconSrc: '/pixelish/calendar.svg',
    },
  ] satisfies readonly HomepageProblemPoint[],
  stackLabel: 'What buyers check',
  stack: [
    { label: 'Website', iconSrc: '/pixelish/browser.svg' },
    {
      label: 'Search',
      iconSrc: '/pixelish/lens.svg',
      brandLogo: 'googleMaps',
    },
    { label: 'Reviews', iconSrc: '/pixelish/emoji-heart.svg' },
    {
      label: 'ChatGPT',
      iconSrc: '/pixelish/chatgpt.svg',
      brandLogo: 'openai',
      brandLogoTheme: 'dark',
    },
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

export const HOMEPAGE_SERVICES = {
  eyebrow: 'What Prism does',
  title: 'One team. The whole system.',
  description:
    'Most businesses juggle five vendors and hope it adds up. With Prism, one team builds every piece and keeps them working together.',
  closingLine: '',
} as const

export const HOMEPAGE_SERVICE_ITEMS: readonly HomepageIconCard[] = [
  {
    title: 'Website',
    description: 'A fast, credible site that makes choosing you easy.',
    iconSrc: '/pixelish/browser.svg',
    href: '/websites',
  },
  {
    title: 'Search',
    description: 'Show up on Google and Maps when people look.',
    iconSrc: '/pixelish/lens.svg',
    brandLogo: 'googleMaps',
    href: '/seo',
  },
  {
    title: 'Reviews & proof',
    description: 'Real reviews and results that build trust fast.',
    iconSrc: '/pixelish/emoji-heart.svg',
    href: '/proof',
  },
  {
    title: 'Ads',
    description: 'Reach the right people without wasting budget.',
    iconSrc: '/pixelish/device-radio.svg',
    href: '/ads',
  },
  {
    title: 'Content',
    description: 'Answer the questions buyers actually ask.',
    iconSrc: '/pixelish/document-letter.svg',
    href: '/blog',
  },
  {
    title: 'Tracking',
    description: 'Know exactly where calls and customers come from.',
    iconSrc: '/pixelish/bar-chart-average.svg',
    href: '/services',
  },
  {
    title: 'AI discovery',
    description: 'Be the business ChatGPT and AI search recommend.',
    iconSrc: '/pixelish/chatgpt.svg',
    brandLogo: 'openai',
    brandLogoTheme: 'dark',
    href: '/ai-seo-services',
  },
] as const

export const HOMEPAGE_WHY_PRISM = {
  title: 'Why founders choose Prism',
} as const

export const HOMEPAGE_DIFFERENTIATORS: readonly HomepageIconCard[] = [
  {
    title: 'Simple enough for a busy operator',
    description:
      'Clear priorities, plain-English updates, and no extra homework for your team.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    title: 'Premium without feeling generic',
    description:
      'A calm, modern presence that feels high-trust without turning your company into another template.',
    iconSrc: '/pixelish/award.svg',
  },
  {
    title: 'One connected partner',
    description:
      'Website, search, proof, ads, content, tracking, and AI visibility move together instead of fighting across vendors.',
    iconSrc: '/pixelish/command.svg',
  },
  {
    title: 'Built around buyer decisions',
    description:
      'Every page, profile, and campaign is shaped around how real people compare options before they act.',
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
  ctaLabel: 'Start your free growth audit',
} as const

export const HOMEPAGE_HOW_IT_WORKS_STEPS = [
  {
    title: 'Tell us about your business',
    description: 'Takes about a minute. No long brief, no sales maze.',
  },
  {
    title: 'We audit your growth path',
    description:
      'A real person reviews your website, search visibility, reviews, and tracking.',
  },
  {
    title: 'Get your growth plan, free',
    description:
      'A clear read on what is working, what is leaking, and the next move worth making.',
  },
] as const

export const HOMEPAGE_PROOF = {
  eyebrow: 'Results',
  title: 'Proof across markets',
  description:
    'Dental is where the system is proven deepest. The same system grows retail, consulting, education, hospitality, nonprofits, and founder-led brands.',
  ctaLabel: 'See client results',
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
  'olympic-bootworks':
    'A Tahoe retail business gained a two-site ecommerce system and cleaner owned infrastructure.',
  'roseville-dental-academy':
    'A GoDaddy web presence became an admissions platform with analytics, forms, Search Console, Hotjar, and AI support.',
  'rebellious-aging':
    'A movement gained the digital foundation and local discovery groundwork to grow with more clarity.',
  'saorsa-growth-partners':
    'A consulting firm gained sharper positioning, credibility, and lead capture.',
  'belize-kids-foundation':
    'A nonprofit gained clearer program storytelling, supporter journeys, and analytics groundwork.',
  'canary-cove':
    'A private island experience gained immersive visuals, concierge-ready booking flows, and tracking.',
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
  'olympic-bootworks': {
    artifact: 'Ecommerce growth base',
    outcome: 'Retail demand captured',
    proof:
      'Inventory, brand story, search, and email moved into one owned system.',
  },
  'roseville-dental-academy': {
    artifact: 'Admissions platform',
    outcome: 'Lead flow clarified',
    proof:
      'Forms, analytics, AI support, and visibility were rebuilt around enrollment.',
  },
  'rebellious-aging': {
    artifact: 'Movement foundation',
    outcome: 'Community growth base',
    proof:
      'The brand gained a clearer home for people ready to join the movement.',
  },
  'saorsa-growth-partners': {
    artifact: 'Advisory positioning',
    outcome: 'Credibility + lead capture',
    proof:
      'The site makes the offer sharper for enterprise and founder conversations.',
  },
  'belize-kids-foundation': {
    artifact: 'Impact storytelling',
    outcome: 'Supporter clarity',
    proof: 'Programs, stories, and donation paths became easier to understand.',
  },
  'canary-cove': {
    artifact: 'Hospitality experience',
    outcome: 'Concierge-ready demand',
    proof:
      'The private resort story became more immersive and easier to act on.',
  },
}

export const HOMEPAGE_FIT_AUDIENCES: readonly HomepageIconCard[] = [
  {
    title: 'Founders & startup teams',
    description:
      'You are building something real and need customers to find it — without hiring a marketing department.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Local & specialty practices',
    description:
      'Dentists, clinics, and local services where trust decides everything. Dental is where Prism has the deepest proof.',
    iconSrc: '/pixelish/award.svg',
  },
  {
    title: 'Owners & operators',
    description:
      'You run the business day to day and want one partner to own growth — not another vendor to manage.',
    iconSrc: '/pixelish/users.svg',
  },
] as const

export const HOMEPAGE_FIT = {
  eyebrow: 'Who it is for',
  title: 'Built for the people running the business.',
  description:
    'You should not have to become the marketing department to grow. That is the point of Prism.',
  notFitLine:
    'Not a fit if you want the cheapest option or overnight results — Prism builds growth that lasts.',
  fitHeading: 'Prism is a good fit if...',
  fitItems: [
    'You are a founder, owner, or operator who wants more qualified demand.',
    'You care about search, proof, trust, AI visibility, and measurable action.',
    'Your website feels behind the quality of your business.',
    'You want clear tracking without becoming the marketing department.',
    'You want a trusted partner you can keep working with long term.',
    'You care about premium design, clarity, and steady business growth.',
  ],
  fitClosing: 'If that sounds like your company, Prism was built for you.',
  notFitHeading: 'Prism may not be the right fit if...',
  notFitItems: [
    'You want the cheapest option.',
    'You want overnight results with no real strategy.',
    'You want a vendor to just take random orders.',
    'You do not value quality, trust, or long term growth.',
  ],
  notFitClosing:
    'We do our best work with companies that want to build something strong over time.',
} as const

export const HOMEPAGE_FINAL_CTA = {
  title: 'Find the growth leak.',
  description:
    'Get a free audit of your website, search visibility, reviews, and tracking — plus the clearest next move for your business. No pressure. No obligation.',
  primaryCtaLabel: 'Start my free growth audit',
  supportLine: 'Reviewed by a real person, not a bot.',
} as const

export const HOMEPAGE_STATS = [
  { value: '22', label: 'client growth stories' },
  { value: '7+', label: 'markets served' },
  { value: 'one team', label: 'website + search + proof + ads' },
  { value: '24/7', label: 'AI-ready discovery layer' },
] as const

export const HOMEPAGE_HERO_FACTS = [
  { value: '22', label: 'client growth stories' },
  { value: 'one partner', label: 'from audit to execution' },
  {
    value: 'website + search + proof + ads',
    label: 'under one growth rhythm',
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
    description: 'Turn intent into action.',
  },
] as const

export const HOMEPAGE_CAPABILITIES = [
  {
    title: 'Websites',
    description: 'Make the business easy to choose.',
  },
  {
    title: 'Search',
    description: 'Show up where buyers look.',
  },
  {
    title: 'Content',
    description: 'Answer buyer questions.',
  },
  {
    title: 'Ads',
    description: 'Find the right audience.',
  },
  {
    title: 'Proof',
    description: 'Build trust before the first call.',
  },
  {
    title: 'Tracking',
    description: 'Know what creates demand.',
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
    description: 'What to fix first so the right people can find you.',
  },
  {
    title: 'Trust',
    description: 'What helps buyers feel ready to act.',
  },
  {
    title: 'Booking',
    description:
      'What turns online attention into calls, forms, bookings, or sales.',
  },
] as const

export const HOMEPAGE_CTA_NOTES = [
  'Website',
  'Search',
  'Reviews',
  'AI',
  'Tracking',
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
          "No. Dental is one of Prism's strongest proof areas, but Prism also works with retail, consulting, nonprofit, education, hospitality, local service, and founder-led companies.",
      },
    ],
  },
  {
    question: 'What do you review in the free growth audit?',
    answer: [
      {
        type: 'paragraph',
        content:
          'We review the website, search visibility, proof, offer clarity, tracking, and the trust signals that affect whether someone takes the next step.',
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
          'Start with the free growth audit. Submit your company, and we will review the growth path before recommending next steps.',
      },
    ],
  },
] as const
