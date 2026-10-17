import { generateMetadata as genMeta } from "@/lib/metadata";
import { alternatesFor } from "@/lib/solutions";
import OverviewPage from "@/components/oplossingen/overview-page";

export const metadata = {
  ...genMeta({
    title: "Solutions: AI agents per problem, built to order",
    description:
      "AI agents for the work that takes up most of your team’s time: customer service, quotes, invoices, inbox, sales, planning and more. Built to order, from €1,000 one-off.",
    keywords: "AI solutions, custom AI agents, AI agent examples, AI automation for SMBs, customer service agent, quote agent, AI invoice processing",
    pathname: "/en/solutions/",
    locale: "en_US",
  }),
  alternates: alternatesFor("en"),
};

export default function Page() {
  return <OverviewPage lang="en" />;
}
