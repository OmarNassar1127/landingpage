'use client';

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function VoiceAINavbar() {
  const { language } = useLanguage();
  const t = translations[language].voiceAI;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">{t.company.name}</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                {t.navbar.howItWorks}
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                {t.navbar.testimonials}
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                {t.navbar.benefits}
              </a>
              <a href="#get-started" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                {t.navbar.getStarted}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}