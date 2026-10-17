"use client";

import type { Lang } from "@/lib/solutions";
import { C, Card, Check, Chip, Scene, Show, Txt, type Tone } from "./kit";

const T = {
  nl: {
    title: "Gedeelde inbox",
    label: "Een volle gedeelde inbox wordt door de agent gesorteerd in drie gelabelde banen: offertes, klachten en facturen. Bij de offertes en de klacht staat een conceptantwoord klaar.",
    inbox: "Inbox",
    empty: "Alles gesorteerd",
    mails: ["Prijs voor 40 stuks?", "Pakket kapot binnen", "Factuur september", "Offerte aanvragen", "Herinnering betaling"],
    lanes: ["Offerte", "Klacht", "Factuur"],
    draft: "Concept klaar",
  },
  en: {
    title: "Shared inbox",
    label: "A full shared inbox is sorted by the agent into three labelled lanes: quotes, complaints and invoices. Draft replies are ready for the quotes and the complaint.",
    inbox: "Inbox",
    empty: "All sorted",
    mails: ["Price for 40 units?", "Parcel arrived broken", "September invoice", "Request a quote", "Payment reminder"],
    lanes: ["Quote", "Complaint", "Invoice"],
    draft: "Draft ready",
  },
};

/** mail index -> [lane, slot] */
const ROUTE: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [2, 1],
];
const LANE_TONE: Tone[] = ["indigo", "amber", "green"];
const LANE_Y = [46, 128, 210];
const DRAFT = [0, 1, 3];

export default function Inbox({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={7} still={still} tick={850}>
      <Card x={14} y={46} w={128} h={238}>
        <Txt x={12} y={22} size={10.5} weight={700}>
          {t.inbox}
        </Txt>
        <Show at={0} until={5} dy={0}>
          <Chip x={116} y={11} text={String(5)} t="solid" anchor="end" size={9} />
        </Show>
        {t.mails.map((m, i) => (
          <Show key={m} at={0} until={i + 1} dx={14} dy={0}>
            <g transform={`translate(6 ${36 + i * 38})`}>
              <rect width={116} height={32} rx={6} fill="#fff" stroke={C.line} />
              <circle cx={10} cy={11} r={2.5} fill={C.indigo} />
              <Txt x={18} y={14} size={9} weight={600} color={C.ink}>
                {m.length > 19 ? m.slice(0, 18) + "…" : m}
              </Txt>
              <rect x={18} y={20} width={60} height={4} rx={2} fill={C.bar} />
            </g>
          </Show>
        ))}
        <Show at={6}>
          <Check x={64} y={118} r={10} />
          <Txt x={64} y={146} size={10} weight={600} color="#047857" anchor="middle">
            {t.empty}
          </Txt>
        </Show>
      </Card>

      {t.lanes.map((lane, li) => (
        <Card key={lane} x={154} y={LANE_Y[li]} w={232} h={74} t="muted">
          <Chip x={10} y={8} text={lane} t={LANE_TONE[li]} size={9} />
          {ROUTE.map(([l, slot], mi) =>
            l !== li ? null : (
              <Show key={mi} at={mi + 1} dx={-14} dy={0}>
                <g transform={`translate(10 ${30 + slot * 21})`}>
                  <rect width={212} height={18} rx={5} fill="#fafafb" stroke={C.line} />
                  <Txt x={8} y={12.5} size={9.5} color={C.ink}>
                    {t.mails[mi]}
                  </Txt>
                  {DRAFT.includes(mi) && (
                    <Show at={6} dy={0}>
                      <Chip x={208} y={2} text={t.draft} t="indigo" size={8} anchor="end" />
                    </Show>
                  )}
                </g>
              </Show>
            ),
          )}
        </Card>
      ))}
    </Scene>
  );
}
