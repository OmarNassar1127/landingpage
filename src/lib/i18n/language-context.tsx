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
    if (savedLanguage && (savedLanguage === "nl" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
      setTranslations(translations[savedLanguage]);
    }
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(translations[lang]);
    localStorage.setItem("language", lang);
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
