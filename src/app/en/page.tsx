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

// FAQ data for the landing page (English version)
const faqData = {
  items: [
    {
      question: "What does Virelio do?",
      answer:
        "Virelio builds custom AI agent teams for businesses. Our agents handle customer service, sales, operations and knowledge management — 24/7, in your brand's voice.",
    },
    {
      question: "How fast can you deliver?",
      answer:
        "Most AI agents are live within 2 weeks. We work in short sprints: intake, prototype, feedback, launch.",
    },
    {
      question: "Where is Virelio based?",
      answer:
        "Virelio is based in Amsterdam, Netherlands, but we work with clients across Europe.",
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
    "AI agents, digital employees, AI automation, customer service bot, sales automation, Amsterdam, Netherlands, Virelio",
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
