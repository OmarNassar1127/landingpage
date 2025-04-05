import React from 'react';
import Head from 'next/head';
import { siteConfig } from '@/lib/config';
import { buildLanguageAlternates } from '@/lib/utils/language-utils';

type SEOHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  structuredData?: any;
  children?: React.ReactNode;
};

/**
 * SEO Head component for use in pages where you want additional control beyond
 * the Next.js App Router metadata API. Useful for pages using the Pages Router
 * or when you need to add specific meta tags dynamically.
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  noIndex = false,
  structuredData,
  children,
}: SEOHeadProps) {
  // Format the title
  const formattedTitle = title 
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description}`;
  
  // Use provided description or fallback to site description
  const metaDescription = description || siteConfig.description;
  
  // Build canonical URL
  const canonicalUrl = canonicalPath
    ? `${siteConfig.url}${canonicalPath}`
    : siteConfig.url;
    
  // Build alternate language URLs
  const languageAlternates = buildLanguageAlternates(canonicalPath);
  
  // Format OG image URL
  const ogImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots Meta Tag */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />

      {/* Alternate Language Links */}
      {Object.entries(languageAlternates).map(([lang, url]) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={url}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Additional Head Elements */}
      {children}
    </Head>
  );
}
