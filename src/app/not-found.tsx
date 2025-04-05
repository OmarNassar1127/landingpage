import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = generateMetadata({
  title: "Pagina Niet Gevonden", // Dutch for "Page Not Found"
  description: "De pagina die u zoekt kon niet worden gevonden.", // Dutch description
  noIndex: true, // Important: don't index 404 pages
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Pagina Niet Gevonden</h2>
        <p className="mb-8">De pagina die u zoekt bestaat niet of is verplaatst.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Terug naar Homepagina
        </Link>
      </main>
      <Footer />
    </>
  );
}
