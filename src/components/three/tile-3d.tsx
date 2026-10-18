"use client";

import { useEffect, useRef, useState } from "react";
import { OBJECTS } from "./registry";
import { BEATS } from "./beats.js";

export type Beat = { title: string; text: string };
type Stage = { setSize(w: number, h: number): void; render(p: number, t: number): void; dispose(): void };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Where the object rests for each step: the end of that step's window. */
const REST = BEATS.map(([, b], i) => (i === BEATS.length - 1 ? 1 : b - 0.02));
const STEP_MS = 4600;
const BG = { white: "bg-white", dark: "bg-[#1d1d1f]", lilac: "bg-[#ecebfc]", mist: "bg-[#e9edf3]" };

/**
 * The slug's 3D object inside a bento tile, with its three steps underneath.
 * The steps drive the object: each step plays its beat, once through on its own, or on tap.
 * WebGL boots on the first input. Until then, under reduced motion and without WebGL,
 * a pre-rendered still stands in at the canvas's place and size.
 */
export default function Tile3D({
  slug,
  steps,
  label,
  tone = "white",
  strip = "bars",
  className = "",
  boxClass = "",
}: {
  slug: string;
  steps: Beat[];
  label: string;
  /** Tile background. */
  tone?: "white" | "dark" | "lilac" | "mist";
  /** "bars": story-style progress bars; "list": the three steps as a numbered list. */
  strip?: "bars" | "list";
  className?: string;
  boxClass?: string;
}) {
  const dark = tone === "dark";
  const tileRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef(0);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  targetRef.current = REST[active] ?? 1;

  // Walk through the steps once while the tile is on screen.
  useEffect(() => {
    if (!auto || active >= steps.length - 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearTimeout(t);
      if (e.isIntersecting) t = window.setTimeout(() => setActive((a) => Math.min(a + 1, steps.length - 1)), STEP_MS);
    }, { threshold: 0.5 });
    io.observe(tileRef.current!);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [active, auto, steps.length]);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = new URLSearchParams(location.search).get("still");
    let stage: Stage | null = null;
    let disposed = false;
    let raf = 0;
    let onScreen = true;
    let p = 0;
    let shown = -1;
    let last = performance.now();
    let lastFrame = 0;

    const resize = () => stage?.setSize(box.clientWidth, box.clientHeight);

    async function boot() {
      if (stage || disposed) return;
      try {
        const load = OBJECTS[slug];
        if (!load) throw new Error(`no object for ${slug}`);
        const [{ createStage }, mod] = await Promise.all([import("./stage.js"), load()]);
        await document.fonts.ready;
        const font = getComputedStyle(document.body).fontFamily;
        const s = (await createStage(canvas, mod.build, { font, maxDpr: still != null ? 1 : 2, preserve: still != null })) as Stage;
        if (disposed) return s.dispose();
        stage = s;
        if (still != null) {
          // scripts/posters.mjs reads this to render public/3d/<slug>-<0|1>.webp
          stage.setSize(1024, 1024);
          stage.render(Number(still), 0);
          (window as unknown as { __still: string }).__still = canvas.toDataURL("image/png");
          return;
        }
        resize();
        stage.render(p, 0);
        canvas.style.opacity = "1";
        if (posterRef.current) posterRef.current.style.opacity = "0";
      } catch (e) {
        console.warn("3D tile unavailable", e);
        stage = null;
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!onScreen || !stage) return;
      // Ease toward the step's resting pose at a calm, bounded pace.
      const d = targetRef.current - p;
      const step = Math.sign(d) * Math.min(Math.abs(d), Math.max(0.02, Math.abs(d) * 2.2) * dt * 0.55);
      p = Math.abs(d) < 0.0005 ? targetRef.current : p + step;
      const moved = Math.abs(p - shown) > 0.00005;
      // Idle float at 30 fps; a playing beat renders every frame.
      if (!moved && now - lastFrame < 33) return;
      lastFrame = now;
      shown = p;
      stage.render(p, now / 1000);
    }

    if (still != null) {
      boot();
      return () => {
        disposed = true;
      };
    }
    if (reduced) return;

    const kinds = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    kinds.forEach((k) => window.addEventListener(k, boot, { once: true, passive: true }));
    if (window.scrollY > 0) boot();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      shown = -1;
    });
    io.observe(box);
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      kinds.forEach((k) => window.removeEventListener(k, boot));
      ro.disconnect();
      io.disconnect();
      stage?.dispose();
    };
  }, [slug]);

  const ink = dark ? "text-white" : "text-[#1d1d1f]";
  const sub = dark ? "text-[#a1a1a6]" : "text-[#6e6e73]";
  const track = dark ? "bg-white/15" : "bg-[#e8e8ed]";

  return (
    <div
      ref={tileRef}
      className={`relative flex min-w-0 flex-col overflow-hidden rounded-[22px] lg:rounded-[28px] ${BG[tone]} ${className}`}
      data-tile3d=""
    >
      <div ref={boxRef} className={`relative min-h-[240px] flex-1 ${boxClass}`} role="img" aria-label={label}>
        <img
          ref={posterRef}
          src={`/3d/${slug}-${active === steps.length - 1 ? 1 : 0}.webp`}
          alt=""
          width={900}
          height={900}
          decoding="async"
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 m-auto h-full w-full select-none object-contain transition-opacity duration-300"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300" aria-hidden="true" />
      </div>

      {strip === "list" ? (
        <ol className="px-4 pb-3 sm:px-5 lg:px-6 lg:pb-5" aria-label={label}>
          {steps.map((s, i) => (
            <li key={s.title} className={`border-t py-2.5 first:border-t-0 ${dark ? "border-white/10" : "border-black/[0.06]"}`}>
              <button
                type="button"
                aria-current={i === active ? "step" : undefined}
                onClick={() => {
                  setAuto(false);
                  setActive(i);
                }}
                className="flex w-full items-baseline gap-3 text-left"
              >
                <span className={`text-[12px] font-bold tabular-nums transition-colors lg:text-[13px] ${i === active ? "text-primary" : sub}`}>0{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[15px] font-semibold leading-tight tracking-tight transition-colors lg:text-[17px] ${i === active ? ink : sub}`}>{s.title}</span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    aria-hidden={i !== active}
                  >
                    <span className={`block overflow-hidden pt-0.5 text-[13px] leading-snug lg:text-[15px] ${sub}`}>{s.text}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
          <div className="flex gap-1.5" role="tablist" aria-label={label}>
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setAuto(false);
                  setActive(i);
                }}
                className="group min-w-0 flex-1 pt-1 text-left"
              >
                <span className={`block h-[3px] overflow-hidden rounded-full ${track}`}>
                  <span
                    className={`block h-full rounded-full bg-primary transition-[width] ease-linear ${dark ? "bg-[#a5b4fc]" : ""}`}
                    style={{ width: i <= active ? "100%" : "0%", transitionDuration: i === active && auto ? "600ms" : "300ms" }}
                  />
                </span>
                <span className={`mt-1.5 block truncate text-[11px] font-semibold tabular-nums lg:text-xs ${i === active ? ink : sub}`}>
                  0{i + 1}
                  <span className="hidden lg:inline"> {s.title}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-1.5 grid [grid-template-areas:'a']">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`transition-opacity duration-500 [grid-area:a] ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={i !== active}
              >
                <h3 className={`text-[15px] font-semibold leading-tight tracking-tight lg:hidden ${ink}`}>{s.title}</h3>
                <p className={`mt-0.5 text-[13px] leading-snug lg:text-[15px] ${sub}`}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
