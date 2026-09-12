# Analytics

How measurement works on design-prism.com, and the operational steps that live
outside this repo.

## Stack

| Surface               | What it is                                                          | Where it is wired                        |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| GA4                   | Property `G-P9VY77PRC0` (override: `NEXT_PUBLIC_GA_MEASUREMENT_ID`) | `app/layout.tsx` head scripts            |
| Google Ads            | Account `AW-11373090310`, lead + purchase conversion actions        | `lib/constants.ts`, `utils/analytics.ts` |
| Vercel Web Analytics  | Pageviews + custom events                                           | `components/vercel-analytics.tsx`        |
| Vercel Speed Insights | Core Web Vitals                                                     | `app/layout.tsx`                         |
| Hotjar                | Session replay, loaded on first interaction                         | `app/layout.tsx`                         |

`IS_ANALYTICS_ENABLED` (in `lib/constants.ts`) gates all GA/Ads sending to the
real production environment. Preview deployments build with
`NODE_ENV === "production"` too, so the gate keys off `NEXT_PUBLIC_VERCEL_ENV` —
without that, preview traffic and QA lead conversions would land in the live
property. Vercel Web Analytics needs no such gate: its reporting is
production-only by design, and preview events are segmented out.

## Page views

`gtag('config', ...)` runs with `send_page_view: false`. Page views are sent
manually by `components/enhanced-analytics.tsx` on every route change, which
gives us sanitized URLs (no PII, no high-cardinality query params) and
attribution context that GA4's automatic page_view does not carry.

**This means GA4's Enhanced Measurement "page changes based on browser history
events" MUST stay off.** With it on, every client-side navigation is counted
twice. Run `pnpm audit:ga4` to check.

## Events

`utils/analytics.ts` is the single entry point. `trackEvent` enriches every hit
with attribution + page context, runs the PII sanitizer, mirrors the event to
Vercel Analytics via `lib/vercel-analytics.ts`, then sends to GA4.

The sanitizer drops emails, phone numbers, raw URLs, and anything in
`FORBIDDEN_ANALYTICS_PARAM_KEYS`. Two deliberate exceptions:

- `OPAQUE_ID_PARAM_KEYS` (`transaction_id`, `item_id`) skip the phone-number
  heuristic, because a digit-heavy Stripe session id would otherwise be dropped
  and break conversion de-duplication.
- `TrackEventOptions.structuredParams` merges _after_ sanitization, for
  non-scalar GA4 params like ecommerce `items`. Only pass caller-constructed
  literals through it — never user input.

## Conversions

**Leads.** `trackFormSubmission` → `trackLeadConversion` → GA4 `generate_lead`
plus a Google Ads conversion. Two modes:

- `pending` (default) stores context in sessionStorage; the `/thank-you` route
  mounts `LeadSuccessTracker`, which consumes it and fires. Use when the form
  navigates on success **and** the conversion should be attributed to the
  thank-you page (Apply is the remaining first-party case).
- `immediate` fires inline on confirmed submit. Use when the form shows an
  in-page success screen (`/website-intake`, dedicated Formspree form
  `xrpzlkrd`) **or** when the conversion must keep `page_path` on the form
  route. `/contact` is the latter: it still navigates to `/thank-you` for
  copy, but fires `generate_lead` once on successful Formspree POST so the
  event's `page_path` is `/contact`. It must not also store a pending lead,
  or `LeadSuccessTracker` on `/thank-you` would double-count. Apply
  `generate_lead` on `/thank-you?source=apply` is unchanged
  (`ApplySuccessTracker`). See
  [`docs/forms.md`](forms.md#formspree-dashboard-configuration).

**`/contact` page-view leak (fixed in code 2026-08-31; admin follow-up).**
First-party code never called `generate_lead` on `/contact` page load or
form render. `ContactForm` only called `trackFormSubmission` after a
successful POST (historically in `pending` mode), `app/contact/page.tsx`
has no conversion call, and `EnhancedAnalytics` only sends `page_view`.
Last-30-day equality of `/contact` `generate_lead` = `page_view` = starred
key events (with `form_submit_success` / `form_start` at 1) is therefore a
**GA4 Admin "Create event"** (or a migrated Universal Analytics destination
goal) that copies `page_view` → `generate_lead` when `page_path` is
`/contact`. Those rules run server-side after the hit arrives; they do not
appear as `gtag('event', 'generate_lead')` in this repo.

Delete that create-event in GA4 Admin → Events → Create event (and any
Google tag event-creation analogue that matches `/contact` page views).
Until it is gone, every `/contact` page view still inflates the starred
key event, and a real submit would count twice (page-view copy + first-party
submit). Do not mark `page_view` itself as a key event on `/contact`.

**Lead values.** `lib/lead-values.ts` maps `lead_type` to an expected USD value
so Smart Bidding can weigh a $300 order against a free-audit request. Before it
existed, every conversion was sent with `value: 1` — telling Ads that a
newsletter signup and a paid order were worth exactly the same. The numbers are
relative weights, not revenue reporting; re-tune them as close-rate data
accrues.

**Purchases.** `trackPurchase` fires GA4 `purchase` (with `items`) and, when
`NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL` is set, a separate Ads purchase
conversion. It is idempotent per `transaction_id` via localStorage, so a
reloaded or re-opened confirmation URL cannot double-count.

**Enhanced conversions.** `setEnhancedConversionUserData` normalizes and
SHA-256-hashes the buyer's email (and phone, when confidently normalizable to
E.164) and hands the digests to gtag as `user_data`. Raw values never leave the
browser, are never logged, and never pass through `trackEvent`. Requires
**enhanced conversions for web** to be enabled on the conversion action (with
the customer data terms accepted) in Google Ads — _not_ "enhanced conversions
for leads", which is the offline/CRM-upload product and would leave this data
unused.

`gtag('set', 'user_data', ...)` is page-scoped, and the buyer reaches the
purchase confirmation as a fresh document after a cross-origin Stripe redirect.
So the digests (never the raw values) are persisted to localStorage for 6 hours
and re-applied by `applyStoredEnhancedConversionUserData()` before the purchase
conversion fires. `set` only affects _subsequent_ events, so that ordering is
load-bearing in both places.

**ID length.** Google Ads caps `transaction_id` at 64 characters; a Stripe
Checkout Session id is 66. The Ads conversion therefore drops the fixed
`cs_live_`/`cs_test_` prefix. GA4 keeps the full id (100-char limit).

## Legacy purchase redirect

The old `/checkout/website/thank-you` page remains available for existing links,
but no longer mounts a purchase tracker. A public `session_id` (including a
well-formed `cs_live_` id) does not prove a paid transaction. Reporting a fixed
$300 from it could invent revenue; `cs_test_` must never count as production
revenue either. Re-enable purchase reporting only through verified live paid
Stripe sessions/webhooks, using the actual paid amount/currency and durable
transaction deduplication. Until then use Stripe as the revenue source of truth.
The unused purchase helper and tests remain for future verified integration.

Enhanced-conversion hashing helpers exist, but the current production lead
forms do not call them. Do not describe enhanced conversions as active.

## Runbook: things that live outside this repo

`pnpm audit:ga4` checks items 1 and 2 automatically by parsing the gtag.js that
Google serves for the measurement ID — that payload embeds the property's admin
settings, so drift is detectable without GA account access.

### 1. Turn OFF Enhanced Measurement history page views

GA4 Admin → Data streams → (stream) → Enhanced measurement → gear icon →
uncheck **"Page changes based on browser history events"**. Leave the other
enhanced measurement options alone. Without this, SPA navigations double-count.

### 2. Tag separation (RESOLVED 2026-07-25 — kept as history)

design-prism.com used to record every pageview in **four** destinations. A
single Google tag named "Family First Smile Care" had **12 tag IDs merged into
it** (six GA4 properties across four businesses, plus the Ads account) but only
**two destinations**: `G-54ESSN4BF8` and `AW-11373090310`. Any site firing any
of those 12 ids therefore wrote into a client's GA4 property.

Measured before the fix, last 7 days on `G-54ESSN4BF8` (Family First Smile
Care's retired property) by hostname:

| hostname                 | pageviews |    share |
| ------------------------ | --------: | -------: |
| www.design-prism.com     |       539 |    46.6% |
| localhost                |       291 |    25.2% |
| exquisitedentistryla.com |       111 |     9.6% |
| 127.0.0.1                |       109 |     9.4% |
| www.famfirstsmile.com    |       102 | **8.8%** |

Under 9% of the client's own property was the client's own site.

**What was changed**

1. Removed `G-SNZ80JMX80` ("Prism", a duplicate of Prism Website) as a
   destination on the `G-P9VY77PRC0` Google tag.
2. Turned OFF Enhanced Measurement "page changes based on browser history
   events" (see item 1) — SPA navigations were counted twice.
3. Removed `G-54ESSN4BF8` as a destination on the merged tag, reassigning it to
   a new, uninstalled tag named "FFSC retired property G-54ESSN4BF8 -
   detached". Google requires a destination be moved to another tag rather than
   deleted outright.
4. Created the missing GA4 -> Google Ads link on the client's LIVE property,
   `properties/518867337` (`G-L7MH47XYXL`, famfirstsmile.com) ->
   customer `3539046031`. It had none, which is why an actively spending
   campaign reported zero conversions while the property was recording ~50
   `generate_lead` events every 28 days.

**Verified end state** — every tag now resolves to exactly itself:

```
G-P9VY77PRC0    -> G-P9VY77PRC0     design-prism.com
AW-11373090310  -> AW-11373090310   Prism Google Ads
G-L7MH47XYXL    -> G-L7MH47XYXL     famfirstsmile.com (client)
```

`pnpm audit:ga4` exits 0. On the live site a client-side navigation now produces
exactly one `page_view` for `G-P9VY77PRC0` and nothing for any client property.

**Still open:** the client's `generate_lead` needs to be imported as a
conversion action in Ads and enabled for the Family First campaign. Google
surfaces newly linked GA4 key events on its own schedule (`purchase` appeared
within minutes; the custom events lag). Check Goals -> Conversions for
"Family First Smile Care, Website (web) generate_lead", enable it, and set it
primary for that campaign.

**Do not** remove `AW-11373090310` from the merged tag. Prism runs client
campaigns (Wong-DDS, Family First) out of that account, so it is load-bearing.

`pnpm audit:ga4` walks the destination graph transitively — an earlier version
parsed only our own tag payload and reported two destinations while the browser
was really sending to four.

### 3. Point the live Stripe link at the confirmation page

Legacy: the site is now call-first, `lib/payment-links.ts` is gone, and the
Stripe link-management scripts (`update-website-payment-link.sh`,
`create-website-link.sh`, `create-stripe-links.sh`) were removed — recover them
from git history if an old payment link ever needs its redirect updated. The
existing live link already points at `/checkout/website/thank-you`.

### 4. Exclude `buy.stripe.com` as a referral

GA4 Admin → **Data collection and modification** → Data streams → (web stream)
→ Configure tag settings → **Show all** (the setting is hidden by default) →
**List unwanted referrals** → add `buy.stripe.com`.

Note the mechanism, because the common explanation is Universal Analytics
behavior that no longer applies: in GA4 a mid-session referral does **not**
start a new session. What actually happens is (a) the `buy.stripe.com` referral
attaches to the `purchase` event itself and feeds event-based attribution, so
the sale gets credited to Stripe rather than the campaign that earned it, and
(b) if checkout takes longer than the 30-minute session timeout — entirely
plausible — a genuinely new session does start, sourced to Stripe. Do this at
the same time as step 3, since the redirect is what creates the exposure.

### 5. Create the Google Ads purchase conversion action

Google Ads → Goals → Conversions → New conversion action → Website → category
**Purchase**. Copy the conversion label (the part after the `/`) into
`NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL` in Vercel's environment variables, then
redeploy. While there, enable **enhanced conversions for web** on the
conversion action and accept the customer data terms, so the hashed identifiers
the site already sends are actually used.

### 6. Decide how the lead and purchase actions interact

Once step 5 is live, one $300 buyer fires **two** conversion actions: the lead
at submit ($300) and the purchase at payment ($300). If both are marked
**Primary**, Ads sees $600 of value per buyer and bids on inflated returns.

Pick one:

- Mark the **lead** action Secondary (observation-only) and let the purchase
  action drive bidding. Cleanest once purchase volume is meaningful.
- Or keep the lead Primary and lower `website_order` in `lib/lead-values.ts` to
  an expected value (price × observed pay-through rate).

Two related constraints worth knowing: lead values only influence bidding under
**Maximize conversion value** or **Target ROAS** — under Target CPA or Maximize
conversions they are recorded but ignored — and tROAS wants roughly 15
conversions in the trailing 30 days before it behaves well. Also re-tune values
**rarely and in one batch**: each change can re-trigger the bid strategy's
learning period, which takes up to about two weeks to settle.

### 7. Delete the `/contact` page_view → `generate_lead` Create event

GA4 Admin → Events → Create event. Remove any rule whose destination event
is `generate_lead` and whose condition is `page_view` (or `page_location` /
`page_path` contains `/contact`). Also check Google tag → Event settings
for a compiled analogue. That rule is what made `/contact` `generate_lead`
equal `/contact` `page_view` and inflated the starred key event. First-party
code now fires `generate_lead` only after a successful contact submit.

Leave the Apply `/thank-you?source=apply` `generate_lead` alone.

### 8. Open question — Consent Mode defaults for EEA visitors

`app/layout.tsx` grants all four consent signals by default, with no
region scoping. That is defensible for genuinely US-only traffic, but Consent
Mode v2 has been required for EEA/UK traffic since March 2024, so the defaults require a consent-management review for traffic from those regions. The fix is a
region-scoped denied default ahead of the global granted one:

```js
gtag('consent', 'default', {
  region: ['EEA_COUNTRY_CODES', 'GB'],
  ad_storage: 'denied' /* … */,
})
```

This is left as a decision rather than applied, because denying by default
without a consent banner to grant it means EEA data is simply lost — a legal
and business call, not a code cleanup. Note also that the current comment in
`app/layout.tsx` claiming the granted defaults "emit the v2 signals Google Ads
needs for EEA modeling" is **not accurate**: conversion modeling requires
observing a denied→granted transition from a real CMP, which the site does not
have.

## Verifying a change

- `pnpm test -- analytics` — unit coverage for the analytics module, the Vercel
  event mappings, lead values, and the purchase tracker.
- `pnpm audit:ga4` — live GA4 admin configuration.
- GA4 **DebugView** with the GA Debugger extension — confirms real hits,
  including that exactly one `page_view` fires per navigation.


### Service intake funnels (2026-09-06)

Website, Content, and Ads share the `${service}_intake` funnel. Events include `_form_view`, `_form_start`, `_step_view`, `_step_complete`, `_option_select`, `_validation_error`, `_submit_attempt`, `_submit_error`, `_submit_success`, `_source_select`, `_booking_click`, `_abandon`, and `_agent_prepare`. `form_name` and `form_location` distinguish services. The existing `trackFormSubmission` emits form submission and immediate `generate_lead` only after Formspree accepts. Lead values live in `lib/lead-values.ts`: `website_intake` (180), `content_intake` (150), `ads_intake` (150). The existing GA4 key event and Google Ads conversion wiring are reused; no new GA conversion action is required. No email, phone, business link, or free text is sent to GA. Local and preview traffic retain the existing analytics host/environment gates. WebMCP preparation is an interaction, never a conversion. Live GA ingestion and email delivery require separate readback; a mocked request is not delivery evidence. Vercel custom events map all three services (`Website Intake …`, `Content Intake …`, `Ads Intake …`) through `lib/vercel-analytics.ts`.

### Social link-in-bio hubs (`/ig`, `/tiktok`, `/youtube`)

The shared hub (`components/social-link-hub.tsx`) is a noindex converter. Each of the three CTAs fires `cta_click` with:

- `cta_text`: `website` | `content` | `ads`
- `cta_location`: `{platform} landing actions` (`instagram landing actions`, `tiktok landing actions`, `youtube landing actions`)
- `platform`: `instagram` | `tiktok` | `youtube`
- `service`: `website` | `content` | `ads`
- `destination`: `/website-intake` | `/content-intake` | `/ads-intake`

The header profile link stays on `trackExternalLinkClick` with location `{platform} landing header`. Opening a CTA is a same-origin navigation to the existing intake form (`WebsiteIntakeForm`). That form already emits `${service}_intake_form_view`, `_form_start`, `_submit_success`, and `form_submit_success` / `generate_lead`. First-touch UTMs and `landing_path` (for example `/ig`) persist through `lib/marketing-attribution.ts` and are attached to later events and Formspree payloads; hub links should not append `utm_*` themselves.



## Audit and measurement plan — 2026-09-12

Verified authenticated property: **Prism Website**, `508295014`, account
`371048828`, stream `12280177779`, measurement ID `G-P9VY77PRC0`, URL
`https://www.design-prism.com`.

### Verified live settings

- Public tag destinations: only `G-P9VY77PRC0` and `AW-11373090310`.
- Automatic history pageviews are absent from the compiled tag; manual route
  pageviews remain the owner.
- Admin custom event list is empty: the historic contact page-view-to-lead rule
  is no longer present.
- `generate_lead` and automatic `form_submit` are both key events. Remove the
  key-event designation from `form_submit`; keep it as diagnostic telemetry.
- Event retention: **2 months**; user retention: **14 months**, reset on new
  activity enabled. Proposed event retention: **14 months**, subject to approval.
- No custom dimensions registered. Internal Traffic exclusion is **Testing**,
  not Active. Validate the matching rule before activating; excluded data cannot
  be recovered.
- No Search Console or BigQuery link configured.
- Stream email redaction is active; query-key redaction is inactive. First-party
  URL sanitizers now reject encoded email/phone campaign values and credentials.
  Automatic Google events do not pass through the first-party sanitizer.

### Local fixes (not deployed)

- Vercel tracks all Website/Content/Ads intake stages using service-specific
  allowlists, including agent preparation (an interaction, not a conversion).
- Scroll milestones reset per pathname. `page_engagement` uses visible time and
  flushes once at the first qualifying hide/pagehide/unmount. It does not measure
  the total across later resumes; use GA native engagement metrics for totals.
- Legacy redirect no longer emits unverified purchases.
- Public tag audit now fails when automatic `form_submit` is a key event, and
  no longer describes a public-tag-only pass as a complete Admin audit.

### Proposed reporting definitions

Create these **event-scoped** dimensions, with the parameter as the stable key:

| Display name | Parameter | Purpose |
| --- | --- | --- |
| Form name | `form_name` | Compare service funnels |
| Form location | `form_location` | Separate placement/success surfaces |
| Lead type | `lead_type` | Accepted leads by flow |
| CTA text | `cta_text` | Compare calls to action |
| CTA location | `cta_location` | Compare placements |
| Destination host | `destination_host` | Booking/outbound destinations |
| Intake step | `step_id` | Step progression |
| Abandoned step | `funnel_step_id` | Abandonment diagnostics |
| Validation field | `field_name` | Find form friction without values |
| Error reason | `reason` | Bounded failure categories |

Create event-scoped metrics `elapsed_seconds` (seconds),
`time_on_page_seconds` (seconds), and `max_scroll_depth_percent` (standard).
Do not register transaction IDs, complete URLs, click IDs, or user-entered text
as custom dimensions. Registration is prospective, not a historical backfill.

### Decision report

Use GA sessions/users rather than summed custom event counts as denominators.
Report acquisition by session channel and landing page; landing-to-intake-start;
intake view/start/step/accepted submission by service; booking **clicks** separately
from confirmed bookings; and lead quality/revenue only from actual CRM/payment
outcomes. Break down by device and compare equal complete date windows.
Use Search Console clicks/impressions/CTR/position for search visibility and
Vercel Speed Insights for field performance. Tag owned campaign links consistently
with `utm_source`, `utm_medium`, `utm_campaign`, and placement `utm_content`;
never put UTMs on internal links or customer identifiers in campaign values.

Follow-ups requiring business/configuration choices: approved retention,
Search Console link, qualified/closed-lead CRM integration, intentional service
lead weights (Website 180 and Content/Ads 150 as configured upstream, not revenue),
confirmed-booking integration, and consent management. Current consent defaults
are granted globally and are not evidence of visitor consent. Do not activate
hashed customer-data sharing merely because helper code exists.

References: [GA SPA measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications),
[custom definitions](https://support.google.com/analytics/answer/14240153),
[data retention](https://support.google.com/analytics/answer/7667196).
