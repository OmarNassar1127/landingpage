'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState<string>(siteConfig.locale);
  
  // Set current language on component mount
  useEffect(() => {
    if (pathname && pathname.startsWith('/en')) {
      setCurrentLang('en');
    } else {
      setCurrentLang('nl');
    }
  }, [pathname]);
  
  // Get the URL for each language
  const getDutchUrl = () => {
    // If currently on English page, go to Dutch homepage
    if (pathname && pathname.startsWith('/en')) {
      return '/';
    }
    // Already on Dutch page
    return pathname || '/';
  };

  const getEnglishUrl = () => {
    // If on Dutch homepage, go to English homepage
    if (pathname === '/') {
      return '/en';
    }
    // If on another Dutch page, convert to English equivalent
    if (pathname && !pathname.startsWith('/en')) {
      return `/en${pathname}`;
    }
    // Already on English page
    return pathname || '/en';
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={getDutchUrl()}
        className={`px-2 py-1 rounded ${currentLang === 'nl' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setCurrentLang('nl')}
      >
        NL
      </Link>
      <Link
        href={getEnglishUrl()}
        className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setCurrentLang('en')}
      >
        EN
      </Link>
    </div>
  );
}
