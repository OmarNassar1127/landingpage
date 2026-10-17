import { generateMetadata as genMeta } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/sections/navbar";
import CatalogLink from "@/components/oplossingen/catalog-link";
import Footer from "@/components/sections/footer";
import { ArrowRight, Check, HeartPulse, Calculator, Building2, Headphones, Plug, Brain, UserRound, Network } from "lucide-react";
import NightDesk from "./night-desk";

export const metadata = genMeta({
  title: "Digitale medewerker: AI die zelf werk overneemt",
  description:
    "Een digitale medewerker van Virelio werkt 24/7 en kost een fractie van een FTE. Multi-agent AI die taken overneemt in HR, finance, operations en klantenservice.",
  keywords:
    "digitale medewerker, AI medewerker, virtuele medewerker, AI automatisering bedrijf, digitale collega, AI agent HR, AI finance automatisering, klantenservice automatisering, operations AI, multi-agent systeem, AI bureau Amsterdam",
  pathname: "/diensten/digitale-medewerker",
  locale: "nl_NL",
});

const CALENDLY = "https://calendly.com/omarnassar1127/30min";
const eur = (n: number) => `€${n.toLocaleString("nl-NL")}`;

// Pricing: Virelio setup and usage, plus the maintenance plans.
const SETUP = { from: 2500, to: 7500, typical: 4000 };
const USAGE = { from: 150, to: 500, typical: 350 };
const MAINTENANCE = [
  { name: "Onderhoud Basis", price: 99, body: "Hosting, monitoring, updates en support." },
  { name: "Onderhoud Plus", price: 249, body: "Alles van Basis plus maandelijkse verbeteringen en nieuwe functies." },
];

// Comparison, year one: typical setup + 12 months of usage + Onderhoud Plus,
// against an average FTE including overhead (market figure, not a Virelio price).
const HUMAN_YEAR = 50000;
const DIGITAL_MONTH = USAGE.typical + MAINTENANCE[1].price; // 350 + 249 = 599
const DIGITAL_RUN_YEAR = DIGITAL_MONTH * 12; // 7.188
const DIGITAL_YEAR_ONE = SETUP.typical + DIGITAL_RUN_YEAR; // 11.188
const SAVED_YEAR_ONE = HUMAN_YEAR - DIGITAL_YEAR_ONE; // 38.812
const SAVED_LATER = HUMAN_YEAR - DIGITAL_RUN_YEAR; // 42.812
const PAYBACK_WEEKS = Math.ceil((SETUP.typical / (HUMAN_YEAR / 12 - DIGITAL_MONTH)) * (52 / 12)); // 4.000 / 3.568 = 1,12 mnd, 5 weken

const faqItems = [
  {
    question: "Wat is een digitale medewerker precies?",
    answer:
      "Een digitale medewerker is een AI-systeem dat zelfstandig een rol vervult binnen uw organisatie. Net als een menselijke medewerker, maar dan 24/7 en zonder ziekteverlof. Het systeem bestaat uit meerdere samenwerkende AI agents die samen een takenpakket beheren: van het beantwoorden van klantvragen tot het verwerken van facturen.",
  },
  {
    question: "Hoe verschilt een digitale medewerker van gewone automatisering?",
    answer:
      "Traditionele automatisering (RPA, scripts) volgt vaste regels en faalt bij uitzonderingen. Een digitale medewerker begrijpt context, past zich aan nieuwe situaties aan en kan complexe beslissingen nemen. Hij leest e-mails, begrijpt de intentie en kiest de juiste actie, ook als het bericht onverwacht is.",
  },
  {
    question: "Voor welke afdelingen is een digitale medewerker geschikt?",
    answer:
      "Vrijwel elke afdeling met repetitief kenniswerk: klantenservice (ticketverwerking), HR (onboarding, vragen van medewerkers), finance (facturatie, betalingsherinneringen, rapportages), operations (orderverwerking, planning) en sales (lead kwalificatie, follow-up).",
  },
  {
    question: "Wat zijn de kosten van een digitale medewerker?",
    answer: `De eenmalige opzet kost ${eur(SETUP.from)} tot ${eur(SETUP.to)}, afhankelijk van het aantal taken en koppelingen. Daarnaast betaalt u ${eur(USAGE.from)} tot ${eur(USAGE.to)} per maand aan verbruik van de AI-modellen en kiest u een onderhoudsabonnement: Onderhoud Basis ${eur(99)}/mnd (hosting, monitoring, updates en support) of Onderhoud Plus ${eur(249)}/mnd (alles van Basis plus maandelijkse verbeteringen en nieuwe functies). Ter vergelijking: een menselijke FTE kost gemiddeld €40.000 tot €60.000 per jaar inclusief overhead.`,
  },
  {
    question: "Kan een digitale medewerker complexe vragen of uitzonderingen aan?",
    answer:
      "Ja, maar voor echt complexe of gevoelige situaties escaleren wij altijd naar een mens. U stelt zelf de grens in: welke zaken handelt de agent af, en wanneer stuurt hij door? Dit zorgt voor de juiste balans tussen automatisering en menselijke aandacht.",
  },
];

const departments = [
  { icon: Headphones, name: "Klantenservice", tasks: ["Terugkerende vragen automatisch afgehandeld", "24/7 antwoord via WhatsApp, e-mail en chat", "Complexe vragen naar de juiste collega"] },
  { icon: Calculator, name: "Finance", tasks: ["Facturen aanmaken en versturen", "Betalingsherinneringen op het juiste moment", "Betalingen matchen met openstaande facturen"] },
  { icon: Building2, name: "Operations", tasks: ["Orders uit Shopify, e-mail of formulieren", "Voorraad bewaken en leveranciers informeren", "Track & trace updates en KPI-rapportages"] },
  { icon: HeartPulse, name: "HR", tasks: ["Onboarding: accounts, documenten, intro's", "Vragen over verlof, beleid en salarisstroken", "Contractscreening en administratie"] },
];

const traits = [
  { icon: Network, title: "Een team van agents", body: "Een orchestrator verdeelt het werk over agents die lezen, beslissen en uitvoeren." },
  { icon: Plug, title: "Gekoppeld aan uw systemen", body: "CRM, ERP, e-mail, agenda en helpdesk. Hij leest, schrijft en start acties." },
  { icon: Brain, title: "Onthoudt en leert", body: "Bouwt kennis op over uw klanten, producten en processen." },
  { icon: UserRound, title: "Schakelt een mens in", body: "Bij twijfel, klachten of risico gaat het via Slack, e-mail of telefoon naar de juiste persoon." },
];

const compare = [
  { label: "Beschikbaar", human: "40 uur per week", digital: "168 uur per week" },
  { label: "Inzetbaar na", human: "3 tot 6 maanden werving en inwerken", digital: "1 week" },
  { label: "Meer volume", human: "Nieuwe vacature", digital: "Schaalt mee, zonder vacature" },
];

const CARD = "rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(23,23,28,0.04)]";
const SECTION = "border-t border-black/[0.07] py-16 sm:py-20 md:py-24";
const EYEBROW = "mb-3 flex items-center gap-2 text-sm font-medium text-primary";
const H2 = "text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={EYEBROW}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

function Ctas({ secondary }: { secondary: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
      >
        Plan gratis intake
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href="mailto:info@virelio.nl"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-medium text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary active:scale-[0.98]"
      >
        {secondary}
      </a>
    </div>
  );
}

export default function DigitaleMedewerkerPage() {
  const faqSchemaData = faqSchema({ items: faqItems });

  const breadcrumbData = breadcrumbSchema({
    items: [
      { position: 1, name: "Home", item: siteConfig.url },
      { position: 2, name: "Diensten", item: `${siteConfig.url}/diensten` },
      {
        position: 3,
        name: "Digitale Medewerker",
        item: `${siteConfig.url}/diensten/digitale-medewerker`,
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-white">
        <Navbar
          customNavLinks={[
            { name: "Wat hij doet", href: "#wat-hij-doet" },
            { name: "Vergelijking", href: "#roi" },
            { name: "Prijzen", href: "#prijzen" },
            { name: "FAQ", href: "#faq" },
          ]}
        />

        {/* Hero */}
        <section className="overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32 md:pt-40">
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-6">
            <div>
              <Eyebrow>Multi-agent AI die een hele rol vervult</Eyebrow>
              <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl lg:text-[56px]">
                Digitale medewerker
                <span className="mt-1 block text-primary">AI die zelfstandig werk overneemt</span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                Hij werkt dag en nacht door, kent uw systemen en schakelt een collega in als het nodig is.
                Voor een fractie van de kosten van een FTE, live in 1 week.
              </p>
              <Ctas secondary="Stel een vraag" />
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {[
                  ["24/7", "beschikbaar"],
                  ["1 week", "tot live"],
                  [`vanaf ${eur(SETUP.from)}`, "eenmalig"],
                ].map(([v, l]) => (
                  <div key={l} className="flex items-baseline gap-1.5">
                    <dt className="font-semibold tabular-nums text-zinc-900">{v}</dt>
                    <dd className="text-zinc-500">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <NightDesk />
          </div>
        </section>

        {/* What it does */}
        <section id="wat-hij-doet" className={`${SECTION} bg-zinc-50/60`}>
          <div className="container mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Wat hij doet</Eyebrow>
              <h2 className={H2}>Inzetbaar in elke afdeling met repetitief kenniswerk</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {departments.map((d) => (
                <div key={d.name} className={`${CARD} p-5`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] bg-zinc-50">
                      <d.icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
                    </span>
                    <h3 className="text-[15px] font-semibold text-zinc-900">{d.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {d.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[13px] leading-snug text-zinc-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
              {traits.map((t) => (
                <div key={t.title} className="bg-white p-5">
                  <t.icon className="mb-3 h-4 w-4 text-primary" />
                  <h3 className="mb-1 text-sm font-semibold text-zinc-900">{t.title}</h3>
                  <p className="text-[13px] leading-snug text-zinc-500">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Human vs digital */}
        <section id="roi" className={SECTION}>
          <div className="container mx-auto max-w-5xl px-6 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>De vergelijking</Eyebrow>
              <h2 className={H2}>Een medewerker of een digitale medewerker</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${CARD} p-6 sm:p-8`}>
                <p className="text-sm font-medium text-zinc-500">Menselijke FTE</p>
                <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-zinc-400 sm:text-5xl">{eur(HUMAN_YEAR)}</p>
                <p className="mt-1 text-sm text-zinc-500">per jaar, inclusief overhead</p>
                <dl className="mt-6 space-y-3 border-t border-black/[0.07] pt-5">
                  {compare.map((c) => (
                    <div key={c.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-zinc-500">{c.label}</dt>
                      <dd className="text-right text-zinc-700">{c.human}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(70,55,210,0.45)] sm:p-8">
                <p className="text-sm font-medium text-primary">Digitale medewerker</p>
                <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-zinc-900 sm:text-5xl">{eur(DIGITAL_YEAR_ONE)}</p>
                <p className="mt-1 text-sm text-zinc-500">in het eerste jaar, alles inbegrepen</p>
                <dl className="mt-6 space-y-3 border-t border-black/[0.07] pt-5">
                  {compare.map((c) => (
                    <div key={c.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-zinc-500">{c.label}</dt>
                      <dd className="text-right font-semibold text-zinc-900">{c.digital}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-black/[0.07] bg-zinc-50/60 p-6 text-center sm:p-10">
              <p className="text-sm font-medium text-zinc-500">U bespaart in het eerste jaar</p>
              <p className="mt-2 text-5xl font-bold tabular-nums tracking-tight text-primary sm:text-7xl">{eur(SAVED_YEAR_ONE)}</p>
              <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-zinc-500 sm:text-sm">
                {eur(SETUP.typical)} opzet + 12 × ({eur(USAGE.typical)} verbruik + {eur(MAINTENANCE[1].price)} Onderhoud Plus) ={" "}
                {eur(SETUP.typical)} + {eur(DIGITAL_RUN_YEAR)} = {eur(DIGITAL_YEAR_ONE)}. Vanaf jaar twee vervalt de opzet en
                bespaart u {eur(SAVED_LATER)} per jaar. De opzet is binnen {PAYBACK_WEEKS} weken terugverdiend.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="prijzen" className={`${SECTION} bg-zinc-50/60`}>
          <div className="container mx-auto max-w-5xl px-6 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Prijzen</Eyebrow>
              <h2 className={H2}>Eenmalige opzet, daarna een maandbedrag</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${CARD} p-6`}>
                <p className="text-sm font-medium text-zinc-500">Opzet, eenmalig</p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-zinc-900">
                  {eur(SETUP.from)} tot {eur(SETUP.to)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Afhankelijk van het aantal taken en koppelingen. Een gemiddeld traject kost {eur(SETUP.typical)}. Live in 1 week.
                </p>
              </div>
              <div className={`${CARD} p-6`}>
                <p className="text-sm font-medium text-zinc-500">Verbruik, per maand</p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-zinc-900">
                  {eur(USAGE.from)} tot {eur(USAGE.to)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  De kosten van de AI-modellen, afhankelijk van het volume dat uw digitale medewerker verwerkt.
                </p>
              </div>
              {MAINTENANCE.map((m, i) => (
                <div
                  key={m.name}
                  className={i === 1 ? "rounded-2xl border border-primary/25 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(70,55,210,0.45)]" : `${CARD} p-6`}
                >
                  <p className={`text-sm font-medium ${i === 1 ? "text-primary" : "text-zinc-500"}`}>{m.name}</p>
                  <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-zinc-900">
                    {eur(m.price)}
                    <span className="text-base font-medium text-zinc-500">/mnd</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{m.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-zinc-500">
              Alle prijzen zijn exclusief btw. Verbruikskosten van AI-modellen en hosting hangen af van gebruik en verkeer en kunnen per maand verschillen; tarieven van externe aanbieders kunnen wijzigen. Wij adviseren altijd de beste verhouding tussen prijs en kwaliteit. Zie onze{" "}
              <a href="/terms-of-service" className="underline underline-offset-2 hover:text-primary">algemene voorwaarden</a>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={SECTION}>
          <div className="container mx-auto max-w-3xl px-6 sm:px-8">
            <h2 className={`${H2} mb-8`}>Veelgestelde vragen</h2>
            <div className="divide-y divide-black/[0.07] rounded-2xl border border-black/[0.07] bg-white">
              {faqItems.map((item) => (
                <details key={item.question} className="group p-5 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="text-xl leading-none text-zinc-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`${SECTION} bg-zinc-50/60`}>
          <div className="container mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-8">
            <h2 className={`${H2} mb-4`}>Welke afdeling automatiseren we als eerste?</h2>
            <p className="mb-8 max-w-lg text-base text-zinc-500">
              Plan een gratis gesprek van 30 minuten. Wij analyseren uw processen en adviseren welke digitale medewerker
              de hoogste ROI oplevert.
            </p>
            <Ctas secondary="Mail ons direct" />
            <p className="mt-6 text-xs text-zinc-500">
              Virelio · AI Agent Bureau · Amsterdam ·{" "}
              <a href="tel:+31687838713" className="transition-colors hover:text-zinc-900">
                +31 6 87838713
              </a>
            </p>
          </div>
        </section>

        <CatalogLink />
        <Footer />
      </main>
    </>
  );
}
