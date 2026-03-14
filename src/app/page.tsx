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
        "Virelio bouwt op maat gemaakte AI-agent teams voor bedrijven. Onze agents verzorgen klantenservice, sales, operaties en kennisbeheer — 24/7, in de stem van jouw merk.",
    },
    {
      question: "Hoe snel kunnen jullie leveren?",
      answer:
        "De meeste AI-agents zijn live binnen 2 weken. We werken in korte sprints: intake, prototype, feedback, lancering.",
    },
    {
      question: "Waar is Virelio gevestigd?",
      answer:
        "Virelio is gevestigd in Amsterdam, Nederland, maar we werken met klanten door heel Europa.",
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
    "AI agents, digitale medewerkers, AI automatisering, klantenservice bot, sales automatisering, Amsterdam, Nederland, Virelio",
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
