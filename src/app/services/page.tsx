import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = generateMetadata({
  title: "Our Services",
  description:
    "Explore Virelio's comprehensive range of services including AI Solutions, SaaS Development, KYC Integration, and E-commerce Automation.",
  keywords:
    "AI solutions, SaaS development, KYC integration, e-commerce automation, technology services, digital transformation",
  pathname: "/services",
  // You can also override the default image for this page:
  // imageUrl: "/images/services-og.jpg",
  // imageAlt: "Virelio Services Overview",
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>

        {/* Service categories would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* This is just placeholder content */}
          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">AI Solutions</h2>
            <p>Custom AI solutions tailored to your business needs.</p>
          </div>

          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">SaaS Development</h2>
            <p>Scalable SaaS platforms built with modern technologies.</p>
          </div>

          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">KYC Integration</h2>
            <p>Secure identity verification solutions for your platform.</p>
          </div>

          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              E-commerce Automation
            </h2>
            <p>
              Streamline your online store operations with advanced automation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
