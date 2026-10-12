import {
  AppPolicyPage,
  type AppPolicySection,
} from '@/components/landing/misc/app-policy'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pole Vault OS Privacy Policy',
  description:
    'How Pole Vault OS stores your journal and handles optional Apple services, permissions, and exports.',
  path: '/pole-vault-os/privacy',
  ogImage: '/prism-opengraph.png',
})

const SECTIONS: AppPolicySection[] = [
  {
    id: 'information-stored-on-your-device',
    title: 'Information stored on your device',
    content: (
      <>
        <p>
          {
            'Pole Vault OS stores the information you choose to log on your iPhone: poles and equipment specifications; practice sessions, competitions, attempts, drill blocks, runway marks and venues; notes, cues and reflections; optional exertion and wellness ratings; attached photos and videos; and app preferences such as units and athlete weight.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'what-prism-receives',
    title: 'What Prism receives',
    content: (
      <>
        <p>
          {
            'The app does not require an account and does not send your journal to a Prism server. Pole Vault OS has no advertising or analytics SDK and does not sell your journal or use it for tracking. If you contact support, we receive the email address, message, and any attachments you choose to send and use them to respond to your request.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'optional-location-and-apple-weather',
    title: 'Optional location and Apple Weather',
    content: (
      <>
        <p>
          {
            'When you choose to use your current location while logging a session, the app requests location permission from iOS. Location can help identify a venue and request conditions from Apple Weather. The app sends coordinates to Apple Weather to request conditions under Apple’s privacy terms. Saved venue coordinates and weather results remain in your local journal. You can deny or revoke location access in iOS Settings and enter your venue and conditions manually.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'photos-videos-and-live-activities',
    title: 'Photos, videos, and Live Activities',
    content: (
      <>
        <p>
          {
            'The app imports only the photos and videos you select using Apple’s system picker and stores copies locally as attachments. Optional Live Activities display session or meet information on supported iPhone surfaces, including the Lock Screen. You control Live Activities through iOS settings.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'on-device-insights',
    title: 'On-device insights',
    content: (
      <>
        <p>
          On supported devices, insight summaries use Apple’s on-device
          SystemLanguageModel. Journal information is not sent to an external AI
          provider for these summaries.
        </p>
      </>
    ),
  },
  {
    id: 'backups-and-sharing',
    title: 'Backups and sharing',
    content: (
      <>
        <p>
          {
            'iOS may include app data in device backups according to your Apple account and system settings. You can also create a full backup or a coach CSV summary and choose where to save or share it. A full backup includes your journal, app preferences, and attachments. Exports are not password-protected or encrypted by the app. Anyone you share a file with, and the storage provider you choose, may have access to its contents. Prism cannot access, recover, or delete your device backups or exported files for you.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'retention-and-deletion',
    title: 'Retention and deletion',
    content: (
      <>
        <p>
          {
            'Journal records remain on your device until you delete them or remove the app. You can delete records and attachments or use Reset All Data in Settings to erase the journal from the app. Using Delete App in iOS removes its local app container; offloading the app can retain its data. Deleting data in the app does not delete copies you previously exported, shared, or stored in device backups; manage those copies where you saved them.'
          }
        </p>
      </>
    ),
  },
  {
    id: 'your-choices-and-policy-changes',
    title: 'Your choices and policy changes',
    content: (
      <>
        <p>
          {
            'Use the app without an account, choose what to log or share, and manage permissions in iOS Settings. We may update this policy as features or requirements change. The effective date identifies the current policy.'
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

export default function PoleVaultOSPrivacyPage() {
  return (
    <AppPolicyPage
      product="Pole Vault OS for iPhone"
      title="privacy policy."
      lead={
        'Pole Vault OS is a journal for your practices, competitions, and equipment. Your journal is stored locally on your device; you control exports and sharing.'
      }
      meta={[
        'Provided by Lorenzo Quaid Sison, with support through Prism.',
        'Effective September 12, 2026',
      ]}
      sections={SECTIONS}
    />
  )
}
