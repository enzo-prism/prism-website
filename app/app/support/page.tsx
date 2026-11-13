import type { Metadata } from 'next'
import Link from 'next/link'

import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Prism Grow app support',
  description:
    'Get help with Prism Grow, the Prism iPhone app: getting in, finding your access, loading numbers, notifications, and where the numbers come from.',
  path: '/app/support',
})

// Mirrors the support page published with the app (prism-platform:
// apps/api/app/support/page.tsx) as production renders it, with email sign-in
// on. Change both together. The app is called Prism Grow on the App Store and
// Prism on the Home Screen; in-app paths below use the app's own labels.
const SECTIONS: AppPolicySection[] = [
  {
    id: 'talk-to-us',
    title: 'Talk to us',
    content: (
      <p>
        Email <a href="mailto:enzo@design-prism.com">enzo@design-prism.com</a>{' '}
        and we’ll reply within one business day. In the app, open Account ›
        Help to reach us with your account details already filled in.
      </p>
    ),
  },
  {
    id: 'getting-in',
    title: 'Getting in',
    content: (
      <p>
        Prism Grow is for Design Prism clients. We send you an invitation;
        install the app and tap Continue with Email using the address we
        invited. We email you a 6-digit code, so there is no password. You can
        also continue with Google or Apple. To use Apple or a different
        account, open your invitation link on your iPhone first, or tap Enter
        an Invitation Code in the app.
      </p>
    ),
  },
  {
    id: 'cant-find-access',
    title: '“We couldn’t find your access”',
    content: (
      <p>
        You signed in with an address or account we haven’t invited yet. Try
        the address our invitation was sent to, or contact us and we’ll add the
        one you prefer. Your invitation stays valid while you sort this out.
      </p>
    ),
  },
  {
    id: 'numbers-loading',
    title: 'My numbers are still loading',
    content: (
      <p>
        When a website is first connected, Prism brings in its history from
        Google. Each section appears as soon as its numbers are complete, so
        you never see a partial total. There is nothing you need to do.
      </p>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: (
      <p>
        Prism sends a few notifications a week at most: wins such as a new
        Google ranking, new form submissions, a Monday summary and a note when
        your monthly report is ready. None are sent overnight. Choose which
        ones you get in the app under Account › Notifications.
      </p>
    ),
  },
  {
    id: 'where-the-numbers-come-from',
    title: 'Where the numbers come from',
    content: (
      <>
        <p>
          Visits come from Google Analytics and update about every hour. Google
          search clicks come from Google Search Console, which finalizes each
          day’s numbers a few days later. Forms are submissions made through
          your website; Prism counts them and never stores what people wrote.
        </p>
        <p>
          <Link href="/app">Prism Grow for iPhone</Link>
          {' · '}
          <Link href="/app/privacy">App privacy policy</Link>
        </p>
      </>
    ),
  },
]

export default function PrismAppSupportPage() {
  return (
    <AppPolicyPage
      product="Prism Grow for iPhone"
      title="app support."
      lead="Help with getting in, your access, notifications, and the numbers in Prism Grow (Prism on your Home Screen)."
      meta={['Design Prism', 'We reply within one business day']}
      sections={SECTIONS}
    />
  )
}
