import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
  /** Drop the container (for full-bleed rails). */
  bleed?: boolean
  'aria-labelledby'?: string
  'aria-label'?: string
}

/** Standard vertical rhythm + container for redesigned routes. */
export function Section({
  id,
  className,
  containerClassName,
  children,
  bleed = false,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative py-20 sm:py-24', className)}
      {...aria}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn('prism-container', containerClassName)}>
          {children}
        </div>
      )}
    </section>
  )
}

type EyebrowProps = {
  children: ReactNode
  className?: string
}

/** Mono metadata label with a short spectrum tick. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 text-eyebrow text-subtle',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-5 bg-spectrum" />
      {children}
    </p>
  )
}

type SectionHeaderProps = {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: ElementType
  id?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  /** Optional element placed under the description (links, buttons). */
  children?: ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  id,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'mx-auto items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          'text-title text-gradient max-w-[18ch] text-balance pb-1',
          centered && 'mx-auto',
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'text-lead max-w-[58ch] text-pretty text-muted-foreground',
            centered && 'mx-auto',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

/**
 * Renders a two-sentence headline ("fully booked. here's how to get in.")
 * with each sentence on its own line, so balance never strands a word.
 */
export function SplitTitle({ text }: { text: string }) {
  const parts = text.split(/(?<=\.)\s+/)
  return (
    <>
      {parts.map((part, index) => (
        <span key={part} className="block">
          {part}
          {index < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}
