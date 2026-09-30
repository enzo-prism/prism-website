'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { coreHeroPrimaryActionClassName } from '@/components/core-route/CoreRoutePrimitives'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/hooks/use-form-validation'
import {
  getOfficeHoursSessions,
  type OfficeHoursSession,
} from '@/lib/office-hours'

const fieldClassName =
  'min-h-14 rounded-xl border-border bg-background px-4 font-sans text-base text-foreground focus-visible:ring-ring focus-visible:ring-offset-0'
const labelClassName = 'font-sans text-sm font-medium text-foreground'

type AccessState = 'checking' | 'locked' | 'approved'
type ApiResult = {
  ok?: boolean
  approved?: boolean
  error?: string
  session?: OfficeHoursSession
}

async function requestApi(path: string, options?: RequestInit) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 20000)
  try {
    const response = await fetch(path, {
      ...options,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { Accept: 'application/json', ...options?.headers },
      signal: controller.signal,
    })
    const result = (await response.json()) as ApiResult
    return { response, result }
  } finally {
    window.clearTimeout(timeout)
  }
}

function FieldError({ id, error }: { id: string; error: string }) {
  return error ? (
    <p id={id} className="text-sm text-destructive" aria-live="polite">
      {error}
    </p>
  ) : null
}

/** Approval is restored by a server-issued HttpOnly cookie, never browser storage. */
export default function OfficeHoursBooking({
  sessions: initialSessions,
}: {
  sessions: OfficeHoursSession[]
}) {
  const [access, setAccess] = useState<AccessState>('checking')
  const [accessError, setAccessError] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [sessions, setSessions] = useState(initialSessions)
  const [sessionId, setSessionId] = useState(initialSessions[0]?.id ?? '')
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  )
  const [contactValues, setContactValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [receipt, setReceipt] = useState<OfficeHoursSession | null>(null)
  const [revoking, setRevoking] = useState(false)
  const codeRef = useRef<HTMLInputElement>(null)
  const sessionRef = useRef<HTMLSelectElement>(null)
  const feedbackRef = useRef<HTMLParagraphElement>(null)
  const receiptRef = useRef<HTMLHeadingElement>(null)

  const refreshSessions = useCallback(() => {
    const nextSessions = getOfficeHoursSessions()
    setSessions(nextSessions)
    setSessionId((selected) =>
      nextSessions.some((session) => session.id === selected)
        ? selected
        : (nextSessions[0]?.id ?? ''),
    )
  }, [])

  useEffect(() => {
    let active = true
    requestApi('/api/office-hours/access')
      .then(({ response, result }) => {
        if (!active) return
        setAccess(response.ok && result.approved ? 'approved' : 'locked')
        if (!response.ok) {
          setAccessError(
            result.error ??
              "We couldn't check your approval. Try your code below.",
          )
        }
      })
      .catch(() => {
        if (!active) return
        setAccess('locked')
        setAccessError("We couldn't check your approval. Try your code below.")
      })
      .finally(() => {
        if (active) refreshSessions()
      })
    window.addEventListener('focus', refreshSessions)
    return () => {
      active = false
      window.removeEventListener('focus', refreshSessions)
    }
    // The initial server schedule is refreshed once, then when visitors return.
  }, [refreshSessions])

  useEffect(() => {
    if (accessError) codeRef.current?.focus()
  }, [accessError])

  useEffect(() => {
    if (registrationError) feedbackRef.current?.focus()
  }, [registrationError])

  useEffect(() => {
    if (receipt) receiptRef.current?.focus()
  }, [receipt])

  const approval = useFormValidation({
    onValidSubmit: async () => {
      setAccessError(null)
      try {
        const { response, result } = await requestApi(
          '/api/office-hours/access',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code.trim() }),
          },
        )
        if (!response.ok || !result.approved) {
          setAccessError(
            result.error ??
              'That code could not be verified. Check it and try again.',
          )
          return
        }
        setCode('')
        setRegistrationError(null)
        setAccess('approved')
        refreshSessions()
        requestAnimationFrame(() => sessionRef.current?.focus())
      } catch {
        setAccessError("We couldn't verify your code. Please try again.")
      }
    },
  })

  const handleApprovalSubmit = (event: FormEvent<HTMLFormElement>) => {
    codeRef.current?.setCustomValidity(
      code.trim() ? '' : 'Enter your approval code.',
    )
    return approval.handleSubmit(event)
  }

  const registration = useFormValidation({
    onValidSubmit: async (form) => {
      setRegistrationError(null)
      const selected = sessions.find((session) => session.id === sessionId)
      if (!selected || new Date(selected.startAt).getTime() <= Date.now()) {
        refreshSessions()
        setRegistrationError(
          'That session has started. Choose an upcoming Sunday and try again.',
        )
        return
      }
      const values = new FormData(form)
      try {
        const { response, result } = await requestApi(
          '/api/office-hours/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: String(values.get('firstName') ?? '').trim(),
              lastName: String(values.get('lastName') ?? '').trim(),
              email: String(values.get('email') ?? '').trim(),
              message: String(values.get('message') ?? '').trim(),
              sessionId,
            }),
          },
        )
        if (!response.ok || result.ok !== true || !result.session) {
          if (response.status === 401 || response.status === 403) {
            setAccess('locked')
            setAccessError(
              result.error ??
                'Your approval has expired. Enter your code again.',
            )
            refreshSessions()
            return
          }
          refreshSessions()
          setRegistrationError(
            result.error ?? "We couldn't save your signup. Please try again.",
          )
          return
        }
        setReceipt(result.session)
      } catch {
        setRegistrationError("We couldn't save your signup. Please try again.")
      }
    },
  })

  const handleRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    for (const field of Array.from(event.currentTarget.elements)) {
      if (field instanceof HTMLInputElement) {
        field.setCustomValidity(
          field.required && !field.value.trim()
            ? 'Please complete this field.'
            : '',
        )
      }
    }
    return registration.handleSubmit(event)
  }

  const forgetApproval = async () => {
    if (revoking) return
    setRevoking(true)
    setRegistrationError(null)
    try {
      const { response } = await requestApi('/api/office-hours/access', {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Approval could not be cleared')
      setReceipt(null)
      setContactValues({ firstName: '', lastName: '', email: '', message: '' })
      setAccess('locked')
      requestAnimationFrame(() => codeRef.current?.focus())
    } catch {
      setRegistrationError("We couldn't clear your approval. Please try again.")
    } finally {
      setRevoking(false)
    }
  }

  const errorFor = (name: string) => registration.getError(name)

  return (
    <div className="space-y-6" aria-busy={access === 'checking'}>
      {access === 'checking' ? (
        <p role="status" className="text-sm text-muted-foreground">
          Checking your approval…
        </p>
      ) : access === 'locked' ? (
        <form noValidate onSubmit={handleApprovalSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className={labelClassName} htmlFor="office-hours-code">
              Approval code
            </Label>
            <Input
              ref={codeRef}
              id="office-hours-code"
              name="approvalCode"
              className={fieldClassName}
              required
              maxLength={128}
              autoComplete="one-time-code"
              autoCapitalize="none"
              spellCheck={false}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onBlur={approval.handleBlur}
              onInput={(event) => {
                event.currentTarget.setCustomValidity('')
                approval.handleInput(event)
              }}
              aria-invalid={Boolean(
                approval.getError('approvalCode') || accessError,
              )}
              aria-describedby={[
                'office-hours-code-help',
                approval.getError('approvalCode')
                  ? 'office-hours-code-error'
                  : '',
                accessError ? 'office-hours-access-error' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            <p
              id="office-hours-code-help"
              className="text-sm text-muted-foreground"
            >
              Your code is in your approval email. No Google account is needed.
            </p>
            <FieldError
              id="office-hours-code-error"
              error={approval.getError('approvalCode')}
            />
          </div>
          {accessError ? (
            <p
              id="office-hours-access-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {accessError}
            </p>
          ) : null}
          <button
            type="submit"
            className={coreHeroPrimaryActionClassName}
            disabled={approval.isSubmitting}
          >
            {approval.isSubmitting ? 'Checking code…' : 'Unlock session signup'}
          </button>
          <p className="text-sm text-muted-foreground">
            Need approval?{' '}
            <a
              href="#office-hours-application"
              className="text-foreground underline underline-offset-4"
            >
              Apply for office hours
            </a>{' '}
            first.
          </p>
        </form>
      ) : receipt ? (
        <div role="status" className="space-y-4 border-l border-border pl-6">
          <h4
            ref={receiptRef}
            tabIndex={-1}
            className="text-xl font-medium text-foreground"
          >
            Your session signup is received.
          </h4>
          <p className="text-base text-foreground">{receipt.label}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            10–11 am Pacific. Prism will share joining details separately.
          </p>
          <button
            type="button"
            onClick={() => {
              setReceipt(null)
              refreshSessions()
            }}
            className="min-h-12 text-sm text-foreground underline underline-offset-4"
          >
            Choose another Sunday
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleRegistrationSubmit}
          className="space-y-6"
        >
          <p role="status" className="text-sm text-muted-foreground">
            Approval verified. Choose your next session below.
          </p>
          <div className="space-y-2">
            <Label className={labelClassName} htmlFor="office-hours-session">
              Choose a Sunday
            </Label>
            <select
              ref={sessionRef}
              id="office-hours-session"
              name="sessionId"
              required
              className={`${fieldClassName} w-full py-3`}
              value={sessionId}
              onChange={(event) => setSessionId(event.target.value)}
              onBlur={registration.handleBlur}
              onInput={registration.handleInput}
              aria-invalid={Boolean(errorFor('sessionId'))}
              aria-describedby={`office-hours-session-help${errorFor('sessionId') ? ' office-hours-session-error' : ''}`}
            >
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.label}
                </option>
              ))}
            </select>
            <p
              id="office-hours-session-help"
              className="text-sm text-muted-foreground"
            >
              Every session is 10–11 am Pacific, including daylight saving time.
            </p>
            <FieldError
              id="office-hours-session-error"
              error={errorFor('sessionId')}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {(
              [
                {
                  name: 'firstName',
                  label: 'First name',
                  autocomplete: 'given-name',
                },
                {
                  name: 'lastName',
                  label: 'Last name',
                  autocomplete: 'family-name',
                },
              ] as const
            ).map((field) => (
              <div className="space-y-2" key={field.name}>
                <Label
                  className={labelClassName}
                  htmlFor={`office-hours-registration-${field.name}`}
                >
                  {field.label}
                </Label>
                <Input
                  className={fieldClassName}
                  id={`office-hours-registration-${field.name}`}
                  name={field.name}
                  required
                  maxLength={80}
                  autoComplete={field.autocomplete}
                  value={contactValues[field.name]}
                  onChange={(event) =>
                    setContactValues((values) => ({
                      ...values,
                      [field.name]: event.target.value,
                    }))
                  }
                  onBlur={registration.handleBlur}
                  onInput={(event) => {
                    event.currentTarget.setCustomValidity('')
                    registration.handleInput(event)
                  }}
                  aria-invalid={Boolean(errorFor(field.name))}
                  aria-describedby={
                    errorFor(field.name)
                      ? `office-hours-registration-${field.name}-error`
                      : undefined
                  }
                />
                <FieldError
                  id={`office-hours-registration-${field.name}-error`}
                  error={errorFor(field.name)}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label
              className={labelClassName}
              htmlFor="office-hours-registration-email"
            >
              Email
            </Label>
            <Input
              className={fieldClassName}
              id="office-hours-registration-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={contactValues.email}
              onChange={(event) =>
                setContactValues((values) => ({
                  ...values,
                  email: event.target.value,
                }))
              }
              onBlur={registration.handleBlur}
              onInput={(event) => {
                event.currentTarget.setCustomValidity('')
                registration.handleInput(event)
              }}
              aria-invalid={Boolean(errorFor('email'))}
              aria-describedby={
                errorFor('email')
                  ? 'office-hours-registration-email-error'
                  : undefined
              }
            />
            <FieldError
              id="office-hours-registration-email-error"
              error={errorFor('email')}
            />
          </div>
          <div className="space-y-2">
            <Label className={labelClassName} htmlFor="office-hours-topic">
              Anything new you want to cover?{' '}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              className={fieldClassName}
              id="office-hours-topic"
              name="message"
              rows={4}
              maxLength={2000}
              value={contactValues.message}
              onChange={(event) =>
                setContactValues((values) => ({
                  ...values,
                  message: event.target.value,
                }))
              }
            />
          </div>
          <p
            ref={feedbackRef}
            tabIndex={-1}
            role={registrationError ? 'alert' : undefined}
            className="text-sm text-destructive"
          >
            {registrationError}
          </p>
          <button
            type="submit"
            className={coreHeroPrimaryActionClassName}
            disabled={registration.isSubmitting || !sessions.length || revoking}
          >
            {registration.isSubmitting
              ? 'Saving signup…'
              : 'Sign up for this Sunday'}
          </button>
        </form>
      )}

      {access === 'approved' ? (
        <button
          type="button"
          onClick={forgetApproval}
          disabled={revoking || registration.isSubmitting}
          className="min-h-12 text-sm text-muted-foreground underline underline-offset-4"
        >
          {revoking ? 'Clearing approval…' : 'Use a different approval code'}
        </button>
      ) : null}
      {(access === 'locked' || receipt) && registrationError ? (
        <p role="alert" className="text-sm text-destructive">
          {registrationError}
        </p>
      ) : null}
    </div>
  )
}
