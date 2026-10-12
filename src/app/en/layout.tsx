import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Custom AI Agents for Businesses | Virelio",
  description:
    "Virelio builds AI agents that collaborate, delegate and execute. From customer service to sales automation, live in 1 week. Based in Amsterdam.",
  keywords:
    "custom AI agents, AI agent development, digital employees, AI automation agency, RAG development, LLM integration, on-premise AI, customer service automation, sales automation, AI chatbot, WhatsApp bot, knowledge base AI, business process automation, Virelio, Amsterdam, Netherlands, Europe",
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
    title: "Custom AI Agents for Businesses | Virelio",
    description:
      "AI agents that collaborate, delegate and execute. From customer service to sales automation, live in 1 week.",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Virelio: custom AI agents for businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom AI Agents | Virelio",
    description: "AI agents that collaborate, delegate and execute. Live in 1 week.",
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
