import Script from 'next/script';
import { voiceAIServiceSchema } from '@/lib/schema';

interface VoiceAIStructuredDataProps {
  lang: 'nl' | 'en';
}

export default function VoiceAIStructuredData({ lang }: VoiceAIStructuredDataProps) {
  const serviceSchema = lang === 'nl' ? voiceAIServiceSchema() : null;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Virelio Voice AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, Cloud",
    "description": lang === 'nl' 
      ? "AI spraakassistent voor bedrijven die 24/7 klantgesprekken automatiseert"
      : "AI voice assistant for businesses that automates customer calls 24/7",
    "url": lang === 'nl' ? "https://nexbuy.com/spraakassistent" : "https://nexbuy.com/voiceassistant",
    "provider": {
      "@type": "Organization",
      "name": "Virelio",
      "url": "https://nexbuy.com",
      "logo": "https://nexbuy.com/images/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amsterdam",
        "addressCountry": "NL"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": lang === 'nl' ? "EUR" : "USD",
      "description": lang === 'nl' ? "Gratis proefperiode, geen opstartkosten" : "Free trial, no setup fees"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": lang === 'nl' ? [
      "24/7 beschikbaarheid",
      "Beantwoordt binnen 2 beltonen",
      "87% reductie in gesprekvolume",
      "Nederlandse taalondersteuning",
      "Integratie met bestaande systemen",
      "Real-time transcriptie",
      "Natuurlijke gesprekken",
      "AI-gestuurde klantenservice"
    ] : [
      "24/7 availability",
      "Answers within 2 rings",
      "87% reduction in call volume",
      "Multi-language support",
      "Integration with existing systems",
      "Real-time transcription",
      "Natural conversations",
      "AI-powered customer service"
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": lang === 'nl' ? [
      {
        "@type": "Question",
        "name": "Wat is een AI spraakassistent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een AI spraakassistent is een geavanceerd systeem dat natuurlijke gesprekken kan voeren met klanten via de telefoon, 24/7 beschikbaar is, en routinematige vragen automatisch kan beantwoorden."
        }
      },
      {
        "@type": "Question",
        "name": "Hoeveel kost de Virelio spraakassistent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virelio biedt een gratis proefperiode zonder opstartkosten. Contacteer ons voor een op maat gemaakt prijsvoorstel gebaseerd op uw bedrijfsbehoeften."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe snel kan de AI spraakassistent geïmplementeerd worden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De implementatie duurt gemiddeld 30 dagen, waarbij we uw specifieke use cases configureren en integreren met uw bestaande systemen."
        }
      }
    ] : [
      {
        "@type": "Question",
        "name": "What is an AI voice assistant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI voice assistant is an advanced system that can conduct natural conversations with customers over the phone, available 24/7, and automatically answer routine inquiries."
        }
      },
      {
        "@type": "Question",
        "name": "How much does the Virelio voice assistant cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virelio offers a free trial with no setup fees. Contact us for a customized pricing proposal based on your business needs."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can the AI voice assistant be implemented?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Implementation typically takes 30 days, during which we configure your specific use cases and integrate with your existing systems."
        }
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://virelio.nl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === 'nl' ? "AI Spraakassistent" : "AI Voice Assistant",
        "item": lang === 'nl' ? "https://virelio.nl/spraakassistent" : "https://virelio.nl/voiceassistant"
      }
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Virelio - AI Spraakassistent",
    "description": lang === 'nl' 
      ? "Virelio levert geavanceerde AI spraakassistenten voor bedrijven in Nederland. Automatiseer klantgesprekken, verhoog efficiency."
      : "Virelio delivers advanced AI voice assistants for businesses. Automate customer calls, increase efficiency.",
    "url": "https://virelio.nl",
    "telephone": "+31-6-12345678",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amsterdam",
      "addressRegion": "Noord-Holland",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.3676",
      "longitude": "4.9041"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "€€€"
  };

  return (
    <>
      <Script
        id="voice-ai-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="voice-ai-faq-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Script
        id="voice-ai-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {lang === 'nl' && serviceSchema && (
        <Script
          id="voice-ai-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <Script
        id="voice-ai-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}