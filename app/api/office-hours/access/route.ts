import {
  createOfficeHoursSession,
  getOfficeHoursConfig,
  isOfficeHoursSameOrigin,
  officeHoursCookie,
  officeHoursJson,
  officeHoursRateLimited,
  OfficeHoursRequestError,
  readOfficeHoursJson,
  requestHasOfficeHoursAccess,
  verifyOfficeHoursCode,
} from '@/lib/office-hours-access'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  return officeHoursJson({
    ok: true,
    approved: requestHasOfficeHoursAccess(request),
  })
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
          'Returning attendee access is not available yet. Please apply for office hours below.',
      },
      503,
    )
  if (officeHoursRateLimited(request, 'access'))
    return officeHoursJson(
      {
        ok: false,
        error: 'Too many attempts. Please wait ten minutes and try again.',
      },
      429,
    )
  try {
    const body = await readOfficeHoursJson(request)
    if (
      typeof body.code !== 'string' ||
      !body.code.trim() ||
      body.code.length > 128
    )
      return officeHoursJson(
        { ok: false, error: 'Enter the approval code you were given.' },
        400,
      )
    if (!verifyOfficeHoursCode(body.code))
      return officeHoursJson(
        {
          ok: false,
          error:
            'That approval code was not recognized. Check your email or apply below.',
        },
        401,
      )
    const session = createOfficeHoursSession()
    if (!session)
      return officeHoursJson(
        {
          ok: false,
          error:
            'Returning attendee access is temporarily unavailable. Please try again.',
        },
        503,
      )
    return officeHoursJson(
      { ok: true, approved: true },
      200,
      officeHoursCookie(session),
    )
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

export async function DELETE(request: Request) {
  if (!isOfficeHoursSameOrigin(request))
    return officeHoursJson(
      {
        ok: false,
        error: 'Open this form on the Prism website and try again.',
      },
      403,
    )
  return officeHoursJson(
    { ok: true, approved: false },
    200,
    officeHoursCookie('', 0),
  )
}
