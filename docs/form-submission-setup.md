# Form Submission Setup Guide

This file is now an archival note, not the canonical setup path for Prism marketing forms.

## Current supported flow

Prism's active marketing forms use:

- Formspree endpoints
- the shared `useFormValidation` hook
- client-side `fetch`
- redirects to `/thank-you` or `/analysis-thank-you`

If you are working on the normal site experience, use these docs instead:

- [`docs/forms.md`](./forms.md)
- [`docs/pages-overview.md`](./pages-overview.md)
- [`docs/environment-setup.md`](./environment-setup.md)

## What changed

- `/get-started` no longer depends on a custom form-storage backend to render its live assistant surface.
- Supabase is no longer part of the supported website setup.
- The legacy `/api/prism-leads` route has been removed. Current marketing capture is client-side Formspree only.

## Practical recommendation

For new work, stay on the Formspree + thank-you-screen flow. It is the canonical path this repo is optimized and documented for today.
