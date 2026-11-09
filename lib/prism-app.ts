/**
 * Facts and copy for /app, the page for the Prism iPhone app.
 *
 * Every fact here comes from the App Store listing or the app itself
 * (prism-platform: apps/ios). Screens are real captures of the app's built-in
 * demo, whose practice, Bayview Dental, is fictional. Never swap in a real
 * client's numbers. Page copy stays short on purpose; detail belongs in the FAQ.
 */

export const PRISM_APP_ID = '6829975700'

export const PRISM_APP_STORE_URL =
  'https://apps.apple.com/us/app/prism-by-design-prism/id6829975700'

export const PRISM_APP_NAME = 'Prism by Design Prism'

export const PRISM_APP_DESCRIPTION =
  'See your website’s visits, leads, Google searches, and AI referrals in the Prism iPhone app for Prism clients. Free on the App Store.'

export type PrismAppTourStep = {
  id: string
  label: string
  title: string
  body: string
  image: string
  alt: string
}

export const PRISM_APP_TOUR: readonly PrismAppTourStep[] = [
  {
    id: 'summary',
    label: 'Summary',
    title: 'one screen for the whole picture.',
    body: 'Who’s on your site now, plus leads, visits, and searches.',
    image: '/prism-app/summary.jpg',
    alt: 'Prism app Summary screen showing people on the site now, a Google first page highlight, and cards for leads, visits, and Google Search.',
  },
  {
    id: 'leads',
    label: 'Leads',
    title: 'see when people reach out.',
    body: 'Every form sent through your site, counted.',
    image: '/prism-app/leads.jpg',
    alt: 'Prism app Leads screen with a bar chart of forms over the last month and totals by form.',
  },
  {
    id: 'visits',
    label: 'Visits',
    title: 'see where visits come from.',
    body: 'Day by day, and by channel.',
    image: '/prism-app/visits.jpg',
    alt: 'Prism app Visits screen with a daily chart of visits and details below it.',
  },
  {
    id: 'search',
    label: 'Google Search',
    title: 'see what people search to find you.',
    body: 'Clicks, average position, and top searches.',
    image: '/prism-app/search.jpg',
    alt: 'Prism app Google Search screen with a chart of clicks and totals for clicks, times shown on Google, and average position.',
  },
  {
    id: 'ai',
    label: 'AI Assistants',
    title: 'see who arrives from AI answers.',
    body: 'Visits from assistants like ChatGPT and Perplexity.',
    image: '/prism-app/ai.jpg',
    alt: 'Prism app AI Assistants screen showing total visits and a count for ChatGPT and Perplexity.',
  },
  {
    id: 'updates',
    label: 'Updates',
    title: 'hear when something good happens.',
    body: 'Traffic spikes, new rankings, and your best weeks.',
    image: '/prism-app/updates.jpg',
    alt: 'Prism app Updates feed with a traffic spike, a Google first page ranking, a new page from Prism, and a best week note.',
  },
] as const

export const PRISM_APP_TRUST = [
  {
    title: 'read-only access.',
    body: 'Prism reads your Google data and never changes it.',
  },
  {
    title: 'totals, not people.',
    body: 'Nothing identifies who visited your site.',
  },
  {
    title: 'no ads or tracking.',
    body: 'We don’t sell or share your information.',
  },
  {
    title: 'delete it anytime.',
    body: 'Remove your account from inside the app.',
  },
] as const

export const PRISM_APP_STEPS = [
  {
    title: 'download Prism.',
    body: 'Free on the App Store.',
  },
  {
    title: 'sign in with your invited email.',
    body: 'Use Google or Apple.',
  },
  {
    title: 'or explore the demo.',
    body: 'No account needed.',
  },
] as const

export const PRISM_APP_FAQ = [
  {
    question: 'Who is the Prism app for?',
    answer:
      'Prism is for Prism clients, so they can see how their website is doing. Anyone can download it and tap Explore a Demo to look around.',
  },
  {
    question: 'Is the app free?',
    answer: 'Yes. Prism is free to download on the App Store.',
  },
  {
    question: 'How do I get access to my own numbers?',
    answer:
      'Ask Prism to invite you, then open the app and choose Continue with Google using the email address we invited. If you use Sign in with Apple, open the invite link we send you first.',
  },
  {
    question: 'Which devices does it work on?',
    answer:
      'Prism is built for iPhone and requires iOS 18 or later. It is available on the United States App Store.',
  },
  {
    question: 'Where do the numbers come from?',
    answer:
      'Visits come from Google Analytics and update about every hour. Google search clicks come from Google Search Console, which reports each day’s numbers a few days later.',
  },
  {
    question: 'How many notifications will I get?',
    answer:
      'A few a week at most: traffic spikes, new Google rankings, record weeks, and a Monday summary. None are sent overnight, and you can turn them off in iPhone Settings.',
  },
  {
    question: 'Does the app store what people write in my forms?',
    answer:
      'No. Prism counts the forms people send through your website and never stores what they wrote.',
  },
] as const
