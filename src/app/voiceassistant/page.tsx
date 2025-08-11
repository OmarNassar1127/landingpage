import { Metadata } from "next";
import VoiceAIPage from "@/components/voice-ai/VoiceAIPage";

export const metadata: Metadata = {
  title: "AI Voice Assistant for Business | 24/7 Call Automation | Virelio",
  description: "Reduce call volume by 87% with enterprise-grade AI voice assistant. Answers in 2 rings, 24/7 availability. No setup fees. Trusted by 100+ companies. Start free trial today.",
  keywords: "voice assistant, AI voice, voice AI, business phone automation, virtual assistant, enterprise voice solutions, call automation, AI customer service, voice bot, conversational AI, phone automation, business AI assistant, 24/7 availability, AI receptionist, automated phone system, natural language processing, NLP, speech recognition, voice recognition, phone bot, virtual receptionist, AI call center, voice automation, digital assistant, artificial intelligence phone, AI for business, SMB automation, enterprise voice AI, SaaS telephony, cloud phone system, VoIP AI, telecommunications AI, customer service automation, AI solutions, voice technology, Virelio, Amsterdam AI company, Netherlands tech, European AI, call handling, inbound call automation, outbound calling AI, voice response system, IVR replacement, intelligent voice response, contact center AI, customer experience automation, CX automation, voice analytics, sentiment analysis, multilingual voice AI, omnichannel support, API integration, CRM integration, real-time transcription, voice to text, automated scheduling, appointment booking AI",
  alternates: {
    canonical: "https://nexbuy.com/voiceassistant",
    languages: {
      nl: "/spraakassistent",
      en: "/voiceassistant",
    },
  },
  openGraph: {
    title: "AI Voice Assistant for Business | 24/7 Automation | Virelio",
    description: "Reduce call volume by 87%. Enterprise AI voice assistant that answers in 2 rings, 24/7. No setup fees. Start today.",
    url: "/voiceassistant",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Virelio AI Voice Assistant - Automate Customer Calls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Assistant | 24/7 Business Calls | Virelio",
    description: "Reduce call volume by 87% with enterprise AI. Answers in 2 rings, 24/7 availability. Start free.",
    images: ["/images/logo.png"],
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