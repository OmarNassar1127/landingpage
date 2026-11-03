import { siteConfig } from "@/lib/config";
import { solutionsNl, receptionistNl } from "./nl";
import { solutionsEn, receptionistEn } from "./en";
import type { Lang, Solution } from "./types";

export type { Lang, Solution };

export const solutions: Record<Lang, Solution[]> = { nl: solutionsNl, en: solutionsEn };
export const receptionist = { nl: receptionistNl, en: receptionistEn };

/** Offers we no longer sell (Omar, 2026-10-30: a free chatbot does product texts). The page stays for old blog links, but it is not listed. */
export const RETIRED = new Set(["productteksten"]);
export const listedSolutions = (lang: Lang) => solutions[lang].filter((s) => !RETIRED.has(s.slug));

export const BASE: Record<Lang, string> = { nl: "/oplossingen/", en: "/en/solutions/" };

export const HARNESS_URL = "https://harness.omardev.xyz";

export function solutionPath(lang: Lang, slug?: string) {
  return slug ? `${BASE[lang]}${slug}/` : BASE[lang];
}

export function getSolution(lang: Lang, slug: string) {
  return solutions[lang].find((s) => s.slug === slug);
}

/** Canonical plus the hreflang pair for a catalog page. */
export function alternatesFor(lang: Lang, slug?: string) {
  const nl = `${siteConfig.url}${solutionPath("nl", slug)}`;
  const en = `${siteConfig.url}${solutionPath("en", slug)}`;
  return { canonical: lang === "nl" ? nl : en, languages: { nl, en, "x-default": nl } };
}
