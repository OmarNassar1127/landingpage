"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./translations";

type Language = "nl" | "en";
type TranslationType = typeof translations.nl;

interface LanguageContextType {
  language: Language;
  t: TranslationType;
  switchLanguage: (lang: Language) => void;
}

const defaultValue: LanguageContextType = {
  language: "nl",
  t: translations.nl,
  switchLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export function useLanguage() {
  return useContext(LanguageContext);
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("nl");
  const [translations_copy, setTranslations] = useState<TranslationType>(translations.nl);

  useEffect(() => {
    // Get the saved language preference from localStorage if available
    const savedLanguage = localStorage.getItem("language") as Language | null;
    
    // Check if URL starts with /en for English
    const urlPathname = window.location.pathname;
    const isEnglishPath = urlPathname.startsWith('/en');
    
    if (isEnglishPath) {
      // URL path takes precedence
      setLanguage("en");
      setTranslations(translations["en"]);
      localStorage.setItem("language", "en");
    } else if (savedLanguage && (savedLanguage === "nl" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
      setTranslations(translations[savedLanguage]);
    }
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(translations[lang]);
    localStorage.setItem("language", lang);
    
    // Change URL based on language
    const currentPath = window.location.pathname;
    if (lang === "en" && !currentPath.startsWith('/en')) {
      // Switch to English - add /en to path
      if (currentPath === '/') {
        window.location.pathname = '/en';
      } else {
        window.location.pathname = `/en${currentPath}`;
      }
    } else if (lang === "nl" && currentPath.startsWith('/en')) {
      // Switch to Dutch - remove /en from path
      const newPath = currentPath.replace(/^\/en/, '') || '/';
      window.location.pathname = newPath;
    }
  };

  const value = {
    language,
    t: translations_copy,
    switchLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
