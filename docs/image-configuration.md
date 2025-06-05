# Image Configuration Guide

This document outlines the proper configuration for images in the Prism Agency website to prevent display issues.

## Next.js Image Configuration

The `next.config.mjs` file must include all domains where images are hosted:

\`\`\`javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'blob.v0.dev',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      pathname: '/**',
    }
  ],
  unoptimized: false,
},
\`\`\`

## Image Error Handling Best Practices

1. **Always include error handling** for all image components:

\`\`\`jsx
<Image
  src={imageUrl || "/placeholder.svg"}
  alt={altText}
  onError={() => handleImageError()}
  // other props...
/>
\`\`\`

2. **Provide fallback images** when the primary image fails to load:

\`\`\`jsx
const [imageError, setImageError] = useState(false);

// In your component:
<Image
  src={imageError ? fallbackImageUrl : primaryImageUrl}
  alt={altText}
  onError={() => setImageError(true)}
  // other props...
/>
\`\`\`

3. **Use dynamic placeholder images** with descriptive queries:

\`\`\`jsx
const fallbackUrl = `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(description)}`;
\`\`\`

## Common Issues and Solutions

1. **Images not displaying**: Check that the domain is properly configured in `next.config.mjs`
2. **Blurry images**: Ensure proper `sizes` attribute is set based on responsive design
3. **Layout shifts**: Always specify width and height or use the `fill` property with a parent container that has position relative
4. **Performance issues**: Use the `priority` prop only for above-the-fold images

## Testing Image Display

Before deploying, test image display in the following scenarios:

1. With a slow network connection
2. With images that fail to load
3. On mobile devices
4. With various screen sizes

## Maintenance

When adding new image sources or CDNs, always update the `next.config.mjs` file to include the new domains.
