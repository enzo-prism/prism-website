import {
  CHATGPT_ADS_COOKIE,
  CHATGPT_ADS_COOKIE_MAX_AGE_SECONDS,
  serializeInviteSession,
} from '@/lib/chatgpt-ads'
import { verifyChatGptAdsInvite } from '@/lib/chatgpt-ads-invites'

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 12
const attempts = new Map<string, { count: number; resetAt: number }>()

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')?.trim() || 'local'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_ATTEMPTS
}

function jsonResponse(
  body: unknown,
  init: { status: number; cookie?: string } = { status: 200 },
) {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  }
  if (init.cookie) {
    headers['set-cookie'] = init.cookie
  }

  return new Response(JSON.stringify(body), {
    status: init.status,
    headers,
  })
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return jsonResponse(
      { ok: false, error: 'Too many attempts. Wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  let code = ''
  try {
    const body = (await request.json()) as { code?: unknown }
    code = typeof body.code === 'string' ? body.code : ''
  } catch {
    return jsonResponse(
      { ok: false, error: 'Enter the invite code you were given.' },
      { status: 400 },
    )
  }

  const invite = verifyChatGptAdsInvite(code)
  if (!invite) {
    return jsonResponse(
      { ok: false, error: 'That code is not recognized.' },
      { status: 401 },
    )
  }

  const cookieValue = encodeURIComponent(serializeInviteSession(invite))
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  const cookie = `${CHATGPT_ADS_COOKIE}=${cookieValue}; Path=/; Max-Age=${CHATGPT_ADS_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`

  return jsonResponse(
    { ok: true, invite },
    { status: 200, cookie },
  )
}
