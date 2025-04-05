import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import BackgroundEffect from "@/components/layout/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexBuy - Innovative Solutions for Modern Challenges",
  description: "At NexBuy, we specialize in AI Solutions, SaaS platforms, KYC integrations, and Shop Automations to help businesses thrive in the digital age.",
  keywords: "AI Solutions, SaaS platforms, Quotum, KYC integrations, shop automations, development, technology",
  metadataBase: new URL('https://nexbuy.com'), // ToDo::Replace with actual domain
  alternates: {
    canonical: 'https://nexbuy.com', // ToDo::Replace with actual domain
    languages: {
      'en': 'https://nexbuy.com', // ToDo::Replace with actual domain
      'nl': 'https://nexbuy.com?lang=nl', // ToDo::Replace with actual domain
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexbuy.com', // ToDo::Replace with actual domain
    siteName: 'NexBuy',
    title: 'NexBuy - Innovative Solutions for Modern Challenges',
    description: 'AI Solutions, SaaS platforms, KYC integrations, and shop automations to help businesses thrive in the digital age.',
    images: [
      {
        url: 'https://nexbuy.com/og-image.jpg', // ToDo::Replace with actual domain
        width: 1200,
        height: 630,
        alt: 'NexBuy - Digital Innovation for Your Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexBuy - Innovative Solutions',
    description: 'Digital Innovation for Your Business',
    site: '@nexbuy',
    creator: '@nexbuy',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'manifest', url: '/manifest.json' },
    ],
  },
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NexBuy',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundEffect />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
