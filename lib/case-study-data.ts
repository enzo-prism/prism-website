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
  | 'private estate'
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

  // Drop any delivery transformations (e.g. q_auto,vc_auto) before the
  // version segment — they target video codecs and don't apply to the
  // derived poster frame.
  return videoUrl
    .replace(
      /\/video\/upload\/(?:[^/]+\/)*?(v\d+\/)/,
      '/video/upload/so_0,q_auto/$1',
    )
    .replace(/\.mp4($|\?)/, '.jpg$1')
}

/**
 * A dated, source-attributed metric for a case study. Only publish values
 * verified against the named source (e.g. Google Search Console) — these
 * render publicly and feed search/AI citations.
 */
export type CaseStudyResultMetric = {
  value: string
  label: string
  detail: string
  sourceName?: string
  dateRange?: string
  sourceUrl?: string
}

/**
 * Three-part narrative for the case study detail page. Source only from
 * previously published client-approved copy — no new claims or metrics.
 */
export type CaseStudyStory = {
  situation: string
  approach: string
  result: string
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
    results?: CaseStudyResultMetric[]
    story?: CaseStudyStory
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
      'How we supported a clear practice transition and built a stronger, measurable growth system.',
    slug: 'dr-christopher-wong',
    segments: ['dental', 'local'],
    structured: {
      heroImage: 'https://www.design-prism.com/dr-wong-polaroids.png',
      heroVideoId: 'HrksJeYb02Q',
      datePublished: '2025-01-15T00:00:00.000Z',
      dateModified: '2026-08-30T00:00:00.000Z',
      outcomes: [
        'The M&A transition was supported by a clear, story-driven online presence rather than leaving patients to guess what happened.',
        'The practice now runs on a modern dental website with strong SEO foundations and clean UX.',
        'Local presence and review profiles now reflect Dr. Wong as the primary dentist, not just the previous owner.',
        'Acquisition has shifted from passive word-of-mouth to active, AI-optimized ads and Google campaigns.',
        'The development and design stack is modern, AI-native, and capable of continuous improvement rather than one-off redesigns.',
      ],
      results: [
        {
          value: '+160%',
          label:
            'Google Search impressions in the latest 90 days, year over year',
          sourceName: 'Google Search Console',
          dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
          detail:
            'Google Search Console: 8,704 impressions grew to 22,660 in the latest complete 90-day year-over-year window.',
        },
        {
          value: '4.3×',
          label: 'July Google Search impressions, year over year',
          sourceName: 'Google Search Console',
          dateRange: 'July 2025 vs July 2026',
          detail:
            'Google Search Console: 1,703 impressions in July 2025 grew to 7,335 in July 2026.',
        },
      ],
      story: {
        situation:
          'Dr. Wong took over an established Palo Alto practice through an M&A transition, the moment patients are most likely to quietly leave. The legacy website and operational stack were outdated, and the online presence still told the previous owner’s story.',
        approach:
          'Prism rebuilt the patient-facing brand and digital operations: a modern website with clear ownership messaging, strong SEO foundations, aligned local listings and review profiles, and AI-optimized Google campaigns, all reporting into one rhythm.',
        result:
          'Patients gained a clearer digital handoff, acquisition shifted from passive word-of-mouth to measured active channels, and Google Search impressions rose 160% year over year in the latest complete 90-day window.',
      },
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
    location: 'Los Angeles, CA',
    description:
      'Creating a sophisticated online experience that matches their premium in-person patient care.',
    slug: 'exquisite-dentistry',
    segments: ['dental', 'local'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Exquisite Dentistry had everything most practices want: years of reputation, elite cosmetic work, deep community trust, and a high-end patient base. But the website undersold all of it, and because search and maps still produced leads, touching the site felt risky.',
        approach:
          'Prism rebuilt the website and booking flow through an evidence-first, staged process: modern design that matches the in-person experience, SEO treated as something to protect and upgrade rather than collateral damage, and rebuilt forms, funnel, and attribution.',
        result:
          'The digital experience now matches the caliber of the practice: premium positioning patients can feel online, cleaner conversion paths, and the trust signals and measurement to support long-term growth.',
      },
    },
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1774726440/exquisite-case-study-notebook-lm_l5ruuq.mp4',
      title:
        'See the rebuild that turned legacy prestige into a modern growth engine',
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
    title: 'Olympic Bootworks: a measurable retail platform for Tahoe',
    client: 'Olympic Bootworks',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353639/Olympic-bootworks_fwtza3.webp',
    websiteUrl: 'https://www.olympicbootworks.com',
    category: 'retail',
    industry: 'Retail & E-Bikes',
    location: 'Tahoe, CA',
    description:
      'An integrated Fantic e-bike catalog with current pricing, test-ride inquiries, analytics, and an owned Google + email stack.',
    slug: 'olympic-bootworks',
    segments: ['local'],
    structured: {
      heroImage: 'https://www.design-prism.com/olympic-bootworks.png',
      heroVideoId: 'Cgi7CZHMYQ0',
      datePublished: '2025-02-15T00:00:00.000Z',
      dateModified: '2026-08-30T00:00:00.000Z',
      outcomes: [
        'Traffic, search impressions, and online engagement compounded over time.',
        'Olympic Bootworks went from “great store, weak website” to one integrated retail platform for its brand, services, and Fantic e-bikes.',
        'Shoppers can compare the current Fantic lineup and visible pricing, then ask the shop about sizing, availability, test rides, pickup, or shipping.',
        'The business escaped website + email technical debt and moved to owned infrastructure.',
        'The Fantic catalog now routes high-consideration purchases into direct guidance from the shop.',
      ],
      results: [
        {
          value: '+8%',
          label:
            'Google Search impressions in the latest 90 days, year over year',
          sourceName: 'Google Search Console',
          dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
          detail:
            'Google Search Console: 9,373 impressions grew to 10,129 in the latest complete 90-day year-over-year window.',
        },
        {
          value: '10.7k',
          label: 'GA4 sessions in the latest complete 90 days',
          sourceName: 'GA4',
          dateRange: 'May 31-Aug 28, 2026',
          detail:
            'GA4: 10,709 sessions and 10,151 new users from May 31-Aug 28, 2026.',
        },
      ],
      story: {
        situation:
          'Olympic Bootworks had the hard part: a legendary bootfitting reputation, Olympians in the fitting room, and customers who drive hours. Online it had a basic Squarespace page, weak local discovery, and no clear way for riders to compare high-consideration Fantic e-bikes before contacting the shop.',
        approach:
          'Prism rebuilt the legacy site into a modern, mobile-first brand and services experience, integrated the Fantic e-bike catalog at Olympic Bootworks with visible current pricing and direct email and test-ride inquiry paths, and moved the shop onto an owned Google Workspace and email stack with clean DNS.',
        result:
          'The website became a measurable retail and operations asset instead of a brochure: Google Search impressions rose 8% year over year in the latest complete 90-day window, GA4 recorded 10,709 sessions, and riders gained a clear path from model and price research to a direct shop inquiry.',
      },
      focus: 'Integrated retail catalog + growth platform',
      scope:
        'Website rebuild, Fantic e-bike catalog, pricing + inquiry paths, analytics + SEO, Workspace + DNS cleanup',
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
    category: 'dentistry',
    industry: 'Dentistry',
    location: 'Laguna Beach, CA',
    description:
      'New brand, custom website, multi‑channel acquisition and end‑to‑end tracking working in tandem.',
    slug: 'laguna-beach-dental-arts',
    segments: ['dental', 'local'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'After a change in ownership, Laguna Beach Dental Arts needed a fast, confident relaunch. There was no structured SEO, no reliable ad pipeline, and inconsistent intake. Patient trust had to be preserved through the transition.',
        approach:
          'Prism partnered directly with the new owner-dentist to ship a complete relaunch: a clean visual identity and tone of voice, a fast mobile-first website with conversion-oriented UX, geo-targeted search campaigns with high-intent landing flows, and end-to-end tracking.',
        result:
          'The practice relaunched with brand, site, channels, and analytics working in tandem from day one, built to sustain momentum through the handoff and measure every step after it.',
      },
    },
  },
  {
    id: '5',
    title: 'Family‑Focused Website with Clear Conversion',
    client: 'Family First Smile Care',
    clientLogo:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1771353638/Family-First-Smile-Care_xo7qhz.webp',
    websiteUrl: 'https://famfirstsmile.com/',
    category: 'dentistry',
    founder: 'Dr. Tim J. Chuang',
    industry: 'Dentistry',
    location: 'Los Gatos, CA',
    description:
      'Services clarity, office comforts, and measurable conversion flows built for families.',
    slug: 'family-first-smile-care',
    segments: ['dental', 'local'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Family First Smile Care, founded and led by Dr. Tim J. Chuang, provides comprehensive dental care for all ages with a family-oriented approach, but its services, office comforts, and booking paths weren’t coming through clearly online.',
        approach:
          'Prism designed a modern website that makes it easy to understand services, appreciate the office amenities families care about, and book care quickly, with conversion tracking behind every flow.',
        result:
          'Services are clear, comforts are visible, and booking is effortless, with measurement in place to keep improving the patient journey.',
      },
    },
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
    structured: {
      story: {
        situation:
          'Town Centre Dental, led by Dr. Gerard “Dr. G” Banaga, provides comprehensive family dentistry in Brentwood, but the web presence didn’t make services easy to discover or appointments easy to book.',
        approach:
          'Prism modernized the practice’s web presence: clarified services and team pages, structured content and Google Business Profile work for local discovery, streamlined appointment paths, and end-to-end analytics from click to booked visit.',
        result:
          'Patients can find, understand, and book care without friction, and the practice can see the whole funnel instead of guessing.',
      },
    },
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
    structured: {
      story: {
        situation:
          'After an M&A transition, Grace Dental in Santa Rosa, led by Dr. Tingjen Ji, needed a relaunch that preserved patient trust while building a modern acquisition engine.',
        approach:
          'Prism relaunched the brand and website post-M&A, built service hubs for exams, cleanings, implants, veneers, and whitening, stood up acquisition channels, and implemented end-to-end tracking.',
        result:
          'A brand, site, and acquisition stack built to perform from day one, and to scale as the practice grows.',
      },
    },
  },
  {
    id: '22',
    title: 'From GoDaddy Stock Site to Measurable Admissions Engine',
    client: 'Roseville Dental Academy',
    websiteUrl: 'https://www.rosevilledentalacademy.com',
    category: 'dentistry',
    founder: 'Dr. Michael Narodovich',
    industry: 'Dental Education',
    location: 'Roseville, CA',
    description:
      'A stock GoDaddy web presence became a Vercel-hosted admissions platform with analytics, forms, Search Console, Hotjar, and an ElevenLabs AI assistant.',
    slug: 'roseville-dental-academy',
    segments: ['dental', 'local', 'education'],
    structured: {
      heroImage:
        'https://www.design-prism.com/case-studies/roseville-dental-academy-og.jpg',
      datePublished: '2026-05-22T00:00:00.000Z',
      dateModified: '2026-08-30T00:00:00.000Z',
      results: [
        {
          value: '701',
          label: 'Google clicks in the latest complete month',
          sourceName: 'Google Search Console',
          dateRange: 'July 2026',
          detail: 'Google Search Console: 701 clicks in July 2026.',
        },
        {
          value: '17.5k',
          label: 'Google Search impressions in the latest complete month',
          sourceName: 'Google Search Console',
          dateRange: 'July 2026',
          detail: 'Google Search Console: 17,506 impressions in July 2026.',
        },
      ],
      outcomes: [
        'Roseville Dental Academy moved from a limited stock-site setup to a Vercel-hosted production site that can be iterated like real software.',
        'The new admissions surface connects GA4, custom conversion events, Search Console, Hotjar, Formspree, and AI assistant support into one measurement-ready system.',
        'Students now see clearer program paths for dental assisting, CPR/BLS, radiation safety, infection control, coronal polish, sealants, and N95 fit testing.',
        'The school gained cleaner lead capture, stronger visibility instrumentation, and a practical foundation for ongoing enrollment optimization.',
      ],
      focus: 'Dental education admissions system',
      scope: 'Website migration, analytics, forms, AI assistant, search setup',
      canonicalUrl:
        'https://www.design-prism.com/case-studies/roseville-dental-academy',
    },
  },
  {
    id: '8',
    title: 'Building a Brand and Audience Engine for Bold Aging',
    client: 'Rebellious Aging',
    websiteUrl: 'https://rebelwithsuz.com',
    category: 'online community',
    founder: 'Suz Rohde',
    industry: 'Online Community',
    location: 'Los Gatos, CA',
    description:
      'A defiant brand identity, a content-first website, and a multi-channel audience engine across Substack, YouTube, TikTok, and a Facebook community for a movement that celebrates aging loudly.',
    slug: 'rebellious-aging',
    segments: ['community'],
    structured: {
      dateModified: '2026-06-22T00:00:00.000Z',
      focus: 'Brand and audience engine',
      scope:
        'Brand identity, website, Substack, YouTube, TikTok, Facebook community, decks and print',
      outcomes: [
        'A defiant, warm brand identity (logo, color, and type) that reads more like a magazine than a generic wellness brand, applied consistently across web, social, and print.',
        'A content-first website at rebelwithsuz.com built for a growing library, search-first discovery, and clear paths from reader to community member.',
        'A Substack publication designed so Suz can publish essays and grow an owned email audience that does not depend on social algorithms.',
        'A YouTube channel established for long-form video that anchors the content series and feeds the rest of the ecosystem.',
        "A TikTok presence that turns the movement's point of view into short-form discovery and reach.",
        'A Facebook community built as the gathering place where readers become members and the conversation lives.',
        'Business cards, slide decks, and supporting collateral designed in the same system so every offline and presentation touchpoint matches the brand.',
      ],
      story: {
        situation:
          'Rebellious Aging is built on a sharp conviction: the mainstream narrative around aging is wrong. Founder Suz Rohde had a bold point of view and growing content, but no cohesive brand and no connected system to make it discoverable, hold a content library, and turn an audience into a community.',
        approach:
          'Prism built the whole stack: a defiant brand identity (logo, type, color, business cards, and slide decks), a content-first website at rebelwithsuz.com, and a multi-channel audience engine spanning Substack, YouTube, TikTok, and a Facebook community, all designed in one consistent voice and wired for content-led growth.',
        result:
          'Rebellious Aging now has a brand and a connected audience engine as bold as its positioning. An owned home, owned email, owned video, and an active community work together instead of scattered, disconnected profiles.',
      },
      canonicalUrl:
        'https://www.design-prism.com/case-studies/rebellious-aging',
    },
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
    structured: {
      story: {
        situation:
          'Endodontics has a central tension: how do you communicate specialist expertise without amplifying patient fear? Wine Country Root Canal’s patients arrive anxious, often on referral, and most endodontic websites make that anxiety worse.',
        approach:
          'Prism built a calm, place-rooted brand drawing on the local landscape, service pages that explain root canals, retreatments, and apicoectomies in plain language, prominent doctor and testimonial content, frictionless booking, and SEO covering both patient and referring-dentist searches.',
        result:
          'A digital presence that signals expertise through calm rather than clinical distance, built to convert anxious patients and earn referring dentists’ confidence, with analytics readiness from day one.',
      },
    },
  },
  {
    id: '10',
    title: 'Consulting Presence Refresh',
    client: 'sr4 Partners',
    websiteUrl: 'https://www.sr4partners.com',
    category: 'consulting',
    founder: 'Todd “Ish” Israelite',
    industry: 'Consulting',
    location: 'Evanston, IL',
    description:
      'Messaging clarity and modular web design that support enterprise transformation engagements.',
    slug: 'sr4-partners',
    segments: ['consulting'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Founding partner Todd “Ish” Israelite and the sr4 Partners team had decades of organizational-development work and a distinctive methodology (strategy, results, relationships, resilience), but a digital presence that communicated generic consulting instead of a specific point of view.',
        approach:
          'Prism refreshed the brand rather than replacing it, structured the site around sr4’s service areas (executive coaching, team effectiveness, culture transformation, and organizational design), and built the content architecture around the searches senior leaders actually use, with analytics across service areas.',
        result:
          'A presence that matches the caliber of the work: clear methodology, modern brand expression with continuity for existing clients, and visibility into how high-value prospects engage.',
      },
    },
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1774726565/sr4-case-study-notebook-lm_ayuxeg.mp4',
      title:
        'Watch how Prism translated SR4’s methodology into a sharper digital presence',
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
    client: 'Infobell IT Solutions',
    websiteUrl: 'https://www.infobellit.com',
    category: 'consulting',
    industry: 'AI & Product Engineering',
    location: 'Bengaluru, India',
    description:
      'Clear product storytelling for a global AI, high-performance computing, and software engineering company.',
    slug: 'infobell-it',
    segments: ['it'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Infobell IT Solutions is a Bengaluru-headquartered, global product-engineering company spanning artificial intelligence, high-performance computing, cloud-native development, performance engineering, and its own software products. Its breadth needed a clearer story than a generic IT-services website could provide.',
        approach:
          'Prism organized the website around Infobell’s current engineering capabilities and product portfolio, giving enterprise buyers clearer paths into AI, HPC, cloud modernization, performance optimization, and software solutions, with search and analytics supporting discovery.',
        result:
          'Infobell now presents itself as the global AI and product-engineering company it is, with complex capabilities and software products easier for enterprise buyers to understand before the first conversation.',
      },
    },
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1774726921/infobell-case-study-notebook-lm_rzpjwc.mp4',
      title:
        'See how Prism clarified Infobell’s AI and product-engineering story',
      summary:
        'A concise walkthrough of how Prism made a complex AI, HPC, and software portfolio easier for enterprise buyers to understand and discover.',
      keyMoments: [
        'Why Infobell’s breadth across AI, HPC, cloud, and software products needed a clearer narrative.',
        'How the website structure was redesigned around enterprise engineering capabilities and products.',
        'How search and analytics support discovery across Infobell’s global offering.',
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
    structured: {
      story: {
        situation:
          'Canary Foundation funds research advancing early cancer detection, work whose importance wasn’t translating into a compelling digital experience for donors, or for the scientists who might collaborate.',
        approach:
          'Prism developed an identity balancing hope and urgency, structured the site for both donor and research audiences, built donation pages around transparent impact and frictionless giving, and configured analytics across the giving funnel.',
        result:
          'A digital presence that matches the importance of the mission: clearer storytelling, stronger donor trust, and measurable engagement across both audiences.',
      },
    },
  },
  {
    id: '13',
    title: 'Story-First Nonprofit Hub',
    client: 'Belize Kids',
    websiteUrl: 'https://www.belizekids.org',
    category: 'nonprofit',
    founder: 'Don Listwin',
    industry: 'Nonprofit',
    location: 'San Pedro, Belize',
    description:
      'Program storytelling, supporter flows, and analytics groundwork that keep impact front and center.',
    slug: 'belize-kids-foundation',
    segments: ['nonprofit'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      results: [
        {
          value: '+121%',
          label:
            'Google Search impressions in the latest 90 days, year over year',
          sourceName: 'Google Search Console',
          dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
          detail:
            'Google Search Console: 1,313 impressions grew to 2,903 in the latest complete 90-day year-over-year window.',
        },
      ],
      story: {
        situation:
          'Belize Kids, founded by Don Listwin, is rooted in real relationships with the communities it serves, but most donors are thousands of miles away. The site had to close that distance and earn trust from supporters with no prior connection to Belize.',
        approach:
          'Prism built a warm, vivid identity inspired by the Belize landscape, program storytelling that makes impact tangible, multiple giving pathways with clear impact statements, search architecture for donors actively looking for meaningful causes, and analytics across the donation funnel.',
        result:
          'Giving now feels immediate and concrete instead of abstract, and Google Search impressions rose 121% year over year in the latest complete 90-day window, reaching donors beyond the founder’s personal network.',
      },
    },
  },
  {
    id: '14',
    title: 'Private Retreat Storytelling',
    client: 'Canary Cove',
    websiteUrl: 'https://canarycove.com',
    category: 'private estate',
    industry: 'Hospitality',
    location: 'San Pedro, Belize',
    description:
      'Immersive visuals, direct inquiry flows, and analytics for a private beachfront estate on Ambergris Caye.',
    slug: 'canary-cove',
    segments: ['hospitality', 'local'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Canary Cove is a private beachfront estate on Ambergris Caye, reserved for one group at a time. For a destination like this the website is the first visit. It has to create desire and trust long before a guest ever arrives.',
        approach:
          'Prism built an immersive, visuals-first experience with concierge-ready booking flows and analytics that show how guests discover and explore the retreat.',
        result:
          'The estate’s digital presence now matches the experience itself: immersive storytelling backed by clean inquiry paths and measurement.',
      },
    },
  },
  {
    id: '15',
    title: 'Story-Led Emotional Learning Brand',
    client: 'We Are Saplings',
    websiteUrl: 'https://www.wearesaplings.com',
    category: 'education',
    founder: 'Clare Frattarola',
    industry: 'Children’s Emotional Learning',
    location: 'Los Angeles, CA',
    description:
      'A character-led home for emotional intelligence, mindfulness, and storytelling tools for children.',
    slug: 'we-are-saplings',
    segments: ['community', 'education'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Founder Clare Frattarola created We Are Saplings to help children build emotional intelligence through storytelling, mindfulness, and play. The brand needed to make emotional learning feel simple, approachable, and engaging for children and caregivers.',
        approach:
          'Prism built a joyful, character-led website around the Forest of Feelings, Clare’s founder story, and gentle tools that help children name emotions and practice coping skills, with clear paths to explore the brand’s stories and resources.',
        result:
          'Families and educators can quickly understand how We Are Saplings uses stories and mindfulness to support emotional development, without mistaking it for a location-based preschool.',
      },
    },
  },
  {
    id: '16',
    title: 'Specialty Dental Foundations',
    client: 'Coast Periodontics',
    websiteUrl: 'https://www.coastperiodontics.com',
    category: 'dentistry',
    founder: 'Dr. Bryce Chun',
    industry: 'Dentistry',
    location: 'San Luis Obispo, CA',
    description:
      'Reassuring website design, local presence support, and conversion tracking for a periodontic team.',
    slug: 'coast-periodontics-and-laser-surgery',
    segments: ['dental', 'local'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'Coast Periodontics, led by board-certified periodontist Dr. Bryce Chun, serves two audiences with opposite needs: anxious patients facing gum surgery and implants, and referring general dentists who need to see specialist authority before trusting a colleague with complex cases.',
        approach:
          'Prism built a calm-authority brand and a site that serves both: plain-language service pages that reassure rather than intimidate, credential depth for referring dentists, prominent testimonials, immediate booking, and local SEO covering both patient and professional referral searches.',
        result:
          'One digital presence that converts anxious patients and earns professional referrals, without compromising for either audience.',
      },
    },
  },
  {
    id: '17',
    title: 'Transition Consulting Launchpad',
    client: 'Practice Transitions Institute',
    websiteUrl: 'https://www.practicetransitionsinstitute.com',
    category: 'consulting',
    founder: 'Dr. Michael Njo',
    industry: 'Consulting',
    location: 'San Mateo, CA',
    description:
      'Narrative clarity, modern website, and local visibility for a dental transition advisory firm.',
    slug: 'practice-transitions-institute',
    segments: ['consulting'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'PTI had deep credibility in dental practice transitions, but its digital footprint did not look as credible as its track record, and dentists quietly researching transitions for months had little reason to stay and return.',
        approach:
          'Prism built the site around PTI’s six-stage process (discovery, valuation, deal navigation, transition support, protection, and next moves), with real client testimonials as trust infrastructure, a search-driven content hierarchy, local SEO, and analytics across the inquiry funnel.',
        result:
          'PTI’s authority is now visible before a conversation starts: a warm, credible platform built for long-consideration decisions, with measurable paths from quiet research to consultation.',
      },
    },
    explainerVideo: {
      src: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1774726719/pti-case-study-notebook-lm_j9ggam.mp4',
      title:
        'Watch how Prism turned PTI’s reputation into visible authority online',
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
    title: 'Leadership Retreat Digital Presence',
    client: 'Leadership Retreat',
    websiteUrl: 'https://www.dentistretreat.com',
    category: 'event',
    industry: 'Professional Development',
    location: 'Savannah, GA',
    description:
      'The 2026 Leadership Retreat at Thompson Savannah, with a clear agenda, speakers, registration, and hotel booking paths.',
    slug: 'leadership-retreat',
    segments: ['education', 'community'],
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      story: {
        situation:
          'The retreat is a small, intentionally curated gathering for dental professionals, boutique by design. Each year it moves cities, so each year the site must re-establish legitimacy and convert intrigued-but-skeptical dentists into booked rooms, with every registration mattering.',
        approach:
          'Prism built a luxury-travel-grade experience: cinematic photography and a warm visual language for each edition, an interactive day-by-day itinerary, integrated hotel booking with group rates, past-attendee proof treated as primary content, and analytics on the path to registration.',
        result:
          'The retreat looks like what it is (closer to a luxury travel brand than a CE course listing), and moving from “I want to come” to “I’ve booked my room” takes minimal effort.',
      },
    },
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
    structured: {
      story: {
        situation:
          'Dr. Michael Njo built two decades of practice on relationships and referrals, but new patients judge a website. A dated presence meant losing searchers to competitors with better marketing, while intent-driven search traffic went completely uncaptured.',
        approach:
          'Prism built the full digital infrastructure: a warm, credible brand and website organized around what a new patient needs to book, Google Ads targeting high-intent local searches and optimized for appointments rather than clicks, SEO and local listings, and analytics.',
        result:
          'The digital presence finally matches the dentistry: findable for the searches that matter, credible at first glance, and measurable end to end.',
      },
    },
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
    structured: {
      dateModified: '2026-08-30T00:00:00.000Z',
      results: [
        {
          value: '1.9×',
          label: 'monthly Google clicks in seven months',
          sourceName: 'Google Search Console',
          dateRange: 'Jan-Jul 2026',
          detail:
            'Google Search Console: 10 clicks (Jan 2026) → 19 (Jul 2026).',
        },
        {
          value: '+114%',
          label: 'Google Search impressions in seven months',
          sourceName: 'Google Search Console',
          dateRange: 'Jan-Jul 2026',
          detail:
            'Google Search Console: 505 impressions (Jan 2026) → 1,080 (Jul 2026).',
        },
      ],
      story: {
        situation:
          'Saorsa Growth Partners is a focused advisory firm whose pipeline depends on credibility and the right inquiries, not volume. The firm needed clarity, trust, and lead capture, and it needed them fast.',
        approach:
          'Prism shipped fast-loading pages, concise offers, and inquiry paths designed to surface the right work, with search and analytics instrumentation in place from launch.',
        result:
          'Within seven months, monthly Google clicks grew 1.9× and impressions grew 114% (Google Search Console, Jan–Jul 2026). That is a measured visibility ramp for a brand-new presence.',
      },
    },
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
      heroImage:
        'https://www.design-prism.com/case-studies/mataria-dental-group-home-desktop.jpg',
      datePublished: '2025-02-01T00:00:00.000Z',
      dateModified: '2026-08-30T00:00:00.000Z',
      outcomes: [
        'Mataria Dental Group relaunched with a modern dental website, aligned local listings, and structured analytics.',
        'Patients received a clear, human story about Dr. Mataria and why the transition benefits them.',
        'New channels and campaigns (Instagram, TikTok, giveaways) drove awareness with real video and team content.',
        'Prism captured scar tissue that shaped the later AI-native growth model.',
      ],
      story: {
        situation:
          'Mataria Dental Group was a recently acquired Torrance practice, and Prism’s first client. Like any healthcare M&A, the risk was patients quietly leaving when the practice changed hands, and without a measurement foundation any growth effort would be guesswork.',
        approach:
          'Prism built the digital and content engine: a modern website and aligned local listings, story-first content with real people and faces so patients had a clear reason to stay, awareness campaigns across Instagram and TikTok, and structured analytics underneath it all.',
        result:
          'Patients saw a human story instead of a corporate handoff, and the manual reps from this first build became the scar tissue that shaped Prism’s later AI-native growth model.',
      },
      focus: 'Dental M&A launch',
      scope: 'Website, listings, content, social ads, analytics',
      canonicalUrl:
        'https://www.design-prism.com/case-studies/mataria-dental-group',
    },
  },
]

export function getCaseStudyMetric(slug: string, metricIndex = 0) {
  const metric = CASE_STUDIES.find((study) => study.slug === slug)?.structured
    ?.results?.[metricIndex]

  if (!metric) {
    throw new Error(`Missing measured result ${metricIndex} for ${slug}`)
  }

  return metric
}
