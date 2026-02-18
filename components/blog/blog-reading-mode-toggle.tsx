'use client'

import { useEffect, useState } from 'react'
import { Type } from 'lucide-react'

import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'prism-blog-reading-mode'
const ROOT_CLASS = 'blog-reading-mode'

export default function BlogReadingModeToggle() {
  const [isReadingMode, setIsReadingMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem(STORAGE_KEY)
    const enabled = stored === '1'
    setIsReadingMode(enabled)

    if (enabled) {
      window.document.documentElement.classList.add(ROOT_CLASS)
    }
  }, [])

  const updateReadingMode = (next: boolean) => {
    setIsReadingMode(next)
    window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    window.document.documentElement.classList.toggle(ROOT_CLASS, next)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={() => updateReadingMode(!isReadingMode)}
      className="min-h-11 rounded-md border-border/70 px-3 text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground"
      aria-pressed={isReadingMode}
      aria-label={isReadingMode ? 'Exit reading mode' : 'Enable reading mode'}
    >
      <Type className="h-3.5 w-3.5" aria-hidden />
      <span>{isReadingMode ? 'Reading mode on' : 'Reading mode'}</span>
    </Button>
  )
}
