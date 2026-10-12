import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ShopFloor from "@/components/diensten/mkb/shop-floor";
import RoiExample from "@/components/diensten/mkb/roi-example";
import { MAINTENANCE, SETUP_FROM, USE_CASES, WBSO, eur, roi } from "@/components/diensten/mkb/data";
import { ArrowRight, Check, ChevronDown, MessagesSquare, Package, Plus, Receipt, type LucideIcon } from "lucide-react";

export const metadata = genMeta({
  title: "Betaalbare AI-automatisering voor het MKB",
  description:
    "AI-automatisering voor het Nederlandse MKB. Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand. Live in 1 week, zonder IT-afdeling. Met hulp bij WBSO.",
  keywords:
    "AI automatisering MKB, AI voor MKB, AI agent MKB, automatisering midden klein bedrijf, betaalbare AI, WBSO subsidie AI, AI HubSpot integratie, Shopify AI automatisering, Exact Online AI, AI bureau MKB Nederland, klantenservice automatisering MKB",
  pathname: "/diensten/ai-automatisering-mkb",
  locale: "nl_NL",
});

const CALENDLY = "https://calendly.com/omarnassar1127/30min";
const [BASIS, PLUS] = MAINTENANCE;
const CARD = "rounded-[24px] border border-black/[0.07] bg-white shadow-[0_24px_48px_-36px_rgba(70,55,210,0.35)]";
const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const faqItems = [
  {
    question: "Is AI automatisering ook betaalbaar voor kleine bedrijven?",
    answer: `Ja. Een eenvoudige AI agent start vanaf ${eur(SETUP_FROM)} eenmalig. Daarna kiest u ${BASIS.name} (${eur(BASIS.price)} per maand) of ${PLUS.name} (${eur(PLUS.price)} per maand). Bespaart de agent ${eur(2000)} per maand, dan is de setup binnen de eerste maand terugverdiend. U begint klein en breidt uit zodra de besparing bewezen is.`,
  },
  {
    question: "Wat zit er in het onderhoud?",
    answer: `${BASIS.name} (${eur(BASIS.price)} per maand): hosting, monitoring, updates en support. ${PLUS.name} (${eur(PLUS.price)} per maand): alles van Basis plus maandelijkse verbeteringen en nieuwe functies.`,
  },
  {
    question: "Heb ik een IT-afdeling nodig voor AI automatisering?",
    answer:
      "Nee. Wij verzorgen de volledige implementatie, integratie en lancering. Na oplevering beheert u de agent via een eenvoudig dashboard zonder technische kennis. Heeft u een vraag of wilt u iets aanpassen? Dan belt u ons.",
  },
  {
    question: "Wat is de WBSO-subsidie en hoe werkt dat?",
    answer: `WBSO (Wet Bevordering Speur- en Ontwikkelingswerk) is een Nederlandse regeling voor bedrijven die R&D uitvoeren, inclusief AI-ontwikkeling. U ontvangt 32 tot 40% van uw R&D-loonkosten terug. Wij helpen bij de aanvraag en de documentatie. Voorbeeld: een project van ${eur(WBSO.project)} kost na 35% teruggave effectief ${eur(WBSO.effective)}.`,
  },
  {
    question: "Welke software integreert u met?",
    answer:
      "Vrijwel alle gangbare MKB-software: Exact Online, Moneybird, Twinfield (boekhouding), HubSpot, Pipedrive, Salesforce (CRM), Zendesk, Intercom (support), Shopify, WooCommerce, Bol.com (e-commerce), Slack, Teams, WhatsApp Business en meer. Heeft u een maatwerksysteem? Via een API of webhook koppelen wij ook daarop.",
  },
  {
    question: "Hoe snel zien we resultaat?",
    answer:
      "Zodra de agent live gaat, doorgaans 1 week na de intake. In de eerste maand rapporteren wij de besparing, zodat u zwart op wit ziet wat de investering oplevert.",
  },
];

const ICONS: Record<string, LucideIcon> = { klantenservice: MessagesSquare, facturatie: Receipt, orders: Package };
// asymmetric bento: wide, narrow / narrow, wide
const SPAN = ["lg:col-span-2", "", ""];

const TOOLS = ["Exact Online", "Moneybird", "HubSpot", "Shopify", "Zendesk", "WhatsApp Business", "Sendcloud", "Teams"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

export default function AIAutomatiseringMKBPage() {
  const faqSchemaData = faqSchema({ items: faqItems });
  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      { position: 3, name: "AI automatisering voor MKB", item: `${siteConfig.url}/diensten/ai-automatisering-mkb` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen overflow-x-hidden bg-white">
        <Navbar customNavLinks={[
          { name: "Toepassingen", href: "#toepassingen" },
          { name: "Rekenvoorbeeld", href: "#rekenvoorbeeld" },
          { name: "Prijzen", href: "#prijzen" },
          { name: "FAQ", href: "#faq" },
        ]} />

        {/* Hero */}
        <section className="pb-12 pt-28 sm:pb-16 sm:pt-32 md:pt-36">
          <div className="container mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12">
            <div>
              <Eyebrow>Voor het Nederlandse MKB</Eyebrow>
              <h1 className="mb-5 text-4xl font-bold leading-[1.06] tracking-tight text-zinc-900 sm:text-5xl lg:text-[58px]">
                AI automatisering voor MKB
                <span className="block text-primary">betaalbaar en schaalbaar</span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                Facturen, dezelfde mails en de telefoon. Virelio bouwt AI agents die dat werk overnemen,
                zodat u en uw team tijd overhouden voor klanten.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(70,55,210,0.6)] transition-colors hover:bg-primary/90 ${RING}`}>
                  Plan gratis intake
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="mailto:info@virelio.nl"
                  className={`inline-flex items-center justify-center rounded-xl border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary ${RING}`}>
                  Stel een vraag
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-zinc-600 sm:flex sm:flex-wrap">
                {[`Vanaf ${eur(SETUP_FROM)} eenmalig`, "Live in 1 week", `Onderhoud vanaf ${eur(BASIS.price)}/mnd`, "WBSO-subsidie mogelijk"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <ShopFloor />
          </div>
        </section>

        {/* Use cases */}
        <section id="toepassingen" className="scroll-mt-24 border-t border-black/[0.07] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Toepassingen</Eyebrow>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Hier begint het meeste MKB mee</h2>
              <p className="text-base text-zinc-500">Gerekend voor een bedrijf met 5 tot 50 medewerkers. Uw situatie kan gunstiger zijn.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {USE_CASES.map((u, i) => {
                const Icon = ICONS[u.id];
                const r = roi(u.saving, u.setup, BASIS.price);
                const wide = i === 0;
                return (
                  <article key={u.id} className={`${CARD} flex flex-col p-6 sm:p-7 ${SPAN[i]}`}>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-zinc-50">
                      <Icon className="h-[18px] w-[18px] text-zinc-700" />
                    </div>
                    <div className={wide ? "grid gap-6 sm:grid-cols-[minmax(0,1fr)_200px]" : ""}>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">{u.title}</h3>
                        <p className="mb-2 text-sm leading-relaxed text-zinc-500">{u.problem}</p>
                        <p className="text-sm leading-relaxed text-zinc-700">{u.solution}</p>
                      </div>
                      <dl className={`grid grid-cols-3 gap-3 border-t border-black/[0.07] pt-4 text-sm ${wide ? "sm:grid-cols-1 sm:content-start sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0" : "mt-5"}`}>
                        <div>
                          <dt className="text-xs text-zinc-500">Bespaart</dt>
                          <dd className="font-semibold tabular-nums text-zinc-900">{eur(u.saving)}/mnd</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-zinc-500">Setup</dt>
                          <dd className="font-semibold tabular-nums text-zinc-900">{eur(u.setup)}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-zinc-500">Terug in</dt>
                          <dd className="font-semibold tabular-nums text-primary">{r.paybackWeeks} weken</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                );
              })}
              <article className={`${CARD} flex flex-col p-6 sm:p-7 lg:col-span-2`}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-zinc-50">
                  <Plus className="h-[18px] w-[18px] text-zinc-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">Uw eigen proces</h3>
                <p className="mb-5 max-w-lg text-sm leading-relaxed text-zinc-500">
                  Ander repeterend werk? Wij koppelen aan de software die u al gebruikt. Als er een API is, kunnen wij erop aansluiten.
                </p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {TOOLS.map((t) => (
                    <li key={t} className="rounded-full border border-black/[0.07] bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">{t}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ROI example */}
        <section id="rekenvoorbeeld" className="scroll-mt-24 border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-5 sm:px-8">
            <div className="mb-8 max-w-2xl">
              <Eyebrow>Rekenvoorbeeld</Eyebrow>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Wanneer heeft u het terugverdiend?</h2>
              <p className="text-base text-zinc-500">Kies een toepassing en een onderhoudspakket. Besparing min onderhoud betaalt de setup terug.</p>
            </div>
            <RoiExample />
          </div>
        </section>

        {/* Pricing */}
        <section id="prijzen" className="scroll-mt-24 border-t border-black/[0.07] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Prijzen</Eyebrow>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Eenmalig bouwen, maandelijks onderhoud</h2>
              <p className="text-base text-zinc-500">Eenmalige setup, daarna een vast bedrag per maand.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className={`${CARD} p-6 sm:p-7`}>
                <h3 className="text-sm font-semibold text-zinc-500">Setup</h3>
                <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
                  <span className="text-base font-medium text-zinc-500">vanaf </span>{eur(SETUP_FROM)}
                </p>
                <p className="mt-1 text-sm text-zinc-500">eenmalig, live in 1 week</p>
                <ul className="mt-6 space-y-2.5 border-t border-black/[0.07] pt-5 text-sm">
                  {[...USE_CASES].sort((a, b) => a.setup - b.setup).map((u) => (
                    <li key={u.id} className="flex justify-between gap-3">
                      <span className="text-zinc-600">{u.title}</span>
                      <span className="font-semibold tabular-nums text-zinc-900">{eur(u.setup)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {MAINTENANCE.map((m, i) => (
                <div key={m.id} className={`${CARD} relative p-6 sm:p-7 ${i === 1 ? "border-primary/30 shadow-[0_30px_60px_-34px_rgba(70,55,210,0.55)]" : ""}`}>
                  {i === 1 && <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Groeit mee</span>}
                  <h3 className="text-sm font-semibold text-zinc-500">{m.name}</h3>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
                    {eur(m.price)}<span className="text-base font-medium text-zinc-500">/mnd</span>
                  </p>
                  <p className="mt-6 border-t border-black/[0.07] pt-5 text-sm leading-relaxed text-zinc-700">{m.text}.</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-500">
              <span className="font-semibold text-zinc-900">Met WBSO-subsidie.</span>{" "}
              Een project van {eur(WBSO.project)} met 35% teruggave ({eur(WBSO.refund)}) kost effectief {eur(WBSO.effective)}.
              Bij {eur(WBSO.saving)} besparing per maand en {BASIS.name} is dat in {WBSO.paybackWeeks} weken terugverdiend,
              met netto {eur(WBSO.netYear1)} in het eerste jaar. Wij helpen bij de aanvraag.
            </p>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-zinc-500">
              Alle prijzen zijn exclusief btw. Verbruikskosten van AI-modellen en hosting hangen af van gebruik en verkeer en kunnen per maand verschillen; tarieven van externe aanbieders kunnen wijzigen. Wij adviseren altijd de beste verhouding tussen prijs en kwaliteit. Zie onze{" "}
              <a href="/terms-of-service" className="underline underline-offset-2 hover:text-primary">algemene voorwaarden</a>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 border-t border-black/[0.07] bg-zinc-50/60 py-16 sm:py-24">
          <div className="container mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Veelgestelde vragen</h2>
            <div className="divide-y divide-black/[0.07] rounded-[24px] border border-black/[0.07] bg-white">
              {faqItems.map((item) => (
                <details key={item.question} className="group px-5 sm:px-6">
                  <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden ${RING}`}>
                    {item.question}
                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-zinc-500">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-black/[0.07]">
          <div className="container mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Welk proces automatiseren we als eerste?</h2>
            <p className="mx-auto mb-8 max-w-lg text-base text-zinc-500">
              Plan een gratis gesprek van 30 minuten. Wij zoeken uw drie grootste tijdvreters en rekenen de besparing voor u uit.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(70,55,210,0.6)] transition-colors hover:bg-primary/90 ${RING}`}>
                Plan gratis intake
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="mailto:info@virelio.nl"
                className={`inline-flex items-center justify-center rounded-xl border border-black/[0.1] bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary ${RING}`}>
                Mail ons direct
              </a>
            </div>
            <p className="mt-6 text-xs text-zinc-500">
              Virelio, AI agent bureau, Amsterdam.{" "}
              <a href="tel:+31687838713" className="hover:text-zinc-900">+31 6 87838713</a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
