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

/** Destinations named directly inside one tag payload. */
function parseDestinations(source) {
  const ids = new Set()
  for (const match of source.matchAll(/"vtp_instanceDestinationId":"([^"]+)"/g)) {
    ids.add(match[1])
  }
  return [...ids].sort()
}

/**
 * Resolve the FULL destination graph, not just the first hop.
 *
 * Connected tags chain: our tag names B as a destination, and B's own tag can
 * name C. At runtime gtag walks the whole chain, so C receives our hits too —
 * but C appears nowhere in our tag's payload, so a single-payload parse cannot
 * see it.
 *
 * That blind spot was not hypothetical. This audit reported two destinations
 * while the browser was really sending to four; the two it missed were a hub
 * property and, through it, a former client's GA4 property that was still
 * recording design-prism.com pageviews. Walk the graph so a second hop can
 * never hide again.
 *
 * Two roots, not one. `app/layout.tsx` runs `gtag('config', ...)` for BOTH the
 * GA4 measurement id and the Google Ads id, so the browser loads two tags and
 * either can fan out. Auditing only the GA4 tag missed a second, independent
 * route to that same client property hanging off the Ads tag — the GA4 side
 * came back clean while the browser was still sending to it.
 *
 * Ads tags fan out too, so do NOT treat `AW-` ids as terminal.
 *
 * Returns a map of destination id -> the chain used to reach it.
 */
async function resolveDestinationGraph(rootIds) {
  const roots = Array.isArray(rootIds) ? rootIds : [rootIds]
  const paths = new Map(roots.map((id) => [id, [id]]))
  const queue = [...roots]
  const visited = new Set()

  while (queue.length > 0) {
    const current = queue.shift()
    if (visited.has(current)) continue
    visited.add(current)

    let source
    try {
      source = await fetchTag(current)
    } catch {
      // A destination whose tag we cannot fetch still counts as reachable; we
      // just cannot see past it. Better to report it than to drop it.
      continue
    }

    for (const next of parseDestinations(source)) {
      if (paths.has(next)) continue
      paths.set(next, [...paths.get(current), next])
      queue.push(next)
    }
  }

  return paths
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

/**
 * Compiled GA4 / Google-tag "Create event" rules that copy page_view into
 * generate_lead. Those rules are the /contact page-view leak: they run after
 * the hit arrives, so first-party code never calls generate_lead on load, but
 * the property still stars a conversion for every /contact page_view.
 *
 * Not every create-event is compiled into gtag.js (some stay server-side).
 * When the tag does embed one, fail the audit so it cannot silently return.
 */
function parsePageViewLeadCreateEvents(source) {
  const rules = []
  const createEventBlocks = source.matchAll(
    /\{"function":"__(?:ogt|ccd)_[^"]*(?:create_event|event_create|ga_event)[^"]*"[\s\S]{0,4000}?"vtp_instanceDestinationId":"([^"]+)"[\s\S]{0,4000}?\}/g,
  )

  for (const match of createEventBlocks) {
    const block = match[0]
    const destination = match[1]
    const createsLead = /generate_lead/.test(block)
    const copiesPageView = /page_view/.test(block)
    const mentionsContact = /\\\/contact|\/contact/.test(block)
    if (createsLead && (copiesPageView || mentionsContact)) {
      rules.push({ destination, mentionsContact, copiesPageView })
    }
  }

  return rules
}

async function main() {
  const source = await fetchTag(measurementId)

  const destinationPaths = await resolveDestinationGraph([
    measurementId,
    GOOGLE_ADS_ID,
  ])
  const destinations = [...destinationPaths.keys()].sort()
  const enhancedMeasurement = parseEnhancedMeasurement(source)
  const keyEvents = parseKeyEvents(source)
  const pageViewLeadCreateEvents = parsePageViewLeadCreateEvents(source)

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

  // 2. /contact page_view copied into the starred generate_lead key event.
  for (const rule of pageViewLeadCreateEvents) {
    problems.push({
      code: 'contact_page_view_generate_lead_create_event',
      destination: rule.destination,
      message:
        `${rule.destination} has a compiled Create event that copies page_view` +
        `${rule.mentionsContact ? ' (and mentions /contact)' : ''} into generate_lead. ` +
        'That is the /contact page-view leak: every load of the form is starred as a conversion. ' +
        'Fix: GA4 Admin > Events > Create event > delete the page_view → generate_lead rule. ' +
        'First-party code already fires generate_lead only after a successful contact submit.',
    })
  }

  // 3. Unexpected destinations silently receiving every hit.
  for (const destination of destinations) {
    if (!allowedDestinations.has(destination)) {
      const chain = destinationPaths.get(destination) ?? [destination]
      const hops = chain.length - 1
      const parent = chain[hops - 1]
      // The tag that carries the unwanted destination decides which console you
      // fix it in. An AW- parent lives in Google Ads, not GA4 Admin — pointing
      // at the wrong console sends people hunting through screens that do not
      // contain the setting.
      const where = parent.startsWith('AW-')
        ? `Google Ads > Admin > Google tag (${parent}) > Manage destinations`
        : `GA4 Admin > Data streams > (stream) > Configure tag settings > Destinations (tag ${parent})`
      problems.push({
        code: 'unexpected_tag_destination',
        destination,
        chain,
        message:
          `${destination} receives every hit from this site but is not referenced anywhere in the codebase. ` +
          `Reached via ${chain.join(' -> ')}${hops > 1 ? ` (${hops} hops — it hangs off a connected tag, not off us directly)` : ''}. ` +
          `Fix: ${where} > remove ${destination}. ` +
          `Note Google requires reassigning a destination to another Google tag rather than deleting it outright. ` +
          `If it is intentional, acknowledge it with GA_ALLOWED_DESTINATIONS=${destination}.`,
      })
    }
  }

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          measurementId,
          destinations,
          enhancedMeasurement,
          keyEvents,
          pageViewLeadCreateEvents,
          problems,
        },
        null,
        2,
      ),
    )
  } else {
    log(`\nGA4 tag audit — ${measurementId}\n${'─'.repeat(48)}`)

    log('\nDestinations receiving hits (full connected-tag graph):')
    for (const destination of destinations) {
      const known = allowedDestinations.has(destination)
      const chain = destinationPaths.get(destination) ?? [destination]
      const via = chain.length > 2 ? `  via ${chain.slice(0, -1).join(' -> ')}` : ''
      log(
        `  ${known ? '✓' : '✗'} ${destination}${known ? '' : '  ← unexpected'}${via}`,
      )
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

    log('\nCreate events that copy page_view → generate_lead:')
    if (pageViewLeadCreateEvents.length === 0) {
      log('  (none compiled into this tag; server-side Admin rules can still exist)')
    } else {
      for (const rule of pageViewLeadCreateEvents) {
        log(
          `  ✗ ${rule.destination}${rule.mentionsContact ? '  (/contact)' : ''}`,
        )
      }
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
