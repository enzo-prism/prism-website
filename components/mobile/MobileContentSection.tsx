import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface MobileContentSectionProps {
  children: ReactNode
  title?: string
  subtitle?: string
  variant?: "default" | "emphasized" | "compact"
  className?: string
  /** Kept for API compatibility; sections render as their finished frame. */
  animationDelay?: number
}

const variantStyles = {
  default: {
    container: "my-10",
    title: "",
    subtitle: "text-lg leading-8 text-muted-foreground",
    content: "flex flex-col gap-6",
  },
  emphasized: {
    container: "my-10 rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-8",
    title: "mt-0!",
    subtitle: "text-lg leading-8 text-muted-foreground",
    content: "flex flex-col gap-6",
  },
  compact: {
    container: "my-8",
    title: "text-xl!",
    subtitle: "text-base leading-7 text-muted-foreground",
    content: "flex flex-col gap-4",
  },
}

/**
 * Long-form section wrapper used inside MDX posts. Renders inside the blog
 * prose column, so headings and paragraphs inherit the reading styles; the
 * wrapper only adds rhythm and an optional emphasized card.
 */
export function MobileContentSection({
  children,
  title,
  subtitle,
  variant = "default",
  className = "",
}: MobileContentSectionProps) {
  const styles = variantStyles[variant]

  return (
    <section className={cn(styles.container, className)}>
      {title && <h2 className={cn("text-foreground", styles.title)}>{title}</h2>}

      {subtitle && <p className={cn("mb-6! mt-0!", styles.subtitle)}>{subtitle}</p>}

      <div className={styles.content}>{children}</div>
    </section>
  )
}

interface MobileParagraphProps {
  children: ReactNode
  className?: string
  emphasized?: boolean
}

/**
 * Paragraph block for MDX. Renders a div because MDX already wraps the inner
 * text in its own <p>; a <p> wrapper here produced invalid <p><p> nesting.
 */
export function MobileParagraph({
  children,
  className = "",
  emphasized = false
}: MobileParagraphProps) {
  return (
    <div
      className={cn(
        "[&_p]:my-0!",
        emphasized
          ? "text-[1.15em] leading-[1.65] tracking-[-0.012em] text-foreground"
          : "text-foreground/[0.82]",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface MobileListProps {
  items?: string[]
  type?: "bullet" | "numbered"
  className?: string
}

export function MobileList({
  items = [],
  type = "bullet",
  className = ""
}: MobileListProps) {
  // next-mdx-remote strips JS expression props (blockJS), so MDX array props
  // can arrive empty. Render nothing rather than an empty list.
  if (!items.length) return null

  const ListTag = type === "numbered" ? "ol" : "ul"

  return (
    <ListTag className={cn("my-0! flex list-none! flex-col gap-3 pl-0!", className)}>
      {items.map((item, index) => (
        <li key={index} className="my-0! flex items-start gap-3 pl-0!">
          {type === "bullet" ? (
            <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-white/40" />
          ) : (
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-white/10 font-mono text-[11px] text-muted-foreground"
            >
              {index + 1}
            </span>
          )}
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ListTag>
  )
}

interface MobileHeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4
  className?: string
}

export function MobileHeading({
  children,
  level = 2,
  className = ""
}: MobileHeadingProps) {
  const levelStyles = {
    1: "text-3xl mb-6",
    2: "text-2xl mb-4",
    3: "text-xl mb-3",
    4: "text-lg mb-2"
  }

  const componentTag = `h${level}` as keyof React.JSX.IntrinsicElements

  return React.createElement(
    componentTag,
    {
      className: cn("font-semibold leading-tight text-foreground", levelStyles[level], className),
    },
    children,
  )
}
