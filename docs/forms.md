# Form + Thank-You Flow

Prism handles every marketing form through Formspree plus client-side redirects. Use this doc any time you add a new form.

## Shared hook
`hooks/use-form-validation.ts` centralizes HTML5 validation and submission. Pass an `onValidSubmit` callback to run custom code (e.g., `fetch(form.action)` and `router.push('/thank-you')`).

```ts
const { handleSubmit, getError, isSubmitting } = useFormValidation({
  onValidSubmit: async (form) => {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
    if (!response.ok) throw new Error("submission failed")
    router.push("/thank-you")
  },
})
```

## Existing forms
- `components/forms/FreeAnalysisForm.tsx`
- `components/forms/ContactForm.tsx`
- `components/forms/ScalingRoadmapForm.tsx`
- `components/ai-website-launch/AiWebsiteLaunchForm.tsx` (inline card form for the AI launch offer; embedded in `app/ai-website-launch/client-page.tsx` and wired with `useFormValidation`)
- `components/forms/AeoAssessmentForm.tsx`

## Adding a new form
1. Create a component under `components/forms/`.
2. Wire inputs to `useFormValidation({ onValidSubmit })` and call your Formspree endpoint via `fetch`.
3. On success, push to one of the thank-you routes.
4. Add your form component to the relevant route page.

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
- Endpoint strategy:
  - `NEXT_PUBLIC_AEO_FORM_ENDPOINT` (falls back to `https://formspree.io/f/xldarokj`)
- Success flow:
  - POST via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })`
  - On success, `router.push("/aeo-thank-you")`
  - On failure, inline error state remains visible and user stays on the form
- Analytics:
  - `trackFormSubmission("aeo_assessment", "hero_form")` on successful submit
  - `trackCTAClick("get free aeo assessment", "aeo hero form")` on the submit button click

## Thank-you pages
- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — used by Get Started + Contact.
- `/analysis-thank-you` ([`app/analysis-thank-you/page.tsx`](../app/analysis-thank-you/page.tsx)) — used by the Free Analysis form.
- `/aeo-thank-you` ([`app/aeo-thank-you/page.tsx`](../app/aeo-thank-you/page.tsx)) — used by the AEO assessment form.

Each page is intentionally minimal: confirmation card, kickoff-call CTA, and contact info.
These routes are noindex/no-follow and **not** blocked in `robots.txt` so search engines can read the meta noindex directive.

## FAQ / Troubleshooting
- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
