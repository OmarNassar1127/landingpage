"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * The hero diagram: three isometric glass layers. Your systems at the bottom,
 * the Virelio agents in the middle, results on top. Every few seconds one
 * agent picks up work: a signal rises from a system into the agent, the agent
 * lights up, and the signal carries on into the result it moves. Plain CSS 3D
 * with real text, one rAF-free timer, static under reduced motion.
 */

const SYSTEMS = ["HubSpot", "Zendesk", "Shopify", "Exact Online", "WhatsApp", "E-mail"];

const AGENTS = [
  { name: "Scout", color: "#3b82f6", nl: "Analyseert vragen", en: "Analyses tickets" },
  { name: "Pixel", color: "#8b5cf6", nl: "Berekent besparing", en: "Calculates savings" },
  { name: "Forge", color: "#f59e0b", nl: "Bouwt koppelingen", en: "Builds integrations" },
  { name: "Pulse", color: "#10b981", nl: "Monitort gesprekken", en: "Monitors conversations" },
  { name: "Bolt", color: "#f43f5e", nl: "Zet live", en: "Ships to production" },
  { name: "Nova", color: "#4637d2", nl: "Coördineert het team", en: "Coordinates the team" },
];

// The same numbers the site's agent story already tells.
const RESULTS = [
  { value: 73, prefix: "", suffix: "%", nl: "vragen automatisch", en: "tickets automated" },
  { value: 4200, prefix: "€", suffix: "", nl: "besparing per maand", en: "saved per month" },
  { value: 96, prefix: "", suffix: "%", nl: "klanttevredenheid", en: "satisfaction" },
];

const STEP = 1400;            // ms per agent
const RISE = 520;             // ms for a signal to climb one layer
const LAYER = 205;            // px between layers: far enough apart that no layer hides another
const SIZE = 330;             // px, a layer's side

function fmt(n: number, lang: "nl" | "en") {
  return Math.round(n).toLocaleString(lang === "nl" ? "nl-NL" : "en-GB");
}

export default function AgentStack({ language }: { language: string }) {
  const lang = language === "en" ? "en" : "nl";
  const [active, setActive] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "in" | "work" | "out">("idle");
  const [values, setValues] = useState<number[]>(RESULTS.map(() => 0));
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // fit the fixed-size diagram to its column
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 540)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(5); setPhase("work"); setValues(RESULTS.map((r) => r.value));
      return;
    }
    let step = 0, alive = true;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => alive && fn(), ms));
    const run = () => {
      const k = step % AGENTS.length;
      setActive(k); setPhase("in");
      at(RISE, () => setPhase("work"));
      at(RISE + 420, () => setPhase("out"));
      at(RISE * 2 + 420, () => {
        setPhase("idle");
        // each finished agent moves its result a third of the way, so the first lap counts up
        setValues((v) => v.map((x, i) => (i === k % 3 ? Math.min(RESULTS[i].value, x + RESULTS[i].value / 2) : x)));
      });
      step++;
      at(STEP, run);
    };
    at(600, run);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const col = (i: number) => i % 3, row = (i: number) => Math.floor(i / 3);
  const cell = { w: 92, h: 70, gx: 12, gy: 14 };
  const x0 = (SIZE - (cell.w * 3 + cell.gx * 2)) / 2, y0 = 74;
  const pos = (i: number) => ({ left: x0 + col(i) * (cell.w + cell.gx), top: y0 + row(i) * (cell.h + cell.gy) });
  const center = (i: number) => { const p = pos(i); return { x: p.left + cell.w / 2, y: p.top + cell.h / 2 }; };
  const kpiCenter = (i: number) => ({ x: x0 + i * (cell.w + cell.gx) + cell.w / 2, y: y0 + 60 });

  const plane = (z: number, children: React.ReactNode, label: string) => (
    <div
      className="absolute left-0 top-0 rounded-[22px] border border-black/[0.07] bg-white shadow-[0_30px_60px_-30px_rgba(23,23,28,0.35)]"
      style={{ width: SIZE, height: SIZE, transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
    >
      <div className="absolute left-5 top-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {label}
      </div>
      {children}
    </div>
  );

  // a vertical connector from (x, y) on one layer up to the next, with a travelling signal
  const riser = (key: string, x: number, y: number, z: number, lit: boolean, moving: boolean) => (
    <div key={key} className="absolute" style={{ left: x, top: y, transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}>
      <div
        className="absolute left-0 top-0 w-px origin-top"
        style={{
          height: LAYER, transform: "rotateX(90deg)",
          background: lit ? "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0.15))" : "rgba(23,23,28,0.10)",
          transition: "background 300ms",
        }}
      />
      <div
        className="absolute -left-[4px] -top-[4px] h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.18)]"
        style={{
          opacity: moving ? 1 : 0,
          transform: `translateZ(${moving ? LAYER : 0}px)`,
          transition: moving ? `transform ${RISE}ms cubic-bezier(.4,0,.2,1), opacity 120ms` : "opacity 120ms",
        }}
      />
    </div>
  );

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[560px]" style={{ height: 660 * scale }}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: 540, height: 660, marginLeft: -270, marginTop: -330, transform: `scale(${scale})`, perspective: 2400 }}
        aria-label={lang === "nl"
          ? "Schema: jouw systemen onderaan, Virelio AI-agents in het midden, resultaten bovenaan."
          : "Diagram: your systems at the bottom, Virelio AI agents in the middle, results on top."}
        role="img"
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 + 175, transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-40deg)" }}
        >
          {/* layer 1: your systems */}
          {plane(0, SYSTEMS.map((s, i) => {
            const lit = i === active && phase === "in";
            return (
              <div key={s} className="absolute flex items-center justify-center rounded-xl border text-[12px] font-medium transition-colors duration-300"
                style={{ ...pos(i), width: cell.w, height: cell.h, borderColor: lit ? "hsl(var(--primary) / 0.5)" : "rgba(23,23,28,0.08)", background: lit ? "hsl(var(--primary) / 0.06)" : "#fafafb", color: "#3f3f46" }}>
                {s}
              </div>
            );
          }), lang === "nl" ? "Jouw systemen" : "Your systems")}

          {AGENTS.map((_, i) => riser(`a${i}`, center(i).x, center(i).y, 0, i === active && phase !== "idle", i === active && phase === "in"))}

          {/* layer 2: the agents */}
          {plane(LAYER, AGENTS.map((a, i) => {
            const on = i === active && (phase === "work" || phase === "out" || phase === "in");
            return (
              <div key={a.name} className="absolute rounded-xl border px-2.5 py-2 transition-all duration-300"
                style={{ ...pos(i), width: cell.w, height: cell.h, borderColor: on ? a.color : "rgba(23,23,28,0.08)", background: on ? "#fff" : "#fafafb", boxShadow: on ? `0 0 0 4px ${a.color}22` : "none" }}>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    {on && <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: a.color }} />}
                    <span className="relative h-2 w-2 rounded-full" style={{ background: a.color }} />
                  </span>
                  <span className="text-[12px] font-semibold text-foreground">{a.name}</span>
                </div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground">{a[lang]}</div>
              </div>
            );
          }), "Virelio agents")}

          {AGENTS.map((_, i) => riser(`r${i}`, center(i).x, center(i).y, LAYER, i === active && (phase === "out"), i === active && phase === "out"))}

          {/* layer 3: results */}
          {plane(LAYER * 2, RESULTS.map((r, i) => {
            const on = active >= 0 && i === active % 3 && phase === "out";
            return (
              <div key={i} className="absolute rounded-xl border px-3 py-3 transition-all duration-300"
                style={{ left: kpiCenter(i).x - cell.w / 2, top: y0, width: cell.w, height: 150, borderColor: on ? "hsl(var(--primary) / 0.5)" : "rgba(23,23,28,0.08)", background: "#fff", boxShadow: on ? "0 0 0 4px hsl(var(--primary) / 0.12)" : "none" }}>
                <div className="text-[22px] font-bold tabular-nums tracking-tight text-foreground">{r.prefix}{fmt(values[i], lang)}{r.suffix}</div>
                <div className="mt-1 text-[10px] leading-tight text-muted-foreground">{r[lang]}</div>
                <div className="absolute bottom-3 left-3 right-3 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                  <div className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${(values[i] / r.value) * 100}%` }} />
                </div>
              </div>
            );
          }), lang === "nl" ? "Resultaat" : "Results")}
        </div>
      </div>
    </div>
  );
}
