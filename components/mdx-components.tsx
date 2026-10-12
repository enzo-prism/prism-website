import type { AnchorHTMLAttributes, ReactNode } from "react"
import { isValidElement } from "react"
import { AlertTriangle, ArrowRight, Check, CircleCheck, CircleX, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

type CTAButtonProps = {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary"
  target?: string
  rel?: string
  className?: string
  block?: boolean
}

const CTAButton = ({
  href,
  children,
  variant = "primary",
  target,
  rel,
  className,
  block = false,
}: CTAButtonProps) => {
  const isExternal = href?.startsWith("http")
  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined)
  const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined)

  const variantClasses =
    variant === "secondary"
      ? "mdx-cta mdx-cta-secondary border border-border bg-white/[0.03] text-foreground hover:border-white/20 hover:bg-white/[0.07]"
      : "mdx-cta bg-primary text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/40%)_inset,0_8px_24px_-12px_oklch(1_0_0/45%)] hover:bg-primary/90"

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn(
        "group/mdx-cta inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] no-underline transition-[color,background-color,border-color] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        variantClasses,
        block && "w-full sm:w-auto",
        className,
      )}
    >
      {children}
      {variant === "primary" ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/mdx-cta:translate-x-0.5"
        />
      ) : null}
    </a>
  )
}

const isExternalUrl = (href?: string) => /^https?:\/\//i.test(href ?? "")

const toPlainText = (node: ReactNode): string => {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (!node) return ""

  if (Array.isArray(node)) {
    return node.map(toPlainText).join(" ")
  }

  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode })?.children
    return toPlainText(children)
  }

  return ""
}

const MDXAnchor = ({
  href = "",
  children,
  target,
  rel,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const external = isExternalUrl(href)
  const explicitAriaLabel = (props as { "aria-label"?: string })["aria-label"]
  const computedLabel =
    external && !explicitAriaLabel
      ? `${toPlainText(children)} (opens in a new tab)`
      : explicitAriaLabel

  return (
    <a
      {...props}
      href={href}
      target={target ?? (external ? "_blank" : undefined)}
      rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      aria-label={computedLabel}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}

const CALLOUT_STYLES = {
  info: { icon: Info, accent: "bg-spectrum-blue", iconClass: "text-spectrum-blue" },
  warning: { icon: AlertTriangle, accent: "bg-spectrum-yellow", iconClass: "text-spectrum-yellow" },
  success: { icon: CircleCheck, accent: "bg-spectrum-green", iconClass: "text-spectrum-green" },
  error: { icon: CircleX, accent: "bg-spectrum-red", iconClass: "text-spectrum-red" },
} as const

export const MDXComponents = {
  // Typography components
  a: MDXAnchor,
  Lead: ({ children, className }: { children: ReactNode; className?: string }) => (
    <p className={cn("text-[1.2em] leading-[1.6] tracking-[-0.015em] text-foreground", className)}>
      {children}
    </p>
  ),

  // List components
  CheckList: ({ children }: { children: ReactNode }) => (
    <ul className="my-6 list-none! pl-0!">{children}</ul>
  ),

  CheckItem: ({ children }: { children: ReactNode }) => (
    <li className="flex gap-3 pl-0!">
      <span
        aria-hidden="true"
        className="mt-[0.35em] grid size-5 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.05]"
      >
        <Check className="size-3 text-foreground" strokeWidth={2.25} />
      </span>
      <span>{children}</span>
    </li>
  ),

  // Callout/highlight boxes
  Callout: ({
    children,
    type = "info",
  }: {
    children: ReactNode
    type?: "info" | "warning" | "success" | "error"
  }) => {
    const style = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info
    const Icon = style.icon
    return (
      <div className="relative my-8 flex gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-5 text-[0.95em] sm:p-6 [&>div>*:first-child]:mt-0 [&>div>*:last-child]:mb-0">
        <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-0.5 opacity-80", style.accent)} />
        <Icon aria-hidden="true" className={cn("mt-1 size-4 shrink-0", style.iconClass)} />
        <div className="min-w-0">{children}</div>
      </div>
    )
  },

  // Section divider
  Divider: () => <hr className="my-14 h-px border-0 bg-white/[0.1]" />,
  SectionBreak: ({ label }: { label?: string }) => (
    <div className="my-14 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
      <span className="h-px flex-1 bg-white/[0.1]" />
      {label ? (
        <span>{label}</span>
      ) : (
        <span className="size-1.5 rounded-full bg-white/25" aria-hidden />
      )}
      <span className="h-px flex-1 bg-white/[0.1]" />
    </div>
  ),

  CTAButton,
  // CTA component
  BlogCTA: ({
    title,
    description,
    buttonText,
    href = "/waitlist",
  }: {
    title: string
    description: string
    buttonText?: string
    href?: string
  }) => (
    <div className="relative my-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-card p-7 sm:p-9">
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 h-px bg-spectrum opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(50%_60%_at_25%_100%,oklch(0.66_0.21_29/14%),transparent_70%),radial-gradient(50%_60%_at_75%_100%,oklch(0.66_0.16_258/16%),transparent_70%)]"
      />
      <div className="relative">
        <h3 className="mb-2! mt-0! text-xl! font-semibold tracking-[-0.02em] text-foreground">{title}</h3>
        <p className="mb-6! mt-0! text-muted-foreground">{description}</p>
        <CTAButton href={href}>
          {href?.startsWith("/waitlist") ? FREE_AUDIT_CTA_TEXT : buttonText ?? FREE_AUDIT_CTA_TEXT}
        </CTAButton>
      </div>
    </div>
  ),

  // Video embed component
  VideoEmbed: ({
    src,
    title,
  }: {
    src: string
    title: string
  }) => (
    <div className="my-12">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute left-0 top-0 h-full w-full border-0"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  ),

  // Grid layout for comparison or features
  Grid: ({
    children,
    cols = 2,
  }: {
    children: ReactNode
    cols?: 2 | 3 | 4
  }) => (
    <div
      className={cn(
        "my-8 grid gap-4",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-3",
        cols === 4 && "md:grid-cols-4",
      )}
    >
      {children}
    </div>
  ),

  // Card component for grid items
  Card: ({
    title,
    children,
  }: {
    title?: string
    children: ReactNode
  }) => (
    <div className="rounded-2xl border border-white/[0.08] bg-card p-5 text-[0.95em] [&>div>*:first-child]:mt-0 [&>div>*:last-child]:mb-0">
      {title && <h4 className="mb-2! mt-0! font-semibold text-foreground">{title}</h4>}
      <div className="text-muted-foreground">{children}</div>
    </div>
  ),
}

export default MDXComponents
