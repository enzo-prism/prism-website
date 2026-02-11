# Blog Content Architecture

## Overview

The blog is built from MDX sources in `content/blog`. Posts are rendered on the server via `lib/mdx.tsx`, which parses frontmatter, normalizes text (e.g., Codex casing), and exposes strongly typed metadata to the App Router pages.

Recent updates introduced:

- **Normalized category slugs** for filterable taxonomies
- **Related post recommendations** per article
- **An RSS feed** served from `/blog/feed.xml`
- **Automatic table of contents generation** from H2/H3 headings

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
| `h1Title`, `openGraph`, `twitter`, `canonical` | optional | Overrides for layout & SEO                                |

Blog cards and post hero sections render the frontmatter `image` when available. If `image` is omitted or invalid, they fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`).

`lib/mdx.tsx` automatically derives `categorySlug` from the `category` label by lowercasing and replacing non-alphanumeric characters with hyphens. Stick to meaningful labels; the slug keeps filters URL-safe.

Open Graph behavior is date-based in `app/blog/[slug]/page.tsx`: posts before 2026 always use the shared Prism OG image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`), while posts in 2026 and later use each post’s resolved featured image (`frontmatter.image`). Twitter images still honor explicit `twitter.images` first, then `openGraph.images`, then the date-based OG fallback.

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
