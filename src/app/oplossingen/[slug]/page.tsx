import { notFound } from "next/navigation";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { alternatesFor, getSolution, solutionPath, solutions } from "@/lib/solutions";
import SolutionPage from "@/components/oplossingen/solution-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.nl.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getSolution("nl", params.slug);
  if (!s) return {};
  return {
    ...genMeta({
      title: s.title,
      description: s.description,
      keywords: s.keywords,
      pathname: solutionPath("nl", s.slug),
      locale: "nl_NL",
    }),
    alternates: alternatesFor("nl", s.slug),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = getSolution("nl", params.slug);
  if (!s) notFound();
  return <SolutionPage lang="nl" solution={s} />;
}
