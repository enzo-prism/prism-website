'use client'

import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'

import TrackedAnchor from '@/components/tracked-anchor'
import {
  CHATGPT_ADS_COOKIE,
  CHATGPT_ADS_COOKIE_MAX_AGE_SECONDS,
  CHATGPT_ADS_STORAGE_KEY,
  parseInviteSession,
  serializeInviteSession,
  type ChatGptAdsInvite,
} from '@/lib/chatgpt-ads'
import { BOOK_A_CALL_CTA } from '@/lib/pricing-model'
import { trackEvent } from '@/utils/analytics'

const cardClass =
  'relative overflow-hidden rounded-[1.75rem] bg-card p-6 text-card-foreground ring-1 ring-foreground/10 shadow-[0_1px_2px_rgb(16_16_16/0.05),0_22px_56px_-26px_rgb(16_16_16/0.25),0_56px_100px_-48px_rgb(16_16_16/0.28)] sm:p-8'

const markClass =
  'inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cga-accent)'

function readStoredInvite(): ChatGptAdsInvite | null {
  if (typeof window === 'undefined') return null

  const fromStorage = parseInviteSession(
    window.sessionStorage.getItem(CHATGPT_ADS_STORAGE_KEY),
  )
  if (fromStorage) return fromStorage

  const cookie = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${CHATGPT_ADS_COOKIE}=`))
  if (!cookie) return null

  const raw = decodeURIComponent(cookie.slice(CHATGPT_ADS_COOKIE.length + 1))
  return parseInviteSession(raw)
}

function persistInvite(invite: ChatGptAdsInvite) {
  const serialized = serializeInviteSession(invite)
  window.sessionStorage.setItem(CHATGPT_ADS_STORAGE_KEY, serialized)
  document.cookie = `${CHATGPT_ADS_COOKIE}=${encodeURIComponent(serialized)}; path=/; max-age=${CHATGPT_ADS_COOKIE_MAX_AGE_SECONDS}; samesite=lax`
}

type UnlockResponse =
  | { ok: true; invite: ChatGptAdsInvite }
  | { ok: false; error?: string }

type ChatGptAdsAccessProps = {
  initialInvite?: ChatGptAdsInvite | null
  initialError?: string | null
}

export default function ChatGptAdsAccess({
  initialInvite = null,
  initialError = null,
}: ChatGptAdsAccessProps) {
  const inputId = useId()
  const pendingRef = useRef(false)
  const [code, setCode] = useState('')
  const [invite, setInvite] = useState<ChatGptAdsInvite | null>(initialInvite)
  const [error, setError] = useState<string | null>(initialError)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (initialInvite) {
      persistInvite(initialInvite)
      return
    }

    const stored = readStoredInvite()
    if (stored) setInvite(stored)
  }, [initialInvite])

  async function submitCode(nextCode: string) {
    const trimmed = nextCode.trim()
    if (!trimmed) {
      setError('Enter the invite code you were given.')
      return
    }

    if (pendingRef.current) return
    pendingRef.current = true
    setPending(true)
    setError(null)

    try {
      const response = await fetch('/api/chatgpt-ads/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      })
      const payload = (await response.json()) as UnlockResponse

      if (!response.ok || !payload.ok) {
        setError(
          !payload.ok && payload.error
            ? payload.error
            : 'That code is not recognized.',
        )
        return
      }

      persistInvite(payload.invite)
      setInvite(payload.invite)
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        if (url.searchParams.has('code')) {
          url.searchParams.delete('code')
          const query = url.searchParams.toString()
          window.history.replaceState(
            {},
            '',
            `${url.pathname}${query ? `?${query}` : ''}${url.hash || '#access'}`,
          )
        }
        document.getElementById('access')?.scrollIntoView({
          block: 'start',
        })
      }
      trackEvent('cta_click', {
        cta_name: 'chatgpt_ads_unlock',
        location: 'chatgpt_ads',
      })
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      pendingRef.current = false
      setPending(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    const formData = new FormData(event.currentTarget)
    const fromForm = String(formData.get('code') ?? '').trim()
    void submitCode(fromForm || code)
  }

  if (invite) {
    return (
      <div className={cardClass}>
        <div className="absolute inset-x-0 top-0 h-1 bg-(--cga-accent)" />
        <p className={markClass}>
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-(--cga-accent) text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          Unlocked
        </p>
        <h2 className="mt-4 text-[clamp(1.85rem,3vw,2.5rem)] font-medium leading-[1.06] tracking-[-0.04em] text-balance">
          You&apos;re in.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          Your invitation is verified. Book 30 minutes with Enzo to decide
          whether ChatGPT ads fit your offer and what Prism should build next.
        </p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
          <span
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground"
            aria-hidden="true"
          >
            {invite.invitedBy.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium">
              Invited by {invite.invitedBy}.
            </span>
            <span className="block text-xs text-muted-foreground">
              Partner invitation verified
            </span>
          </span>
        </div>
        <div className="mt-6">
          <TrackedAnchor
            href={BOOK_A_CALL_CTA.href}
            label="Book your setup call"
            location="chatgpt_ads_unlocked"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary bg-clip-padding px-6 text-sm font-medium text-primary-foreground transition-all select-none hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px sm:w-auto [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book your setup call
            <ArrowUpRight aria-hidden="true" />
          </TrackedAnchor>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Private booking link · 30 minutes over Zoom
        </p>
      </div>
    )
  }

  return (
    <div className={cardClass}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--cga-accent) to-transparent opacity-70" />
      <p className={markClass}>
        <span className="size-1.5 rounded-full bg-(--cga-accent)" />
        Invite required
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,3vw,2.5rem)] font-medium leading-[1.06] tracking-[-0.04em] text-balance">
        Your code opens the next step.
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
        This program is invite only. Enter the code from Prism or your
        referring partner to reveal Enzo&apos;s private booking link.
      </p>
      <form
        className="mt-6 flex flex-col gap-3"
        method="get"
        action="/chatgpt-ads#access"
        onSubmit={handleSubmit}
        noValidate
      >
        <label
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          htmlFor={inputId}
        >
          Invite code
        </label>
        <div className="flex w-full items-stretch gap-1.5 rounded-full border border-input bg-card p-1.5 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20">
          <input
            id={inputId}
            name="code"
            className="h-11 w-full min-w-0 flex-1 rounded-full bg-transparent px-4 text-base uppercase tracking-[0.1em] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground/70"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="Enter code"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
          />
          <button
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary bg-clip-padding px-5 text-sm font-medium text-primary-foreground transition-all select-none hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            type="submit"
            disabled={pending}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              void submitCode(code)
            }}
          >
            {pending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : null}
            {pending ? 'Checking…' : 'Unlock'}
          </button>
        </div>
        {error ? (
          <p
            className="text-sm font-medium text-destructive"
            id={`${inputId}-error`}
            role="alert"
          >
            {error}
          </p>
        ) : (
          <p
            className="text-sm leading-relaxed text-muted-foreground"
            id={`${inputId}-hint`}
          >
            No code? Ask the partner who sent you here.
          </p>
        )}
      </form>
    </div>
  )
}
