'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Check } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { cn } from '@/lib/utils'

import { MACH1_STACK, type Mach1Tool } from './content'
import { SceneViewport } from './SceneViewport'
import {
  ContentEngineScene,
  GrowthPlanScene,
  InterviewVaultScene,
  ReviewRoomScene,
} from './scenes'

const SCENES: Record<Mach1Tool['key'], ComponentType> = {
  content: ContentEngineScene,
  vault: InterviewVaultScene,
  review: ReviewRoomScene,
  plan: GrowthPlanScene,
}

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * "the tools behind the launch." On lg+ the four tools scroll past on the
 * left while one sticky stage on the right crossfades to the active tool's
 * scene (a rail marks progress). Below lg every tool carries its own scene
 * inline. Server HTML shows the first scene, so no-JS visitors get a
 * complete section.
 */
export function Mach1Stack() {
  const tools: readonly Mach1Tool[] = MACH1_STACK.tools
  const [active, setActive] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (Number.isFinite(index)) setActive(index)
        }
      },
      // A thin band across the middle of the viewport picks the tool.
      { rootMargin: '-48% 0px -48% 0px' },
    )
    for (const node of itemRefs.current) if (node) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const goTo = (index: number) => {
    const node = itemRefs.current[index]
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <Section
      id="growth-stack"
      aria-labelledby="mach1-stack-title"
      className="scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(40%_60%_at_80%_0%,oklch(0.63_0.19_295/14%),transparent_70%)]"
      />
      <Reveal>
        <SectionHeader
          id="mach1-stack-title"
          eyebrow={MACH1_STACK.eyebrow}
          title={MACH1_STACK.title}
          description={MACH1_STACK.description}
        />
      </Reveal>

      <div className="mt-14 sm:mt-16 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 xl:gap-20">
        <ol className="relative">
          {/* Progress rail: one segment slides to the active tool (lg+). */}
          <span
            aria-hidden="true"
            className="absolute bottom-[12vh] left-0 top-[12vh] hidden w-px bg-white/[0.08] lg:block"
          >
            <span
              className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-spectrum-violet/0 via-spectrum-violet to-spectrum-violet/0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ transform: `translateY(${active * 100}%)` }}
            />
          </span>

          {tools.map((tool, index) => {
            const Scene = SCENES[tool.key]
            const isActive = index === active
            return (
              <li
                key={tool.key}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                data-index={index}
                className="border-t border-white/[0.06] py-12 first:border-t-0 first:pt-0 sm:py-14 lg:flex lg:min-h-[76vh] lg:items-center lg:border-t-0 lg:py-0 lg:pl-10 xl:pl-12"
              >
                <article
                  aria-labelledby={`mach1-tool-${tool.key}`}
                  className={cn(
                    'w-full transition-opacity duration-500 motion-reduce:transition-none',
                    'lg:opacity-60',
                    isActive && 'lg:opacity-100',
                  )}
                >
                  <p className="flex items-center gap-3 font-mono text-[12px] tabular-nums tracking-[0.14em] text-subtle">
                    <span>{pad(index + 1)}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-white/15" />
                    <span className="uppercase">{tool.name}</span>
                  </p>
                  <h3
                    id={`mach1-tool-${tool.key}`}
                    className="mt-5 max-w-[16ch] text-balance text-[2rem] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-[2.5rem]"
                  >
                    {tool.title}
                  </h3>
                  <p className="mt-5 max-w-[48ch] text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base">
                    {tool.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {tool.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[14px] leading-6 text-foreground/85"
                      >
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
                          <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  {tool.fact ? (
                    <p className="mt-7 inline-flex items-baseline gap-3 rounded-xl border border-white/[0.08] bg-card px-4 py-3">
                      <span className="text-3xl font-semibold tabular-nums tracking-[-0.04em] text-foreground">
                        {tool.fact.value}
                      </span>
                      <span className="text-[13px] leading-5 text-muted-foreground">
                        {tool.fact.label}
                      </span>
                    </p>
                  ) : null}

                  <div className="mt-10 lg:hidden">
                    <SceneViewport label={tool.sceneLabel}>
                      <Scene />
                    </SceneViewport>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[max(calc(var(--prism-header-height,64px)+2rem),calc(50vh-19rem))]">
            <div className="grid">
              {tools.map((tool, index) => {
                const Scene = SCENES[tool.key]
                const isActive = index === active
                return (
                  <div
                    key={tool.key}
                    aria-hidden={!isActive}
                    className="self-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:1/1] motion-reduce:transition-none"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'none'
                        : `translateY(${index < active ? -18 : 18}px) scale(0.98)`,
                      pointerEvents: isActive ? undefined : 'none',
                    }}
                  >
                    <SceneViewport label={tool.sceneLabel} active={isActive}>
                      <Scene />
                    </SceneViewport>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex gap-1.5" role="group" aria-label="Jump to a tool">
                {tools.map((tool, index) => (
                  <button
                    key={tool.key}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={index === active ? 'true' : undefined}
                    className={cn(
                      'h-8 rounded-full border px-3 text-[12px] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                      index === active
                        ? 'border-white/20 bg-white/[0.08] text-foreground'
                        : 'border-transparent text-subtle hover:text-foreground',
                    )}
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-[60ch] text-[13px] leading-5 text-subtle lg:mt-4">
        {MACH1_STACK.note}
      </p>
    </Section>
  )
}
