import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import ZzpHero from "@/components/sections/zzp/zzp-hero";
import ZzpProfiles from "@/components/sections/zzp/zzp-profiles";
import ZzpContact from "@/components/sections/zzp/zzp-contact";
import ZzpFooter from "@/components/sections/zzp/zzp-footer";

// FAQ data specific to ZZP services
const zzpFaqData = {
  items: [
    {
      question: "Wat voor projecten nemen jullie aan als ZZP'ers?",
      answer:
        "We specialiseren ons in backend development, AI-integraties, web applicaties, e-commerce automatisering en blockchain projecten. Van kleine websites tot complexe enterprise systemen.",
    },
    {
      question: "Wat zijn jullie tarieven?",
      answer:
        "Onze tarieven zijn afhankelijk van de complexiteit van het project en de tijdslijn. We bieden concurrerende uurtarieven en vaste projectprijzen. Neem contact op voor een offerte op maat.",
    },
    {
      question: "Hoe snel kunnen jullie starten met een project?",
      answer:
        "Voor urgent projecten kunnen we binnen 1-2 werkdagen starten. Voor complexere projecten plannen we meestal 1-2 weken vooruit om een goede voorbereiding te garanderen.",
    },
    {
      question: "Werken jullie remote of on-site?",
      answer:
        "We werken voornamelijk remote, maar voor projecten in de regio Amsterdam kunnen we ook on-site werken. We gebruiken moderne samenwerkingstools voor effectieve communicatie.",
    },
    {
      question: "Bieden jullie ondersteuning na oplevering?",
      answer:
        "Ja, we bieden altijd een garantieperiode en kunnen doorlopende ondersteuning en maintenance contracten aanbieden voor langetermijn partnerships.",
    },
  ],
};

// Team schema for Omar & Robin
function zzpTeamSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Virelio ZZP Team",
    description:
      "Freelance development team gespecialiseerd in software development, AI-integraties, data-analyse en business intelligence.",
    url: "https://virelio.nl/zzp",
    member: [
      {
        "@type": "Person",
        name: "Omar Nassar",
        jobTitle: "Backend Developer & AI Specialist",
        knowsAbout: [
          "PHP",
          "Laravel",
          "Python",
          "AI",
          "Machine Learning",
          "Medical Device Automation",
        ],
      },
      {
        "@type": "Person",
        name: "Robin Bril",
        jobTitle: "Business Analyst & Data Specialist",
        knowsAbout: [
          "SQL",
          "Python",
          "Business Intelligence",
          "Data Analysis",
          "Tableau",
          "Power BI",
          "Process Optimization",
        ],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
  };
}

// ZZP-specific structured data
function zzpPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Omar Nassar",
    jobTitle: "Freelance Backend Developer & AI Specialist",
    url: "https://virelio.nl/zzp",
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
      "Ervaren ZZP backend developer gespecialiseerd in PHP/Laravel, Python, AI-integraties en machine learning technologieën.",
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
      "Business Intelligence",
      "Data Analysis",
      "SQL Database Management",
      "Process Optimization",
      "Dashboard Development",
      "BigQuery",
      "Tableau",
      "Power BI",
      "Lean Six Sigma",
      "Project Management",
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

function zzpServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Virelio ZZP Software Development Services",
    description:
      "Virelio ZZP: Freelance software development services gespecialiseerd in backend development, AI-integraties en web applicaties.",
    url: "https://virelio.nl/zzp",
    provider: {
      "@type": "Person",
      name: "Omar Nassar",
      url: "https://virelio.nl/zzp",
    },
    areaServed: {
      "@type": "Place",
      name: "Nederland",
    },
    serviceType: "Software Development",
    offers: [
      {
        "@type": "Offer",
        name: "Backend Development",
        description: "PHP/Laravel en Python backend ontwikkeling",
      },
      {
        "@type": "Offer",
        name: "AI Integration",
        description: "AI en machine learning integraties",
      },
      {
        "@type": "Offer",
        name: "Web Development",
        description: "Full-stack web applicatie ontwikkeling",
      },
      {
        "@type": "Offer",
        name: "E-commerce Automation",
        description: "Automatisering van e-commerce processen",
      },
    ],
  };
}

export const metadata: Metadata = generateMetadata({
  title: "Virelio ZZP - Expert Freelance Developers Omar & Robin Nederland",
  description:
    "Virelio ZZP: Omar (Backend/AI Developer) en Robin (Business Analyst/Data Specialist) bieden freelance software development, data-analyse, AI-integraties en business intelligence services in Nederland.",
  keywords:
    "Virelio ZZP, ZZP developer, freelance programmeur Nederland, ZZP software ontwikkelaar, freelance backend developer, AI developer ZZP, PHP Laravel freelancer, Python developer ZZP, Amsterdam freelance developer, Virelio freelance, business analyst ZZP, data analist freelance, BI developer ZZP, SQL specialist freelance, machine learning developer, automatisering specialist, proces optimalisatie consultant, dashboard developer, data scientist ZZP, freelance consultant, ZZP ICT, IT freelancer Amsterdam, web developer ZZP, app developer freelance, API developer, database specialist, e-commerce developer, medische software ontwikkelaar, healthcare IT specialist, fintech developer, scraping specialist, data mining expert, business intelligence consultant, lean six sigma consultant, project manager ZZP, technical consultant, software architect freelance",
  pathname: "/zzp",
});

export default function ZzpPage() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(zzpFaqData)} />
      <JsonLd data={zzpTeamSchema()} />
      <JsonLd data={zzpPersonSchema()} />
      <JsonLd data={zzpServiceSchema()} />

      <main className="min-h-screen relative">
        {/* Global grid background for entire page */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 pointer-events-none z-0" />
        
        <div className="relative z-10">
          <ZzpHero />
          <ZzpProfiles />
          <ZzpContact />
          <ZzpFooter />
        </div>
      </main>
    </>
  );
}
