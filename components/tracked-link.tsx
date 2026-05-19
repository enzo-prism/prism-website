'use client'

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import Link from 'next/link'

import { trackLinkInteraction } from '@/utils/analytics'

interface TrackedLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick'
> {
  href: string
  label: string
  location: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}

const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { href, label, location, onClick, children, ...anchorProps },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        {...anchorProps}
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
