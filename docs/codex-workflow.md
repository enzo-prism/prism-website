# Codex workflow playbook

> **Reference order** – README.md and AGENTS.md define the canonical rules for tooling, architecture, and documentation. This playbook inherits from them; if you spot a mismatch, update this file to match the canonical docs.

Guidance for future Codex sessions so we can ship faster without rediscovering context every time.

## 0. Start here

Before changing broad behavior, read `docs/project-overview.md`. It is the current map for the growth-first project shape, source-of-truth files, search visibility policy, common change playbooks, and release truth.

Default operating loop:

1. Sync and inspect the current worktree before editing.
2. Trace the real runtime/data path in code, not just nearby docs.
3. Make the smallest durable change that matches the existing system.
4. Update the relevant existing doc under `/docs` when behavior changes.
5. Run the narrowest meaningful checks with Node 22.
6. For production requests, push `main`, watch GitHub Actions, and verify the live public domain.

## 1. Stack refresher

- **Framework** – Next.js 16 App Router + React 19 + TypeScript, deployed via Vercel.
- **Runtime** – Node 22.x and pnpm 10.x.
- **Styling** – Tailwind v4 classes inline; no styled-components.
- **UI kit** – `components/ui/*` (Button, Carousel, etc.). Import from there instead of re‑implementing.
- **Forms** – Marketing forms post to [Formspree](https://formspree.io/) using the shared `useFormValidation` hook (HTML5 validation + client-side fetch + redirect). Keep actions and field names explicit so PMs can read submissions quickly.
- **Search** – `lib/seo/search-visibility.ts` is the shared policy for indexable routes and blog posts. New routes/posts should default to noindex unless they support Prism's growth system, proof, or a deliberate specialty cluster.
- **Metadata** – Static routes should use `buildRouteMetadata` from `lib/seo/metadata.ts` so canonical URLs, titles, Open Graph, Twitter, and robots stay aligned.

## 1.1 Project change map

| Task                       | First files to inspect                                                                                                     | Docs to update                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Homepage copy/layout       | `app/client-page.tsx`, `components/home/*`, `components/home/homepage-content.ts`                                          | `docs/pages-overview.md`, `docs/development-guide.md` if workflow changes                    |
| Search visibility          | `lib/seo/search-visibility.ts`, `app/sitemap.ts`, `public/llms.txt`, `scripts/seo-*`                                       | `docs/project-overview.md`, `docs/development-guide.md`, `docs/blog-content-architecture.md` |
| Blog post or blog behavior | `content/blog`, `lib/mdx-data.ts`, `app/blog/*`, `components/blog-*`                                                       | `docs/blog-content-architecture.md`                                                          |
| Forms and thank-you flows  | `components/forms/*`, `hooks/use-form-validation.ts`, `components/thank-you/*`, route pages                                | `docs/forms.md`, `docs/environment-setup.md` if env vars change                              |
| Pricing                    | `lib/pricing-model.ts`, `app/pricing/*`, `app/website-design/page.tsx` (Website Design, no public price), pricing tests | README/AGENTS only if the canonical policy changes                                           |
| Case studies               | `lib/case-study-data.ts`, `app/case-studies/*`, `components/case-studies/*`                                                | `docs/pages-overview.md`                                                                     |
| Deploy/release             | `.github/workflows/deploy.yml`, `vercel.json`, `docs/build-and-deploy-guide.md`                                            | `docs/build-and-deploy-guide.md`                                                             |

## 1.1.1 Documentation alignment checklist

When the user asks to "analyze the project" or "update the project docs", do a source-of-truth pass before editing prose:

1. Count current routes, route handlers, blog files, case-study detail pages, and docs files so `docs/project-overview.md` stays current.
2. Compare global rules across `README.md`, `AGENTS.md`, and `docs/project-overview.md`; those three should agree before deeper docs add detail.
3. Check stale policy terms with `rg`, especially retired pricing phrases, broad assistant routing, old sales-chat env vars, obsolete image-component migration advice, and calendar/demo-booking CTAs.
4. Update existing docs in place. Do not add a new top-level doc unless the user explicitly asks for one.
5. For docs-only changes, run the nearest cheap validation (`pnpm design:lint` if the design contract moved, focused Jest if public machine-readable files changed, or a targeted `rg` stale-term check when only prose changed).

Homepage proof reminder (2026-10-12 v2, "impossible is temporary."): client proof on `/` is the client logo rail (`#clients`, `lib/client-logos.ts`), the six featured stories (`HomeStories`, `#work`), and `HomeWorkWall` (`#more-work`, a tilted marquee of the other current-client screenshots from `HOMEPAGE_CLIENT_WINS`). Former clients stay off all three (`__tests__/former-clients-highlight.test.ts`). The old Cover Flow deck and its abstract-art predecessor are retired; do not bring them back. UI work follows `DESIGN.md` (stock shadcn in `components/ui`, the `components/prism` kit) and copy follows the prism-writing skill (`prism-brand` pack).

## 2. Dental photography surfaces

Three tightly coupled routes – keep their navigation in sync. `/book-a-shoot` is retired (308 → `/waitlist`); booking-style CTAs now use `WAITLIST_FOCUS_HREFS.content`.

| Route                              | Purpose                                                         | Key links                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/dental-photography`              | Hub with background video hero, summary cards, and cross-links. | Buttons must point to `/dental-photography/office-team` and `/dental-photography/before-after`; secondary CTAs use the content waitlist.                                                                                                                                                                                                                       |
| `/dental-photography/office-team`  | Bookable service showcasing recent shoots + Apple Maps proof.   | All primary CTAs go to the content waitlist (`WAITLIST_FOCUS_HREFS.content`). Apple Maps block links to `/local-listings`. The recent-shoots slider now lives in `app/dental-photography/office-team/recent-shoots-section.tsx`; update the `recentShoots` data + optional `website` URL there so the “visit website” / progress bar behave. Keep the dark proof section linking to `/dental-photography/before-after`. |
| `/dental-photography/before-after` | DIY equipment + workflow guide (no booking).                    | Keep “jump to the protocol” anchor and the CTA that routes to `/dental-photography/office-team` so visitors can move from the guide to the done-for-you service.                                                                                                                                                                                                                  |

When adding new sections:

1. Update the hub hero buttons if the destination changes.
2. Mirror links on subpages so the triangle (hub ⇄ subpages ⇄ booking) stays intact and the new `/before-after ⇄ /office-team` loop keeps working.
3. Mention whether a page is “bookable” vs “guide” so we don’t mislead visitors.

## 3. Background video hero pattern (mobile-safe)

Use the same structure as `/dental-photography`, `/models`, `/case-studies`, and `/wall-of-love`:

```tsx
<section className="relative overflow-hidden ...">
  <div className="absolute inset-0">
    <HeroBackgroundLoop
      videoSrc="https://..."
      posterSrc="https://..."
      posterAlt="..."
      posterClassName="hero-loop-touch-poster ... sm:hidden"
      videoClassName="hero-loop-video ..."
    />
    <div className="absolute inset-0 bg-neutral-950/80" />
  </div>
  <div className="container relative ...">{/* text + CTAs */}</div>
</section>
```

`HeroBackgroundLoop` follows the shared playback policy in `lib/hero-media-policy.ts`, so autoplay decisions remain explicit and testable.
`HeroBackgroundLoop` intentionally never mounts the autoplay `<video>` on policy-restricted contexts, which prevents the iOS Safari fullscreen autoplay edge case.

Tailwind overlay (`bg-neutral-950/80`) keeps text readable. Use Cloudinary URLs for both the MP4 and poster.

When the wrapper can’t be used, require that all autoplay videos in decorative contexts:

- use `resolveHeroPlaybackPolicy(...)` for the same autoplay decision path
- are wrapped with touch/coarse gating before mount
- include `data-hero-loop="true"`
- keep non-interactive attributes (`playsInline`, `webkit-playsinline`, `disablePictureInPicture`, `disableRemotePlayback`)
- preserve a poster fallback path for touch/reduced-motion.

For regressions, run:
`pnpm exec jest __tests__/hero-loop-gating.test.tsx __tests__/hero-autoplay-safety.test.ts`.

## 3.1 ASCII animations (retired)

The ASCII hero animation system (`components/ascii`, `lib/ascii-*`, `public/animations`, and the `ascii:*` scripts) was removed in the 2026-10-12 redesign. Do not reintroduce it; homepage motion is the CSS refraction scene and marquees, checked by `pnpm test:visual:animations`.

## 4. Carousel shorthand

For horizontal galleries (office-team recent shoots, proof sections):

```tsx
<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.src} className="sm:basis-1/2 lg:basis-1/3">
        <div className="rounded-2xl border ...">
          <Image ... />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="hidden sm:flex ..." />
  <CarouselNext className="hidden sm:flex ..." />
</Carousel>
```

Keep captions optional; if omitted, remove the text block so cards stay compact.

## 5. Mobile polish patterns

- **Hero CTAs** – default buttons to `w-full sm:w-auto` so they stack on phones and sit inline on tablets/desktop.
- **Video overlays** – always pair the background video with a `bg-neutral-950/80` (or similar) overlay for readability.
- **Carousel gutters** – add `px-1` to the carousel container and `pl-2` to `CarouselItem` so edge slides don’t hug the viewport.
- **Card padding** – stick with `p-5` on cards and add `space-y-2` for headings/text so they breathe on smaller screens.
- **Apple Maps / proof sections** – use `flex-col lg:flex-row` so the proof image stacks below the copy on mobile.

## 6. Booking form conventions (retired)

`/book-a-shoot` and `BookAShootForm` (Formspree `xjkjkggn`) were deleted on 2026-09-14; shoot requests come through `/waitlist?focus=content`.

## 7. Quick checklist for future changes

1. **Update navigation triangles** – whenever you add a CTA or remove one on these pages, make sure visitors can still reach every related route in ≤1 click.
2. **Keep imagery remote** – prefer Cloudinary links (`res.cloudinary.com/...`) over local `/public` assets for fast iteration.
3. **Run lint if touching shared components** – `pnpm lint` catches Tailwind ordering issues.
4. **Document new flows** – drop short notes in this file or `docs/forms.md` whenever we add a Formspree endpoint or new data fields, instead of creating new top-level docs.

## 8. Homepage testimonial rules

- `HomeLove` (`#love`) reads `HOMEPAGE_TESTIMONIALS` in `components/home/homepage-content.ts` through `components/home/love/love-wall.ts`: named client notes are every quote in `content/wall-of-love-data.tsx` whose `company` is `website client` and that does not require consent; community comments are the handles in `COMMUNITY_HANDLES` plus curated picks, labeled "on Instagram" (comments on Prism's own posts), never as client reviews. Comments shown in `HomeAudience` are skipped on the wall so none repeats.
- To change a quote, edit `quotesData` (keep `requiresConsent` accurate) or the handle list; never paraphrase a verbatim quote beyond dropping an em dash. The old one-at-a-time hero review slider is retired.

Following this playbook should keep Codex contributors productive without re-learning the project every session.
