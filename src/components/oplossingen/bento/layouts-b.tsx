/**
 * Bentos for the second half of the catalog. Same rules as layouts-a.tsx.
 */
import type { ComponentType } from "react";
import Tile3D from "@/components/three/tile-3d";
import { Bento, CtaTile, DoorTile, GuaranteeTile, PriceTile, QuoteTile, SceneTile } from "./kit";
import { Approve, Ask, Criteria, Eu, Honest, Languages, Mark, OnlyFacts, Slot, Week } from "./moments-b";
import { EigenDataBento, FactuurBento, InboxBento, KlantenserviceBento, OfferteBento, SalesBento, type BentoProps } from "./layouts-a";

const nl = (lang: BentoProps["lang"]) => lang === "nl";

export function KennisbankBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="mist" className="col-span-2 lg:[grid-area:2/1/5/4]" boxClass="min-h-[250px]" />
      <Ask lang={lang} className="col-span-2 lg:[grid-area:1/1/2/4]" />
      <PriceTile lang={lang} className="lg:[grid-area:1/4/2/5]" />
      <Honest lang={lang} className="lg:[grid-area:1/5/2/7]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Elk antwoord verwijst naar de passage" : "Every answer points to the passage"}
        className="col-span-2 lg:[grid-area:2/4/4/7]"
      />
      <GuaranteeTile lang={lang} tone="soft" className="lg:[grid-area:4/4/5/5]" />
      <DoorTile lang={lang} className="lg:[grid-area:4/5/5/7]" />
      <CtaTile lang={lang} className="col-span-2 lg:[grid-area:5/1/6/7]" />
    </Bento>
  );
}

export function RecruitmentBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} strip="list" className="col-span-2 lg:[grid-area:1/3/4/7]" boxClass="min-h-[240px]" />
      <Criteria lang={lang} className="row-span-2 lg:[grid-area:1/1/3/3]" />
      <PriceTile lang={lang} figure className="lg:[grid-area:3/1/4/3]" />
      <Slot lang={lang} tone="dark" className="lg:[grid-area:4/1/5/2]" />
      <GuaranteeTile lang={lang} visual="shield" className="lg:[grid-area:4/2/5/4]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Voorselectie, met uitleg" : "Shortlist, with reasons"}
        className="col-span-2 lg:[grid-area:4/4/6/7]"
      />
      <DoorTile lang={lang} tone="soft" className="lg:[grid-area:5/1/6/2]" />
      <CtaTile lang={lang} className="col-span-2 lg:[grid-area:5/2/6/4]" />
    </Bento>
  );
}

export function ContractBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} className="col-span-2 lg:[grid-area:1/1/4/3]" boxClass="min-h-[300px]" />
      <PriceTile lang={lang} className="lg:[grid-area:3/3/4/5]" />
      <Eu lang={lang} className="lg:[grid-area:3/5/4/7]" />
      <Mark lang={lang} className="col-span-2 lg:[grid-area:1/3/3/7]" />
      <GuaranteeTile lang={lang} className="lg:[grid-area:4/1/5/3]" />
      <DoorTile lang={lang} className="lg:[grid-area:4/3/5/5]" />
      <CtaTile lang={lang} className="col-span-2 lg:[grid-area:4/5/5/7]" />
    </Bento>
  );
}

export function ProducttekstenBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="mist" strip="list" className="col-span-2 lg:[grid-area:1/2/3/5]" boxClass="min-h-[240px]" />
      <PriceTile lang={lang} tone="indigo" className="col-span-2 lg:[grid-area:1/5/2/7]" />
      <Languages lang={lang} className="lg:[grid-area:1/1/2/2]" />
      <OnlyFacts lang={lang} className="lg:[grid-area:2/1/3/2]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Jij keurt per batch goed" : "You approve per batch"}
        className="col-span-2 lg:[grid-area:2/5/4/7]"
      />
      <GuaranteeTile lang={lang} tone="soft" className="lg:[grid-area:3/1/4/3]" />
      <QuoteTile text={s.pain} className="lg:[grid-area:3/3/4/5]" />
      <DoorTile lang={lang} className="col-span-2 lg:[grid-area:4/5/5/7]" />
      <CtaTile lang={lang} tone="dark" className="col-span-2 lg:[grid-area:4/1/5/5]" />
    </Bento>
  );
}

export function PlanningBento({ lang, s }: BentoProps) {
  return (
    <Bento id="hoe-het-werkt">
      <Tile3D slug={s.slug} steps={s.steps} label={s.name} tone="lilac" className="col-span-2 lg:[grid-area:2/1/5/4]" boxClass="min-h-[250px]" />
      <PriceTile lang={lang} figure className="lg:[grid-area:1/5/3/7]" />
      <Approve lang={lang} className="lg:[grid-area:2/4/3/5]" />
      <Week lang={lang} className="col-span-2 lg:[grid-area:1/1/2/5]" />
      <SceneTile
        lang={lang}
        slug={s.slug}
        title={nl(lang) ? "Volgens jouw regels" : "By your rules"}
        className="col-span-2 lg:[grid-area:3/4/5/7]"
      />
      <GuaranteeTile lang={lang} tone="indigo" className="lg:[grid-area:5/1/6/4]" />
      <DoorTile lang={lang} className="lg:[grid-area:5/4/6/5]" />
      <CtaTile lang={lang} tone="white" className="col-span-2 lg:[grid-area:5/5/6/7]" />
    </Bento>
  );
}

export const BENTOS: Record<string, ComponentType<BentoProps>> = {
  "klantenservice-agent": KlantenserviceBento,
  "ai-op-je-eigen-data": EigenDataBento,
  "offerte-agent": OfferteBento,
  factuurverwerking: FactuurBento,
  "inbox-agent": InboxBento,
  "sales-opvolging": SalesBento,
  "kennisbank-assistent": KennisbankBento,
  "recruitment-screening": RecruitmentBento,
  "contract-check": ContractBento,
  productteksten: ProducttekstenBento,
  "planning-agent": PlanningBento,
};
