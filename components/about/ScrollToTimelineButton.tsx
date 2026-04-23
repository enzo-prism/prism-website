'use client'

import { ArrowDownRight } from 'lucide-react'

import { corePrimaryActionClassName } from '@/components/core-route/CoreRoutePrimitives'
import { cn } from '@/lib/utils'

export default function ScrollToTimelineButton() {
  const scrollToTimeline = () => {
    const target = document.getElementById('timeline')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTimeline}
      className={cn(corePrimaryActionClassName, 'bg-transparent px-0')}
    >
      view timeline <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden />
    </button>
  )
}
