"use client"

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"

import { trackLinkInteraction } from "@/utils/analytics"

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  label: string
  location: string
  children: ReactNode
}

const TrackedAnchor = forwardRef<HTMLAnchorElement, TrackedAnchorProps>(
  function TrackedAnchor(
    { href, label, location, children, onClick, ...props },
    ref,
  ) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={(event) => {
          trackLinkInteraction(href, label, location)
          onClick?.(event)
        }}
        {...props}
      >
        {children}
      </a>
    )
  },
)

export default TrackedAnchor
