import ScrollManager from "@/components/scroll-manager"
import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
// Import the schema components
import ErrorTracker from "@/components/error-tracker"
import HotjarScript from "@/components/hotjar-script"
import MCPHealthMonitor from "@/components/mcp-health-monitor"
import MobileTabBar from "@/components/mobile/MobileTabBar"
import RouteAwareStickyCTA from "@/components/mobile/RouteAwareStickyCTA"
import PerformanceMonitor from "@/components/performance-monitor"
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import SentryContextProvider from "@/components/sentry-context-provider"


export const metadata: Metadata = {
  title: {
    template: "%s | prism",
    default: "prism - beautiful software that grows revenue",
  },
  description: "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
  openGraph: {
    title: "prism - beautiful software that grows revenue",
    description:
      "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
    url: "https://prism.agency",
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
    title: "prism - beautiful software that grows revenue",
    description:
      "prism agency creates beautiful websites, apps, and designs that shatter revenue goals for ambitious businesses. ai-powered digital solutions that convert visitors into customers.",
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
  metadataBase: new URL("https://design-prism.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="m-0 p-0 w-full" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - Deferred for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            // Defer GTM loading until after initial render
            function loadGTM() {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M37LLWHV');
            }
            // Load GTM after page load or on first user interaction
            if (document.readyState === 'complete') {
              setTimeout(loadGTM, 100);
            } else {
              window.addEventListener('load', () => setTimeout(loadGTM, 100));
            }
            // Fallback: load on first user interaction
            ['scroll', 'click', 'keydown', 'touchstart'].forEach(event => {
              document.addEventListener(event, loadGTM, { once: true, passive: true });
            });
            `
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Add mobile-specific meta tags for better scrolling */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        {/* Google Analytics - Deferred for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Defer GA loading
            function loadGA() {
              if (window.gaLoaded) return;
              window.gaLoaded = true;
              
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9B141WTH4R';
              document.head.appendChild(script);
              
              script.onload = function() {
                gtag('js', new Date());
                gtag('config', 'G-9B141WTH4R');
              };
            }
            
            // Load GA after page load or on first user interaction
            if (document.readyState === 'complete') {
              setTimeout(loadGA, 200);
            } else {
              window.addEventListener('load', () => setTimeout(loadGA, 200));
            }
            // Fallback: load on first user interaction
            ['scroll', 'click', 'keydown', 'touchstart'].forEach(event => {
              document.addEventListener(event, loadGA, { once: true, passive: true });
            });
            `
          }}
        />
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
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M37LLWHV" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <ScrollManager />
        <HotjarScript />
        <ErrorTracker />
        <MCPHealthMonitor />
        <PerformanceMonitor />
        <SentryContextProvider>
          {children}
        </SentryContextProvider>
        <MobileTabBar />
        <RouteAwareStickyCTA />
      </body>
    </html>
  )
}
