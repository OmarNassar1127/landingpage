import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
// import Projects from "@/components/sections/projects";
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

// Sample FAQ data for the landing page
const faqData = {
  items: [
    {
      question: "What services does Virelio offer?",
      answer:
        "Virelio specializes in AI solutions, SaaS development, KYC integrations, and e-commerce automation to help businesses thrive in the digital age.",
    },
    {
      question: "How can Virelio help my business?",
      answer:
        "We provide innovative technology solutions tailored to your business needs, helping you improve efficiency, enhance customer experience, and drive growth in the digital marketplace.",
    },
    {
      question: "Where is Virelio located?",
      answer:
        "Virelio is based in Amsterdam, Netherlands, but we work with clients globally.",
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
  title: "Innovative Solutions for Modern Challenges",
  description:
    "We specialize in AI solutions, SaaS platforms, KYC integrations, and shop automations to help businesses thrive in the digital age.",
  keywords:
    "AI solutions, SaaS development, KYC integration, e-commerce automation, web development, technology consulting, Virelio",
  pathname: "/",
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
        {/* Projects section removed - testimonials provide social proof */}
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
