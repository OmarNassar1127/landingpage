"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Moon, Sun } from "lucide-react";

/**
 * Hero scene: one isometric desk where the digital employee works a 24 hour
 * clock. Tasks drop onto the inbox stack in bursts while the office is
 * closed; the agent clears them one by one into the done tray, so the inbox
 * is empty when the team walks in at 09:00. Upright parts face the viewer so
 * every label stays readable. Plain CSS 3D, one interval, static under
 * reduced motion.
 */

const FLOOR = { w: 340, h: 250 };
const DESK = { x: 50, y: 70, w: 240, h: 130 };
const TICK = 650; // ms per simulated hour
const START = 18; // loop starts when the office closes
const BURSTS: Record<number, number> = { 21: 3, 23: 2, 1: 3, 4: 2, 11: 1, 14: 2, 16: 1 };
const BILLBOARD = "rotateZ(40deg) rotateX(-60deg)"; // undoes the floor's tilt
const UPRIGHT = "rotateX(-90deg)"; // stands a part up along its bottom edge
const INDIGO = "#4637d2";
const HAIRLINE = "rgba(23,23,28,0.07)";

const isNight = (h: number) => h >= 18 || h < 9;
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

type Sim = { hour: number; queue: number[]; done: number; id: number };

/** One simulated hour: the agent clears the top task, then new tasks land. */
function step(s: Sim): Sim {
  const hour = (s.hour + 1) % 24;
  const cleared = s.queue.length > 0 ? 1 : 0;
  const queue = s.queue.slice(0, s.queue.length - cleared);
  let id = s.id;
  for (let i = 0; i < (BURSTS[hour] ?? 0); i++) queue.push(id++);
  return { hour, queue, done: hour === START ? 0 : s.done + cleared, id };
}

export default function NightDesk() {
  const reduce = !!useReducedMotion();
  // static frame for reduced motion: 03:00, two tasks waiting, six done
  const [{ hour, queue, done }, setSim] = useState<Sim>({ hour: 3, queue: [1, 2], done: 6, id: 3 });
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
    if (reduce) return;
    setSim({ hour: START, queue: [], done: 0, id: 0 });
    const timer = window.setInterval(() => setSim(step), TICK);
    return () => clearInterval(timer);
  }, [reduce]);

  const night = isNight(hour);
  const busy = queue.length > 0;

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[520px]" style={{ height: 460 * scale }}>
      <div
        role="img"
        aria-label="Een digitale medewerker aan zijn bureau, 24 uur per dag. 's Nachts stapelen taken zich op in de inbox en hij werkt ze een voor een af, zodat de inbox leeg is als het kantoor om 09:00 opengaat."
        className="absolute left-1/2 top-1/2"
        style={{ width: 520, height: 460, marginLeft: -260, marginTop: -230, transform: `scale(${scale})`, perspective: 2400 }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: FLOOR.w, height: FLOOR.h, marginLeft: -FLOOR.w / 2, marginTop: -FLOOR.h / 2 + 70, transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-40deg)" }}
        >
          {/* floor, a touch of indigo at night */}
          <div
            className="absolute inset-0 rounded-[26px] border shadow-[0_40px_80px_-40px_rgba(70,55,210,0.35)] transition-colors duration-700"
            style={{
              borderColor: HAIRLINE,
              backgroundColor: night ? "#f5f4fd" : "#ffffff",
              backgroundImage: "linear-gradient(rgba(70,55,210,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(70,55,210,0.05) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          {/* 24 hour board, standing on the back edge */}
          <div className="absolute origin-bottom" style={{ left: FLOOR.w - 250, top: -150, width: 320, height: 124, transform: BILLBOARD, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-[16px] border bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(70,55,210,0.45)]" style={{ borderColor: HAIRLINE }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {night ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-amber-500" />}
                  <span className="text-[22px] font-bold tabular-nums leading-none tracking-tight text-zinc-900">{hh(hour)}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: INDIGO }}>24/7</span>
              </div>
              <div className="mt-1 text-[10.5px] text-zinc-500">
                {night ? "Kantoor dicht, de digitale medewerker werkt door" : "Kantoor open, de inbox is bij"}
              </div>
              <div className="mt-2.5 flex gap-[2px]">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-[2px] transition-colors duration-300"
                    style={{ background: i === hour ? INDIGO : isNight(i) ? "rgba(70,55,210,0.16)" : "rgba(23,23,28,0.06)" }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Afgehandeld sinds 18:00</span>
                <span className="text-[13px] font-semibold tabular-nums text-zinc-900">{done}</span>
              </div>
            </div>
          </div>

          {/* desk */}
          <div className="absolute" style={{ left: DESK.x, top: DESK.y, width: DESK.w, height: DESK.h, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-[10px] border transition-colors duration-300" style={{ background: busy ? "rgba(70,55,210,0.05)" : "#f7f7f9", borderColor: busy ? "rgba(70,55,210,0.35)" : HAIRLINE }} />

            {/* monitor on the back edge */}
            <div className="absolute origin-bottom" style={{ left: 84, top: 8 - 46, width: 72, height: 46, transform: UPRIGHT }}>
              <div className="absolute inset-0 overflow-hidden rounded-[6px] border-[3px] border-zinc-200 bg-[#15161b] p-1">
                {[0, 1, 2].map((r) => (
                  <div key={r} className="mb-1 h-1 rounded-full transition-all duration-500"
                    style={{ width: busy ? `${[80, 55, 68][r]}%` : `${[45, 30, 38][r]}%`, background: busy ? INDIGO : "#34d399", opacity: 0.9, transitionDelay: `${r * 90}ms` }} />
                ))}
              </div>
            </div>

            {/* inbox tray with the stacked tasks */}
            <div className="absolute rounded-[6px] border border-dashed" style={{ left: 14, top: 14, width: 50, height: 34, borderColor: "rgba(70,55,210,0.3)", transformStyle: "preserve-3d" }}>
              <AnimatePresence initial={false}>
                {queue.map((id, i) => (
                  <motion.div
                    key={id}
                    className="absolute inset-[2px] rounded-[5px] border bg-white shadow-[0_4px_10px_-6px_rgba(70,55,210,0.5)]"
                    style={{ borderColor: "rgba(70,55,210,0.35)" }}
                    initial={{ opacity: 0, z: 70 }}
                    animate={{ opacity: 1, z: 4 + i * 5 }}
                    exit={{ opacity: 0, y: 68, z: 24 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  >
                    <div className="m-1 h-1 w-4 rounded-full" style={{ background: INDIGO }} />
                    <div className="mx-1 h-1 w-6 rounded-full bg-zinc-200" />
                  </motion.div>
                ))}
              </AnimatePresence>
              <Tag style={{ left: 25, top: 17 }} tone={busy ? "indigo" : "muted"}>Inbox {queue.length}</Tag>
            </div>

            {/* done tray */}
            <div className="absolute rounded-[6px] border bg-emerald-50" style={{ left: 14, top: 82, width: 50, height: 34, borderColor: "#bbf7d0", transformStyle: "preserve-3d" }}>
              <Tag style={{ left: 25, top: 17 }} tone="green">✓ {done}</Tag>
            </div>

            {/* the digital employee, facing the viewer at the front of the desk */}
            <div className="absolute origin-bottom" style={{ left: DESK.w / 2 - 35, top: DESK.h - 104, width: 110, height: 104, transform: BILLBOARD, transformStyle: "preserve-3d" }}>
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold shadow-sm transition-colors duration-300"
                style={{ background: busy ? "#fff" : "#f0fdf4", borderColor: busy ? "rgba(23,23,28,0.1)" : "#bbf7d0", color: busy ? "#52525b" : "#166534" }}
              >
                {busy ? `Bezig, nog ${queue.length}` : "✓ Inbox leeg"}
              </div>
              <div
                className="absolute left-1/2 top-[26px] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white"
                style={{ boxShadow: `0 0 0 2px ${INDIGO}${busy ? "" : "66"}, 0 8px 18px -8px rgba(70,55,210,0.5)` }}
              >
                <Bot className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <div className="text-[11px] font-semibold leading-tight text-zinc-900">Digitale medewerker</div>
                <div className="text-[9.5px] leading-tight text-zinc-500">Werkt 24 uur per dag</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A small upright label that stands on a point of the floor. */
function Tag({ children, style, tone }: { children: React.ReactNode; style: React.CSSProperties; tone: "indigo" | "green" | "muted" }) {
  const c = { indigo: ["#fff", "rgba(70,55,210,0.35)", INDIGO], green: ["#f0fdf4", "#bbf7d0", "#166534"], muted: ["#fff", HAIRLINE, "#71717a"] }[tone];
  return (
    <div className="absolute origin-bottom" style={{ ...style, width: 0, height: 34, marginTop: -34, transform: BILLBOARD }}>
      <span
        className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap rounded-full border px-1.5 py-px text-[9.5px] font-semibold tabular-nums"
        style={{ background: c[0], borderColor: c[1], color: c[2] }}
      >
        {children}
      </span>
    </div>
  );
}
