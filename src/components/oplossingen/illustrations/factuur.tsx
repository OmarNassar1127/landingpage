"use client";

import type { Lang } from "@/lib/solutions";
import { AgentMark, Arrow, Bar, C, Card, Check, Chip, Row, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Factuurverwerking",
    label: "Een foto van een inkoopfactuur. De agent leest factuurnummer, datum, btw en totaal uit en zet de boekingsregels klaar voor je boekhoudpakket.",
    photo: "FACTUUR",
    supplier: "Leverancier",
    fields: [
      ["Factuurnr.", "2026-0417"],
      ["Datum", "14-10-2026"],
      ["Btw 21%", "€252,00"],
      ["Totaal", "€1.452,00"],
    ],
    head: "Boekingsregels",
    lines: [
      ["4500", "Inkoop", "€1.200,00"],
      ["1520", "Voorbelasting", "€252,00"],
      ["1600", "Crediteur", "€1.452,00"],
    ],
    meta: "Factuur 2026-0417 · 14 okt",
    ready: "Klaar om te boeken",
  },
  en: {
    title: "Invoice processing",
    label: "A photo of a purchase invoice. The agent reads the invoice number, date, VAT and total and prepares the booking lines for your accounting software.",
    photo: "INVOICE",
    supplier: "Supplier",
    fields: [
      ["Invoice no.", "2026-0417"],
      ["Date", "14-10-2026"],
      ["VAT 21%", "€252.00"],
      ["Total", "€1,452.00"],
    ],
    head: "Booking lines",
    lines: [
      ["4500", "Purchases", "€1,200.00"],
      ["1520", "Input VAT", "€252.00"],
      ["1600", "Payables", "€1,452.00"],
    ],
    meta: "Invoice 2026-0417 · 14 Oct",
    ready: "Ready to book",
  },
};

const FY = [112, 136, 200, 224];

export default function Factuur({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={7} still={still} tick={900}>
      {/* the photo, slightly turned like a picture taken on a desk */}
      <g transform="rotate(-3 92 165)">
        <Card x={20} y={46} w={150} h={236} r={6}>
          <Txt x={14} y={26} size={12} weight={800} color={C.ink}>
            {t.photo}
          </Txt>
          <Txt x={14} y={42} size={9} color={C.muted}>
            {t.supplier}
          </Txt>
          <Bar x={92} y={18} w={44} h={10} color="#ececf2" />
          {t.fields.map(([k, v], i) => (
            <g key={k}>
              <Txt x={14} y={FY[i] - 46 + 4} size={9} color={C.muted}>
                {k}
              </Txt>
              <Txt x={136} y={FY[i] - 46 + 4} size={9.5} weight={600} anchor="end">
                {v}
              </Txt>
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Bar x={14} y={110 + i * 14} w={70 - i * 10} color="#ededf1" />
              <Bar x={112} y={110 + i * 14} w={24} color="#ededf1" />
            </g>
          ))}
          {t.fields.map(([k], i) => (
            <Show key={k} at={1 + i} dy={0}>
              <rect x={8} y={FY[i] - 46 - 9} width={134} height={18} rx={4} fill="rgba(70,55,210,0.08)" stroke={C.indigo} strokeWidth="1.2" />
            </Show>
          ))}
        </Card>
      </g>

      <Arrow d="M176 165 H200" at={4} />
      <Show at={4} dy={0}>
        <AgentMark x={188} y={165} r={9} />
      </Show>

      <Card x={208} y={46} w={178} h={236}>
        <Txt x={12} y={24} size={11} weight={700}>
          {t.head}
        </Txt>
        <Txt x={12} y={40} size={9} color={C.muted}>
          {t.meta}
        </Txt>
        {t.lines.map(([acc, d, a], i) => (
          <Show key={acc} at={5 + Math.min(i, 1)}>
            <Row
              x={4}
              y={56 + i * 30}
              h={30}
              size={9.5}
              cells={[
                { text: acc, w: 36, color: C.indigo, weight: 600 },
                { text: d, w: 72 },
                { text: a, w: 62, align: "end", color: C.ink, weight: 600 },
              ]}
            />
          </Show>
        ))}
        <Show at={7}>
          <Chip x={12} y={164} text={t.ready} t="green" dot />
          <Check x={160} y={22} r={7} />
        </Show>
      </Card>
    </Scene>
  );
}
