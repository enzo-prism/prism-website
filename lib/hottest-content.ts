export type HottestContentItem = {
  slug: string
  title: string
  platform: "instagram"
  instagramUrl: string
  views: number
  likes: number
  shares: number
  summary: string
  insight?: string
  highlighted?: boolean
}

const INSTAGRAM_REEL_URL =
  "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="

export const HOTTEST_CONTENT: HottestContentItem[] = [
  {
    slug: "viral-reel-hormozi-hook",
    title: "How We Flipped Hormozi's Hook",
    platform: "instagram",
    instagramUrl: INSTAGRAM_REEL_URL,
    views: 182000,
    likes: 12400,
    shares: 2100,
    summary:
      "We repackaged a founder success story into a 19-second punchline that delivered instant credibility.",
    insight:
      "Led with social proof in the opening 2 seconds, then layered a rapid-fire carousel of proof points to keep average watch time above 15 seconds.",
    highlighted: true,
  },
  {
    slug: "stanford-storytelling-framework",
    title: "Stanford Storytelling Framework",
    platform: "instagram",
    instagramUrl: INSTAGRAM_REEL_URL,
    views: 156000,
    likes: 9800,
    shares: 1750,
    summary:
      "We helped a Stanford-backed startup convert dense research into a simple founder-led narrative.",
    insight:
      "Used a question-led cold open, then mapped the answer to the audience's pain in the first swipe to spike retention.",
    highlighted: true,
  },
  {
    slug: "nvidia-design-sprint",
    title: "NVIDIA Design Sprint",
    platform: "instagram",
    instagramUrl: INSTAGRAM_REEL_URL,
    views: 141500,
    likes: 8600,
    shares: 1520,
    summary:
      "A behind-the-scenes look at how we choreographed a week-long sprint for NVIDIA's developer showcase.",
    insight:
      "Cut B-roll every 1.4 seconds and overlaid subtitles tuned for mobile to keep completion rates above 32%.",
    highlighted: true,
  },
  {
    slug: "founder-flywheel-breakdown",
    title: "Founder Flywheel Breakdown",
    platform: "instagram",
    instagramUrl: INSTAGRAM_REEL_URL,
    views: 129000,
    likes: 7300,
    shares: 1180,
    summary:
      "A compact explainer on how Prism installs the top-of-funnel content flywheel for local brands.",
    insight:
      "Stacked a three-part visual framework with animated overlays to get saves up 47% week-over-week.",
  },
]
