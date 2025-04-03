import { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import CompanySlider from "@/components/sections/company-slider";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "NexBuy - Innovative Solutions for Modern Challenges",
  description: "We specialize in AI solutions, SaaS platforms, KYC integrations, and shop automations to help businesses thrive in the digital age.",
  keywords: "AI solutions, SaaS development, KYC integration, e-commerce automation, web development, technology consulting",
  openGraph: {
    title: "NexBuy - Innovative Solutions",
    description: "Innovative AI solutions, SaaS platforms, KYC integrations, and shop automations",
    url: "https://nexbuy.com",
    siteName: "NexBuy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexBuy - Innovative Solutions",
    description: "Innovative AI solutions, SaaS platforms, KYC integrations, and shop automations",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CompanySlider />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
