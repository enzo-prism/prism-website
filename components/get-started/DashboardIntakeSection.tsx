import {
  Activity,
  Ban,
  Building2,
  Clock,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
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
    icon: Stethoscope,
    label: 'Built for dental practices',
    sub: 'that want a clearer growth system',
  },
]

const NEGATIONS = ['No sales maze', 'No calendar wall', 'No long brief'] as const

const INTAKE_STEPS: IntakeStep[] = [
  {
    stage: '01',
    label: 'Practice context',
    hint: 'Who you are & where',
    icon: Building2,
  },
  { stage: '02', label: 'Website', hint: 'Your current site', icon: Globe },
  {
    stage: '03',
    label: 'Google Maps',
    hint: 'Local map presence',
    icon: MapPin,
  },
  { stage: '04', label: 'Reviews', hint: 'Reputation signals', icon: Star },
  { stage: '05', label: 'Tracking', hint: 'What you measure', icon: Activity },
  {
    stage: '06',
    label: 'Growth goals',
    hint: 'Where you want to go',
    icon: Target,
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
            title="One short dashboard intake."
            description="About a minute. Just the essentials Prism needs to prepare your free Light Audit."
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
                6 sections
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
                Create Free Growth Dashboard
              </CoreActionLink>
              <p className="flex items-center gap-2 font-mono text-[0.78rem] leading-6 text-[#8C8C85]">
                <ShieldCheck
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#9eff2e]"
                />
                Every real practice submission receives a Light Audit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
