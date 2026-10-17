import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { blogPosts } from '@/lib/blog-data';
import { solutions, solutionPath, type Lang } from '@/lib/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const solutionEntries: MetadataRoute.Sitemap = (['nl', 'en'] as Lang[]).flatMap((lang) => [
    { url: `${baseUrl}${solutionPath(lang)}`, lastModified, changeFrequency: 'monthly' as const, priority: lang === 'nl' ? 0.9 : 0.7 },
    ...solutions[lang].map((s) => ({
      url: `${baseUrl}${solutionPath(lang, s.slug)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: lang === 'nl' ? 0.8 : 0.6,
    })),
  ]);

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/spraakassistent/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/voiceassistant/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diensten/ai-agent-bouwen/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diensten/digitale-medewerker/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diensten/ai-automatisering-mkb/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...solutionEntries,
    {
      url: `${baseUrl}/blog/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogPostEntries,
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
