import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pole Vault OS App Support',
  description:
    'Get help with Pole Vault OS, local journals, backups, restore, and optional weather.',
  path: '/pole-vault-os/support',
  ogImage: '/prism-opengraph.png',
})

const SECTIONS: AppPolicySection[] = [
  {
    id: 'contact-app-support',
    title: 'Contact app support',
    content: (
      <>
        <p>
          {
            'Email support@design-prism.com with your app version, iPhone model, iOS version, and what happened. Include steps to reproduce a problem when possible. No account or sign-in is required to request support. Share screenshots or journal files only if you are comfortable sending their contents.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'where-your-journal-lives',
    title: 'Where your journal lives',
    content: (
      <>
        <p>
          {
            'Pole Vault OS stores your journal locally on your iPhone. There is no Pole Vault OS account or automatic Prism cloud sync. Before replacing a device or deleting the app, save a full backup somewhere you can access later.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'export-a-full-backup',
    title: 'Export a full backup',
    content: (
      <>
        <p>
          {
            'Open Settings and choose Export Full Backup. Choose a safe destination in Files or the share sheet. Backups include records, preferences, and photos/videos, with a limit of 128 MB of attachments and 200 MB for the complete file. If a backup exceeds these limits, the app reports an error instead of silently leaving out attachments. Exported files are not password-protected by the app.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'restore-a-backup',
    title: 'Restore a backup',
    content: (
      <>
        <p>
          {
            'Open Settings, choose Restore Backup, select the JSON backup, review its contents, and confirm. Restore requires an empty journal and does not merge or overwrite existing records. Export your current journal before using Reset All Data, or restore on another device with an empty journal. Keep your original backup until you have checked the restored records and attachments.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'share-a-coach-summary',
    title: 'Share a coach summary',
    content: (
      <>
        <p>
          {
            'Choose Export Coach Summary (CSV) in Settings to share session summaries. Measurements in this export are in inches. CSV summaries do not include the complete journal or media and cannot be restored as a backup.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'location-and-weather',
    title: 'Location and weather',
    content: (
      <>
        <p>
          {
            'Location and Apple Weather are optional. If weather or location is unavailable, enter the venue and conditions manually. Review location permission in iOS Settings if you want to enable it.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'if-the-journal-will-not-open',
    title: 'If the journal will not open',
    content: (
      <>
        <p>
          {
            'Keep the app installed to preserve its local data. Restart the app and check available device storage. If the problem continues, contact support with the displayed error and your app and iOS versions. Do not reset or delete the app as a troubleshooting step unless you have a verified backup and intend to remove its local data.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'contact-and-related-policies',
    title: 'Contact and related policies',
    content: (
      <>
        <p>
          App and privacy questions:{' '}
          <a href="mailto:support@design-prism.com">support@design-prism.com</a>
          .
        </p>
        <p>
          This page describes the iOS app. Visits to this website are handled
          separately and may involve website analytics as described in the{' '}
          <Link href="/privacy-policy">Prism website privacy policy</Link>.
        </p>
        <p>
          <Link href="/pole-vault-os/privacy">App privacy policy</Link>
          {' · '}
          <Link href="/pole-vault-os/support">App support</Link>
          {' · '}
          <a href="https://www.apple.com/legal/privacy/">
            Apple privacy policy
          </a>
        </p>
      </>
    ),
  },
]

export default function PoleVaultOSSupportPage() {
  return (
    <AppPolicyPage
      product="Pole Vault OS for iPhone"
      title="app support."
      lead={
        'Help with your Pole Vault OS journal. Contact support without creating an account.'
      }
      meta={[
        'Provided by Lorenzo Quaid Sison, with support through Prism.',
        'Effective September 12, 2026',
      ]}
      sections={SECTIONS}
    />
  )
}
