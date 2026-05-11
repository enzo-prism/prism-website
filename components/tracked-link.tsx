"use client"

import { forwardRef, type MouseEventHandler, type ReactNode } from "react"
import Link from "next/link"

import { trackLinkInteraction } from "@/utils/analytics"

interface TrackedLinkProps {
  href: string
  label: string
  location: string
  className?: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}

const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { href, label, location, className, target, rel, onClick, children },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        className={className}
        target={target}
        rel={rel}
        onClick={(event) => {
          trackLinkInteraction(href, label, location)
          onClick?.(event)
        }}
      >
        {children}
      </Link>
    )
  },
)

export default TrackedLink
