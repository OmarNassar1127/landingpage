'use client';

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";

export default function VoiceAIFooter() {
  const { language } = useLanguage();
  const t = translations[language].voiceAI;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{t.company.name}</h3>
          <p className="text-gray-400 mb-8">{t.company.tagline}</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="text-sm">
              <span className="text-gray-400">Email:</span>{' '}
              <a href={`mailto:${t.contact.email}`} className="text-blue-400 hover:text-blue-300">
                {t.contact.email}
              </a>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Phone:</span>{' '}
              <a href={`tel:${t.contact.phone}`} className="text-blue-400 hover:text-blue-300">
                {t.contact.phone}
              </a>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Location:</span> {t.contact.address}
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-400">
                © 2024 {t.company.name}. {t.footer.copyright}
              </p>
              
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  {t.footer.links.privacy}
                </a>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white">
                  {t.footer.links.terms}
                </a>
                <a href="/contact" className="text-sm text-gray-400 hover:text-white">
                  {t.footer.links.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}