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
    // Next already tree-shakes lucide-react / date-fns by default. List the
    // heavy barrels explicitly so per-route bundles only pull the pieces
    // they use.
    optimizePackageImports: ['framer-motion', 'recharts'],
  },
outputFileTracingIncludes: {
  "/api/latest-posts": ["content/blog/**/*"],
  "/blog": ["content/blog/**/*"],
  "/blog/feed.xml": ["content/blog/**/*"],
  "/sitemap.xml": ["content/blog/**/*"],
},
// Enhanced image optimization configuration
images: {
  // AVIF first: at the same quality settings it is typically ~20% smaller
  // than WebP, and every current browser that matters for this audience
  // negotiates it via Accept. Browsers without AVIF still get WebP, then the
  // original format. Order only; quality values and sizes are unchanged.
  formats: ['image/avif', 'image/webp'], // Enable modern image formats
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
    // assets must ship under a new filename (e.g. hero-loop-2026.mp4) so the
    // long-lived cache below can never serve stale content.
    return [
      {
        // Baseline security headers. Permissions-Policy only switches off
        // features the site never uses; autoplay/fullscreen stay available
        // for video embeds.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
          },
        ],
      },
      {
        // Static media served from /public (photos, posters, videos) that is
        // NOT covered by the immutable rule below. Files here are
        // occasionally overwritten under the same filename, so a year-long
        // immutable cache could pin stale art; instead cache for an hour and
        // serve stale-while-revalidate for a day. Repeat visitors skip the
        // per-image 304 round trips the platform default (max-age=0) forces,
        // while a same-name overwrite self-heals within an hour. This rule
        // comes first so the directory-specific immutable rule below
        // overrides it where both match.
        source:
          '/:path*.(png|jpg|jpeg|webp|avif|gif|svg|mp4|webm|mp3|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
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
      // Waitlist funnel (2026-09-14): Prism is at capacity. Every retired lead
      // funnel lands on the one waitlist. Service intakes keep their focus.
      { source: '/website-intake', destination: '/waitlist?focus=website', permanent: true },
      { source: '/content-intake', destination: '/waitlist?focus=content', permanent: true },
      { source: '/ads-intake', destination: '/waitlist?focus=ads', permanent: true },
      { source: '/get-started', destination: '/waitlist', permanent: true },
      { source: '/apply', destination: '/waitlist', permanent: true },
      { source: '/free-analysis', destination: '/waitlist', permanent: true },
      { source: '/contact', destination: '/waitlist', permanent: true },
      { source: '/book-a-shoot', destination: '/waitlist', permanent: true },
      // AEO is a service again (2026-10-18): /aeo is the canonical page, and
      // the AI search shortpaths and the retired /ai-seo-services lander
      // consolidate there so one page owns the topic.
      { source: '/ai', destination: '/aeo', permanent: true },
      { source: '/ai-seo-services', destination: '/aeo', permanent: true },
      { source: '/answer-engine-optimization', destination: '/aeo', permanent: true },
      { source: '/generative-engine-optimization', destination: '/aeo', permanent: true },
      { source: '/aeo-services', destination: '/aeo', permanent: true },
      // Content is the public service page and the offer name on /pricing.
      // Founder OS stays retired.
      { source: '/content-os', destination: '/content', permanent: true },
      { source: '/founder-os', destination: '/content', permanent: true },
      { source: '/founder-os/apply', destination: '/content', permanent: true },
      { source: '/website', destination: '/websites', permanent: true },
      // Three services only (2026-10-12): Websites, Content, Ads. The two
      // retired packaged offers had no subpaths. The dental offer lands on the
      // dental website lander (indexable, waitlist CTA with focus=website);
      // the creative subscription lands on Content.
      { source: '/dental-os', destination: '/dental-website', permanent: true },
      { source: '/prism-infinity', destination: '/content', permanent: true },
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
      { source: '/ai-seo', destination: '/aeo', permanent: true },
      { source: '/ai-search-optimization', destination: '/aeo', permanent: true },
      { source: '/llm-seo-services', destination: '/aeo', permanent: true },
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
      { source: '/hello', destination: '/waitlist', permanent: true },
      { source: '/mind', destination: '/blog', permanent: true },
      { source: '/old-home', destination: '/', permanent: true },
      { source: '/pod-3-katie-lee', destination: '/podcast', permanent: true },
      { source: '/pod-7-teagan', destination: '/podcast', permanent: true },

      // 2025 legacy cleanup
      { source: '/affiliate', destination: '/refer', permanent: true },
      { source: '/referral', destination: '/refer', permanent: true },
      { source: '/referrals', destination: '/refer', permanent: true },
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

      // Live 404s seen in production request logs — real visitors are still
      // arriving on these from off-site citations (directory listings, an old
      // Google Business Profile link, stale backlinks). Send them somewhere
      // useful instead of a dead end.
      { source: '/contact-us', destination: '/waitlist', permanent: true },
      { source: '/hours', destination: '/waitlist', permanent: true },
      { source: '/chatgptads', destination: '/chatgpt-ads', permanent: true },
      { source: '/openai-ads', destination: '/chatgpt-ads', permanent: true },
      { source: '/chat-gpt-ads', destination: '/chatgpt-ads', permanent: true },
      { source: '/chatgpt-ad', destination: '/chatgpt-ads', permanent: true },
      { source: '/openai-chatgpt-ads', destination: '/chatgpt-ads', permanent: true },
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

  // Tree-shake optional SDK code the site never enables (Session Replay
  // internals, debug statements) out of the client bundle.
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
    excludeReplayWorker: true,
  },

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  automaticVercelMonitors: true,
});
