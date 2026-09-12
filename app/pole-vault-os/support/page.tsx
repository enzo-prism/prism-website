import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Pole Vault OS App Support",
  description: "Get help with Pole Vault OS, local journals, backups, restore, and optional weather.",
  path: '/pole-vault-os/support',
  ogImage: '/prism-opengraph.png',
})

export default function PoleVaultOSSupportPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <article className="container mx-auto max-w-4xl space-y-12 px-4 py-16 md:py-24">
          <header className="max-w-3xl space-y-5">
            <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">Pole Vault OS for iPhone</p>
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">App Support</h1>
            <p className="text-lg leading-8 text-muted-foreground">{"Help with your Pole Vault OS journal. Contact support without creating an account."}</p>
            <p className="text-base leading-7 text-muted-foreground">Provided by Lorenzo Quaid Sison, with support through Prism.</p>
            <p className="text-sm text-muted-foreground">Effective September 12, 2026</p>
          </header>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Contact app support"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Email support@design-prism.com with your app version, iPhone model, iOS version, and what happened. Include steps to reproduce a problem when possible. No account or sign-in is required to request support. Share screenshots or journal files only if you are comfortable sending their contents."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Where your journal lives"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Pole Vault OS stores your journal locally on your iPhone. There is no Pole Vault OS account or automatic Prism cloud sync. Before replacing a device or deleting the app, save a full backup somewhere you can access later."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Export a full backup"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Open Settings and choose Export Full Backup. Choose a safe destination in Files or the share sheet. Backups include records, preferences, and photos/videos, with a limit of 128 MB of attachments and 200 MB for the complete file. If a backup exceeds these limits, the app reports an error instead of silently leaving out attachments. Exported files are not password-protected by the app."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Restore a backup"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Open Settings, choose Restore Backup, select the JSON backup, review its contents, and confirm. Restore requires an empty journal and does not merge or overwrite existing records. Export your current journal before using Reset All Data, or restore on another device with an empty journal. Keep your original backup until you have checked the restored records and attachments."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Share a coach summary"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Choose Export Coach Summary (CSV) in Settings to share session summaries. Measurements in this export are in inches. CSV summaries do not include the complete journal or media and cannot be restored as a backup."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"Location and weather"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Location and Apple Weather are optional. If weather or location is unavailable, enter the venue and conditions manually. Review location permission in iOS Settings if you want to enable it."}</p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{"If the journal will not open"}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{"Keep the app installed to preserve its local data. Restart the app and check available device storage. If the problem continues, contact support with the displayed error and your app and iOS versions. Do not reset or delete the app as a troubleshooting step unless you have a verified backup and intend to remove its local data."}</p>
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
