"use client";

import React, { useEffect, useRef } from "react";
import { HQ_AGENTS } from "@/lib/agent-hq";

/** What each agent delivers once its task is done: the same story the agent chat told. */
const RESULTS = {
  nl: ["73% herhaalbare vragen", "€4.200/mnd besparing", "Chatbot gekoppeld", "96% tevreden", "Live voor de klant", "Taken verdeeld"],
  en: ["73% repetitive tickets", "€4,200/mo saved", "Chatbot connected", "96% satisfied", "Live for the client", "Tasks assigned"],
};

const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

/**
 * The agent team at work in 3D. three.js loads once the stage nears the
 * viewport, the loop pauses offscreen, and reduced motion gets one still frame
 * with every task done.
 */
export default function AgentHQ({ language }: { language: string }) {
  const lang = language === "en" ? "en" : "nl";
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current;
    if (!stage || !canvas) return;
    let dispose: (() => void) | null = null, cancelled = false;
    const shown: string[] = [];

    const start = async () => {
      const [THREE, { createAgentHQ }] = await Promise.all([import("three"), import("@/lib/agent-hq")]);
      if (cancelled) return;
      const hq = createAgentHQ(THREE, canvas, {
        language: lang,
        onLabels: (labels) => labels.forEach((l, i) => {
          const tag = tagRefs.current[i];
          if (!tag) return;
          const a = HQ_AGENTS[i];
          const text = l.done ? RESULTS[lang][i] : a[lang];
          const key = text + l.done;
          if (shown[i] !== key) {
            shown[i] = key;
            const label = tag.querySelector("[data-text]");
            if (label) label.textContent = text;
            tag.dataset.done = String(l.done);
          }
          const w = tag.offsetWidth, x = Math.max(4, Math.min(canvas.clientWidth - w - 4, l.x - w / 2));
          tag.style.transform = `translate(${x}px, ${l.y}px)`;
          tag.style.opacity = "1";
        }),
      });
      const fit = () => hq.size(canvas.clientWidth, canvas.clientHeight);
      fit();
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Start mid-run so the first frame already shows the team at work.
      let frame = 0, visible = true, t0 = performance.now() - 3000;
      const loop = (now: number) => { hq.renderAt((now - t0) / 1000); frame = visible ? requestAnimationFrame(loop) : 0; };
      if (still) setTimeout(() => hq.renderAt(7.4), 300);
      else frame = requestAnimationFrame(loop);
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !frame && !still) { t0 = performance.now() - 3000; frame = requestAnimationFrame(loop); }
      });
      io.observe(stage);
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        hq.pointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", fit);
      dispose = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", fit);
        hq.dispose();
      };
    };

    const gate = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      gate.disconnect();
      start();
    }, { rootMargin: "200px" });
    gate.observe(stage);
    return () => { cancelled = true; gate.disconnect(); dispose?.(); };
  }, [lang]);

  return (
    <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={lang === "nl"
          ? "Het Virelio AI-team aan het werk: Nova verdeelt een klantvraag, Scout analyseert, Pixel rekent, Forge bouwt, Pulse monitort en Bolt zet live."
          : "The Virelio AI team at work: Nova splits a client request, Scout analyses, Pixel calculates, Forge builds, Pulse monitors and Bolt launches."}
        className="block h-full w-full"
      />
      {HQ_AGENTS.map((a, i) => (
        <div
          key={a.name}
          ref={(el) => { tagRefs.current[i] = el; }}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border/60 bg-background/95 py-0.5 pl-1.5 pr-2.5 text-[11px] font-medium text-foreground shadow-sm transition-colors duration-300 data-[done=true]:border-emerald-200 data-[done=true]:bg-emerald-50 data-[done=true]:text-emerald-800"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex(a.color) }} />
          <span className="font-semibold">{a.name}</span>
          <span data-text>{a[lang]}</span>
        </div>
      ))}
    </div>
  );
}
