# Blog Performance Optimization Guide

## Overview

This guide documents the GPU acceleration and performance optimizations implemented for the blog posts and blog page to achieve smoother, more responsive scrolling.

## Key Optimizations Implemented

### 0. Blog index bundle reduction

- `/blog` is now server-rendered (see `app/blog/page.tsx`) so the initial post grid ships as HTML instead of a large client-rendered list.
- Filtering/search uses URL params (`category`, `q`) via `components/blog-filter-navigation-server.tsx` to avoid hydrating the entire filter/list UI.
- Blog post cards on the index disable Next.js prefetch (`prefetch={false}`) to avoid prefetching dozens of post routes on first load.

### 1. GPU Acceleration Styles

We've added several GPU acceleration techniques across blog components:

- **Hardware Layer Promotion**: Using `transform: translateZ(0)` and `transform: translate3d(0, 0, 0)` to force elements onto their own compositing layers
- **Backface Visibility**: Setting `backface-visibility: hidden` to prevent unnecessary repaints
- **Will-change Property**: Optimizing `will-change` values for transform and opacity animations
- **CSS Containment**: Using `contain: layout style paint` to isolate rendering boundaries

### 2. Current Blog Components (2026-10-12 Prism Spectrum redesign)

- `/blog` renders `BlogFeaturedCard` and `BlogGridCard` from `components/blog/blog-post-cards.tsx` (server components, `next/image` covers, generated covers from `components/blog/blog-cover.tsx`, prefetch off by default) plus `FinalCta`.
- Posts render through `components/blog-post-layout.tsx` with the `proseClassName` reading styles from `components/landing/prose.ts`; motion is limited to CSS transitions and the scroll-progress bar.
- `SimpleBlogGrid` / `SimpleBlogPostCard` remain only for the related-post rails on `/seo` and `/local-listings`. The old `OptimizedBlogGrid`, `OptimizedBlogPostCard`, mobile blog grid/card, and Framer Motion card animations were deleted in the 2026-10 redesign.

### 3. Scroll Performance

#### Throttled Scroll Handlers
```javascript
useEffect(() => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Scroll calculations here
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}, []);
```

#### Passive Event Listeners
- All scroll event listeners use `{ passive: true }` to prevent blocking scrolling

### 4. CSS Utility Classes

`app/globals.css` still ships `.hardware-accelerated` for legacy surfaces. The old `.gpu-accelerated`, `.optimized-grid`, `.card-3d`, and `.smooth-scroll` helpers were removed with the redesign; new UI should use the Spectrum utilities and transform/opacity transitions described in `DESIGN.md`.

### 5. Accessibility Considerations

- Respects `prefers-reduced-motion` media query
- Fallbacks for browsers without GPU acceleration support
- Progressive enhancement approach

## Usage Examples

```tsx
import { BlogFeaturedCard, BlogGridCard } from '@/components/blog/blog-post-cards'

// Server-rendered cards; keep prefetch off on long lists.
<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {posts.map((post) => (
    <li key={post.slug}>
      <BlogGridCard post={post} />
    </li>
  ))}
</ul>
```

## Performance Metrics

### Before Optimization
- Scroll jank on mobile devices
- Layout shifts during scrolling
- High paint times on complex grids
- CPU-bound scroll animations

### After Optimization
- Smooth 60fps scrolling
- GPU-accelerated transforms
- Reduced main thread work
- Efficient repaints with CSS containment

## Browser Support

All optimizations gracefully degrade in older browsers:
- Modern browsers: Full GPU acceleration
- Older browsers: Basic CSS transitions
- No JavaScript: Static layout works perfectly

## Future Improvements

1. **Image Optimization**
   - Implement `loading="lazy"` with Intersection Observer fallback
   - Add blur-up placeholders for images
   - Use responsive images with srcset

2. **Code Splitting**
   - Lazy load blog post content
   - Dynamic imports for heavy components

3. **Prefetching**
   - Prefetch blog post data on hover
   - Resource hints for critical assets

## Testing

To verify GPU acceleration is working:

1. Open Chrome DevTools
2. Go to Rendering tab (More tools > Rendering)
3. Enable "Layer borders" 
4. Orange borders indicate GPU-accelerated layers

## Troubleshooting

### Scroll Still Feels Janky
- Check if other heavy JavaScript is running during scroll
- Verify GPU acceleration is enabled in browser
- Test with Chrome DevTools Performance profiler

### Animations Not Smooth
- Ensure `will-change` is set before animation starts
- Check for layout thrashing in DevTools
- Verify transforms are used instead of position changes

### High Memory Usage
- Limit number of GPU layers with virtual scrolling
- Remove `will-change` after animations complete
- Use CSS containment to limit render scope 
