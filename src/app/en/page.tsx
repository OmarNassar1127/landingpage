import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
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
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, testimonialsSchema, servicesSchema, workshopSchema } from "@/lib/schema";

// FAQ data for the landing page (English version)
const faqData = {
  items: [
    {
      question: "What does Virelio do?",
      answer:
        "Virelio is an AI agent development company based in Amsterdam. We build custom AI agents including WhatsApp AI agents, voice agents, customer service agents, sales agents, knowledge base agents (RAG), compliance agents, and more. 24 specialized agents available, custom-built for your processes.",
    },
    {
      question: "How fast can you deliver?",
      answer:
        "Most custom AI agents are live within 2 weeks. We work in short sprints: free intake, prototype, feedback, launch. No month-long timelines.",
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
  title: "Custom AI Agents — Your Digital Team",
  description:
    "Virelio builds AI agents that collaborate, delegate and execute. From customer service to sales automation — live in 2 weeks. Based in Amsterdam.",
  keywords:
    "custom AI agents, AI agent development company, digital employees, AI automation agency, customer service AI agent, sales automation agent, voice agent, AI phone agent, build AI agents for business, RAG development, retrieval augmented generation, LLM integration, AI chatbot development, WhatsApp AI agent for business, knowledge base AI, RAG system, invoice automation, contract review AI, on-premise AI solutions, AI for SMB, custom agents for clients, AI onboarding agent, compliance agent, lead qualification agent, churn prediction AI, business process automation, Virelio, Amsterdam, Netherlands, Europe",
  pathname: "/en",
  locale: "en",
  imageUrl: "/og-image.png",
  imageAlt: "Virelio — Custom AI Agents for Businesses",
});

export default function EnglishHome() {
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
        <Certifications />
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
