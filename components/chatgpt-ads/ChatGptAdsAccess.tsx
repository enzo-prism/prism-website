'use client'

import { FormEvent, useEffect, useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'

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

import styles from './chatgpt-ads.module.css'

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

export default function ChatGptAdsAccess() {
  const inputId = useId()
  const searchParams = useSearchParams()
  const [code, setCode] = useState('')
  const [invite, setInvite] = useState<ChatGptAdsInvite | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const stored = readStoredInvite()
    if (stored) setInvite(stored)

    const queryCode = searchParams.get('code')
    if (queryCode && !stored) {
      setCode(queryCode)
      void submitCode(queryCode)
    }
    // We only honor the arriving URL once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submitCode(nextCode: string) {
    const trimmed = nextCode.trim()
    if (!trimmed) {
      setError('Enter the invite code you were given.')
      return
    }

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
      <div className={styles.accessCard}>
        <p className={styles.accessMark}>Unlocked</p>
        <h2 className={styles.accessTitle}>You&apos;re in.</h2>
        <p className={styles.accessBody}>
          Book 30 minutes with Prism. We&apos;ll map ChatGPT ads to your
          business and the exact next steps to get them live.
        </p>
        <p className={styles.unlockedMeta}>
          Invited by {invite.invitedBy}.
        </p>
        <div className={styles.actions} style={{ marginTop: '1.4rem' }}>
          <TrackedAnchor
            href={BOOK_A_CALL_CTA.href}
            label="Book your setup call"
            location="chatgpt_ads_unlocked"
            className={styles.bookButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book your setup call
          </TrackedAnchor>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.accessCard}>
      <p className={styles.accessMark}>Invite required</p>
      <h2 className={styles.accessTitle}>This program is invite only.</h2>
      <p className={styles.accessBody}>
        Access is reserved for businesses in Prism&apos;s network — the
        operators, founders, and partners we already trust. If someone sent you
        here, they also sent a code.
      </p>
      <form
        className={styles.form}
        method="get"
        action="/chatgpt-ads"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className={styles.label} htmlFor={inputId}>
          Invite code
        </label>
        <div className={styles.inputRow}>
          <input
            id={inputId}
            name="code"
            className={styles.input}
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
          <button className={styles.unlockButton} type="submit" disabled={pending}>
            {pending ? 'Checking…' : 'Unlock'}
          </button>
        </div>
        {error ? (
          <p className={styles.error} id={`${inputId}-error`} role="alert">
            {error}
          </p>
        ) : (
          <p className={styles.hint} id={`${inputId}-hint`}>
            Codes come from Prism or a trusted partner. We do not take open
            applications.
          </p>
        )}
      </form>
    </div>
  )
}
