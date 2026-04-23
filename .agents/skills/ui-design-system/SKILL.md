---
name: ui-design-system
description: Use for frontend or visual tasks in Prism: React or Next components, Tailwind or CSS updates, homepage and landing-page design, motion, design tokens, or visual system refactors. Skip for backend-only or data-only work.
---

# Prism UI Design System

Use this skill whenever a task changes visual output or the design system itself.

## Workflow

1. Read `/DESIGN.md` before making UI decisions.
2. Read `/AGENTS.md` for repo rules, but keep visual reasoning anchored in `/DESIGN.md`.
3. Check the live implementation anchors first:
   - `components/core-route/CoreRoutePrimitives.tsx`
   - `components/navbar.tsx`
   - `components/footer.tsx`
   - `components/home/*`
   - `app/globals.css`
4. Prefer existing primitives, semantic tokens, and `/generated/` exports before introducing new visual values.
5. If a request requires a new token, make the smallest reasonable addition and update `/DESIGN.md` in the same task.
6. Keep Prism in its current dark-system language unless the task explicitly asks for a broader redesign.
7. Before finishing a design-system change, run `pnpm design:check` plus the nearest UI regression tests for the touched surfaces.

## Guardrails

- Do not add raw hex colors, one-off spacing, or ad hoc radii when a design token should exist.
- Do not put visual rationale into `AGENTS.md`; keep that in `/DESIGN.md`.
- Do not introduce a page-specific visual language when the request can be expressed through the existing Prism system.
- Do not default to generic SaaS cards, purple gradients, or overly centered marketing layouts.
- Do not use pixel typography as the default reading or CTA font.

## Prism-specific expectations

- Core marketing routes should reuse the divider-led black-system primitives.
- Mono text is for labels, metadata, and utility text.
- Pixelish icons are appropriate for marketing support points and small signal chips.
- Motion must respect reduced motion and should remain stable on mobile Safari, Chromium, and desktop browsers.

## Final Response

Summarize:

- which `DESIGN.md` tokens or component rules you used
- whether you added or changed tokens
- whether `/generated/` was refreshed
- which UI regression tests you ran
