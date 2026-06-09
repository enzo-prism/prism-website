import {
  Ban,
  Building2,
  Clock,
  Globe,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { cn } from '@/lib/utils'

import styles from './get-started-page.module.css'

type TrustSignal = {
  icon: LucideIcon
  label: string
  sub?: string
}

type IntakeStep = {
  stage: string
  label: string
  hint: string
  icon: LucideIcon
}

const TRUST_SIGNALS: TrustSignal[] = [
  { icon: Sparkles, label: 'Free to start' },
  { icon: UserCheck, label: 'Reviewed by a real person' },
  {
    icon: Building2,
    label: 'Built for growth-focused companies',
    sub: 'including dental, retail, consulting, nonprofit, hospitality, and local service teams',
  },
]

const NEGATIONS = ['No sales maze', 'No calendar wall', 'No long brief'] as const

const INTAKE_STEPS: IntakeStep[] = [
  {
    stage: '01',
    label: 'Focus',
    hint: 'What needs work',
    icon: Target,
  },
  { stage: '02', label: 'Link', hint: 'Site or profile', icon: Globe },
  {
    stage: '03',
    label: 'Fit',
    hint: 'Budget & timing',
    icon: Clock,
  },
  {
    stage: '04',
    label: 'Business',
    hint: 'Name only',
    icon: Building2,
  },
  {
    stage: '05',
    label: 'Contact',
    hint: 'Where to send it',
    icon: UserCheck,
  },
  {
    stage: '06',
    label: 'Review',
    hint: 'Submit when ready',
    icon: ShieldCheck,
  },
]

export default function DashboardIntakeSection() {
  return (
    <section
      id="book-call"
      className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div
        className={cn(
          coreRouteContainerClassName,
          'grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12',
        )}
      >
        <div className="space-y-8">
          <CoreSectionHeading
            title="One short intake."
            description="About a minute. Just the essentials Prism needs to prepare your free Growth Audit — delivered in your own free Growth Dashboard."
            titleClassName="max-w-[13ch]"
          />

          <div className={styles.quickIntakeBadge}>
            <span className={styles.quickIntakeDial}>
              <Clock aria-hidden="true" size={26} strokeWidth={1.6} />
            </span>
            <span className={styles.quickIntakeText}>
              <span>Quick intake</span>
              <span>≈ 1 minute</span>
            </span>
          </div>

          <ul className="space-y-3 border-t border-white/10 pt-6">
            {TRUST_SIGNALS.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className={styles.trustIcon}>
                  <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
                </span>
                <p className="font-sans text-[0.98rem] leading-6 text-[#D6D6CF]">
                  {label}
                  {sub ? (
                    <span className="text-[#8C8C85]"> {sub}</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            styles.sectionFrame,
            styles.scanlines,
            'relative overflow-hidden border border-white/10 bg-[#070707] px-6 py-7 sm:px-8 sm:py-8',
          )}
        >
          <div className={styles.noiseField} aria-hidden="true" />
          <span className={styles.corner} data-corner="tl" aria-hidden="true" />
          <span className={styles.corner} data-corner="tr" aria-hidden="true" />
          <span className={styles.corner} data-corner="bl" aria-hidden="true" />
          <span className={styles.corner} data-corner="br" aria-hidden="true" />

          <div className="relative z-10 space-y-7">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[#9CF4A7]">
                What you&rsquo;ll cover
              </p>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#767670]">
                6 steps
              </p>
            </div>

            <ul className={styles.intakeGrid}>
              {INTAKE_STEPS.map(({ stage, label, hint, icon: Icon }, index) => (
                <li
                  key={label}
                  className={styles.intakeCard}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className={styles.intakeIcon}>
                      <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#767670]">
                      {stage}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans text-[0.98rem] font-medium leading-6 text-[#EDEDE7]">
                      {label}
                    </p>
                    <p className="font-mono text-[0.72rem] leading-5 text-[#8C8C85]">
                      {hint}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-6">
              {NEGATIONS.map((negation) => (
                <span key={negation} className={styles.negChip}>
                  <Ban aria-hidden="true" size={14} strokeWidth={1.8} />
                  {negation}
                </span>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <CoreActionLink
                href="/apply"
                label="create free growth dashboard"
                location="get started entry cta"
              >
                Start my free growth audit
              </CoreActionLink>
              <p className="flex items-center gap-2 font-mono text-[0.78rem] leading-6 text-[#8C8C85]">
                <ShieldCheck
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#9eff2e]"
                />
                Every real business submission receives a Growth Audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
