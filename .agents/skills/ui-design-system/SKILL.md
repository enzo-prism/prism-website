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
   - `components/prism/*` (marketing kit) and `components/ui/*` (shadcn primitives)
   - `components/navbar.tsx`
   - `components/footer.tsx`
   - `components/home/*`
   - `app/globals.css` (the "Prism Spectrum system" section: type scale, `text-gradient`/`text-spectrum`/`text-refract`, `bg-grid`/`bg-dots`/`bg-noise`, `spectrum-rule`, `prism-beam`, `prism-container`, `mask-fade-*`)
   - `lib/utils.ts` (`cn` is taught these utilities through `extendTailwindMerge`; register any new type-size or text-fill utility there too)
4. Prefer existing primitives, semantic tokens, and `/generated/` exports before introducing new visual values.
5. If a request requires a new token, make the smallest reasonable addition and update `/DESIGN.md` in the same task.
6. Keep Prism in its current dark-system language unless the task explicitly asks for a broader redesign.
7. Before finishing a design-system change, run `pnpm design:check` plus the nearest UI regression tests for the touched surfaces.

## Guardrails

- Do not add raw hex colors, one-off spacing, or ad hoc radii when a design token should exist.
- Do not put visual rationale into `AGENTS.md`; keep that in `/DESIGN.md`.
- Do not introduce a page-specific visual language when the request can be expressed through the existing Prism system.
- Do not default to generic SaaS cards, purple gradients, or overly centered marketing layouts.
- Do not reintroduce the retired pixel styling (square corners, Geist Pixel font, forced uppercase, green glow), Pixelish icons, lord-icon, ASCII hero animations, or `CoreRoutePrimitives`.
- Do not hand-roll a CTA: use `WaitlistButton` or the shadcn `Button` (default white pill or `variant="outline"`), and end core routes with `FinalCta`.

## Prism-specific expectations

- Core marketing routes compose `Section` / `SectionHeader` / `Eyebrow` from `components/prism/section.tsx`, mix section shapes (open grid, marquee rail, bento, panel, split), and end at the waitlist.
- Real client work is the hero: screenshots in `BrowserFrame`, marquees, and walls. Numbers come only from `lib/proof-metrics.ts` or `getCaseStudyMetric`; former clients (`lib/former-clients.ts`) never appear on proof surfaces.
- The spectrum is rationed (hero refraction, at most one `text-spectrum` phrase per viewport, one featured `prism-beam` surface per section). Icons are `lucide-react`.
- Geist Mono is for eyebrows, labels, and metadata. Headlines are lowercase and end with a period (prism-writing skill, `prism-brand` pack); no em dashes.
- Motion must respect reduced motion (the base style is the finished frame; `Reveal` never hides content from crawlers) and remain stable on mobile Safari, Chromium, and desktop browsers.

## Final Response

Summarize:

- which `DESIGN.md` tokens or component rules you used
- whether you added or changed tokens
- whether `/generated/` was refreshed
- which UI regression tests you ran
