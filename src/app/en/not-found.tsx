import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = generateMetadata({
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  noIndex: true, // Important: don't index 404 pages
  pathname: "/en/404",
  locale: "en", // Explicitly English
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="mb-8">The page you were looking for doesn't exist or has been moved.</p>
        <Link 
          href="/en" 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </main>
      <Footer />
    </>
  );
}
