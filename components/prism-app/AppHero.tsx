import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { PRISM_APP_NOTIFICATIONS } from '@/lib/prism-app'

import { AppPhone } from './AppPhone'
import { AppLockScreen, AppNotification } from './AppScreens'
import { AppStoreButton } from './AppStoreButton'
import styles from './app-page.module.css'

const DEMO_LABEL = 'Explore the demo'

/**
 * The opening: the moment a lead lands on the Lock Screen. Three
 * notifications arrive one at a time and hold, each large enough to read.
 * Desktop visitors cannot install from a Mac, so the App Store button sits
 * beside a QR code and a way into the demo on this page. The base style is
 * the finished frame.
 */
export function AppHero({ demoNote }: { demoNote: string }) {
  return (
    <section aria-labelledby="prism-app-title" className={styles.hero}>
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-40"
      />

      <div className={`prism-container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1
            id="prism-app-title"
            className={`prism-rise text-gradient ${styles.heroTitle}`}
            style={{ '--rise-delay': '70ms' } as React.CSSProperties}
          >
            your website,
            <br />
            at a glance.
          </h1>
          <p
            className={`prism-rise text-lead text-pretty text-muted-foreground ${styles.heroLead}`}
            style={{ '--rise-delay': '140ms' } as React.CSSProperties}
          >
            Visits, leads, and searches on your iPhone.
          </p>

          <div
            className={`prism-rise ${styles.heroActions}`}
            style={{ '--rise-delay': '210ms' } as React.CSSProperties}
          >
            <div className={styles.heroButtons}>
              <AppStoreButton
                location="prism app hero"
                className="w-full sm:w-auto"
              />
              <Button
                asChild
                size="xl"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <TrackedLink
                  href="#inside"
                  label={DEMO_LABEL}
                  location="prism app hero"
                >
                  {DEMO_LABEL}
                  <ArrowDown aria-hidden="true" />
                </TrackedLink>
              </Button>
            </div>

            <div className={styles.heroQr}>
              <span className="block rounded-xl bg-white p-1.5">
                <Image
                  src="/prism-app/app-store-qr.svg"
                  alt="QR code that opens Prism on the App Store"
                  width={84}
                  height={84}
                  unoptimized
                  className="block size-[5.25rem]"
                />
              </span>
              <p className="text-[13px] leading-5 text-muted-foreground">
                <span className="block text-[15px] font-medium text-foreground">
                  Scan with your iPhone
                </span>
                Opens the App Store.
              </p>
            </div>

            <p className="text-[13px] text-subtle">
              Free. Built for Prism clients.
            </p>
          </div>
        </div>

        {/* Decorative: the h1 and lead carry the message. */}
        <div aria-hidden="true" className={styles.heroScene}>
          <div className={styles.heroHalo} />
          <div className={styles.heroEntrance}>
            <AppPhone className={styles.heroPhone}>
              <AppLockScreen />
            </AppPhone>
            <ul className={styles.heroNotifications}>
              {PRISM_APP_NOTIFICATIONS.map((item) => (
                <AppNotification
                  key={item.title}
                  title={item.title}
                  body={item.body}
                  time={item.time}
                  className={styles.heroNotification}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className={styles.heroNote}>{demoNote}</p>
    </section>
  )
}

export default AppHero
