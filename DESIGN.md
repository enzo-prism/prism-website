---
version: alpha
name: Prism Spectrum System
description: A dark, cinematic design contract for the Prism marketing site, built on stock shadcn/ui primitives, Geist type, a near-black canvas, and the prism refraction spectrum as a rationed signature accent.
colors:
  primary: "#FAFAFA"
  canvas: "#050506"
  canvas-soft: "#0A0A0C"
  canvas-elevated: "#0D0D0F"
  surface-muted: "#171719"
  text-strong: "#FAFAFA"
  text-muted: "#A7A7AF"
  text-subtle: "#7F7F87"
  action-ink: "#0A0A0B"
  ring: "#A4A4A4"
  live: "#4BDE81"
  spectrum-red: "#F84D3E"
  spectrum-orange: "#FE8C2C"
  spectrum-yellow: "#F7CC4B"
  spectrum-green: "#61CC69"
  spectrum-blue: "#4F91F2"
  spectrum-violet: "#946AEE"
typography:
  display:
    fontFamily: "Geist Sans"
    fontSize: 104px
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Geist Sans"
    fontSize: 64px
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.05em"
  heading:
    fontFamily: "Geist Sans"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist Sans"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.012em"
  body-md:
    fontFamily: "Geist Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  eyebrow:
    fontFamily: "Geist Mono"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: 0px
  sm: 8px
  md: 10px
  lg: 12px
  xl: 16px
  card: 16px
  panel: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 128px
components:
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.action-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 24px
  outline-button:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 24px
  card:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: 24px
  panel:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.panel}"
    padding: 40px
  eyebrow:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-subtle}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.none}"
    padding: 0px
  status-pill:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 8px
---

# Prism Spectrum System

## Purpose

This is the code-facing design contract for design-prism.com. It describes the
system that ships in this repo so every route speaks one visual language.

The site has one job: make a business owner think **"these people are
excellent, and I want them on my business."** Prism is fully booked, so the
waitlist is the only sales action. Every page should build desire and end at
"Join the waitlist".

Prism should feel:

- cinematic, dark, and confident
- precise, like a well-made product (shadcn grammar, crisp hairlines)
- alive: real work in motion, live status, light moving through glass
- premium through restraint and proof, never through adjectives

The mental model is **near-black canvas + stock shadcn components + Geist
type + real client work + one rationed spectrum**.

## Code anchors

- `app/globals.css`: tokens (`:root` and `.dark` carry the same dark values),
  Spectrum utilities (`text-display`, `text-title`, `text-heading`,
  `text-lead`, `text-eyebrow`, `text-gradient`, `text-spectrum`,
  `bg-spectrum`, `spectrum-rule`, `bg-grid`, `bg-dots`, `bg-noise`,
  `mask-fade-x|y|b`, `prism-container`) and motion classes
  (`prism-marquee`, `prism-live-dot`, `prism-beam`, `prism-spotlight`,
  `prism-rise`, `data-reveal`).
- `tailwind.config.cjs`: semantic colors (`background`, `card`, `muted`,
  `subtle-foreground`, `live`, `spectrum-*`), radius scale.
- `components/ui/*`: stock shadcn primitives restyled for the dark canvas.
  Use them. Do not reintroduce the retired pixel styling (square corners,
  pixel font, forced uppercase, green glow).
- `components/prism/*`: the marketing kit.
  - `Section`, `SectionHeader`, `Eyebrow` (`section.tsx`)
  - `Marquee` (CSS-only, server component)
  - `SpotlightCard` (pointer-tracked light, optional spectrum `beam`)
  - `Reveal` (scroll reveal that never hides content from crawlers or
    reduced-motion visitors)
  - `WaitlistStatus` (live dot, "Fully booked", next intake month)
  - `WaitlistButton` (the primary CTA, tracked)
  - `PrismLogo` / `PrismMark`
  - `FinalCta` (the closing waitlist band on every core route)
  - `BrowserFrame` (window chrome around real client screenshots)
- `components/navbar.tsx`, `components/footer.tsx`: shared chrome.
- `components/home/*`: homepage sections.

## Color

- `background` (#050506) is the page. Surfaces step up through `card`
  (#0A0A0C) and `popover` (#0D0D0F). Hierarchy comes from 1px hairlines
  (`border-border`, white at 10%) more than from fills.
- `foreground` is near-white. `muted-foreground` carries body copy.
  `subtle-foreground` (`text-subtle`) is for metadata only.
- **The spectrum** (red, orange, yellow, green, blue, violet) is the light
  leaving the prism. It is the only brand color. Ration it:
  - the hero refraction scene
  - at most one `text-spectrum` phrase per viewport
  - `spectrum-rule` hairlines and the `prism-beam` ring on a single featured
    surface per section
  - soft blurred glows behind a hero or final CTA
  - charts (`--chart-*` map to the spectrum)
- `live` green is only for status (the waitlist dot).
- Never use the spectrum as a flat fill for buttons, body text, or large
  backgrounds. Buttons are white (`primary`) or outline.
- No raw hex in components. Use tokens or the utilities above. Page-scoped
  exceptions: `/chatgpt-ads` (light OpenAI-style surface, its own module).

## Typography

- Geist Sans for everything people read. Geist Mono for eyebrows, metadata,
  and small labels. Geist Pixel is retired and no longer loaded.
- Scale utilities: `text-display` (hero h1), `text-title` (section h2),
  `text-heading` (card titles), `text-lead` (subheads). Display and title use
  `text-gradient` (white fading to mist) by default.
- Headlines are **lowercase** (Prism house style, see the prism-writing
  skill), short, and end with a period. Proper nouns keep their capitals.
  Body copy uses normal sentence case.
- Balance display headlines (`text-balance`), `text-pretty` for body.

## Layout

- `prism-container`: max width 76rem with safe-area gutters.
- Section rhythm: `py-20 sm:py-24` (`Section`). Hairline dividers between
  sections are optional; spacing usually does the work.
- Mix section shapes so pages feel paced: open header + grid, full-bleed
  rail (marquee), bento grid, contained panel, split. Never stack three
  identical card grids.
- Cards: `rounded-2xl`, 1px border, `bg-card`. Panels: `rounded-3xl`.
- Mobile first: 16px side gutters minimum, no horizontal scroll, tap targets
  at least 40px.

## Components and patterns

### Header

Sticky (fixed and transparent at the top of `/`, solid after 8px of scroll):
logo, then a shadcn `NavigationMenu` (Work, Services menu, Wall of Love,
About, Pricing), then the white "Join the waitlist" pill with the live dot.
Mobile keeps the portaled full-height panel with focus, Escape, scroll-lock
and inert handling.

### Hero

One dominant idea: status pill, lowercase display headline, one sentence of
subhead, primary CTA plus one secondary, compact proof row. The homepage hero
carries the refraction scene (`components/home/HomeHero.tsx`), the only place
the full spectrum fan appears.

### Proof

Real client work is the hero of the site. Use the screenshots in
`public/case-studies/` inside `BrowserFrame`, marquees, and tilted walls.
Numbers come only from `lib/proof-metrics.ts` and verified case-study
metrics (`getCaseStudyMetric`). Former clients (`lib/former-clients.ts`)
never appear on proof surfaces.

### CTAs

Two grammars only: the white pill (`Button` default, or `WaitlistButton`)
and the outline pill (`Button variant="outline"`). Inline text links use an
arrow icon. Every core route ends with `FinalCta`.

### Status

`WaitlistStatus` and the footer capacity line are the only urgency devices.
The month is always the live `<WaitlistIntakeMonth />`. Never invent spot
counts, countdowns, or deadlines.

## Motion

Motion should feel like light moving through glass: smooth, purposeful, and
quiet enough that text stays readable.

- Allowed: the hero refraction choreography, marquees, scroll reveals
  (`Reveal`), count-ups (`HomeCountUp`), pointer spotlights, the slow
  spectrum beam, the live dot ping, hover lifts of 1 to 2px.
- Transform and opacity only (plus the CSS `@property` beam angle).
- Every loop sits behind `prefers-reduced-motion: no-preference`. The base
  style is always the finished frame, so reduced-motion, no-JS, and
  screenshot runs see complete content.
- No autoplaying video outside `HeroBackgroundLoop` and `HeroLoopingVideo`.

## Copy

Use the prism-writing skill, `prism-brand` pack.

- Lowercase headlines, second person, short lines, benefit first.
- No em dashes. No "unlock", "elevate", "seamless", "world-class",
  "cutting-edge", "revolutionary", "game-changing", "supercharge".
- No guarantees of growth, rankings, or results. Verified numbers only, with
  their source and date nearby.
- One CTA per page: "Join the waitlist".

## Do

- lead with real work and real numbers
- use stock shadcn components and the `components/prism` kit
- keep the spectrum rare so it stays special
- keep every page ending at the waitlist

## Do not

- invent proof, urgency, or testimonials
- reintroduce pixel-styled primitives, gold accents, or ivory text tokens
- use glassy gradients as decoration without a job
- hide content behind animation
