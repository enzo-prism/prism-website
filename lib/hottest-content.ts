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
    slug: "content-calibration-framework",
    title: "Content Calibration Framework",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C8ulpLrvSCl/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    views: 228000,
    likes: 11900,
    shares: 2980,
    summary:
      "We showed how Prism calibrates creative in real time—analyzing audience comments, edits, and retention to keep reach compounding.",
    insight:
      "Broke the process into three rapid beats with overlays pulled straight from the analytics dashboard so viewers saw exactly how tweaks drive the next viral clip.",
  },
  {
    slug: "ai-website-revamp",
    title: "Turn AI Concepts Into Revenue",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C3lchBGPTvX/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 264000,
    likes: 13900,
    shares: 3150,
    summary:
      "We walked through the exact AI-powered workflow Prism uses to relaunch a tired website into a lead magnet.",
    insight:
      "Led with a bold before-and-after split screen, then layered UI close-ups paced at 1.2x speed so viewers could pause on every proof point.",
    highlighted: true,
  },
  {
    slug: "brand-story-framework",
    title: "Brand Story Framework",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C3iOxkML_Sv/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 208000,
    likes: 10100,
    shares: 2740,
    summary:
      "We broke down the story spine that gets local founders remembered and referred after a single reel.",
    insight:
      "Hooked with an emotional cold open, mapped the three-act beat sheet visually, and closed with a copy snippet people could steal.",
    highlighted: true,
  },
  {
    slug: "micro-offer-hack",
    title: "Micro-Offer Hack",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C450Etixg4O/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 191000,
    likes: 9800,
    shares: 2410,
    summary:
      "We shared the $97 diagnostic funnel Prism deploys to turn browsers into booked consults in 72 hours.",
    insight:
      "Showed the funnel map first frame, zoomed into each step with captions, and added swipe-up proof to spike saves.",
    highlighted: true,
  },
  {
    slug: "viral-visual-hooks",
    title: "Viral Visual Hooks",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C8K67eQyhG5/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 236000,
    likes: 12500,
    shares: 2890,
    summary:
      "We demoed the motion design templates that help Prism clients stop thumbs within the first second.",
    insight:
      "Combined kinetic type with contrast overlays and added a side-by-side of raw vs. polished footage to make the impact obvious.",
    highlighted: true,
  },
  {
    slug: "google-reviews-loop",
    title: "Google Reviews Loop",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C6PGN29vpkr/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 177000,
    likes: 8900,
    shares: 2230,
    summary:
      "We unpacked the DM plus SMS strategy that pushed a service client from 24 to 400+ Google reviews.",
    insight:
      "Animated the message flow, surfaced real screenshots, and highlighted the automation steps with glowing callouts.",
    highlighted: true,
  },
  {
    slug: "community-content-engine",
    title: "Community Content Engine",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C5r4dAPLBMc/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 214000,
    likes: 11300,
    shares: 2660,
    summary:
      "We revealed how Prism turns Q&A from fan communities into a month of authority content in a weekend.",
    insight:
      "Showed the Trello-to-CapCut pipeline on screen, then overlaid retention stats to prove the format works.",
    highlighted: true,
  },
  {
    slug: "instagram-growth-playbook",
    title: "Instagram Growth Playbook",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/DFNzRiBpBsb/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 298000,
    likes: 15400,
    shares: 3500,
    summary:
      "We broke down the 5-part content machine Prism installs to keep reels trending every single week.",
    insight:
      "Opened with a moving headline overlay, layered in quick-cut testimonials, and ended with a replay-worthy checklist CTA.",
    highlighted: true,
  },
  {
    slug: "scripts-that-sell",
    title: "Scripts That Sell",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C5D6ZqvrO3v/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 221000,
    likes: 11800,
    shares: 2800,
    summary:
      "We revealed the scripting pattern that converts cold viewers into booked calls in under 45 seconds.",
    insight:
      "Front-loaded a pain-point hook, used curiosity gaps to keep attention, and inserted proof before the pitch.",
    highlighted: true,
  },
  {
    slug: "distribution-flywheel",
    title: "Distribution Flywheel",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C38kqAuyYPP/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 244000,
    likes: 13500,
    shares: 2970,
    summary:
      "We mapped how Prism repurposes a single founder interview into a multi-platform distribution engine.",
    insight:
      "Used motion graphics to visualize the loop, keeping watch rate high while the voiceover delivered the framework.",
    highlighted: true,
  },
  {
    slug: "local-service-reel",
    title: "Local Service Reel Blueprint",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C72aLmGyS8m/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 206000,
    likes: 9900,
    shares: 2550,
    summary:
      "We showcased the before-and-after playbook that helped a local service provider dominate their zip code.",
    insight:
      "Combined split-screen results with bold typography to make the payoff unmistakable in the first five seconds.",
    highlighted: true,
  },
  {
    slug: "hook-testing-system",
    title: "Hook Testing System",
    platform: "instagram",
    instagramUrl:
      "https://www.instagram.com/reel/C-L_cE0yy_R/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    views: 233000,
    likes: 12700,
    shares: 3020,
    summary:
      "We detailed the testing circuit Prism uses to rank hook variations before they ever hit the feed.",
    insight:
      "Flashed the data dashboard every 3 seconds to build credibility while the narration unpacked the workflow.",
    highlighted: true,
  },
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
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
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
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
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
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
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
      "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    views: 129000,
    likes: 7300,
    shares: 1180,
    summary:
      "A compact explainer on how Prism installs the top-of-funnel content flywheel for local brands.",
    insight:
      "Stacked a three-part visual framework with animated overlays to get saves up 47% week-over-week.",
  },
]
