export type SegmentKey =
  | 'consulting'
  | 'dental'
  | 'local'
  | 'nonprofit'
  | 'community'
  | 'hospitality'
  | 'education'
  | 'it'

type CaseStudyCategory =
  | 'dentistry'
  | 'retail'
  | 'education'
  | 'nonprofit'
  | 'consulting'
  | 'event'
  | 'private resort'
  | 'online community'

export type CaseStudyExplainerVideo = {
  src: string
  poster?: string
  title: string
  summary: string
  keyMoments: string[]
  uploadDate: string
  duration?: string
  creatorName?: string
}

export function buildCloudinaryVideoPoster(videoUrl: string) {
  if (!videoUrl.includes('/video/upload/')) {
    return videoUrl
  }

  return videoUrl
    .replace('/video/upload/', '/video/upload/so_0/')
    .replace(/\.mp4($|\?)/, '.jpg$1')
}

export type CaseStudyMeta = {
  id: string
  title: string
  client: string
  clientLogo?: string
  websiteUrl?: string
  category: CaseStudyCategory
  founder?: string
  industry: string
  location: string
  description: string
  slug: string
  segments: SegmentKey[]
  explainerVideo?: CaseStudyExplainerVideo
  structured?: {
    heroImage?: string
    heroVideoId?: string
    datePublished?: string
    dateModified?: string
    outcomes?: string[]
    focus?: string
    scope?: string
    canonicalUrl?: string
  }
}

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    id: '1',
    title: 'Powering a Seamless Transition',
    client: 'Dr. Christopher B. Wong',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353638/Chris-Wong_avwdmb.webp',
    websiteUrl: 'https://www.chriswongdds.com',
    category: 'dentistry',
    founder: 'Dr. Christopher B. Wong',
    industry: 'Dentistry',
    location: 'Palo Alto, CA',
    description:
      'How we helped achieve 100% patient retention during practice transition and drive sustainable growth.',
    slug: 'dr-christopher-wong',
    segments: ['dental', 'local'],
    structured: {
      heroImage: 'https://www.design-prism.com/dr-wong-polaroids.png',
      heroVideoId: 'HrksJeYb02Q',
      datePublished: '2025-01-15T00:00:00.000Z',
      dateModified: '2026-02-19T00:00:00.000Z',
      outcomes: [
        'The M&A transition was supported by a clear, story-driven online presence rather than leaving patients to guess what happened.',
        'The practice now runs on a modern dental website with strong SEO foundations and clean UX.',
        'Local presence and review profiles now reflect Dr. Wong as the primary dentist, not just the previous owner.',
        'Acquisition has shifted from passive word-of-mouth to active, AI-optimized ads and Google campaigns.',
        'The development and design stack is modern, AI-native, and capable of continuous improvement rather than one-off redesigns.',
      ],
      focus: 'Dental M&A handoff',
      scope: 'Website, SEO, ads, AI stack',
      canonicalUrl:
        'https://www.design-prism.com/case-studies/dr-christopher-wong',
    },
  },
  {
    id: '2',
    title: 'Aligning Digital Excellence with Luxury Care',
    client: 'Exquisite Dentistry',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353638/Exquisite-dentistry_qp4a85.webp',
    websiteUrl: 'https://exquisitedentistryla.com/',
    category: 'dentistry',
    industry: 'High-End Dentistry',
    location: 'Beverly Hills, CA',
    description:
      'Creating a sophisticated online experience that matches their premium in-person patient care.',
    slug: 'exquisite-dentistry',
    segments: ['dental', 'local'],
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1774726440/exquisite-case-study-notebook-lm_l5ruuq.mp4',
      title: 'See the rebuild that turned legacy prestige into a modern growth engine',
      summary:
        'A quick breakdown of how Prism rebuilt the site, cleaned up the funnel, and protected discovery while bringing the digital experience up to the level of the practice.',
      keyMoments: [
        'Why the existing site was creating a premium-to-digital mismatch.',
        'How Prism rebuilt the website and booking flow without treating SEO like collateral damage.',
        'What changed in attribution, trust signals, and the long-term growth system.',
      ],
      uploadDate: '2026-03-28T00:00:00.000Z',
      creatorName: 'Enzo Sison',
    },
  },
  {
    id: '3',
    title: 'Olympic Bootworks: the Tahoe shop that finally sells online',
    client: 'Olympic Bootworks',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353639/Olympic-bootworks_fwtza3.webp',
    websiteUrl: 'https://www.olympicbootworks.com',
    category: 'retail',
    industry: 'Retail & E-Commerce',
    location: 'Tahoe, CA',
    description:
      'Two-site ecommerce system with POS-linked inventory, a Fantic Warehouse microsite, and an owned Google + email stack.',
    slug: 'olympic-bootworks',
    segments: ['local'],
    structured: {
      heroImage: 'https://www.design-prism.com/olympic-bootworks-hero.png',
      heroVideoId: 'Cgi7CZHMYQ0',
      datePublished: '2025-02-15T00:00:00.000Z',
      dateModified: '2025-02-15T00:00:00.000Z',
      outcomes: [
        'Traffic, search impressions, and online engagement compounded over time.',
        'Olympic Bootworks went from “great store, weak website” to a two-site system built for brand + ecommerce.',
        'Fantic inventory gained a real online sales channel instead of relying on walk-ins.',
        'The business escaped website + email technical debt and moved to owned infrastructure.',
        'Prism gained deep ecommerce + POS integration reps that now power the broader Prism flywheel.',
      ],
      focus: 'Ecommerce + multi-site launch',
      scope:
        'Website rebuild, POS-linked ecommerce catalog, multi-site, analytics + SEO, Workspace + DNS cleanup',
      canonicalUrl:
        'https://www.design-prism.com/case-studies/olympic-bootworks',
    },
  },
  {
    id: '4',
    title: 'Post‑M&A Relaunch with Measurable Growth',
    client: 'Laguna Beach Dental Arts',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353640/Laguna-Beach-dental-arts_syypqz.webp',
    websiteUrl: 'https://lagunabeachdentalarts.com',
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Laguna Beach, CA',
    description:
      'New brand, custom website, multi‑channel acquisition and end‑to‑end tracking working in tandem.',
    slug: 'laguna-beach-dental-arts',
    segments: ['dental', 'local'],
  },
  {
    id: '5',
    title: 'Family‑Focused Website with Clear Conversion',
    client: 'Family First Smile Care',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353638/Family-First-Smile-Care_xo7qhz.webp',
    websiteUrl: 'https://famfirstsmile.com/',
    category: 'dentistry',
    founder: 'Dr. Jayleen Pang',
    industry: 'Dentistry',
    location: 'Los Gatos, CA',
    description:
      'Services clarity, office comforts, and measurable conversion flows built for families.',
    slug: 'family-first-smile-care',
    segments: ['dental', 'local'],
  },
  {
    id: '6',
    title: 'Family Dentistry Growth System',
    client: 'Town Centre Dental',
    websiteUrl: 'https://www.towncentredental.net',
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Brentwood, CA',
    description:
      'Modern website, clear services, streamlined booking, and end‑to‑end analytics.',
    slug: 'town-centre-dental',
    segments: ['dental', 'local'],
  },
  {
    id: '7',
    title: 'Post‑M&A Relaunch for a Family Dental Practice',
    client: 'Grace Dental Santa Rosa',
    websiteUrl: 'https://www.tingjenjidds.com',
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Santa Rosa, CA',
    description:
      'Brand refresh, custom site, multi‑channel acquisition, and tracking built for scale.',
    slug: 'grace-dental-santa-rosa',
    segments: ['dental', 'local'],
  },
  {
    id: '8',
    title: 'Designing a Digital Home for Bold Aging',
    client: 'Rebellious Aging',
    websiteUrl: 'https://www.rebelliousaging.com',
    category: 'online community',
    founder: 'Suz Rohde',
    industry: 'Online Community',
    location: 'Los Gatos, CA',
    description:
      'Foundational website refresh and local discovery groundwork for a movement that celebrates aging loudly.',
    slug: 'rebellious-aging',
    segments: ['community'],
  },
  {
    id: '9',
    title: 'Endodontic Growth System Launch',
    client: 'Wine Country Root Canal',
    websiteUrl: 'https://www.winecountryrootcanal.com',
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Santa Rosa, CA',
    description:
      'Calming patient journey, local visibility, and analytics readiness for a specialty practice.',
    slug: 'wine-country-root-canal',
    segments: ['dental', 'local'],
  },
  {
    id: '10',
    title: 'Consulting Presence Refresh',
    client: 'sr4 Partners',
    websiteUrl: 'https://www.sr4partners.com',
    category: 'consulting',
    founder: 'Srikanth Ravi',
    industry: 'Consulting',
    location: 'Chicago, IL',
    description:
      'Messaging clarity and modular web design that support enterprise transformation engagements.',
    slug: 'sr4-partners',
    segments: ['consulting'],
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1774726565/sr4-case-study-notebook-lm_ayuxeg.mp4',
      title: 'Watch how Prism translated SR4’s methodology into a sharper digital presence',
      summary:
        'This explainer walks through the brand refresh, the narrative structure of the new site, and the search foundation Prism built so the right organizations can find SR4.',
      keyMoments: [
        'Where the old site undersold SR4’s consulting depth and point of view.',
        'How Prism modernized the brand without losing the firm’s existing equity.',
        'What changed in service clarity, organic discovery, and inbound-fit quality.',
      ],
      uploadDate: '2026-03-28T00:00:00.000Z',
      creatorName: 'Enzo Sison',
    },
  },
  {
    id: '11',
    title: 'Making Complex IT Services Clear',
    client: 'Infobell IT',
    websiteUrl: 'https://www.infobellt.com',
    category: 'consulting',
    founder: 'Harshad Shinde',
    industry: 'IT Services',
    location: 'Global',
    description:
      'Approachable messaging, modular design, and analytics guardrails for managed it solutions.',
    slug: 'infobell-it',
    segments: ['it'],
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1774726921/infobell-case-study-notebook-lm_rzpjwc.mp4',
      title: 'Understand the trust architecture Prism built for Infobell IT',
      summary:
        'A concise walkthrough of how Prism made a technical service business feel more credible, easier to understand, and more discoverable for high-intent MSP buyers.',
      keyMoments: [
        'Why generic MSP positioning was costing Infobell trust before conversations even started.',
        'How the brand, website, and service structure were redesigned for decision-maker clarity.',
        'How Prism set up search and analytics so growth could be measured instead of guessed.',
      ],
      uploadDate: '2026-03-28T00:00:00.000Z',
      creatorName: 'Enzo Sison',
    },
  },
  {
    id: '12',
    title: 'Mission-Driven Web Refresh',
    client: 'Canary Foundation',
    websiteUrl: 'https://www.canaryfoundation.org',
    category: 'nonprofit',
    founder: 'Don Listwin',
    industry: 'Nonprofit',
    location: 'Palo Alto, CA',
    description:
      'Accessible storytelling and donor journeys that amplify early cancer detection work.',
    slug: 'canary-foundation',
    segments: ['nonprofit'],
  },
  {
    id: '13',
    title: 'Story-First Nonprofit Hub',
    client: 'Belize Kids Foundation',
    websiteUrl: 'https://www.belizekidsfoundation.org',
    category: 'nonprofit',
    founder: 'Tamara Sniffin',
    industry: 'Nonprofit',
    location: 'San Pedro, Belize',
    description:
      'Program storytelling, supporter flows, and analytics groundwork that keep impact front and center.',
    slug: 'belize-kids-foundation',
    segments: ['nonprofit'],
  },
  {
    id: '14',
    title: 'Private Retreat Storytelling',
    client: 'Canary Cove',
    websiteUrl: 'https://www.canarycovehomes.com',
    category: 'private resort',
    industry: 'Hospitality',
    location: 'San Pedro, Belize',
    description:
      'Immersive visuals, concierge-ready booking flows, and analytics for a private island experience.',
    slug: 'canary-cove',
    segments: ['hospitality', 'local'],
  },
  {
    id: '15',
    title: 'Joyful Education Platform',
    client: 'We Are Saplings',
    websiteUrl: 'https://www.wearesaplings.com',
    category: 'education',
    founder: 'Lizzie Alexander',
    industry: 'Education',
    location: 'New York City, NY',
    description:
      'Parent-friendly storytelling, enrollment journeys, and resource hubs for curiosity-led learning.',
    slug: 'we-are-saplings',
    segments: ['community', 'education'],
  },
  {
    id: '16',
    title: 'Specialty Dental Foundations',
    client: 'Coast Periodontics & Laser Surgery',
    websiteUrl: 'https://www.coastperiodontics.com',
    category: 'dentistry',
    founder: 'Dr. Steven S. Ku',
    industry: 'Dentistry',
    location: 'San Luis Obispo, CA',
    description:
      'Reassuring website design, local presence support, and conversion tracking for a periodontic team.',
    slug: 'coast-periodontics-and-laser-surgery',
    segments: ['dental', 'local'],
  },
  {
    id: '17',
    title: 'Transition Consulting Launchpad',
    client: 'Practice Transitions Institute',
    websiteUrl: 'https://www.practicetransitionsinstitute.com',
    category: 'consulting',
    founder: 'Dr. Kurt Laue',
    industry: 'Consulting',
    location: 'San Mateo, CA',
    description:
      'Narrative clarity, modern website, and local visibility for a dental transition advisory firm.',
    slug: 'practice-transitions-institute',
    segments: ['consulting'],
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1774726719/pti-case-study-notebook-lm_j9ggam.mp4',
      title: 'Watch how Prism turned PTI’s reputation into visible authority online',
      summary:
        'This walkthrough shows how Prism built the site, search presence, and trust infrastructure for a firm guiding dentists through one of the biggest decisions of their careers.',
      keyMoments: [
        'Why PTI needed a site built for long-consideration, trust-heavy decision-making.',
        'How Prism translated the six-stage process into a warmer, more authoritative web experience.',
        'What changed in local visibility, conversion paths, and analytics clarity.',
      ],
      uploadDate: '2026-03-28T00:00:00.000Z',
      creatorName: 'Enzo Sison',
    },
  },
  {
    id: '18',
    title: 'Dentist Retreat Digital Presence',
    client: 'Dentist Retreat',
    websiteUrl: 'https://www.dentistretreat.com',
    category: 'event',
    founder: 'Leadership Summit Team',
    industry: 'Professional Development',
    location: 'San Francisco, CA',
    description:
      'Conversion-friendly retreat site with clear agenda, speakers, and booking paths.',
    slug: 'leadership-retreat',
    segments: ['education', 'community'],
  },
  {
    id: '19',
    title: 'Modern Dental Presence',
    client: 'Dental Strategies',
    websiteUrl: 'https://www.michaelnjodds.com',
    category: 'dentistry',
    founder: 'Dr. Michael Njo',
    industry: 'Dentistry',
    location: 'Bay Area, CA',
    description:
      'Credibility-first website with clear services, patient flows, and tracking.',
    slug: 'michael-njo-dds',
    segments: ['dental', 'local'],
  },
  {
    id: '20',
    title: 'Growth Systems for a Boutique Consultancy',
    client: 'Saorsa Growth Partners',
    websiteUrl: 'https://www.saorsapartners.com',
    category: 'consulting',
    industry: 'Consulting',
    location: 'San Francisco, CA',
    description:
      'Clarity, credibility, and lead capture for a focused advisory firm.',
    slug: 'saorsa-growth-partners',
    segments: ['consulting'],
  },
  {
    id: '21',
    title: 'Patient-First Dental Presence',
    client: 'Mataria Dental Group',
    websiteUrl: 'https://www.matariadentalgroup.com',
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Torrance, CA',
    description:
      'Modern, trusted web presence with clear services and booking paths.',
    slug: 'mataria-dental-group',
    segments: ['dental', 'local'],
    structured: {
      heroImage: 'https://www.design-prism.com/mataria-hero.png',
      heroVideoId: 'VIDEO_PLACEHOLDER',
      datePublished: '2025-02-01T00:00:00.000Z',
      dateModified: '2025-02-01T00:00:00.000Z',
      outcomes: [
        'Mataria Dental Group relaunched with a modern dental website, aligned local listings, and structured analytics.',
        'Patients received a clear, human story about Dr. Mataria and why the transition benefits them.',
        'New channels and campaigns (Instagram, TikTok, giveaways) drove awareness with real video and team content.',
        'Prism captured scar tissue that shaped the later AI-native growth model.',
      ],
      focus: 'Dental M&A launch',
      scope: 'Website, listings, content, social ads, analytics',
      canonicalUrl:
        'https://www.design-prism.com/case-studies/mataria-dental-group',
    },
  },
]
