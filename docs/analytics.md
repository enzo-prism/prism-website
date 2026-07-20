# Analytics

How measurement works on design-prism.com, and the operational steps that live
outside this repo.

## Stack

| Surface | What it is | Where it is wired |
|---|---|---|
| GA4 | Property `G-P9VY77PRC0` (override: `NEXT_PUBLIC_GA_MEASUREMENT_ID`) | `app/layout.tsx` head scripts |
| Google Ads | Account `AW-11373090310`, lead + purchase conversion actions | `lib/constants.ts`, `utils/analytics.ts` |
| Vercel Web Analytics | Pageviews + custom events | `components/vercel-analytics.tsx` |
| Vercel Speed Insights | Core Web Vitals | `app/layout.tsx` |
| Hotjar | Session replay, loaded on first interaction | `app/layout.tsx` |

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
- `TrackEventOptions.structuredParams` merges *after* sanitization, for
  non-scalar GA4 params like ecommerce `items`. Only pass caller-constructed
  literals through it — never user input.

## Conversions

**Leads.** `trackFormSubmission` → `trackLeadConversion` → GA4 `generate_lead`
plus a Google Ads conversion. Two modes:

- `pending` (default) stores context in sessionStorage; the `/thank-you` route
  mounts `LeadSuccessTracker`, which consumes it and fires. Use when the form
  navigates on success.
- `immediate` fires inline. Use when the form shows an in-page success screen
  and never navigates — the `/websites` $300 order form is the case in point.

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
the customer data terms accepted) in Google Ads — *not* "enhanced conversions
for leads", which is the offline/CRM-upload product and would leave this data
unused.

`gtag('set', 'user_data', ...)` is page-scoped, and the buyer reaches the
purchase confirmation as a fresh document after a cross-origin Stripe redirect.
So the digests (never the raw values) are persisted to localStorage for 6 hours
and re-applied by `applyStoredEnhancedConversionUserData()` before the purchase
conversion fires. `set` only affects *subsequent* events, so that ordering is
load-bearing in both places.

**ID length.** Google Ads caps `transaction_id` at 64 characters; a Stripe
Checkout Session id is 66. The Ads conversion therefore drops the fixed
`cs_live_`/`cs_test_` prefix. GA4 keeps the full id (100-char limit).

## The $300 purchase flow

1. Visitor completes `components/forms/WebsiteOrderForm.tsx` → Formspree POST.
2. On success: `website_order_submitted`, then hashed identifiers, then
   `trackFormSubmission(..., { conversionMode: 'immediate' })` → GA4
   `generate_lead` + Ads lead conversion, keyed on the `PRISM-XXXX` order
   reference for de-duplication.
3. Buyer clicks the Stripe Payment Link (new tab) → `website_order_begin_checkout`.
4. Stripe redirects to `/checkout/website/thank-you?session_id={CHECKOUT_SESSION_ID}`.
5. `PurchaseSuccessTracker` fires GA4 `purchase` + Ads purchase conversion,
   using the Stripe session id as `transaction_id`.

Without a well-formed `session_id` the tracker deliberately does nothing —
someone reached the URL without checking out, and firing there would invent
revenue.

**Known limitations.** Two, both worth understanding before trusting the number:

1. *The session id is not proof of payment.* It arrives in the URL, so the
   tracker only shape-checks it (`cs_live_…`/`cs_test_…`). That stops casual
   forgery — without it, loading `?session_id=1`, `=2`, `=3` would mint
   unlimited $300 conversions, since each distinct string defeats
   de-duplication — but it is not verification.
2. *Redirect-triggered means under-counting too.* A buyer who closes the tab
   before the redirect is missed, and ad blockers suppress the hit entirely.

Both are fixed by the same upgrade: a **Stripe webhook feeding the GA4
Measurement Protocol** server-side, which reports on confirmed payment rather
than on page arrival. That is the recommended next step if purchase volume
justifies it.

De-duplication is layered: GA4 de-duplicates `purchase` on `transaction_id`
server-side, and Google Ads does the same for conversions. The client-side
localStorage guard is not strictly required for those — it exists because
Vercel Analytics has no de-duplication at all, and because it is per-browser it
cannot catch a buyer opening the confirmation link on a second device. The
server-side layer is what catches that.

## Runbook: things that live outside this repo

`pnpm audit:ga4` checks items 1 and 2 automatically by parsing the gtag.js that
Google serves for the measurement ID — that payload embeds the property's admin
settings, so drift is detectable without GA account access.

### 1. Turn OFF Enhanced Measurement history page views

GA4 Admin → Data streams → (stream) → Enhanced measurement → gear icon →
uncheck **"Page changes based on browser history events"**. Leave the other
enhanced measurement options alone. Without this, SPA navigations double-count.

### 2. Audit the second destination `G-SNZ80JMX80`

The Google tag currently fans every hit out to a second GA4 property that is
referenced nowhere in this codebase. GA4 Admin → Google tag → Configure tag
settings → Manage connected tags. Either remove it, or acknowledge it with
`GA_ALLOWED_DESTINATIONS=G-SNZ80JMX80 pnpm audit:ga4`.

### 3. Point the live Stripe link at the confirmation page

```bash
./scripts/update-website-payment-link.sh          # dry run
./scripts/update-website-payment-link.sh --apply  # live update
```

Updates the existing link in place. Do **not** re-run `create-website-link.sh`
to fix this — it would mint a duplicate product, price, and link while the URL
hard-coded in `lib/payment-links.ts` kept pointing at the old one.

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

### 7. Open question — Consent Mode defaults for EEA visitors

`app/layout.tsx` grants all four consent signals by default, with no
region scoping. That is defensible for genuinely US-only traffic, but Consent
Mode v2 has been required for EEA/UK traffic since March 2024, so a single EEA
visitor makes the current configuration non-compliant. The fix is a
region-scoped denied default ahead of the global granted one:

```js
gtag('consent', 'default', { region: ['EEA_COUNTRY_CODES', 'GB'], ad_storage: 'denied', /* … */ })
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
