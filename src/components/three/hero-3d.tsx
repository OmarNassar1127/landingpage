"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { OBJECTS } from "./registry";
import { BEATS, HERO_OUT } from "./beats.js";

export type Beat = { title: string; text: string };


const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

type Stage = { setSize(w: number, h: number): void; render(p: number, t: number): void; dispose(): void; canvas: HTMLCanvasElement };

/**
 * A pinned hero: HTML copy over a three.js object that plays a short sequence as you scroll.
 * Until the first input (and always under reduced motion or without WebGL) a pre-rendered
 * still of the object stands in, at the exact place and size of the canvas.
 */
export default function Hero3D({
  slug,
  beats = [],
  children,
  label,
  boxClass = "",
  tall = true,
}: {
  slug: string;
  beats?: Beat[];
  children: ReactNode;
  label: string;
  boxClass?: string;
  tall?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current!;
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const params = new URLSearchParams(location.search);
    const still = params.get("still");
    let stage: Stage | null = null;
    let disposed = false;
    let raf = 0;
    let onScreen = true;
    let target = 0;
    let p = 0;
    let shown = -1;
    let last = performance.now();
    let lastFrame = 0;
    let floating = false;

    const showEndPoster = () => {
      const img = posterRef.current;
      if (img) img.src = `/3d/${slug}-1.webp`;
    };

    const progress = () => {
      const r = section.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return span > 1 ? clamp(-r.top / span) : 0;
    };

    // Copy: the hero lines leave as the first beat arrives; each beat holds for its window.
    const paintCopy = (q: number) => {
      const hero = heroRef.current;
      if (hero && beats.length) {
        const o = 1 - range(q, HERO_OUT[0], HERO_OUT[1]);
        hero.style.opacity = String(o);
        hero.style.transform = `translate3d(0, ${(-28 * (1 - o)).toFixed(1)}px, 0)`;
        hero.style.pointerEvents = o < 0.5 ? "none" : "";
      }
      beatRefs.current.forEach((el, i) => {
        if (!el) return;
        const [a, b] = BEATS[i];
        const inK = range(q, a, a + 0.05);
        const outK = i === beats.length - 1 ? 0 : range(q, b - 0.04, b + 0.01);
        const o = inK * (1 - outK);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(24 * (1 - inK) - 24 * outK).toFixed(1)}px, 0)`;
      });
    };

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
        console.warn("3D hero unavailable", e);
        stage = null;
        showEndPoster();
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!onScreen) return;
      target = progress();
      // Critically damped follow: no overshoot, starts from where the object is now.
      p += (target - p) * (1 - Math.exp(-dt / 0.11));
      if (Math.abs(target - p) < 0.0004) p = target;
      const moved = Math.abs(p - shown) > 0.00005;
      if (moved) paintCopy(p);
      if (!stage) {
        shown = p;
        return;
      }
      // Idle float at 30 fps after the first input; scroll changes render every frame.
      if (!moved && (!floating || now - lastFrame < 33)) return;
      lastFrame = now;
      shown = p;
      stage.render(p, floating ? now / 1000 : 0);
    }

    if (still != null) {
      boot();
      return () => {
        disposed = true;
      };
    }

    paintCopy(progress());
    if (reduced) return;

    const kick = () => {
      floating = true;
      boot();
    };
    const kinds = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    kinds.forEach((k) => window.addEventListener(k, kick, { once: true, passive: true }));
    if (window.scrollY > 0) kick(); // the reader already scrolled before hydration
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      shown = -1;
    });
    io.observe(section);
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      kinds.forEach((k) => window.removeEventListener(k, kick));
      ro.disconnect();
      io.disconnect();
      stage?.dispose();
    };
  }, [slug, beats]);

  return (
    <section
      ref={sectionRef}
      className={`relative ${tall ? "h-[280svh]" : "h-[220svh]"} motion-reduce:h-auto`}
      aria-label={label}
      data-hero3d=""
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] flex-col overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-0">
        <div className="container mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pt-[88px] sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center lg:gap-12 lg:pb-8 lg:pt-24">
          <div className="grid [grid-template-areas:'a']">
            <div ref={heroRef} className="min-w-0 [grid-area:a] will-change-transform">
              {children}
            </div>
            {beats.map((b, i) => (
              <div
                key={b.title}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="min-w-0 self-start opacity-0 [grid-area:a] will-change-transform motion-reduce:hidden lg:self-center"
              >
                <p className="mb-2 text-sm font-bold tabular-nums text-primary sm:mb-3">0{i + 1}</p>
                <p className="mb-2 text-[34px] font-bold leading-[1.05] tracking-tight [hyphens:none] text-zinc-900 sm:text-5xl lg:text-[56px]">{b.title}</p>
                <p className="max-w-md text-[15px] leading-relaxed text-zinc-500 sm:text-lg">{b.text}</p>
              </div>
            ))}
          </div>
          <div ref={boxRef} className={`relative -mx-4 min-h-[260px] flex-1 sm:mx-0 lg:aspect-square lg:h-auto lg:flex-none ${boxClass}`}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet={`/3d/${slug}-1.webp`} />
              <img
                ref={posterRef}
                src={`/3d/${slug}-0.webp`}
                alt=""
                width={1024}
                height={1024}
                decoding="async"
                className="pointer-events-none absolute inset-0 m-auto h-full w-full select-none object-contain transition-opacity duration-300"
              />
            </picture>
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
