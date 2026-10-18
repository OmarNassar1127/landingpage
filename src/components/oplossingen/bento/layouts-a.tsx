/**
 * One bento per solution. Phone: DOM order is the reading order (3D, price, product moment,
 * guarantee, open door, CTA) in two columns. Desktop: six columns, placed by lg grid areas.
 * Each page gets its own sizes, its own dark tile and its own loops.
 */
import type { Lang, Solution } from "@/lib/solutions";
import Tile3D from "@/components/three/tile-3d";
import { Bento, CtaTile, DoorTile, GuaranteeTile, PriceTile, QuoteTile, ReadOnlyTile, SceneTile } from "./kit";
import { Crm, Draft, FollowUp, Handoff, Labels, Online, Reply, Scan, Weekly } from "./moments-a";

export type BentoProps = { lang: Lang; s: Solution };
const nl = (lang: Lang) => lang === "nl";

export function KlantenserviceBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} className="col-span-2 lg:[grid-area:1/1/4/4]" boxClass="min-h-[260px]" />
      <PriceTile lang={lang} figure className="lg:[grid-area:1/6/3/7]" />
      <Online lang={lang} className="lg:[grid-area:1/4/2/6]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Beantwoordt zelf, in jouw toon" : "Answers itself, in your tone"}
        className="col-span-2 lg:[grid-area:3/4/5/7]"
      />
      <GuaranteeTile lang={lang} tone="dark" visual="tall" className="row-span-2 lg:[grid-area:4/1/5/3] lg:row-span-1" />
      <Handoff lang={lang} className="lg:[grid-area:2/4/3/6]" />
      <DoorTile lang={lang} className="lg:[grid-area:4/3/5/4]" />
      <CtaTile lang={lang} className="col-span-2 lg:[grid-area:5/1/6/7]" />
    </Bento>
  );
}

export function EigenDataBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="dark" className="col-span-2 lg:[grid-area:1/3/4/7]" boxClass="min-h-[250px]" />
      <PriceTile lang={lang} tone="soft" className="lg:[grid-area:1/1/2/3]" />
      <Weekly lang={lang} className="row-span-2 lg:[grid-area:3/1/5/3]" />
      <ReadOnlyTile lang={lang} className="lg:[grid-area:2/1/3/3]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Antwoord, met de bron erbij" : "An answer, with its source"}
        className="col-span-2 lg:[grid-area:4/3/6/6]"
      />
      <GuaranteeTile lang={lang} visual="shield" className="lg:[grid-area:4/6/5/7]" />
      <DoorTile lang={lang} className="lg:[grid-area:5/6/6/7]" />
      <CtaTile lang={lang} tone="white" className="col-span-2 lg:[grid-area:5/1/6/3]" />
    </Bento>
  );
}

export function OfferteBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="mist" strip="list" className="col-span-2 lg:[grid-area:1/4/4/7]" boxClass="min-h-[260px]" />
      <PriceTile lang={lang} tone="dark" className="col-span-2 lg:col-span-1 lg:[grid-area:2/2/3/4]" />
      <Draft lang={lang} className="row-span-2 lg:[grid-area:2/1/4/2]" />
      <QuoteTile text={s.pain} tone="soft" className="lg:[grid-area:1/1/2/4]" />
      <GuaranteeTile lang={lang} className="lg:[grid-area:3/2/4/4]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Van aanvraag naar concept" : "From request to draft"}
        className="col-span-2 lg:[grid-area:4/1/6/4]"
      />
      <DoorTile lang={lang} className="col-span-2 lg:[grid-area:4/4/5/7]" />
      <CtaTile lang={lang} title={nl(lang) ? "Eerste offerte op jouw sjabloon?" : "First quote in your template?"} className="col-span-2 lg:[grid-area:5/4/6/7]" />
    </Bento>
  );
}

export function FactuurBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} className="col-span-2 lg:[grid-area:1/2/3/5]" boxClass="min-h-[310px]" />
      <PriceTile lang={lang} tone="indigo" figure className="lg:[grid-area:1/5/2/7]" />
      <Scan lang={lang} className="lg:[grid-area:1/1/3/2]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Klaar voor akkoord in je pakket" : "Ready for approval in your package"}
        className="col-span-2 lg:[grid-area:3/1/5/4]"
      />
      <GuaranteeTile lang={lang} className="col-span-2 lg:col-span-1 lg:[grid-area:2/5/3/7]" />
      <DoorTile lang={lang} tone="soft" figure className="col-span-2 lg:col-span-1 lg:[grid-area:3/4/4/7]" />
      <CtaTile lang={lang} tone="dark" className="col-span-2 lg:[grid-area:4/4/5/7]" />
    </Bento>
  );
}

export function InboxBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} className="col-span-2 lg:[grid-area:2/1/5/4]" boxClass="min-h-[250px]" />
      <Labels lang={lang} className="col-span-2 lg:[grid-area:1/1/2/7]" />
      <PriceTile lang={lang} tone="soft" figure className="lg:[grid-area:2/4/3/5]" />
      <Reply lang={lang} className="lg:[grid-area:2/5/3/7]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Gesorteerd en toegewezen" : "Sorted and assigned"}
        className="col-span-2 lg:[grid-area:3/4/5/7]"
      />
      <GuaranteeTile lang={lang} visual="shield" className="lg:[grid-area:5/1/6/3]" />
      <DoorTile lang={lang} tone="dark" className="lg:[grid-area:5/3/6/5]" />
      <CtaTile lang={lang} className="col-span-2 lg:col-span-1 lg:[grid-area:5/5/6/7]" />
    </Bento>
  );
}

export function SalesBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="lilac" strip="list" className="col-span-2 lg:[grid-area:1/1/3/4]" boxClass="min-h-[240px]" />
      <PriceTile lang={lang} tone="indigo" figure className="row-span-2 lg:[grid-area:1/4/3/5]" />
      <FollowUp lang={lang} className="lg:[grid-area:1/5/2/7]" />
      <Crm lang={lang} className="lg:[grid-area:2/5/3/7]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Geen lead die wegzakt" : "No lead slips away"}
        className="col-span-2 lg:[grid-area:3/3/5/7]"
      />
      <GuaranteeTile lang={lang} tone="dark" className="col-span-2 lg:col-span-1 lg:[grid-area:3/1/4/3]" />
      <DoorTile lang={lang} className="col-span-2 lg:[grid-area:4/1/5/3]" />
      <CtaTile lang={lang} tone="white" className="col-span-2 lg:[grid-area:5/1/6/7]" />
    </Bento>
  );
}
