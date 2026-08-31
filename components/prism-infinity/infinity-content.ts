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
    body: 'Add the work the business actually needs: a landing page, an ad set, a website pass, a photoshoot. The queue is yours and it never caps.',
    iconSrc: '/pixelish/kanban.svg',
  },
  {
    label: 'We ship it',
    body: 'Prism works one request at a time and most land in a few days. Larger work is broken into milestones so you always see movement.',
    iconSrc: '/pixelish/checkmark.svg',
  },
  {
    label: 'The next one starts',
    body: 'The moment one request ships, the next in your queue begins. Keep the board full, or pause when the calendar is full.',
    iconSrc: '/pixelish/arrow-refresh.svg',
  },
] as const

export const DELIVERABLES = [
  {
    title: 'Landing pages that convert',
    body: 'Offer pages, campaign pages, and booking flows built to turn attention into customers.',
    iconSrc: '/pixelish/browser.svg',
  },
  {
    title: 'Ad creative that gets customers',
    body: 'Variations for Meta, Google, and YouTube, built to test, scale, and convert.',
    iconSrc: '/pixelish/graph-chart-high.svg',
  },
  {
    title: 'Websites that rank and convert',
    body: 'New sites, redesigns, and conversion passes structured for Google and AI search.',
    iconSrc: '/pixelish/house.svg',
  },
  {
    title: 'Video that sells',
    body: 'Short-form, ads, and long-form cuts edited to your offer and story.',
    iconSrc: '/pixelish/media-play.svg',
  },
  {
    title: 'Photoshoots you own',
    body: 'On-location libraries of owned, on-brand imagery for the site, ads, and social.',
    iconSrc: '/pixelish/device-camera.svg',
  },
  {
    title: 'Content that compounds',
    body: 'Posts, pages, and creative that keep the brand visible after the campaign ends.',
    iconSrc: '/pixelish/document-letter.svg',
  },
] as const

export const ALSO_INCLUDED = {
  title: 'Brand systems, decks, print, and whatever Prism adds next',
  body: 'Identity work, sales decks, and in-room collateral still count as requests. As Prism grows, new services join the plan at no extra cost.',
} as const

export const OWNER_REASONS = [
  {
    title: 'One team instead of five vendors',
    body: 'Website, ads, content, video, and photography already know the same brand. You stop briefing a new freelancer for every project.',
  },
  {
    title: 'One flat monthly rate',
    body: 'No scope creep, no surprise invoices, no hourly billing. The queue can grow without the contract changing.',
  },
  {
    title: 'Work in days, not quarters',
    body: 'Most requests land in a few days, one at a time, so quality holds and the business keeps moving.',
  },
  {
    title: 'Pause when the calendar is full',
    body: 'No lock-in. Pause between bursts and keep unused days, or cancel outright. No penalties.',
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
      'Most requests are delivered in a few days. Larger requests are broken into clear milestones so you always see momentum while we work through your queue one item at a time.',
  },
  {
    question: 'How many active requests can I have?',
    answer:
      'Add as many requests as you like to your queue. Prism works on one active request at a time and starts the next the moment one is delivered, so the queue keeps moving without ever capping how much you submit.',
  },
  {
    question: 'Can I really pause or cancel anytime?',
    answer:
      'Yes. Pause your plan when work slows and keep your unused days for when you return, or cancel outright. There are no contracts and no penalties.',
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
