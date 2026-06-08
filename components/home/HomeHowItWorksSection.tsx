import { Route, ScanSearch, Send, type LucideIcon } from 'lucide-react'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  HOMEPAGE_HOW_IT_WORKS,
  HOMEPAGE_HOW_IT_WORKS_STEPS,
} from '@/components/home/homepage-content'

import styles from './HomeHowItWorksSection.module.css'

// Icons map to each step by position: submit → review → plan.
const STEP_ICONS: LucideIcon[] = [Send, ScanSearch, Route]

export default function HomeHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-section="how-it-works"
      className={coreRouteSectionClassName}
    >
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteContainedSectionClassName}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <CoreSectionHeading
              eyebrow="Get started in 3 steps"
              title={HOMEPAGE_HOW_IT_WORKS.title}
              titleClassName="max-w-[16ch] lg:max-w-[18ch]"
            />

            <CoreActionLink
              href="/get-started"
              label="get a free growth audit"
              location="homepage how it works"
              className="text-[0.72rem] tracking-[0.12em] sm:text-sm sm:tracking-[0.18em]"
            >
              {HOMEPAGE_HOW_IT_WORKS.ctaLabel}
            </CoreActionLink>
          </div>

          <ol className={`mt-12 ${styles.flow}`}>
            <span className={styles.rail} aria-hidden="true">
              <span className={styles.railPulse} />
            </span>

            {HOMEPAGE_HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Send
              return (
                <li
                  key={step.title}
                  className={styles.step}
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  <div className={styles.track}>
                    <span className={styles.node}>
                      <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                      <span className={styles.badge}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className={styles.line} aria-hidden="true" />
                  </div>

                  <div className={styles.copy}>
                    <h3 className="font-sans text-[1.45rem] font-medium leading-[1.04] tracking-[-0.05em] text-[#f5f0e8]">
                      {step.title}
                    </h3>
                    {step.description ? (
                      <p className="mt-3 font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
