import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import CaseStudies from "@/components/sections/case-studies";
import WhyVirelio from "@/components/sections/why-virelio";
import Services from "@/components/sections/services";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";
import FloatingWhatsAppButton from "@/components/floating-whatsapp-button";
import IntakeExplanationSection from "@/components/sections/intake-explanation-section";
import GuaranteeSection from "@/components/sections/guarantee-section";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, testimonialsSchema, servicesSchema, workshopSchema } from "@/lib/schema";

// FAQ data for the landing page
const faqData = {
  items: [
    {
      question: "Wat doet Virelio?",
      answer:
        "Virelio is een AI-bureau in Amsterdam dat custom AI-agents bouwt voor bedrijven. Van WhatsApp AI agents en voice agents tot klantenservice agents, sales agents, kennisbank agents (RAG), compliance agents en meer. 24 gespecialiseerde agents beschikbaar, op maat gebouwd voor jouw processen.",
    },
    {
      question: "Hoe snel kunnen jullie leveren?",
      answer:
        "De meeste AI-agents zijn live binnen 2 weken. We werken in korte sprints: gratis intake, prototype, feedback, lancering. Geen maandenlange trajecten.",
    },
    {
      question: "Kunnen jullie AI on-premise draaien?",
      answer:
        "Ja. We bieden zowel cloud- als on-premise AI-oplossingen. Je data verlaat nooit je eigen servers als je dat wenst. Volledig AVG-compliant met EU-dataverwerking.",
    },
    {
      question: "Wat voor AI-technologieën gebruiken jullie?",
      answer:
        "We werken met OpenAI, Anthropic Claude, Google Gemini en custom fine-tuned modellen. Voor kennisbanken gebruiken we RAG (Retrieval Augmented Generation) met vectordatabases. We integreren met bestaande systemen zoals HubSpot, Zendesk, Shopify en Exact Online.",
    },
    {
      question: "Waar is Virelio gevestigd?",
      answer:
        "Virelio is gevestigd in Amsterdam, Nederland. We werken met klanten door heel Europa, zowel remote als on-site.",
    },
  ],
};

// Testimonials data for structured data
const testimonialsData = {
  items: [
    {
      author: "Giulio Piccolo",
      role: "Lead Engineer @ Suit Supply",
      text: "The Virelio team stood out for their rapid development and strong foundation in AI. They independently tackled complex topics and delivered valuable insights.",
    },
    {
      author: "Cristian Arboleda",
      role: ".NET Developer",
      text: "A talented team with a strong drive to grow and improve. Always supporting their clients, their greatest strength is quickly learning new domains and adapting to any process.",
    },
    {
      author: "Ihor Tolkachov",
      role: "Frontend Developer",
      text: "Working with Virelio showed their reliability and skill. Together we created an automatic fine scanner that reduced a 30-minute process to just 10 seconds.",
    },
    {
      author: "Oeds de Meer",
      role: "Process & Information Manager @ SBB",
      text: "Virelio consistently delivered sharp analyses and worked with tools like SQL, Looker, and Python. They recognize patterns in data and provide visual insights that drive better decisions.",
    },
    {
      author: "Laura Britton",
      role: "Project Manager Medical Affairs @ Sedgwick",
      text: "Dedicated, helpful and reliable. Always deliver on their promises.",
    },
  ],
};



export const metadata: Metadata = generateMetadata({
  title: "AI Agents op Maat — Jouw Digitale Team",
  description:
    "Virelio bouwt AI-agents die samenwerken, delegeren en uitvoeren. Van klantenservice tot sales automatisering — live in 2 weken. Gevestigd in Amsterdam.",
  keywords:
    "AI agents op maat, custom AI agents, digitale medewerkers, AI automatisering bedrijven, klantenservice AI agent, klantenservice automatiseren, sales automatisering, AI agent bouwen, RAG development, RAG systeem, LLM integratie, AI chatbot bouwen, WhatsApp AI agent voor bedrijven, voice agent, AI telefoon agent, AI spraakassistent zakelijk, kennisbank AI, facturatie automatiseren, AI bureau Amsterdam, on-premise AI, AI oplossingen MKB, custom agents voor klanten, AI onboarding agent, compliance agent, lead kwalificatie agent, bedrijfsprocessen automatiseren, Virelio, Nederland",
  pathname: "/",
  imageUrl: "/og-image.png",
  imageAlt: "Virelio — AI Agents op Maat voor Bedrijven",
});

export default function Home() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={testimonialsSchema(testimonialsData)} />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={workshopSchema()} />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <CompanySlider />
        <GuaranteeSection />
        <div id={siteConfig.sections.services.substring(1)}>
          <Services />
        </div>
        <CaseStudies />
        <WhyVirelio />
        <div id={siteConfig.sections.testimonials.substring(1)}>
          <Testimonials />
        </div>
        <IntakeExplanationSection />


        <Footer />
        <FloatingWhatsAppButton />
      </main>
    </>
  );
}
