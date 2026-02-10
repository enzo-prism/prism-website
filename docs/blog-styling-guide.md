# Blog Styling Guide

## Overview

The blog styling system has been improved to provide clean, consistent, and readable typography for all blog posts. The new system uses Tailwind's Typography plugin with custom enhancements specifically designed for the Prism blog.

## Key Improvements

1. **Better Readability**
   - Optimized font size (17px base) for comfortable reading
   - Improved line height and spacing between elements
   - Softer text colors to reduce eye strain
   - Consistent spacing throughout the article

2. **Automatic Styling**
   - No need for inline styles in MDX files
   - All standard HTML elements are automatically styled
   - Consistent appearance across all blog posts
   - Dark mode support built-in
   - Table of contents links are generated from H2/H3 headings

3. **Clean Content**
   - Avoid inline Tailwind classes/styles in MDX (they can cause visual drift)
   - Preserves special components like CTAs and embeds
   - Maintains the lowercase aesthetic while improving readability

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
  buttonText="Get Started"
  href="/get-started"
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

The blog styling system consists of:

1. **prose-blog** class: Custom Tailwind prose configuration
2. **lowercase-prose** class: Maintains the brand's lowercase aesthetic
3. **MDX renderer**: Cleans up inline styles automatically
4. **Dark mode**: Automatic color adjustments for dark theme

## Migration from Old Posts

Existing blog posts with inline styles may look inconsistent as the system evolves. For the best results, consider:

1. Removing inline text sizing classes (text-lg, text-xl, etc.)
2. Removing spacing utilities (mt-4, mb-6, etc.)
3. Using standard HTML elements without classes
4. Replacing custom CTAs with the BlogCTA component
