/**
 * Bento kit for the solution pages.
 *
 * Exemplar: Apple's WWDC and iPhone bento grids. A light grey field, white tiles with a
 * large radius, mixed sizes, one dark tile for contrast and one big indigo figure.
 * Every tile has at most one small, calm loop (globals.css, .bx-*), off under reduced motion.
 *
 * Phone: two columns, DOM order is the reading order, `grid-flow-dense` fills the gaps.
 * Desktop: six columns; each page places its tiles with explicit lg grid areas.
 */
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { CALENDLY } from "@/components/diensten/agent-bouwen/pricing";
import type { Lang } from "@/lib/solutions";
import { COPY } from "../shared";
import SolutionIllustration from "../illustrations";

export type Tone = "white" | "dark" | "indigo" | "soft";

const TONE: Record<Tone, string> = {
  white: "bg-white text-[#6e6e73]",
  dark: "bg-[#1d1d1f] text-[#a1a1a6]",
  indigo: "bg-primary text-white/80",
  soft: "bg-[#ecebfc] text-[#5b5a72]",
};
const TITLE: Record<Tone, string> = {
  white: "text-[#1d1d1f]",
  dark: "text-white",
  indigo: "text-white",
  soft: "text-[#1d1d1f]",
};

export function Bento({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className="grid scroll-mt-24 grid-flow-dense grid-cols-2 gap-2.5 [grid-auto-rows:minmax(128px,auto)] sm:gap-3 lg:grid-cols-6 lg:gap-4 lg:[grid-auto-rows:minmax(150px,auto)]"
    >
      {children}
    </div>
  );
}

export function Tile({ tone = "white", className = "", id, children }: { tone?: Tone; className?: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className={`relative flex min-w-0 scroll-mt-24 flex-col [container-type:inline-size] overflow-hidden rounded-[22px] p-4 text-[13px] leading-snug sm:p-5 lg:rounded-[28px] lg:p-6 lg:text-[15px] ${TONE[tone]} ${className}`}>
      {children}
    </div>
  );
}

/** A tile heading. `big` is for tiles that carry one statement. */
export function T({ tone = "white", big = false, children }: { tone?: Tone; big?: boolean; children: ReactNode }) {
  return (
    <h3
      className={`mb-1 font-semibold tracking-tight [hyphens:none] ${big ? "text-[19px] leading-[1.15] lg:text-[26px]" : "text-[15px] leading-tight lg:text-[17px]"} ${TITLE[tone]}`}
    >
      {children}
    </h3>
  );
}

/* ---------- micro moments ---------- */

export function PulseDot({ className = "absolute right-4 top-4 lg:right-6 lg:top-6" }: { className?: string }) {
  return <span aria-hidden="true" className={`bx-ping h-2.5 w-2.5 rounded-full bg-[#34c759] ${className}`} />;
}

export function Shimmer({ widths = ["100%", "70%"], dark = false }: { widths?: string[]; dark?: boolean }) {
  return (
    <span aria-hidden="true" className="mt-auto block pt-3">
      {widths.map((w, i) => (
        <span key={i} className={`bx-shimmer mt-1.5 block h-2 rounded ${dark ? "bg-white/15" : "bg-[#e8e8ed]"}`} style={{ width: w, animationDelay: `${-i * 0.5}s` }} />
      ))}
    </span>
  );
}

export function Typing({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="bx-dot h-1.5 w-1.5 rounded-full bg-current" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </span>
  );
}

export function Caret() {
  return <span aria-hidden="true" className="bx-blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-primary" />;
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none lg:text-xs ${className}`}>{children}</span>;
}

/* ---------- fact tiles shared by every page, styled per page ---------- */

type Fact = { lang: Lang; tone?: Tone; className?: string; id?: string };

/** The price. `figure` shows "€1.000" as the big indigo number of the page. */
export function PriceTile({ lang, tone = "white", className = "", id = "prijs", figure = false, children }: Fact & { figure?: boolean; children?: ReactNode }) {
  const nl = lang === "nl";
  const num = tone === "indigo" ? "text-white" : tone === "dark" ? "text-[#a5b4fc]" : "text-primary";
  return (
    <Tile tone={tone} className={className} id={id}>
      {figure ? (
        <>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] lg:text-xs ${TITLE[tone]} opacity-70`}>{nl ? "Vanaf, eenmalig" : "From, one-off"}</p>
          <p className={`mt-1 text-[clamp(34px,27cqw,76px)] font-extrabold leading-none tracking-[-0.045em] ${num}`}>€1.000</p>
          <p className="bp mt-auto pt-3">{nl ? "Onderhoud vanaf €99 per maand." : "Maintenance from €99 a month."}</p>
        </>
      ) : (
        <>
          <T tone={tone} big>
            {nl ? "Vanaf €1.000 eenmalig" : "From €1,000 one-off"}
          </T>
          <p className="bp">{nl ? "Onderhoud vanaf €99 per maand." : "Maintenance from €99 a month."}</p>
        </>
      )}
      {children}
      <p className="mt-2 text-[11px] opacity-70 lg:text-xs">
        {nl ? (
          <>
            Excl. btw.{" "}
            <a href="/diensten/ai-agent-bouwen/#prijzen" className="underline underline-offset-2">
              Alle prijzen
            </a>
          </>
        ) : (
          "Excl. VAT."
        )}
      </p>
    </Tile>
  );
}

/** Two halves: the first is paid, the second fills only once it works on your examples. */
export function HalvesBar({ lang, tone, tall = false }: { lang: Lang; tone: Tone; tall?: boolean }) {
  const nl = lang === "nl";
  const dark = tone === "dark" || tone === "indigo";
  const first = tone === "indigo" ? "bg-white" : "bg-primary";
  const label = `mt-1.5 block text-[10px] font-semibold lg:text-[11px] ${dark ? "text-white/60" : "text-[#6e6e73]"}`;
  return (
    <span aria-hidden="true" className={`mt-auto flex gap-1.5 pt-4 ${tall ? "min-h-28 flex-1" : ""}`}>
      <span className="flex flex-1 flex-col justify-end">
        <span className={`block rounded-md ${first} ${tall ? "min-h-16 flex-1" : "h-2.5"}`} />
        <span className={label}>{nl ? "1e helft" : "1st half"}</span>
      </span>
      <span className="flex flex-1 flex-col justify-end">
        <span className={`relative block overflow-hidden rounded-md ${dark ? "bg-white/10" : "bg-[#e8e8ed]"} ${tall ? "min-h-16 flex-1" : "h-2.5"}`}>
          <span className={`bx-fill absolute inset-0 rounded-md ${tone === "indigo" ? "bg-[#34c759]" : dark ? "bg-[#a5b4fc]" : "bg-[#34c759]"}`} />
        </span>
        <span className={label}>{nl ? "2e helft, als het werkt" : "2nd half, once it works"}</span>
      </span>
    </span>
  );
}

export function GuaranteeTile({ lang, tone = "white", className = "", visual = "bar" }: Fact & { visual?: "bar" | "tall" | "shield" }) {
  const nl = lang === "nl";
  return (
    <Tile tone={tone} className={className}>
      {visual === "shield" && <ShieldCheck className={`mb-3 h-6 w-6 ${tone === "white" || tone === "soft" ? "text-primary" : "text-white"}`} strokeWidth={1.8} />}
      <T tone={tone}>{nl ? "Tweede helft pas als het werkt" : "Second half once it works"}</T>
      <p className="bp">{nl ? "Je betaalt de tweede helft pas als hij werkt op jouw eigen voorbeelden." : "You only pay the second half once it works on your own examples."}</p>
      {visual !== "shield" && <HalvesBar lang={lang} tone={tone} tall={visual === "tall"} />}
    </Tile>
  );
}

function doorHref(lang: Lang) {
  return `mailto:info@virelio.nl?subject=${encodeURIComponent(COPY[lang].doorSubject)}`;
}

/** The open door: not quite what you need, a fixed quote within 48 hours. */
export function DoorTile({ lang, tone = "white", className = "", figure = false }: Fact & { figure?: boolean }) {
  const nl = lang === "nl";
  const link = tone === "white" || tone === "soft" ? "text-primary" : "text-white";
  return (
    <Tile tone={tone} className={className}>
      {figure && <p className={`mb-2 text-[clamp(32px,25cqw,64px)] font-extrabold leading-none tracking-[-0.045em] ${tone === "dark" ? "text-[#a5b4fc]" : tone === "indigo" ? "text-white" : "text-primary"}`}>{nl ? "48 uur" : "48 hrs"}</p>}
      <T tone={tone}>{nl ? "Net niet wat je zoekt?" : "Not quite what you need?"}</T>
      <p className="bp">{nl ? "Vaste offerte binnen 48 uur." : "A fixed quote within 48 hours."}</p>
      <a href={doorHref(lang)} className={`mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-semibold lg:text-sm ${link} group`}>
        {nl ? "Vertel wat je team tijd kost" : "Tell us what takes your time"}
        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </a>
    </Tile>
  );
}

/** The primary call to action: the free intake (Calendly), with mail as the quiet second. */
export function CtaTile({ lang, tone = "indigo", className = "", title }: Fact & { title?: string }) {
  const c = COPY[lang];
  const onColor = tone === "indigo" || tone === "dark";
  return (
    <Tile tone={tone} className={`justify-between ${className}`}>
      <div>
        <T tone={tone} big>
          {title ?? c.ctaTitle}
        </T>
        <p className="bp">{lang === "nl" ? "Gratis intake van 30 minuten." : "A free 30-minute intake."}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform active:scale-[0.98] ${
            onColor ? "bg-white text-[#1d1d1f]" : "bg-primary text-white"
          }`}
        >
          {c.intake}
          <ArrowRight className="bx-nudge h-4 w-4" />
        </a>
        <a href="mailto:info@virelio.nl" className={`py-3 text-sm font-medium leading-none underline-offset-4 hover:underline ${onColor ? "text-white/80" : "text-[#6e6e73]"}`}>
          {c.ask}
        </a>
      </div>
    </Tile>
  );
}

/** Read-only: the agent can look, not change. Only on pages that already say so. */
export function ReadOnlyTile({ lang, tone = "white", className = "" }: Fact) {
  const nl = lang === "nl";
  const mono = tone === "dark" ? "bg-white/10 text-white/80" : "bg-[#f5f5f7] text-[#3f3f46]";
  return (
    <Tile tone={tone} className={className}>
      <Lock className={`mb-3 h-5 w-5 ${tone === "dark" ? "text-[#a5b4fc]" : "text-primary"}`} strokeWidth={2} />
      <T tone={tone}>{nl ? "Alleen-lezen" : "Read-only"}</T>
      <p className="bp">{nl ? "Hij leest mee, schrijven kan hij niet." : "It reads along. It cannot write."}</p>
      <p className={`mt-auto truncate rounded-lg px-2.5 py-1.5 pt-1.5 font-mono text-[11px] lg:text-xs ${mono}`}>
        <span className="text-primary">SELECT</span> … <span className="line-through opacity-50">UPDATE</span>
        <Caret />
      </p>
    </Tile>
  );
}

/** The customer's own words, as the page used to open with. */
export function QuoteTile({ text, tone = "white", className = "" }: { text: string; tone?: Tone; className?: string }) {
  return (
    <Tile tone={tone} className={`justify-center ${className}`}>
      <p className={`text-[17px] font-semibold leading-snug tracking-tight [hyphens:none] lg:text-[22px] ${TITLE[tone]}`}>{text}</p>
    </Tile>
  );
}

/** The slug's animated UI mock as a product moment, under a short heading. */
export function SceneTile({ lang, slug, title, text, tone = "white", className = "" }: Fact & { slug: string; title: string; text?: string }) {
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{title}</T>
      {text && <p className="bp">{text}</p>}
      <div className="mt-3 flex flex-1 items-end lg:mt-4">
        <SolutionIllustration slug={slug} lang={lang} />
      </div>
    </Tile>
  );
}
