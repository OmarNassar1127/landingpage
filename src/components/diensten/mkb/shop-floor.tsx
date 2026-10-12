"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Inbox, Mail, Phone, Receipt, type LucideIcon } from "lucide-react";
import { eur } from "./data";

/**
 * Hero scene: a small isometric office. Work lands in the inbox at the front,
 * a task card slides to the agent that owns it (invoices, mail, phone), the
 * agent handles it and the savings board at the back ticks up. Same CSS 3D
 * rig as the homepage agent floor; upright parts face the viewer so every
 * label stays readable. Static under reduced motion.
 */

type Station = { name: string; role: string; result: string; icon: LucideIcon; desk: [number, number]; value: number };

// desk = top-left corner on the floor, in floor px; value = euros of staff time saved per task
const STATIONS: Station[] = [
  { name: "Facturen", role: "Maakt en verstuurt", result: "Factuur verstuurd", icon: Receipt, desk: [28, 40], value: 4 },
  { name: "Mail", role: "Beantwoordt", result: "Klant geholpen", icon: Mail, desk: [158, 40], value: 3 },
  { name: "Telefoon", role: "Neemt op", result: "Afspraak gepland", icon: Phone, desk: [288, 40], value: 5 },
];
const INBOX: [number, number] = [158, 200];

const FLOOR = { w: 420, h: 330 };
const DESK = { w: 104, h: 74 };
const STEP = 1500, HAND = 600, WORK = 650;
const BILLBOARD = "rotateZ(40deg) rotateX(-60deg)";
const UPRIGHT = "rotateX(-90deg)";
const ACCENT = "#4637d2";
const START = 2140;
const STATIC_COUNTS = [18, 41, 12];

type Phase = "hand" | "work" | "done";

const center = ([x, y]: [number, number]) => ({ x: x + DESK.w / 2, y: y + DESK.h / 2 });

export default function ShopFloor() {
  const [turn, setTurn] = useState(-1);
  const [phase, setPhase] = useState<Phase>("done");
  const [counts, setCounts] = useState<number[]>(STATIC_COUNTS);
  const saved = useMotionValue(START);
  const savedText = useTransform(saved, (v) => eur(v));
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 520)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true, k = 0, total = START;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => alive && fn(), ms));
    const next = () => {
      const i = k++ % STATIONS.length;
      setTurn(i); setPhase("hand");
      at(HAND, () => setPhase("work"));
      at(HAND + WORK, () => {
        setPhase("done");
        setCounts((c) => c.map((n, j) => (j === i ? n + 1 : n)));
        total = total > START + 400 ? START : total + STATIONS[i].value;
        animate(saved, total, { duration: 0.8, ease: "easeOut" });
      });
      at(STEP, next);
    };
    at(600, next);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [saved]);

  const from = center(INBOX);
  const to = turn >= 0 ? center(STATIONS[turn].desk) : from;
  const moving = phase !== "done";

  const desk = (s: Station, i: number) => {
    const active = i === turn && phase !== "done";
    const working = i === turn && phase === "work";
    const justDone = i === turn && phase === "done";
    const Icon = s.icon;
    return (
      <div key={s.name} className="absolute" style={{ left: s.desk[0], top: s.desk[1], width: DESK.w, height: DESK.h, transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 rounded-[10px] border transition-colors duration-300"
          style={{ background: active ? "rgba(70,55,210,0.06)" : "#f7f7f9", borderColor: active ? "rgba(70,55,210,0.4)" : "rgba(23,23,28,0.07)" }} />
        {/* monitor on the back edge */}
        <div className="absolute origin-bottom" style={{ left: 26, top: -32, width: 56, height: 36, transform: UPRIGHT }}>
          <div className="absolute inset-0 overflow-hidden rounded-[6px] border-[3px] border-zinc-200 bg-[#15161b] p-1">
            {[0, 1, 2].map((r) => (
              <div key={r} className="mb-1 h-1 rounded-full transition-all duration-500"
                style={{ width: working ? `${[78, 52, 66][r]}%` : `${[46, 30, 38][r]}%`, background: working ? ACCENT : "#34d399", opacity: working ? 0.95 : 0.55, transitionDelay: `${r * 80}ms` }} />
            ))}
          </div>
        </div>
        {/* the agent, upright and facing the viewer */}
        <div className="absolute origin-bottom" style={{ left: DESK.w / 2 - 45, top: DESK.h - 98, width: 90, height: 98, transform: BILLBOARD }}>
          <div className="absolute left-1/2 top-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold shadow-sm transition-all duration-300"
            style={{
              opacity: working || justDone ? 1 : 0,
              transform: `translate(-50%, ${working || justDone ? 0 : 6}px)`,
              background: justDone ? "#f0fdf4" : "#fff",
              borderColor: justDone ? "#bbf7d0" : "rgba(23,23,28,0.1)",
              color: justDone ? "#166534" : "#52525b",
            }}>
            {working ? (
              <span className="inline-flex gap-0.5 py-0.5">
                {[0, 1, 2].map((d) => <span key={d} className="h-1 w-1 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: `${d * 120}ms` }} />)}
              </span>
            ) : `✓ ${s.result}`}
          </div>
          <div className="absolute left-1/2 top-[24px] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white transition-shadow duration-300"
            style={{ boxShadow: `0 0 0 2px ${active ? ACCENT : "rgba(70,55,210,0.3)"}, 0 8px 18px -8px rgba(70,55,210,0.45)` }}>
            <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={2.2} />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
            <div className="text-[11px] font-semibold leading-tight text-zinc-900">{s.name}</div>
            <div className="text-[9.5px] leading-tight text-zinc-500">{s.role}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[520px]" style={{ height: 500 * scale }}>
      <div
        role="img"
        aria-label="Een klein kantoor waar AI agents facturen versturen, mail beantwoorden en de telefoon opnemen. Een teller toont de besparing van deze maand."
        className="absolute left-1/2 top-1/2"
        style={{ width: 520, height: 500, marginLeft: -260, marginTop: -250, transform: `scale(${scale})`, perspective: 2400 }}
      >
        <div className="absolute left-1/2 top-1/2"
          style={{ width: FLOOR.w, height: FLOOR.h, marginLeft: -FLOOR.w / 2, marginTop: -FLOOR.h / 2 + 50, transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-40deg)" }}>
          {/* floor */}
          <div className="absolute inset-0 rounded-[26px] border border-black/[0.07] bg-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.35)]"
            style={{ backgroundImage: "linear-gradient(rgba(70,55,210,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(70,55,210,0.05) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          {/* routes from the inbox to each desk */}
          <svg className="absolute inset-0" width={FLOOR.w} height={FLOOR.h} aria-hidden="true">
            {STATIONS.map((s, i) => {
              const c = center(s.desk);
              const lit = i === turn && moving;
              return <line key={s.name} x1={from.x} y1={from.y} x2={c.x} y2={c.y} stroke={lit ? ACCENT : "rgba(70,55,210,0.18)"} strokeWidth={lit ? 2 : 1.2} strokeDasharray="4 5" style={{ transition: "stroke 300ms" }} />;
            })}
          </svg>
          {/* savings board on the back edge */}
          <div className="absolute origin-bottom" style={{ left: FLOOR.w - 250, top: -175, width: 340, height: 132, transform: BILLBOARD }}>
            <div className="absolute inset-0 rounded-[16px] border border-black/[0.07] bg-white px-4 py-3 shadow-[0_14px_30px_-18px_rgba(70,55,210,0.4)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">Bespaard deze maand</span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Live
                </span>
              </div>
              <motion.div className="mt-1 text-[28px] font-bold tabular-nums leading-tight tracking-tight text-zinc-900">{savedText}</motion.div>
              <div className="mt-1.5 grid grid-cols-3 gap-3 border-t border-black/[0.06] pt-2">
                {STATIONS.map((s, j) => (
                  <div key={s.name}>
                    <div className="text-[15px] font-semibold tabular-nums leading-none text-zinc-900">{counts[j]}</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-zinc-500">{["facturen", "mails", "gesprekken"][j]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {STATIONS.map(desk)}
          {/* inbox tray at the front, where new work lands */}
          <div className="absolute" style={{ left: INBOX[0], top: INBOX[1], width: DESK.w, height: DESK.h, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-[10px] border border-dashed" style={{ borderColor: "rgba(70,55,210,0.35)", background: "rgba(70,55,210,0.03)" }} />
            <div className="absolute origin-bottom" style={{ left: DESK.w / 2 - 45, top: DESK.h - 64, width: 90, height: 64, transform: BILLBOARD }}>
              <div className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl border border-black/[0.07] bg-white shadow-[0_8px_18px_-8px_rgba(70,55,210,0.45)]">
                <Inbox className="h-4 w-4 text-zinc-700" strokeWidth={2.2} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <div className="text-[11px] font-semibold leading-tight text-zinc-900">Binnenkomend</div>
                <div className="text-[9.5px] leading-tight text-zinc-500">Klanten en leveranciers</div>
              </div>
            </div>
          </div>
          {/* the task card sliding from the inbox to a desk */}
          <div className="absolute rounded-[6px] border bg-white shadow-[0_6px_14px_-6px_rgba(70,55,210,0.45)]"
            style={{
              left: (moving ? to : from).x - 18, top: (moving ? to : from).y - 12, width: 36, height: 24,
              borderColor: "rgba(70,55,210,0.5)",
              opacity: moving ? 1 : 0,
              transform: `translateZ(${moving ? 6 : 0}px)`,
              transition: phase === "hand" ? `left ${HAND}ms cubic-bezier(.4,0,.2,1), top ${HAND}ms cubic-bezier(.4,0,.2,1), opacity 150ms` : "opacity 200ms",
            }}>
            <div className="m-1 h-1 w-4 rounded-full" style={{ background: ACCENT }} />
            <div className="mx-1 h-1 w-6 rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
