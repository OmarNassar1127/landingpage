import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CaseStudies from "@/components/sections/case-studies";
import WhyVirelio from "@/components/sections/why-virelio";
import Certifications from "@/components/sections/certifications";
import Services from "@/components/sections/services";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";
import FloatingWhatsAppButton from "@/components/floating-whatsapp-button";
import IntakeExplanationSection from "@/components/sections/intake-explanation-section";
import GuaranteeSection from "@/components/sections/guarantee-section";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, servicesSchema, workshopSchema, certificationsSchema } from "@/lib/schema";

// FAQ data for the landing page (English version)
const faqData = {
  items: [
    {
      question: "What does Virelio do?",
      answer:
        "Virelio is an AI agent development company based in Amsterdam. We build custom AI agents including WhatsApp AI agents, voice agents, customer service agents, sales agents, knowledge base agents (RAG), compliance agents, and more. 25 specialized agents available, custom-built for your processes.",
    },
    {
      question: "How fast can you deliver?",
      answer:
        "Most custom AI agents are live within 1 week. We work in short sprints: intake, prototype, feedback, launch. No month-long timelines.",
    },
    {
      question: "Do you offer on-premise AI solutions?",
      answer:
        "Yes. We offer both cloud and on-premise AI deployments. Your data never leaves your servers if preferred. Fully GDPR compliant with EU data processing.",
    },
    {
      question: "What AI technologies do you use?",
      answer:
        "We work with OpenAI, Anthropic Claude, Google Gemini and custom fine-tuned models. For knowledge bases we use RAG (Retrieval Augmented Generation) with vector databases. We integrate with existing systems like HubSpot, Zendesk, Shopify and Exact Online.",
    },
    {
      question: "Where is Virelio based?",
      answer:
        "Virelio is based in Amsterdam, Netherlands. We work with clients across Europe, both remote and on-site.",
    },
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "Custom AI Agents for Business: Your Digital Team",
  description:
    "Virelio builds AI agents that collaborate, delegate and execute. From customer service to sales automation, live in 1 week. Based in Amsterdam.",
  keywords:
    "custom AI agents, AI agent development company, digital employees, AI automation agency, customer service AI agent, sales automation agent, voice agent, AI phone agent, build AI agents for business, RAG development, retrieval augmented generation, LLM integration, AI chatbot development, WhatsApp AI agent for business, knowledge base AI, RAG system, invoice automation, contract review AI, on-premise AI solutions, AI for SMB, custom agents for clients, AI onboarding agent, compliance agent, lead qualification agent, churn prediction AI, business process automation, Virelio, Amsterdam, Netherlands, Europe",
  pathname: "/en",
  locale: "en",
  imageUrl: "/og-image.png",
  imageAlt: "Virelio: custom AI agents for businesses",
});

export default function EnglishHome() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={workshopSchema()} />
      <JsonLd data={certificationsSchema()} />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <GuaranteeSection />
        <Services />
        <CaseStudies />
        <WhyVirelio />
        <Certifications />
        <Testimonials />
        <IntakeExplanationSection />


        <Footer />
        <FloatingWhatsAppButton />
      </main>
    </>
  );
}
