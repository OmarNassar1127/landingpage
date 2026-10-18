import { ArrowRight, ShieldCheck } from "lucide-react";
import { CALENDLY } from "@/components/diensten/agent-bouwen/pricing";
import type { Lang } from "@/lib/solutions";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(70,55,210,0.7)] transition-all hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.1] bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
export const card = "rounded-2xl border border-black/[0.07] bg-white shadow-[0_24px_50px_-40px_rgba(70,55,210,0.35)]";

export const COPY = {
  nl: {
    home: "Home",
    catalog: "Oplossingen",
    intake: "Plan gratis intake",
    ask: "Stel een vraag",
    mail: "Mail ons direct",
    navHow: "Hoe het werkt",
    navGets: "Wat je krijgt",
    navPrice: "Prijs",
    howTitle: "Zo werkt het",
    getsTitle: "Wat je krijgt",
    priceEyebrow: "Prijs",
    priceMain: "Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand",
    priceLadder: "Eén agent met één koppeling kost €1.000. Moeten meerdere agents samen een heel proces afhandelen, dan kost dat €2.500 tot €4.000.",
    risk: "Je betaalt de tweede helft pas als hij werkt op jouw echte voorbeelden.",
    priceNote: "Prijzen exclusief btw. Het verbruik van het taalmodel betaal je apart aan de aanbieder.",
    priceLink: "Alle prijzen en pakketten",
    doorTitle: "Net niet wat je zoekt?",
    doorText: "Vertel wat je team tijd kost en je krijgt binnen 48 uur een vaste offerte.",
    doorCta: "Vertel wat je team tijd kost",
    doorSubject: "Wat ons team tijd kost",
    alsoTitle: "Ook interessant",
    allSolutions: "Alle oplossingen",
    seeService: "Lees meer over",
    ctaTitle: "Zullen we kijken of dit bij jou past?",
    ctaText: "Plan een gratis intake van 30 minuten. Je laat zien hoe het nu gaat, wij vertellen eerlijk wat een agent daaraan kan doen.",
    from: "Vanaf €1.000",
    view: "Bekijk",
    footerLine: "Virelio, AI agent bureau in Amsterdam",
  },
  en: {
    home: "Home",
    catalog: "Solutions",
    intake: "Book a free intake",
    ask: "Ask a question",
    mail: "Email us",
    navHow: "How it works",
    navGets: "What you get",
    navPrice: "Price",
    howTitle: "How it works",
    getsTitle: "What you get",
    priceEyebrow: "Price",
    priceMain: "From €1,000 one-off, maintenance from €99 a month",
    priceLadder: "One agent with one integration costs €1,000. If several agents need to handle a whole process together, that costs €2,500 to €4,000.",
    risk: "You only pay the second half once it works on your real examples.",
    priceNote: "Prices exclude VAT. Language model usage is paid separately to the provider.",
    priceLink: "",
    doorTitle: "Not quite what you need?",
    doorText: "Tell us what takes up your team’s time and you get a fixed quote within 48 hours.",
    doorCta: "Tell us what takes your team’s time",
    doorSubject: "What takes our team's time",
    alsoTitle: "You may also like",
    allSolutions: "All solutions",
    seeService: "Read more about",
    ctaTitle: "Shall we see if this fits?",
    ctaText: "Book a free 30-minute intake. You show us how it works today, we tell you honestly what an agent can do about it.",
    from: "From €1,000",
    view: "View",
    footerLine: "Virelio, AI agent agency in Amsterdam",
  },
} as const;

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

export function PriceBlock({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="prijs" className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="rounded-[24px] border border-primary bg-primary p-6 text-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.6)] sm:p-8 lg:col-span-7">
            <p className="text-sm font-semibold text-white/80">{c.priceEyebrow}</p>
            <p className="mt-3 text-2xl font-bold leading-snug tracking-tight [hyphens:none] sm:text-3xl">{c.priceMain}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/85">{c.priceLadder}</p>
            <p className="mt-4 text-xs text-white/70">
              {c.priceNote}
              {lang === "nl" && (
                <>
                  {" "}
                  <a href="/diensten/ai-agent-bouwen/#prijzen" className="underline underline-offset-2 hover:text-white">
                    {c.priceLink}
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-[24px] border border-black/[0.07] bg-zinc-50/60 p-6 sm:p-8 lg:col-span-5">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white">
              <ShieldCheck className="h-[18px] w-[18px] text-primary" />
            </span>
            <p className="text-lg font-semibold leading-snug text-zinc-900 [hyphens:none]">{c.risk}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BottomCta({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="border-t border-black/[0.07] bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[28px] border border-black/[0.07] bg-zinc-50/60 px-6 py-12 text-center shadow-[0_40px_80px_-50px_rgba(70,55,210,0.35)] sm:px-10 sm:py-16">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{c.ctaTitle}</h2>
          <p className="mx-auto mb-8 max-w-lg text-base text-zinc-500">{c.ctaText}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              {c.intake}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:info@virelio.nl" className={btnSecondary}>
              {c.mail}
            </a>
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            {c.footerLine} ·{" "}
            <a href="tel:+31687838713" className="transition-colors hover:text-zinc-900">
              +31 6 87838713
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
