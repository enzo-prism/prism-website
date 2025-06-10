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

3. **Clean Content**
   - The MDX renderer automatically removes conflicting inline styles
   - Preserves special components like CTAs and embeds
   - Maintains the lowercase aesthetic while improving readability

## Writing Blog Posts

### Basic Content

Simply write your content using standard Markdown/HTML elements. They will be automatically styled:

```mdx
# This is a heading

This is a paragraph of text. It will be automatically styled with proper spacing and typography.

## Another heading

- List items are automatically styled
- With proper spacing
- And bullet points

1. Numbered lists work too
2. With consistent styling
3. Throughout the blog
```

### Special Components

For enhanced content, use the custom MDX components:

```mdx
import { Lead, CheckList, CheckItem, Callout, BlogCTA, VideoEmbed } from '@/components/mdx-components'

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

<VideoEmbed 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="Video Title"
/>
```

## Best Practices

1. **Avoid Inline Styles**: Let the prose system handle styling
2. **Use Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
3. **Keep It Simple**: Focus on content, not styling
4. **Use Components**: For special formatting, use the provided MDX components

## Technical Details

The blog styling system consists of:

1. **prose-blog** class: Custom Tailwind prose configuration
2. **lowercase-prose** class: Maintains the brand's lowercase aesthetic
3. **MDX renderer**: Cleans up inline styles automatically
4. **Dark mode**: Automatic color adjustments for dark theme

## Migration from Old Posts

Existing blog posts with inline styles will automatically have common style conflicts removed by the MDX renderer. However, for the best results, consider:

1. Removing inline text sizing classes (text-lg, text-xl, etc.)
2. Removing spacing utilities (mt-4, mb-6, etc.)
3. Using standard HTML elements without classes
4. Replacing custom CTAs with the BlogCTA component