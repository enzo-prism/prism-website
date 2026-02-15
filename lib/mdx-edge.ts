// Edge-compatible functions for getting blog post metadata
// This file provides a way to access blog post data without file system operations


// Import all blog posts statically
const blogPosts = {
  'ai-rip-eyes-out-dental-software': {
    title: "AI Is About to Rip the Eyes Out of Dental Software And That's Great News for Dentists",
    category: "AI & Dentistry",
    gradientClass: "bg-gradient-to-br from-rose-300/30 via-amber-300/30 to-emerald-300/30",
  },
  '2026-belongs-to-the-founders-who-can-delegate': {
    title: "2026 belongs to the founders who can delegate",
    category: "Entrepreneurship",
    gradientClass: "bg-gradient-to-br from-amber-300/30 via-orange-300/30 to-rose-300/30",
  },
  'meet-gwen-prisms-ai-powered-growth-partner': {
    title: "Meet Gwen: Prism's AI Powered Growth Partner",
    category: "AI & Growth",
    gradientClass: "bg-gradient-to-br from-sky-300/30 via-indigo-300/30 to-emerald-300/30",
  },
  'unlocking-smb-growth-hormozi-100m-offers': {
    title: "Unlocking SMB Growth: Lessons from Alex Hormozi's $100M Offers (And Why AI is Your Secret Weapon Right Now)",
    category: "Business & AI",
    gradientClass: "bg-gradient-to-br from-orange-300/30 via-red-300/30 to-purple-300/30",
  },
  'google-ads-ai-smb-acquisition-playbook': {
    title: "Google Ads + AI: A Simple, Profitable Acquisition Playbook for SMBs",
    category: "AI & Growth",
    gradientClass: "bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30",
  },
  'unlocking-smb-growth-hormozi-100m-leads': {
    title: "Unlocking SMB Growth: Lessons from Alex Hormozi's $100M Leads (And Why AI is Your Secret Weapon Right Now)",
    category: "Business & AI",
    gradientClass: "bg-gradient-to-br from-purple-300/30 via-indigo-300/30 to-blue-300/30",
  },
  'the-grind-that-builds-empires': {
    title: "The Grind That Builds Empires: Why Your Solitary Sweat Separates Legends from the Pack",
    category: "Motivation & Entrepreneurship",
    gradientClass: "bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-sky-300/30",
  },
  'create-website-more-business-replit': {
    title: "Create website more business replit",
    category: "Business",
    gradientClass: "bg-gradient-to-br from-red-300/30 via-orange-300/30 to-yellow-300/30",
  },
  'revolutionize-small-business-ai-extract-old-website-content-grok-4': {
    title: "Revolutionize small business ai extract old website content grok 4",
    category: "AI & Technology",
    gradientClass: "bg-gradient-to-br from-blue-300/30 via-indigo-300/30 to-purple-300/30",
  },
  'built-animated-game-with-ai': {
    title: "Built animated game with ai",
    category: "AI & Technology",
    gradientClass: "bg-gradient-to-br from-green-300/30 via-blue-300/30 to-purple-300/30",
  },
  'winning-ai-search-game': {
    title: "Winning ai search game",
    category: "AI & SEO",
    gradientClass: "bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-orange-300/30",
  },
  'business-visibility-chatgpt': {
    title: "Business visibility chatgpt",
    category: "AI & Marketing",
    gradientClass: "bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-red-300/30",
  },
  'ai-effortlessly-welcome-more-patients-dental-practice': {
    title: "Ai effortlessly welcome more patients dental practice",
    category: "Healthcare & AI",
    gradientClass: "bg-gradient-to-br from-pink-300/30 via-purple-300/30 to-indigo-300/30",
  },
  '6m-arr-playbook': {
    title: "6m arr playbook",
    category: "Business Growth",
    gradientClass: 'bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-sky-300/30',
  },
  'differentiation-is-survival': {
    title: "Differentiation is survival",
    category: "Business Strategy",
    gradientClass: 'bg-gradient-to-br from-blue-300/30 via-indigo-300/30 to-purple-300/30',
  },
  'from-6-impressions-to-hundreds-seo-journey': {
    title: "From 6 impressions a day to hundreds: what it really takes to win with seo",
    category: "seo",
    gradientClass: "bg-gradient-to-br from-amber-200/30 via-emerald-200/30 to-sky-300/30",
  },
  'seo-mystery-beverly-hills-dentist-traffic-from-china': {
    title: "the seo mystery: why a beverly hills dentist was getting traffic from china (and what we did about it)",
    category: "seo",
    gradientClass: "bg-gradient-to-br from-rose-300/30 via-amber-300/30 to-sky-300/30",
  },
  'from-one-video-to-seo-flywheel': {
    title: "From one video to seo flywheel",
    category: "Content Strategy",
    gradientClass: "bg-gradient-to-br from-rose-300/30 via-amber-200/30 to-lime-200/30",
  },
  'founders-playbook-ai-era': {
    title: "Founders playbook ai era",
    category: "Entrepreneurship",
    gradientClass: "bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30",
  },
  'great-content-collapse': {
    title: "Great content collapse",
    category: "Content Marketing",
    gradientClass: "bg-gradient-to-br from-rose-300/30 via-amber-300/30 to-lime-300/30",
  },
  'how-we-supercharged-prisms-site-with-midjourney-video': {
    title: "How we supercharged prisms site with midjourney video",
    category: "Case Study",
    gradientClass: "bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-sky-300/30",
  },
  'future-of-seo-ai-search': {
    title: "Future of seo ai search",
    category: "SEO & AI",
    gradientClass: "bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30",
  },
  'google-maps-visibility-playbook-2025': {
    title: "Google maps visibility checklist for local businesses (2025)",
    category: "Local SEO",
    gradientClass: "bg-gradient-to-br from-sky-300/30 via-emerald-300/30 to-indigo-300/30",
  },
  'how-to-choose-local-seo-agency': {
    title: "How to choose a local seo agency (checklist + red flags)",
    category: "Local SEO",
    gradientClass: "bg-gradient-to-br from-amber-200/30 via-emerald-200/30 to-sky-300/30",
  },
  'prism-approach-small-business-growth': {
    title: "The Prism Approach to Small Business Growth",
    category: "Local Growth Strategy",
    gradientClass: "bg-gradient-to-br from-amber-300/30 via-sky-300/30 to-emerald-300/30",
  },
  'who-prism-is-for': {
    title: "I Tried Squarespace, Hired an Agency, and Built Prism Instead. Here's Who It's Actually For.",
    category: "Local Growth Strategy",
    gradientClass: "bg-gradient-to-br from-amber-300/30 via-sky-300/30 to-emerald-300/30",
  },
  'riding-the-ai-wave': {
    title: "Riding the ai wave",
    category: "AI Trends",
    gradientClass: "bg-gradient-to-br from-teal-300/30 via-cyan-300/30 to-indigo-300/30",
  },
  'dental-practice-1-3m-swamp': {
    title: "The 1–3M Swamp for Dental Practices",
    category: "Business & Leadership",
    gradientClass: "bg-gradient-to-br from-teal-300/30 via-blue-300/30 to-indigo-300/30",
  },
  'dental-seo-guide': {
    title: "dental seo guide: how dentists rank higher (maps + organic)",
    category: "seo",
    gradientClass: "bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30",
  },
  'dental-practice-rank-higher-google-search': {
    title: "dental practice rank higher in google search: a dentist checklist",
    category: "seo",
    gradientClass: "bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30",
  },
  'how-to-choose-seo-consultant-for-dentists': {
    title: "how to choose an seo consultant for dentists (checklist + questions)",
    category: "seo",
    gradientClass: "bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30",
  },
  'ai-search-for-dental-practice': {
    title: "ai search for dental practice: how to get cited",
    category: "appear in ai search",
    gradientClass: "bg-gradient-to-br from-sky-300/30 via-emerald-300/30 to-indigo-300/30",
  },
  'adapting-small-business-ai-search-revolution-2025': {
    title: "Adapting Your Small Business to the AI Search Revolution: Reclaim Your Traffic in 2025",
    category: "Content Marketing & SEO",
    gradientClass: "bg-gradient-to-br from-purple-300/30 via-blue-300/30 to-cyan-300/30",
  },
  'how-i-ranked-1-google-24-hours-claude-code': {
    title: "This Guy Ranked #1 on Google in 24 Hours Using AI (Here's What We Can Learn)",
    category: "SEO & AI",
    gradientClass: "bg-gradient-to-br from-orange-300/30 via-red-300/30 to-purple-300/30",
  },
  'design-is-the-moat-in-the-ai-era-5-lessons-from-figma-revenue-2025': {
    title: "Design Is the Moat in the AI Era | 5 Revenue Lessons",
    category: "Design & Product",
    gradientClass: "bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-sky-300/30",
  },
  'gpt5-two-levers-growth': {
    title: 'GPT-5 and the Two Levers of Growth: Creativity on Tap, Execution at Speed',
    category: 'AI & Growth',
    gradientClass: 'bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30',
  },
  'content-that-converts-give-away-secrets-sell-implementation': {
    title: 'Content That Converts: Give Away the Secrets, Sell the Implementation',
    category: 'Content Strategy',
    gradientClass: 'bg-gradient-to-br from-rose-300/30 via-amber-300/30 to-lime-300/30',
  },
  'inside-gpt5s-brain-system-prompt-secrets-first-movers': {
    title: "Inside GPT-5’s Brain: System Prompt Secrets for First Movers",
    category: 'AI & Growth',
    gradientClass: 'bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30',
  },
  'win-next-ai-distribution-wave-30-day-playbook': {
    title: 'Win the Next AI Distribution Wave: A 30-Day, No-Fluff Playbook for Founders & Local Service Brands',
    category: 'AI & Growth',
    gradientClass: 'bg-gradient-to-br from-emerald-300/30 via-sky-300/30 to-indigo-300/30',
  },
  'reusable-shadcn-codex-template': {
    title: 'build a reusable shadcn + codex design system for every future project',
    category: 'ai powered web development',
    gradientClass: 'bg-gradient-to-br from-indigo-200/40 via-sky-200/40 to-emerald-200/40',
  },
} as const

export function getPostMetadataForOG(slug: string) {
  return blogPosts[slug as keyof typeof blogPosts] || null
}
