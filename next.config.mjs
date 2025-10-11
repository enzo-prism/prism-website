import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
  ignoreDuringBuilds: false,
},
typescript: {
  ignoreBuildErrors: false,
},
// Enhanced image optimization configuration
images: {
  formats: ['image/webp', 'image/avif'], // Enable modern image formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
  minimumCacheTTL: 31536000, // 1 year cache for optimized images
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' data: https://www.google-analytics.com; frame-src 'self' https://www.googletagmanager.com;",
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
      { source: '/our-services', destination: '/', permanent: true },
      { source: '/pod', destination: '/', permanent: true },
      { source: '/refer', destination: '/get-started', permanent: true },
      { source: '/tools', destination: '/services', permanent: true },
      { source: '/portfolio', destination: '/case-studies', permanent: true },
      // Friendly shortpaths for new nav structure
      { source: '/design', destination: '/designs', permanent: true },
      { source: '/growth', destination: '/prism-flywheel', permanent: true },

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
    ]
  },
}

export default withSentryConfig(nextConfig, {
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
  transpileClientSDK: true,

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
