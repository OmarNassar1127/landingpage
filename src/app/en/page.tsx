import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import DemoVideo from "@/components/sections/demo-video";
import AutomationsShowcase from "@/components/sections/automations-showcase";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, servicesSchema } from "@/lib/schema";

// Sample FAQ data for the landing page (English version)
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

export const metadata: Metadata = generateMetadata({
  title: "200+ Automations Delivered | AI Solutions & Business Process Automation",
  description:
    "We've delivered 200+ custom AI and traditional automation solutions. Specializing in business process automation, AI-powered systems, SaaS platforms, KYC integrations, and e-commerce automation to help businesses thrive.",
  keywords:
    "business automation, AI automation, process automation, workflow automation, 200+ automations, artificial intelligence, AI solutions, SaaS development, KYC integration, e-commerce automation, web development, technology consulting, custom automation solutions, Virelio",
  pathname: "/en",
  locale: "en", // Set this explicitly for English
});

export default function EnglishHome() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={servicesSchema()} />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <CompanySlider />
        <DemoVideo />
        <AutomationsShowcase />
        <div id={siteConfig.sections.services.substring(1)}>
          <Services />
        </div>
        <div id={siteConfig.sections.projects.substring(1)}>
          <Projects />
        </div>
        <div id={siteConfig.sections.about.substring(1)}>
          <About />
        </div>
        <div id={siteConfig.sections.testimonials.substring(1)}>
          <Testimonials />
        </div>


        <Footer />
      </main>
    </>
  );
}
