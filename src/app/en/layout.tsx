import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Virelio — Custom AI Agents for Businesses",
  description:
    "Virelio builds AI agents that collaborate, delegate and execute. From customer service to sales automation — live in 2 weeks. Based in Amsterdam.",
  keywords:
    "AI agents, digital employees, AI automation, customer service bot, sales automation, Amsterdam, Netherlands, Virelio",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      nl: siteConfig.url,
      en: `${siteConfig.url}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/en`,
    siteName: "Virelio",
    title: "Virelio — Custom AI Agents for Businesses",
    description:
      "AI agents that collaborate, delegate and execute. From customer service to sales automation — live in 2 weeks.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Virelio — Custom AI Agents for Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virelio — Custom AI Agents",
    description: "AI agents that collaborate, delegate and execute — live in 2 weeks.",
    site: "@Virelio",
    creator: "@Virelio",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
