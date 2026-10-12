'use client'

import type { MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ScrollToTimelineButtonProps = {
  className?: string
  label?: string
}

export default function ScrollToTimelineButton({
  className,
  label = 'See the timeline',
}: ScrollToTimelineButtonProps) {
  const scrollToTimeline = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('timeline')
    if (target) {
      event.preventDefault()
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href="#timeline"
      onClick={scrollToTimeline}
      className={cn(buttonVariants({ variant: 'outline', size: 'xl' }), 'group/timeline', className)}
    >
      {label}
      <ArrowDown
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/timeline:translate-y-0.5"
      />
    </a>
  )
}
