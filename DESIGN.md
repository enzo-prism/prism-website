---
version: alpha
name: Prism Black System
description: A dark-first design contract for the Prism marketing site, built around a black shell, warm ivory type, selective mono metadata, pixel accents, three section modes, and deliberate motion.
colors:
  primary: "#F5F0E8"
  canvas: "#000000"
  canvas-soft: "#0F0F0F"
  canvas-elevated: "#151515"
  text-strong: "#F5F0E8"
  text-muted: "#B8AFA2"
  text-subtle: "#8F877B"
  border: "#2A2A2A"
  action-ink: "#050505"
  proof-accent: "#D8BC79"
  proof-muted: "#7D766A"
typography:
  display-xl:
    fontFamily: "Geist Sans"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.05em"
  display-lg:
    fontFamily: "Geist Sans"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  display-md:
    fontFamily: "Geist Sans"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body-lg:
    fontFamily: "Geist Sans"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: "Geist Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  mono-sm:
    fontFamily: "Geist Mono"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.24em"
  mono-xs:
    fontFamily: "Geist Mono"
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.22em"
  pixel-accent:
    fontFamily: "Geist Pixel"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.08em"
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 96px
components:
  hero-frame:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.xl}"
    padding: 48px
  hero-support-pill:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-muted}"
    typography: "{typography.mono-xs}"
    rounded: "{rounded.full}"
    padding: 8px
  hero-primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.action-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  hero-secondary-button:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.text-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  text-link-action:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-strong}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  core-panel:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  section-eyebrow:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-subtle}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  divider-rule:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text-strong}"
    typography: "{typography.mono-xs}"
    rounded: "{rounded.none}"
    padding: 0px
  social-proof-inline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.proof-muted}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 0px
  social-proof-stars:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.proof-accent}"
    typography: "{typography.mono-xs}"
    rounded: "{rounded.none}"
    padding: 0px
---

# Prism Black System

## Purpose

This file is the code-facing design contract for Prism. It should describe the visual system that is actually live in this repo so future Codex sessions can extend the site without inventing new page-specific languages.

Prism should feel:

- sharp, dark, and intentional
- warm rather than cold
- minimal without becoming empty
- premium without looking like generic SaaS
- motion-aware, but never gimmicky

The safest mental model is **black shell + warm ivory type + selective mono metadata + pixel accents + paced section rhythm**.

### Growth-first Black System

For the homepage and `/get-started`, Prism should feel like a premium operating system for business growth: calm, precise, spacious, and trust-led. The copy should favor short outcome language such as **found, trusted, chosen**, and concrete growth terms such as founders, owners, operators, qualified demand, search visibility, proof, AI discovery, tracking, and conversion paths.

Keep the design dark and restrained. Do not pivot these pages into loud agency gradients, generic SaaS gloss, or luxury editorial excess. The Apple-like pattern here is clarity: fewer words, clearer hierarchy, premium spacing, buyer-decision logic, and confident CTAs around the free Growth Dashboard / Growth Audit path.

Dental remains one of Prism's strongest proof verticals, but the main homepage and get-started flow should make it clear that Prism also helps other serious businesses grow. Use dental proof as evidence inside a broader growth story, not as the only audience definition.

Homepage copy should stay ultra-minimal. Prefer short labels over explanations, compact proof over long cards, and one clear idea per section. Deeper pages can carry the detail; the homepage should make the growth offer obvious in seconds.

### Abstract Client Proof Cards

The homepage client proof carousel should not use real client photos or website screenshots in the card artwork. Those cards are a brand-system proof surface, not a media gallery. Use abstract growth-system motion instead: subtle grids, routed signal lines, pulsing nodes, Prism-centered initials, and small context labels that hint at the client type.

Keep the abstraction premium and restrained. The cards should still feel like case-study links, with the leader/company/location and a clear case-study affordance, but the visual should communicate systems, signal, and momentum rather than portraits.

Respect reduced motion. Motion can scale, pulse, route, or rotate slowly, but the card must remain legible and useful when animation is disabled.

## Scope

This contract is repo-wide, but it is most important for the public marketing system:

- `/`
- `/about`
- `/pricing`
- `/get-started`
- shared chrome like the navbar and footer

Other routes can diverge when the content format truly requires it, but they should still feel related. Do not casually create a new visual language for a single page.

### Sanctioned light surface: Founder OS

`/founder-os` and `/founder-os/apply` are a deliberate, product-approved exception to the dark-first system: they use a self-contained **light Geist** theme (white / near-neutral surfaces, sharp Geist Sans headings, restrained blue accent) so the premium offer reads as a distinct software product, separate from the dark marketing site. The entire light treatment — headings, hover-lift, scroll-reveal — is scoped via the `[data-surface='founder-os']` attribute in `app/globals.css`. Do not migrate these pages back to the dark system, and do not leak their light tokens onto other routes. **Gotcha:** the global `white` color token is remapped to near-black in this theme, so the Founder OS surface must use explicit `#ffffff` (never `bg-white`/`text-white`).

If Prism later adds `.stitch/`, keep `.stitch/DESIGN.md` as concept memory and keep this root `DESIGN.md` as the implementation contract for shipped code.

## Code anchors

When working on UI, these files are the fastest way to understand the live system:

- `app/globals.css` for the global canvas, type tokens, dark mode tokens, and page-wide atmosphere
- `tailwind.config.cjs` for mapped theme tokens and typography scale
- `components/core-route/CoreRoutePrimitives.tsx` for the shared section, panel, and CTA primitives used across the core routes
- `components/navbar.tsx` and `components/footer.tsx` for the shared chrome language
- `components/home/homepage-content.ts` for the current homepage copy structure and content blocks
- `components/home/*` for homepage-specific composition patterns
- `components/pixelish/*` and `public/pixelish/*` for the distinctive icon layer
- `lib/hero-media-policy.ts`, `components/home/DeferredAsciiHeroBackdrop.tsx`, `components/HeroBackgroundLoop.tsx`, and `components/HeroLoopingVideo.tsx` for motion policy and hero-loop behavior

Prefer extending those surfaces before introducing new ones.

## Brand principles

### 1. Dark-first, not dark-mode-for-the-sake-of-it

The site should feel intentionally black, not merely inverted. Use black or near-black as the base field, then create hierarchy with typography, borders, subtle surfaces, and carefully rationed accents.

Avoid default gray dashboards, translucent glass treatments, or glossy gradient-heavy hero sections.

### 2. Warm contrast, not icy contrast

Primary copy should land in warm ivory, not bright blue-white. Supporting copy should sit in sand and stone tones. This keeps the site legible while preserving the Prism mood.

### 3. Typography carries most of the brand

Prism’s strongest brand signal is the relationship between:

- **Geist Sans** for headlines and body
- **Geist Mono** for metadata, labels, and navigation utility text
- **Geist Pixel** only for sparse accent moments

Pixel is an accent language, not the default reading system.

### 4. Fewer, stronger sections

The site should not become a stack of interchangeable cards. Each section should have one clear job and one clear dominant idea. Use panels, dividers, and chips only when they help hierarchy.

## Color system

### Base palette

- `canvas` is true black and should remain the dominant page field on core routes.
- `canvas-soft` and `canvas-elevated` are for panels, hero frames, subtle chips, and contained surfaces.
- `text-strong` is the headline and primary-copy color.
- `text-muted` is for body support copy, secondary actions, and helper text.
- `text-subtle` is for metadata, mono labels, and low-emphasis affordances.
- `border` is a thin structural divider color. Borders should feel quiet and precise.
- `proof-accent` is for tiny trust or proof signals only. It should never become the main page accent.

### Color rules

- Prefer the semantic colors defined above over introducing new raw hex values.
- New accents should be rare. If the request truly needs one, add it here in the same task.
- Gold belongs to trust and proof, not the full CTA system.
- Bright saturated colors should stay scoped to purposeful contexts, not become the default site palette.

## Typography

### Headlines

- Use sans display headings with tight tracking and strong line-height control.
- Headings should usually be one or two lines on desktop and at most two or three lines on mobile.
- Prefer medium weight with tight letter spacing over extra-bold generic marketing headings.
- Use balanced wrapping for large headlines, but do not apply headline balancing logic to compact UI labels where it can create unnecessary extra lines.

### Body

- Body copy should stay concise and readable.
- Long paragraphs are almost always the wrong choice for Prism’s marketing pages.
- Favor short paragraphs, simple sentences, and visible breathing room.

### Metadata

- Eyebrows, nav labels, support chips, and proof labels should use mono uppercase spacing.
- Mono should feel like a precision layer, not the main narrative voice.
- Use it selectively. If a section heading and body already explain the point clearly, skip the eyebrow instead of adding more UI noise.
- Default to mono for navigation, proof metadata, support chips, and process markers before using it for section introductions.

### Compact text and wrapping

- Short UI labels, question prompts, chip text, and stat labels should wrap to as few lines as possible while staying readable.
- Avoid letting 2-6 word interface labels break into three lines when the layout can instead allocate a slightly wider track.
- Prefer content-aware grid tracks such as `minmax(...)` or weighted fractions for repeated card rows when one item is materially longer than its siblings.
- Use `text-wrap: pretty` for compact UI copy and supporting sentences; reserve `text-wrap: balance` for display headlines and other large title treatments.
- On desktop, chips and pills should stay single-line unless the mobile layout genuinely needs wrapping.

### Pixel usage

- Use pixel type only for rare brand accents or ASCII-adjacent moments.
- Do not use pixel as the default font for CTA labels, paragraphs, or nav.

## Layout and spacing

### Containers

- The core route container should stay around the current `max-w-6xl` rhythm.
- Section spacing should feel generous. Prism reads best when sections have strong vertical rhythm and breathing room.

### Sections

- Divider-led sections are the default for core marketing routes.
- Panels should use large rounded corners and quiet borders.
- Prefer asymmetry and strong left alignment over centering everything.

### Section modes

Core marketing routes should alternate between three reusable section modes:

- **Quiet divider section** for copy-led or list-led sections that need maximum openness.
- **Contained panel section** for grouped ideas like process, fit, or promise sections where a darker frame improves pacing.
- **Split section** for sections with a strong heading block on one side and supporting structure on the other.

Avoid stacking too many consecutive sections in the exact same mode. The page should feel paced, not mechanically templated.

### Shapes

- Hero frames and primary panels use large rounded corners.
- Hero buttons use softer rectangular corners, not pills.
- Chips and small support labels can be pill-shaped.
- Avoid mixing too many radius families in one surface.

## Core components

### Hero

The homepage hero is the reference surface for tone:

- support chips at the top
- one direct headline (currently three short outcome lines with muted verbs and a staggered rise-in)
- one short subhead
- simple primary and secondary CTA row
- subtle social proof
- a quiet mono "system strip" along the hero's bottom rule with pulsing signal dots
- restrained motion behind the copy

Do not overload the hero with dense copy, too many badges, or a second competing visual system.

### CTA grammar

Prism currently uses two primary CTA patterns:

- **hero buttons** for high-intent entry points
- **text-link actions** for quieter section-level actions

Do not invent a third or fourth CTA language unless product direction changes.

### Panels

Panels should feel like quiet containment, not glossy cards. Use them when they genuinely improve pacing or scanning.

### Section eyebrows

Eyebrows are no longer the default on every section. Use them only when they add orientation or contrast that the heading itself does not already provide.

### Navbar

The navbar should stay minimal:

- black surface
- off-white type
- tiny uppercase tracking
- compact mobile toggle

It should feel like part of the page shell, not a separate app chrome layer.

### Social proof

Proof should stay subtle and integrated. Small inline proof beats loud testimonial clutter unless the page specifically needs a stronger proof section.

## Iconography

Pixelish icons are part of Prism’s signature language for:

- homepage support chips
- service stacks
- proof or process callouts

Use them when the goal is brand texture or signal clarity.

Lucide and other utility icons are acceptable for product/utility moments, but the marketing site should not drift into inconsistent icon systems inside the same section.

## Motion

Motion should feel deliberate and technical, not flashy.

### Allowed motion patterns

- ASCII hero motion
- looping hero or section video when it genuinely adds atmosphere
- subtle hover state transitions, including pointer-tracked spotlight highlights on card grids
- progressive reveal where it supports hierarchy (`components/home/HomeReveal.tsx` — content must stay visible for no-JS and reduced-motion visitors)
- stat count-up on first view (`components/home/HomeCountUp.tsx`)
- quiet signal accents: slow scan-lines along hairlines, pulsing status dots, and traveling rail pulses (`home-scan-line`, `home-signal-dot`, `home-rail-flow` in `app/globals.css`)

### Motion rules

- Respect reduced motion.
- Keep autoplay motion decorative and non-blocking.
- Mobile motion should degrade gracefully rather than disappear by accident.
- Motion must never make text harder to read.

If a new animation is added, it should pass the same standard as the current homepage, case studies, and wall-of-love hero loops: clearly intentional, resilient across browsers, and quiet enough to support the page.

## Implementation rules for Codex

- Read this file before changing UI, marketing copy structure, layout, motion, or tokens.
- Start from existing primitives before introducing new markup or ad hoc styles.
- Prefer semantic tokens and the exported files in `/generated/` over inventing new values in code.
- If you truly need a new token, update `DESIGN.md` and refresh `/generated/` in the same task.
- Keep `AGENTS.md` operational. Put design rationale here, not there.

## Do

- keep pages dark, clear, and restrained
- use typography and spacing as the primary hierarchy tools
- use mono as a metadata layer
- keep proof and motion subtle
- reuse `CoreRoutePrimitives` whenever possible

## Do not

- introduce one-off brand systems per page
- flood the site with bright gradients, glass effects, or purple defaults
- turn every section into a card grid
- use pixel type as general-purpose body or CTA copy
- add raw design values casually when a token should exist
