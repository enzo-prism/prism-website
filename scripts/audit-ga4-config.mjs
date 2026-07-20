#!/usr/bin/env node
/**
 * Audit the live GA4 / Google tag configuration WITHOUT needing GA account access.
 *
 * The gtag.js that Google serves for a measurement ID embeds that property's
 * admin settings: which Enhanced Measurement tags are instantiated, which
 * events are marked as Key Events, and every destination the tag fans out to.
 * Fetching and parsing it turns settings that are otherwise invisible from the
 * codebase into something reviewable — and re-checkable after someone changes
 * them in the GA UI.
 *
 * Usage:
 *   node scripts/audit-ga4-config.mjs            # audit the production tag
 *   node scripts/audit-ga4-config.mjs --json     # machine-readable output
 *
 * Env:
 *   GA_MEASUREMENT_ID              override the measurement ID to audit
 *   GA_ALLOWED_DESTINATIONS        comma-separated IDs that are expected to
 *                                  receive hits (acknowledges a known extra
 *                                  property instead of failing on it)
 *
 * Exits non-zero when the live config drifts from what the site expects.
 */

const DEFAULT_MEASUREMENT_ID = 'G-P9VY77PRC0'
const GOOGLE_ADS_ID = 'AW-11373090310'

const measurementId = (
  process.env.GA_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID
).trim()

const allowedDestinations = new Set(
  [measurementId, GOOGLE_ADS_ID].concat(
    (process.env.GA_ALLOWED_DESTINATIONS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
  ),
)

const asJson = process.argv.includes('--json')

function log(...args) {
  if (!asJson) console.log(...args)
}

async function fetchTag(id) {
  const url = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  const response = await fetch(url, {
    headers: {
      // Google serves a trimmed payload to unknown agents.
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch gtag.js for ${id}: HTTP ${response.status}`)
  }

  return response.text()
}

/** Every destination the Google tag forwards hits to. */
function parseDestinations(source) {
  const ids = new Set()
  for (const match of source.matchAll(/"vtp_instanceDestinationId":"([^"]+)"/g)) {
    ids.add(match[1])
  }
  return [...ids].sort()
}

/**
 * Enhanced Measurement tags, per destination. `historyEvents` is the one that
 * matters most here: when true, GA4 fires its OWN page_view on every SPA route
 * change, which double-counts against the site's manual trackPageView call.
 */
function parseEnhancedMeasurement(source) {
  const tags = []
  const pattern =
    /\{"function":"__ccd_em_([a-z_]+)"[^}]*?"vtp_instanceDestinationId":"([^"]+)"[^}]*\}/g

  for (const match of source.matchAll(pattern)) {
    const [block, feature, destination] = match
    tags.push({
      feature,
      destination,
      historyEvents: /"vtp_historyEvents":true/.test(block),
    })
  }

  return tags
}

/** Events the property has marked as Key Events (formerly "conversions"). */
function parseKeyEvents(source) {
  const byDestination = {}
  const pattern =
    /\{"function":"__ccd_conversion_marking".*?"vtp_instanceDestinationId":"([^"]+)"/g

  for (const match of source.matchAll(pattern)) {
    const destination = match[1]
    const names = [...match[0].matchAll(/stringValue\\":\\"([a-z0-9_]+)\\"/g)].map(
      (m) => m[1],
    )
    const existing = byDestination[destination] ?? []
    byDestination[destination] = [...new Set([...existing, ...names])].sort()
  }

  return byDestination
}

async function main() {
  const source = await fetchTag(measurementId)

  const destinations = parseDestinations(source)
  const enhancedMeasurement = parseEnhancedMeasurement(source)
  const keyEvents = parseKeyEvents(source)

  const problems = []

  // 1. SPA double-counting.
  const historyPageViews = enhancedMeasurement.filter(
    (tag) => tag.feature === 'page_view' && tag.historyEvents,
  )
  for (const tag of historyPageViews) {
    problems.push({
      code: 'enhanced_measurement_history_page_view',
      destination: tag.destination,
      message:
        `${tag.destination} has Enhanced Measurement "page changes based on browser history events" ON. ` +
        'The site already sends its own page_view on every route change (components/enhanced-analytics.tsx), ' +
        'so every client-side navigation is counted twice. ' +
        'Fix: GA4 Admin > Data streams > (stream) > Enhanced measurement > gear icon > uncheck "Page changes based on browser history events".',
    })
  }

  // 2. Unexpected destinations silently receiving every hit.
  for (const destination of destinations) {
    if (!allowedDestinations.has(destination)) {
      problems.push({
        code: 'unexpected_tag_destination',
        destination,
        message:
          `${destination} receives every hit from this Google tag but is not referenced anywhere in the codebase. ` +
          'Fix: GA4 Admin > Google tag > Configure tag settings > Manage connected tags. ' +
          `If it is intentional, acknowledge it with GA_ALLOWED_DESTINATIONS=${destination}.`,
      })
    }
  }

  if (asJson) {
    console.log(
      JSON.stringify(
        { measurementId, destinations, enhancedMeasurement, keyEvents, problems },
        null,
        2,
      ),
    )
  } else {
    log(`\nGA4 tag audit — ${measurementId}\n${'─'.repeat(48)}`)

    log('\nDestinations receiving hits:')
    for (const destination of destinations) {
      const known = allowedDestinations.has(destination)
      log(`  ${known ? '✓' : '✗'} ${destination}${known ? '' : '  ← unexpected'}`)
    }

    log('\nEnhanced measurement:')
    const features = [...new Set(enhancedMeasurement.map((t) => t.feature))].sort()
    for (const feature of features) {
      const tags = enhancedMeasurement.filter((t) => t.feature === feature)
      const history = tags.some((t) => t.historyEvents)
      log(`  ${feature}${history ? '  (historyEvents: ON)' : ''}`)
    }

    log('\nKey events:')
    for (const [destination, names] of Object.entries(keyEvents)) {
      log(`  ${destination}: ${names.join(', ') || '(none)'}`)
    }

    if (problems.length === 0) {
      log('\n✅ Live GA4 configuration matches what the site expects.\n')
    } else {
      log(`\n❌ ${problems.length} configuration problem(s):\n`)
      for (const problem of problems) {
        log(`  [${problem.code}]`)
        log(`  ${problem.message}\n`)
      }
    }
  }

  process.exit(problems.length > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error(`GA4 audit failed: ${error.message}`)
  process.exit(2)
})
