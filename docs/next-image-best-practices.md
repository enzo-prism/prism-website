# Next.js Image Best Practices

This document outlines the best practices for using images in Next.js applications, based on the official Next.js documentation and Vercel recommendations.

## Core Principles

1. **Always use the Next.js Image component**: Never use the standard HTML `<img>` tag
2. **Always provide width and height**: Prevents layout shifts
3. **Always handle errors**: Use fallback images when primary images fail to load
4. **Optimize for performance**: Use appropriate sizes, formats, and loading strategies
5. **Follow consistent patterns**: Use our standardized CoreImage component

## Using the Next.js Image Component

The Next.js Image component (`next/image`) is designed to automatically optimize images and prevent layout shifts. Here's how to use it correctly:

\`\`\`tsx
import Image from 'next/image'

<Image
  src="/example.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={false}
/>
\`\`\`

### Key Props

- `src`: Path to the image (local or remote)
- `alt`: Descriptive alt text (required for accessibility)
- `width` and `height`: Dimensions of the image (required to prevent layout shifts)
- `priority`: Set to `true` for critical above-the-fold images
- `sizes`: Responsive size information (e.g., `"(max-width: 768px) 100vw, 50vw"`)
- `quality`: Image quality (1-100, default is 75)

## Local vs. Remote Images

### Local Images

For local images stored in the `public` directory:

\`\`\`tsx
<Image
  src="/images/example.jpg"
  alt="Example"
  width={800}
  height={600}
/>
\`\`\`

### Remote Images

For remote images, you must:

1. Configure the domain in `next.config.js`
2. Provide width and height manually

\`\`\`tsx
<Image
  src="https://example.com/image.jpg"
  alt="Remote example"
  width={800}
  height={600}
/>
\`\`\`

Configuration in `next.config.js`:

\`\`\`js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
}
\`\`\`

## Performance Optimization

### Priority Images

For LCP (Largest Contentful Paint) images:

\`\`\`tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
\`\`\`

### Responsive Images

Use the `sizes` prop to optimize for different viewport sizes:

\`\`\`tsx
<Image
  src="/responsive.jpg"
  alt="Responsive"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
\`\`\`

### Placeholder Images

Use placeholders to improve perceived performance:

\`\`\`tsx
<Image
  src="/example.jpg"
  alt="Example"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>
\`\`\`

## Error Handling

Always implement error handling for images:

\`\`\`tsx
<Image
  src="/may-fail.jpg"
  alt="Image"
  width={800}
  height={600}
  onError={(e) => {
    e.target.src = "/fallback.jpg"
  }}
/>
\`\`\`

## Common Issues and Solutions

### Images Not Loading

1. Check if the domain is configured in `next.config.js`
2. Verify the image path is correct
3. Ensure width and height are provided
4. Check for CORS issues with remote images

### Layout Shifts

1. Always provide accurate width and height
2. Use placeholder images during loading
3. Maintain consistent aspect ratios

### Performance Issues

1. Use appropriate image sizes
2. Enable WebP/AVIF formats
3. Use responsive sizes
4. Prioritize critical images

## Using Our CoreImage Component

Our application uses a standardized `CoreImage` component that implements all these best practices:

\`\`\`tsx
import CoreImage from "@/components/core-image"

<CoreImage
  src="/example.jpg"
  alt="Example"
  width={800}
  height={600}
  priority={false}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={90}
  trackingId="unique_id"
/>
\`\`\`

## Pre-Deployment Checklist

Before deploying, ensure:

1. All images have width and height attributes
2. Remote domains are configured in `next.config.js`
3. Critical images use the `priority` attribute
4. All images have meaningful alt text
5. Error handling is implemented for all images
\`\`\`

Let's create a script to verify all images in the project:
