import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import BookMeeting from "@/components/sections/book-meeting";
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
  title: "Innovative Solutions for Modern Challenges",
  description:
    "We specialize in AI solutions, SaaS platforms, KYC integrations, and shop automations to help businesses thrive in the digital age.",
  keywords:
    "AI solutions, SaaS development, KYC integration, e-commerce automation, web development, technology consulting, Virelio",
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
        <div id={siteConfig.sections.bookMeeting.substring(1)}>
          <BookMeeting />
        </div>
        <div id={siteConfig.sections.contact.substring(1)}>
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
