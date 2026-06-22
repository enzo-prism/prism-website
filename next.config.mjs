import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const configRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
typescript: {
  ignoreBuildErrors: false,
},
  turbopack: {
    root: configRoot,
  },
  experimental: {
    // Next already tree-shakes lucide-react / recharts / date-fns by default.
    // Add the heavy barrels it does NOT cover so per-route bundles only pull the
    // pieces they use (framer-motion is imported across ~40 files; drei/three
    // power a few landing pages + the ElevenLabs orb).
    optimizePackageImports: ['framer-motion', '@react-three/drei'],
  },
outputFileTracingIncludes: {
  "/api/latest-posts": ["content/blog/**/*"],
  "/blog": ["content/blog/**/*"],
  "/blog/feed.xml": ["content/blog/**/*"],
  "/sitemap.xml": ["content/blog/**/*"],
},
// Enhanced image optimization configuration
images: {
  formats: ['image/webp', 'image/avif'], // Enable modern image formats
  qualities: [75, 90],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
  minimumCacheTTL: 31536000, // 1 year cache for optimized images
  dangerouslyAllowSVG: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
    {
      protocol: 'https',
      hostname: 'wholesale.azdentall.com',
    },
    {
      protocol: 'https',
      hostname: 'dentiphoto.com',
    },
    {
      protocol: 'https',
      hostname: 'dentalaccessories.org',
    },
  ],
  contentSecurityPolicy:
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' data: https://www.google-analytics.com https://res.cloudinary.com https://wholesale.azdentall.com https://dentiphoto.com https://dentalaccessories.org; media-src 'self' https://res.cloudinary.com https://wholesale.azdentall.com https://dentiphoto.com https://dentalaccessories.org; frame-src 'self' https://www.googletagmanager.com;",
},
  async headers() {
    // Decorative media under /public is effectively content-versioned: changed
    // assets must ship under a new filename (e.g. planet-lite-2026.mp4) so the
    // long-lived cache below can never serve stale content.
    return [
      {
        source: '/animations/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // frames.json keeps a fixed name across regenerations (pnpm ascii:bundle),
        // so it must revalidate instead of inheriting the immutable rule above.
        source: '/animations/:path*/frames.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/ascii/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // NOTE: browser-side immutable caching of Next's /_next/image endpoint is
      // NOT configurable here — Next controls that route's Cache-Control
      // internally (it returns max-age=0, must-revalidate to browsers regardless
      // of next.config headers()). Vercel still edge-caches optimized variants,
      // so repeat loads are fast 304s. A true browser-immutable fix needs a
      // different image delivery path (e.g. a CDN with its own cache-control).
    ]
  },
  async redirects() {
    return [
      // Specific legacy mappings
      { source: '/dr-chris-wong', destination: '/case-studies/dr-christopher-wong', permanent: true },
      { source: '/our-work/chris-wong-case-study', destination: '/case-studies/dr-christopher-wong', permanent: true },
      { source: '/dr-chris-wong-successful-dental-practice-palo-alto', destination: '/case-studies/dr-christopher-wong', permanent: true },

      // Consolidations
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/our-work', destination: '/case-studies', permanent: true },
      { source: '/our-work/:path*', destination: '/case-studies', permanent: true },
      { source: '/success-stories', destination: '/case-studies', permanent: true },
      { source: '/our-services', destination: '/', permanent: true },
      { source: '/pod', destination: '/', permanent: true },
      { source: '/tools', destination: '/services', permanent: true },
      { source: '/portfolio', destination: '/case-studies', permanent: true },
      // Friendly shortpaths for new nav structure
      { source: '/design', destination: '/designs', permanent: true },
      { source: '/growth', destination: '/pricing', permanent: true },
      { source: '/pricing-dental', destination: '/pricing', permanent: true },
      { source: '/ai-website-launch', destination: '/pricing', permanent: true },
      { source: '/one-time-fee', destination: '/pricing', permanent: true },
      { source: '/offers', destination: '/pricing', permanent: true },
      { source: '/offers/:path*', destination: '/pricing', permanent: true },
      { source: '/checkout/launch', destination: '/pricing', permanent: true },
      { source: '/checkout/grow', destination: '/pricing', permanent: true },
      { source: '/checkout/scale', destination: '/pricing', permanent: true },
      { source: '/seo-consultant-for-dentists', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/seo-for-dentists', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dentist-seo', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dental-seo', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dental-seo-services', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dental-local-seo', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dentist-local-seo', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/local-seo-for-dentists', destination: '/dental-practice-seo-expert', permanent: true },
      { source: '/dentist-website-design', destination: '/dental-website', permanent: true },
      { source: '/dental-website-design', destination: '/dental-website', permanent: true },
      { source: '/ai-seo', destination: '/ai-seo-services', permanent: true },
      { source: '/ai-search-optimization', destination: '/ai-seo-services', permanent: true },
      { source: '/llm-seo-services', destination: '/ai-seo-services', permanent: true },
      { source: '/seo-audit', destination: '/seo/audit', permanent: true },
      { source: '/seo-audit-service', destination: '/seo/audit', permanent: true },
      { source: '/seo-audit-services', destination: '/seo/audit', permanent: true },
      { source: '/ai-search-for-dental-practice', destination: '/blog/ai-search-for-dental-practice', permanent: true },
      { source: '/dentist-tiktok-ads', destination: '/tiktok-ads-for-dentists', permanent: true },
      { source: '/tiktok-ads-dental-practice', destination: '/tiktok-ads-for-dentists', permanent: true },
      { source: '/meta-ads-for-dentists', destination: '/facebook-ads-for-dentists', permanent: true },
      { source: '/instagram-ads-for-dentists', destination: '/facebook-ads-for-dentists', permanent: true },
      { source: '/dental-practice-rank-higher-google-search', destination: '/blog/dental-practice-rank-higher-google-search', permanent: true },

      // Old content -> closest current destinations
      { source: '/dr-kris-hamamoto', destination: '/', permanent: true },
      { source: '/dr-ahmed-mataria-dental-care-innovation', destination: '/case-studies', permanent: true },
      { source: '/elevating-dental-compliance-will-gilmore', destination: '/case-studies', permanent: true },
      { source: '/michael-njo-resilience-mentorship-dentistry', destination: '/case-studies', permanent: true },
      { source: '/hello', destination: '/get-started', permanent: true },
      { source: '/mind', destination: '/blog', permanent: true },
      { source: '/old-home', destination: '/', permanent: true },
      { source: '/pod-3-katie-lee', destination: '/podcast', permanent: true },
      { source: '/pod-7-teagan', destination: '/podcast', permanent: true },

      // 2025 legacy cleanup
      { source: '/affiliate', destination: '/refer', permanent: true },
      { source: '/shop', destination: '/pricing', permanent: true },
      { source: '/search', destination: '/blog', permanent: true },
      { source: '/blog/brand-strategy', destination: '/blog', permanent: true },
      { source: '/resources', destination: '/proof', permanent: true },
      { source: '/blog/custom-website-development', destination: '/blog', permanent: true },
      { source: '/blog/ai-digital-marketing', destination: '/blog', permanent: true },
      { source: '/blog/conversion-rate-optimization', destination: '/blog', permanent: true },
      {
        source: '/prism-guides/authenticity-wins-a-dentists-guide-to-photos-on-google-business-profile-yelp',
        destination: '/blog',
        permanent: true,
      },
      { source: '/prism-guides/purpose-drives-dentistry', destination: '/blog', permanent: true },
      { source: '/prism-guides/digital-dental-blueprint', destination: '/blog', permanent: true },
      { source: '/prism-guides/referral-strategies', destination: '/blog', permanent: true },
      { source: '/resources/design', destination: '/services', permanent: true },
      { source: '/dental-clinic-website-design', destination: '/dental-website', permanent: true },
      { source: '/pod-2-arash', destination: '/podcast', permanent: true },
      { source: '/blog/mobile-app-ux', destination: '/blog', permanent: true },
      { source: '/mission', destination: '/about', permanent: true },
      { source: '/free-resources-prism', destination: '/proof', permanent: true },
    ]
  },
}

export default withSentryConfig(withAnalyzer(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "prism-m0",
  project: "prism-website",
}, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: false,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  automaticVercelMonitors: true,
});
