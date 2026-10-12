"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, BarChart3, Bell, Bot, CalendarDays, Check, Heart, PenTool, Image as ImageIcon, ScanSearch, ShieldCheck, Target, TrendingUp } from "lucide-react";

/**
 * The left-hand scenes of the case studies. Each one plays its product's story
 * on a loop: ZapBot books an appointment straight into a calendar, Fraud guard
 * scores invoices and splits the risky one into micro-invoices, ContentOS has
 * four agents build a post that lands in a live feed. Reduced motion shows the
 * finished state of each loop.
 */

type Props = { language: string };
const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;

/** Steps through `count` phases, each `ms` long, forever. Reduced motion parks on the last phase. */
function usePhase(durations: number[]) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? durations.length - 1 : 0);
  useEffect(() => {
    if (reduce) { setPhase(durations.length - 1); return; }
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(t);
  }, [phase, reduce, durations]);
  return phase;
}

/* ───────────────────────── ZapBot: chat books into the calendar ───────────────────────── */

const ZAP_STEPS = [900, 1100, 1300, 900, 1100, 1300, 2600];

export function ZapBotScene({ language }: Props) {
  const nl = language === "nl";
  const p = usePhase(ZAP_STEPS);
  const days = nl ? ["Ma", "Di", "Wo", "Do", "Vr"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = nl ? ["Ma 10:00", "Di 14:00", "Wo 09:30"] : ["Mon 10:00", "Tue 14:00", "Wed 09:30"];
  const busy: [number, number, number][] = [[0, 1, 2], [0, 4, 1], [1, 0, 2], [2, 2, 2], [3, 1, 1], [3, 5, 1], [4, 3, 2]]; // day, row, height
  const booked = p >= 4;

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[540px]" style={{ perspective: 1400 }} aria-hidden="true">
      {/* soft brand glow */}
      <div className="absolute left-[10%] top-[18%] h-64 w-64 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="absolute right-[8%] bottom-[10%] h-48 w-48 rounded-full bg-primary/15 blur-3xl" />

      {/* calendar, tilted behind the phone */}
      <motion.div
        className="absolute right-0 top-10 w-[300px] rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-[0_30px_60px_-30px_rgba(23,23,28,0.45)]"
        initial={false}
        animate={{ rotateY: -14, rotateX: 6, y: booked ? -4 : 0 }}
        transition={SPRING}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-900"><CalendarDays className="h-3.5 w-3.5 text-emerald-600" />{nl ? "Agenda · week 42" : "Calendar · week 42"}</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">{booked ? (nl ? "+1 afspraak" : "+1 booking") : (nl ? "Synchroon" : "Synced")}</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, di) => (
            <div key={d}>
              <div className="mb-1 text-center text-[9.5px] font-medium text-zinc-500">{d}</div>
              <div className="relative h-[168px] rounded-lg bg-zinc-50">
                {busy.filter((b) => b[0] === di).map(([, row, h], k) => (
                  <div key={k} className="absolute inset-x-1 rounded-md bg-zinc-200/80" style={{ top: 4 + row * 26, height: h * 24 }} />
                ))}
                {di === 1 && (
                  <AnimatePresence>
                    {booked && (
                      <motion.div
                        className="absolute inset-x-0.5 z-10 rounded-md bg-emerald-500 px-1 py-1 text-white shadow-[0_8px_18px_-6px_rgba(16,185,129,0.7)]"
                        style={{ top: 4 + 3 * 26, height: 50 }}
                        initial={{ x: -170, y: 40, scale: 0.6, opacity: 0 }}
                        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ...SPRING, stiffness: 180 }}
                      >
                        <div className="text-[8.5px] font-bold leading-tight">14:00</div>
                        <div className="text-[8px] leading-tight opacity-90">Sanne</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* phone with the WhatsApp chat */}
      <motion.div
        className="absolute left-2 top-4 z-20 w-[218px] rounded-[34px] bg-zinc-900 p-2 shadow-[0_40px_70px_-30px_rgba(23,23,28,0.6)]"
        initial={false}
        animate={{ rotateY: 10, rotateX: 4 }}
        transition={SPRING}
      >
        <div className="overflow-hidden rounded-[27px] bg-[#efeae2]">
          <div className="flex items-center gap-2 bg-[#075e54] px-3 pb-2 pt-3 text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400"><Bot className="h-3.5 w-3.5" /></div>
            <div>
              <div className="text-[11px] font-semibold leading-tight">ZapBot</div>
              <div className="text-[8.5px] leading-tight text-emerald-100">{p === 1 || p === 3 ? (nl ? "typt…" : "typing…") : "online"}</div>
            </div>
          </div>
          <div className="flex h-[318px] flex-col justify-end gap-1.5 px-2 pb-2.5">
            <AnimatePresence initial={false}>
              {p >= 0 && <Msg key="a" me>{nl ? "Hoi! Kan ik volgende week langskomen?" : "Hi! Can I come by next week?"}</Msg>}
              {p >= 2 && (
                <Msg key="b">
                  {nl ? "Zeker. Kies een moment:" : "Sure. Pick a time:"}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {slots.map((s, i) => (
                      <motion.span key={s} className="rounded-full border px-1.5 py-0.5 text-[8.5px] font-semibold"
                        animate={{ backgroundColor: p >= 3 && i === 1 ? "#10b981" : "#ffffff", color: p >= 3 && i === 1 ? "#ffffff" : "#047857", borderColor: "#a7f3d0", scale: p === 3 && i === 1 ? 1.08 : 1 }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </Msg>
              )}
              {p >= 3 && <Msg key="c" me>{slots[1]} 👍</Msg>}
              {p >= 5 && <Msg key="d">{nl ? "Gepland ✓ Je krijgt morgen een herinnering." : "Booked ✓ You'll get a reminder tomorrow."}</Msg>}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* reminder notification */}
      <AnimatePresence>
        {p >= 5 && (
          <motion.div
            className="absolute bottom-6 right-6 z-30 flex items-center gap-2.5 rounded-2xl border border-black/[0.06] bg-white/95 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(23,23,28,0.5)] backdrop-blur"
            initial={{ y: 24, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 12, opacity: 0 }} transition={SPRING}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white"><Bell className="h-4 w-4" /></span>
            <span>
              <span className="block text-[11px] font-semibold text-zinc-900">{nl ? "Herinnering ingepland" : "Reminder scheduled"}</span>
              <span className="block text-[10px] text-zinc-500">{nl ? "Di 14:00 · no-shows −40%" : "Tue 14:00 · no-shows −40%"}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Msg({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <motion.div layout className={`flex ${me ? "justify-end" : "justify-start"}`} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING}>
      <div className={`max-w-[88%] rounded-xl px-2 py-1.5 text-[10px] leading-snug text-zinc-800 shadow-sm ${me ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white"}`}>{children}</div>
    </motion.div>
  );
}

/* ───────────────────────── Fraud guard: scoring invoices ───────────────────────── */

const INVOICES = [
  { id: "F-2041", who: "J. de Vries", amount: 189, risk: 12 },
  { id: "F-2042", who: "Mobi BV", amount: 1240, risk: 87 },
  { id: "F-2043", who: "A. Yilmaz", amount: 96, risk: 23 },
];
const FRAUD_STEPS = [900, 1300, 1000, 1300, 1000, 1500, 1200, 2400];

export function FraudScene({ language }: Props) {
  const nl = language === "nl";
  const p = usePhase(FRAUD_STEPS);
  // phase 1: scan #0, 2: approve #0, 3: scan #1, 4: flag #1, 5: split #1, 6: scan+approve #2, 7: hold
  const scanning = p === 1 ? 0 : p === 3 ? 1 : p === 6 ? 2 : -1;
  const status = (i: number) => (i === 0 ? (p >= 2 ? "ok" : "wait") : i === 1 ? (p >= 4 ? "flag" : "wait") : p >= 7 ? "ok" : "wait");
  const needle = scanning >= 0 ? INVOICES[scanning].risk : p >= 4 && p < 6 ? INVOICES[1].risk : 18;
  const recovered = Math.min(2, 1.62 + p * 0.055);

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[540px]" style={{ perspective: 1400 }} aria-hidden="true">
      <div className="absolute left-[30%] top-[20%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-[6%] top-[8%] h-40 w-40 rounded-full bg-rose-400/20 blur-3xl" />

      {/* risk gauge */}
      <motion.div className="absolute left-0 top-6 z-10 w-[210px] rounded-2xl bg-zinc-900 p-4 text-white shadow-[0_30px_60px_-30px_rgba(23,23,28,0.7)]"
        initial={false} animate={{ rotateY: 12, rotateX: 4 }} transition={SPRING}>
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300"><ScanSearch className="h-3.5 w-3.5 text-indigo-300" />{nl ? "Risicoscore" : "Risk score"}</div>
        <Gauge value={needle} />
        <div className="mt-2 flex items-baseline justify-between">
          <motion.span key={needle} className="text-[28px] font-bold tabular-nums leading-none" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{needle}</motion.span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${needle > 60 ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"}`}>{needle > 60 ? (nl ? "Hoog risico" : "High risk") : (nl ? "Laag risico" : "Low risk")}</span>
        </div>
        <div className="mt-3 border-t border-white/10 pt-2.5 text-[10px] text-zinc-400">{nl ? "Teruggehaald" : "Recovered"}</div>
        <div className="text-[18px] font-bold tabular-nums">€{recovered.toFixed(2).replace(".", nl ? "," : ".")}M+</div>
      </motion.div>

      {/* invoice queue */}
      <motion.div className="absolute right-0 top-2 w-[300px] space-y-2.5" initial={false} animate={{ rotateY: -12, rotateX: 5 }} transition={SPRING}>
        {INVOICES.map((inv, i) => {
          const s = status(i);
          return (
            <motion.div key={inv.id} className="relative overflow-hidden rounded-2xl border bg-white p-3 shadow-[0_18px_36px_-22px_rgba(23,23,28,0.45)]"
              animate={{ borderColor: s === "flag" ? "#fda4af" : s === "ok" ? "#a7f3d0" : "rgba(23,23,28,0.06)", x: scanning === i ? -8 : 0 }} transition={SPRING}>
              {scanning === i && (
                <motion.div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
                  initial={{ x: -80 }} animate={{ x: 320 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />
              )}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium text-zinc-400">{inv.id}</div>
                  <div className="text-[12px] font-semibold text-zinc-900">{inv.who}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-bold tabular-nums text-zinc-900">€{inv.amount.toLocaleString(nl ? "nl-NL" : "en-GB")}</div>
                  <StatusPill s={s} nl={nl} />
                </div>
              </div>
              {/* the risky invoice splits into micro-invoices */}
              <AnimatePresence>
                {i === 1 && p >= 5 && (
                  <motion.div className="mt-2.5 grid grid-cols-4 gap-1.5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    {[310, 310, 310, 310].map((a, k) => (
                      <motion.div key={k} className="rounded-lg bg-indigo-50 px-1 py-1.5 text-center" initial={{ y: -14, opacity: 0, scale: 0.7 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: k * 0.09 }}>
                        <div className="text-[10px] font-bold tabular-nums text-indigo-700">€{a}</div>
                        <div className="text-[8px] text-indigo-500">{nl ? `week ${k + 1}` : `week ${k + 1}`}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* outcome chip */}
      <AnimatePresence>
        {p >= 5 && (
          <motion.div className="absolute bottom-4 left-6 z-20 flex items-center gap-2.5 rounded-2xl border border-black/[0.06] bg-white/95 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(23,23,28,0.5)] backdrop-blur"
            initial={{ y: 20, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING}>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white"><ShieldCheck className="h-4 w-4" /></span>
            <span>
              <span className="block text-[11px] font-semibold text-zinc-900">{nl ? "Opgesplitst in micro-facturen" : "Split into micro-invoices"}</span>
              <span className="block text-[10px] text-zinc-500">{nl ? "73% minder wanbetalingen" : "73% fewer defaults"}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPill({ s, nl }: { s: string; nl: boolean }) {
  if (s === "ok") return <span className="mt-0.5 inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-emerald-600"><Check className="h-3 w-3" />{nl ? "Goedgekeurd" : "Approved"}</span>;
  if (s === "flag") return <span className="mt-0.5 inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-rose-600"><AlertTriangle className="h-3 w-3" />{nl ? "Gemarkeerd" : "Flagged"}</span>;
  return <span className="mt-0.5 inline-block text-[9.5px] font-medium text-zinc-400">{nl ? "In de wachtrij" : "Queued"}</span>;
}

function Gauge({ value }: { value: number }) {
  const angle = -90 + (value / 100) * 180;
  return (
    <svg viewBox="0 0 120 66" className="w-full">
      <defs>
        <linearGradient id="fraud-gauge" x1="0" x2="1">
          <stop offset="0" stopColor="#34d399" /><stop offset="0.55" stopColor="#fbbf24" /><stop offset="1" stopColor="#fb7185" />
        </linearGradient>
      </defs>
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" strokeLinecap="round" />
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="url(#fraud-gauge)" strokeWidth="9" strokeLinecap="round" />
      <motion.g initial={false} animate={{ rotate: angle }} transition={{ type: "spring", stiffness: 120, damping: 14 }} style={{ originX: "60px", originY: "60px" }}>
        <line x1="60" y1="60" x2="60" y2="18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <circle cx="60" cy="60" r="5" fill="#fff" />
    </svg>
  );
}

/* ───────────────────────── ContentOS: four agents build a post ───────────────────────── */

const CREW = [
  { key: "strat", icon: Target, color: "#f97316", nl: "Strateeg", en: "Strategist" },
  { key: "write", icon: PenTool, color: "#ec4899", nl: "Schrijver", en: "Writer" },
  { key: "design", icon: ImageIcon, color: "#8b5cf6", nl: "Designer", en: "Designer" },
  { key: "data", icon: BarChart3, color: "#10b981", nl: "Analist", en: "Analyst" },
];
const CONTENT_STEPS = [1100, 1200, 1300, 1100, 1300, 2600];

export function ContentOSScene({ language }: Props) {
  const nl = language === "nl";
  const p = usePhase(CONTENT_STEPS);
  // 0 strategist slots it, 1 writer writes, 2 designer paints, 3 analyst predicts, 4 post ships, 5 feed glows
  const caption = nl ? "3 tips om je wintercollectie te stylen ❄️" : "3 ways to style your winter collection ❄️";
  const shipped = p >= 4;

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[540px]" style={{ perspective: 1400 }} aria-hidden="true">
      <div className="absolute left-[8%] top-[24%] h-64 w-64 rounded-full bg-orange-400/25 blur-3xl" />
      <div className="absolute right-[4%] top-[10%] h-56 w-56 rounded-full bg-pink-400/20 blur-3xl" />

      {/* the crew */}
      <div className="absolute inset-x-0 top-0 z-10 flex justify-center gap-2.5">
        {CREW.map((c, i) => {
          const on = p === i || (i === 3 && p === 3);
          const done = p > i;
          const Icon = c.icon;
          return (
            <motion.div key={c.key} className="flex items-center gap-1.5 rounded-full border bg-white py-1 pl-1 pr-2.5 shadow-sm"
              animate={{ y: on ? -3 : 0, borderColor: on ? c.color : "rgba(23,23,28,0.07)", scale: on ? 1.05 : 1 }} transition={SPRING}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: c.color }}>
                {done && !on ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </span>
              <span className="text-[10.5px] font-semibold text-zinc-800">{nl ? c.nl : c.en}</span>
            </motion.div>
          );
        })}
      </div>

      {/* the post being built */}
      <motion.div
        className="absolute left-2 top-16 z-20 w-[220px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_30px_60px_-30px_rgba(23,23,28,0.55)]"
        initial={false}
        animate={{ rotateY: 10, scale: shipped ? 0.97 : 1 }}
        transition={SPRING}
      >
        <AnimatePresence>
          {shipped && (
            <motion.div className="absolute right-2 top-9 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9.5px] font-bold text-white shadow-[0_8px_18px_-6px_rgba(16,185,129,0.7)]"
              initial={{ scale: 1.6, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: -6 }} exit={{ opacity: 0 }} transition={SPRING}>
              <Check className="h-3 w-3" />{nl ? "Gepubliceerd" : "Published"}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-700"><span className="h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />nordicthreads</span>
          <motion.span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[8.5px] font-semibold text-orange-600" animate={{ opacity: p >= 0 ? 1 : 0 }}>{nl ? "Di 09:00" : "Tue 09:00"}</motion.span>
        </div>
        <div className="relative h-[150px] bg-zinc-100">
          <AnimatePresence>
            {p >= 2 && (
              <motion.div className="absolute inset-0" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-pink-400 to-violet-500" />
                <div className="absolute bottom-3 left-3 h-16 w-12 rounded-lg bg-white/80" />
                <div className="absolute bottom-3 left-[68px] h-20 w-14 rounded-lg bg-white/60" />
                <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white/70" />
              </motion.div>
            )}
          </AnimatePresence>
          {p < 2 && <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">{nl ? "Visual volgt…" : "Visual coming…"}</div>}
        </div>
        <div className="space-y-1.5 px-3 py-2.5">
          <div className="min-h-[28px] text-[10.5px] font-medium leading-snug text-zinc-800">
            {p >= 1 ? <Typed text={caption} run={p === 1} /> : <span className="block h-2 w-3/4 rounded bg-zinc-100" />}
          </div>
          <AnimatePresence>
            {p >= 3 && (
              <motion.div className="flex items-center gap-1 text-[9.5px] font-semibold text-emerald-600" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <TrendingUp className="h-3 w-3" />{nl ? "Verwacht bereik +180%" : "Expected reach +180%"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* the live feed */}
      <motion.div className="absolute right-0 top-14 w-[250px] space-y-2" initial={false} animate={{ rotateY: -12, rotateX: 4 }} transition={SPRING}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold text-zinc-900">{nl ? "Live feed" : "Live feed"}</span>
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[9.5px] font-semibold text-white">25+ / {nl ? "week" : "week"}</span>
        </div>
        <AnimatePresence initial={false}>
          {p >= 4 && <FeedItem key="new" fresh grad="from-orange-300 via-pink-400 to-violet-500" text={caption} likes={1284} />}
        </AnimatePresence>
        <FeedItem grad="from-sky-300 to-indigo-400" text={nl ? "Nieuw binnen: de wollen sjaal" : "New in: the wool scarf"} likes={642} />
        <FeedItem grad="from-amber-200 to-rose-300" text={nl ? "Achter de schermen in ons atelier" : "Behind the scenes in our studio"} likes={518} />
      </motion.div>
    </div>
  );
}

function FeedItem({ grad, text, likes, fresh }: { grad: string; text: string; likes: number; fresh?: boolean }) {
  return (
    <motion.div layout className={`flex items-center gap-2.5 rounded-xl border bg-white p-2 shadow-[0_12px_24px_-18px_rgba(23,23,28,0.5)] ${fresh ? "border-pink-200" : "border-black/[0.06]"}`}
      initial={fresh ? { opacity: 0, y: -16, scale: 0.9 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={SPRING}>
      <div className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${grad}`} />
      <div className="min-w-0">
        <div className="truncate text-[10px] font-medium text-zinc-800">{text}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[9.5px] font-semibold text-pink-600">
          <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
          <Counter to={likes} run={!!fresh} />
        </div>
      </div>
    </motion.div>
  );
}

function Counter({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => { const k = Math.min(1, (performance.now() - t0) / 1600); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <span className="tabular-nums">{n.toLocaleString("nl-NL")}</span>;
}

function Typed({ text, run }: { text: string; run: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(run && !reduce ? 0 : text.length);
  useEffect(() => {
    if (!run || reduce) { setN(text.length); return; }
    setN(0);
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 26);
    return () => clearInterval(id);
  }, [run, reduce, text]);
  return <span>{text.slice(0, n)}{n < text.length && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-pink-500" />}</span>;
}
