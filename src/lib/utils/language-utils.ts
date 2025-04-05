import { siteConfig } from '../config';

/**
 * Builds language-specific URLs for the current page
 * Used for hreflang and alternate language tags
 */
export function buildLanguageAlternates(pathname: string) {
  const alternates: Record<string, string> = {};
  
  // For each supported language, create a URL
  Object.entries(siteConfig.alternateLanguages).forEach(([lang, baseUrl]) => {
    // Handle the homepage 
    if (pathname === '/') {
      alternates[lang] = baseUrl;
    } else {
      // For other pages, append the pathname to the base URL
      // Remove any trailing slashes from baseUrl
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      // Ensure pathname has a leading slash
      const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
      alternates[lang] = `${cleanBaseUrl}${cleanPathname}`;
    }
  });
  
  return alternates;
}

/**
 * Extracts a language from a path or query parameter
 */
export function extractLanguageFromPath(path: string): string {
  // Check if path contains language code
  const pathMatch = path.match(/^\/(en|nl)\//);
  if (pathMatch) {
    return pathMatch[1];
  }
  
  // Check for language query parameter
  const queryMatch = path.match(/[\?&]lang=(en|nl)/);
  if (queryMatch) {
    return queryMatch[1];
  }
  
  // Default to the primary language
  return siteConfig.locale;
}

/**
 * Gets a translated value for a given key and language
 * This is a simple implementation - in a real app you'd use a proper i18n system
 */
export function getTranslation(key: string, language = siteConfig.locale): string {
  const translations: Record<string, Record<string, string>> = {
    'home': {
      'en': 'Home',
      'nl': 'Thuis',
    },
    'services': {
      'en': 'Services',
      'nl': 'Diensten',
    },
    'blog': {
      'en': 'Blog',
      'nl': 'Blog',
    },
    'contact': {
      'en': 'Contact',
      'nl': 'Contact',
    },
    'about': {
      'en': 'About Us',
      'nl': 'Over Ons',
    },
    // Add more translations as needed
  };
  
  return translations[key]?.[language] || key;
}
