import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import ZzpHero from "@/components/sections/zzp/zzp-hero";
import ZzpProfiles from "@/components/sections/zzp/zzp-profiles";
import ZzpContact from "@/components/sections/zzp/zzp-contact";
import ZzpFooter from "@/components/sections/zzp/zzp-footer";

// FAQ data specific to freelance services (English)
const freelancerFaqData = {
  items: [
    {
      question: "What types of projects do you take on as freelancers?",
      answer:
        "We specialize in backend development, AI integrations, web applications, e-commerce automation, and blockchain projects. From small websites to complex enterprise systems.",
    },
    {
      question: "What are your rates?",
      answer:
        "Our rates depend on project complexity and timeline. We offer competitive hourly rates and fixed project pricing. Contact us for a custom quote tailored to your needs.",
    },
    {
      question: "How quickly can you start a project?",
      answer:
        "For urgent projects, we can start within 1-2 business days. For complex projects, we typically plan 1-2 weeks ahead to ensure proper preparation and quality delivery.",
    },
    {
      question: "Do you work remotely or on-site?",
      answer:
        "We primarily work remotely but can work on-site for projects in the Amsterdam region. We use modern collaboration tools for effective communication and project management.",
    },
    {
      question: "Do you provide support after delivery?",
      answer:
        "Yes, we always provide a warranty period and can offer ongoing support and maintenance contracts for long-term partnerships and peace of mind.",
    },
  ],
};

// Freelancer-specific structured data (English version)
function freelancerPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Omar Nassar",
    jobTitle: "Freelance Backend Developer & AI Specialist",
    url: "https://virelio.nl/en/freelancer",
    sameAs: [
      "https://www.linkedin.com/in/omar-nassar-93a176155/",
      "https://github.com/omarnassar1127",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
    email: "omarnassar1127@gmail.com",
    telephone: "+31687838713",
    description:
      "Experienced freelance backend developer specializing in PHP/Laravel, Python, AI integrations, and machine learning technologies.",
    knowsAbout: [
      "PHP Development",
      "Laravel Framework",
      "Python Programming",
      "AI Integration",
      "Machine Learning",
      "API Development",
      "E-commerce Automation",
      "React Development",
      "Medical Device Automation",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amsterdam",
          addressCountry: "NL",
        },
      },
    },
  };
}

function freelancerServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Virelio Freelance Software Development Services",
    description:
      "Virelio Freelance: Professional software development services specializing in backend development, AI integrations, and web applications.",
    url: "https://virelio.nl/en/freelancer",
    provider: {
      "@type": "Person",
      name: "Omar Nassar",
      url: "https://virelio.nl/en/freelancer",
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Netherlands",
      },
      {
        "@type": "Place",
        name: "Europe",
      },
    ],
    serviceType: "Software Development",
    offers: [
      {
        "@type": "Offer",
        name: "Backend Development",
        description: "PHP/Laravel and Python backend development",
      },
      {
        "@type": "Offer",
        name: "AI Integration",
        description: "AI and machine learning integrations",
      },
      {
        "@type": "Offer",
        name: "Web Development",
        description: "Full-stack web application development",
      },
      {
        "@type": "Offer",
        name: "E-commerce Automation",
        description: "E-commerce process automation solutions",
      },
    ],
  };
}

export const metadata: Metadata = generateMetadata({
  title: "Virelio Freelance - Expert Developers Omar & Robin Netherlands",
  description:
    "Virelio Freelance: Experienced developers specializing in backend development, AI integrations, and web applications. Omar & Robin offer professional freelance software development services.",
  keywords:
    "Virelio freelance, freelance developer, freelance programmer Netherlands, freelance software developer, freelance backend developer, AI developer freelance, PHP Laravel freelancer, Python developer, Amsterdam freelance developer, business analyst freelance, data analyst contractor, BI developer freelance, SQL specialist contractor, machine learning developer, automation specialist, process optimization consultant, dashboard developer, data scientist contractor, freelance consultant, ICT contractor, IT freelancer Amsterdam, web developer contractor, app developer freelance, API developer, database specialist, e-commerce developer, medical software developer, healthcare IT specialist, fintech developer, scraping specialist, data mining expert, business intelligence consultant, lean six sigma consultant, project manager contractor, technical consultant, software architect freelance",
  pathname: "/en/freelancer",
});

export default function FreelancerPage() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(freelancerFaqData)} />
      <JsonLd data={freelancerPersonSchema()} />
      <JsonLd data={freelancerServiceSchema()} />

      <main className="min-h-screen">
        <ZzpHero isEnglish={true} />
        <ZzpProfiles isEnglish={true} />
        <ZzpContact isEnglish={true} />
        <ZzpFooter isEnglish={true} />
      </main>
    </>
  );
}
