import { generateMetadata as genMeta } from "@/lib/metadata";
import { alternatesFor } from "@/lib/solutions";
import OverviewPage from "@/components/oplossingen/overview-page";

export const metadata = {
  ...genMeta({
    title: "Oplossingen: AI agents per probleem, op maat gebouwd",
    description:
      "AI agents voor het werk dat je team de meeste tijd kost: klantenservice, offertes, facturen, inbox, sales, planning en meer. Op maat gebouwd, vanaf €1.000 eenmalig.",
    keywords: "AI oplossingen, AI agents op maat, AI agent voorbeelden, AI automatisering MKB, klantenservice agent, offerte agent, factuurverwerking AI",
    pathname: "/oplossingen/",
    locale: "nl_NL",
  }),
  alternates: alternatesFor("nl"),
};

export default function Page() {
  return <OverviewPage lang="nl" />;
}
