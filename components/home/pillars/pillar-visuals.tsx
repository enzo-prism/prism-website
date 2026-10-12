import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import {
  CalendarCheck,
  ClipboardCheck,
  PhoneIncoming,
  Star,
  Store,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import styles from './pillars.module.css'

type Vars = CSSProperties & Record<`--${string}`, string | number>

/** The inset well every pillar visual sits in. Decorative only. */
function Stage({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div aria-hidden="true" className={cn(styles.stage, className)}>
      {children}
    </div>
  )
}

/* ---- shine. -------------------------------------------------------------- */

/** A miniature website composing itself, with light crossing the glass. */
export function ShineVisual({ className }: { className?: string }) {
  const step = (i: number): Vars => ({ '--i': i })
  return (
    <Stage className={className}>
      <div className={styles.browser}>
        <div className={styles.chrome}>
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.chromeDot} />
          <span className={styles.url} />
        </div>
        <div className={styles.page}>
          <div className={cn(styles.nav, styles.compose)} style={step(0)}>
            <span className={styles.logo} />
            <span className={styles.logoWord} />
            <span className={styles.navLinks}>
              <span className={styles.navLink} />
              <span className={styles.navLink} />
              <span className={styles.navLink} />
            </span>
            <span className={styles.navCta} />
          </div>
          <div className={styles.hero}>
            <div className={styles.copy}>
              <span
                className={cn(styles.bar, styles.eyebrowBar, styles.draw)}
                style={step(1)}
              />
              <span
                className={cn(
                  styles.bar,
                  styles.headline,
                  styles.headlineA,
                  styles.draw,
                )}
                style={step(2)}
              />
              <span
                className={cn(
                  styles.bar,
                  styles.headline,
                  styles.headlineB,
                  styles.draw,
                )}
                style={step(3)}
              />
              <span
                className={cn(styles.bar, styles.textA, styles.draw)}
                style={step(4)}
              />
              <span
                className={cn(styles.bar, styles.textB, styles.draw)}
                style={step(5)}
              />
              <span className={cn(styles.ctas, styles.compose)} style={step(6)}>
                <span className={styles.btnPrimary} />
                <span className={styles.btnGhost} />
              </span>
            </div>
            <div className={cn(styles.media, styles.compose)} style={step(3)}>
              <span className={styles.mediaScene}>
                <span className={styles.mediaHillBack} />
                <span className={styles.mediaHill} />
                <span className={styles.mediaSun} />
              </span>
            </div>
          </div>
          <div className={styles.cards}>
            {[7, 8, 9].map((i) => (
              <div
                key={i}
                className={cn(styles.miniCard, styles.compose)}
                style={step(i)}
              >
                <span className={styles.miniCardIcon} />
                <span className={styles.miniCardLine} />
                <span
                  className={cn(styles.miniCardLine, styles.miniCardLineShort)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* The wireframe becomes a real client site (Canary Cove) as the
            light crosses it. The still frame shows the real site. */}
        <span className={styles.realSite}>
          <Image
            src="/home/shine-canary-cove.webp"
            alt=""
            width={600}
            height={469}
            sizes="300px"
            className={styles.realSiteImage}
          />
        </span>
        <span className={styles.sweep} />
      </div>
    </Stage>
  )
}

/* ---- convert. ------------------------------------------------------------ */

const FEED_EVENTS = [
  { icon: Star, title: 'Review', source: '5 stars on Google' },
  {
    icon: ClipboardCheck,
    title: 'Form submitted',
    source: 'from an Instagram ad',
  },
  { icon: PhoneIncoming, title: 'Call', source: 'from Google Maps' },
  {
    icon: CalendarCheck,
    title: 'Booking request',
    source: 'from your website',
  },
] as const

/**
 * A live event feed. The track holds the events twice; it steps down one row
 * at a time so each new event lands in the highlighted slot at the top.
 * The still frame shows the first copy at rest.
 */
export function ConvertVisual({ className }: { className?: string }) {
  const rows = [...FEED_EVENTS, ...FEED_EVENTS]
  return (
    <Stage className={className}>
      <div className={styles.feed}>
        <div className={styles.feedHeader}>
          <span className={styles.feedHeaderLead}>
            <span className={cn(styles.feedDot, styles.feedHeaderDot)} />
            Incoming
          </span>
          <span>Example events</span>
        </div>
        <div className={styles.feedViewport}>
          <span className={styles.feedSlot}>
            <span className={styles.feedSlotDot} />
          </span>
          <div className={styles.feedTrack}>
            {rows.map((event, index) => {
              const Icon = event.icon
              return (
                <div key={`${event.title}-${index}`} className={styles.feedRow}>
                  <span className={styles.feedIcon}>
                    <Icon className="size-3.5" strokeWidth={1.75} />
                  </span>
                  <span className={styles.feedText}>
                    <span className={styles.feedTitle}>{event.title}</span>
                    <span className={styles.feedSource}>{event.source}</span>
                  </span>
                  <span className={styles.feedDot} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Stage>
  )
}

/* ---- get seen. ----------------------------------------------------------- */

type Satellite = { name: string; src: string; angle: number }

/** Inner orbit: search, maps, and AI answers. */
const INNER_ORBIT: Satellite[] = [
  { name: 'Google', src: '/logos/svgl/google.svg', angle: 20 },
  { name: 'Google Maps', src: '/logos/svgl/google-maps.svg', angle: 110 },
  { name: 'ChatGPT', src: '/logos/svgl/openai-dark.svg', angle: 200 },
  { name: 'Gemini', src: '/logos/svgl/gemini.svg', angle: 290 },
]

/** Outer orbit: short-form content and ads. */
const OUTER_ORBIT: Satellite[] = [
  { name: 'Instagram', src: '/logos/svgl/instagram.svg', angle: 345 },
  { name: 'TikTok', src: '/logos/svgl/tiktok-dark.svg', angle: 63 },
  { name: 'YouTube', src: '/logos/svgl/youtube.svg', angle: 152 },
  { name: 'Meta', src: '/logos/svgl/meta.svg', angle: 240 },
]

/** Depth on the ellipse: 90deg (bottom) is nearest, 270deg (top) farthest. */
function depth(angle: number) {
  const near = (Math.sin((angle * Math.PI) / 180) + 1) / 2
  return {
    scale: Number((0.88 + 0.12 * near).toFixed(3)),
    opacity: Number((0.7 + 0.3 * near).toFixed(3)),
  }
}

function OrbitPlane({
  items,
  className,
}: {
  items: Satellite[]
  className: string
}) {
  return (
    <div className={cn(styles.plane, className)}>
      {items.map((item) => {
        const { scale, opacity } = depth(item.angle)
        const vars: Vars = {
          '--a': `${item.angle}deg`,
          '--a-num': item.angle,
          '--k': scale,
          '--o': opacity,
        }
        return (
          <div key={item.name} className={styles.satellite} style={vars}>
            <div className={styles.unsquash}>
              <span className={styles.logoTile}>
                <Image src={item.src} alt="" width={18} height={18} />
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Discovery: the platforms people use orbiting your business. */
export function SeenVisual({ className }: { className?: string }) {
  return (
    <Stage className={className}>
      <div className={styles.orbit}>
        <span className={cn(styles.ring, styles.ringOuter)} />
        <span className={cn(styles.ring, styles.ringInner)} />
        <span className={styles.halo} />
        <span className={styles.pulse} />
        <div className={styles.orbitLift}>
          <OrbitPlane items={OUTER_ORBIT} className={styles.planeOuter} />
          <OrbitPlane items={INNER_ORBIT} className={styles.planeInner} />
          <span className={styles.core}>
            <span className={styles.coreIcon}>
              <Store className="size-3" strokeWidth={2} />
            </span>
            your business
          </span>
        </div>
      </div>
    </Stage>
  )
}
