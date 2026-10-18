/*
 * Copy for the bespoke Mach 1 case study (/case-studies/mach-1). Follows the
 * prism-writing skill: lowercase headlines ending in a period, no em dashes,
 * no hype words, no guarantees. Every fact here is either public on
 * mach1ai.com or a dated record of work Prism delivered; the tool scenes are
 * illustrations, never captures of the private tools or their data.
 */

export const MACH1_SITE_FACTS_DATE = 'October 18, 2026'

export const MACH1_LAUNCH = {
  eyebrow: 'The website',
  title: 'a launch led by customers.',
  description:
    'On mach1ai.com, results are told in customers’ own words or sourced reports. The design stays calm and gets out of the way, so the people who use Mach 1 do the talking.',
  facts: [
    { value: '5', label: 'customer stories, each with a captioned film' },
    { value: '4', label: 'team pages: support, sales, success, operations' },
    { value: '36', label: 'pages in its sitemap, from home to the legal pages' },
  ],
  factsNote: `Counted on mach1ai.com and its sitemap, ${MACH1_SITE_FACTS_DATE}.`,
  pages: [
    {
      key: 'customers',
      src: '/case-studies/mach-1/customers-desktop.jpg',
      path: 'mach1ai.com/customers',
      title: 'customers first.',
      body: 'Every story starts with the team that lived it: the problem, what changed, and a film in their own words.',
    },
    {
      key: 'tower',
      src: '/case-studies/mach-1/tower-desktop.jpg',
      path: 'mach1ai.com/tower',
      title: 'shown, not described.',
      body: 'Tower, the assistant that builds workflows, is explained with an illustrated session instead of a feature list.',
    },
    {
      key: 'implementation',
      src: '/case-studies/mach-1/implementation-desktop.jpg',
      path: 'mach1ai.com/implementation',
      title: 'how the work happens.',
      body: 'From the first messy problem to a workflow in production, step by step, with the people who do it.',
    },
    {
      key: 'aeo',
      src: '/case-studies/mach-1/aeo-report-desktop.jpg',
      path: 'mach1ai.com/aeo-report',
      title: 'a reason to reach out.',
      body: 'A free AEO report shows how AI answer engines describe a company, before anyone is ready for a sales call.',
    },
  ],
} as const

export type Mach1Tool = {
  key: 'content' | 'vault' | 'review' | 'plan'
  name: string
  title: string
  body: string
  points: readonly string[]
  /** Spoken summary of the illustration. */
  sceneLabel: string
  /** A dated delivery fact, when one exists. */
  fact?: { value: string; label: string }
}

export const MACH1_STACK = {
  eyebrow: 'Behind the site',
  title: 'the tools behind the launch.',
  description:
    'A website is one piece. Mach 1’s growth team works in private tools Prism built around how they already work. They hold real customer data, so instead of screenshots, here is how each one works.',
  note: 'Illustrations drawn for this page. No real data, customers, or results from these tools are shown.',
  tools: [
    {
      key: 'content',
      name: 'Content engine',
      title: 'one calendar for every channel.',
      body: 'Posts from the company page and the team’s own profiles land on one calendar across LinkedIn, X, YouTube, and TikTok. Every post is compared with what is typical for that account, so the team can see what worked.',
      points: [
        'Analytics for each channel, the website included',
        'Plans written in the app, not a spreadsheet',
        'Every post linked to its source file',
      ],
      sceneLabel:
        'Illustration: a two-week content calendar fills with posts from four channels, and one post’s views rise above its typical range.',
    },
    {
      key: 'vault',
      name: 'Interview vault',
      title: 'every transcript, checked three ways.',
      body: 'Customer interviews are the proof behind the site. Prism transcribed Mach 1’s video library with three independent speech engines checked against each other, then built a private, password-protected vault where the team finds interviews and tracks approvals.',
      points: [
        'Product and customer names checked against a glossary',
        'Captions and transcripts for every publishable clip',
        'Approvals tracked before a clip goes public',
      ],
      sceneLabel:
        'Illustration: three speech engines transcribe the same line, one mishears a word, and the agreed transcript is saved to a locked vault.',
      fact: { value: '334', label: 'videos transcribed and checked, July 2026' },
    },
    {
      key: 'review',
      name: 'Campaign review',
      title: 'feedback pinned to the frame.',
      body: 'The team reviews every video ad in one room. Comments land on the exact second they are about, each ad gets a verdict, and the strategy, the buyer journey, and the landing pages sit right beside it.',
      points: [
        'Timestamped comments and a verdict per ad',
        'One link shares an ad in the right format',
        'Every comment and verdict can be exported',
      ],
      sceneLabel:
        'Illustration: a video ad plays while three comments pin to its timeline, then the ad is marked approved.',
    },
    {
      key: 'plan',
      name: 'Growth plan',
      title: 'from first view to first workflow.',
      body: 'A private plan site lays out who Mach 1 is trying to reach, on which channels, and the path from the first ad someone sees to a conversation with the team, with an estimate for each lead source.',
      points: [
        'Audiences and channels on one page',
        'Estimates for each lead source',
        'The buyer journey, stage by stage',
      ],
      sceneLabel:
        'Illustration: people move along a five-stage journey from seeing an ad to a first workflow, beside audience tags and lead-source estimate bars.',
    },
  ] satisfies Mach1Tool[],
} as const
