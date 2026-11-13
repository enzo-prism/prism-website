/**
 * Facts and copy for /app, the page for Prism Grow, Prism's iPhone app.
 *
 * Every fact here comes from the App Store listing or the app itself
 * (prism-platform: apps/ios, version 1.5). Screens are drawn in HTML from
 * captures of the app's built-in demo (components/prism-app/AppScreens.tsx),
 * whose practice, Bayview Dental, is fictional. Never swap in a real client's
 * numbers or draw a feature the app does not have. Page copy stays short on
 * purpose; detail belongs in the FAQ.
 *
 * The app's wording is careful and the page keeps it: "forms submitted", not
 * leads or bookings; "Ask Prism" reaches a person and sends nothing on its own;
 * teammates can view but not change anything.
 */

export const PRISM_APP_ID = '6829975700'

export const PRISM_APP_STORE_URL =
  'https://apps.apple.com/us/app/prism-grow/id6829975700'

/**
 * What the QR code on /app encodes. It is a route on this site, not the App
 * Store URL, so a scan can be counted before the phone is sent on
 * (app/app/get/route.ts). Regenerate public/prism-app/app-store-qr.svg if
 * this ever changes.
 */
export const PRISM_APP_QR_URL = 'https://www.design-prism.com/app/get'

/** The App Store name since version 1.5 (November 2026). */
export const PRISM_APP_NAME = 'Prism Grow'

/** What the icon is called on the Home Screen. The app was "Prism" before 1.5. */
export const PRISM_APP_HOME_SCREEN_NAME = 'Prism'

export const PRISM_APP_VERSION = '1.5'

export const PRISM_APP_DESCRIPTION =
  'Prism Grow is the free iPhone app for Prism clients: website visits, forms, Google searches, AI visits, and a monthly report to share.'

export type PrismAppScreenId =
  | 'summary'
  | 'report'
  | 'forms'
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
    title: 'the whole picture in one screen.',
    body: 'A one-line takeaway, then forms, visits, Google, and AI over the last 28 days.',
    takeaway: 'Visits are up 15% over the last 28 days.',
  },
  {
    id: 'report',
    label: 'Report',
    title: 'a monthly report you can share.',
    body: 'Each finished month against the one before, what changed, and what Prism shipped. Share it as a PDF.',
    takeaway: 'October had 5,301 visits, up 9% from September.',
  },
  {
    id: 'forms',
    label: 'Forms',
    title: 'see when people reach out.',
    body: 'Every form submitted through your site, by type. What people wrote is never stored.',
    takeaway: 'Your latest form came in 2 hours ago.',
  },
  {
    id: 'search',
    label: 'Google',
    title: 'see what people search to find you.',
    body: 'Clicks, times shown, average position, and top searches.',
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
    body: 'New forms, Google rankings, record weeks, and the work Prism ships.',
    takeaway: '64 people on your site, about 3× your usual.',
  },
] as const

/**
 * Lock Screen notifications in the hero, oldest arrival first, shortened from
 * the app's notification copy (prism-platform: packages/alerts/src/copy.ts)
 * with the demo's numbers. The last one lands on top.
 */
export const PRISM_APP_NOTIFICATIONS = [
  {
    title: 'On Google’s first page',
    body: 'Now #7 for “emergency dentist.”',
    time: '1d ago',
  },
  {
    title: 'New form submission',
    body: 'A form came in: Appointment request.',
    time: '1h ago',
  },
  {
    title: 'Your October report is ready',
    body: '5,301 visits (up 9%), 32 forms submitted.',
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
    body: 'Remove your account from inside the app. Your website isn’t affected.',
  },
] as const

export const PRISM_APP_STEPS = [
  {
    title: 'download Prism Grow.',
    body: 'Free on the App Store. On your Home Screen it’s called Prism.',
  },
  {
    title: 'sign in with your invited email.',
    body: 'We email you a 6-digit code, so there’s no password. Google and Apple work too.',
  },
] as const

/** Not a step: the way in for anyone without an invite. */
export const PRISM_APP_DEMO_BRANCH = {
  title: 'no invite yet? explore the demo.',
  body: 'Tap Other Ways to Get Started, then Explore a Demo. No account needed.',
} as const

/** The band for visitors who are not clients. Facts only: free, for clients. */
export const PRISM_APP_PROSPECT = {
  eyebrow: 'Not a client yet',
  title: 'every Prism client gets this.',
  body: 'Prism Grow is free for Prism clients. Join the waitlist to work with us.',
} as const

export const PRISM_APP_FAQ = [
  {
    question: 'Who is Prism Grow for?',
    answer:
      'Prism Grow is for Prism clients, so they can see how their website is doing. Anyone can download it and explore the demo without an account.',
  },
  {
    question: 'Is Prism Grow the same as the Prism app?',
    answer:
      'Yes. The Prism app was renamed Prism Grow in version 1.5, in November 2026. Your account and numbers carry over, and the icon on your Home Screen is still labeled Prism.',
  },
  {
    question: 'Is the app free?',
    answer: 'Yes. Prism Grow is free on the App Store.',
  },
  {
    question: 'How do I get access to my own numbers?',
    answer:
      'Prism sends you an invitation. Open it on your iPhone to see your business and websites, then tap Continue with Email and enter the 6-digit code we send. Google and Apple work too, and you can type an invitation code under Other Ways to Get Started.',
  },
  {
    question: 'What’s in the monthly report?',
    answer:
      'Each finished calendar month compared with the month before: visits, forms submitted, Google clicks and times shown, and visits from AI assistants. It explains what changed, lists what Prism shipped, and includes the next step we agreed on when there is one. Share it as a PDF or as text.',
  },
  {
    question: 'Can my team see our numbers?',
    answer:
      'Yes. Business owners can invite teammates from Account › Your Team. Teammates can view the numbers but can’t change anything or invite others.',
  },
  {
    question: 'How do I reach Prism from the app?',
    answer:
      'Tap Ask Prism on your Summary or in a report. It shows the topic and website first, and nothing is sent until you choose to text, call, or email us.',
  },
  {
    question: 'Which devices does it work on?',
    answer:
      'Prism Grow is built for iPhone and needs iOS 18 or later. Pin a website to a Home Screen or Lock Screen widget, or ask Siri to open your latest report. It is available on the United States App Store.',
  },
  {
    question: 'Where do the numbers come from?',
    answer:
      'Visits come from Google Analytics and update about every hour. Google search clicks come from Google Search Console, which finalizes each day’s numbers a few days later. Forms are submissions made through your website.',
  },
  {
    question: 'How many notifications will I get?',
    answer:
      'A few a week at most: wins such as a new Google ranking or a record week, new form submissions, a Monday summary, and a note when your monthly report is ready. None are sent overnight, and you choose which ones you get under Account › Notifications.',
  },
  {
    question: 'Does the app store what people write in my forms?',
    answer:
      'No. Prism Grow counts the forms people submit through your website and never stores what they wrote. A submitted form isn’t a confirmed booking or a qualified lead.',
  },
] as const
