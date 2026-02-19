# Blog Content Architecture

## Overview

The blog is built from MDX sources in `content/blog`. Posts are rendered on the server via `lib/mdx.tsx`, which parses frontmatter, normalizes text (e.g., Codex casing), and exposes strongly typed metadata to the App Router pages.

Recent updates introduced:

- **Normalized category slugs** for filterable taxonomies
- **Related post recommendations** per article
- **An RSS feed** served from `/blog/feed.xml`
- **Automatic table of contents generation** from H2/H3 headings
- **A header-level "Copy markdown" action** that copies the full post MDX source for AI workflows

Use this document when adding posts or customizing the discovery experience.

---

## Frontmatter Requirements

Each MDX file must define:

| Field                                          | Required | Notes                                                     |
| ---------------------------------------------- | -------- | --------------------------------------------------------- |
| `title`                                        | ✅       | Used for metadata + card headings                         |
| `author`                                       | optional | Byline for cards + post header (defaults to "Prism Team") |
| `description`                                  | ✅       | Summary for cards, RSS, and SEO                           |
| `date`                                         | ✅       | ISO string (`YYYY-MM-DD`)                                 |
| `category`                                     | ✅       | Free-form label; slug auto-generated                      |
| `gradientClass`                                | ✅       | Tailwind gradient utilities for OG art                    |
| `image`                                        | optional | Relative path for hero image + cards                      |
| `seoTitle`, `seoDescription`                   | optional | Manual SEO overrides for search snippets                   |
| `h1Title`, `openGraph`, `twitter`, `canonical` | optional | Overrides for layout + social metadata                     |

Blog cards and post hero sections render the frontmatter `image` when available. If `image` is omitted or invalid, they fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`).

`lib/mdx.tsx` automatically derives `categorySlug` from the `category` label by lowercasing and replacing non-alphanumeric characters with hyphens. Stick to meaningful labels; the slug keeps filters URL-safe.

Open Graph behavior is date-based in `app/blog/[slug]/page.tsx`: posts before 2026 always use the shared Prism OG image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`), while posts in 2026 and later use each post’s resolved featured image (`frontmatter.image`). Twitter images still honor explicit `twitter.images` first, then `openGraph.images`, then the date-based OG fallback.

`components/blog/copy-blog-markdown-button.tsx` powers the header "Copy markdown" action on blog post routes (`/blog/[slug]`). It fetches the raw MDX source from `app/api/blog/[slug]/markdown/route.ts` on demand, then copies the full post (frontmatter + body) for use in AI tools without inflating initial page payloads. The site-wide page markdown control lives in `components/copy-page-markdown-button.tsx` and is hidden on blog posts so this source-level copy remains the primary blog behavior.

`seoTitle` and `seoDescription` are optional manual overrides used by the post metadata generator. If omitted, the generator falls back to `title` and `description`, then normalizes with the shared SEO rules (`lib/seo/rules.ts`) to enforce sentence case, canonical host, and a single `| Prism` title suffix.

Headings (H2/H3) are assigned stable anchor IDs during MDX rendering (`rehype-slug`), and `lib/mdx-toc.ts` parses the MDX source to build the table of contents.

---

## Category Filtering

`components/blog-filter-navigation.tsx` powers the sticky filter/search bar on `/blog`. Highlights:

- Categories are sorted from the `Map<slug, label>` produced in `app/blog/BlogPostsList.tsx`.
- Selecting a pill filters posts by `categorySlug`. The “All” pill shows everything.
- The search box performs a case-insensitive match against `title`, `description`, and `category`.

If you introduce a new category label in MDX, it automatically appears as soon as the site rebuilds—no config changes required.

---

## Related Posts

`app/blog/[slug]/page.tsx` now fetches all posts on the server, prioritizes those that share the same `categorySlug`, then fills remaining slots with the latest posts from other categories. The top three are passed to `components/blog-post-layout.tsx`, which renders them using `SimpleBlogPostCard`.

To tweak behavior (e.g., change the count or ranking), adjust the logic in `app/blog/[slug]/page.tsx`.

## Unified "How this translates at Prism" section

All blog posts now receive a shared Prism-impact footer from the rendering layer instead of manual edits in each MDX file.

The flow is driven by:

- `components/blog-post-layout.tsx` receives an optional `prismImpact` prop and renders the section after article body content and before related posts.
- `app/blog/[slug]/page.tsx` resolves the config at request time and passes `prismImpact={getPrismImpactForPost(...)}`.
- `lib/prism-blog-impact.ts` stores all resolver behavior and shared link strategies.

The resolver strategy in `lib/prism-blog-impact.ts`:

1. checks for a slug-specific override in `SLUG_OVERRIDES`
2. falls back to category rules in `CATEGORY_RULES`
3. falls back to `DEFAULT_IMPACT`
4. applies optional skip guard when a post already contains a Prism-specific closeout section

`PrismImpactConfig` has:

```
- title (optional)
- impactSummary
- clientOutcomes (2-4 bullets)
- serviceLinks (2-4 internal links)
- referenceLinks (2-4 external links)
- forceRender?: boolean
```

`PrismLink` (alias of `PrismImpactLink`) enforces `label`, `href`, `kind` (`internal` | `external`), and `reason`.

To add or change links:

1. Open `lib/prism-blog-impact.ts`.
2. Adjust `SLUG_OVERRIDES` for topic-specific posts.
3. Adjust `CATEGORY_RULES` for a taxonomy shift.
4. Update `PrismImpactConfig` objects to add internal service links and external references.

Outbound link behavior is enforced in `components/mdx-components.tsx` so all Markdown HTTP/HTTPS links open in a new tab with `rel="noopener noreferrer"` automatically. This also applies to links added later in Markdown content.

## Outbound link enrichment for all 71 posts

To add outbound references without editing each `.mdx` file, outbound-link injection now runs in the blog rendering pipeline:

- `lib/blog-inline-link-rules.ts` defines resolver data:
  - `OutboundLinkRule`
  - `BlogOutboundLinkProfile`
  - `getOutboundLinkRulesForPost({ slug, category, title, content })`
- `lib/blog-inline-link-injector.ts` performs safe text-only injection with:
  - protection for code blocks, inline code, existing markdown links, and inline HTML
  - boundary-aware phrase matching
  - max-link caps (default 6)
  - candidate scoring across the full line, with context-aware disambiguation for short terms
  - dedupe by paragraph anchor and overlap avoidance
- `app/blog/[slug]/page.tsx` resolves a profile for each post and injects links into the MDX string before passing it into `renderPost(...)`.
- `components/blog-post-layout.tsx` receives the rendered post and keeps section logic unchanged.

Resolver behavior:
1. Slug-level overrides
2. Category-level defaults
3. Global defaults

Injected links use:
- `target="_blank"`
- `rel="noopener noreferrer"`
- `className="blog-inline-link"` for styling

A link-quality validation script is available:

- `pnpm validate:blog-links` runs `scripts/validate-blog-links.ts`
- checks link counts per post
- checks for duplicate injected phrases and unbalanced anchor markup
- checks resolver URLs for HTTP status

## Autolink scoring and disambiguation

The ranking model in `lib/blog-inline-link-injector.ts` can be tuned by editing these values:

- `SHORT_TERM_CONTEXT_WINDOW` (`lib/blog-inline-link-injector.ts`): context window around a short match used for keyword hint checks.
- `DEFAULT_MIN_SCORE`: global floor below which candidate links are skipped.
- `SHORT_TERM_CONTEXT_HINTS`: per-phrase context tokens that help prevent false positives for ambiguous short terms.

Current short-term context gating is enabled for `ai` (including `gpt`, `claude`, `chatgpt`, `agent`, etc.) so generic "AI"/"Agents"-style matches only score high when surrounding copy indicates AI tooling context.

For rule-level disambiguation, use precise variants in `lib/blog-inline-link-rules.ts` and avoid extremely broad variants (for example, the generic `agents` variant was replaced with `AI agents` to reduce accidental matches).

When adjusting precision:

1. Start by reducing broad variants in `AI_RULES` and similar pools.
2. Then tighten `DEFAULT_MIN_SCORE` and/or expand `SHORT_TERM_CONTEXT_HINTS`.
3. Keep `validate:blog-links` passing after rule edits to avoid silent coverage/regression issues.

This keeps editorial copy untouched while making outbound references consistent across all posts.

## Reading and feedback enhancements

Post-page UX includes two additional client-side interaction layers that run without editing MDX:

- Reading mode toggle
  - `components/blog/blog-reading-mode-toggle.tsx` adds a compact `Reading mode` control in the article header.
  - Toggle state is stored in `localStorage` (`prism-blog-reading-mode`).
  - When enabled, the page adds `blog-reading-mode` to the root element; typography is adjusted via `app/globals.css` for improved scan speed and comfort.
- Helpful feedback micro-interaction
  - `components/blog/blog-post-feedback.tsx` adds a post-level `Was this post helpful?` prompt.
  - Feedback is saved in `localStorage` per slug (`prism-blog-feedback-<slug>`) to prevent repeated prompts.
  - No editorial copy changes are required because it renders in the shared layout after article body sections.

Both components are intentionally lightweight and intentionally scoped to preserve the existing metadata flow (`app/blog/[slug]/page.tsx` and `components/blog-post-layout.tsx`) unchanged.

---

## RSS Feed (`/blog/feed.xml`)

Located at `app/blog/feed.xml/route.ts`:

- Serves the latest 25 posts in RSS 2.0 format.
- Cached for one hour (`revalidate = 3600`); Vercel’s edge caches respect `Cache-Control: s-maxage=3600`.
- Uses the canonical host (`www.design-prism.com` by default) even if `NEXT_PUBLIC_BASE_URL` differs.

### Previewing locally

```bash
pnpm dev
# then visit http://localhost:3000/blog/feed.xml
```

If you rebrand or change domains, update the `CANONICAL_HOST` constant to keep feed URLs consistent.

---

## Adding a New Post

1. Create `content/blog/my-post-slug.mdx`.
2. Populate required frontmatter fields.
3. Write content in Markdown/MDX. Avoid inline styling—`prose-blog` handles typography.
4. The layout renders the post title as the single H1. Use H2 for major sections and H3 for sub-sections so the table of contents stays accurate.
5. Run `pnpm run typecheck` to ensure the post parses correctly.
6. Commit the MDX file. The sitemap, blog page, related posts, and RSS feed update automatically.

---

## Debugging Tips

- **Broken filters**: ensure the new post’s `category` isn’t blank—empty strings collapse the slug to `general`.
- **Missing in feed**: confirm the `date` is valid; invalid dates are sorted to the bottom and may fall outside the top 25.
- **OG gradients**: verify `gradientClass` uses Tailwind utilities recognized by `utils/tailwind-to-css.ts`.
