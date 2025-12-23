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
    title: "seo that actually moves the needle",
    subtitle: "we build websites that don’t just look good — they show up, get clicked, and turn strangers into customers.",
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
      description: "how much proof there is that the world trusts you.",
    },
  ],
  onPagePreview: {
    title: "on-page seo — make your website a perfect answer",
    bullets: [
      "each page matches real search intent",
      "content is structured clearly for humans and search engines",
      "core services and locations are impossible to miss",
      "loading is fast, clean, and mobile friendly",
    ],
    linkText: "learn more",
    linkHref: "/seo/on-page",
  },
  offPagePreview: {
    title: "off-page seo — prove the world trusts you",
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
      title: "domination",
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
    title: "on-page seo: make your website a perfect answer",
    subtitle: "everything you control on your own site — designed to match what people are actually searching for.",
    primaryCta: { label: "book a prism build", href: "/get-started" },
    secondaryCta: { label: "see off-page seo", href: "/seo/off-page" },
  } satisfies SeoHeroContent,
  intro:
    "on-page seo is how we turn your website into the best possible answer to the questions your customers type into google and apple.",
  pillars: [
    {
      title: "content & intent match",
      description: "we design content to match real search intent, not random keywords.",
      bullets: [
        "service pages for each major offer",
        "location pages for every city or area you serve",
        "blog posts + faqs for the questions people truly ask",
        "clear headers so humans and search engines can scan",
        "direct answers — what you do, who it’s for, and why it matters",
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
        "schema/json-ld so machines understand every section",
        "secure https everywhere",
      ],
    },
    {
      title: "ux & engagement signals",
      description: "search engines monitor how real people behave; we design for genuine engagement.",
      bullets: [
        "easy navigation with clear menus",
        "above-the-fold clarity so people know they’re in the right place",
        "strong ctas for call, book, or message",
        "readable formatting with breathable spacing",
        "reduced bounce by giving users obvious next steps",
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
    "on-page seo isn’t an add-on for us — it’s the spine of every prism build. depending on your package, we simply add more pages, more schema, and more iteration as you grow.",
  closingBullets: [
    "start with the right architecture",
    "expand content as services and locations grow",
    "keep iterating so search intent and messaging stay aligned",
  ],
}

export const seoOffPageContent = {
  hero: {
    eyebrow: "off-page seo",
    title: "off-page seo: prove to google and apple that the world trusts you",
    subtitle: "everything happening off your site that boosts trust, authority, and visibility.",
    primaryCta: { label: "tighten your ecosystem", href: "/get-started" },
    secondaryCta: { label: "review on-page seo", href: "/seo/on-page" },
  } satisfies SeoHeroContent,
  video: {
    id: "off-page-seo-video",
    eyebrow: "watch",
    title: "enzo on designing off-page proof systems",
    description: "hear enzo break down how we tighten listings, reviews, and backlinks so platforms see steady proof you’re legit.",
    playerTitle: "Enzo on tightening off-page proof",
    caption: "why we build feedback loops around reviews, listings, and mentions so your reputation graph compounds.",
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
    "off-page seo is about proof — proof that other sites vouch for you, that your business exists in the real world, and that real people interact with you.",
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
        "reviews show volume, recency, distribution, and narrative — all signals engines monitor.",
      bullets: [
        "google reviews",
        "yelp + facebook",
        "third-party aggregators like birdeye or podium",
        "flows that make it easy for happy customers to share",
      ],
    },
    {
      title: "real-world engagement",
      description:
        "engagement metrics like map clicks and calls reinforce that you’re an active business.",
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
        "even without links, brand mentions help engines understand you’re real and referenced.",
      bullets: [
        "local blogs and community shoutouts",
        "event sponsorships and listings",
        "forums or groups recommending you",
        "press releases (real ones) that document what you do",
      ],
    },
  ],
  closing:
    "off-page seo is where your reputation graph is built. depending on your package we tighten listings, design review flows, and align every off-site signal with your on-site experience.",
}
