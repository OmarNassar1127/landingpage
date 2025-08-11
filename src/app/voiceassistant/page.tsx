import { Metadata } from "next";
import VoiceAIPage from "@/components/voice-ai/VoiceAIPage";

export const metadata: Metadata = {
  title: "Voice Assistant - Virelio Voice AI",
  description: "Voice AI that actually works. Your business doesn't answer when customers need you. Virelio does. 24/7. In 2 rings. Every single time.",
  keywords: "voice assistant, voice AI, automation, customer service, 24/7, enterprise",
  alternates: {
    canonical: "/voiceassistant",
    languages: {
      nl: "/spraakassistent",
      en: "/voiceassistant",
    },
  },
  openGraph: {
    title: "Voice Assistant - Virelio Voice AI",
    description: "Voice AI that actually works. 24/7 availability for your customers.",
    url: "/voiceassistant",
    locale: "en_US",
  },
  twitter: {
    title: "Voice Assistant - Virelio Voice AI",
    description: "Voice AI that actually works. 24/7 availability for your customers.",
  },
};

export default function VoiceAssistantPage() {
  return <VoiceAIPage lang="en" />;
}