import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import TermsOfService from "@/components/policies/terms-of-service";

export const metadata: Metadata = generateMetadata({
  title: "Algemene voorwaarden voor AI-diensten",
  description:
    "De algemene voorwaarden van Virelio voor AI agents en automatiseringen: prijzen, verbruikskosten, oplevering, geld-terug-garantie en aansprakelijkheid.",
  keywords: "algemene voorwaarden, voorwaarden AI bureau, geld-terug-garantie, aansprakelijkheid, Virelio",
  pathname: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <TermsOfService showBackLink={false} />
      </main>
      <Footer />
    </>
  );
}
