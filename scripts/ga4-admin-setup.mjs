#!/usr/bin/env node
/**
 * GA4 Admin API setup — idempotent.
 *
 * Performs the two GA4-UI-only tasks programmatically:
 *   1. Marks `generate_lead` as a Key Event (conversion).
 *   2. Registers event-scoped custom dimensions for the params the site
 *      already sends: lead_type, lead_source, form_name, budget, primary_goal.
 *
 * Auth — either of:
 *   (a) A pre-minted OAuth access token with the analytics.edit scope, e.g.
 *       from `gcloud auth application-default print-access-token`. Pass via
 *       GA4_ACCESS_TOKEN or --token. The acting account must have Editor/Admin
 *       access to the GA4 property.
 *   (b) A Google service account JSON key (GOOGLE_APPLICATION_CREDENTIALS or
 *       --key). The service account email must be added as an Editor on the
 *       property (Admin → Property Access Management).
 *
 * Usage:
 *   # token route (gcloud user creds)
 *   GA4_PROPERTY_ID=123456789 \
 *   GA4_ACCESS_TOKEN="$(gcloud auth application-default print-access-token)" \
 *   node scripts/ga4-admin-setup.mjs [--dry-run]
 *
 *   # service-account route
 *   GA4_PROPERTY_ID=123456789 \
 *   GOOGLE_APPLICATION_CREDENTIALS=/abs/path/sa.json \
 *   node scripts/ga4-admin-setup.mjs [--dry-run]
 *
 * Re-running is safe: existing key events / custom dimensions are detected and skipped.
 */

import { readFileSync } from 'node:fs'
import { createSign } from 'node:crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/analytics.edit'
const ADMIN_V1BETA = 'https://analyticsadmin.googleapis.com/v1beta'
const ADMIN_V1ALPHA = 'https://analyticsadmin.googleapis.com/v1alpha'

const KEY_EVENT_NAME = 'generate_lead'
const CUSTOM_DIMENSIONS = [
  { parameterName: 'lead_type', displayName: 'Lead Type' },
  { parameterName: 'lead_source', displayName: 'Lead Source' },
  { parameterName: 'form_name', displayName: 'Form Name' },
  { parameterName: 'budget', displayName: 'Budget' },
  { parameterName: 'primary_goal', displayName: 'Primary Goal' },
]

function parseArgs(argv) {
  const args = { dryRun: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--property') args.property = argv[++i]
    else if (a === '--key') args.key = argv[++i]
    else if (a === '--token') args.token = argv[++i]
  }
  return args
}

function fail(message) {
  console.error(`\n✗ ${message}\n`)
  process.exit(1)
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function signJwt(sa) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  )
  const unsigned = `${header}.${claims}`
  const signature = createSign('RSA-SHA256')
    .update(unsigned)
    .sign(sa.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return `${unsigned}.${signature}`
}

async function getAccessToken(sa) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signJwt(sa),
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    fail(
      `Token exchange failed (${res.status}): ${data.error_description || data.error || JSON.stringify(data)}`,
    )
  }
  return data.access_token
}

async function api(token, url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}
  if (!res.ok) {
    const msg = data?.error?.message || text || `HTTP ${res.status}`
    throw new Error(`${res.status} ${msg}`)
  }
  return data
}

async function ensureKeyEvent(token, property, dryRun) {
  const list = await api(
    token,
    `${ADMIN_V1ALPHA}/${property}/keyEvents?pageSize=200`,
  )
  const existing = (list.keyEvents || []).find(
    (k) => k.eventName === KEY_EVENT_NAME,
  )
  if (existing) {
    console.log(`  • key event "${KEY_EVENT_NAME}" already exists — skipped`)
    return
  }
  if (dryRun) {
    console.log(`  • [dry-run] would create key event "${KEY_EVENT_NAME}"`)
    return
  }
  await api(token, `${ADMIN_V1ALPHA}/${property}/keyEvents`, {
    method: 'POST',
    body: JSON.stringify({
      eventName: KEY_EVENT_NAME,
      countingMethod: 'ONCE_PER_EVENT',
    }),
  })
  console.log(`  ✓ created key event "${KEY_EVENT_NAME}"`)
}

async function ensureCustomDimensions(token, property, dryRun) {
  const dimensionsUrl = `${ADMIN_V1BETA}/${property}/customDimensions`
  const list = await api(token, `${dimensionsUrl}?pageSize=200`)
  const existing = new Set(
    (list.customDimensions || []).map((d) => `${d.scope}:${d.parameterName}`),
  )
  for (const dim of CUSTOM_DIMENSIONS) {
    const key = `EVENT:${dim.parameterName}`
    if (existing.has(key)) {
      console.log(
        `  • custom dimension "${dim.parameterName}" (EVENT) already exists — skipped`,
      )
      continue
    }
    if (dryRun) {
      console.log(
        `  • [dry-run] would create custom dimension "${dim.parameterName}" (EVENT)`,
      )
      continue
    }
    await api(token, dimensionsUrl, {
      method: 'POST',
      body: JSON.stringify({
        parameterName: dim.parameterName,
        displayName: dim.displayName,
        scope: 'EVENT',
      }),
    })
    console.log(`  ✓ created custom dimension "${dim.parameterName}" (EVENT)`)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const propertyId = args.property || process.env.GA4_PROPERTY_ID
  const presetToken = args.token || process.env.GA4_ACCESS_TOKEN
  const keyPath = args.key || process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!propertyId) {
    fail(
      'Missing GA4 property ID. Set GA4_PROPERTY_ID or pass --property <numericId> (e.g. 123456789).',
    )
  }
  if (!presetToken && !keyPath) {
    fail(
      'Missing credentials. Provide GA4_ACCESS_TOKEN (e.g. from gcloud) or GOOGLE_APPLICATION_CREDENTIALS (service account JSON).',
    )
  }

  const property = `properties/${String(propertyId).replace(/^properties\//, '')}`

  console.log(`\nGA4 Admin setup → ${property}`)

  let token
  if (presetToken) {
    console.log('Auth: pre-supplied access token')
    token = presetToken.trim()
  } else {
    let sa
    try {
      sa = JSON.parse(readFileSync(keyPath, 'utf8'))
    } catch (err) {
      fail(`Could not read service account JSON at ${keyPath}: ${err.message}`)
    }
    if (!sa.client_email || !sa.private_key) {
      fail('Service account JSON is missing client_email / private_key.')
    }
    console.log(`Auth: service account ${sa.client_email}`)
    token = await getAccessToken(sa)
  }

  if (args.dryRun) console.log('Mode: DRY RUN (no changes will be written)')
  console.log('')

  console.log('Key events:')
  await ensureKeyEvent(token, property, args.dryRun)

  console.log('\nCustom dimensions:')
  await ensureCustomDimensions(token, property, args.dryRun)

  console.log('\n✓ Done.\n')
}

main().catch((err) => fail(err.message))
