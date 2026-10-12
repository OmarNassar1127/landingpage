"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, BarChart3, Brain, Code2, Rocket, Search, type LucideIcon } from "lucide-react";

/**
 * The hero scene: the Virelio team at work on one isometric floor. Nova hands
 * a task card to each agent in turn; the agent works at its desk (monitor
 * busy, typing bubble), posts its result, and the board at the back counts
 * up. Upright parts face the viewer so every word stays readable. Plain CSS
 * 3D, one timer chain, static under reduced motion.
 */

type Lang = "nl" | "en";
type Agent = { name: string; color: string; icon: LucideIcon; role: Record<Lang, string>; result: Record<Lang, string>; desk: [number, number] };

// desk = top-left corner on the floor, in floor px
const AGENTS: Agent[] = [
  { name: "Scout", color: "#3b82f6", icon: Search, role: { nl: "Analyseert", en: "Analyses" }, result: { nl: "73% herhaalbaar", en: "73% repetitive" }, desk: [28, 40] },
  { name: "Pixel", color: "#8b5cf6", icon: BarChart3, role: { nl: "Rekent", en: "Calculates" }, result: { nl: "€4.200/mnd", en: "€4,200/mo" }, desk: [158, 40] },
  { name: "Forge", color: "#f59e0b", icon: Code2, role: { nl: "Bouwt", en: "Builds" }, result: { nl: "Chatbot gekoppeld", en: "Chatbot connected" }, desk: [288, 40] },
  { name: "Pulse", color: "#10b981", icon: Activity, role: { nl: "Monitort", en: "Monitors" }, result: { nl: "96% tevreden", en: "96% satisfied" }, desk: [28, 190] },
  { name: "Bolt", color: "#f43f5e", icon: Rocket, role: { nl: "Zet live", en: "Ships" }, result: { nl: "Live", en: "Live" }, desk: [288, 190] },
];
const NOVA: Agent = { name: "Nova", color: "#4637d2", icon: Brain, role: { nl: "Verdeelt taken", en: "Assigns tasks" }, result: { nl: "", en: "" }, desk: [158, 190] };

const KPIS = [
  { from: 0, value: 73, fmt: (n: number) => `${Math.round(n)}%`, label: { nl: "vragen automatisch", en: "tickets automated" } },
  { from: 1, value: 4200, fmt: (n: number, l: Lang) => `€${Math.round(n).toLocaleString(l === "nl" ? "nl-NL" : "en-GB")}`, label: { nl: "besparing per maand", en: "saved per month" } },
  { from: 3, value: 96, fmt: (n: number) => `${Math.round(n)}%`, label: { nl: "klanttevredenheid", en: "satisfaction" } },
];

const FLOOR = { w: 420, h: 330 };
const DESK = { w: 104, h: 74 };
const STEP = 1700, HAND = 650, WORK = 800;   // ms: per agent, card travel, work time
const BILLBOARD = "rotateZ(40deg) rotateX(-60deg)"; // undoes the floor's tilt so a part faces the viewer
const UPRIGHT = "rotateX(-90deg)";               // stands a part up along its bottom edge

type Phase = "hand" | "work" | "done";

export default function AgentFloor({ language }: { language: string }) {
  const lang: Lang = language === "en" ? "en" : "nl";
  const [turn, setTurn] = useState(-1);
  const [phase, setPhase] = useState<Phase>("done");
  const [done, setDone] = useState<boolean[]>(AGENTS.map(() => false));
  const [kpi, setKpi] = useState<number[]>(KPIS.map(() => 0));
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 560)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(AGENTS.map(() => true)); setKpi(KPIS.map((k) => k.value)); return;
    }
    let alive = true, k = 0;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => alive && fn(), ms));
    const lap = () => {
      setDone(AGENTS.map(() => false)); setKpi(KPIS.map(() => 0)); setTurn(-1); k = 0;
      at(500, next);
    };
    const next = () => {
      const i = k++;
      if (i >= AGENTS.length) { at(2600, lap); return; }
      setTurn(i); setPhase("hand");
      at(HAND, () => setPhase("work"));
      at(HAND + WORK, () => {
        setPhase("done");
        setDone((d) => d.map((x, j) => x || j === i));
        const target = KPIS.findIndex((q) => q.from === i);
        if (target >= 0) countUp(target);
      });
      at(STEP, next);
    };
    const countUp = (q: number) => {
      const t0 = performance.now();
      const tick = () => {
        if (!alive) return;
        const p = Math.min(1, (performance.now() - t0) / 900);
        setKpi((v) => v.map((x, j) => (j === q ? KPIS[q].value * (1 - Math.pow(1 - p, 3)) : x)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    lap();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const deskCenter = (a: Agent) => ({ x: a.desk[0] + DESK.w / 2, y: a.desk[1] + DESK.h / 2 });

  const desk = (a: Agent, i: number) => {
    const active = i === turn && phase !== "done";
    const working = i === turn && phase === "work";
    const finished = i >= 0 && done[i];
    const Icon = a.icon;
    return (
      <div key={a.name} className="absolute" style={{ left: a.desk[0], top: a.desk[1], width: DESK.w, height: DESK.h, transformStyle: "preserve-3d" }}>
        {/* desk top */}
        <div className="absolute inset-0 rounded-[10px] border transition-colors duration-300"
          style={{ background: active ? `${a.color}0f` : "#f7f7f9", borderColor: active ? `${a.color}66` : "rgba(23,23,28,0.07)" }} />
        {/* monitor, standing on the back edge */}
        <div className="absolute origin-bottom" style={{ left: 26, top: 4 - 36, width: 56, height: 36, transform: UPRIGHT, transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 overflow-hidden rounded-[6px] border-[3px] border-zinc-200 bg-[#15161b] p-1">
            {[0, 1, 2].map((r) => (
              <div key={r} className="mb-1 h-1 rounded-full transition-all duration-500"
                style={{ width: working ? `${[78, 52, 66][r]}%` : finished ? `${[60, 40, 50][r]}%` : "22%", background: finished && !working ? "#34d399" : a.color, opacity: working ? 0.95 : 0.6, transitionDelay: `${r * 90}ms` }} />
            ))}
            {working && <div className="absolute bottom-1 right-1.5 h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: a.color }} />}
          </div>
        </div>
        {/* the agent, facing the viewer, standing at the front of the desk */}
        <div className="absolute origin-bottom" style={{ left: DESK.w / 2 - 40, top: DESK.h - 98, width: 80, height: 98, transform: BILLBOARD, transformStyle: "preserve-3d" }}>
          {/* status bubble */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold shadow-sm transition-all duration-300"
            style={{
              opacity: working || finished ? 1 : 0,
              transform: `translate(-50%, ${working || finished ? 0 : 6}px)`,
              background: finished && !working ? "#f0fdf4" : "#fff",
              borderColor: finished && !working ? "#bbf7d0" : "rgba(23,23,28,0.1)",
              color: finished && !working ? "#166534" : "#52525b",
            }}>
            {working ? (
              <span className="inline-flex gap-0.5 py-0.5">
                {[0, 1, 2].map((d) => <span key={d} className="h-1 w-1 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: `${d * 120}ms` }} />)}
              </span>
            ) : `✓ ${a.result[lang]}`}
          </div>
          <div className="absolute left-1/2 top-[24px] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_-6px_rgba(23,23,28,0.35)] transition-transform duration-300"
            style={{ boxShadow: `0 0 0 2px ${a.color}${active ? "" : "55"}, 0 8px 18px -8px rgba(23,23,28,0.4)`, transform: `translateX(-50%) ${working ? "translateY(-2px)" : ""}` }}>
            <Icon className="h-5 w-5" style={{ color: a.color }} strokeWidth={2.2} />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
            <div className="text-[11px] font-semibold leading-tight text-zinc-900">{a.name}</div>
            <div className="text-[9.5px] leading-tight text-zinc-500">{a.role[lang]}</div>
          </div>
        </div>
      </div>
    );
  };

  // the task card Nova slides across the floor to whoever is up next
  const from = deskCenter(NOVA);
  const to = turn >= 0 ? deskCenter(AGENTS[turn]) : from;
  const card = phase === "hand" ? to : phase === "work" ? to : from;
  const moving = phase === "hand" || phase === "work";

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[560px]" style={{ height: 560 * scale }}>
      <div
        role="img"
        aria-label={lang === "nl"
          ? "Het Virelio AI-team aan het werk: Nova verdeelt taken, Scout analyseert, Pixel rekent, Forge bouwt, Pulse monitort en Bolt zet live. De resultaten tellen op."
          : "The Virelio AI team at work: Nova assigns tasks, Scout analyses, Pixel calculates, Forge builds, Pulse monitors and Bolt ships. The results add up."}
        className="absolute left-1/2 top-1/2"
        style={{ width: 560, height: 560, marginLeft: -280, marginTop: -280, transform: `scale(${scale})`, perspective: 2400 }}
      >
        <div className="absolute left-1/2 top-1/2"
          style={{ width: FLOOR.w, height: FLOOR.h, marginLeft: -FLOOR.w / 2, marginTop: -FLOOR.h / 2 + 60, transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-40deg)" }}>
          {/* floor */}
          <div className="absolute inset-0 rounded-[26px] border border-black/[0.07] bg-white shadow-[0_40px_80px_-40px_rgba(23,23,28,0.45)]"
            style={{ backgroundImage: "linear-gradient(rgba(70,55,210,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(70,55,210,0.05) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          {/* routes from Nova to every desk */}
          <svg className="absolute inset-0" width={FLOOR.w} height={FLOOR.h} aria-hidden="true">
            {AGENTS.map((a, i) => {
              const c = deskCenter(a);
              const lit = i === turn && phase !== "done";
              return <line key={a.name} x1={from.x} y1={from.y} x2={c.x} y2={c.y} stroke={lit ? a.color : "rgba(70,55,210,0.18)"} strokeWidth={lit ? 2 : 1.2} strokeDasharray="4 5" style={{ transition: "stroke 300ms" }} />;
            })}
          </svg>
          {/* results board, standing on the back edge */}
          <div className="absolute origin-bottom" style={{ left: FLOOR.w - 250, top: -175, width: 340, height: 132, transform: BILLBOARD, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-[16px] border border-black/[0.07] bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(23,23,28,0.4)]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{lang === "nl" ? "Resultaat voor de klant" : "Client results"}</span>
                <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300"
                  style={{ background: done[4] ? "#dcfce7" : "#f4f4f5", color: done[4] ? "#166534" : "#71717a" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: done[4] ? "#16a34a" : "#a1a1aa" }} />
                  {done[4] ? "Live" : lang === "nl" ? "In opbouw" : "Building"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {KPIS.map((q, j) => (
                  <div key={j}>
                    <div className="text-[22px] font-bold tabular-nums leading-none tracking-tight text-zinc-900">{q.fmt(kpi[j], lang)}</div>
                    <div className="mt-1 text-[10px] leading-tight text-zinc-500">{q.label[lang]}</div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.05]">
                      <div className="h-full rounded-full bg-[#4637d2]" style={{ width: `${(kpi[j] / q.value) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {AGENTS.map(desk)}
          {desk(NOVA, -1)}
          {/* the task card on the floor */}
          <div className="absolute rounded-[6px] border bg-white shadow-[0_6px_14px_-6px_rgba(23,23,28,0.35)]"
            style={{
              left: card.x - 18, top: card.y - 12, width: 36, height: 24,
              borderColor: turn >= 0 ? `${AGENTS[turn].color}88` : "rgba(23,23,28,0.1)",
              opacity: moving ? 1 : 0,
              transform: `translateZ(${moving ? 6 : 0}px)`,
              transition: phase === "hand" ? `left ${HAND}ms cubic-bezier(.4,0,.2,1), top ${HAND}ms cubic-bezier(.4,0,.2,1), opacity 150ms` : "opacity 200ms",
            }}>
            <div className="m-1 h-1 w-4 rounded-full" style={{ background: turn >= 0 ? AGENTS[turn].color : "#ccc" }} />
            <div className="mx-1 h-1 w-6 rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
