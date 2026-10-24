import { ArrowDown, ArrowRight, BedDouble, Shirt, ShoppingBag } from "lucide-react";
import { productExamples } from "@/lib/blog-webshop";

const ICONS = [ShoppingBag, BedDouble, Shirt];

/** Hero: one webshop product card whose description slides from the supplier text to the new one. */
export function ProductHero() {
  const ex = productExamples[0];
  return (
    <div className="relative mx-auto max-w-[400px]">
      <div aria-hidden="true" className="absolute -inset-6 -z-0 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(99,91,255,0.18),transparent)]" />
      <div className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_40px_80px_-40px_rgba(70,55,210,0.45)]">
        <div className="flex h-24 items-center justify-center bg-gradient-to-br from-[#e9eaf3] to-[#d9dcec] sm:h-44">
          <ShoppingBag className="h-12 w-12 text-[#7c7fa6] sm:h-16 sm:w-16" strokeWidth={1.2} />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">Slim fit chino</p>
            {/* Voor / Na switch, the indicator slides with the text */}
            <span aria-hidden="true" className="relative grid grid-cols-2 rounded-full bg-[#f5f5f7] p-0.5 text-[11px] font-semibold">
              <span className="bx-pill absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-[#1d1d1f]" />
              <span className="bx-voor-label relative z-10 px-2.5 py-1 text-center">Voor</span>
              <span className="bx-na-label relative z-10 px-2.5 py-1 text-center">Na</span>
            </span>
          </div>
          <div className="mt-3 grid text-[13.5px] leading-relaxed">
            <p className="bx-voor col-start-1 row-start-1 italic text-[#8e8e93]">
              <span className="sr-only">Voor: </span>
              {ex.before}
            </p>
            <p className="bx-na col-start-1 row-start-1 text-[#1d1d1f]">
              <span className="sr-only">Na: </span>
              {ex.after}
            </p>
          </div>
          <span aria-hidden="true" className="mt-4 flex h-10 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
            In winkelwagen
          </span>
        </div>
      </div>
    </div>
  );
}

/** Three real before/after pairs as product cards: grey supplier text, then the new text. */
export function ProductExamples() {
  return (
    <div className="grid gap-4 lg:gap-5">
      {productExamples.map((ex, i) => {
        const Icon = ICONS[i];
        return (
          <article key={ex.tag} className="rounded-[24px] bg-[#f5f5f7] p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <h3 className="text-[15px] font-semibold text-[#1d1d1f]">{ex.product}</h3>
              <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6e6e73]">{ex.tag}</span>
            </div>
            <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-3">
              <div className="rounded-2xl border border-black/[0.05] bg-white/60 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93]">Voor</span>
                <p className="mt-1.5 text-[13.5px] italic leading-relaxed text-[#8e8e93]">{ex.before}</p>
              </div>
              <span aria-hidden="true" className="flex items-center justify-center text-primary">
                <ArrowDown className="h-5 w-5 md:hidden" />
                <ArrowRight className="hidden h-5 w-5 md:block" />
              </span>
              <div className="rounded-2xl border border-primary/30 bg-white p-4 shadow-[0_24px_50px_-36px_rgba(70,55,210,0.6)]">
                <span className="inline-flex rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">Na</span>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#1d1d1f]">{ex.after}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
