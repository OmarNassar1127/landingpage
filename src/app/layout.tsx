import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import BackgroundEffect from "@/components/layout/background";
import GridBackground from "@/components/layout/grid-background";
import JsonLd from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import dynamic from 'next/dynamic';
import GoogleAnalytics from "@/components/seo/google-analytics";

// Using Inter font with configuration to mimic Apple's typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Import client components with no SSR
const ClientPolicyRoutes = dynamic(
  () => import('@/components/hash-router/client-policy-routes'),
  { ssr: false }
);


const ClientCookieConsent = dynamic(
  () => import('@/components/ui/client-cookie-consent').then(mod => mod.ClientCookieConsent),
  { ssr: false }
);

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: {
    default: "Virelio — AI Agents op Maat | Amsterdam",
    template: "%s | Virelio"
  },
  description:
    "Virelio bouwt AI-agents die samenwerken, delegeren en uitvoeren. Van klantenservice tot sales automatisering — live in 2 weken. Gevestigd in Amsterdam.",
  keywords:
    "Virelio, AI agents, digitale medewerkers, AI automatisering, klantenservice bot, sales automatisering, Amsterdam, Nederland, custom AI agents, zakelijke AI",
  authors: [{ name: "Virelio Team" }],
  creator: "Virelio",
  publisher: "Virelio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "nl-NL": siteConfig.url,
      "en-US": `${siteConfig.url}/en`,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: "Virelio — AI Agents op Maat",
    title: "Virelio — AI Agents op Maat | Amsterdam",
    description:
      "Virelio bouwt AI-agents die samenwerken, delegeren en uitvoeren. Van klantenservice tot sales automatisering — live in 2 weken.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Virelio - Digital Innovation for Your Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virelio - AI Spraakassistent & Software Solutions",
    description: "200+ automatiseringen. AI telefonie die 87% gesprekken automatiseert. Voor MKB & Enterprise.",
    site: "@Virelio",
    creator: "@Virelio",
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: 'technology',
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { rel: "manifest", url: "/manifest.json" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Virelio",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundEffect />
            {/* <GridBackground /> */}
            {children}
            {/* Hash routing for policy pages */}
            <ClientPolicyRoutes />

            {/* Cookie consent banner */}
            <ClientCookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
