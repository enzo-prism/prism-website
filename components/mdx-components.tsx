import type { AnchorHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import PixelishIcon from "@/components/pixelish/PixelishIcon"

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
      ? "mdx-cta mdx-cta-secondary border border-neutral-900 text-neutral-900 hover:bg-neutral-100 focus-visible:outline-neutral-400 dark:border-white dark:text-white dark:hover:bg-white/10"
      : "mdx-cta bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses,
        block && "w-full sm:w-auto",
        className,
      )}
    >
      {children}
    </a>
  )
}

const isExternalUrl = (href?: string) => /^https?:\/\//i.test(href ?? "")

const MDXAnchor = ({
  href = "",
  children,
  target,
  rel,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const external = isExternalUrl(href)
  return (
    <a
      href={href}
      target={target ?? (external ? "_blank" : undefined)}
      rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      {...props}
    >
      {children}
    </a>
  )
}

export const MDXComponents = {
  // Typography components
  a: MDXAnchor,
  Lead: ({ children, className }: { children: ReactNode; className?: string }) => (
    <p className={cn("text-lg leading-relaxed text-neutral-700 dark:text-neutral-300", className)}>
      {children}
    </p>
  ),
  
  // List components
  CheckList: ({ children }: { children: ReactNode }) => (
    <ul className="space-y-3 my-6">
      {children}
    </ul>
  ),
  
  CheckItem: ({ children }: { children: ReactNode }) => (
    <li className="flex gap-3">
      <PixelishIcon
        src="/pixelish/checkmark.svg"
        alt=""
        size={16}
        invert={false}
        aria-hidden="true"
        className="mt-0.5 opacity-90 dark:invert"
      />
      <span>{children}</span>
    </li>
  ),
  
  // Callout/highlight boxes
  Callout: ({ 
    children, 
    type = "info" 
  }: { 
    children: ReactNode; 
    type?: "info" | "warning" | "success" | "error" 
  }) => {
    const styles = {
      info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
      success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
    }
    
    return (
      <div className={cn("p-4 my-6 border rounded-lg", styles[type])}>
        {children}
      </div>
    )
  },
  
  // Section divider
  Divider: () => <hr className="my-12 border-neutral-200 dark:border-neutral-800" />,
  SectionBreak: ({ label }: { label?: string }) => (
    <div className="my-12 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
      <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      {label ? (
        <span>{label}</span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" aria-hidden />
      )}
      <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
    </div>
  ),
  
  CTAButton,
  // CTA component
  BlogCTA: ({ 
    title, 
    description, 
    buttonText,
    href = "/get-started" 
  }: { 
    title: string; 
    description: string; 
    buttonText?: string;
    href?: string;
  }) => (
    <div className="my-12 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">{description}</p>
      <CTAButton href={href}>
        {href?.startsWith("/get-started") ? FREE_AUDIT_CTA_TEXT : buttonText ?? FREE_AUDIT_CTA_TEXT}
      </CTAButton>
    </div>
  ),
  
  // Video embed component
  VideoEmbed: ({ 
    src, 
    title 
  }: { 
    src: string; 
    title: string;
  }) => (
    <div className="my-12">
      <div className="relative overflow-hidden rounded-xl shadow-md" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
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
    cols = 2 
  }: { 
    children: ReactNode; 
    cols?: 2 | 3 | 4;
  }) => (
    <div className={cn(
      "grid gap-4 my-6",
      cols === 2 && "md:grid-cols-2",
      cols === 3 && "md:grid-cols-3",
      cols === 4 && "md:grid-cols-4"
    )}>
      {children}
    </div>
  ),
  
  // Card component for grid items
  Card: ({ 
    title, 
    children 
  }: { 
    title?: string; 
    children: ReactNode;
  }) => (
    <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg">
      {title && <h4 className="font-semibold mb-2">{title}</h4>}
      <div className="text-neutral-600 dark:text-neutral-400">{children}</div>
    </div>
  ),
}

export default MDXComponents
