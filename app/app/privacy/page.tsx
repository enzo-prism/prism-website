import type { Metadata } from 'next'
import Link from 'next/link'

import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Prism Grow app privacy',
  description:
    'What Prism Grow, the Prism iPhone app, collects, where your website data comes from, how it is stored, and how to delete your account.',
  path: '/app/privacy',
})

// Mirrors the policy published with the app (prism-platform:
// apps/api/app/privacy/page.tsx, last updated November 10, 2026). Change both
// together. The app is called Prism Grow on the App Store and Prism on the
// Home Screen; the policy's body keeps "Prism" as the app's own page does.
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
            private relay address) and an account identifier. If you sign in
            with an emailed code, we use the email address you enter. We use
            these only to know which practice’s data to show you.
          </li>
          <li>
            <strong>Your business access and setup.</strong> We store the
            businesses linked to your account, website confirmations, linked
            sign-in methods, and business names or website addresses you submit
            when requesting missing access. We use this information to set up
            and support access to your business data.
          </li>
          <li>
            <strong>A notification token</strong>, if you allow notifications,
            so we can send updates about your website to your device, and your
            choices about which notifications and emails you want.
          </li>
          <li>
            <strong>When you use Prism.</strong> We record when you first saw
            your numbers, first opened a monthly report, last completed a
            report share, and last opened the app, so we can help clients use
            Prism. These milestones do not include report contents or a
            browsing history.
          </li>
          <li>
            <strong>Teammates you invite.</strong> If you invite someone on
            your team, we store their email address to send the invitation.
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
        United States, and is encrypted in transit. Sign-in codes, invitations
        and any summary emails you choose to receive are delivered by our email
        provider, Resend. Your app session is kept in your iPhone’s keychain.
        Recent account, summary and report copies are encrypted on your device
        for up to six hours of offline access and are cleared when you sign
        out. Widgets use separate, read-only credentials scoped to an
        authorized website, and label old data.
      </p>
    ),
  },
  {
    id: 'app-diagnostics',
    title: 'App diagnostics',
    content: (
      <p>
        Apple performance and crash reports are stored locally on your device.
        Screen diagnostics use broad states such as Summary or Report, without
        business identifiers, email addresses or report contents. Prism does
        not automatically upload these files. You can choose to share a
        diagnostic file with support from Help.
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
          <Link href="/app">Prism Grow for iPhone</Link>
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
      product="Prism Grow for iPhone"
      title="app privacy policy."
      lead="Prism Grow (Prism on your Home Screen) is an iPhone app from Design Prism that shows our clients how their websites are performing. This policy covers the app and the service behind it."
      meta={['Design Prism', 'Last updated November 10, 2026']}
      sections={SECTIONS}
    />
  )
}
