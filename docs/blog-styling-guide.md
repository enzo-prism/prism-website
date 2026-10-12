# Blog Styling Guide

## Overview

The blog styling system provides clean, consistent, and readable typography for all blog posts. Since the 2026-10-12 Prism Spectrum redesign, posts are styled by `proseClassName` (`components/landing/prose.ts`), a set of descendant utilities authored instead of the Tailwind Typography `prose` classes so global styles cannot override them.

## Key Improvements

1. **Better Readability**
   - Blog index + post pages use Geist Sans (with Geist Mono for metadata), like the rest of the site
   - Body copy is 17px (18px from `sm`) with a 1.8 line height in a 68ch column
   - Improved line height and spacing between elements
   - Softer text colors to reduce eye strain
   - Consistent spacing throughout the article

2. **Automatic Styling**
   - No need for inline styles in MDX files
   - All standard HTML elements are automatically styled
   - Consistent appearance across all blog posts
   - Built for the permanently dark canvas (tokens only, no raw hex)
   - Table of contents links are generated from H2/H3 headings
   - Blog card titles/descriptions keep authored capitalization (no forced lowercase transforms)

3. **Clean Content**
   - Avoid inline Tailwind classes/styles in MDX (they can cause visual drift)
   - Preserves special components like CTAs and embeds
   - Prioritizes sentence case and cleaner letter spacing for long-form readability

## Writing Blog Posts

### Basic Content

Simply write your content using standard Markdown/HTML elements. They will be automatically styled:

```mdx
This is a paragraph of text. It will be automatically styled with proper spacing and typography.

## A section heading

Use `##` and `###` in the body so the page keeps a single H1 (the title is already rendered from frontmatter).

- List items are automatically styled
- With proper spacing
- And bullet points

1. Numbered lists work too
2. With consistent styling
3. Throughout the blog
```

### Table of Contents

The blog layout automatically builds an "On this page" table of contents from H2/H3 headings. Use H2 for major sections and H3 for sub-sections so the TOC stays clean and scannable. Headings get stable anchor IDs automatically.

### Special Components

For enhanced content, use the custom MDX components:

```mdx
import { Lead, CheckList, CheckItem, Callout, BlogCTA, VideoEmbed, SectionBreak } from '@/components/mdx-components'

<Lead>
This is a lead paragraph with larger text for introductions.
</Lead>

<CheckList>
  <CheckItem>First checked item with a green checkmark</CheckItem>
  <CheckItem>Second checked item</CheckItem>
</CheckList>

<Callout type="info">
This is an informational callout box.
</Callout>

<BlogCTA 
  title="Ready to improve your business?" 
  description="Let us help you grow"
  buttonText="Join the waitlist"
  href="/waitlist"
/>

<SectionBreak label="Next up" />

<VideoEmbed 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="Video Title"
/>
```

## Best Practices

1. **Avoid Inline Styles**: Let the prose system handle styling
2. **Use Semantic HTML**: Keep a single H1 per page (the layout renders the H1 from frontmatter). Use H2/H3 in the MDX body.
3. **Keep TOC Clean**: Use H2 for major sections and H3 for sub-sections
4. **Keep It Simple**: Focus on content, not styling
5. **Use Components**: For special formatting, use the provided MDX components

## Technical Details

The blog styling system consists of (2026-10 Spectrum redesign, see `DESIGN.md`):

1. **`app/blog/layout.tsx`**: Keeps blog pages on Prism's shared Geist type system (`blog-reading-surface`)
2. **`proseClassName` (`components/landing/prose.ts`)**: The long-form reading styles for posts (68ch column, foreground-tinted body, clear H2/H3 rhythm, code, blockquotes, images, tables). Authored as descendant utilities, so the legacy `.prose-blog` rules in `globals.css` no longer apply to posts.
3. **Post chrome (`components/blog-post-layout.tsx`)**: Header with category badge, reading time, the display title, author and date, and the copy-as-Markdown button; optional cover image when the post has custom art; "On this page" table of contents (sticky rail on wide screens, disclosure on small ones); author card; three related posts; the shared `FinalCta`; and the global footer.
4. **Index (`app/blog/page.tsx`)**: Hero, topic pills with counts, a featured newest post, and a paginated 12-card grid with real or generated covers (`components/blog/blog-cover.tsx`).
5. **MDX components (`components/mdx-components.tsx`)**: Callouts, check lists, CTA buttons (white or outline pills, opt out of link styling with `.mdx-cta`), grids and cards in the dark token system.
6. **Dark only**: The site is permanently dark; use tokens, never raw hex, in blog components.

## Migration from Old Posts

Existing blog posts with inline styles may look inconsistent as the system evolves. For the best results, consider:

1. Removing inline text sizing classes (text-lg, text-xl, etc.)
2. Removing spacing utilities (mt-4, mb-6, etc.)
3. Using standard HTML elements without classes
4. Replacing custom CTAs with the BlogCTA component
