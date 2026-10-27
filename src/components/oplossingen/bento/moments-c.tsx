/**
 * Product moments for eigen-bedrijfs-ai.
 * The measured numbers come from the open-company-ai release gate (2026-10-27) and are
 * only ever shown together: 18/18 alone flatters the guard.
 */
import { Check, EyeOff, Lock, ShieldCheck } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Chip, T, Tile, type Tone } from "./kit";

type M = { lang: Lang; tone?: Tone; className?: string };
const nl = (lang: Lang) => lang === "nl";

/** Same question, three roles, three different answers. */
export function Roles({ lang, tone = "white", className = "" }: M) {
  const rows = nl(lang)
    ? [
        { role: "Stagiair", sees: "Handboek, geen salarissen", open: false },
        { role: "HR", sees: "Plus salarissen", open: true },
        { role: "Directie", sees: "Plus notulen directie", open: true },
      ]
    : [
        { role: "Intern", sees: "Handbook, no salaries", open: false },
        { role: "HR", sees: "Plus salaries", open: true },
        { role: "Director", sees: "Plus board notes", open: true },
      ];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Toegang per rol" : "Access per role"}</T>
      <p className="bp">
        {nl(lang) ? "Wat iemand niet mag zien, komt niet in zijn antwoord." : "What someone may not see stays out of their answer."}
      </p>
      <span className="mt-auto block space-y-1.5 pt-4" aria-hidden="true">
        {rows.map((r, i) => (
          <span key={r.role} className="flex items-center gap-2 rounded-xl bg-[#f5f5f7] px-3 py-2 text-[12px] lg:text-[13px]">
            <span className="w-16 shrink-0 font-semibold text-[#1d1d1f] lg:w-20">{r.role}</span>
            <span className="min-w-0 flex-1 truncate text-[#6e6e73]">{r.sees}</span>
            <span className="bx-rise shrink-0" style={{ animationDelay: `${i * 0.2}s` }}>
              {r.open ? <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} /> : <Lock className="h-3.5 w-3.5 text-[#EC4899]" strokeWidth={2.4} />}
            </span>
          </span>
        ))}
      </span>
    </Tile>
  );
}

/** An IBAN in the question is masked before it reaches the model. */
export function Masked({ lang, tone = "white", className = "" }: M) {
  return (
    <Tile tone={tone} className={className}>
      <EyeOff className="mb-2 h-5 w-5 text-primary" strokeWidth={2} />
      <T tone={tone}>{nl(lang) ? "BSN en IBAN afgeschermd" : "BSN and IBAN masked"}</T>
      <p className="bp">{nl(lang) ? "Al voordat de vraag het taalmodel bereikt." : "Before the question reaches the language model."}</p>
      <span className="mt-auto block pt-3 font-mono text-[11px] lg:text-xs" aria-hidden="true">
        <span className="block truncate text-[#a1a1aa] line-through">NL00 BANK 0123 4567 89</span>
        <Chip className="bx-rise mt-1.5 bg-[#ecebfc] font-mono text-primary">[IBAN]</Chip>
      </span>
    </Tile>
  );
}

/** Every question in the log, with what each check did. */
export function Logbook({ lang, tone = "white", className = "" }: M) {
  const rows = nl(lang)
    ? [
        ["09:14", "Stagiair", "geweigerd", false],
        ["09:15", "HR", "beantwoord", true],
        ["09:17", "Directie", "beantwoord", true],
      ]
    : [
        ["09:14", "Intern", "refused", false],
        ["09:15", "HR", "answered", true],
        ["09:17", "Director", "answered", true],
      ];
  return (
    <Tile tone={tone} className={className}>
      <T tone={tone}>{nl(lang) ? "Elke vraag in het logboek" : "Every question logged"}</T>
      <span className="mt-auto block space-y-1 pt-3 font-mono text-[10px] lg:text-[11px]" aria-hidden="true">
        {rows.map(([time, who, what, ok], i) => (
          <span key={time as string} className="bx-shimmer flex gap-2 rounded-md bg-[#f5f5f7] px-2 py-1 text-[#3f3f46]" style={{ animationDelay: `${-i * 0.6}s` }}>
            <span className="hidden text-[#a1a1aa] sm:inline">{time}</span>
            <span className="min-w-0 flex-1 truncate">{who}</span>
            <span className={ok ? "text-emerald-700" : "text-[#db2777]"}>{what}</span>
          </span>
        ))}
      </span>
    </Tile>
  );
}

/** The demo's release gate: the three numbers, always together. */
export function Measured({ lang, tone = "dark", className = "" }: M) {
  const rows = nl(lang)
    ? [
        ["18 van 18", "bekende aanvallen geblokkeerd"],
        ["7 van 10", "nieuwe aanvallen al bij de eerste controle"],
        ["0", "salarislekken"],
      ]
    : [
        ["18 of 18", "known attacks blocked"],
        ["7 of 10", "new attacks stopped at the first check"],
        ["0", "salary leaks"],
      ];
  const num = tone === "dark" ? "text-[#a5b4fc]" : "text-primary";
  return (
    <Tile tone={tone} className={className}>
      <ShieldCheck className={`mb-2 h-5 w-5 ${num}`} strokeWidth={2} />
      <T tone={tone}>{nl(lang) ? "Gemeten op de demo" : "Measured on the demo"}</T>
      <dl className="mt-3 grid gap-3 sm:grid-cols-3 lg:gap-4">
        {rows.map(([n, what]) => (
          <div key={what}>
            <dt className={`text-[28px] font-extrabold leading-none tracking-[-0.04em] lg:text-[34px] ${num}`}>{n}</dt>
            <dd className="mt-1 text-[12px] leading-snug lg:text-[13px]">{what}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-4 text-[11px] opacity-70 lg:text-xs">
        {nl(lang)
          ? "De nieuwe aanvallen schreven we pas nadat de beveiliging was afgesteld. De drie aanvallen die erdoor kwamen, liepen vast op de rechtencheck en de uitvoercontrole."
          : "We wrote the new attacks only after the guard was tuned. The three that got past it were caught by the access check and the output check."}
      </p>
    </Tile>
  );
}
