import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Virelio - Innovative Solutions for Modern Challenges",
  description:
    "At Virelio, we specialize in AI Solutions, SaaS platforms, KYC integrations, and Shop Automations to help businesses thrive in the digital age.",
  keywords:
    "AI Solutions, SaaS platforms, Virelio, KYC integrations, shop automations, development, technology",
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
    locale: "en_US", // English locale
    url: `${siteConfig.url}/en`,
    siteName: "Virelio",
    title: "Virelio - Innovative Solutions for Modern Challenges",
    description:
      "AI Solutions, SaaS platforms, KYC integrations, and shop automations to help businesses thrive in the digital age.",
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
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
