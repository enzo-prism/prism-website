import Image from 'next/image'
import { ArrowDown, CalendarDays, Mail } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { DEMO_LEADS, DEMO_LEAD_TOTAL, PRISM_APP_NAME } from '@/lib/prism-app'

import { LeadDayChart } from './LeadDayChart'
import { AppStoreButton } from './AppStoreButton'
import styles from './app-page.module.css'

const DEMO_LABEL = 'Explore the lead demo'

export function AppHero() {
  return (
    <section aria-labelledby="prism-app-title" className={styles.hero}>
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-40"
      />

      <div className={`prism-container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p
            className={`prism-rise ${styles.heroName}`}
            style={{ '--rise-delay': '0ms' } as React.CSSProperties}
          >
            <Image
              src="/prism-app/app-icon.png"
              alt=""
              width={64}
              height={64}
              className="size-8 rounded-[0.5rem]"
            />
            <span className="font-medium text-foreground">{PRISM_APP_NAME}</span>
            <span aria-hidden="true" className="text-subtle">
              ·
            </span>
            <span>for iPhone</span>
          </p>
          <h1
            id="prism-app-title"
            className={`prism-rise text-gradient ${styles.heroTitle}`}
            style={{ '--rise-delay': '70ms' } as React.CSSProperties}
          >
            track your<br /> website leads.
          </h1>
          <p
            className={`prism-rise text-lead text-pretty text-muted-foreground ${styles.heroLead}`}
            style={{ '--rise-delay': '140ms' } as React.CSSProperties}
          >
            See how many inquiries your website brings in, which forms people use, and how this month compares with the last.
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
                  alt="QR code that opens Prism Grow on the App Store"
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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
              <p className="text-subtle">Free. Built for Prism clients.</p>
              <a
                href="#whats-new"
                className="inline-flex items-center gap-1 rounded-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                What’s new <ArrowDown aria-hidden="true" className="size-3" />
              </a>
            </div>
          </div>
        </div>

        <figure className="w-full min-w-0 rounded-3xl border border-white/10 bg-card p-6 text-left shadow-2xl sm:p-8">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
            <span className="font-medium text-foreground">Bayview Dental</span>
            <span className="font-mono text-xs text-muted-foreground">Demo data</span>
          </figcaption>
          <p className="mt-6 text-body-md text-muted-foreground">Website leads</p>
          <div className="mt-1 flex items-end justify-between gap-6">
            <strong className="text-display leading-none tabular-nums">{DEMO_LEAD_TOTAL}</strong>
            <LeadDayChart />
          </div>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{DEMO_LEADS.period}, 2026 · 28 days</p>
          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {DEMO_LEADS.byForm.map(({ name, count }, index) => {
              const Icon = index === 0 ? CalendarDays : Mail
              return (
                <div key={name} className="flex items-center justify-between gap-4 py-3">
                  <dt className="flex items-center gap-3 text-body-md"><Icon aria-hidden="true" className="size-4 text-muted-foreground" />{name}</dt>
                  <dd className="font-mono text-xl tabular-nums">{count}</dd>
                </div>
              )
            })}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">Each submission to a connected form counts as one lead.</p>
        </figure>
      </div>
    </section>
  )
}

export default AppHero
