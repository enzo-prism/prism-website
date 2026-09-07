import { getHeroReviewCount, quotesData } from '@/content/wall-of-love-data'
import type { BrandLogoKey, BrandLogoTheme } from '@/components/brand-logo'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
  SOCIAL_PROOF,
  SOCIAL_PROOF_CHANNELS,
} from '@/lib/proof-metrics'

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
  /** Company / brand name shown as the prominent card label (never a person). */
  company: string
  location: string
  href: string
  contextLabel: string
  /** Portrait screenshot of the client's live website used as the cover-flow cover. */
  image: string
  /**
   * Optional headline result. ONLY populate from a metric that is verified
   * against the named `source` (mirrors the client's `structured.results` in
   * lib/case-study-data.ts). Never invent a value. Cards without verified
   * data simply omit this and show their `contextLabel` instead.
   */
  metric?: {
    value: string
    label: string
    source: string
  }
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

const OLYMPIC_SEARCH_METRIC = getCaseStudyMetric('olympic-bootworks')
const SAORSA_SEARCH_METRIC = getCaseStudyMetric('saorsa-growth-partners')
const BELIZE_SEARCH_METRIC = getCaseStudyMetric('belize-kids-foundation')
const DR_WONG_SEARCH_METRIC = getCaseStudyMetric('dr-christopher-wong')
const ROSEVILLE_SEARCH_METRIC = getCaseStudyMetric('roseville-dental-academy')

export const HOMEPAGE_HERO = {
  title: 'Your growth team.',
  subheading: 'Website. Content. Ads. Built around your business.',
  description:
    'You run the business. We build the website, create the content, and manage the campaigns that help people find you and get in touch.',
  supportPoints: [
    {
      label: 'Your business. Our team.',
      iconSrc: '/pixelish/emoji-heart.svg',
      iconInvert: true,
      variant: 'aiRecommendation',
    },
  ] satisfies readonly HomepageHeroSupportPoint[],
  stats: {
    note: `Verified · ${PROOF_METRICS_VERIFIED_AT}`,
    headline: {
      label: 'Traffic & attention',
      items: [
        {
          value: CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US'),
          unit: '/month',
          label: `new users across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites`,
        },
        {
          value: SOCIAL_PROOF.combinedAudience,
          unit: '',
          label: 'followers across our channels',
        },
        {
          value: SOCIAL_PROOF.tiktok.activity,
          unit: '',
          label: 'TikTok views in the last 60 days',
        },
      ],
    },
    reach: {
      label: 'Our channels',
      channels: SOCIAL_PROOF_CHANNELS,
    },
  },
  systemStrip: [
    'Website',
    'Content',
    'Ads',
    'SEO',
    'Reviews',
    'Social',
    'Tracking',
  ],
  socialProof: {
    headline: `${HOMEPAGE_HERO_REVIEW_COUNT_LABEL} stories from founders, doctors, and business owners`,
    linkLabel: 'See results',
  },
  primaryCta: { label: 'Get a PRO website', href: '/websites' },
  secondaryCta: { label: 'Wall of Love', href: '/wall-of-love' },
} as const

export const HOMEPAGE_CLIENT_WINS = {
  eyebrow: 'Clients',
  title: 'Meet the businesses we’ve helped',
  description: '',
  slides: [
    {
      company: 'Olympic Bootworks',
      location: 'Tahoe, CA',
      href: '/case-studies/olympic-bootworks',
      contextLabel: 'Retail + e-bike catalog',
      image: '/case-studies/olympic-bootworks-home-mobile.jpg',
      metric: {
        value: OLYMPIC_SEARCH_METRIC.value,
        label: OLYMPIC_SEARCH_METRIC.label,
        source: OLYMPIC_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      },
    },
    {
      company: 'Saorsa Growth Partners',
      location: 'San Francisco, CA',
      href: '/case-studies/saorsa-growth-partners',
      contextLabel: 'Consulting',
      image: '/case-studies/saorsa-growth-partners-home-mobile.jpg',
      metric: {
        value: SAORSA_SEARCH_METRIC.value,
        label: SAORSA_SEARCH_METRIC.label,
        source: SAORSA_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      },
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
      company: 'sr4 Partners',
      location: 'Evanston, IL',
      href: '/case-studies/sr4-partners',
      contextLabel: 'Leadership consulting',
      image: '/case-studies/sr4-partners-home-mobile.jpg',
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
      company: 'Laguna Beach Dental Arts',
      location: 'Laguna Beach, CA',
      href: '/case-studies/laguna-beach-dental-arts',
      contextLabel: 'Dental growth',
      image: '/case-studies/laguna-beach-dental-arts-home-mobile.jpg',
    },
    {
      company: 'Roseville Dental Academy',
      location: 'Roseville, CA',
      href: '/case-studies/roseville-dental-academy',
      contextLabel: 'Education + analytics',
      image: '/case-studies/roseville-dental-academy-home-mobile.jpg',
      metric: {
        value: ROSEVILLE_SEARCH_METRIC.value,
        label: ROSEVILLE_SEARCH_METRIC.label,
        source: ROSEVILLE_SEARCH_METRIC.sourceName ?? 'Google Search Console',
      },
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

export const HOMEPAGE_GROWTH_RAMP = {
  eyebrow: 'What to expect',
  title: 'A clear plan. Real work.',
  microcopy: 'Agree on the priorities. Put them into practice. Learn from the results.',
  finePrint:
    'We agree on your scope and timeline before work begins.',
  metrics: [
    {
      day: 'Step 1',
      value: 'Baseline',
      label: 'know where to start',
      detail:
        'Review how customers find you, check your tracking, and agree on what to fix first.',
    },
    {
      day: 'Step 2',
      value: 'Live',
      label: 'put the plan to work',
      detail:
        'Launch the agreed website, search, content, or campaign improvements.',
    },
    {
      day: 'Step 3',
      value: 'Progress',
      label: 'choose what comes next',
      detail:
        'Review the results, see what is working, and choose the next improvements.',
    },
  ] satisfies readonly HomepageGrowthRampMetric[],
} as const

export const HOMEPAGE_PROBLEM = {
  eyebrow: 'Why it works',
  title: 'Give people a reason to choose you.',
  description:
    'A search gets you noticed. A clear website and real reviews help people decide. An easy way to call or book turns that interest into a conversation.',
  closingLine:
    'We work on the whole path, from the first search to the first inquiry.',
  points: [
    {
      label: 'Can people find you?',
      text: 'Help customers find you in search and on maps.',
      iconSrc: '/pixelish/lens.svg',
    },
    {
      label: 'Do they trust you?',
      text: 'Show real reviews and work that earns confidence.',
      iconSrc: '/pixelish/award-checkmark.svg',
    },
    {
      label: 'Can AI search understand you?',
      text: 'Make your business easier for AI search to understand.',
      iconSrc: '/pixelish/chatgpt.svg',
      brandLogo: 'openai',
      brandLogoTheme: 'dark',
    },
    {
      label: 'Is the next step easy?',
      text: 'Make calling, asking a question, or booking simple.',
      iconSrc: '/pixelish/calendar.svg',
    },
  ] satisfies readonly HomepageProblemPoint[],
  stackLabel: 'What buyers check',
  stack: [
    { label: 'Website', iconSrc: '/pixelish/browser.svg' },
    {
      label: 'Search',
      iconSrc: '/pixelish/lens.svg',
      brandLogo: 'google',
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
  title: 'Modern tools. Human judgment.',
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
  title: 'Your marketing, working together.',
  description:
    'A useful ad needs a useful landing page. Good content needs a clear next step. We connect the work so your customers can move forward and you know what to improve.',
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
    description: 'Show up on Google when people search for what you do.',
    iconSrc: '/pixelish/lens.svg',
    brandLogo: 'google',
    href: '/seo',
  },
  {
    title: 'Local & Maps',
    description: 'Help nearby customers find your business on Google Maps.',
    iconSrc: '/pixelish/lens.svg',
    brandLogo: 'googleMaps',
    href: '/local-seo-services',
  },
  {
    title: 'Reviews & proof',
    description: 'Real reviews and results that build trust fast.',
    iconSrc: '/pixelish/emoji-heart.svg',
    href: '/proof',
  },
  {
    title: 'Ads',
    description: 'Test campaigns, reach relevant audiences, and track results.',
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
    description: 'See which channels bring calls, inquiries, and customers.',
    iconSrc: '/pixelish/bar-chart-average.svg',
    href: '/services',
  },
  {
    title: 'AI discovery',
    description: 'Build the signals that help ChatGPT and AI search find you.',
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
    title: 'Clear updates. Less chasing.',
    description:
      'Clear priorities and plain-language updates, so you know what is happening.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    title: 'Design that feels like you',
    description:
      'Thoughtful design that reflects your business and makes your offer clear.',
    iconSrc: '/pixelish/award.svg',
  },
  {
    title: 'One team to call',
    description:
      'The same team connects your website, content, campaigns, and tracking.',
    iconSrc: '/pixelish/command.svg',
  },
  {
    title: 'Built for your customers',
    description:
      'Every page, profile, and campaign is shaped around how real people compare options before they act.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Know what comes next',
    description:
      'See the work, understand the results, and know what we recommend next.',
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
    description: 'Share your website, goals, and what you want to improve.',
  },
  {
    title: 'We review what customers see',
    description:
      'Our team looks at your website, search presence, reviews, and available tracking.',
  },
  {
    title: 'Choose your next move',
    description:
      'Get practical recommendations. Decide whether to tackle them yourself or scope the work with Prism.',
  },
] as const

export const HOMEPAGE_PROOF = {
  eyebrow: 'Results',
  title: 'See what we’ve built',
  description:
    'Explore our work with dental practices, retailers, consultants, schools, nonprofits, and hospitality brands.',
  ctaLabel: 'See client results',
} as const

export const HOMEPAGE_CASE_STUDY_SUMMARIES: Record<string, string> = {
  'dr-christopher-wong':
    'Clear treatment information, a familiar practice story, and an easier path to an appointment.',
  'exquisite-dentistry':
    'A dental website that introduces the team, explains care, and makes appointment requests easy to find.',
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
    'A Tahoe retail business gained an integrated Fantic e-bike catalog, visible pricing, direct inquiry paths, and cleaner owned infrastructure.',
  'roseville-dental-academy':
    'A GoDaddy web presence became an admissions platform with analytics, forms, Search Console, Hotjar, and AI support.',
  'rebellious-aging':
    'A website and content home for Suzanne’s writing, community, and approach to aging.',
  'saorsa-growth-partners':
    'A consulting firm gained sharper positioning, credibility, and lead capture.',
  'belize-kids-foundation':
    'A nonprofit gained clearer program storytelling, supporter journeys, and analytics groundwork.',
  'canary-cove':
    'A private beachfront estate on Ambergris Caye gained immersive visuals, direct inquiry flows, and tracking.',
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
    artifact: 'Integrated e-bike catalog',
    outcome: 'Easier product comparison',
    proof:
      'Model details, prices, and test-ride inquiries sit alongside the shop’s services.',
  },
  'roseville-dental-academy': {
    artifact: 'Admissions platform',
    outcome: 'Lead flow clarified',
    proof:
      'Forms, analytics, AI support, and visibility were rebuilt around enrollment.',
  },
  'rebellious-aging': {
    artifact: 'Movement foundation',
    outcome: 'A home for the community',
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
    outcome: 'Direct guest inquiries',
    proof:
      'The private beachfront estate became more immersive and easier to act on.',
  },
}

export const HOMEPAGE_FIT_AUDIENCES: readonly HomepageIconCard[] = [
  {
    title: 'Founders & startup teams',
    description:
      'You have a product worth choosing. You need a clear story and a way to reach the right customers.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Local & specialty practices',
    description:
      'Help nearby customers understand your services and feel ready to call. Explore our work with dental practices.',
    iconSrc: '/pixelish/award.svg',
  },
  {
    title: 'Owners & operators',
    description:
      'You need a team that handles the website, content, and campaigns while you run the business.',
    iconSrc: '/pixelish/users.svg',
  },
] as const

export const HOMEPAGE_FIT = {
  eyebrow: 'Who it is for',
  title: 'Run your business. We’ll help it grow.',
  description:
    'For owners who want better marketing without managing a separate designer, developer, editor, and ads team.',
  notFitLine:
    'Start with one service. Add more when the business needs it.',
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
    'Your decision is based on price alone.',
    'You want overnight results with no real strategy.',
    'You need execution without agreeing on goals or priorities.',
    'You cannot make time for feedback or share the access the work needs.',
  ],
  notFitClosing:
    'We do our best work with companies that want to build something strong over time.',
} as const

export const HOMEPAGE_FINAL_CTA = {
  title: 'Let’s find your next move.',
  description:
    'Show us your business. We’ll review what customers see and suggest the improvements worth making first.',
  primaryCtaLabel: 'Start my free growth audit',
  supportLine: 'Reviewed by our team. No obligation.',
} as const

export const HOMEPAGE_STATS = [
  { value: '22', label: 'client growth stories' },
  { value: '7+', label: 'markets served' },
  { value: 'one team', label: 'website + search + proof + ads' },
  { value: 'clear goals', label: 'practical next steps' },
] as const

export const HOMEPAGE_HERO_FACTS = [
  { value: '22', label: 'client growth stories' },
  { value: 'one partner', label: 'from audit to execution' },
  {
    value: 'website + search + proof + ads',
    label: 'planned and measured together',
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

export const HOMEPAGE_CONTENT_PROOF = {
  eyebrow: 'content delivery',
  summary: 'From the first idea to the finished post.',
  href: '/hottest-content',
} as const

export const HOMEPAGE_SEARCH_PROOF = {
  src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767370938/Google-search-olympic-bootworks_issxqh.webp',
  alt: 'Google Search Console growth for Olympic Bootworks',
  width: 498,
  height: 667,
  eyebrow: 'search visibility',
  summary: 'See the search results behind the work.',
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
  'Proof',
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
          'No. We work with retailers, consultants, nonprofits, schools, hospitality brands, and local services. Dental practices are a specialty, and you can explore examples in our case studies.',
      },
    ],
  },
  {
    question: 'What do you review in the free growth audit?',
    answer: [
      {
        type: 'paragraph',
        content:
          'We review your website, search visibility, reviews, and tracking. We look for what makes your business easy to find, understand, and contact.',
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
          'Request a free growth audit and share your website. We will review it and recommend next steps. Paid work is scoped on a 30-minute Zoom call before you commit.',
      },
    ],
  },
] as const
