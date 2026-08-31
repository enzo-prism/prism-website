from pathlib import Path

def must_replace(path: str, old: str, new: str, count: int = 1) -> None:
    p = Path(path)
    text = p.read_text()
    found = text.count(old)
    if found != count:
        raise SystemExit(f"{path}: expected {count} occurrence(s) of marker, found {found}: {old[:120]!r}")
    p.write_text(text.replace(old, new, count))

def must_insert_before(path: str, needle: str, insert: str) -> None:
    p = Path(path)
    text = p.read_text()
    if needle not in text:
        raise SystemExit(f"{path}: missing insert needle: {needle[:120]!r}")
    if insert.strip() in text:
        print(f"{path}: insert already present")
        return
    p.write_text(text.replace(needle, insert + needle, 1))

must_insert_before(
    "AGENTS.md",
    "- **Canonical pricing policy (all-call-first, 2026-07-27)** – `lib/pricing-model.ts` is the single source of truth and models Prism's four productized offers:",
    "- **Public service IA (2026-08-31)** – Visitor-facing chrome frames three services from `lib/services.ts`: **Website** (`/websites`), **Content** (`/content`), and **Ads** (`/ads`). Header: Home, a Services dropdown of those three, then Case studies and Wall of love. No header CTA. Packaged offers **Dental OS** and **Prism Infinity** stay on `/pricing` and in the footer Company column; they are not top-nav items. Canonical Content URL is `/content` (`/content-os` 301s). `/get-started` is a free on-ramp in the footer and homepage callout, not the header. `lib/services.ts` must not import `lib/constants` (constants imports services).\n",
)
must_replace(
    "AGENTS.md",
    "models Prism's four productized offers:",
    "models Prism's four packaged offers on `/pricing`:",
)
must_replace(
    "AGENTS.md",
    "`/ads`, `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` ship price-free offer schemas pointing at `/pricing`, and `pricing-schema-consistency.test.ts` blocks retired pricing from reappearing.",
    "`/ads` ships a price-free offer schema pointing at `/ads`. `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` ship price-free offer schemas pointing at `/pricing`. `pricing-schema-consistency.test.ts` blocks retired pricing from reappearing.",
)
must_replace(
    "AGENTS.md",
    "The locked spec pairs screenshots with rendered-copy guards",
    "Navbar, footer, or homepage-offer changes require `pnpm test:visual:locked:update` plus `pnpm test:mobile-navbar` before merging to `main`, or UI Lock aborts production. The locked spec pairs screenshots with rendered-copy guards",
)
must_replace(
    "AGENTS.md",
    "For locked UI routes (`/`, `/about`, `/pricing`, `/get-started`), run `pnpm test:visual:locked`. For hero-loop motion changes",
    "For locked UI routes (`/`, `/about`, `/pricing`, `/get-started`), run `pnpm test:visual:locked`. For header chrome or mobile sheet changes, also run `pnpm test:mobile-navbar`. For hero-loop motion changes",
)

must_insert_before(
    "DESIGN.md",
    "- `components/navbar.tsx` and `components/footer.tsx` for the shared chrome language\n",
    "- `lib/services.ts` for the three public services (Website, Content, Ads) that drive the header dropdown and homepage offers\n",
)

must_insert_before(
    "README.md",
    "- **Canonical pricing policy (all-call-first, 2026-07-27)** – `lib/pricing-model.ts` is the single source of truth and models Prism's four productized offers:",
    "- **Public service IA (2026-08-31)** – Visitor-facing chrome frames three services from `lib/services.ts`: **Website** (`/websites`), **Content** (`/content`), and **Ads** (`/ads`). Header: Home, a Services dropdown of those three, then Case studies and Wall of love. No header CTA. Packaged offers **Dental OS** and **Prism Infinity** stay on `/pricing` and in the footer Company column; they are not top-nav items. Canonical Content URL is `/content` (`/content-os` 301s). `/get-started` is a free on-ramp in the footer and homepage callout, not the header.\n",
)
must_replace(
    "README.md",
    "models Prism's four productized offers:",
    "models Prism's four packaged offers on `/pricing`:",
)
must_replace(
    "README.md",
    "`/ads`, `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` ship price-free offer schemas; `pricing-schema-consistency.test.ts` blocks retired pricing from reappearing.",
    "`/ads` ships a price-free offer schema pointing at `/ads`; `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` ship price-free offer schemas pointing at `/pricing`. `pricing-schema-consistency.test.ts` blocks retired pricing from reappearing.",
)
must_replace(
    "README.md",
    "`app/content/page.tsx` is the **Content OS** offer (implemented over 3 months, then optimized monthly; scoped on a 30-minute call): AI agents that scale content and ads across platforms and the site. It replaced the retired Founder OS — `/founder-os` and `/founder-os/apply` now 301-redirect to `/content` in `next.config.mjs`. `app/dental-os/page.tsx` (the full Prism growth system packaged for dental practices, custom-priced) and `app/prism-infinity/page.tsx` (unlimited services on one monthly subscription, scoped on a call) complete the four productized offers.",
    "`app/content/page.tsx` is the public **Content** service page (packaged as **Content OS** on `/pricing`): a system that plans, produces, and publishes across the website and every social platform, implemented over 3 months, then optimized monthly, and scoped on a 30-minute call. Ads is a sibling service at `/ads`, not the Content hero claim. It replaced the retired Founder OS — `/founder-os` and `/founder-os/apply` now 301-redirect to `/content` in `next.config.mjs`. `app/dental-os/page.tsx` (the full Prism growth system packaged for dental practices, custom-priced) and `app/prism-infinity/page.tsx` (unlimited services on one monthly subscription, scoped on a call) complete the four packaged offers on `/pricing`.",
)
must_replace(
    "README.md",
    "| `pnpm test:visual:locked`         | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`, `/get-started`); runs in the deploy workflow as a blocking gate (with CI-only retries), intentionally suppresses the live ElevenLabs widget, and runs against an isolated `next start` server on port `3300` so page-lock screenshots stay deterministic. |",
    "| `pnpm test:visual:locked`         | Playwright visual checks for locked routes (`/`, `/about`, `/pricing`, `/get-started`); runs in the deploy workflow as a blocking gate (with CI-only retries), intentionally suppresses the live ElevenLabs widget, and runs against an isolated `next start` server on port `3300` so page-lock screenshots stay deterministic. Navbar or homepage-offer changes need `pnpm test:visual:locked:update` before `main`. |\n| `pnpm test:mobile-navbar`         | Playwright mobile Chromium + WebKit guard for the header sheet (6 links: home, website, content, ads, case studies, wall of love). The deploy workflow runs this after locked visuals, reusing the production build. |",
)

must_replace(
    "docs/development-guide.md",
    "which models the **four productized offers** — the PRO Website, Content OS, Dental OS, and Prism Infinity — ALL scoped on a **30-minute Zoom call** booked through `BOOK_A_CALL_CTA` (`BOOKING_URL` in `lib/booking.ts`). NO offer shows public exact pricing;",
    "which models the **four packaged offers on `/pricing`** — the PRO Website, Content OS, Dental OS, and Prism Infinity — ALL scoped on a **30-minute Zoom call** booked through `BOOK_A_CALL_CTA` (`BOOKING_URL` in `lib/booking.ts`). Public chrome frames three services (Website, Content, Ads) from `lib/services.ts`; Dental OS and Infinity are not top-nav items. NO offer shows public exact pricing;",
)

must_replace(
    "docs/pages-overview.md",
    "- `/pricing` is the single canonical pricing URL and now compares Prism's **four productized offers**, all sourced from `CANONICAL_PRICING_OFFERS` / `PRICING_OFFER_ORDER` in `lib/pricing-model.ts`:",
    "- `/pricing` is the single canonical pricing URL and now compares Prism's **four packaged offers**, all sourced from `CANONICAL_PRICING_OFFERS` / `PRICING_OFFER_ORDER` in `lib/pricing-model.ts`. Public chrome still frames three services (Website, Content, Ads); Dental OS and Infinity are packaged here and are not top-nav items.",
)
must_insert_before(
    "docs/pages-overview.md",
    "## Dental OS (`app/dental-os/page.tsx`)\n",
    "## Services hub (`app/services/page.tsx`)\n\n- Indexable overview of the growth system. The hero now reads \"Website. Content. Ads.\" to match public IA. Footer Services includes \"All services\" here. The rest of the page is still a broader catalog (websites, local, ads, content, analytics) on the leftover light surface; do not treat it as the canonical Website / Content / Ads acquisition page, and do not restyle it unless product asks.\n\n",
)
must_replace(
    "docs/pages-overview.md",
    "- After the repositioning to the four productized offers, `/get-started` is **intentionally kept as the free on-ramp** (free Growth Dashboard + request a free deep audit from the team). It stays surfaced in the nav (\"get started\"), the footer (\"Get started free\"), and a callout under the homepage offers section, even though the rest of the pricing ladder it used to anchor is retired.",
    "- After the repositioning to the four packaged offers on `/pricing`, `/get-started` is **intentionally kept as the free on-ramp** (free Growth Dashboard + request a free deep audit from the team). It stays surfaced in the footer (\"Get started free\") and a callout under the homepage offers section, even though the rest of the pricing ladder it used to anchor is retired. It is **not** in the header nav.",
)
must_replace(
    "docs/pages-overview.md",
    "- Service offer schema on `/ads`, `/seo`, `/local-listings`, `/websites`, `/dental-website`, and `/dental-practice-seo-expert` stays price-free. Do not reintroduce `60-Day Growth Sprint` or numeric `price` fields.",
    "- Service offer schema stays price-free. `/ads` points its Offer URL at `/ads`. `/seo`, `/local-listings`, `/websites`, `/dental-website`, and `/dental-practice-seo-expert` stay price-free as documented (most point at `/pricing`). Do not reintroduce `60-Day Growth Sprint` or numeric `price` fields.",
)

must_replace(
    "docs/project-overview.md",
    "Prism is a business growth systems website organized around four productized offers: the ultra-premium **PRO Website**, **Content OS**, **Dental OS**, and **Prism Infinity** — all call-first with no public exact pricing, each scoped on a 30-minute Zoom call booked via `BOOK_A_CALL_CTA`. `/get-started` is kept as a free on-ramp (free Growth Dashboard + request a free deep audit). Supporting surfaces span websites, SEO and AI search, Google Maps, reviews, ads, tracking, content, proof, and a `$100` referral program at `/refer`. Dental remains one of Prism's strongest proof verticals, but the public homepage and the order/intake flows should speak to founders, owners, operators, and growth-focused companies more broadly.",
    "Prism is a business growth systems website. Public chrome frames three services: **Website**, **Content**, and **Ads**. `/pricing` still compares four packaged offers: the ultra-premium **PRO Website**, **Content OS**, **Dental OS**, and **Prism Infinity** — all call-first with no public exact pricing, each scoped on a 30-minute Zoom call booked via `BOOK_A_CALL_CTA`. `/get-started` is kept as a free on-ramp (free Growth Dashboard + request a free deep audit) in the footer and homepage callout, not the header. Supporting surfaces span websites, SEO and AI search, Google Maps, reviews, ads, tracking, content, proof, and a `$100` referral program at `/refer`. Dental remains one of Prism's strongest proof verticals, but the public homepage and the order/intake flows should speak to founders, owners, operators, and growth-focused companies more broadly.",
)
must_replace(
    "docs/project-overview.md",
    "| Pricing truth        | `lib/pricing-model.ts`, `lib/pricing-consistency.ts`, `lib/booking.ts`                                                                                                                   | `lib/pricing-model.ts` models the four offers — PRO Website, Content OS, Dental OS, Prism Infinity — ALL call-first: no public price anywhere. `/pricing` cards use `BOOK_A_CALL_CTA` → `BOOKING_URL` in `lib/booking.ts` (new tab). Website-start surfaces use `WEBSITE_START_CTA` (\"Start my website\" → `/website-intake`). `/get-started` stays a free on-ramp. Always spell `/month` (never `/mo`); `$300`/`$100/month`/`$5,000`/`$1,000/month`/`$2,000/month` are forbidden tokens. `pnpm verify:pricing-consistency` gates deploys. Self-serve checkout is retired (`lib/payment-links.ts` deleted). The old five-tier ladder is retired; retired Growth Sprint schema is forbidden on `/ads`, `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` (guarded by `pricing-schema-consistency.test.ts`). |\n| Shared chrome        | `components/navbar.tsx`, `components/footer.tsx`, `lib/constants.ts`                                                                                                                     | Header nav, logo interaction, footer links, and the two footer funnel CTAs: `WEBSITE_START_CTA` and \"Get started free\". `/get-started` CTAs should stay Growth Audit / Growth Dashboard aligned, not demo-call or practice-only audit language.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |",
    "| Pricing truth        | `lib/pricing-model.ts`, `lib/pricing-consistency.ts`, `lib/booking.ts`                                                                                                                   | `lib/pricing-model.ts` models the four packaged offers on `/pricing` — PRO Website, Content OS, Dental OS, Prism Infinity — ALL call-first: no public price anywhere. `/pricing` cards use `BOOK_A_CALL_CTA` → `BOOKING_URL` in `lib/booking.ts` (new tab). Website-start surfaces use `WEBSITE_START_CTA` (\"Start my website\" → `/website-intake`). `/get-started` stays a free on-ramp. Always spell `/month` (never `/mo`); `$300`/`$100/month`/`$5,000`/`$1,000/month`/`$2,000/month` are forbidden tokens. `pnpm verify:pricing-consistency` gates deploys. Self-serve checkout is retired (`lib/payment-links.ts` deleted). The old five-tier ladder is retired; retired Growth Sprint schema is forbidden on `/ads`, `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` (guarded by `pricing-schema-consistency.test.ts`). `/ads` schema URL is `/ads`. |\n| Public services      | `lib/services.ts`                                                                                                                                                                        | Website `/websites`, Content `/content`, Ads `/ads`. Header Services dropdown and homepage offers section. Do not import `lib/constants` from this file (constants imports services). Packaged Dental OS and Infinity stay off the top nav. |\n| Shared chrome        | `components/navbar.tsx`, `components/footer.tsx`, `lib/constants.ts`, `lib/services.ts`                                                                                                  | Header nav, logo interaction, footer links, and the two footer funnel CTAs: `WEBSITE_START_CTA` and \"Get started free\". `/get-started` CTAs should stay Growth Audit / Growth Dashboard aligned, not demo-call or practice-only audit language. `/get-started` is not in the header. |",
)
must_replace(
    "docs/project-overview.md",
    "repositioned around the offers and overhauled",
    "repositioned around the three public services and overhauled",
)
must_replace(
    "docs/project-overview.md",
    "| Assistant surface           | `lib/elevenlabs-widget.ts`, `components/global-elevenlabs-widget.tsx`, `components/home/HomeElevenLabsAgentSection.tsx`, deferred runtime                                                                                                         | README/AGENTS/docs only if public policy changes                                      | homepage + global widget Jest, `pnpm test:visual:widget`                                                                 |\n| Visual or layout work       |",
    "| Assistant surface           | `lib/elevenlabs-widget.ts`, `components/global-elevenlabs-widget.tsx`, `components/home/HomeElevenLabsAgentSection.tsx`, deferred runtime                                                                                                         | README/AGENTS/docs only if public policy changes                                      | homepage + global widget Jest, `pnpm test:visual:widget`                                                                 |\n| Navbar / public services    | `lib/services.ts`, `lib/constants.ts`, `components/navbar.tsx`, `components/footer.tsx`, `components/home/HomeOffersSection.tsx`                                                        | README/AGENTS/`docs/pages-overview.md` if IA changes                                  | Navbar Jest, `pnpm test:mobile-navbar`, `pnpm test:visual:locked` (update snapshots before `main`)                       |\n| Visual or layout work       |",
)

print("docs applied")
