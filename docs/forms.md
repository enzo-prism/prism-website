# Form + Thank-You Flow

Prism handles every marketing form through Formspree plus client-side redirects. Use this doc any time you add a new form.

## Shared hook

`hooks/use-form-validation.ts` centralizes HTML5 validation and submission. Pass an `onValidSubmit` callback to run custom code (e.g., `fetch(form.action)` and `router.push('/thank-you')`).

```ts
const { handleSubmit, getError, isSubmitting } = useFormValidation({
  onValidSubmit: async (form) => {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
    if (!response.ok) throw new Error('submission failed')
    router.push('/thank-you')
  },
})
```

## Existing forms

- `components/forms/FreeAnalysisForm.tsx`
- `components/forms/ContactForm.tsx`
- `components/forms/GetStartedForm.tsx` (`/apply`)
- `components/forms/WebsiteOrderForm.tsx` (`/websites`; replaces the retired `WebsiteBuildEstimatorForm.tsx`)
- `components/forms/ReferralForm.tsx` (`/refer`; $100-per-closed-referral program)
- `components/forms/FounderOsApplicationForm.tsx` (legacy archival form code; `/founder-os/apply` now 301-redirects to `/content-os` and should not receive active traffic)
- `components/forms/ScalingRoadmapForm.tsx`
- `components/ai-website-launch/AiWebsiteLaunchForm.tsx` (legacy archival form code; the `/ai-website-launch` route redirects to `/pricing` in production and should not receive active traffic)
- `components/forms/AeoAssessmentForm.tsx`
- `app/book-a-shoot/BookAShootForm.tsx`
- `app/scholarship/ScholarshipPageClient.tsx`
- `app/models/client-page.tsx`
- `app/ai/prism-ai-client.tsx`
- `app/designs/wine-country-root-canal/client-page.tsx` (client design vote)

## Adding a new form

1. Create a component under `components/forms/`.
2. Wire inputs to `useFormValidation({ onValidSubmit })` and call your Formspree endpoint via `fetch`.
3. On success, push to one of the thank-you routes.
4. Add your form component to the relevant route page.
5. Give the real `<form>` element a stable `id` and `name`. GA4 enhanced measurement uses those DOM attributes for `form_id` and `form_name`; hidden inputs alone are not enough.
6. Do not put `utm_*` parameters on internal thank-you redirects. If the thank-you page needs a mode marker, use `source=...` so real acquisition UTMs stay trustworthy.
7. Include the standard Formspree ops metadata from `components/forms/FormspreeOpsFields.tsx`:
   - Use `<FormspreeOpsFields formKey="...">` for regular `<form>` submissions.
   - Use `appendFormspreeOpsMetadata(formData, "...")` before imperative `FormData` posts.
   - Use `getFormspreeOpsMetadata("...")` when the endpoint expects JSON.
   - The helper adds `site`, `form_key`, `environment`, `_codex_test`, `page_path`, `referrer`, and `utm_*` fields. The `form_key` should match the Formspree ops registry and may differ from the user-facing `form_name`.
8. Use the right conversion mode:
   - Default pending mode for sales/business forms that redirect to a thank-you page with `LeadSuccessTracker`.
   - `conversionMode: "immediate"` for confirmed success states that stay on-page.
   - `sendGoogleAdsConversion: false` for scholarship, model, newsletter, community, or other non-sales submissions.

## Prism Growth Dashboard flow: `/get-started` + `/apply`

`app/get-started/page.tsx` is now the free Growth Dashboard entry page for growth-focused businesses. The actual dashboard intake form lives on `app/apply/page.tsx` and is powered by `components/forms/GetStartedForm.tsx`.

The `/apply` route should feel like a focused Growth Dashboard mode, not another marketing page. Keep the form broken into single-question screens, keep global chrome minimal, and keep the ElevenLabs floating widget suppressed while the user is inside the active form. Keep the DOM/form contracts below unchanged even when visible copy says Growth Dashboard, Growth Audit, Light Audit, or dashboard intake instead of application.

- Required payload fields:
  - `service_focus`
  - `has_website`
  - `review_link`
  - `primary_goal`
  - `company`
  - `full_name`
  - `email`
- Optional payload fields:
  - `service_interest[]`
  - `focus_labels`
  - `budget`
  - `timeline`
  - `additional_context`
- Hidden metadata contract:
  - `_subject` = `New Prism Growth Dashboard request`
  - `_redirect` = `/thank-you?source=apply`
  - `form_name` = `growth_application`
  - `_gotcha` (honeypot)
- DOM analytics contract:
  - `<form id="growth_application" name="growth_application">`
- Endpoint strategy:
  1. `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT` (preferred; posts to the Prism dashboard app and may return `dashboard.claimUrl`)
  2. `NEXT_PUBLIC_APPLY_FORM_ENDPOINT`
  3. `NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT` (backward-compatible legacy name)
  4. `https://formspree.io/f/mreroojo`
- Success flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - When the dashboard intake API returns `dashboard.claimUrl`, store it in session storage for the apply thank-you CTA; do not include it in analytics payloads.
  - On success, `router.push("/thank-you?source=apply")`
  - On failure, inline error state remains visible and user stays on the review/submit screen
- Current visible steps:
  - Focus: choose up to three improvement areas.
  - Link: choose website/profile and enter the URL to review.
  - Fit: optional current-offer fit and timing context (free audit, Website, Content OS, Dental OS, Prism Infinity, or not sure) with an explicit "Skip for now" button that clears both fields, fires `apply_question_skip`, and advances. The payload key remains `budget` for analytics and ops compatibility, but retired dollar-tier choices must not return.
  - Business: business name ("What is your business called?").
  - Contact: name and email.
  - Review: edit rows, add optional notes, and submit via "Get my free growth audit".
- Mobile step footer: the Back/Skip/Continue row is sticky at the viewport bottom on small screens so the primary action stays visible on long steps; it returns to static placement at `sm:` and up.
- Vocabulary: user-facing funnel copy leads with the free Growth Audit; the Growth Dashboard is described as where the audit is delivered. Backend field names, `_subject`, analytics event names, and CTA tracking labels intentionally keep their original `growth dashboard` naming for ops and GA continuity.
- Draft behavior:
  - Store in-progress answers in same-tab `sessionStorage` under `prism_apply_draft_v1`.
  - Restore answers on reload and clear the draft after a successful submit.
  - Keep the helper copy explicit that progress is saved only in the current tab on the current device; the optional early email does not create or send a resume link.
- Keyboard flow:
  - Enter advances the current non-review step after the same per-step validation as the Continue button.
  - Shift+Enter preserves a line break in the optional notes textarea.
  - ArrowRight/ArrowDown advance and ArrowLeft/ArrowUp go back only when focus is not inside text-editing controls or native radio groups.
  - After a keyboard or button step transition, focus moves to the first field/control for the new step on desktop; mobile viewports skip auto-focus to avoid keyboard jumps. Validation failures return focus to the first invalid field or choice group on desktop.
- Analytics:
  - `trackEvent("apply_form_view", ...)`
  - `trackEvent("apply_form_start", ...)`
  - `trackEvent("apply_question_view", ...)`
  - `trackEvent("apply_question_complete", ...)`
  - `trackEvent("apply_question_skip", ...)` when the optional fit step is skipped
  - `trackEvent("apply_validation_error", ...)`
  - `trackEvent("apply_review_view", ...)`
  - `trackEvent("apply_submit_attempt", ...)`
  - `trackEvent("apply_step_1_complete", ...)`
  - `trackEvent("apply_step_2_complete", ...)`
  - `trackEvent("apply_submit", ...)` only after Formspree confirms success
  - `trackEvent("apply_submit_success", ...)` only after Formspree confirms success
  - `trackEvent("apply_error", ...)`
  - `trackEvent("apply_success", ...)` on the apply thank-you view only when pending application context exists
  - `trackLeadConversion(...)` on the apply thank-you view after the pending application context is consumed
- Do not include user-entered names, emails, URLs, free-text notes, or unique per-event timestamps in GA params.

## `/websites` order flow: fullscreen dialog → staged success → pay `$300`

`components/forms/WebsiteOrderForm.tsx` powers the `$300` flat website order on `app/websites/page.tsx`. It replaces the retired `WebsiteBuildEstimatorForm.tsx` (the dynamic price estimator). There is **no** price estimator, no `/thank-you` redirect, and no "reviewed before payment" gate — the buyer pays right after submitting.

- User-facing flow:
  - The page renders a **launcher panel**; the launcher button, the hero CTA, and the sticky `MobileOrderBar` (both `/websites#order`) open a **fullscreen one-question-at-a-time dialog** (portal; the page behind is scroll-locked on `html`+`body` and marked `inert`; focus is trapped; Escape closes with state preserved).
  - Six steps (brand → audience/goal → brief → references → contact → review) with per-step validation, Enter-first keyboard flow, and a live **order-manifest rail** (desktop) / commit strip (mobile).
  - In-progress answers persist in same-tab `sessionStorage` under `prism_website_order_draft_v1` (restored on reopen/reload; cleared on successful submit — the launcher then reads "Resume your order").
  - On submit from review, the order is **captured via Formspree** (no thank-you redirect), then a **staged in-dialog success state** appears.
  - Each network submission receives an `order_reference` (`PRISM-...`) that is sent to Formspree and shown in both success surfaces so support can reconcile intake and payment.
  - The pre-payment success state says the brief/request is saved. It must not claim that a build slot is reserved or that work has started before Stripe confirms payment.
  - From the success state (and the launcher's post-submit state), a pay button **opens the Stripe `$300` Payment Link in a new tab** to kick off the build.
- Endpoint strategy (unchanged from the old form):
  - `NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT` (defaults to `https://formspree.io/f/xpqebnbz`)
- Submit flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - On success, swap to the in-page success state (do **not** `router.push` a thank-you route).
  - On failure, show inline error and keep the user on the form.
- Stripe pay step:
  - The pay button resolves through `lib/payment-links.ts`: `paymentLink("website")` returns the live link (`https://buy.stripe.com/8x2dRa3Aid1gasMeQDdZ60N`, Stripe product "Website by Prism") or the `/contact` fallback, and `hasPaymentLink("website")` gates whether it opens in a new tab vs. routes to `/contact`.
  - The Website link is live and wired; the optional `$100/month` care, Content OS, and Prism Infinity links still need creating (see `scripts/create-website-link.sh` and `scripts/create-stripe-links.sh`).
- Keep ops metadata, the honeypot, and any analytics events for this form aligned with the live `WebsiteOrderForm.tsx` source — including the `#order` deep link, the `prism_website_order_draft_v1` draft key, and the dialog scroll-lock/`inert` behavior; do not reintroduce estimator-only fields (`estimated_total`, `estimated_range_*`, `price_formula_version`) or the `?source=website-build` thank-you redirect.
- Do not include user-entered names, emails, URLs, or free-text notes in analytics params.

## Retired flow: `/founder-os/apply` + Founder OS application

> **Retired.** Founder OS is no longer a live offer. `/founder-os` and `/founder-os/apply` now 301-redirect to `/content-os` (see `next.config.mjs`), so this form receives no active traffic. The contract below is kept only as archival reference for the `components/forms/FounderOsApplicationForm.tsx` code that still exists behind the redirect.

`components/forms/FounderOsApplicationForm.tsx` powered the premium Founder OS application on `app/founder-os/apply/page.tsx`. Unlike the marketing forms above, it was a long, **selective application** (not a contact form): a 90-second fit check, then ~12 substantive screens grouped into six named sections (Fit → Leverage → Workflow → Systems → Control → Readiness).

- Behavior:
  - Section-based progress (not a percentage), Back on every step, per-step validation, and conditional branches (multi-location scale, proprietary systems, regulated-data compliance).
  - Declining the investment gate routes to an off-ramp (Growth Dashboard, foundation work, waitlist) with an "continue anyway" path.
  - Two required open responses: the first trustworthy question and the first workflow.
  - On success it renders an **in-place confirmation** (echoing the applicant's first workflow + 90-day target) — it does **not** redirect to a `/thank-you` route, and there is intentionally no calendar.
- Hidden metadata contract:
  - `_subject` = `New Founder OS application`
  - `form_name` = `founder_os_application`
  - `_gotcha` (honeypot)
  - `<FormspreeOpsFields formKey="founder_os_application">`
  - Every answer is mirrored as a hidden input (so the `FormData` payload is complete), plus the two acknowledgments and optional marketing consent.
- DOM analytics contract:
  - `<form id="founder_os_application" name="founder_os_application">`
- Endpoint strategy:
  - `NEXT_PUBLIC_FOUNDER_OS_FORM_ENDPOINT` (defaults to `https://formspree.io/f/xkoalapv`)
- Success flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - On `response.ok`, show the in-place confirmation and fire the success events; on failure, keep the user on the review screen with an inline error.
- Analytics:
  - `founder_os_application_start`
  - `founder_os_application_validation_error`
  - `founder_os_application_submit_attempt`
  - `founder_os_application_submit_success`
  - `founder_os_application_submit_error`
  - Do not include user-entered names, emails, URLs, or free-text answers in analytics params.
- The `/founder-os/apply` route is `noindex` (transactional surface); the marketing page `/founder-os` is the indexable acquisition surface.

## New flow: `/aeo` + free AEO assessment

`components/forms/AeoAssessmentForm.tsx` handles the free AEO assessment capture and is embedded on `app/aeo/page.tsx`.

- Required payload fields:
  - `email` (`type="email"`, required)
  - `website` (`type="url"`, required)
- Optional payload metadata fields:
  - `_subject` (`New AEO assessment request`)
  - `_redirect` (`/aeo-thank-you`)
  - `form_name` (`aeo_assessment`)
  - `_gotcha` (honeypot trap)
- DOM analytics contract:
  - `<form id="aeo_assessment" name="aeo_assessment">`
- Endpoint strategy:
  - `NEXT_PUBLIC_AEO_FORM_ENDPOINT` (falls back to `https://formspree.io/f/xldarokj`)
- Success flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - On success, `router.push("/aeo-thank-you")`
  - On failure, inline error state remains visible and user stays on the form
- Analytics:
  - `trackFormSubmission("aeo_assessment", "hero_form")` on successful submit
  - `LeadSuccessTracker` on `/aeo-thank-you` consumes the pending submission and emits `generate_lead` once
  - `trackCTAClick("get free aeo assessment", "aeo hero form")` on the submit button click

### Codex handoff: AEO form contracts + validation tests

- Required payload contract:
  - `email` (`type="email"`, required)
  - `website` (`type="url"`, required)
- Hidden metadata contract:
  - `_subject` = `New AEO assessment request`
  - `_redirect` = `/aeo-thank-you`
  - `form_name` = `aeo_assessment`
  - `_gotcha` (honeypot)
- Endpoint contract:
  - Dedicated endpoint via `NEXT_PUBLIC_AEO_FORM_ENDPOINT` (fallback to `https://formspree.io/f/xldarokj`)
- Success contract:
  - `fetch` must send `Accept: application/json`
  - On `response.ok`, route navigation must be `"/aeo-thank-you"`

### Recommended tests to run for future edits

- `pnpm exec jest __tests__/aeo-form.test.tsx`
- `pnpm exec jest __tests__/aeo-pages.test.tsx`
- `pnpm exec jest __tests__/aeo-discoverability.test.tsx`
- `pnpm exec jest __tests__/sitemap.test.ts`

Success criteria from these tests:

- Form renders both required fields and hidden metadata.
- Blank email + malformed URL block submit and surface native-style inline validation.
- Valid submit includes expected form fields in request payload and redirects to `/aeo-thank-you`.
- Failed network call keeps user on page with inline failure copy.
- `/aeo` metadata includes intended SEO intent (title + description + canonical).
- `/aeo` content includes framework, evidence, FAQ, and CTA wiring.
- `/aeo-thank-you` returns noindex metadata.
- `OffersClientPage` (archival component), `/ai-seo-services`, and `/seo` include discoverability links to `/aeo`.
- Sitemap includes `/aeo` and excludes `/aeo-thank-you`.

Important routing note:

- `/offers` now redirects to `/pricing` in production and is noindex. If you need to verify the legacy AEO discoverability wiring there, test the `OffersClientPage` component directly rather than treating `/offers` as an active search surface.

## `/refer` referral form ($100 program)

- Component: `components/forms/ReferralForm.tsx`, rendered by `app/refer/page.tsx` (dark system; replaced the legacy light page + external Typeform).
- Offer: a flat `$100` referral payout, paid when the referred business becomes a paying Prism client (website, Content OS, Dental OS, or Prism Infinity). Fine print lives on the page; keep "referral payout, not service pricing" framing so pricing-consistency context rules stay satisfied if legacy tokens ever reappear.
- Endpoint: `NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT` ?? `https://formspree.io/f/meebpgaj` (dedicated referral form, wired 2026-07-02). Submissions carry `form_key=referral` / `_subject: "New referral — $100 program"`.
- Fields: `referrer_name`\*, `referrer_email`\*, `friend_name`\*, `friend_business`, `friend_contact`\* (email or phone, free text), `friend_need`, `note` + standard ops fields (`FormspreeOpsFields formKey="referral"`), `_gotcha` honeypot, hidden `form_name=referral`.
- Consent: `referral_permission=confirmed` is required before submission. The user-facing checkbox must state that the referrer has permission to share the friend's contact details and that Prism will use them only for referral follow-up.
- Success: in-page success state with a "Refer another friend" reset (keeps the referrer's name/email, clears the friend fields). No thank-you route.
- Analytics: `trackFormSubmission('referral', 'referral_form', { conversionMode: 'immediate', sendGoogleAdsConversion: false })` — referral payouts are not sales leads.
- Entry points: /tiktok /ig /youtube link hubs ("Refer a friend" card), footer Company column, `/referral` + `/referrals` + `/affiliate` redirects.

## Thank-you pages

- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — used by Apply and Contact. The Prism Growth Dashboard flow sends `?source=apply`. (The `/websites` order flow no longer redirects here — it shows an in-page success screen, then opens the Stripe `$300` Payment Link.)
- `/analysis-thank-you` ([`app/analysis-thank-you/page.tsx`](../app/analysis-thank-you/page.tsx)) — used by the Free Analysis form.
- `/aeo-thank-you` ([`app/aeo-thank-you/page.tsx`](../app/aeo-thank-you/page.tsx)) — used by the AEO assessment form.
- `/book-a-shoot/thank-you` ([`app/book-a-shoot/thank-you/page.tsx`](../app/book-a-shoot/thank-you/page.tsx)) — used by the photography booking request form.

Each page is intentionally minimal. `/thank-you` stays review-led by default and can switch into the stricter apply-specific state when the URL includes `?source=apply`.
These routes are noindex/no-follow and **not** blocked in `robots.txt` so search engines can read the meta noindex directive.

## Other tracked submission surfaces

### `/book-a-shoot`

- Endpoint: `https://formspree.io/f/xjkjkggn`
- DOM analytics contract: `<form id="book_a_shoot" name="book_a_shoot">`
- Success flow: client-side `fetch` with `Accept: application/json`, then `router.push("/book-a-shoot/thank-you")`
- Scheduling contract: both preferred windows have explicit date/time labels, use `booking_timezone=America/Los_Angeles`, and display Pacific Time to the user. Dates must be later than today, and the second date/time pair must differ from the first.
- Analytics: `trackFormSubmission("book_a_shoot", "book_a_shoot_form", { lead_type: "shoot_request" })`; the thank-you page mounts `LeadSuccessTracker` and emits `generate_lead` once.

### `/scholarship`

- Endpoint: `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT` or `https://formspree.io/f/mwpwwjek`
- DOM analytics contract: `<form id="scholarship_application" name="scholarship_application">`
- Success flow: client-side `fetch` with inline success copy.
- Validation: first name, last name, email, referral source, and project description must pass the shared `useFormValidation` flow before the Formspree payload is built. Errors focus the first invalid control and are linked with `aria-describedby`.
- Analytics: `trackFormSubmission("scholarship_application", "scholarship_form", { conversionMode: "immediate", sendGoogleAdsConversion: false })`.

### `/models`

- Endpoint: `https://formspree.io/f/mrbyvoqo`
- DOM analytics contract: `<form id="model_application" name="model_application">`
- Success flow: client-side `fetch` with inline success copy.
- Validation: name, city/state, preferred contact method, and the conditional email or mobile field must pass the shared `useFormValidation` flow before submission. Mobile numbers use a US phone pattern; errors focus the first invalid control and are announced.
- Analytics: `trackFormSubmission("model_application", "models_form", { conversionMode: "immediate", sendGoogleAdsConversion: false })`.

### `/ai`

- Endpoint: `https://formspree.io/f/xzdpoyer`
- The three-step utility form submits a website brief, company, email, mobile number, and standard Formspree/attribution metadata.
- `sms_consent=yes` is required with the mobile number. The consent copy includes message/data-rate and opt-out language.
- The final CTA is "Send My Brief". Success copy confirms receipt and review; it must not say the website is already being built.

### Wine Country design vote

- Endpoint: `https://formspree.io/f/mldayroq`
- The submit button locks while the request is pending so a single interaction cannot create duplicate votes.
- Validation and network failures use different, accurate live error messages.

## FAQ / Troubleshooting

- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
