"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Bot, Brain, Plug, Zap, type LucideIcon } from "lucide-react";

/**
 * Hero scene for /diensten/ai-agent-bouwen: an agent assembled on an isometric
 * workbench. Four modules drop onto their slots one by one and snap in, the
 * wires light up, then a Live badge pops on the core. Same camera and
 * billboard trick as agent-floor, so every label faces the viewer. Plain CSS
 * 3D plus framer-motion, static under reduced motion.
 */

type Module = { name: string; icon: LucideIcon; at: [number, number] };

const BENCH = { w: 360, h: 300, t: 14 };
const CORE = { x: 132, y: 102, s: 96, h: 52 };
const MOD = { s: 60, h: 20 };
const MODULES: Module[] = [
  { name: "Taalmodel", icon: Brain, at: [150, 18] },
  { name: "Kennisbank", icon: BookOpen, at: [258, 120] },
  { name: "Koppelingen", icon: Plug, at: [150, 222] },
  { name: "Acties", icon: Zap, at: [42, 120] },
];
const STAGE = { w: 520, h: 440 };
const STEP = 750, LIVE_AFTER = 450, HOLD = 3200;
const BILLBOARD = "rotateZ(40deg) rotateX(-60deg)";
const INDIGO = "#4637d2";
const HAIRLINE = "rgba(23,23,28,0.07)";

/** A solid box on the bench: top face plus the two side faces the camera sees. */
function Box({ w, d, h, top, front, side, children }: {
  w: number; d: number; h: number; top: string; front: string; side: string; children?: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute origin-bottom border" style={{ left: 0, top: d - h, width: w, height: h, background: front, borderColor: HAIRLINE, transform: "rotateX(-90deg)" }} />
      <div className="absolute origin-left border" style={{ left: 0, top: 0, width: h, height: d, background: side, borderColor: HAIRLINE, transform: "rotateY(-90deg)" }} />
      <div className="absolute inset-0 rounded-[4px] border" style={{ background: top, borderColor: HAIRLINE, transform: `translateZ(${h}px)` }}>
        {children}
      </div>
    </div>
  );
}

/** An upright tag that stands on a point of the bench at height z. */
function Tag({ x, y, z, children }: { x: number; y: number; z: number; children: React.ReactNode }) {
  return (
    <div className="absolute origin-bottom" style={{ left: x - 70, top: y - 40, width: 140, height: 40, transform: `translateZ(${z}px) ${BILLBOARD}`, transformStyle: "preserve-3d" }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">{children}</div>
    </div>
  );
}

export default function AgentWorkbench() {
  const reduce = !!useReducedMotion();
  const [attached, setAttached] = useState(0);
  const [live, setLive] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / STAGE.w)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) { setAttached(MODULES.length); setLive(true); return; }
    let alive = true;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => alive && fn(), ms));
    const lap = () => {
      setAttached(0); setLive(false);
      MODULES.forEach((_, i) => at(600 + i * STEP, () => setAttached(i + 1)));
      const end = 600 + (MODULES.length - 1) * STEP + LIVE_AFTER;
      at(end, () => setLive(true));
      at(end + HOLD, lap);
    };
    lap();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [reduce]);

  const coreCenter = { x: CORE.x + CORE.s / 2, y: CORE.y + CORE.s / 2 };

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[520px]" style={{ height: STAGE.h * scale }}>
      <div
        role="img"
        aria-label="Een AI agent wordt op een werkbank gebouwd: taalmodel, kennisbank, koppelingen en acties klikken op hun plek en de agent gaat live."
        className="absolute left-1/2 top-1/2"
        style={{ width: STAGE.w, height: STAGE.h, marginLeft: -STAGE.w / 2, marginTop: -STAGE.h / 2, transform: `scale(${scale})`, perspective: 2400 }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: BENCH.w, height: BENCH.h, marginLeft: -BENCH.w / 2, marginTop: -BENCH.h / 2 + 50, transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-40deg)" }}
        >
          {/* bench thickness */}
          <div className="absolute origin-top" style={{ left: 0, top: BENCH.h, width: BENCH.w, height: BENCH.t, background: "#ececf2", transform: "rotateX(-90deg)", borderRadius: "0 0 10px 10px" }} />
          <div className="absolute origin-left" style={{ left: 0, top: 0, width: BENCH.t, height: BENCH.h, background: "#e2e2ea", transform: "rotateY(90deg)", borderRadius: "10px 0 0 10px" }} />
          {/* bench top */}
          <div
            className="absolute inset-0 rounded-[22px] border bg-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.35)]"
            style={{ borderColor: HAIRLINE, backgroundImage: "linear-gradient(rgba(70,55,210,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(70,55,210,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          {/* slots and wires */}
          <svg className="absolute inset-0" width={BENCH.w} height={BENCH.h} aria-hidden="true">
            {MODULES.map((m, i) => {
              const on = i < attached;
              const c = { x: m.at[0] + MOD.s / 2, y: m.at[1] + MOD.s / 2 };
              return (
                <g key={m.name}>
                  <rect x={m.at[0] - 3} y={m.at[1] - 3} width={MOD.s + 6} height={MOD.s + 6} rx={8} fill="none"
                    stroke={on ? "rgba(70,55,210,0.25)" : "rgba(70,55,210,0.35)"} strokeDasharray="4 4" />
                  <line x1={c.x} y1={c.y} x2={coreCenter.x} y2={coreCenter.y}
                    stroke={on ? INDIGO : "rgba(70,55,210,0.18)"} strokeWidth={on ? 2 : 1.2} strokeDasharray={on ? undefined : "4 5"}
                    style={{ transition: "stroke 300ms" }} />
                </g>
              );
            })}
          </svg>

          {/* the agent core */}
          <div className="absolute" style={{ left: CORE.x, top: CORE.y, width: CORE.s, height: CORE.s, transformStyle: "preserve-3d" }}>
            <Box w={CORE.s} d={CORE.s} h={CORE.h} top="#f4f3ff" front="#e9e7fb" side="#dddaf6">
              <div className="absolute inset-3 rounded-[10px] border border-[rgba(70,55,210,0.2)]" />
              <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                {MODULES.map((m, i) => (
                  <span key={m.name} className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
                    style={{ background: i < attached ? INDIGO : "rgba(70,55,210,0.15)" }} />
                ))}
              </div>
            </Box>
          </div>

          {/* modules dropping onto their slots */}
          {MODULES.map((m, i) => {
            const on = i < attached;
            return (
              <motion.div
                key={m.name}
                className="absolute"
                style={{ left: m.at[0], top: m.at[1], width: MOD.s, height: MOD.s, transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ z: on ? 0 : 150, opacity: on ? 1 : 0 }}
                transition={reduce ? { duration: 0 } : on ? { z: { type: "spring", stiffness: 320, damping: 17 }, opacity: { duration: 0.15 } } : { duration: 0.3 }}
              >
                <Box w={MOD.s} d={MOD.s} h={MOD.h} top="#ffffff" front="#f1f1f5" side="#e6e6ee">
                  <div className="absolute inset-2 rounded-[6px] bg-[rgba(70,55,210,0.08)]" />
                </Box>
              </motion.div>
            );
          })}

          {/* upright labels */}
          {MODULES.map((m, i) => {
            const on = i < attached;
            const Icon = m.icon;
            return (
              <Tag key={m.name} x={m.at[0] + MOD.s / 2} y={m.at[1] + MOD.s / 2} z={MOD.h + 4}>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold shadow-[0_6px_14px_-8px_rgba(70,55,210,0.45)] transition-all duration-300"
                  style={{ borderColor: on ? "rgba(70,55,210,0.3)" : HAIRLINE, color: on ? "#18181b" : "#a1a1aa", opacity: on ? 1 : 0.55 }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: on ? INDIGO : "#a1a1aa" }} strokeWidth={2.2} />
                  {m.name}
                </span>
              </Tag>
            );
          })}

          <Tag x={coreCenter.x} y={coreCenter.y} z={CORE.h + 6}>
            <span className="flex flex-col items-center gap-1.5">
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200"
                initial={false}
                animate={{ scale: live ? 1 : 0.4, opacity: live ? 1 : 0, y: live ? 0 : 6 }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 16 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </motion.span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-900 shadow-[0_10px_24px_-12px_rgba(70,55,210,0.55)] ring-1 ring-[rgba(70,55,210,0.25)]">
                <Bot className="h-4 w-4 text-primary" strokeWidth={2.2} />
                Jouw agent
              </span>
            </span>
          </Tag>
        </div>
      </div>
    </div>
  );
}
