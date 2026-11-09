/**
 * Facts and copy for /app, the page for the Prism iPhone app.
 *
 * Every fact here comes from the App Store listing or the app itself
 * (prism-platform: apps/ios). Screens are drawn in HTML from captures of the
 * app's built-in demo (components/prism-app/AppScreens.tsx), whose practice,
 * Bayview Dental, is fictional. Never swap in a real client's numbers or draw
 * a feature the app does not have. Page copy stays short on purpose; detail
 * belongs in the FAQ.
 */

export const PRISM_APP_ID = '6829975700'

export const PRISM_APP_STORE_URL =
  'https://apps.apple.com/us/app/prism-by-design-prism/id6829975700'

export const PRISM_APP_NAME = 'Prism by Design Prism'

export const PRISM_APP_DESCRIPTION =
  'See your website’s visits, leads, Google searches, and AI referrals in the Prism iPhone app for Prism clients. Free on the App Store.'

export type PrismAppScreenId =
  | 'summary'
  | 'leads'
  | 'visits'
  | 'search'
  | 'ai'
  | 'updates'

export type PrismAppTourStep = {
  id: PrismAppScreenId
  label: string
  title: string
  body: string
  /** One plain sentence taken from that screen in the app's demo. */
  takeaway: string
}

export const PRISM_APP_TOUR: readonly PrismAppTourStep[] = [
  {
    id: 'summary',
    label: 'Summary',
    title: 'one screen for the whole picture.',
    body: 'Who’s on your site now, plus leads, visits, and searches.',
    takeaway: '14 people are on your site right now.',
  },
  {
    id: 'leads',
    label: 'Leads',
    title: 'see when people reach out.',
    body: 'Every form sent through your site, counted.',
    takeaway: 'Your latest form came in 2 hours ago.',
  },
  {
    id: 'visits',
    label: 'Visits',
    title: 'see where visits come from.',
    body: 'Day by day, and by channel.',
    takeaway: 'Your busiest day was Friday, November 6, with 212 visits.',
  },
  {
    id: 'search',
    label: 'Google',
    title: 'see what people search to find you.',
    body: 'Clicks, average position, and top searches.',
    takeaway: 'You’re on Google’s first page for “emergency dentist.”',
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'see who arrives from AI answers.',
    body: 'Visits from assistants like ChatGPT and Perplexity.',
    takeaway: '17 visits came from ChatGPT and 6 from Perplexity.',
  },
  {
    id: 'updates',
    label: 'Updates',
    title: 'hear when something good happens.',
    body: 'Traffic spikes, new rankings, and your best weeks.',
    takeaway: '64 people on your site, about 3× your usual.',
  },
] as const

/**
 * Lock Screen notifications in the hero, oldest arrival first, shortened from
 * the demo's Updates feed. The last one lands on top.
 */
export const PRISM_APP_NOTIFICATIONS = [
  {
    title: 'Your site is busy right now',
    body: '64 people now, about 3× usual.',
    time: '1h ago',
  },
  {
    title: 'On Google’s first page',
    body: 'Now #7 for “emergency dentist.”',
    time: '12m ago',
  },
  {
    title: 'New appointment request',
    body: 'A form just came in.',
    time: 'now',
  },
] as const

/** Said once on the page, under the hero. Every screen below uses the demo. */
export const PRISM_APP_DEMO_NOTE =
  'Demo data throughout. Bayview Dental is fictional.'

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
] as const

/** Not a step: the way in for anyone without an invite. */
export const PRISM_APP_DEMO_BRANCH = {
  title: 'no invite yet? explore the demo.',
  body: 'Tap Explore a Demo in the app. No account needed.',
} as const

/** The band for visitors who are not clients. Facts only: free, for clients. */
export const PRISM_APP_PROSPECT = {
  eyebrow: 'Not a client yet',
  title: 'every Prism client gets this.',
  body: 'The app is free for Prism clients. Join the waitlist to work with us.',
} as const

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
