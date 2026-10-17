"use client";

import { Coffee } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Arrow, C, Card, Chip, Glyph, Lines, Scene, Show, Txt, Typing } from "./kit";

const T = {
  nl: {
    title: "Productteksten",
    label: "Eén product met een paar kenmerken wordt door de agent omgezet in productteksten in het Nederlands, Engels en Duits, in dezelfde toon.",
    name: "Mok, keramiek",
    sku: "Art. 2041 · 350 ml",
    attrs: ["Kleur: zand", "Vaatwasser", "350 ml"],
    tone: "Toon: warm, kort",
  },
  en: {
    title: "Product copy",
    label: "One product with a few attributes is turned by the agent into product descriptions in Dutch, English and German, in the same tone.",
    name: "Mug, ceramic",
    sku: "Item 2041 · 350 ml",
    attrs: ["Colour: sand", "Dishwasher", "350 ml"],
    tone: "Tone: warm, short",
  },
};

/** The generated copy is the product, so each sample stays in its own language. */
const OUT = [
  { code: "NL", l: ["Stevige keramische mok van 350 ml", "in zandkleur. Kan in de vaatwasser."] },
  { code: "EN", l: ["A sturdy 350 ml ceramic mug in a", "sand colour. Dishwasher safe."] },
  { code: "DE", l: ["Robuste Keramiktasse, 350 ml,", "in Sandfarbe. Spülmaschinenfest."] },
];

export default function Productteksten({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={7} still={still} tick={900}>
      <Card x={14} y={46} w={142} h={236}>
        <rect x={10} y={10} width={122} height={92} rx={8} fill="#f4f1ec" />
        <Glyph icon={Coffee} x={53} y={38} s={36} color="#a8977e" />
        <Txt x={12} y={124} size={11} weight={700}>
          {t.name}
        </Txt>
        <Txt x={12} y={140} size={9} color={C.muted}>
          {t.sku}
        </Txt>
        {t.attrs.map((a, i) => (
          <Chip key={a} x={12} y={152 + i * 20} text={a} size={8.5} />
        ))}
        <Show at={1} dy={0}>
          <Chip x={12} y={214} text={t.tone} t="indigo" size={8.5} />
        </Show>
      </Card>

      {OUT.map((o, i) => {
        const y = 46 + i * 82;
        return (
          <g key={o.code}>
            <Arrow d={`M158 ${y + 36} H170`} at={2 + i * 2} />
            <Card x={172} y={y} w={214} h={72} t={i === 0 ? "indigo" : "muted"}>
              <Chip x={10} y={10} text={o.code} t="solid" size={8.5} />
              <Show at={2 + i * 2} until={3 + i * 2} dy={0}>
                <Typing x={18} y={44} />
              </Show>
              <Show at={3 + i * 2} dy={0}>
                <Lines x={10} y={44} lines={o.l} size={9.5} gap={13} color={C.ink} />
              </Show>
            </Card>
          </g>
        );
      })}
    </Scene>
  );
}
