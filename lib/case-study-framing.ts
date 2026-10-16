/**
 * The Work section's one idea (2026-10): every client sells something
 * different to someone different, and every one came to Prism with the same
 * two problems. Not enough of the right people knew they existed (be found),
 * and not enough of the people who found them became customers, patients,
 * donors, or students (be chosen).
 *
 * Each entry restates a current client's published work in those two terms.
 * Every line paraphrases `structured.story`, `structured.outcomes`, or
 * `structured.scope` in lib/case-study-data.ts, or a delivered service in
 * lib/case-study-work-highlights.ts. Nothing here is a client quote, and
 * nothing adds a claim, a number, or a result the published case study does
 * not already make. Copy follows the house rules in DESIGN.md: sentence case,
 * no em dashes, no guarantees.
 */

export type CaseStudyFraming = {
  /** Short chip label for who the business needs to reach (index rail). */
  who: string
  /** Who the business needs to reach, as a full sentence (detail page). */
  audience: string
  /** What Prism built so more of those people find the business. */
  found: string
  /** What Prism built so more of the people who find it say yes. */
  chosen: string
}

export const CASE_STUDY_FRAMING: Record<string, CaseStudyFraming> = {
  'dr-christopher-wong': {
    who: 'Patients in Palo Alto',
    audience:
      'Palo Alto patients deciding whether to stay through a change in ownership.',
    found:
      'Strong SEO foundations, local listings and review profiles that name Dr. Wong as the dentist, and AI-optimized Google campaigns in place of passive word-of-mouth.',
    chosen:
      'A modern website with clear ownership messaging, so patients get a clear handoff instead of guessing what happened to their practice.',
  },
  'exquisite-dentistry': {
    who: 'Cosmetic patients in LA',
    audience:
      'High-end cosmetic patients in Los Angeles, many already finding the practice through search and maps.',
    found:
      'A staged, evidence-first rebuild that protected and upgraded the search traffic already bringing patients in, instead of treating it as collateral damage.',
    chosen:
      'A site and booking flow that match the in-person experience, with rebuilt forms, a cleaner funnel, and attribution behind it.',
  },
  'olympic-bootworks': {
    who: 'Skiers who drive hours',
    audience:
      'Skiers and e-bike riders, many of whom drive hours to reach the shop in Tahoe.',
    found:
      'A mobile-first rebuild with SEO and local listings in place of a basic Squarespace page and weak local discovery, on an owned Google Workspace, email, and DNS stack.',
    chosen:
      'The Fantic e-bike lineup with current pricing, plus test-ride and direct email inquiry paths, so riders can compare models before they reach out.',
  },
  'family-first-smile-care': {
    who: 'Families in Los Gatos',
    audience: 'Los Gatos families looking for one dentist for every age.',
    found:
      'Search and local listing work so nearby families can find the practice, with analytics behind it.',
    chosen:
      'A modern site that makes services easy to understand, shows the office comforts families care about, and makes booking quick, with conversion tracking behind every flow.',
  },
  'town-centre-dental': {
    who: 'Families in Brentwood',
    audience: 'Brentwood families looking for a family dentist.',
    found:
      'Structured content and Google Business Profile work built for local discovery.',
    chosen:
      'Clearer services and team pages, streamlined appointment paths, and analytics from click to booked visit.',
  },
  'grace-dental-santa-rosa': {
    who: 'Patients in Santa Rosa',
    audience:
      'Santa Rosa patients, existing and new, through a change in ownership.',
    found:
      'New acquisition channels, including Google Ads, search, and local listings, with end-to-end tracking.',
    chosen:
      'A relaunched brand and website with dedicated pages for exams, cleanings, implants, veneers, and whitening.',
  },
  'roseville-dental-academy': {
    who: 'Future dental assistants',
    audience:
      'Students comparing dental assisting programs and certifications around Roseville.',
    found:
      'Search Console, analytics, and visibility instrumentation in place of a stock GoDaddy site, on a platform that can be improved like real software.',
    chosen:
      'Clear paths for dental assisting, CPR/BLS, radiation safety, and more, with cleaner lead capture and an AI assistant for questions.',
  },
  'rebellious-aging': {
    who: 'Readers who reject aging myths',
    audience:
      'Readers and viewers who think the mainstream story about aging is wrong.',
    found:
      'A content-first website built for search, a YouTube channel for long-form video, and TikTok for short-form discovery and reach.',
    chosen:
      'A defiant brand, a Substack that grows an owned email audience, and a Facebook community where readers become members.',
  },
  'wine-country-root-canal': {
    who: 'Anxious root canal patients',
    audience:
      'Anxious patients, often on referral, and the dentists who refer them.',
    found:
      'SEO covering both patient searches and referring-dentist searches, plus local listings.',
    chosen:
      'A calm, place-rooted brand, plain-language pages for root canals, retreatments, and apicoectomies, prominent doctor and testimonial content, and frictionless booking.',
  },
  'infobell-it': {
    who: 'Enterprise AI buyers',
    audience:
      'Enterprise buyers evaluating partners for AI, high-performance computing, and cloud engineering.',
    found:
      'Search and analytics supporting discovery across a global AI, HPC, cloud, and software portfolio.',
    chosen:
      'A site organized around current engineering capabilities and products, so complex offerings are easier to understand before the first conversation.',
  },
  'canary-foundation': {
    who: 'Cancer research donors',
    audience:
      'Donors, and the scientists who might collaborate on early cancer detection research.',
    found:
      'Search work and a site structured for both donor and research audiences, with analytics across the giving funnel.',
    chosen:
      'An identity that balances hope and urgency, and donation pages built on transparent impact and frictionless giving.',
  },
  'belize-kids-foundation': {
    who: 'Donors far from Belize',
    audience:
      'Donors thousands of miles from Belize, many with no prior connection to it.',
    found:
      'Search architecture for donors actively looking for meaningful causes, reaching beyond the founder’s personal network.',
    chosen:
      'A warm identity drawn from the Belize landscape, program stories that make impact tangible, and multiple giving paths with clear impact statements.',
  },
  'canary-cove': {
    who: 'Groups booking a private estate',
    audience:
      'Groups looking for a private beachfront estate on Ambergris Caye, one group at a time.',
    found:
      'Search work and analytics that show how guests discover and explore the retreat.',
    chosen:
      'An immersive, visuals-first site that makes the website the first visit, with concierge-ready inquiry flows.',
  },
  'we-are-saplings': {
    who: 'Parents and educators',
    audience:
      'Families and educators looking for gentle tools that help children name their feelings.',
    found:
      'Search work and analytics behind clear paths into the brand’s stories and resources.',
    chosen:
      'A joyful, character-led site built around the Forest of Feelings and Clare’s founder story, so families quickly understand what it is and never mistake it for a local preschool.',
  },
  'coast-periodontics-and-laser-surgery': {
    who: 'Referring dentists',
    audience:
      'Anxious patients facing gum surgery or implants, and the general dentists who refer them.',
    found:
      'Local SEO and listings covering both patient searches and professional referral searches.',
    chosen:
      'A calm-authority brand, plain-language service pages, credential depth for referring dentists, prominent testimonials, and immediate booking.',
  },
  'practice-transitions-institute': {
    who: 'Dentists planning a transition',
    audience:
      'Dentists quietly researching a practice transition for months before they reach out.',
    found:
      'A search-driven content hierarchy and local SEO built for months of quiet research.',
    chosen:
      'The six-stage process laid out clearly, real client testimonials as trust infrastructure, and measurable paths from research to consultation.',
  },
  'leadership-retreat': {
    who: 'Dentists choosing a retreat',
    audience:
      'Intrigued but skeptical dental professionals, in a new city every year.',
    found:
      'Search work and a fresh visual language for each year’s edition, with analytics on the path to registration.',
    chosen:
      'Cinematic photography, a day-by-day itinerary, past-attendee proof up front, and integrated hotel booking with group rates.',
  },
  'michael-njo-dds': {
    who: 'New patients in the Bay Area',
    audience:
      'New patients in the Bay Area who judge a dentist by the website first.',
    found:
      'Google Ads aimed at high-intent local searches and optimized for appointments rather than clicks, plus SEO and local listings.',
    chosen:
      'A warm, credible brand and website organized around what a new patient needs to book.',
  },
  'mataria-dental-group': {
    who: 'Patients in Torrance',
    audience:
      'Torrance patients deciding whether to stay after the practice changed hands.',
    found:
      'Aligned local listings and awareness campaigns across Instagram and TikTok, built on real video and team content.',
    chosen:
      'A modern website and story-first content with real faces, giving patients a human story and a clear reason to stay.',
  },
  'waikiki-dental': {
    who: 'Nervous patients in Roseville',
    audience:
      'Roseville patients who want family, cosmetic, implant, or sedation care from an anxiety-friendly practice.',
    found:
      'A 14-service search structure with dedicated pages for IV sedation, implants, and same-day crowns, plus local SEO.',
    chosen:
      'A 3-step appointment request that keeps every patient on the site, a Pacific Premium design with real team photography, and a 4.9-star reputation across 426 Google reviews up front.',
  },
  'sacramento-dental-medicine': {
    who: 'Families in Antelope',
    audience:
      'Antelope families, including patients in pain who need help today.',
    found:
      'Dentist and FAQ schema plus sitemap discipline, so search fundamentals hold up on the live domain.',
    chosen:
      'A mobile-first scheduler with large tap targets, an “in pain? call now” lane for emergencies, and a reviews page built on all 632 Google ratings.',
  },
}

export function getCaseStudyFraming(slug: string): CaseStudyFraming | undefined {
  return CASE_STUDY_FRAMING[slug]
}

/** The two problems, in the words every Work surface uses. */
export const TWO_PROBLEMS = {
  found: {
    title: 'be found.',
    problem: 'Not enough of the right people knew the business existed.',
    builds: [
      'Search and AI answers',
      'Google Business Profile and listings',
      'Content and social',
      'Ads aimed at real intent',
    ],
  },
  chosen: {
    title: 'be chosen.',
    problem:
      'Not enough of the people who found it called, booked, gave, or bought.',
    builds: [
      'A website as good as the work',
      'Booking and inquiry paths',
      'Reviews and proof up front',
      'Tracking from click to customer',
    ],
  },
} as const
