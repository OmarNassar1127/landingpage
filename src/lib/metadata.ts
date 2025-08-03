import { Metadata } from "next";
import { siteConfig } from "./config";

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pathname?: string;
  imageUrl?: string;
  imageAlt?: string;
  locale?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  keywords,
  pathname = "",
  imageUrl = siteConfig.ogImage,
  imageAlt = "Virelio - Digital Innovation for Your Business",
  locale = "en_US",
  type = "website",
  noIndex = false,
}: MetadataProps): Metadata {
  const url = `${siteConfig.url}${pathname}`;
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description}`;
  const metaDescription = description || siteConfig.description;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: pathname.startsWith('/en') ? url : `${siteConfig.url}/en${pathname || '/'}`,
        nl: pathname.startsWith('/en') ? `${siteConfig.url}${pathname.replace('/en', '') || '/'}` : url,
      },
    },
    openGraph: {
      type,
      locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: imageUrl.startsWith("http")
            ? imageUrl
            : `${siteConfig.url}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [
        {
          url: imageUrl.startsWith("http")
            ? imageUrl
            : `${siteConfig.url}${imageUrl}`,
          alt: imageAlt,
        },
      ],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: true,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
