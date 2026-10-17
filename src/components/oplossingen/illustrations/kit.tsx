"use client";

/**
 * Illustration kit for the solution pages.
 *
 * Exemplar: Stripe's and Linear's product illustrations. Each scene is a
 * small "product moment": a real interface in miniature, white cards on a
 * quiet dotted canvas, one indigo accent, hairline borders, real copy, and
 * calm motion that plays when the scene scrolls into view and then loops.
 *
 * Every scene is one inline SVG on a 400 x 300 canvas, so it scales with its
 * container without JavaScript. A scene declares how many steps it has; each
 * part says at which step it appears. `still` renders the last step without
 * motion (overview tiles); prefers-reduced-motion does the same.
 */

import React, { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export const W = 400;
export const H = 300;
/** Top of the content area, under the window bar. */
export const TOP = 30;

export const C = {
  indigo: "#4637d2",
  indigoSoft: "#f1f0fd",
  indigoLine: "rgba(70,55,210,0.28)",
  ink: "#18181b",
  body: "#3f3f46",
  muted: "#71717a",
  faint: "#a1a1aa",
  line: "rgba(23,23,28,0.09)",
  bar: "#e9e9ee",
  canvas: "#fbfbfc",
};

export type Tone = "indigo" | "green" | "amber" | "red" | "muted" | "solid";
const TONES: Record<Tone, { fill: string; stroke: string; text: string }> = {
  indigo: { fill: C.indigoSoft, stroke: C.indigoLine, text: C.indigo },
  green: { fill: "#ecfdf5", stroke: "#a7f3d0", text: "#047857" },
  amber: { fill: "#fffbeb", stroke: "#fcd34d", text: "#b45309" },
  red: { fill: "#fef2f2", stroke: "#fca5a5", text: "#b91c1c" },
  muted: { fill: "#ffffff", stroke: C.line, text: C.muted },
  solid: { fill: C.indigo, stroke: C.indigo, text: "#ffffff" },
};
export const tone = (t: Tone) => TONES[t];

type Ctx = { step: number; still: boolean; uid: string };
const SceneCtx = createContext<Ctx>({ step: 0, still: true, uid: "vk" });
export const useStep = () => useContext(SceneCtx);

/** Rough Inter advance width, good enough to size pills around short labels. */
export const textWidth = (s: string, size: number, weight = 500) => s.length * size * (weight >= 600 ? 0.6 : 0.56);

type SceneProps = {
  /** Window title in the top bar. */
  title: string;
  /** Accessible description of what the scene shows. */
  label: string;
  /** Number of steps; the scene shows step 0..steps. */
  steps: number;
  still?: boolean;
  /** Milliseconds per step. */
  tick?: number;
  /** Milliseconds the finished scene holds before it loops. */
  hold?: number;
  children: React.ReactNode;
};

export function Scene({ title, label, steps, still = false, tick = 1000, hold = 3600, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const frozen = still || !!reduce;
  const [step, setStep] = useState(frozen ? steps : 0);
  const uid = "vk" + useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (frozen) {
      setStep(steps);
      return;
    }
    if (!inView) return;
    const wait = step >= steps ? hold : step === 0 ? 600 : tick;
    const t = window.setTimeout(() => setStep((s) => (s >= steps ? 0 : s + 1)), wait);
    return () => window.clearTimeout(t);
  }, [frozen, inView, step, steps, tick, hold]);

  return (
    <div
      ref={ref}
      role={still ? undefined : "img"}
      aria-label={still ? undefined : label}
      aria-hidden={still ? true : undefined}
      className={still ? "w-full" : "w-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_40px_80px_-48px_rgba(70,55,210,0.55)]"}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full select-none" style={{ fontFamily: "inherit" }} aria-hidden="true">
        <defs>
          <filter id={`${uid}-sh`} x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#4637d2" floodOpacity="0.09" />
          </filter>
          <pattern id={`${uid}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="rgba(70,55,210,0.12)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill={C.canvas} />
        <rect y={TOP} width={W} height={H - TOP} fill={`url(#${uid}-dots)`} />
        <rect width={W} height={TOP} fill="#ffffff" />
        <line x1="0" x2={W} y1={TOP - 0.5} y2={TOP - 0.5} stroke={C.line} />
        {[16, 28, 40].map((cx) => (
          <circle key={cx} cx={cx} cy={TOP / 2} r="3.5" fill="#e4e4e7" />
        ))}
        <text x={W / 2} y={TOP / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={C.muted}>
          {title}
        </text>
        <SceneCtx.Provider value={{ step, still: frozen, uid }}>{children}</SceneCtx.Provider>
      </svg>
    </div>
  );
}

/** Appears from step `at` on. Moves in from `dx`/`dy` with a calm ease. */
export function Show({ at, dx = 0, dy = 6, until, children }: { at: number; dx?: number; dy?: number; until?: number; children: React.ReactNode }) {
  const { step } = useStep();
  const on = step >= at && (until === undefined || step < until);
  return (
    <motion.g
      initial={false}
      animate={{ opacity: on ? 1 : 0, x: on ? 0 : dx, y: on ? 0 : dy }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.g>
  );
}

export function Txt({
  x,
  y,
  size = 11,
  weight = 500,
  color = C.ink,
  anchor = "start",
  children,
}: {
  x: number;
  y: number;
  size?: number;
  weight?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} style={{ fontVariantNumeric: "tabular-nums" }}>
      {children}
    </text>
  );
}

/** Several lines of text, `gap` apart. */
export function Lines({ x, y, lines, size = 11, gap = 14, weight = 500, color = C.body }: { x: number; y: number; lines: string[]; size?: number; gap?: number; weight?: number; color?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <Txt key={i} x={x} y={y + i * gap} size={size} weight={weight} color={color}>
          {l}
        </Txt>
      ))}
    </>
  );
}

/** A white card with a hairline border and a soft indigo shadow. */
export function Card({
  x,
  y,
  w,
  h,
  r = 10,
  t = "muted",
  flat = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  t?: Tone;
  flat?: boolean;
  children?: React.ReactNode;
}) {
  const { uid } = useStep();
  const s = tone(t);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={r} fill={s.fill} stroke={s.stroke} filter={flat ? undefined : `url(#${uid}-sh)`} />
      {children}
    </g>
  );
}

/** A grey placeholder line for text that does not need to be read. */
export function Bar({ x, y, w, h = 5, color = C.bar }: { x: number; y: number; w: number; h?: number; color?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} />;
}

/** A pill label. `x` is the left edge, or the right edge with anchor "end". */
export function Chip({ x, y, text, t = "muted", size = 9.5, anchor = "start", dot = false }: { x: number; y: number; text: string; t?: Tone; size?: number; anchor?: "start" | "end"; dot?: boolean }) {
  const s = tone(t);
  const pad = 7;
  const w = textWidth(text, size, 600) + pad * 2 + (dot ? 9 : 0);
  const h = size + 7;
  const left = anchor === "end" ? x - w : x;
  return (
    <g transform={`translate(${left} ${y})`}>
      <rect width={w} height={h} rx={h / 2} fill={s.fill} stroke={s.stroke} />
      {dot && <circle cx={pad + 2.5} cy={h / 2} r="2.5" fill={s.text} />}
      <text x={w / 2 + (dot ? 4.5 : 0)} y={h / 2 + size * 0.36} fontSize={size} fontWeight="600" fill={s.text} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

/** A chat bubble. Agent bubbles are indigo; the customer's are white. */
export function Bubble({ x, y, w, lines, from = "customer", size = 10.5 }: { x: number; y: number; w: number; lines: string[]; from?: "customer" | "agent"; size?: number }) {
  const h = 12 + lines.length * (size + 3.5);
  const agent = from === "agent";
  return (
    <Card x={x} y={y} w={w} h={h} r={9} t={agent ? "solid" : "muted"} flat={agent}>
      <Lines x={9} y={size + 5} lines={lines} size={size} gap={size + 3.5} color={agent ? "#ffffff" : C.body} />
    </Card>
  );
}

/** One table row. Cells are laid out left to right with fixed widths. */
export function Row({
  x,
  y,
  cells,
  h = 20,
  t,
  size = 10,
}: {
  x: number;
  y: number;
  cells: { text: string; w: number; align?: "start" | "end"; color?: string; weight?: number }[];
  h?: number;
  t?: Tone;
  size?: number;
}) {
  const total = cells.reduce((a, c) => a + c.w, 0);
  let cx = 0;
  return (
    <g transform={`translate(${x} ${y})`}>
      {t ? <rect width={total} height={h} rx={5} fill={tone(t).fill} stroke={tone(t).stroke} /> : <line x1="0" x2={total} y1={h - 0.5} y2={h - 0.5} stroke={C.line} />}
      {cells.map((c, i) => {
        const left = cx;
        cx += c.w;
        const tx = c.align === "end" ? left + c.w - 7 : left + 7;
        return (
          <Txt key={i} x={tx} y={h / 2 + size * 0.36} size={size} weight={c.weight ?? 500} color={c.color ?? C.body} anchor={c.align ?? "start"}>
            {c.text}
          </Txt>
        );
      })}
    </g>
  );
}

/** The agent's mark: an indigo disc with a four-point spark. */
export function AgentMark({ x, y, r = 10 }: { x: number; y: number; r?: number }) {
  const k = r * 0.55;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={C.indigo} />
      <path d={`M0 ${-k} Q${k * 0.18} ${-k * 0.18} ${k} 0 Q${k * 0.18} ${k * 0.18} 0 ${k} Q${-k * 0.18} ${k * 0.18} ${-k} 0 Q${-k * 0.18} ${-k * 0.18} 0 ${-k}Z`} fill="#fff" />
    </g>
  );
}

/** A person: a soft disc with an initial. */
export function Avatar({ x, y, initial, t = "amber", r = 10 }: { x: number; y: number; initial: string; t?: Tone; r?: number }) {
  const s = tone(t);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={s.fill} stroke={s.stroke} />
      <text y={r * 0.36} fontSize={r * 0.95} fontWeight="700" fill={s.text} textAnchor="middle">
        {initial}
      </text>
    </g>
  );
}

/** A small round check mark. */
export function Check({ x, y, r = 6, t = "green" }: { x: number; y: number; r?: number; t?: Tone }) {
  const s = tone(t);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={t === "solid" ? s.fill : s.text} />
      <path d={`M${-r * 0.42} 0 L${-r * 0.1} ${r * 0.32} L${r * 0.45} ${-r * 0.32}`} fill="none" stroke="#fff" strokeWidth={r * 0.28} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Three dots that pulse while the agent is working. Static when still. */
export function Typing({ x, y, color = C.indigo }: { x: number; y: number; color?: string }) {
  const { still } = useStep();
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 7, 14].map((dx, i) =>
        still ? (
          <circle key={dx} cx={dx} r="2.2" fill={color} opacity={0.5} />
        ) : (
          <motion.circle key={dx} cx={dx} r="2.2" fill={color} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }} />
        ),
      )}
    </g>
  );
}

/** A thin connector with an arrow head, drawn when it appears. */
export function Arrow({ d, at, color = C.indigoLine }: { d: string; at: number; color?: string }) {
  const { step, still } = useStep();
  const on = step >= at;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeDasharray="3 3"
      initial={false}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ duration: still ? 0 : 0.5 }}
    />
  );
}

/** A small glyph from lucide-react, placed inside the SVG. */
export function Glyph({ icon: Icon, x, y, s = 12, color = C.muted }: { icon: LucideIcon; x: number; y: number; s?: number; color?: string }) {
  return <Icon x={x} y={y} width={s} height={s} color={color} strokeWidth={2} />;
}

/** A horizontal meter that grows to `value` (0..1) from step `at` on. */
export function Meter({ x, y, w, value, at, h = 6, t = "indigo" }: { x: number; y: number; w: number; value: number; at: number; h?: number; t?: Tone }) {
  const { step, still } = useStep();
  const on = step >= at;
  const fill = t === "indigo" ? C.indigo : tone(t).text;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#ececf2" />
      <motion.rect
        x={x}
        y={y}
        height={h}
        rx={h / 2}
        fill={fill}
        initial={false}
        animate={{ width: on ? Math.max(h, w * value) : 0 }}
        transition={{ duration: still ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </g>
  );
}
