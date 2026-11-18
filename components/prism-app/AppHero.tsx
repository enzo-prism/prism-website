import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { PRISM_APP_NAME, PRISM_APP_VERSION } from '@/lib/prism-app'

import { AppHeroStage } from './AppHeroStage'
import { AppStoreButton } from './AppStoreButton'
import styles from './app-page.module.css'

const DEMO_LABEL = 'Explore the lead demo'

const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties
const line = (index: number) => ({ '--line': index }) as CSSProperties

export function AppHero() {
  return (
    <section aria-labelledby="prism-app-title" className={styles.hero}>
      <div aria-hidden="true" className={styles.heroBackdrop}>
        <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[40rem] opacity-40" />
        <div className={styles.heroAurora} />
      </div>

      <div className={`prism-container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={`prism-rise ${styles.heroName}`} style={rise(0)}>
            <Image
              src="/prism-app/app-icon.png"
              alt=""
              width={64}
              height={64}
              className="size-7 rounded-[0.45rem]"
            />
            <span className="font-medium text-foreground">{PRISM_APP_NAME}</span>
            <span aria-hidden="true" className="text-subtle">
              ·
            </span>
            <span>for iPhone</span>
            <span className={styles.heroVersion}>
              <span className="sr-only">Version </span>
              {PRISM_APP_VERSION}
            </span>
          </p>

          <h1 id="prism-app-title" className={styles.heroTitle}>
            <span className={styles.heroLine} style={line(0)}>
              <span className={styles.heroLineInner}>
                <span className="text-gradient">track your</span>
              </span>
            </span>{' '}
            <span className={styles.heroLine} style={line(1)}>
              <span className={styles.heroLineInner}>
                <span className="text-gradient">website</span>
              </span>
            </span>{' '}
            <span className={styles.heroLine} style={line(2)}>
              <span className={styles.heroLineInner}>
                <span className="prism-glint">leads.</span>
              </span>
            </span>
          </h1>

          <p
            className={`prism-rise text-lead text-pretty text-muted-foreground ${styles.heroLead}`}
            style={rise(260)}
          >
            See how many inquiries your website brings in, which forms people use, and how this month compares with the last.
          </p>

          <div className={`prism-rise ${styles.heroActions}`} style={rise(340)}>
            <div className={styles.heroButtons}>
              <AppStoreButton
                location="prism app hero"
                className="w-full sm:w-auto"
              />
              <Button
                asChild
                size="xl"
                variant="outline"
                className="group/demo w-full sm:w-auto"
              >
                <TrackedLink
                  href="#inside"
                  label={DEMO_LABEL}
                  location="prism app hero"
                >
                  {DEMO_LABEL}
                  <ArrowDown
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/demo:translate-y-0.5"
                  />
                </TrackedLink>
              </Button>
            </div>

            <div className={styles.heroMeta}>
              <div className={styles.heroQr}>
                <span className="block rounded-xl bg-white p-1.5">
                  <Image
                    src="/prism-app/app-store-qr.svg"
                    alt="QR code that opens Prism Grow on the App Store"
                    width={84}
                    height={84}
                    unoptimized
                    className="block size-[4.5rem]"
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
        </div>

        <figure className={styles.heroFigure}>
          <AppHeroStage />
          <figcaption className={styles.heroCaption}>
            Demo: Bayview Dental, a fictional practice
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AppHero
