# Form Submission Setup Guide

This file is now an archival note, not the canonical setup path for Prism marketing forms.

## Current supported flow

Prism's active marketing forms use:

- Formspree endpoints
- the shared `useFormValidation` hook
- client-side `fetch`
- a redirect to a thank-you route (`/waitlist/thank-you` for the live waitlist)

If you are working on the normal site experience, use these docs instead:

- [`docs/forms.md`](./forms.md)
- [`docs/pages-overview.md`](./pages-overview.md)
- [`docs/environment-setup.md`](./environment-setup.md)

## What changed

- Since 2026-09-14 `/waitlist` (`components/forms/WaitlistForm.tsx`) is the only live sales form. `/get-started`, `/apply`, `/website-intake`, and the other retired lead routes 308-redirect there; see [`docs/forms.md`](./forms.md#waitlist).
- Supabase is no longer part of the supported website setup.
- The legacy `/api/prism-leads` route has been removed. Current marketing capture is client-side Formspree only.

## Practical recommendation

For new work, stay on the Formspree + thank-you-screen flow. It is the canonical path this repo is optimized and documented for today.
