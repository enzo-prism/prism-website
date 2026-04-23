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

export const HOMEPAGE_CASE_STUDY_SLUGS = [
  'exquisite-dentistry',
  'infobell-it',
  'sr4-partners',
  'practice-transitions-institute',
] as const

const HOMEPAGE_HERO_REVIEW_COUNT = getHeroReviewCount()
const HOMEPAGE_HERO_REVIEW_COUNT_LABEL =
  HOMEPAGE_HERO_REVIEW_COUNT >= 20 ? '20+' : `${HOMEPAGE_HERO_REVIEW_COUNT}`

export const HOMEPAGE_HERO = {
  eyebrow: '',
  title: 'Growth, handled for you.',
  description: 'We handle the tech. You run the business.',
  supportPoints: [
    {
      label: 'More visibility',
      iconSrc: '/pixelish/lens.svg',
    },
    {
      label: 'More leads',
      iconSrc: '/pixelish/mail.svg',
    },
    {
      label: 'More customers',
      iconSrc: '/pixelish/users.svg',
    },
    {
      label: 'Less stress',
      iconSrc: '/pixelish/emoji-happy.svg',
    },
    {
      label: 'One trusted partner',
      iconSrc: '/pixelish/award-checkmark.svg',
    },
  ] satisfies readonly HomepageHeroSupportPoint[],
  socialProof: {
    headline: `5 stars from ${HOMEPAGE_HERO_REVIEW_COUNT_LABEL} business owners`,
    linkLabel: 'Wall of love',
  },
  primaryCtaLabel: 'Get a Free Growth Plan',
  secondaryCtaLabel: 'See How It Works',
} as const

export const HOMEPAGE_PROOF_METRICS = [
  {
    value: '20+',
    label: 'brands launched',
    detail:
      'Prism systems shipped across service, consulting, nonprofit, and hospitality brands.',
  },
  {
    value: '5-star',
    label: 'owner trust',
    detail: 'Business owners point to clarity, speed, and steady execution.',
  },
  {
    value: '4',
    label: 'video walkthroughs',
    detail: 'The featured case studies include deeper explainer videos.',
  },
  {
    value: '1',
    label: 'growth partner',
    detail:
      'Website, search, ads, content, analytics, and AI under one operating rhythm.',
  },
] as const

export const HOMEPAGE_PROBLEM = {
  title: 'You have a business to run',
  description:
    'You should not have to juggle websites, SEO, ads, content, analytics, and AI on your own. We take the moving parts off your plate and make growth work.',
  points: [
    {
      label: 'Too much to juggle',
      text: 'Every channel asks for time, tools, and attention.',
      iconSrc: '/pixelish/chat-dots.svg',
    },
    {
      label: 'Too many dead ends',
      text: 'A lot of owners have paid for marketing before and still felt stuck.',
      iconSrc: '/pixelish/circle-exclamation.svg',
    },
    {
      label: 'One team you can trust',
      text: 'We simplify the chaos, make it work, and keep growth moving.',
      iconSrc: '/pixelish/users.svg',
    },
  ] satisfies readonly HomepageProblemPoint[],
  stackLabel: 'Off your plate',
  stack: [
    { label: 'Websites', iconSrc: '/pixelish/browser.svg' },
    { label: 'SEO', iconSrc: '/pixelish/lens.svg' },
    { label: 'Ads', iconSrc: '/pixelish/device-radio.svg' },
    { label: 'Content', iconSrc: '/pixelish/document-letter.svg' },
    { label: 'Analytics', iconSrc: '/pixelish/bar-chart-average.svg' },
    { label: 'AI', iconSrc: '/pixelish/robot.svg' },
  ] satisfies readonly HomepageProblemStackItem[],
} as const

export const HOMEPAGE_PROMISE = {
  title: 'You run the business. We handle the growth.',
} as const

export const HOMEPAGE_PROMISE_CARDS: readonly HomepageIconCard[] = [
  {
    title: 'More people find you',
    description:
      'We improve your website, local search, content, ads, and online presence so more people discover your business.',
    iconSrc: '/pixelish/lens.svg',
  },
  {
    title: 'More people trust you',
    description:
      'We help your business look clear, modern, and professional so the right people feel confident choosing you.',
    iconSrc: '/pixelish/award-checkmark.svg',
  },
  {
    title: 'More people become customers',
    description:
      'We fix the weak points that stop people from calling, booking, or reaching out.',
    iconSrc: '/pixelish/users.svg',
  },
] as const

export const HOMEPAGE_SERVICES = {
  title: 'What we take care of for you',
  description:
    'Prism handles the parts of growth that usually feel technical, time consuming, or unclear.',
  closingLine:
    'You do not need to learn all these tools yourself. That is our job.',
} as const

export const HOMEPAGE_SERVICE_ITEMS: readonly HomepageIconCard[] = [
  {
    title: 'Websites',
    description:
      'Clear, fast, modern websites that make your business look great and help turn visitors into customers.',
    iconSrc: '/pixelish/browser.svg',
  },
  {
    title: 'SEO and local search',
    description:
      'We help more people find your business on Google, maps, and search.',
    iconSrc: '/pixelish/lens.svg',
  },
  {
    title: 'Ads',
    description:
      'We run smart campaigns to bring in the right traffic and leads.',
    iconSrc: '/pixelish/device-radio.svg',
  },
  {
    title: 'Content and social',
    description:
      'We help your business stay active, useful, and visible online.',
    iconSrc: '/pixelish/document-letter.svg',
  },
  {
    title: 'Analytics',
    description:
      'We track what is working so decisions are based on real data, not guesses.',
    iconSrc: '/pixelish/bar-chart-average.svg',
  },
  {
    title: 'AI and automation',
    description:
      'We use AI and automation to save time, improve follow up, and help your business grow with less manual work.',
    iconSrc: '/pixelish/robot.svg',
  },
] as const

export const HOMEPAGE_WHY_PRISM = {
  title: 'Why business owners choose Prism',
} as const

export const HOMEPAGE_DIFFERENTIATORS: readonly HomepageIconCard[] = [
  {
    title: 'Simple, not confusing',
    description:
      'We explain things in plain language and focus on what actually helps your business grow.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    title: 'Long term partner',
    description:
      'We are here to build with you over time, not disappear after a quick project.',
    iconSrc: '/pixelish/users.svg',
  },
  {
    title: 'No tool overwhelm',
    description:
      'You do not have to keep up with every new app, trend, or AI product. We sort through it for you.',
    iconSrc: '/pixelish/command.svg',
  },
  {
    title: 'Built for real business results',
    description:
      'More visibility, better leads, and more customers. That is the goal.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Honest and steady',
    description:
      'No fluff. No fake promises. No hiding behind confusing reports.',
    iconSrc: '/pixelish/award.svg',
  },
] as const

export const HOMEPAGE_HOW_IT_WORKS = {
  title: 'How it works',
  ctaLabel: 'Get My Free Growth Plan',
} as const

export const HOMEPAGE_HOW_IT_WORKS_STEPS = [
  {
    title: 'We learn about your business',
    description:
      'We look at where you are now, what is working, what is not, and where the biggest growth opportunities are.',
  },
  {
    title: 'We build a simple growth plan',
    description:
      'We show you the highest impact next steps across your website, marketing, and AI tools.',
  },
  {
    title: 'We do the work',
    description:
      'We improve the systems, fix the weak spots, and keep things moving.',
  },
  {
    title: 'Your business keeps getting stronger',
    description:
      'Over time, more people see your business, more people trust you, and more people become customers.',
  },
] as const

export const HOMEPAGE_PROOF = {
  title: 'Real businesses need real results',
  description:
    'Prism helps small businesses improve how they show up online and how well they convert attention into customers.',
  ctaLabel: 'See Client Results',
} as const

export const HOMEPAGE_CASE_STUDY_SUMMARIES: Record<string, string> = {
  'exquisite-dentistry':
    'A stronger dental website that makes it easier for patients to choose the practice.',
  'infobell-it':
    'A clearer IT growth site built to earn trust faster and support sales.',
  'sr4-partners':
    'Sharper consulting positioning that helps the right clients understand the offer quickly.',
  'practice-transitions-institute':
    'Local visibility work that makes PTI easier to find and easier to trust.',
}

export const HOMEPAGE_CASE_STUDY_SIGNALS: Record<
  string,
  { artifact: string; outcome: string; proof: string }
> = {
  'exquisite-dentistry': {
    artifact: 'Premium rebuild',
    outcome: 'Trust + booking clarity',
    proof: 'Digital presence matched the level of care.',
  },
  'infobell-it': {
    artifact: 'Trust architecture',
    outcome: 'Clearer MSP positioning',
    proof: 'Technical services became easier to understand.',
  },
  'sr4-partners': {
    artifact: 'Positioning refresh',
    outcome: 'Sharper consulting story',
    proof: 'Enterprise buyers can grasp the offer faster.',
  },
  'practice-transitions-institute': {
    artifact: 'Authority system',
    outcome: 'Local visibility + trust',
    proof: 'PTI became easier to find and easier to evaluate.',
  },
}

export const HOMEPAGE_FIT = {
  title: 'Who Prism is built for',
  fitHeading: 'Prism is a good fit if...',
  fitItems: [
    'You want more people to find your business online.',
    'You want more leads, calls, bookings, or customers.',
    'You know digital tools and AI matter, but do not want to manage them yourself.',
    'You are tired of guessing what to do next.',
    'You want a trusted partner you can keep working with long term.',
    'You care about quality, clarity, and real growth.',
  ],
  fitClosing: 'If that sounds like you, Prism was built for you.',
  notFitHeading: 'Prism may not be the right fit if...',
  notFitItems: [
    'You want the cheapest option.',
    'You want overnight results with no real strategy.',
    'You want a vendor to just take random orders.',
    'You do not value quality, trust, or long term growth.',
  ],
  notFitClosing:
    'We do our best work with business owners who want to build something strong over time.',
} as const

export const HOMEPAGE_FINAL_CTA = {
  title: 'Stop worrying about tech. Start growing with Prism.',
  description:
    'Prism helps small businesses grow online with clear strategy, strong execution, and smart use of AI behind the scenes. You focus on your business. We handle the rest.',
  primaryCtaLabel: 'Get a Free Growth Plan',
  supportLine: 'Simple. Clear. Built for long term growth.',
} as const

export const HOMEPAGE_STATS = [
  { value: '20+', label: 'brands launched' },
  { value: '7-day', label: 'avg execution' },
  { value: 'one team', label: 'website + content + SEO + ads' },
  { value: '24/7', label: 'AI agent coverage' },
] as const

export const HOMEPAGE_HERO_FACTS = [
  { value: '20+', label: 'client launches' },
  { value: 'one partner', label: 'from strategy to execution' },
  {
    value: 'websites + content + SEO + ads',
    label: 'under one operating rhythm',
  },
] as const

export const HOMEPAGE_SYSTEM_STEPS = [
  {
    title: 'Strategy',
    description: 'Find the move.',
  },
  {
    title: 'Execution',
    description: 'Ship the work.',
  },
  {
    title: 'Feedback',
    description: 'Compound what works.',
  },
] as const

export const HOMEPAGE_CAPABILITIES = [
  {
    title: 'Websites',
    description: 'Convert attention.',
  },
  {
    title: 'Search visibility',
    description: 'Show up more.',
  },
  {
    title: 'Content',
    description: 'Publish what compounds.',
  },
  {
    title: 'Paid acquisition',
    description: 'Scale clearly.',
  },
  {
    title: 'Analytics',
    description: 'Know what moves.',
  },
  {
    title: 'AI workflows',
    description: 'Answer + book.',
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
  summary: 'Visibility that compounds.',
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
    description: 'What to fix first and where to show up.',
  },
  {
    title: 'Conversion',
    description: 'How to turn attention into customers.',
  },
  {
    title: 'Retention',
    description: 'How to grow lifetime value over time.',
  },
] as const

export const HOMEPAGE_CTA_NOTES = [
  'visibility',
  'content',
  'conversion',
] as const

const HOMEPAGE_TESTIMONIAL_IDS = [1, 2] as const

export const HOMEPAGE_TESTIMONIALS = HOMEPAGE_TESTIMONIAL_IDS.map((id) =>
  quotesData.find((quote) => quote.id === id),
).filter((quote): quote is (typeof quotesData)[number] => Boolean(quote))

export const HOMEPAGE_FAQ_ITEMS: HomepageFAQItem[] = [
  {
    question: 'Do I need to understand AI or marketing tools?',
    answer: [
      {
        type: 'paragraph',
        content:
          'No. That is the point. We handle the tools, strategy, and setup so you do not have to.',
      },
    ],
  },
  {
    question: 'What if I have worked with a bad agency before?',
    answer: [
      {
        type: 'paragraph',
        content:
          'A lot of our clients felt the same way. We focus on clear communication, honest work, and long term results.',
      },
    ],
  },
  {
    question: 'What does Prism actually help with?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Websites, SEO, ads, content, analytics, and AI tools that help your business get seen and win more customers.',
      },
    ],
  },
  {
    question: 'Do you work with small businesses?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Yes. Prism is built for small business owners who want expert help without building a big in house team.',
      },
    ],
  },
  {
    question: 'What is the first step?',
    answer: [
      {
        type: 'paragraph',
        content:
          'Start with a free growth plan on the get started page. We will look at your business and show you the best next steps.',
      },
    ],
  },
] as const
