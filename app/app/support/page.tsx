import type { Metadata } from 'next'
import Link from 'next/link'

import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Prism app support',
  description:
    'Get help with the Prism iPhone app: access, sign-in, notifications, and where the numbers come from.',
  path: '/app/support',
})

// Mirrors the support page published with the app (prism-platform:
// apps/api/app/support/page.tsx). Change both together.
const SECTIONS: AppPolicySection[] = [
  {
    id: 'getting-access',
    title: 'Getting access',
    content: (
      <p>
        Prism is for Design Prism clients. Ask us to invite you, then open the
        app and choose Continue with Google using the email address we invited.
        If you use Sign in with Apple, open the invite link we send you first.
      </p>
    ),
  },
  {
    id: 'account-not-connected',
    title: '“This account isn’t connected to a practice yet”',
    content: (
      <p>
        You signed in with an email address we haven’t invited. Sign out and
        try the address you gave us, or email us and we’ll add the one you use.
      </p>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: (
      <p>
        Prism sends a few notifications a week at most: traffic spikes, new
        Google rankings, record weeks and a Monday summary. None are sent
        overnight. You can turn them off in Settings › Notifications › Prism.
      </p>
    ),
  },
  {
    id: 'where-the-numbers-come-from',
    title: 'Where the numbers come from',
    content: (
      <p>
        Visits come from Google Analytics and update about every hour. Google
        search clicks come from Google Search Console, which finalizes each
        day’s numbers about two days later.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <>
        <p>
          Email{' '}
          <a href="mailto:enzo@design-prism.com">enzo@design-prism.com</a> and
          we’ll reply within one business day.
        </p>
        <p>
          <Link href="/app">Prism for iPhone</Link>
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
      product="Prism for iPhone"
      title="app support."
      lead="Help with access, sign-in, notifications, and the numbers in the Prism app."
      meta={['Design Prism']}
      sections={SECTIONS}
    />
  )
}
