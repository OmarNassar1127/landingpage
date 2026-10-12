import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PrivacyPolicy from "@/components/policies/privacy-policy";

export const metadata: Metadata = generateMetadata({
  title: "Privacyverklaring en gegevensbescherming",
  description:
    "Lees welke persoonsgegevens Virelio verwerkt, waarom en hoe lang, met welke partijen wij werken en welke rechten u heeft onder de AVG.",
  keywords: "privacyverklaring, AVG, gegevensbescherming, persoonsgegevens, Virelio",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <PrivacyPolicy showBackLink={false} />
      </main>
      <Footer />
    </>
  );
}
