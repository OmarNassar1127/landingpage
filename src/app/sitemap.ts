import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  // Only include real indexable routes (no hash fragments)
  return [
    // Dutch (default) pages - main routes only
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/zzp/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/workshop/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spraakassistent/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    
    // Policy pages (with trailing slashes for consistency)
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    
    // English pages - main routes only
    {
      url: `${baseUrl}/en/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/freelancer/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/workshop/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voiceassistant/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];
}
