'use client'

import { ArrowDownRight } from 'lucide-react'

import { corePrimaryActionClassName } from '@/components/core-route/CoreRoutePrimitives'
import { cn } from '@/lib/utils'

export default function ScrollToTimelineButton() {
  const scrollToTimeline = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('timeline')
    if (target) {
      event.preventDefault()
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href="#timeline"
      onClick={scrollToTimeline}
      className={cn(corePrimaryActionClassName, 'bg-transparent px-0')}
    >
      view timeline <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden />
    </a>
  )
}
