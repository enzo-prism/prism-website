# Redirect Report

> **Historical report (March 2026).** Pricing has since moved to the four productized
> offers modeled in `lib/pricing-model.ts` (Website `$300` flat, Content OS, Dental OS,
> Prism Infinity) — see README/AGENTS. The redirect tables below remain accurate; the
> pricing-policy notes and validation steps reflect the retired ladder and are kept
> only as a record of that migration.

## Pricing Unification Redirects (March 2026)

Canonical pricing now lives at [`/pricing`](https://www.design-prism.com/pricing). Legacy conflicting pricing routes permanently redirect there.

### Active permanent redirects

| Old path | Redirect target | Purpose |
| --- | --- | --- |
| `/pricing-dental` | `/pricing` | Remove conflicting dental pricing tiers |
| `/ai-website-launch` | `/pricing` | Retire legacy flat-price launch offer |
| `/one-time-fee` | `/pricing` | Retire legacy one-time fee page |
| `/offers` | `/pricing` | Consolidate offer discovery to canonical pricing |
| `/offers/:path*` | `/pricing` | Retire legacy offer subroutes |
| `/growth` | `/pricing` | Remove legacy growth route pricing ambiguity |
| `/checkout/launch` | `/pricing` | Retire legacy checkout path |
| `/checkout/grow` | `/pricing` | Retire legacy checkout path |
| `/checkout/scale` | `/pricing` | Retire legacy checkout path |
| `/shop` | `/pricing` | Avoid redirect chain through `/offers` |

### Policy notes

- Do not add redirecting pricing routes to `app/sitemap.ts`.
- Do not link to legacy routes from indexable pages/components.
- Redirecting pricing routes should also export `noindex, nofollow` metadata so local tooling and crawlers see them as non-indexable even before the redirect is applied.
- Remove these legacy URLs from machine-readable maps such as `public/llms.txt` and structured data unless the destination is restored as a real canonical page.
- Core pricing policy at the time followed the Growth Dashboard path (free dashboard →
  `$500` Deep Growth Audit → `$3,500` sprints → `$1,500/month` partner). **Retired:** the
  site now sells the four productized offers in `lib/pricing-model.ts`.

### Validation checklist

1. Run `pnpm verify:pricing-consistency`.
2. Confirm all paths above resolve to `/pricing` (301/308 depending on platform handling).
3. ~~Confirm `/pricing` JSON-LD emits the Deep Growth Audit and 60-day Growth Sprint offers only.~~ (Retired — that schema is now forbidden by `pricing-schema-consistency.test.ts`.)
4. Confirm legacy pricing/offer pages return `noindex, nofollow` metadata.
5. Confirm `pnpm seo:inventory && pnpm seo:lint` classifies those routes as non-indexable.
