import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, testimonialsSchema, servicesSchema } from "@/lib/schema";

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
      author: "Azeez Bayonle Abideen",
      role: "User Experience Designer @ Vloto",
      text: "I have the pleasure of working with Omar, where he has consistently demonstrated exceptional skills as a backend developer, delivering efficient, maintainable code, tackling complex problems with innovative solutions, and fostering a collaborative team environment.",
    },
    {
      author: "Cristian Arboleda",
      role: ".NET Developer",
      text: "Omar is a talented developer with a strong drive to continuously grow and improve himself. He is always willing to support his colleagues, which makes him a valuable team player.",
    },
    {
      author: "Ihor Tolkachov",
      role: "Frontend Developer",
      text: "I had the pleasure of working with Omar at Vloto B.V., where he proved to be a reliable and skilled colleague. His communication, planning, and coding abilities were evident in all our projects.",
    },
    {
      author: "Sophia Chen",
      role: "Product Manager at TechInnovate",
      text: "Working with Omar and his team at Virelio has transformed our product development workflow. Their AI solutions have automated processes that used to take days into minutes.",
    },
    {
      author: "Jan van der Meer",
      role: "CTO at Dutch E-commerce Solutions",
      text: "The shop automation system developed by Virelio has revolutionized how we manage our e-commerce operations. Omar's deep understanding of both the technical and business aspects of e-commerce allowed for a solution that seamlessly integrates with our existing platforms.",
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
        <div id={siteConfig.sections.contact.substring(1)}>
          <Contact />
        </div>
        <div id={siteConfig.sections.testimonials.substring(1)}>
          <Testimonials />
        </div>
        <Footer />
      </main>
    </>
  );
}
