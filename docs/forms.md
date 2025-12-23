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
- `components/forms/GetStartedForm.tsx`
- `components/forms/FreeAnalysisForm.tsx`
- `components/forms/ContactForm.tsx`
- `components/forms/ScalingRoadmapForm.tsx`
- `app/ai-website-launch/client-page.tsx` (inline card form for the AI launch offer; uses the same fetch + redirect pattern without the shared hook so the form can live next to its layout code)

The Get Started form now captures first/last name, phone, and a call date/time; the scheduling fields stay disabled until the first three fields are filled.

All three use the hook above so users always land on `/thank-you` or `/analysis-thank-you`. They already include `_subject` + `_gotcha` honeypot fields; reuse those when cloning.

## Adding a new form
1. Create a component under `components/forms/`.
2. Wire inputs to `useFormValidation({ onValidSubmit })` and call your Formspree endpoint via `fetch`.
3. On success, push to one of the thank-you routes.
4. Add your form component to the relevant route page.

## Thank-you pages
- `/thank-you` ([`app/thank-you/page.tsx`](../app/thank-you/page.tsx)) — used by Get Started + Contact.
- `/analysis-thank-you` ([`app/analysis-thank-you/page.tsx`](../app/analysis-thank-you/page.tsx)) — used by the Free Analysis form.

Each page is intentionally minimal: confirmation card, kickoff-call CTA, and contact info.

## FAQ / Troubleshooting
- **Still seeing Formspree’s stock page?** Make sure `fetch` sends `Accept: application/json` and you aren’t calling `form.submit()` directly.
- **Need different CTAs on thank-you pages?** Update the respective route page; no other files depend on that markup.
