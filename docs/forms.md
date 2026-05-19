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
- `components/forms/ScalingRoadmapForm.tsx`
- `components/ai-website-launch/AiWebsiteLaunchForm.tsx` (inline card form for the AI launch offer; embedded in `app/ai-website-launch/client-page.tsx` and wired with `useFormValidation`)
- `components/forms/AeoAssessmentForm.tsx`
- `app/book-a-shoot/BookAShootForm.tsx`
- `app/scholarship/ScholarshipPageClient.tsx`
- `app/models/client-page.tsx`

## Adding a new form

1. Create a component under `components/forms/`.
2. Wire inputs to `useFormValidation({ onValidSubmit })` and call your Formspree endpoint via `fetch`.
3. On success, push to one of the thank-you routes.
4. Add your form component to the relevant route page.
5. Give the real `<form>` element a stable `id` and `name`. GA4 enhanced measurement uses those DOM attributes for `form_id` and `form_name`; hidden inputs alone are not enough.
6. Use the right conversion mode:
   - Default pending mode for sales/business forms that redirect to a thank-you page with `LeadSuccessTracker`.
   - `conversionMode: "immediate"` for confirmed success states that stay on-page.
   - `sendGoogleAdsConversion: false` for scholarship, model, newsletter, community, or other non-sales submissions.

## Prism practice audit flow: `/get-started` + `/apply`

`app/get-started/page.tsx` is now the Free Practice Audit entry page for dental practices. The actual audit request form lives on `app/apply/page.tsx` and is powered by `components/forms/GetStartedForm.tsx`.

The `/apply` route should feel like a focused practice audit mode, not another marketing page. Keep the form broken into single-question screens, keep global chrome minimal, and keep the ElevenLabs floating widget suppressed while the user is inside the active form. Keep the DOM/form contracts below unchanged even when visible copy says audit instead of application.

- Required payload fields:
  - `service_focus`
  - `has_website`
  - `review_link`
  - `primary_goal`
  - `budget`
  - `timeline`
  - `company`
  - `full_name`
  - `email`
- Optional payload fields:
  - `service_interest[]`
  - `additional_context`
- Hidden metadata contract:
  - `_subject` = `New Prism practice audit request`
  - `_redirect` = `/thank-you?source=apply`
  - `form_name` = `growth_application`
  - `_gotcha` (honeypot)
- DOM analytics contract:
  - `<form id="growth_application" name="growth_application">`
- Endpoint strategy:
  - `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT` (preferred; posts to the Prism dashboard app and creates/updates a private dashboard)
  - `NEXT_PUBLIC_APPLY_FORM_ENDPOINT`
  - fallback: `NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT`
  - fallback default: `https://formspree.io/f/mreroojo`
- Success flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - When the dashboard intake API returns `dashboard.claimUrl`, store it in session storage for the apply thank-you CTA; do not include it in analytics payloads.
  - On success, `router.push("/thank-you?source=apply")`
  - On failure, inline error state remains visible and user stays on the review/submit screen
- Analytics:
  - `trackEvent("apply_form_view", ...)`
  - `trackEvent("apply_form_start", ...)`
  - `trackEvent("apply_question_view", ...)`
  - `trackEvent("apply_question_complete", ...)`
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

## Thank-you pages

- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — used by Apply + Contact. The Prism practice audit flow sends `?source=apply` so the screen can render audit-specific expectation copy and analytics.
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
- Analytics: `trackFormSubmission("book_a_shoot", "book_a_shoot_form", { lead_type: "shoot_request" })`; the thank-you page mounts `LeadSuccessTracker` and emits `generate_lead` once.

### `/scholarship`

- Endpoint: `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT` or `https://formspree.io/f/mwpwwjek`
- DOM analytics contract: `<form id="scholarship_application" name="scholarship_application">`
- Success flow: client-side `fetch` with inline success copy.
- Analytics: `trackFormSubmission("scholarship_application", "scholarship_form", { conversionMode: "immediate", sendGoogleAdsConversion: false })`.

### `/models`

- Endpoint: `https://formspree.io/f/mrbyvoqo`
- DOM analytics contract: `<form id="model_application" name="model_application">`
- Success flow: client-side `fetch` with inline success copy.
- Analytics: `trackFormSubmission("model_application", "models_form", { conversionMode: "immediate", sendGoogleAdsConversion: false })`.

## FAQ / Troubleshooting

- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
