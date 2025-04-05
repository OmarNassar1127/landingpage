import React from "react";
import SEOHead from "@/components/seo/seo-head";
import { faqSchema, productSchema } from "@/lib/schema";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

/**
 * Real-world example using actual Virelio project data
 * Shows how to implement SEO for a one-page site with anchor sections using SEOHead component
 */
export default function ServicesExample() {
  // Real product schema for one of Virelio's services
  const aiSolutionSchema = productSchema({
    name: "AI Solutions | Virelio",
    description: "Custom AI solutions tailored to help businesses automate processes and gain insights from their data.",
    image: "https://virelio.nl/images/projects/ai-solutions.jpg",
    url: "https://virelio.nl/#projects",
  });

  // Real FAQ data about Virelio's services
  const servicesFaqSchema = faqSchema({
    items: [
      {
        question: "What services does Virelio offer?",
        answer: "Virelio specializes in AI solutions, SaaS development, KYC integrations, and e-commerce automation to help businesses thrive in the digital age."
      },
      {
        question: "How can your AI solutions benefit my business?",
        answer: "Our AI solutions can automate repetitive tasks, provide data-driven insights, enhance customer experiences through personalization, and optimize operations for greater efficiency and cost reduction."
      }
    ]
  });

  return (
    <>
      <SEOHead
        title="Projects"
        description="Explore Virelio's AI solutions designed to transform your business with data-driven insights and automation."
        keywords="AI solutions, machine learning, data analysis, automation, Virelio projects, business intelligence"
        canonicalPath="/#projects"
        ogType="website"
        structuredData={[aiSolutionSchema, servicesFaqSchema]}
      />

      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">AI Solutions</h1>
        <p className="mb-4">
          Our AI solutions leverage cutting-edge technology to help businesses automate processes,
          gain valuable insights from their data, and create personalized experiences for their customers.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our AI Services Include:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Predictive analytics and forecasting</li>
          <li>Natural language processing solutions</li>
          <li>Computer vision integration</li>
          <li>Machine learning model development</li>
          <li>AI-powered automation workflows</li>
        </ul>

        <div className="p-4 bg-gray-100 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-2">SEO Implementation:</h2>
          <code className="block whitespace-pre-wrap">
            {`
title: "Projects | Virelio"
description: "Explore Virelio's AI solutions designed to transform your business with data-driven insights and automation."
canonical: "https://virelio.nl/#projects"
structuredData: Product Schema + FAQ Schema
            `}
          </code>
        </div>
      </div>
      <Footer />
    </>
  );
}
