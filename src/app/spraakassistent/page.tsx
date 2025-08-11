import { Metadata } from "next";
import VoiceAIPage from "@/components/voice-ai/VoiceAIPage";

export const metadata: Metadata = {
  title: "Spraakassistent - Virelio Voice AI",
  description: "Stem AI die daadwerkelijk werkt. Jouw bedrijf neemt niet op wanneer klanten je nodig hebben. Virelio doet dat wel. 24/7. Binnen 2 beltonen. Elke keer.",
  keywords: "spraakassistent, stem AI, voice AI, automatisering, klantenservice, 24/7, Nederland",
  alternates: {
    canonical: "/spraakassistent",
    languages: {
      nl: "/spraakassistent",
      en: "/voiceassistant",
    },
  },
  openGraph: {
    title: "Spraakassistent - Virelio Voice AI",
    description: "Stem AI die daadwerkelijk werkt. 24/7 beschikbaarheid voor jouw klanten.",
    url: "/spraakassistent",
    locale: "nl_NL",
  },
  twitter: {
    title: "Spraakassistent - Virelio Voice AI",
    description: "Stem AI die daadwerkelijk werkt. 24/7 beschikbaarheid voor jouw klanten.",
  },
};

export default function SpraakassistentPage() {
  return <VoiceAIPage lang="nl" />;
}