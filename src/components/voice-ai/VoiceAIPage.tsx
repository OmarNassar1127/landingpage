'use client';

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { translations } from "@/lib/i18n/translations";
import VoiceAINavbar from "./layout/Navbar";
import VoiceAIFooter from "./layout/Footer";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import SolutionSection from "./sections/SolutionSection";
import SocialProofSection from "./sections/SocialProofSection";
import BenefitsSection from "./sections/BenefitsSection";
import CTASection from "./sections/CTASection";
import VoiceAIStructuredData from "./VoiceAIStructuredData";
import "./voice-ai.css";

interface VoiceAIPageProps {
  lang: 'nl' | 'en';
}

export default function VoiceAIPage({ lang }: VoiceAIPageProps) {
  // Don't use switchLanguage to avoid /en prefix issues
  // Just use the lang prop directly
  const t = translations[lang].voiceAI;

  return (
    <>
      <VoiceAIStructuredData lang={lang} />
      <div className="voice-ai-page min-h-screen bg-white font-sans antialiased">
        <VoiceAINavbar currentLang={lang} />
        <main>
          <HeroSection currentLang={lang} />
          <ProblemSection currentLang={lang} />
          <SolutionSection currentLang={lang} />
          <SocialProofSection currentLang={lang} />
          <BenefitsSection currentLang={lang} />
          <CTASection currentLang={lang} />
        </main>
        <VoiceAIFooter currentLang={lang} />
      </div>
    </>
  );
}