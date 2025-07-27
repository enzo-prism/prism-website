// Edge-compatible functions for getting blog post metadata
// This file provides a way to access blog post data without file system operations


// Import all blog posts statically
const blogPosts = {
  'unlocking-smb-growth-hormozi-100m-offers': {
    title: "Unlocking SMB Growth: Lessons from Alex Hormozi's $100M Offers (And Why AI is Your Secret Weapon Right Now)",
    category: "Business & AI",
    gradientClass: "bg-gradient-to-br from-orange-300/30 via-red-300/30 to-purple-300/30",
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
  'adapting-small-business-ai-search-revolution-2025': {
    title: "Adapting Your Small Business to the AI Search Revolution: Reclaim Your Traffic in 2025",
    category: "Content Marketing & SEO",
    gradientClass: "bg-gradient-to-br from-purple-300/30 via-blue-300/30 to-cyan-300/30",
  },
} as const

export function getPostMetadataForOG(slug: string) {
  return blogPosts[slug as keyof typeof blogPosts] || null
}