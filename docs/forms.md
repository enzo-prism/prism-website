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

The `/get-started` page now uses an embedded Notion calendar scheduler instead of a Formspree form. The embed sizing lives in `components/BookDemoEmbed.tsx` and uses a width-based height map (>=1024: 776px, >=770: 1027px, <770: 1925px, plus a small buffer) to avoid nested iframe scrolling. On mobile, the embed is allowed to bleed edge-to-edge so the scheduler isn't clipped.

All Formspree-backed forms use the hook above so users always land on `/thank-you` or `/analysis-thank-you`. They already include `_subject` + `_gotcha` honeypot fields; reuse those when cloning.

## Adding a new form
1. Create a component under `components/forms/`.
2. Wire inputs to `useFormValidation({ onValidSubmit })` and call your Formspree endpoint via `fetch`.
3. On success, push to one of the thank-you routes.
4. Add your form component to the relevant route page.

## Thank-you pages
- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — used by Get Started + Contact.
- `/analysis-thank-you` ([`app/analysis-thank-you/page.tsx`](../app/analysis-thank-you/page.tsx)) — used by the Free Analysis form.

Each page is intentionally minimal: confirmation card, kickoff-call CTA, and contact info.
These routes are noindex/no-follow and disallowed in `robots.txt` so they never appear in search results.

## FAQ / Troubleshooting
- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
