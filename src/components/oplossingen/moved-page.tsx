/**
 * A retired solution URL. The static export cannot send a 301, so the page forwards with
 * a meta refresh (plus a script for browsers that ignore it), points its canonical at the
 * new page and asks search engines not to index it.
 */
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";

export function movedMetadata(title: string, from: string, to: string, locale: string): Metadata {
  return {
    ...genMeta({ title, pathname: from, locale, noIndex: true }),
    alternates: { canonical: `${siteConfig.url}${to}` },
  };
}

export default function MovedPage({ to, text }: { to: string; text: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(to)})` }} />
      <a href={to} className="text-primary underline underline-offset-4">
        {text}
      </a>
    </main>
  );
}
