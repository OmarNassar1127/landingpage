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
