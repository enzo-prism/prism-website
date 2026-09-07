export const CANONICAL_URL = 'https://www.design-prism.com/prism-infinity'

export const ROTATING_WORDS = [
  'landing pages',
  'ad creative',
  'websites',
  'photoshoots',
  'video ads',
] as const

export const HERO_FACTS = [
  'Request what the business needs',
  'Delivered one at a time',
  'Pause or cancel anytime',
] as const

export const MARQUEE_ITEMS = [
  'Landing pages',
  'Ad creative',
  'Websites',
  'Photoshoots',
  'Video ads',
  'SEO pages',
  'Booking flows',
  'Brand systems',
] as const

export const HOW_IT_WORKS = [
  {
    label: 'Name the need',
    body: 'Add a landing page, ad creative, website update, or photoshoot to your queue. Put the most important request first.',
    iconSrc: '/pixelish/kanban.svg',
  },
  {
    label: 'We ship it',
    body: 'We confirm the brief and work on one request at a time. Larger projects have milestones so you can review progress along the way.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    label: 'The next one starts',
    body: 'Review the work with us, then move to the next priority. Reorder the queue as your business needs change.',
    iconSrc: '/pixelish/arrow-refresh.svg',
  },
] as const

export const DELIVERABLES = [
  {
    title: 'Landing pages for your offers',
    body: 'Offer pages, campaign pages, and booking flows built to turn attention into customers.',
    iconSrc: '/pixelish/browser.svg',
  },
  {
    title: 'Ad creative to test',
    body: 'Images, copy, and video variations for your campaigns on Meta, Google, and YouTube.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'New websites and site updates',
    body: 'New sites, redesigns, service pages, and contact flows with clear copy and search foundations.',
    iconSrc: '/pixelish/house.svg',
  },
  {
    title: 'Video edits for your story',
    body: 'Short-form, ads, and long-form cuts edited to your offer and story.',
    iconSrc: '/pixelish/media-play.svg',
  },
  {
    title: 'Photoshoots you own',
    body: 'Team, location, and product photography for your website, ads, and social posts. We agree on the shoot brief and logistics first.',
    iconSrc: '/pixelish/device-camera.svg',
  },
  {
    title: 'Content for your channels',
    body: 'Posts, pages, and creative that keep the brand visible after the campaign ends.',
    iconSrc: '/pixelish/document-letter.svg',
  },
] as const

export const ALSO_INCLUDED = {
  title: 'Brand design, decks, and print',
  body: 'Request brand guidelines, sales presentations, business cards, and other print layouts alongside your website and content work.',
} as const

export const OWNER_REASONS = [
  {
    title: 'One team instead of five vendors',
    body: 'Website, ads, content, video, and photography already know the same brand. You stop briefing a new freelancer for every project.',
  },
  {
    title: 'One flat monthly rate',
    body: 'Agree on the monthly plan and included work before starting. Ad spend, software, and separately scoped work stay clearly identified.',
  },
  {
    title: 'Know what is being worked on',
    body: 'One active request makes the priority clear. Larger projects are divided into milestones you can review.',
  },
  {
    title: 'Pause when the calendar is full',
    body: 'Pause or cancel when your needs change. We explain the billing and pause terms when scoping your plan.',
  },
] as const

export const QUEUE_BOARD = {
  delivered: 'Booking landing page',
  active: 'Homepage conversion pass',
  queued: ['Meta ads (6 variations)', 'Location photoshoot'],
} as const

export const FAQ_ITEMS = [
  {
    question: 'What counts as a request?',
    answer:
      'A request is one focused deliverable the business can use: a landing page, an ad set, a website pass, a photoshoot, a video edit. Brand systems, decks, and print count too. If Prism makes it, it can be a request.',
  },
  {
    question: 'How fast is turnaround?',
    answer:
      'Timing depends on the request, source material, and feedback. We confirm the brief and timing before starting, and split larger projects into reviewable milestones.',
  },
  {
    question: 'How many active requests can I have?',
    answer:
      'Add as many requests as you like to your queue. We work on one active request at a time, then move to the next priority after review. Unlimited requests does not mean unlimited work delivered at once.',
  },
  {
    question: 'Can I really pause or cancel anytime?',
    answer:
      'Yes. You can pause or cancel the plan. We explain how the change affects billing and any active request before you start the subscription.',
  },
  {
    question: 'What is out of scope?',
    answer:
      'Prism Infinity covers the production work: landing pages, websites, video, content, ads, photoshoots, and brand. It does not include paid ad spend, third-party software or licensing fees, or large custom software builds. We flag those up front and scope them separately.',
  },
  {
    question: 'How much does Prism Infinity cost?',
    answer:
      'One flat monthly subscription, scoped to your business. Book a 30-minute Zoom call and we will size the plan together. You leave the call knowing exactly what it costs and what you get.',
  },
] as const
