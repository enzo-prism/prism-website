export type SeoSectionItem = {
  title: string
  description: string
  bullets?: string[]
  note?: string
  linkText?: string
  linkHref?: string
}

export type SeoHeroContent = {
  eyebrow: string
  title: string
  subtitle: string
  kicker?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export type SeoVideoContent = {
  id: string
  eyebrow: string
  title: string
  description: string
  playerTitle: string
  caption: string
  src: string
  poster: string
  schema: {
    name: string
    description: string
    uploadDate: string
    duration?: string
    creatorName?: string
  }
}

export const seoOverviewContent = {
  hero: {
    eyebrow: "seo",
    title: "Help the right customers find you",
    subtitle: "We improve your pages, listings, and site structure so people searching for your services can find clear answers and a way to contact you.",
    primaryCta: { label: "talk with prism", href: "/get-started" },
    secondaryCta: { label: "see on-page seo", href: "/seo/on-page" },
  } satisfies SeoHeroContent,
  scoringQuestions: [
    "is this the right answer for this search?",
    "can we trust this business?",
    "do real people actually engage with it?",
  ],
  seoModes: [
    {
      title: "on-page seo",
      description: "how well your website answers the search.",
    },
    {
      title: "off-page seo",
      description: "How your business is represented on other websites, directories, and review platforms.",
    },
  ],
  onPagePreview: {
    title: "Make every page useful",
    bullets: [
      "each page matches real search intent",
      "content is structured clearly for humans and search engines",
      "clear service and location information",
      "loading is fast, clean, and mobile friendly",
    ],
    linkText: "on-page seo services",
    linkHref: "/seo/on-page",
  },
  offPagePreview: {
    title: "Build a consistent presence beyond your site",
    bullets: [
      "who’s linking to you (quality over quantity)",
      "where your business is listed and how consistent it is",
      "what your reviews say across every major platform",
      "how people interact with you on maps and listings",
    ],
    linkText: "see our approach",
    linkHref: "/seo/off-page",
  },
  packages: [
    {
      title: "foundation",
      description: "clean structure, fast performance, baseline schema, key service + location pages, core listings.",
    },
    {
      title: "growth",
      description: "deeper content, stronger internal linking, robust schema, expanded service areas, review strategy.",
    },
    {
      title: "ongoing improvement",
      description: "ongoing content, advanced local listing optimization, review systems, link opportunities, continuous iteration.",
    },
  ],
  benefits: [
    "a website built as a clear, structured answer to what your ideal customers search.",
    "local listings and reviews that reinforce your authority instead of confusing it.",
    "an seo foundation that compounds and supports ads, content, and brand campaigns.",
  ],
}

export const seoOnPageContent = {
  hero: {
    eyebrow: "on-page seo",
    title: "Make every page useful",
    subtitle: "everything you control on your own site, designed to match what people are actually searching for.",
    primaryCta: { label: "book a prism build", href: "/get-started" },
    secondaryCta: { label: "see off-page seo", href: "/seo/off-page" },
  } satisfies SeoHeroContent,
  intro:
    "On-page SEO helps visitors and search engines understand your website. We organize the pages around the services you offer and the questions customers ask.",
  pillars: [
    {
      title: "content & intent match",
      description: "we design content to match real search intent, not random keywords.",
      bullets: [
        "service pages for each major offer",
        "location pages for every city or area you serve",
        "blog posts + faqs for the questions people truly ask",
        "clear headers so humans and search engines can scan",
        "direct answers: what you do, who it’s for, and why it matters",
        "real examples, photos, and videos for proof",
      ],
    },
    {
      title: "technical structure",
      description: "under the hood, your site has to be clean, fast, and easy to crawl.",
      bullets: [
        "fast load speed through optimized media and code",
        "mobile-first layouts on every page",
        "clean urls that read like real words",
        "internal linking that guides both users and crawlers",
        "no duplicate content and correct canonicals",
        "sitemap + robots.txt tuned to what should be crawled",
        "structured data that accurately describes eligible page content",
        "secure https everywhere",
      ],
    },
    {
      title: "a clear path to an inquiry",
      description: "Visitors should be able to understand your offer, find an answer, and contact you without getting lost.",
      bullets: [
        "easy navigation with clear menus",
        "above-the-fold clarity so people know they’re in the right place",
        "strong ctas for call, book, or message",
        "readable formatting with breathable spacing",
        "useful next steps after the information visitors came for",
      ],
    },
    {
      title: "local business essentials",
      description: "your site needs to line up perfectly with your real-world presence.",
      bullets: [
        "consistent nap (name, address, phone) across the site",
        "embedded maps to connect digital + physical locations",
        "clear service areas and coverage",
        "team bios, credentials, and trust signals",
        "before/after galleries and testimonials",
        "page-level local business schema",
      ],
    },
  ],
  closing:
    "Search is part of how we plan a website. We start with useful pages and sound technical foundations, then agree on the content and improvements your business needs next.",
  closingBullets: [
    "start with the right architecture",
    "expand content as services and locations grow",
    "keep iterating so search intent and messaging stay aligned",
  ],
}

export const seoOffPageContent = {
  hero: {
    eyebrow: "off-page seo",
    title: "Make your reputation easier to find",
    subtitle: "Accurate listings, genuine reviews, and relevant mentions help people check your business before they choose it.",
    primaryCta: { label: "request a free review", href: "/get-started" },
    secondaryCta: { label: "review on-page seo", href: "/seo/on-page" },
  } satisfies SeoHeroContent,
  video: {
    id: "off-page-seo-video",
    eyebrow: "watch",
    title: "Enzo on your reputation beyond your website",
    description: "Enzo explains how listings, reviews, and relevant links fit into Prism’s search work.",
    playerTitle: "Enzo on tightening off-page proof",
    caption: "How accurate business information and genuine customer feedback support your online presence.",
    src: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763427804/off-page-1_s9ni7k.mp4",
    poster: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/off-page-1_s9ni7k.jpg",
    schema: {
      name: "Enzo explains Prism's off-page SEO systems",
      description:
        "Enzo Sison walks through Prism’s approach to backlinks, listings, reviews, and entity signals so local brands keep showing up.",
      uploadDate: "2025-05-28T00:00:00Z",
      creatorName: "Enzo Sison",
    },
  } satisfies SeoVideoContent,
  intro:
    "off-page seo is about proof: proof that other sites vouch for you, that your business exists in the real world, and that real people interact with you.",
  levers: [
    {
      title: "backlinks",
      description:
        "links from other websites are public endorsements. we focus on quality, not spam.",
      bullets: [
        "editorial mentions and guides",
        "guest posts with useful insights",
        "local news coverage",
        "industry organizations linking back",
        "supplier + partner references",
        "high-authority citations with accurate nap",
      ],
    },
    {
      title: "local listings",
      description:
        "listings verify who you are and where you operate. consistency is everything.",
      bullets: [
        "google business profile and apple business connect",
        "yelp, bing places, facebook",
        "industry-specific directories",
        "accurate nap, categories, photos, and hours",
      ],
    },
    {
      title: "reviews & reputation",
      description:
        "Recent, genuine feedback helps customers understand what it is like to work with you.",
      bullets: [
        "google reviews",
        "yelp + facebook",
        "third-party aggregators like birdeye or podium",
        "simple requests for honest customer feedback",
      ],
    },
    {
      title: "real-world engagement",
      description:
        "Profile interactions help you see how people use your listings and where to improve them.",
      bullets: [
        "maps listing clicks and direction requests",
        "calls from listings",
        "photo views and website taps",
        "better visuals and descriptions that drive action",
      ],
    },
    {
      title: "social signals",
      description:
        "social isn’t a direct ranking factor, but it fuels branded searches and mentions.",
      bullets: [
        "drives more branded queries",
        "creates link and mention opportunities",
        "keeps your brand obviously active",
      ],
    },
    {
      title: "mentions & entity building",
      description:
        "Relevant mentions put your business in context, from local events to industry publications.",
      bullets: [
        "local blogs and community shoutouts",
        "event sponsorships and listings",
        "forums or groups recommending you",
        "press releases (real ones) that document what you do",
      ],
    },
  ],
  closing:
    "We review where your business appears, correct conflicting information, and agree on a practical plan for listings, reviews, and relevant mentions. The details should match what customers find on your website.",
}
