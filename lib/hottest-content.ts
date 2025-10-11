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

export const HOTTEST_CONTENT: HottestContentItem[] = [
  {
    slug: "youtube-shorts-growth-engine",
    title: "From Zero to 1M Views",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/DPPTqrWEvGi/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 310000,
    likes: 15800,
    shares: 4200,
    summary:
      "We turned a sleepy shorts channel into a traffic flywheel by anchoring the script around a retention spike.",
    insight:
      "Hooked the scroll with a micro-case-study opener, used kinetic captions at 130% speed, and ended on a cliffhanger CTA.",
    highlighted: true,
  },
  {
    slug: "dental-offer-breakdown",
    title: "Dental Offer That Converted 31%",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C7CD7TArrBt/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 184000,
    likes: 9400,
    shares: 2600,
    summary:
      "We unpacked the exact landing page and follow-up flow that booked out a local dental practice in 6 weeks.",
    insight:
      "Led with the irresistible offer in text first frame, then layered proof clips to keep watch time steady through the CTA.",
    highlighted: true,
  },
  {
    slug: "content-system-pillars",
    title: "Three Pillars of Viral Content",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C3_GOWJyFHB/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 205000,
    likes: 11200,
    shares: 3100,
    summary:
      "We shared the production checklist Prism uses to help founders turn one filming day into a month of distribution.",
    insight:
      "Broke the clip into pillar-by-pillar chapters, adding quick transitions so retention never dipped below 60%.",
    highlighted: true,
  },
  {
    slug: "viral-reel-hormozi-hook",
    title: "How We Flipped Hormozi's Hook",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 182000,
    likes: 12400,
    shares: 2100,
    summary:
      "We repackaged a founder success story into a 19-second punchline that delivered instant credibility.",
    insight:
      "Led with social proof in the opening 2 seconds, then layered a rapid-fire carousel of proof points to keep average watch time above 15 seconds.",
  },
  {
    slug: "stanford-storytelling-framework",
    title: "Stanford Storytelling Framework",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 156000,
    likes: 9800,
    shares: 1750,
    summary:
      "We helped a Stanford-backed startup convert dense research into a simple founder-led narrative.",
    insight:
      "Used a question-led cold open, then mapped the answer to the audience's pain in the first swipe to spike retention.",
  },
  {
    slug: "nvidia-design-sprint",
    title: "NVIDIA Design Sprint",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 141500,
    likes: 8600,
    shares: 1520,
    summary:
      "A behind-the-scenes look at how we choreographed a week-long sprint for NVIDIA's developer showcase.",
    insight:
      "Cut B-roll every 1.4 seconds and overlaid subtitles tuned for mobile to keep completion rates above 32%.",
  },
  {
    slug: "founder-flywheel-breakdown",
    title: "Founder Flywheel Breakdown",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 129000,
    likes: 7300,
    shares: 1180,
    summary:
      "A compact explainer on how Prism installs the top-of-funnel content flywheel for local brands.",
    insight:
      "Stacked a three-part visual framework with animated overlays to get saves up 47% week-over-week.",
  },
]
