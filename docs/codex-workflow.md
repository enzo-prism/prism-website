# Codex workflow playbook

> **Reference order** – README.md and AGENTS.md define the canonical rules for tooling, architecture, and documentation. This playbook inherits from them; if you spot a mismatch, update this file to match the canonical docs.

Guidance for future Codex sessions so we can ship faster without rediscovering context every time.

## 1. Stack refresher

- **Framework** – Next.js App Router + TypeScript, deployed via Vercel.
- **Styling** – Tailwind classes inline; no styled-components.
- **UI kit** – `components/ui/*` (Button, Carousel, etc.). Import from there instead of re‑implementing.
- **Forms** – Marketing forms post to [Formspree](https://formspree.io/) using the shared `useFormValidation` hook (HTML5 validation + client-side fetch + redirect). Keep actions and field names explicit so PMs can read submissions quickly.

## 2. Dental photography surfaces

We now have four tightly coupled routes – keep their navigation in sync.

| Route | Purpose | Key links |
| --- | --- | --- |
| `/dental-photography` | Hub with background video hero, summary cards, and cross-links. | Buttons must point to `/dental-photography/office-team` and `/dental-photography/before-after`; secondary CTAs can reference `/book-a-shoot` when relevant. |
| `/dental-photography/office-team` | Bookable service showcasing recent shoots + Apple Maps proof. | All primary CTAs go to `/book-a-shoot`. Apple Maps block links to `/local-listings`. The recent-shoots slider now lives in `app/dental-photography/office-team/recent-shoots-section.tsx`; update the `recentShoots` data + optional `website` URL there so the “visit website” / progress bar behave. Keep the dark proof section linking to `/dental-photography/before-after`. |
| `/dental-photography/before-after` | DIY equipment + workflow guide (no booking). | Keep “jump to the protocol” anchor and the CTA that routes to `/dental-photography/office-team` so visitors can move from the guide to the done-for-you service. |
| `/book-a-shoot` | Formspree capture for shoot scheduling. | Links back to the other pages so visitors can revisit context. |

When adding new sections:

1. Update the hub hero buttons if the destination changes.
2. Mirror links on subpages so the triangle (hub ⇄ subpages ⇄ booking) stays intact and the new `/before-after ⇄ /office-team` loop keeps working.
3. Mention whether a page is “bookable” vs “guide” so we don’t mislead visitors.

## 3. Background video hero pattern

Use the same structure as `/dental-photography` and `/models`:

```tsx
<section className="relative overflow-hidden ...">
  <div className="absolute inset-0">
    <video src="...mp4" autoPlay loop muted playsInline poster="...webp" />
    <div className="absolute inset-0 bg-neutral-950/80" />
  </div>
  <div className="container relative ...">
    {/* text + CTAs */}
  </div>
</section>
```

Tailwind overlay (`bg-neutral-950/80`) keeps text readable. Use Cloudinary URLs for both the MP4 and poster.

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

## 6. Booking form conventions

- **Endpoint** – `https://formspree.io/f/xjkjkggn`. Formspree requires POST + `Accept: application/json` (handled automatically by browsers when using plain HTML forms).
- **Fields** – Always collect email, at least two date fields, and the preferred one‑hour window (`<select>`). Optional notes field lives at the bottom.
- **Copy** – Reinforce when someone should use the office-team booking form vs. the DIY guide.

## 7. Quick checklist for future changes

1. **Update navigation triangles** – whenever you add a CTA or remove one on these pages, make sure visitors can still reach every related route in ≤1 click.
2. **Keep imagery remote** – prefer Cloudinary links (`res.cloudinary.com/...`) over local `/public` assets for fast iteration.
3. **Run lint if touching shared components** – `pnpm lint` catches Tailwind ordering issues.
4. **Document new flows** – drop short notes in this file or `docs/forms.md` whenever we add a Formspree endpoint or new data fields, instead of creating new top-level docs.

## 8. Homepage hero slider rules

- The hero review slider only surfaces one quote at a time from a curated list. Those records live in `content/wall-of-love-data.tsx` under `HOMEPAGE_HERO_REVIEW_IDS`. When marketing wants a different quote, add the testimonial to `quotesData` (if missing), ensure it doesn’t require consent, and append its ID to that array.
- Randomization now happens client-side to avoid hydration mismatches. The server always renders the first curated review; on the client we pick a random one and store its index in `localStorage` under `prism-hero-review`. If you change this logic, keep SSR deterministic (no `Math.random()` on the server) and guard any browser APIs with `typeof window !== "undefined"`.
- If the curated pool ever empties (e.g., IDs removed), the helper falls back to the first 10 consent-safe quotes. This prevents crashes in builds. When editing, keep this fallback in mind and prefer editing the curated list instead of reworking the slider.

Following this playbook should keep Codex contributors productive without re-learning the project every session.
