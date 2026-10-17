import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CALENDLY } from "@/components/diensten/agent-bouwen/pricing";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { getSolution, receptionist, solutionPath, type Lang, type Solution } from "@/lib/solutions";
import { BottomCta, COPY, Eyebrow, OpenDoor, PriceBlock, btnPrimary, btnSecondary, card } from "./shared";

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

        {/* Hero */}
        <section className="pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
              <a href={solutionPath(lang)} className="transition-colors hover:text-primary">
                {c.catalog}
              </a>
              <span className="mx-2 text-zinc-300">/</span>
              <span className="text-zinc-900">{s.name}</span>
            </nav>
            <Eyebrow>{s.name}</Eyebrow>
            <h1 className="mb-6 text-[32px] font-bold leading-[1.12] tracking-tight [hyphens:none] text-zinc-900 sm:text-5xl sm:leading-[1.08]">{s.pain}</h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">{s.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                {c.intake}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:info@virelio.nl" className={btnSecondary}>
                {c.ask}
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="hoe-het-werkt" className="border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <Eyebrow>{c.howTitle}</Eyebrow>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-zinc-900 sm:mb-14 sm:text-4xl">
              {lang === "nl" ? "In drie stappen" : "In three steps"}
            </h2>
            <ol className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {s.steps.map((step, i) => (
                <li key={step.title} className={`relative p-5 sm:p-6 ${card}`}>
                  <span className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-primary" style={{ opacity: 0.35 + i * 0.3 }} aria-hidden="true" />
                  <span className="mb-4 block text-sm font-bold tabular-nums text-primary">0{i + 1}</span>
                  <h3 className="mb-1.5 text-[15px] font-semibold text-zinc-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What you get */}
        <section id="wat-je-krijgt" className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <Eyebrow>{c.getsTitle}</Eyebrow>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-zinc-900 sm:mb-14 sm:text-4xl">
              {lang === "nl" ? `Dit staat er bij oplevering` : `What is in place at handover`}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {s.gets.map((g) => (
                <li key={g} className={`flex items-start gap-3 px-5 py-4 text-[15px] text-zinc-700 ${card}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PriceBlock lang={lang} />

        {/* Open door + related */}
        <section className="border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <OpenDoor lang={lang} />

            <h2 className="mb-6 mt-14 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">{c.alsoTitle}</h2>
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
