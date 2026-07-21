import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
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

const sectionClassName = 'border-t border-border pt-8'
const headingClassName = 'text-2xl font-medium tracking-tight text-foreground'
const bodyClassName = 'mt-4 text-base leading-7 text-muted-foreground'
const listClassName =
  'mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground'

export default function SecretPearlPrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <article className="container mx-auto max-w-4xl space-y-12 px-4 py-16 md:py-24">
          <header className="max-w-3xl space-y-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Secret Pearl for iPhone
            </p>
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Secret Pearl is an offline-first relationship journal. Your
              journal is stored in Pearl on your iPhone, and Prism does not run
              a server that receives or stores it.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              Secret Pearl is provided by Lorenzo Quaid Sison, with app support
              and privacy questions handled through Prism.
            </p>
            <p className="text-sm text-muted-foreground">
              Effective July 21, 2026
            </p>
          </header>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Information Pearl stores</h2>
            <p className={bodyClassName}>
              Pearl stores the information you choose to add to your journal
              locally on your iPhone. This can include:
            </p>
            <ul className={listClassName}>
              <li>Relationship names and dates</li>
              <li>Moments, notes, dates, times, categories, and favorites</li>
              <li>Photos, videos, captions, and saved locations</li>
              <li>Plans, reminders, and optional song details</li>
              <li>App preferences, including app-lock and haptic settings</li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>What Prism collects</h2>
            <p className={bodyClassName}>
              Prism does not receive, collect, sell, rent, or use your Pearl
              journal data for advertising or tracking. Pearl has no account,
              analytics SDK, advertising SDK, or Pearl cloud service.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Photos, videos, and locations</h2>
            <p className={bodyClassName}>
              Pearl can access only the photos and videos you choose with
              Apple&apos;s system picker. When you view a map, search for a
              place, or add a location, Pearl may use Apple Maps and
              Apple&apos;s geocoding service for the request. The saved result
              remains in your local journal. Apple&apos;s handling of those
              requests is governed by Apple&apos;s privacy policy.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Optional Apple Music features</h2>
            <p className={bodyClassName}>
              If you choose to search for or play a song, Pearl uses MusicKit to
              communicate with Apple Music. Apple may receive the search or
              playback request under your Apple account and Apple&apos;s privacy
              terms. Pearl stores the song details you attach only in your local
              journal.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Notifications and app lock</h2>
            <p className={bodyClassName}>
              Pearl schedules reminders locally through iOS. Face ID, Touch ID,
              or device-passcode authentication is handled by iOS; Pearl does
              not receive your biometric data.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Backups and exports</h2>
            <p className={bodyClassName}>
              iOS may include Pearl data in an iPhone backup according to your
              system and Apple account settings. Pearl also lets you create an
              export and choose where to save it. Prism cannot access, recover,
              or delete those backups or exports for you.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Your choices</h2>
            <ul className={listClassName}>
              <li>Edit or delete individual Moments at any time.</li>
              <li>Bulk edit or delete selected Moments.</li>
              <li>Delete all Pearl data from Settings.</li>
              <li>
                Remove the app to remove its local app container from the
                iPhone.
              </li>
              <li>
                Manage Photos, Apple Music, notifications, and backup access in
                iOS Settings.
              </li>
            </ul>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Deletion and retention</h2>
            <p className={bodyClassName}>
              When you delete a Moment, its journal record disappears
              immediately. Unreferenced photo or video files may remain only on
              your iPhone in a protected local quarantine for up to 30 days,
              then Pearl removes them on a later app launch. Choosing Delete All
              Pearl Data in Settings removes journal records, attachments, and
              quarantined media immediately.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Children</h2>
            <p className={bodyClassName}>
              Pearl is not directed to children under 13. Prism does not
              knowingly collect personal information from children through the
              app.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Policy updates</h2>
            <p className={bodyClassName}>
              We may update this policy when Pearl&apos;s features or legal
              requirements change. The effective date above identifies the
              current version.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>Contact</h2>
            <p className={bodyClassName}>
              Questions about Secret Pearl privacy can be sent to{' '}
              <a
                className="font-semibold text-foreground underline decoration-border underline-offset-4"
                href="mailto:support@design-prism.com"
              >
                support@design-prism.com
              </a>
              . For information about data collected when you visit this
              website, see the{' '}
              <Link
                className="font-semibold text-foreground underline decoration-border underline-offset-4"
                href="/privacy-policy"
              >
                Prism website privacy policy
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
