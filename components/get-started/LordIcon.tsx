'use client'

import { createElement } from 'react'

// The Lordicon animation library registers a <lord-icon> custom element at
// runtime (loaded once per page via next/script). We render it through
// createElement so we don't need to augment JSX's intrinsic element types.
type LordIconProps = {
  src: string
  trigger?: string
  delay?: string
}

export function LordIcon({ src, trigger = 'loop', delay = '2000' }: LordIconProps) {
  return createElement('lord-icon', {
    src,
    trigger,
    delay,
    'aria-hidden': true,
    style: { width: '100%', height: '100%' },
  })
}
