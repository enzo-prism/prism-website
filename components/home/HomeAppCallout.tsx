import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { PRISM_APP_NAME } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

import styles from './HomeAppCallout.module.css'

const HREF = '/app'
const LABEL = 'prism grow app'
const LOCATION = 'homepage hero'
const LINE = 'Track your website leads.'

function AppIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/prism-app/app-icon.png"
      alt=""
      width={88}
      height={88}
      className={cn('shrink-0', className)}
    />
  )
}

/**
 * The homepage hero's pointer to Prism Grow, the iPhone app. It lives in
 * negative space so the tagline column keeps its rhythm:
 *
 * - `HomeAppCard` (xl and up): a notification-style card floating in the
 *   dark left of the refraction scene, level with the prism's middle and
 *   above the incoming beam, well clear of the hero actions. It lands once the spectrum has formed, like a
 *   notification arriving.
 *
 * Below xl the card stays hidden so the hero keeps one action; phones meet
 * Prism Grow on /app and in the footer. The still frame is the finished
 * frame.
 */
export function HomeAppCard() {
  return (
    <div className={styles.cardLayer}>
      <div className="prism-container">
        <TrackedLink
          href={HREF}
          label={LABEL}
          location={LOCATION}
          data-testid="home-app-callout"
          aria-label={`${PRISM_APP_NAME} for iPhone, new. ${LINE}`}
          className={styles.card}
        >
          <AppIcon className="size-11 rounded-[0.7rem] shadow-[0_6px_18px_-6px_oklch(0_0_0/90%)]" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="text-[15px] font-semibold tracking-[-0.015em] text-foreground">
                {PRISM_APP_NAME} for iPhone
              </span>
              <span className={styles.badge}>New</span>
            </span>
            <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">
              {LINE}
            </span>
          </span>
          <ArrowRight aria-hidden="true" className={styles.arrow} />
        </TrackedLink>
      </div>
    </div>
  )
}
