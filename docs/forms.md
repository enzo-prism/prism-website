# Form + Thank-You Flow

Prism handles every marketing form through Formspree plus client-side redirects. Use this doc any time you add a new form.

> **Waitlist funnel (2026-09-14).** Prism is fully booked. The only live sales form is `/waitlist` (see [Waitlist](#waitlist)). The intake, Growth Dashboard, contact, free-analysis, AEO, book-a-shoot, and AI brief flows are **retired**: their routes 308-redirect to `/waitlist` and their form components are deleted. The [retired flows](#retired-flows-308--waitlist) table keeps their Formspree ids for archive lookups; full historical contracts live in git history.

## Waitlist

`components/forms/WaitlistForm.tsx` renders on `app/waitlist/page.tsx` (indexable, in the sitemap and `llms.txt`). Service pages, homepage offer cards, and the `/ig` `/tiktok` `/youtube` hubs link with `?focus=website|content|ads`, which pre-checks the matching focus card (`parseWaitlistFocus` in `lib/waitlist.ts`).

**Stepped flow (2026-09-15).** The page is a single narrow column: one headline ("Join the waitlist"), one context line ("Prism is fully booked. Join the waitlist to work with us in <next month>."), the `WaitlistProofStrip`, then the form. The form is one client island with five screens from `WAITLIST_STEPS` in `lib/waitlist.ts`, each a `fieldset` with an `sr-only` legend, a lucide icon, and a slim "Step x of 5" progress row:

1. `focus` — Website / Content / Ads icon cards (multi-select, optional; kept optional so the first tap-only step never blocks). Prefilled from `?focus=`. No free-text "something else" field (removed 2026-09-15).
2. `timing` — five radio cards (`asap`, `1_3_months`, `3_6_months`, `6_plus_months`, `exploring`); required.
3. `about` — first name, last name, email (required), phone (optional).
4. `links` — website, social profile, anything else; at least one required (custom validity on `link_website`).
5. `goals` — one textarea (required) plus a one-line summary of earlier answers with an Edit link back to step 1, then **Join the waitlist**.

There is no separate review screen: each step is validated before advancing, the last step shows the compact summary, and a review page for five short answers added a screen without adding confidence. Enter advances non-final steps (the form `onSubmit` intercepts), Back never loses answers, the first control of each step receives focus after a transition, and an `aria-live` region announces "Step x of 5. <title>". Transitions are opacity/transform only and disabled under `prefers-reduced-motion`. Answers and the current step persist in same-tab `sessionStorage` (`prism_waitlist_draft_v1`, 24h) so a refresh resumes; a fresh `?focus=` wins over a stored focus. The draft is cleared on confirmed success.

Submission builds one `FormData` from the hidden ops fields on the form plus the in-memory answers (`focus[]` appended per value) and `appendAttributionToFormData`, then posts once to Formspree from the last step.

- Required payload fields:
  - `first_name`, `last_name`
  - `email`
  - at least one of `link_website`, `link_social`, `link_other` (enforced with `setCustomValidity` on `link_website`; the message is "Add at least one link: website, social, or other")
  - `goals` (textarea)
  - `start_timing` (select: `asap`, `1_3_months`, `3_6_months`, `6_plus_months`, `exploring`)
- Optional payload fields:
  - `phone`
  - `focus[]` (checkboxes `website`, `content`, `ads`; any number)
- Hidden metadata contract:
  - `_subject` = `New Prism waitlist application`
  - `form_name` = `waitlist`
  - `_gotcha` (honeypot)
  - `<FormspreeOpsFields formKey="waitlist">` (site, form_key, environment, `_codex_test`, page_path, referrer, `utm_*`)
  - `syncFormAttributionFields(form)` from `lib/marketing-attribution.ts` before the POST, so `landing_path`, first-touch UTMs, click ids, `submission_path`, `device_type`, and `timestamp` travel with the submission (for example `landing_path=/ig`)
- DOM analytics contract: `<form id="waitlist" name="waitlist">`
- Endpoint strategy:
  1. `NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`
  2. Fallback `https://formspree.io/f/xjkjbpdb` (the existing Contact form, which notifies `enzo@design-prism.com`). A dedicated "Prism Waitlist" form is being created; once it exists, set the env var in Vercel Production + Preview and redeploy (`NEXT_PUBLIC_*` is inlined at build time).
- Success flow:
  - `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - On `response.ok`: `trackEvent('waitlist_submit_success')`, `trackFormSubmission('waitlist', 'waitlist_page', { lead_type: 'waitlist' })` (pending mode), then `router.push('/waitlist/thank-you')`. The thank-you route is noindex and mounts `LeadSuccessTracker`, which fires `generate_lead` once (`lib/lead-values.ts` `waitlist: 120`).
  - On failure: inline `role="alert"` error, `waitlist_submit_error` with `reason` (`non_ok_response` | `network_failure`) and `status`, visitor stays on the form.
- Analytics: `waitlist_form_view` (`prefilled_focus`, `resumed_step` when a draft is restored), `waitlist_form_start` (first interaction, once; carries `step`/`step_name`), `waitlist_step_view` and `waitlist_step_complete` (`step` 1–5, `step_name` = `focus|timing|about|links|goals`), `waitlist_validation_error` (`step`, `step_name`, `field_name`), `waitlist_submit_attempt`, `waitlist_submit_success` (`focus_count`), `waitlist_submit_error`. No names, emails, phones, URLs, or free text are sent to GA or Vercel.
- Capacity copy lives in `CAPACITY_MESSAGE` (`lib/waitlist.ts`) and renders through `components/waitlist/CapacityNotice.tsx` on heroes and hubs. `/waitlist` itself carries only the one-line context sentence; the "what happens next" explanation lives on `/waitlist/thank-you` as three icon rows.
- Tests: `pnpm exec jest __tests__/components/WaitlistForm.test.tsx __tests__/website-cta-map.test.ts __tests__/pricing-model.test.ts`.

## Retired flows (308 → `/waitlist`)

| Route | Former form | Formspree form | Notes |
| --- | --- | --- | --- |
| `/website-intake`, `/content-intake`, `/ads-intake` | `WebsiteIntakeForm` (+ `hooks/use-intake-webmcp.ts`, also deleted) | `xrpzlkrd`, `mwlkrezj`, `mnpqgaya` | Redirect keeps the service as `?focus=` |
| `/get-started`, `/apply` | `GetStartedForm` | `mreroojo` / dashboard intake API | `/thank-you?source=apply` (`ApplySuccessTracker`) stays as a noindex landing target |
| `/contact` (+ `/contact-us`, `/hours`) | `ContactForm` | `xjkjbpdb` | Now the waitlist fallback endpoint |
| `/free-analysis`, `/analysis-thank-you` | `FreeAnalysisForm` | — | |
| `/aeo`, `/aeo-thank-you` | `AeoAssessmentForm` | `xldarokj` | |
| `/book-a-shoot` (+ thank-you) | `BookAShootForm` | `xjkjkggn` | Dental photography pages now link the content waitlist |
| `/ai` | AI website brief | `xzdpoyer` | |
| `/founder-os/apply` (301 → `/content`) | `FounderOsApplicationForm` | `xkoalapv` | Retired before the waitlist |
| `$300` website order (pre-2026-07-27) | June 2026 website request form | `xpqebnbz` | Historical "Website Customer Request, 2026 June" submissions |

Do not delete the historical Formspree forms until their submissions are archived.

## Shared hook

`hooks/use-form-validation.ts` centralizes HTML5 validation and submission. It blocks repeat submissions synchronously while the first request is pending. Pass an `onValidSubmit` callback to run custom code (e.g., `fetch(form.action)` and `router.push('/thank-you')`).

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

- `components/forms/WaitlistForm.tsx` (`/waitlist`; the only live sales form)
- `components/forms/ReferralForm.tsx` (`/refer`; $100-per-closed-referral program)
- Founder OS application form: deleted. `/founder-os/apply` 301-redirects to `/content`.
- `components/forms/ScalingRoadmapForm.tsx` (Formspree `xojarwbg`; only used by `components/home/HomeRoadmapSection.tsx`, which is not mounted on any route)
- `components/ai-website-launch/AiWebsiteLaunchForm.tsx` (legacy archival form code; the `/ai-website-launch` route redirects to `/pricing` in production and should not receive active traffic)
- `app/scholarship/ScholarshipPageClient.tsx`
- `app/models/client-page.tsx`
- `app/designs/wine-country-root-canal/client-page.tsx` (client design vote)

`GET` and `POST /api/store-email` are retired. Both return `410 Gone` with `Cache-Control: no-store` and do not parse, retain, or log email addresses. Use the supported Formspree flows instead.

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

## `/websites`: marketing page + waitlist handoff

The `/websites` PRO website page has **no on-page form**. The old fullscreen
order dialog (`WebsiteOrderForm.tsx`), sticky `MobileOrderBar.tsx`, and Stripe
Payment Link flow (`lib/payment-links.ts`) stay deleted. Primary hero and final
CTAs say "Join the waitlist" (`WEBSITE_WAITLIST_CTA` → `/waitlist?focus=website`)
and the hero carries the shared `CapacityNotice`. There is no booking CTA. The
noindex `/checkout/website/thank-you` route remains only as the landing target
for the legacy live Stripe link and no longer fires any purchase event.

## `/refer` referral form ($100 program)

- Component: `components/forms/ReferralForm.tsx`, rendered by `app/refer/page.tsx` (dark system; replaced the legacy light page + external Typeform).
- Offer: a flat `$100` referral payout, paid when the referred business becomes a paying Prism client (website, Content OS, Dental OS, or Prism Infinity). Fine print lives on the page; keep "referral payout, not service pricing" framing so pricing-consistency context rules stay satisfied if legacy tokens ever reappear.
- Endpoint: `NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT` ?? `https://formspree.io/f/meebpgaj` (dedicated referral form, wired 2026-07-02). Submissions carry `form_key=referral` / `_subject: "New referral — $100 program"`.
- Fields: `referrer_name`\*, `referrer_email`\*, `friend_name`\*, `friend_business`, `friend_contact`\* (email or phone, free text), `friend_need`, `note` + standard ops fields (`FormspreeOpsFields formKey="referral"`), `_gotcha` honeypot, hidden `form_name=referral`.
- Consent: `referral_permission=confirmed` is required before submission. The user-facing checkbox must state that the referrer has permission to share the friend's contact details and that Prism will use them only for referral follow-up.
- Success: in-page success state with a "Refer another friend" reset (keeps the referrer's name/email, clears the friend fields). No thank-you route.
- Analytics: `trackFormSubmission('referral', 'referral_form', { conversionMode: 'immediate', sendGoogleAdsConversion: false })` — referral payouts are not sales leads.
- Entry points: footer Company column plus `/referral` + `/referrals` + `/affiliate` redirects. The focused `/tiktok`, `/ig`, and `/youtube` hubs intentionally offer only the Website, Content, and Ads waitlist CTAs. The page intro carries the shared capacity line; the referral program is not a sales CTA and keeps working while Prism is at capacity.

## Thank-you pages

- `/waitlist/thank-you` ([`app/waitlist/thank-you/page.tsx`](../app/waitlist/thank-you/page.tsx)) — the live sales confirmation. Mounts `LeadSuccessTracker`, which consumes the pending waitlist lead and fires `generate_lead` once.
- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — legacy landing target. `?source=apply` still renders the apply state and mounts `ApplySuccessTracker` (fires only when a pending apply context exists, so direct visits never convert); other visits mount `LeadSuccessTracker`. `?source=website-build` is a leftover variant and must not promise a payment link.
- `/pricing/thank-you` ([`app/pricing/thank-you/page.tsx`](../app/pricing/thank-you/page.tsx)) — noindex leftover. Copy must not mention the retired growth sprint.
- `/checkout/website/thank-you` ([`app/checkout/website/thank-you/page.tsx`](../app/checkout/website/thank-you/page.tsx)) — legacy Stripe redirect landing page for the retired `$300` website order. It no longer mounts `PurchaseSuccessTracker` (now unused) because a public `session_id` is not payment proof; see [`analytics.md`](analytics.md#legacy-purchase-redirect).
- `/analysis-thank-you`, `/aeo-thank-you`, and `/book-a-shoot/thank-you` are deleted.

Each page is intentionally minimal.
These routes are noindex/no-follow and **not** blocked in `robots.txt` so search engines can read the meta noindex directive.

## Other tracked submission surfaces

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

### Wine Country design vote

- Endpoint: `https://formspree.io/f/mldayroq`
- The submit button locks while the request is pending so a single interaction cannot create duplicate votes.
- Validation and network failures use different, accurate live error messages.

## FAQ / Troubleshooting

- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
