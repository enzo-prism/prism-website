import type { Metadata } from 'next'
import Link from 'next/link'

import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Prism app privacy',
  description:
    'What the Prism iPhone app collects, where your website data comes from, how it is stored, and how to delete your account.',
  path: '/app/privacy',
})

// Mirrors the policy published with the app (prism-platform:
// apps/api/app/privacy/page.tsx). Change both together.
const SECTIONS: AppPolicySection[] = [
  {
    id: 'what-we-collect',
    title: 'What we collect',
    content: (
      <>
        <ul>
          <li>
            <strong>Your sign-in.</strong> When you sign in with Google or
            Apple we receive your name, your email address (Apple may give us a
            private relay address) and an account identifier. We use them only
            to know which practice’s data to show you.
          </li>
          <li>
            <strong>A notification token</strong>, if you allow notifications,
            so we can send updates about your website to your device.
          </li>
        </ul>
        <p>
          We don’t collect your location, contacts, photos or browsing
          activity, we don’t use advertising or tracking tools, and we don’t
          sell or share your information.
        </p>
      </>
    ),
  },
  {
    id: 'your-websites-data',
    title: 'Your website’s data',
    content: (
      <p>
        The numbers in the app come from the Google Analytics and Google Search
        Console accounts of the website we manage for you, read with read-only
        access. They are totals such as visits, traffic sources and search
        terms; they don’t identify the people who visited your website.
      </p>
    ),
  },
  {
    id: 'google-user-data',
    title: 'Google user data',
    content: (
      <p>
        Google Sign-In gives us only your basic profile (name, email address
        and account identifier). We don’t request access to your Gmail, Drive,
        Calendar or any other Google data. Prism’s use of information received
        from Google APIs adheres to the{' '}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
    ),
  },
  {
    id: 'where-its-stored',
    title: 'Where it’s stored',
    content: (
      <p>
        Data is stored with our hosting providers, Vercel and Neon, in the
        United States, and is encrypted in transit. Your app session is kept in
        your iPhone’s keychain.
      </p>
    ),
  },
  {
    id: 'deleting-your-account',
    title: 'Deleting your account',
    content: (
      <p>
        In the app, open Account › Delete Account. This removes your account,
        your sign-in details and your notification tokens right away. You can
        also email us to ask for deletion.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <p>
        Prism is a business tool for our clients and isn’t directed at
        children.
      </p>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          If this policy changes we’ll update the date above. Questions:{' '}
          <a href="mailto:enzo@design-prism.com">enzo@design-prism.com</a>.
        </p>
        <p>
          This page describes the iPhone app. Visits to this website are
          covered by the{' '}
          <Link href="/privacy-policy">Prism website privacy policy</Link>.
        </p>
        <p>
          <Link href="/app">Prism for iPhone</Link>
          {' · '}
          <Link href="/app/support">App support</Link>
        </p>
      </>
    ),
  },
]

export default function PrismAppPrivacyPage() {
  return (
    <AppPolicyPage
      product="Prism for iPhone"
      title="app privacy policy."
      lead="Prism is an iPhone app from Design Prism that shows our clients how their websites are performing. This policy covers the app and the service behind it."
      meta={['Design Prism', 'Last updated November 2, 2026']}
      sections={SECTIONS}
    />
  )
}
