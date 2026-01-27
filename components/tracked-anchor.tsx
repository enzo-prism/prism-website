"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"

import { trackCTAClick } from "@/utils/analytics"

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  label: string
  location: string
  children: ReactNode
}

export default function TrackedAnchor({
  href,
  label,
  location,
  children,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackCTAClick(label, location)
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
