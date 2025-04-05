import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  // Main landing pages and sections for both languages
  return [
    // Dutch (default) pages
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}${siteConfig.sections.projects}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${siteConfig.sections.about}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}${siteConfig.sections.contact}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    
    // Policy pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    
    // English pages
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9, // Slightly lower than main Dutch page
    },
    {
      url: `${baseUrl}/en${siteConfig.sections.projects}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en${siteConfig.sections.about}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en${siteConfig.sections.contact}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];
}
