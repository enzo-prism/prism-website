'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/utils/analytics'

interface CopyBlogMarkdownButtonProps {
  slug: string
  className?: string
}

async function copyText(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  if (typeof document === 'undefined') {
    throw new Error('Clipboard API is unavailable')
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error('Fallback clipboard copy failed')
  }
}

export default function CopyBlogMarkdownButton({
  slug,
  className,
}: CopyBlogMarkdownButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const markdownSourceRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const getMarkdownSource = async () => {
    if (markdownSourceRef.current) {
      return markdownSourceRef.current
    }

    const response = await fetch(`/api/blog/${slug}/markdown`, {
      method: 'GET',
      headers: { Accept: 'text/plain' },
      cache: 'force-cache',
    })

    if (!response.ok) {
      throw new Error(`Failed to load markdown source (${response.status})`)
    }

    const markdownSource = await response.text()
    if (!markdownSource.trim()) {
      throw new Error('Markdown source was empty')
    }

    markdownSourceRef.current = markdownSource
    return markdownSource
  }

  const handleCopy = async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    try {
      const markdownSource = await getMarkdownSource()
      await copyText(markdownSource)
      setCopied(true)
      toast.success('full post markdown copied')
      trackCTAClick('blog copy markdown', `blog/${slug}`)

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
      resetTimerRef.current = setTimeout(() => setCopied(false), 2200)
    } catch (error) {
      console.error('[CopyBlogMarkdownButton] failed to copy markdown', error)
      toast.error("couldn't copy markdown")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={handleCopy}
      className={cn(
        'min-h-11 rounded-md border-border/70 px-3 text-[10px] sm:text-[11px]',
        copied && 'border-primary/70 bg-primary/15 text-primary',
        className,
      )}
      aria-label="Copy full blog post in markdown format"
      disabled={isLoading}
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      <span>{isLoading ? 'Loading markdown' : copied ? 'Markdown copied' : 'Copy markdown'}</span>
    </Button>
  )
}
