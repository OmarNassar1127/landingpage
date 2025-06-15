import { Metadata } from "next";
import WorkshopNavbar from "@/components/sections/workshop/workshop-navbar";
import Footer from "@/components/sections/footer";
import { generateMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { faqSchema, servicesSchema } from "@/lib/schema";
import WorkshopHero from "@/components/sections/workshop/workshop-hero";
import WorkshopBenefits from "@/components/sections/workshop/workshop-benefits";
import WorkshopCurriculum from "@/components/sections/workshop/workshop-curriculum";
import WorkshopAudience from "@/components/sections/workshop/workshop-audience";
import WorkshopFormats from "@/components/sections/workshop/workshop-formats";
import WorkshopTestimonials from "@/components/sections/workshop/workshop-testimonials";
import WorkshopCTA from "@/components/sections/workshop/workshop-cta";

// FAQ data specific to workshops (English version)
const workshopFaqData = {
  items: [
    {
      question: "What makes your AI workshop different from online courses?",
      answer:
        "Our workshops are completely hands-on and customized to your organization. You'll work with real tools, build actual prototypes, and leave with immediately implementable solutions tailored to your business needs.",
    },
    {
      question: "Do we need any technical background to attend?",
      answer:
        "No technical background required! Our workshops are designed for all skill levels. We adapt the content based on your team's experience and focus on practical applications rather than technical complexity.",
    },
    {
      question: "Can you conduct workshops remotely?",
      answer:
        "Yes, we offer both in-person and remote workshop options. Remote workshops include interactive breakout sessions, screen sharing for hands-on activities, and digital collaboration tools.",
    },
    {
      question: "What kind of follow-up support do you provide?",
      answer:
        "All multi-day programs include 3 months of follow-up support via email and monthly check-in calls. We're here to help you successfully implement what you've learned.",
    }
  ],
};

export const metadata: Metadata = generateMetadata({
  title: "AI Workshop for Organizations - Transform Your Business with Practical AI Training",
  description:
    "Professional AI workshops for companies and organizations. Learn practical AI implementation, build custom solutions, and transform your business processes. Available in Dutch and English.",
  keywords:
    "AI workshop, artificial intelligence training, business AI implementation, corporate AI training, AI for companies, machine learning workshop, AI strategy, digital transformation",
  pathname: "/en/workshop",
});

export default function EnglishWorkshopPage() {
  return (
    <>
      {/* Adding structured data for better SEO */}
      <JsonLd data={faqSchema(workshopFaqData)} />
      <JsonLd data={servicesSchema()} />

      <main className="min-h-screen">
        <WorkshopNavbar />
        <WorkshopHero />
        <div id="workshop-benefits">
          <WorkshopBenefits />
        </div>
        <div id="workshop-curriculum">
          <WorkshopCurriculum />
        </div>
        <div id="workshop-audience">
          <WorkshopAudience />
        </div>
        <div id="workshop-formats">
          <WorkshopFormats />
        </div>
        <div id="workshop-testimonials">
          <WorkshopTestimonials />
        </div>
        <div id="workshop-cta">
          <WorkshopCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}