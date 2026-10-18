import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { receptionist, solutionPath, solutions, type Lang } from "@/lib/solutions";
import { BottomCta, COPY, Eyebrow, PriceBlock } from "./shared";
import OverviewBento from "./bento/overview-bento";

const HERO = {
  nl: {
    eyebrow: "Oplossingen",
    title: "Welk werk kost je team de meeste tijd?",
    text: "Kies het probleem dat je herkent. Elke oplossing bouwen we op maat, op jouw systemen en met jouw eigen voorbeelden.",
    devTitle: "Voor developers: Claude Code harness setup",
    devText: "Een Claude Code-setup in je eigen repo, met hooks, geheugen en checks. Een aparte dienst.",
    nav: [
      { name: "Oplossingen", href: "#oplossingen" },
      { name: "Prijs", href: "#prijs" },
    ],
  },
  en: {
    eyebrow: "Solutions",
    title: "What work takes up most of your team’s time?",
    text: "Pick the problem you recognise. We build each solution to order, on your systems and with your own examples.",
    devTitle: "For developers: Claude Code harness setup",
    devText: "A Claude Code setup in your own repo, with hooks, memory and checks. A separate service.",
    nav: [
      { name: "Solutions", href: "#oplossingen" },
      { name: "Price", href: "#prijs" },
    ],
  },
};

export default function OverviewPage({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const h = HERO[lang];
  const url = `${siteConfig.url}${solutionPath(lang)}`;
  const r = receptionist[lang];

  const tiles = [
    ...solutions[lang].map((s) => ({ key: s.slug, name: s.name, teaser: s.teaser, href: solutionPath(lang, s.slug) })),
    { key: "ai-receptionist", name: r.name, teaser: r.teaser, href: r.href },
  ];

  const listData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: h.eyebrow,
    url,
    itemListElement: tiles.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${siteConfig.url}${t.href}`,
    })),
  };

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: c.home, item: lang === "nl" ? `${siteConfig.url}/` : `${siteConfig.url}/en/` },
      { position: 2, name: c.catalog, item: url },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-white">
        <Navbar customNavLinks={h.nav} />

        <section id="oplossingen" className="scroll-mt-16 bg-[#f5f5f7] pb-14 pt-[88px] sm:pb-20 sm:pt-28 lg:pt-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-[32px] font-bold leading-[1.05] tracking-[-0.03em] [hyphens:none] text-[#1d1d1f] sm:text-5xl lg:text-[56px]">{h.title}</h1>
            <p className="mb-5 mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6e6e73] sm:mb-8 sm:text-lg">{h.text}</p>
            <OverviewBento lang={lang} tiles={tiles} devTitle={h.devTitle} devText={h.devText} />
          </div>
        </section>

        <PriceBlock lang={lang} />
        <BottomCta lang={lang} />
        <Footer />
      </main>
    </>
  );
}
