import {
  getOfficeHoursSessions,
  OFFICE_HOURS_TIME_ZONE,
} from '@/lib/office-hours'
import {
  getOfficeHoursConfig,
  isOfficeHoursSameOrigin,
  officeHoursJson,
  officeHoursRateLimited,
  OfficeHoursRequestError,
  readOfficeHoursJson,
  requestHasOfficeHoursAccess,
  signOfficeHoursRegistration,
} from '@/lib/office-hours-access'

export const runtime = 'nodejs'

function formspreeEndpoint() {
  const value =
    process.env.OFFICE_HOURS_REGISTRATION_ENDPOINT?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ||
    'https://formspree.io/f/xjkjbpdb'
  try {
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'formspree.io' ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !/^\/f\/[a-zA-Z0-9]+\/?$/.test(url.pathname)
    )
      return null
    return url.href
  } catch {
    return null
  }
}

function field(
  body: Record<string, unknown>,
  key: string,
  maximum: number,
  required = true,
) {
  const value = body[key]
  if (value === undefined && !required) return ''
  if (
    typeof value !== 'string' ||
    value.length > maximum ||
    (/[\u0000-\u001f\u007f]/.test(value) && key !== 'message')
  )
    throw new OfficeHoursRequestError(
      'Check your contact details and try again.',
    )
  const clean = value.trim()
  if (required && !clean)
    throw new OfficeHoursRequestError(
      'Complete your name, email, and session selection.',
    )
  if (
    key === 'message' &&
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(clean)
  )
    throw new OfficeHoursRequestError(
      'Please remove unsupported characters from your message.',
    )
  return clean
}

export async function POST(request: Request) {
  if (!isOfficeHoursSameOrigin(request))
    return officeHoursJson(
      {
        ok: false,
        error: 'Open this form on the Prism website and try again.',
      },
      403,
    )
  if (!getOfficeHoursConfig())
    return officeHoursJson(
      {
        ok: false,
        error:
          'Returning attendee registration is not available yet. Please apply for office hours.',
      },
      503,
    )
  if (!requestHasOfficeHoursAccess(request))
    return officeHoursJson(
      {
        ok: false,
        code: 'approval_required',
        error: 'Enter your approval code before choosing a session.',
      },
      401,
    )
  if (officeHoursRateLimited(request, 'register'))
    return officeHoursJson(
      {
        ok: false,
        error:
          'Too many registration attempts. Please wait ten minutes and try again.',
      },
      429,
    )
  const endpoint = formspreeEndpoint()
  if (!endpoint)
    return officeHoursJson(
      {
        ok: false,
        error:
          'Registration is temporarily unavailable. Please try again later.',
      },
      503,
    )
  try {
    const body = await readOfficeHoursJson(request)
    const firstName = field(body, 'firstName', 80)
    const lastName = field(body, 'lastName', 80)
    const email = field(body, 'email', 254)
    const message = field(body, 'message', 2000, false)
    const sessionId = field(body, 'sessionId', 10)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new OfficeHoursRequestError('Enter a valid email address.')
    const session = getOfficeHoursSessions().find(
      (option) => option.id === sessionId,
    )
    if (!session)
      return officeHoursJson(
        {
          ok: false,
          code: 'session_unavailable',
          error:
            'That session is no longer available. Choose an upcoming Sunday.',
        },
        400,
      )
    const registrationIssuedAt = new Date().toISOString()
    const registrationSignature = signOfficeHoursRegistration({
      firstName,
      lastName,
      email,
      sessionId: session.id,
      issuedAt: registrationIssuedAt,
    })
    if (!registrationSignature)
      return officeHoursJson(
        {
          ok: false,
          error:
            'Registration is temporarily unavailable. Please try again later.',
        },
        503,
      )
    let response: Response
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        redirect: 'error',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          _subject: `Prism Office Hours registration: ${session.id}`,
          firstName,
          lastName,
          email,
          message,
          formType: 'office_hours_registration',
          mode_program: 'office_hours_registration',
          approvedAttendee: 'yes',
          registrationIssuedAt,
          registrationSignature,
          sessionDate: session.id,
          sessionLabel: session.label,
          sessionStartUtc: session.startAt,
          sessionEndUtc: session.endAt,
          timeZone: OFFICE_HOURS_TIME_ZONE,
          source: 'https://www.design-prism.com/scholarships',
        }),
      })
    } catch {
      return officeHoursJson(
        {
          ok: false,
          error:
            'We could not send your registration. Your session has not been reserved. Please try again.',
        },
        502,
      )
    }
    if (!response.ok)
      return officeHoursJson(
        {
          ok: false,
          error:
            'We could not send your registration. Your session has not been reserved. Please try again.',
        },
        502,
      )
    return officeHoursJson({ ok: true, session })
  } catch (error) {
    return officeHoursJson(
      {
        ok: false,
        error:
          error instanceof OfficeHoursRequestError
            ? error.message
            : 'Please try again.',
      },
      error instanceof OfficeHoursRequestError ? error.status : 400,
    )
  }
}
