import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { HARNESS_URL, receptionist, solutionPath, solutions, type Lang } from "@/lib/solutions";
import SolutionIllustration from "./illustrations";
import Hero3D from "@/components/three/hero-3d";
import { has3D } from "@/components/three/registry";
import { BottomCta, COPY, Eyebrow, OpenDoor, PriceBlock, card } from "./shared";

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

        <Hero3D slug="overview" label={h.eyebrow} tall={false}>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mb-4 text-[32px] font-bold leading-[1.06] tracking-tight [hyphens:none] text-zinc-900 sm:mb-5 sm:text-5xl lg:text-[56px]">{h.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">{h.text}</p>
        </Hero3D>

        <section id="oplossingen" className="border-t border-black/[0.07] bg-zinc-50/60 py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {tiles.map((t) => (
                <li key={t.key}>
                  <a href={t.href} className={`group flex h-full flex-col p-4 transition-colors hover:border-primary/40 sm:p-5 ${card}`}>
                    <div className="mb-4 overflow-hidden rounded-xl border border-black/[0.06] transition-colors group-hover:border-primary/25">
                      {has3D(t.key) ? (
                        <img src={`/3d/${t.key}-1.webp`} alt="" width={900} height={900} loading="lazy" decoding="async" className="aspect-[4/3] w-full bg-white object-contain" />
                      ) : (
                        <SolutionIllustration slug={t.key} lang={lang} still />
                      )}
                    </div>
                    <h2 className="mb-1.5 text-base font-semibold text-zinc-900 group-hover:text-primary">{t.name}</h2>
                    <p className="flex-1 text-sm leading-relaxed text-zinc-500">{t.teaser}</p>
                    <span className="mt-3 flex items-center justify-between text-sm sm:mt-4">
                      <span className="text-zinc-400">{c.from}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-primary">
                        {c.view}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={HARNESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-dashed border-black/[0.15] bg-white/60 p-5 transition-colors hover:border-primary/40 sm:p-6"
                >
                  <Code2 className="mb-3 h-5 w-5 text-primary" />
                  <h2 className="mb-1.5 text-base font-semibold text-zinc-900 group-hover:text-primary">{h.devTitle}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-zinc-500">{h.devText}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    harness.omardev.xyz
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <OpenDoor lang={lang} />
            </div>
          </div>
        </section>

        <PriceBlock lang={lang} />
        <BottomCta lang={lang} />
        <Footer />
      </main>
    </>
  );
}
