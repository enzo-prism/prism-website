import ScrollManager from "@/components/scroll-manager"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"
// Import the schema components
import ErrorTracker from "@/components/error-tracker"
import HotjarScript from "@/components/hotjar-script"
import MCPHealthMonitor from "@/components/mcp-health-monitor"
import PerformanceMonitor from "@/components/performance-monitor"
import AnalyticsProvider from "@/components/analytics-provider"
import { GlobalSchemaGraph } from "@/components/schema-markup"
import SentryContextProvider from "@/components/sentry-context-provider"
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, IS_ANALYTICS_ENABLED } from "@/lib/constants"


export const metadata: Metadata = {
  title: {
    template: "%s | prism",
    default: "prism | growth engine for local brands",
  },
  description:
    "prism builds high-converting websites, manages paid ads, and optimizes local listings so small businesses consistently attract qualified local customers.",
  openGraph: {
    title: "prism | growth engine for local brands",
    description:
      "prism builds high-converting websites, manages paid ads, and optimizes local listings so small businesses consistently attract qualified local customers.",
    url: "https://www.design-prism.com",
    siteName: "prism",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "prism - beautiful software that grows revenue",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "prism | websites, ads & local listing optimization for small businesses",
    description:
      "prism builds high-converting websites, manages paid ads, and optimizes local listings so small businesses consistently attract qualified local customers.",
    images: ["/prism-opengraph.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-rounded.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-rounded.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon-rounded.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  generator: "v0.dev",
  metadataBase: new URL("https://www.design-prism.com"),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="m-0 p-0 w-full" suppressHydrationWarning>
      <head>
        {IS_ANALYTICS_ENABLED && (
          <>
            {/* Google tag (gtag.js) */}
            <Script
              id="ga-loader"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="ga-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                  gtag('config', '${GOOGLE_ADS_ID}');
                `,
              }}
            />
          </>
        )}
        {/* viewport is defined via metadata.viewport to avoid duplicates */}
        {/* Add mobile-specific meta tags for better scrolling */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        {/* YouTube Embed Handler */}
        {/* YouTube embeds are now handled natively with iframe - no custom JavaScript needed */}
        {/* Preconnect to Vimeo for faster video loading */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
        {/* Preconnect to YouTube for faster video loading */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      {/* You can also apply inter.className directly to body if preferred,
        but applying to html covers the entire document.
        The existing font-sans class from Tailwind will then use this font
        if tailwind.config.ts is updated accordingly.
    */}
      <body className="m-0 p-0 w-full min-h-screen font-sans antialiased">
        <GlobalSchemaGraph />
        <ScrollManager />
        <HotjarScript />
        <ErrorTracker />
        <MCPHealthMonitor />
        <PerformanceMonitor />
        <SentryContextProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </Suspense>
        </SentryContextProvider>
      </body>
    </html>
  )
}
