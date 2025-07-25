import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import BackgroundEffect from "@/components/layout/background";
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

const ClientWhatsAppButton = dynamic(
  () => import('@/components/ui/client-whatsapp-button').then(mod => mod.ClientWhatsAppButton),
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
  title: "Virelio - Innovative Solutions for Modern Challenges",
  description:
    "At Virelio, we specialize in AI Solutions, SaaS platforms, KYC integrations, Web Development, E-commerce Automation and Custom AI Services to help businesses thrive in the digital age.",
  keywords:
    "AI Solutions, SaaS platforms, Virelio, KYC integrations, shop automations, development, technology, services, web development, AI development, e-commerce automation, custom AI solutions",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      nl: siteConfig.url,
      en: `${siteConfig.url}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL", // Changed to Dutch primary locale
    url: siteConfig.url,
    siteName: "Virelio",
    title: "Virelio - Innovative Solutions for Modern Challenges",
    description:
      "AI Solutions, SaaS platforms, KYC integrations, Web Development, E-commerce Automation and Custom AI Services to help businesses thrive in the digital age.",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Virelio - Digital Innovation for Your Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virelio - Innovative Solutions",
    description: "Digital Innovation for Your Business",
    site: "@Virelio",
    creator: "@Virelio",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
            {children}
            {/* Hash routing for policy pages */}
            <ClientPolicyRoutes />
            {/* WhatsApp button */}
            <ClientWhatsAppButton />
            {/* Cookie consent banner */}
            <ClientCookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
