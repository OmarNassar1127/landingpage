"use client";

import { CalendarCheck } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { Avatar, C, Card, Chip, Glyph, Meter, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Screening",
    label: "Vier cv's worden gescoord tegen de eisen van een vacature. De twee beste komen op de shortlist en voor de eerste is een gesprek ingepland.",
    vacancy: "Vacature: Planner logistiek",
    reqs: ["Mbo 4", "2 jaar ervaring", "Rijbewijs B"],
    cands: ["Kandidaat A", "Kandidaat B", "Kandidaat C", "Kandidaat D"],
    why: ["Alle eisen, 4 jaar planner", "Ervaring, geen rijbewijs", "Mbo 3, 1 jaar", "Andere richting"],
    short: "Shortlist",
    booked: "Gesprek ingepland",
    slot: "Do 23 okt, 10:00",
  },
  en: {
    title: "Screening",
    label: "Four CVs are scored against the requirements of a vacancy. The top two go on the shortlist and an interview is booked with the first.",
    vacancy: "Vacancy: Logistics planner",
    reqs: ["Vocational 4", "2 yrs experience", "Driving licence"],
    cands: ["Candidate A", "Candidate B", "Candidate C", "Candidate D"],
    why: ["All criteria, 4 yrs planner", "Experience, no licence", "Level 3, 1 year", "Different field"],
    short: "Shortlist",
    booked: "Interview booked",
    slot: "Thu 23 Oct, 10:00",
  },
};

const SCORES = [92, 78, 61, 34];
const RY = [96, 144, 192, 240];

export default function Recruitment({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={7} still={still} tick={900}>
      <Card x={14} y={40} w={372} h={44}>
        <Txt x={12} y={18} size={10.5} weight={700}>
          {t.vacancy}
        </Txt>
        {t.reqs.reduce<{ x: number; el: JSX.Element[] }>(
          (acc, r) => {
            acc.el.push(<Chip key={r} x={acc.x} y={24} text={r} t="indigo" size={8.5} />);
            acc.x += r.length * 8.5 * 0.6 + 20;
            return acc;
          },
          { x: 12, el: [] },
        ).el}
      </Card>

      {t.cands.map((c, i) => {
        const s = SCORES[i];
        const tt = s >= 75 ? "indigo" : s >= 50 ? "amber" : "muted";
        return (
          <Show key={c} at={1} dy={4}>
            <Card x={14} y={RY[i]} w={250} h={40}>
              <Avatar x={18} y={20} initial={c.slice(-1)} t="muted" r={9} />
              <Txt x={34} y={17} size={9.5} weight={600}>
                {c}
              </Txt>
              <Show at={2 + i} dy={0}>
                <Txt x={34} y={31} size={8.5} color={C.muted}>
                  {t.why[i]}
                </Txt>
              </Show>
              <Meter x={170} y={12} w={50} value={s / 100} at={2 + i} t={tt} />
              <Show at={2 + i} dy={0}>
                <Txt x={240} y={17} size={10.5} weight={700} anchor="end" color={tt === "muted" ? C.muted : C.ink}>
                  {String(s)}
                </Txt>
              </Show>
              {i < 2 && (
                <Show at={6} dy={0}>
                  <Chip x={240} y={23} text={t.short} t="green" size={7.5} anchor="end" />
                </Show>
              )}
            </Card>
          </Show>
        );
      })}

      <Show at={7} dx={8} dy={0}>
        <Card x={276} y={RY[0]} w={110} h={136} t="green">
          <Glyph icon={CalendarCheck} x={12} y={12} s={16} color="#047857" />
          <Txt x={12} y={50} size={9.5} weight={700} color="#047857">
            {t.booked}
          </Txt>
          <Txt x={12} y={68} size={10} weight={600} color={C.ink}>
            {t.slot}
          </Txt>
          <Txt x={12} y={86} size={9} color={C.muted}>
            {t.cands[0]}
          </Txt>
        </Card>
      </Show>
    </Scene>
  );
}
