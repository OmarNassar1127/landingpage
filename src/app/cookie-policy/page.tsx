import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import CookiePolicy from "@/components/policies/cookie-policy";

export const metadata: Metadata = generateMetadata({
  title: "Cookieverklaring en uw toestemming",
  description:
    "Welke cookies virelio.nl gebruikt, waarom Google Analytics alleen met toestemming draait en hoe u uw cookiekeuze wijzigt of intrekt.",
  keywords: "cookieverklaring, cookies, Google Analytics, toestemming, Virelio",
  pathname: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CookiePolicy showBackLink={false} />
      </main>
      <Footer />
    </>
  );
}
