import { ArrowRight, Check } from "lucide-react";
import { preload } from "react-dom";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { getSolution, receptionist, solutionPath, type Lang, type Solution } from "@/lib/solutions";
import { BENTOS } from "./bento/layouts-b";
import { BottomCta, COPY, Eyebrow, card } from "./shared";

function relatedTiles(lang: Lang, slugs: string[]) {
  return slugs.map((slug) => {
    if (slug === "ai-receptionist") {
      const r = receptionist[lang];
      return { key: slug, name: r.name, teaser: r.teaser, href: r.href };
    }
    const s = getSolution(lang, slug)!;
    return { key: slug, name: s.name, teaser: s.teaser, href: solutionPath(lang, slug) };
  });
}

export default function SolutionPage({ lang, solution: s }: { lang: Lang; solution: Solution }) {
  const c = COPY[lang];
  const url = `${siteConfig.url}${solutionPath(lang, s.slug)}`;

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.name,
    url,
    inLanguage: lang,
    provider: { "@type": "Organization", name: "Virelio", url: siteConfig.url },
    areaServed: { "@type": "Country", name: "Netherlands" },
    offers: [
      {
        "@type": "Offer",
        name: lang === "nl" ? "Bouw, eenmalig" : "Build, one-off",
        priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", minPrice: 1000 },
      },
      {
        "@type": "Offer",
        name: lang === "nl" ? "Onderhoud" : "Maintenance",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "EUR",
          minPrice: 99,
          unitCode: "MON",
        },
      },
    ],
  };

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: c.home, item: lang === "nl" ? `${siteConfig.url}/` : `${siteConfig.url}/en/` },
      { position: 2, name: c.catalog, item: `${siteConfig.url}${solutionPath(lang)}` },
      { position: 3, name: s.name, item: url },
    ],
  });

  const related = relatedTiles(lang, s.related);

  const Bento = BENTOS[s.slug];
  // The 3D tile's still is the largest thing on a phone: fetch it before the scripts.
  preload(`/3d/${s.slug}-0.webp`, { as: "image", fetchPriority: "high" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-white">
        <Navbar
          customNavLinks={[
            { name: c.navHow, href: "#hoe-het-werkt" },
            { name: c.navGets, href: "#wat-je-krijgt" },
            { name: c.navPrice, href: "#prijs" },
          ]}
        />

        {/* Headline, then one bento with the object, the product, the facts and the way in */}
        <section className="bg-[#f5f5f7] pb-14 pt-[88px] sm:pb-20 sm:pt-28 lg:pt-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-zinc-500 sm:block">
              <a href={solutionPath(lang)} className="transition-colors hover:text-primary">
                {c.catalog}
              </a>
              <span className="mx-2 text-zinc-300">/</span>
              <span className="text-zinc-900">{s.name}</span>
            </nav>
            <Eyebrow>{s.name}</Eyebrow>
            <h1 className="max-w-3xl text-[32px] font-bold leading-[1.05] tracking-[-0.03em] [hyphens:none] text-[#1d1d1f] sm:text-5xl lg:text-[56px]">{s.headline}</h1>
            <p className="mb-5 mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6e6e73] sm:mb-8 sm:text-lg">{s.teaser}</p>
            <Bento lang={lang} s={s} />
          </div>
        </section>

        {/* What you get */}
        <section id="wat-je-krijgt" className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <Eyebrow>{c.getsTitle}</Eyebrow>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-zinc-900 sm:mb-14 sm:text-4xl">
              {lang === "nl" ? `Dit staat er bij oplevering` : `What is in place at handover`}
            </h2>
            <p className="-mt-6 mb-8 max-w-2xl text-base leading-relaxed text-zinc-500 sm:-mt-8 sm:mb-10">{s.intro}</p>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {s.gets.map((g) => (
                <li key={g} className={`flex items-start gap-3 px-5 py-4 text-[15px] text-zinc-700 ${card}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500">
              {c.priceLadder} {c.priceNote}
            </p>
          </div>
        </section>

        {/* Open door + related */}
        <section className="border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">{c.alsoTitle}</h2>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {related.map((r) => (
                <a key={r.key} href={r.href} className={`group flex flex-col p-5 transition-colors hover:border-primary/40 sm:p-6 ${card}`}>
                  <h3 className="mb-1.5 text-[15px] font-semibold text-zinc-900 group-hover:text-primary">{r.name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-zinc-500">{r.teaser}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {c.view}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              <a href={solutionPath(lang)} className="font-medium text-primary hover:underline">
                {c.allSolutions}
              </a>
              {" · "}
              {c.seeService}{" "}
              <a href={s.service.href} className="font-medium text-primary hover:underline">
                {s.service.name}
              </a>
            </p>
          </div>
        </section>

        <BottomCta lang={lang} />
        <Footer />
      </main>
    </>
  );
}
