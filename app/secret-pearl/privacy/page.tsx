import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_DESCRIPTION =
  'How Secret Pearl stores and protects your private relationship journal on your iPhone.'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Secret Pearl Privacy',
  description: PAGE_DESCRIPTION,
  path: '/secret-pearl/privacy',
  ogImage: '/prism-opengraph.png',
})

const SECTIONS: AppPolicySection[] = [
  {
    id: 'information-pearl-stores',
    title: 'Information Pearl stores',
    content: (
      <>
        <p>
          Pearl stores the information you choose to add to your journal locally
          on your iPhone. This can include:
        </p>
        <ul>
          <li>Relationship names and dates</li>
          <li>Moments, notes, dates, times, categories, and favorites</li>
          <li>Photos, videos, captions, and saved locations</li>
          <li>Plans, reminders, and optional song details</li>
          <li>App preferences, including app-lock and haptic settings</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-prism-collects',
    title: 'What Prism collects',
    content: (
      <>
        <p>
          Prism does not receive, collect, sell, rent, or use your Pearl journal
          data for advertising or tracking. Pearl has no account, analytics SDK,
          advertising SDK, or Pearl cloud service.
        </p>
      </>
    ),
  },
  {
    id: 'photos-videos-and-locations',
    title: 'Photos, videos, and locations',
    content: (
      <>
        <p>
          Pearl can access only the photos and videos you choose with
          Apple&apos;s system picker. When you view a map, search for a place,
          or add a location, Pearl may use Apple Maps and Apple&apos;s geocoding
          service for the request. The saved result remains in your local
          journal. Apple&apos;s handling of those requests is governed by
          Apple&apos;s privacy policy.
        </p>
      </>
    ),
  },
  {
    id: 'optional-apple-music-features',
    title: 'Optional Apple Music features',
    content: (
      <>
        <p>
          If you choose to search for or play a song, Pearl uses MusicKit to
          communicate with Apple Music. Apple may receive the search or playback
          request under your Apple account and Apple&apos;s privacy terms. Pearl
          stores the song details you attach only in your local journal.
        </p>
      </>
    ),
  },
  {
    id: 'notifications-and-app-lock',
    title: 'Notifications and app lock',
    content: (
      <>
        <p>
          Pearl schedules reminders locally through iOS. Face ID, Touch ID, or
          device-passcode authentication is handled by iOS; Pearl does not
          receive your biometric data.
        </p>
      </>
    ),
  },
  {
    id: 'backups-and-exports',
    title: 'Backups and exports',
    content: (
      <>
        <p>
          iOS may include Pearl data in an iPhone backup according to your
          system and Apple account settings. Pearl also lets you create an
          export and choose where to save it. Prism cannot access, recover, or
          delete those backups or exports for you.
        </p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content: (
      <>
        <ul>
          <li>Edit or delete individual Moments at any time.</li>
          <li>Bulk edit or delete selected Moments.</li>
          <li>Delete all Pearl data from Settings.</li>
          <li>
            Remove the app to remove its local app container from the iPhone.
          </li>
          <li>
            Manage Photos, Apple Music, notifications, and backup access in iOS
            Settings.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'deletion-and-retention',
    title: 'Deletion and retention',
    content: (
      <>
        <p>
          When you delete a Moment, its journal record disappears immediately.
          Unreferenced photo or video files may remain only on your iPhone in a
          protected local quarantine for up to 30 days, then Pearl removes them
          on a later app launch. Choosing Delete All Pearl Data in Settings
          removes journal records, attachments, and quarantined media
          immediately.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <>
        <p>
          Pearl is not directed to children under 13. Prism does not knowingly
          collect personal information from children through the app.
        </p>
      </>
    ),
  },
  {
    id: 'policy-updates',
    title: 'Policy updates',
    content: (
      <>
        <p>
          We may update this policy when Pearl&apos;s features or legal
          requirements change. The effective date above identifies the current
          version.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <>
        <p>
          Questions about Secret Pearl privacy can be sent to{' '}
          <a href="mailto:support@design-prism.com">support@design-prism.com</a>
          . For information about data collected when you visit this website,
          see the{' '}
          <Link href="/privacy-policy">Prism website privacy policy</Link>.
        </p>
      </>
    ),
  },
]

export default function SecretPearlPrivacyPage() {
  return (
    <AppPolicyPage
      product="Secret Pearl for iPhone"
      title="privacy policy."
      lead="Secret Pearl is an offline-first relationship journal. Your journal is stored in Pearl on your iPhone, and Prism does not run a server that receives or stores it."
      meta={[
        'Secret Pearl is provided by Lorenzo Quaid Sison, with app support and privacy questions handled through Prism.',
        'Effective July 21, 2026',
      ]}
      sections={SECTIONS}
    />
  )
}
