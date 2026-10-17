export type Lang = "nl" | "en";

export type Solution = {
  slug: string;
  name: string;
  /** Meta title, without the " | Virelio" suffix. */
  title: string;
  description: string;
  keywords: string;
  /** Hero headline: the pain in the customer's own words. */
  pain: string;
  /** One short line for the catalog tile. */
  teaser: string;
  intro: string;
  steps: { title: string; text: string }[];
  gets: string[];
  /** Slugs of related solutions. "ai-receptionist" points to the voice assistant page. */
  related: string[];
  /** Related existing service page. */
  service: { name: string; href: string };
};
