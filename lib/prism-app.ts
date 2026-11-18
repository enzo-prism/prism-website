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
 * Marketing calls inquiries captured through website forms "website leads".
 * The app labels the count "Forms Submitted"; "Ask Prism" reaches a person and sends nothing on its own;
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

// Keep the download instructions and softwareVersion on the public release.
// Source: prism-platform/apps/ios/AppStore/version/<version>/en-US.json.
export const PRISM_APP_RELEASES = [
  {
    version: '1.5',
    status: 'Available on the App Store',
    date: '2026-11-13',
    title: 'see what changed this month.',
    changes: [
      'Your summary puts website leads alongside visits and search activity, with a link to your latest monthly report.',
      'Share the full report as a PDF or text, including what Prism shipped and the next step you agreed on.',
    ],
  },
  {
    version: '1.6',
    status: 'Submitted to Apple',
    date: '2026-11-18',
    title: 'get started before your site is connected.',
    changes: [
      'Create an account with your preferred email, Apple or Google. You can leave and come back to check your connection.',
      'When your sites are ready, one opens straight to your summary. If you have several, choose which to open first.',
      'If you delete your Prism account, you can disconnect your Apple sign-in at the same time.',
    ],
  },
] as const

export const PRISM_APP_DESCRIPTION =
  'Track leads from website forms with Prism Grow for iPhone. See which forms bring in inquiries, get alerts, and share a monthly report with your team.'

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
  /** One plain-language takeaway supported by the demo screen. */
  takeaway: string
}

export const PRISM_APP_TOUR: readonly PrismAppTourStep[] = [
  {
    id: 'forms',
    label: 'Leads',
    title: 'see which forms bring in leads.',
    body: 'See how many inquiries came through each website form, from contact requests to appointment requests. In the app, look for Forms Submitted.',
    takeaway: 'Your latest form came in 2 hours ago.',
  },
  {
    id: 'updates',
    label: 'Updates',
    title: 'know when an inquiry arrives.',
    body: 'A new form alert tells you which website and form received an inquiry. Open your usual inbox to follow up.',
    takeaway: 'Bayview Dental received an appointment request.',
  },
  {
    id: 'report',
    label: 'Report',
    title: 'a monthly report you can share.',
    body: 'Compare this month’s inquiries with last month’s, see the work Prism shipped, and share the report as a PDF or text.',
    takeaway: 'October brought in 32 website leads, up 19% from September.',
  },
  {
    id: 'summary',
    label: 'Summary',
    title: 'the whole picture in one screen.',
    body: 'See how many website leads came in over the last 28 days, alongside visits and traffic from Google and AI assistants.',
    takeaway: '30 website leads in the last 28 days.',
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
    title: 'see visits from AI answers.',
    body: 'Visits from assistants like ChatGPT and Perplexity.',
    takeaway: '17 visits came from ChatGPT and 6 from Perplexity.',
  },
] as const

/** Fictional Bayview Dental totals from the November 11 iOS demo. */
export const DEMO_LEADS = {
  daily: [0, 0, 2, 3, 0, 1, 2, 0, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 3, 0, 0, 0, 3, 0, 1, 2, 3],
  byForm: [
    { name: 'Appointment request', count: 21 },
    { name: 'Contact message', count: 9 },
  ],
  firstDay: '2026-10-15T00:00:00Z',
  period: 'Oct 15 – Nov 11',
  october: { count: 32, previous: 27, change: '19%' },
} as const

export const DEMO_LEAD_TOTAL = DEMO_LEADS.daily.reduce<number>((sum, count) => sum + count, 0)

export const PRISM_APP_TRUST = [
  {
    title: 'read-only access.',
    body: 'Prism reads your Google data and never changes it.',
  },
  {
    title: 'private messages.',
    body: 'Prism counts inquiries. What someone wrote stays in the tool that receives your forms.',
  },
  {
    title: 'ad-free reporting.',
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
  body: 'We build your website and connect its forms to Prism Grow so you can see the inquiries it brings in. The app is included for Prism clients.',
} as const

export const PRISM_APP_FAQ = [
  {
    question: 'What counts as a website lead?',
    answer: 'Each submission to a tracked website form counts as one lead. Two inquiries from the same person count twice. An appointment request counts when someone sends the form. Your team confirms the booking separately.',
  },
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
      'Compare website leads, visits and Google search activity with the previous month. You can also see visits from AI assistants. It explains what changed, lists what Prism shipped, and includes the next step we agreed on when there is one. Share it as a PDF or as text.',
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
      'Visits come from Google Analytics and update about every hour. Google search clicks come from Google Search Console, which finalizes each day’s numbers a few days later. Lead counts come from your connected website forms.',
  },
  {
    question: 'How many notifications will I get?',
    answer:
      'A few a week at most: wins such as a new Google ranking or a record week, new leads from your website forms, a Monday summary, and a note when your monthly report is ready. None are sent overnight, and you choose which ones you get under Account › Notifications.',
  },
  {
    question: 'Can I read a lead’s message in the app?',
    answer:
      'Prism Grow shows when an inquiry arrived and which form it came through. Prism Grow never stores what people wrote. Follow up in the inbox or tool connected to your form.',
  },
] as const
