"use client"

import type { MouseEventHandler, ReactNode } from "react"
import Link from "next/link"

import { trackCTAClick } from "@/utils/analytics"

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

export default function TrackedLink({
  href,
  label,
  location,
  className,
  target,
  rel,
  onClick,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={(event) => {
        trackCTAClick(label, location)
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
