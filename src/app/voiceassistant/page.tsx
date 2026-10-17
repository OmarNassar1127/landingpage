import { Metadata } from "next";
import VoiceAIPage from "@/components/voice-ai/VoiceAIPage";

export const metadata: Metadata = {
  title: "AI Voice Assistant for Business | 24/7 Call Automation | Virelio",
  description: "An AI voice assistant that answers your customer calls. Answers in 2 rings, 24/7 availability. From €1,000 one-off, maintenance from €99 a month.",
  keywords: "voice assistant, AI voice, voice AI, business phone automation, virtual assistant, enterprise voice solutions, call automation, AI customer service, voice bot, conversational AI, phone automation, business AI assistant, 24/7 availability, AI receptionist, automated phone system, natural language processing, NLP, speech recognition, voice recognition, phone bot, virtual receptionist, AI call center, voice automation, digital assistant, artificial intelligence phone, AI for business, SMB automation, enterprise voice AI, SaaS telephony, cloud phone system, VoIP AI, telecommunications AI, customer service automation, AI solutions, voice technology, Virelio, Amsterdam AI company, Netherlands tech, European AI, call handling, inbound call automation, outbound calling AI, voice response system, IVR replacement, intelligent voice response, contact center AI, customer experience automation, CX automation, voice analytics, sentiment analysis, multilingual voice AI, omnichannel support, API integration, CRM integration, real-time transcription, voice to text, automated scheduling, appointment booking AI",
  alternates: {
    canonical: "https://virelio.nl/voiceassistant",
    languages: {
      nl: "/spraakassistent",
      en: "/voiceassistant",
    },
  },
  openGraph: {
    title: "AI Voice Assistant for Business | 24/7 Automation | Virelio",
    description: "AI voice assistant that answers in 2 rings, 24/7. From €1,000 one-off. Book a free intake.",
    url: "/voiceassistant",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-voice.png",
        width: 1200,
        height: 630,
        alt: "Virelio AI Voice Assistant - Automate Customer Calls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Assistant | 24/7 Business Calls | Virelio",
    description: "AI voice assistant. Answers in 2 rings, 24/7 availability. From €1,000 one-off.",
    images: ["/og-voice.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function VoiceAssistantPage() {
  return <VoiceAIPage lang="en" />;
}