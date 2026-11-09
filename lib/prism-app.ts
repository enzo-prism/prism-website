/**
 * Facts and copy for /app, the page for the Prism iPhone app.
 *
 * Every fact here comes from the App Store listing or the app itself
 * (prism-platform: apps/ios). Screens are real captures of the app's built-in
 * demo, whose practice, Bayview Dental, is fictional. Never swap in a real
 * client's numbers.
 */

export const PRISM_APP_ID = '6829975700'

export const PRISM_APP_STORE_URL =
  'https://apps.apple.com/us/app/prism-by-design-prism/id6829975700'

export const PRISM_APP_NAME = 'Prism by Design Prism'

export const PRISM_APP_DESCRIPTION =
  'See your website’s visits, leads, Google searches, and AI referrals in the Prism iPhone app for Prism clients. Free on the App Store.'

export const PRISM_APP_FACTS = [
  'Free',
  'iPhone, iOS 18 or later',
  'United States',
] as const

export type PrismAppTourStep = {
  id: string
  label: string
  title: string
  body: string
  points: readonly string[]
  image: string
  alt: string
}

export const PRISM_APP_TOUR: readonly PrismAppTourStep[] = [
  {
    id: 'summary',
    label: 'Summary',
    title: 'one screen for the whole picture.',
    body: 'Open Prism and see how many people are on your site right now, then your leads, visits, Google clicks, and visits from AI assistants.',
    points: [
      'A live count from the last 30 minutes',
      'The latest highlight for your site',
      'Notes on what the Prism team shipped',
    ],
    image: '/prism-app/summary.jpg',
    alt: 'Prism app Summary screen showing people on the site now, a Google first page highlight, and cards for leads, visits, and Google Search.',
  },
  {
    id: 'leads',
    label: 'Leads',
    title: 'see when people reach out.',
    body: 'A count of the forms people send through your website, such as appointment requests, by week, month, or three months.',
    points: [
      'Totals for each form on your site',
      'When the latest form came in',
      'Prism counts forms and never stores what people wrote',
    ],
    image: '/prism-app/leads.jpg',
    alt: 'Prism app Leads screen with a bar chart of forms over the last month and totals by form.',
  },
  {
    id: 'visits',
    label: 'Visits',
    title: 'see where visits come from.',
    body: 'Your visits by day, your busiest day, and the channels that brought people in, like Google, social, and other sites.',
    points: [
      'Week, month, or three-month views',
      'Engaged visits, explained in plain English',
      'Where visits came from over the last 28 days',
    ],
    image: '/prism-app/visits.jpg',
    alt: 'Prism app Visits screen with a daily chart of visits and details below it.',
  },
  {
    id: 'search',
    label: 'Google Search',
    title: 'see what people search to find you.',
    body: 'Clicks from Google, how often your site was shown, your average position, and the searches that brought people in.',
    points: [
      'Your top searches, with clicks for each',
      'What each number means, right under it',
      'Clear about Google’s reporting delay',
    ],
    image: '/prism-app/search.jpg',
    alt: 'Prism app Google Search screen with a chart of clicks and totals for clicks, times shown on Google, and average position.',
  },
  {
    id: 'ai',
    label: 'AI Assistants',
    title: 'see who arrives from AI answers.',
    body: 'Visits from people who followed a link in an answer from an AI assistant such as ChatGPT or Perplexity.',
    points: [
      'A total for the last 28 days',
      'A count for each assistant',
    ],
    image: '/prism-app/ai.jpg',
    alt: 'Prism app AI Assistants screen showing total visits and a count for ChatGPT and Perplexity.',
  },
  {
    id: 'updates',
    label: 'Updates',
    title: 'hear when something good happens.',
    body: 'A traffic spike, a new page-one ranking, your best week yet, and what the Prism team just shipped, all in one feed.',
    points: [
      'A short summary every Monday',
      'A few notifications a week at most',
      'None overnight',
    ],
    image: '/prism-app/updates.jpg',
    alt: 'Prism app Updates feed with a traffic spike, a Google first page ranking, a new page from Prism, and a best week note.',
  },
] as const

export const PRISM_APP_TRUST = [
  {
    title: 'read-only access.',
    body: 'Your numbers come from the Google Analytics and Search Console accounts of the website we manage for you, read with read-only access.',
  },
  {
    title: 'totals, not people.',
    body: 'You see visits, traffic sources, and search terms. They don’t identify the people who visited your website.',
  },
  {
    title: 'no ads or tracking.',
    body: 'The app uses no advertising or tracking tools, and we don’t sell or share your information.',
  },
  {
    title: 'delete it anytime.',
    body: 'Open Account, then Delete Account. Your account, sign-in details, and notification tokens are removed right away.',
  },
] as const

export const PRISM_APP_STEPS = [
  {
    title: 'download Prism.',
    body: 'It’s free on the App Store for iPhone.',
  },
  {
    title: 'sign in with your invited email.',
    body: 'Prism clients choose Continue with Google or Continue with Apple, using the address Prism invited.',
  },
  {
    title: 'or explore the demo.',
    body: 'Tap Explore a Demo on the sign-in screen to look around a fictional practice. No account needed.',
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
