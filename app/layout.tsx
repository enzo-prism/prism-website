import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistPixelGrid, GeistPixelSquare } from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"
import Script from "next/script"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"
// Import the schema components
import { GlobalSchemaGraph } from "@/components/schema-markup"
import RuntimeClientShell from "@/components/runtime-client-shell"
import SkipToContent from "@/components/skip-to-content"
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, IS_ANALYTICS_ENABLED } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Prism",
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
    <html
      lang="en"
      className={`m-0 p-0 w-full dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable}`}
      suppressHydrationWarning
    >
      <head>
        {IS_ANALYTICS_ENABLED && (
          <>
            {/* Google tag (gtag.js) */}
            <Script
              id="ga-loader"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="ga-config"
              strategy="lazyOnload"
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
        {process.env.NODE_ENV === "production" && (
          <Script id="hotjar-loader" strategy="lazyOnload">
            {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3698826,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>
        )}
        {/* viewport is defined via metadata.viewport to avoid duplicates */}
        {/* Add mobile-specific meta tags for better scrolling */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        {/* YouTube Embed Handler */}
        {/* YouTube embeds are now handled natively with iframe - no custom JavaScript needed */}
        {/* Preconnect to Cloudinary for faster image/video loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      {/* Fonts are wired via Geist CSS variables on <html>; Tailwind's `font-sans` / `font-mono`
        resolve via `--font-sans` / `--font-mono` in `app/globals.css`.
      */}
      <body className="m-0 p-0 w-full min-h-screen font-mono antialiased">
        <SkipToContent />
        <GlobalSchemaGraph />
        <RuntimeClientShell />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
