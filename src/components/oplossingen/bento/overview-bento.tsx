/**
 * The catalog as one bento: every solution as a tile with its object's still and one line.
 * Sizes vary by position. Phone: two columns, the order of the catalog. Desktop: six columns.
 */
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { HARNESS_URL, type Lang } from "@/lib/solutions";
import { has3D } from "@/components/three/registry";
import SolutionIllustration from "../illustrations";
import { Bento, DoorTile } from "./kit";

type Item = { key: string; name: string; teaser: string; href: string };
type Size = "hero" | "s" | "tall" | "wide" | "big";

// One entry per catalog position: phone size, desktop area, background.
const SLOTS: { size: Size; area: string; tone?: "dark" | "lilac" }[] = [
  { size: "hero", area: "lg:[grid-area:1/1/3/4]" },
  { size: "s", area: "lg:[grid-area:1/4/2/6]" },
  { size: "s", area: "lg:[grid-area:1/6/3/7]", tone: "dark" },
  { size: "tall", area: "lg:[grid-area:2/4/3/6]", tone: "lilac" },
  { size: "s", area: "lg:[grid-area:3/1/4/3]" },
  { size: "s", area: "lg:[grid-area:4/1/5/3]" },
  { size: "wide", area: "lg:[grid-area:3/3/5/5]" },
  { size: "s", area: "lg:[grid-area:3/5/4/7]" },
  { size: "s", area: "lg:[grid-area:4/5/5/7]", tone: "lilac" },
  { size: "wide", area: "lg:[grid-area:5/1/6/3]", tone: "dark" },
  { size: "s", area: "lg:[grid-area:5/3/6/5]" },
  { size: "s", area: "lg:[grid-area:5/5/6/7]" },
  { size: "wide", area: "lg:[grid-area:6/1/7/3]", tone: "lilac" },
];

const SPAN: Record<Size, string> = {
  hero: "col-span-2",
  big: "col-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
  s: "",
};

function Still({ item, lang, className }: { item: Item; lang: Lang; className: string }) {
  return has3D(item.key) ? (
    <img src={`/3d/${item.key}-1.webp`} alt="" width={900} height={900} loading="lazy" decoding="async" className={`select-none object-contain ${className}`} />
  ) : (
    <div className={`flex items-center ${className}`}>
      <SolutionIllustration slug={item.key} lang={lang} still />
    </div>
  );
}

export default function OverviewBento({ lang, tiles, devTitle, devText }: { lang: Lang; tiles: Item[]; devTitle: string; devText: string }) {
  return (
    <Bento>
      {tiles.map((t, i) => {
        const slot = SLOTS[i % SLOTS.length];
        const dark = slot.tone === "dark";
        const bg = dark ? "bg-[#1d1d1f]" : slot.tone === "lilac" ? "bg-[#ecebfc]" : "bg-white";
        const ink = dark ? "text-white" : "text-[#1d1d1f]";
        const sub = dark ? "text-[#a1a1a6]" : "text-[#6e6e73]";
        const side = slot.size === "wide";
        return (
          <a
            key={t.key}
            href={t.href}
            className={`group relative flex min-w-0 overflow-hidden rounded-[22px] p-4 transition-transform duration-300 hover:-translate-y-0.5 sm:p-5 lg:rounded-[28px] lg:p-6 ${bg} ${SPAN[slot.size]} ${slot.area} ${
              side ? "flex-row items-center gap-3 lg:flex-col lg:items-stretch" : "flex-col"
            }`}
          >
            <Still
              item={t}
              lang={lang}
              className={
                slot.size === "hero"
                  ? "mx-auto aspect-square w-full max-w-[320px] flex-1 lg:max-w-[420px]"
                  : side
                    ? "aspect-square w-[44%] shrink-0 lg:mx-auto lg:w-full lg:max-w-[190px]"
                    : slot.size === "tall"
                      ? "mx-auto min-h-[150px] w-full flex-1"
                      : "mx-auto aspect-square w-full max-w-[150px] lg:max-w-[132px]"
              }
            />
            <span className={`min-w-0 ${side ? "flex-1" : "mt-2"}`}>
              <span className={`flex items-center gap-1 font-semibold leading-tight tracking-tight ${slot.size === "hero" ? "text-[19px] lg:text-[24px]" : "text-[15px] lg:text-[17px]"} ${ink}`}>
                {t.name}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className={`mt-1 block text-[13px] leading-snug lg:text-[14px] ${sub} ${slot.size === "s" ? "line-clamp-3" : ""}`}>{t.teaser}</span>
            </span>
          </a>
        );
      })}

      <a
        href={HARNESS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group col-span-2 flex flex-col rounded-[22px] border border-dashed border-black/[0.15] bg-white/60 p-4 transition-colors hover:border-primary/40 sm:p-5 lg:rounded-[28px] lg:p-6 lg:[grid-area:6/3/7/5]"
      >
        <Code2 className="mb-3 h-5 w-5 text-primary" />
        <span className="text-[15px] font-semibold text-[#1d1d1f] group-hover:text-primary lg:text-[17px]">{devTitle}</span>
        <span className="mt-1 block flex-1 text-[13px] leading-snug text-[#6e6e73] lg:text-[14px]">{devText}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
          harness.omardev.xyz
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
      <DoorTile lang={lang} tone="indigo" figure className="col-span-2 lg:[grid-area:6/5/7/7]" />
    </Bento>
  );
}
