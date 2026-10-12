"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * Three steps on one line. The line draws itself as the section scrolls
 * through the viewport, an indigo signal dot rides its tip, and each node
 * fills when the dot reaches it. Horizontal from md, vertical below; the
 * geometry is measured from the nodes so both orientations share one path.
 * Reduced motion: line drawn, dot at the end, every node filled.
 */

export type Step = { value: string; unit: string; title: string; description: string };

type Geo = { x: number; y: number; len: number; vertical: boolean; stops: number[] };

function Node({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const fill = useTransform(progress, [at - 0.04, at], [0, 1]);
  return (
    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-white dark:bg-background">
      <motion.span className="h-2.5 w-2.5 rounded-full bg-primary" style={{ opacity: fill, scale: fill }} />
    </span>
  );
}

export default function Timeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const fixed = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? fixed : smooth;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const box = list.getBoundingClientRect();
      const pts = nodeRefs.current.map((n) => {
        const r = n!.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      const first = pts[0], last = pts[pts.length - 1];
      const vertical = Math.abs(last.y - first.y) > Math.abs(last.x - first.x);
      const len = vertical ? last.y - first.y : last.x - first.x;
      const stops = pts.map((p) => (len ? (vertical ? p.y - first.y : p.x - first.x) / len : 0));
      setGeo({ x: first.x, y: first.y, len, vertical, stops });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [steps.length]);

  const travel = useTransform(progress, (p) => (geo ? p * geo.len : 0));

  return (
    <ol ref={listRef} className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      {geo && (
        <div aria-hidden="true" className="pointer-events-none absolute"
          style={geo.vertical
            ? { left: geo.x - 0.5, top: geo.y, width: 1, height: geo.len }
            : { left: geo.x, top: geo.y - 0.5, width: geo.len, height: 1 }}>
          <div className="absolute inset-0 bg-black/[0.07] dark:bg-white/10" />
          <motion.div className="absolute inset-0 bg-primary/60"
            style={geo.vertical ? { scaleY: progress, originY: 0 } : { scaleX: progress, originX: 0 }} />
          <motion.div className="absolute left-0 top-0" style={geo.vertical ? { y: travel } : { x: travel }}>
            <span className="absolute -left-[5px] -top-[5px] h-[11px] w-[11px] rounded-full bg-primary shadow-[0_0_0_4px_rgba(70,55,210,0.14),0_0_16px_2px_rgba(70,55,210,0.35)]" />
          </motion.div>
        </div>
      )}

      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-5 md:flex-col md:gap-6">
          <span ref={(el) => { nodeRefs.current[i] = el; }} className="flex md:block">
            <Node progress={progress} at={geo?.stops[i] ?? 0} />
          </span>
          <div className="min-w-0">
            <p className="mb-3 flex items-baseline gap-1.5 font-bold tabular-nums leading-none tracking-tight text-foreground">
              <span className="text-5xl sm:text-6xl">{s.value}</span>
              <span className="text-2xl text-muted-foreground sm:text-3xl">{s.unit}</span>
            </p>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="max-w-xs leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
