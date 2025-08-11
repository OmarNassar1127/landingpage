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
import "./voice-ai.css";

interface VoiceAIPageProps {
  lang: 'nl' | 'en';
}

export default function VoiceAIPage({ lang }: VoiceAIPageProps) {
  const { switchLanguage } = useLanguage();
  
  // Set the language for this page
  React.useEffect(() => {
    switchLanguage(lang);
  }, [lang, switchLanguage]);

  const t = translations[lang].voiceAI;

  return (
    <div className="voice-ai-page min-h-screen bg-white font-sans antialiased">
      <VoiceAINavbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <VoiceAIFooter />
    </div>
  );
}