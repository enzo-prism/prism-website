import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Pole Vault OS Privacy Policy",
  description: "How Pole Vault OS stores your journal and handles optional Apple services, permissions, and exports.",
  path: '/pole-vault-os/privacy',
  ogImage: '/prism-opengraph.png',
})

export default function PoleVaultOSPrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <article className="container mx-auto max-w-4xl space-y-12 px-4 py-16 md:py-24">
          <header className="max-w-3xl space-y-5">
            <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">Pole Vault OS for iPhone</p>
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">Privacy Policy</h1>
            <p className="text-lg leading-8 text-muted-foreground">{"Pole Vault OS is a journal for your practices, competitions, and equipment. Your journal is stored locally on your device; you control exports and sharing."}</p>
            <p className="text-base leading-7 text-muted-foreground">Provided by Lorenzo Quaid Sison, with support through Prism.</p>
            <p className="text-sm text-muted-foreground">Effective September 12, 2026</p>
          </header>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Information stored on your device"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Pole Vault OS stores the information you choose to log on your iPhone: poles and equipment specifications; practice sessions, competitions, attempts, drill blocks, runway marks and venues; notes, cues and reflections; optional exertion and wellness ratings; attached photos and videos; and app preferences such as units and athlete weight."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"What Prism receives"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"The app does not require an account and does not send your journal to a Prism server. Pole Vault OS has no advertising or analytics SDK and does not sell your journal or use it for tracking. If you contact support, we receive the email address, message, and any attachments you choose to send and use them to respond to your request."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Optional location and Apple Weather"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"When you choose to use your current location while logging a session, the app requests location permission from iOS. Location can help identify a venue and request conditions from Apple Weather. The app sends coordinates to Apple Weather to request conditions under Apple’s privacy terms. Saved venue coordinates and weather results remain in your local journal. You can deny or revoke location access in iOS Settings and enter your venue and conditions manually."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Photos, videos, and Live Activities"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"The app imports only the photos and videos you select using Apple’s system picker and stores copies locally as attachments. Optional Live Activities display session or meet information on supported iPhone surfaces, including the Lock Screen. You control Live Activities through iOS settings."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">On-device insights</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">On supported devices, insight summaries use Apple’s on-device SystemLanguageModel. Journal information is not sent to an external AI provider for these summaries.</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Backups and sharing"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"iOS may include app data in device backups according to your Apple account and system settings. You can also create a full backup or a coach CSV summary and choose where to save or share it. A full backup includes your journal, app preferences, and attachments. Exports are not password-protected or encrypted by the app. Anyone you share a file with, and the storage provider you choose, may have access to its contents. Prism cannot access, recover, or delete your device backups or exported files for you."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Retention and deletion"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Journal records remain on your device until you delete them or remove the app. You can delete records and attachments or use Reset All Data in Settings to erase the journal from the app. Using Delete App in iOS removes its local app container; offloading the app can retain its data. Deleting data in the app does not delete copies you previously exported, shared, or stored in device backups; manage those copies where you saved them."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Your choices and policy changes"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Use the app without an account, choose what to log or share, and manage permissions in iOS Settings. We may update this policy as features or requirements change. The effective date identifies the current policy."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">Contact and related policies</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              App and privacy questions: <a className="font-semibold text-foreground underline underline-offset-4" href="mailto:support@design-prism.com">support@design-prism.com</a>.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              This page describes the iOS app. Visits to this website are handled separately and may involve website analytics as described in the <Link className="font-semibold text-foreground underline underline-offset-4" href="/privacy-policy">Prism website privacy policy</Link>.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              <Link className="font-semibold text-foreground underline underline-offset-4" href="/pole-vault-os/privacy">App privacy policy</Link>{' · '}
              <Link className="font-semibold text-foreground underline underline-offset-4" href="/pole-vault-os/support">App support</Link>{' · '}
              <a className="font-semibold text-foreground underline underline-offset-4" href="https://www.apple.com/legal/privacy/">Apple privacy policy</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
