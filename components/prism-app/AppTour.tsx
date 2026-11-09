'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

import { PhoneFrame } from '@/components/case-studies/PhoneFrame'
import type { PrismAppTourStep } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

type AppTourProps = {
  steps: readonly PrismAppTourStep[]
}

/**
 * Scroll-driven tour of the app. On desktop one sticky phone crossfades
 * between screens as each step reaches the middle of the viewport; on smaller
 * screens every step carries its own phone. The base state is the first
 * screen with every step fully visible, so no-JS, reduced-motion, and
 * crawlers get the complete content.
 */
export function AppTour({ steps }: AppTourProps) {
  const [active, setActive] = useState(0)
  const [tracking, setTracking] = useState(false)
  const stepRefs = useRef<Array<HTMLLIElement | null>>([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        setTracking(true)
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    for (const node of stepRefs.current) {
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-12 grid gap-16 lg:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
      <ol className="flex flex-col gap-16 lg:gap-0">
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={(node) => {
              stepRefs.current[index] = node
            }}
            data-index={index}
            className={cn(
              'flex flex-col justify-center transition-opacity duration-300 motion-reduce:transition-none lg:min-h-[78svh]',
              tracking && index !== active && 'lg:opacity-40',
            )}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              <span className="tabular-nums">0{index + 1}</span>
              <span className="ml-3">{step.label}</span>
            </p>
            <h3 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.875rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
              {step.title}
            </h3>
            <p className="mt-4 max-w-[46ch] text-pretty text-[1.0625rem] leading-7 text-muted-foreground">
              {step.body}
            </p>
            <ul className="mt-6 flex max-w-[46ch] flex-col gap-2.5">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[15px] leading-6 text-muted-foreground"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-subtle"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <PhoneFrame
              src={step.image}
              alt={step.alt}
              sizes="(min-width: 640px) 300px, 72vw"
              className="mx-auto mt-10 w-[72vw] max-w-[300px] lg:hidden"
            />
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-24 flex min-h-[calc(100svh-7rem)] items-center justify-center">
          <div className="relative w-[min(21rem,calc((100svh-9rem)*0.46))]">
            {steps.map((step, index) => (
              <PhoneFrame
                key={step.id}
                src={step.image}
                alt={step.alt}
                sizes="336px"
                className={cn(
                  'transition-opacity duration-500 motion-reduce:transition-none',
                  index > 0 && 'absolute inset-0',
                  index === active ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppTour
