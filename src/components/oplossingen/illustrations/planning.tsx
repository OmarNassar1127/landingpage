"use client";

import type { Lang } from "@/lib/solutions";
import { AgentMark, C, Card, Check, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Rooster week 43",
    label: "Een weekrooster vult zichzelf dag voor dag. Daan meldt zich ziek voor woensdag; de agent zet Noor op die dienst en laat iedereen het weten.",
    days: ["Ma", "Di", "Wo", "Do", "Vr"],
    early: "Vroeg",
    late: "Laat",
    sick: "Daan meldt zich ziek voor wo",
    fixed: "Noor neemt over, team ingelicht",
    msg: "Melding 07:10",
    solved: "Opgelost 07:11",
  },
  en: {
    title: "Roster week 43",
    label: "A weekly roster fills itself in day by day. Daan calls in sick for Wednesday; the agent moves Noor onto that shift and lets everyone know.",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    early: "Early",
    late: "Late",
    sick: "Daan calls in sick for Wed",
    fixed: "Noor takes over, team notified",
    msg: "Message 07:10",
    solved: "Solved 07:11",
  },
};

const PEOPLE = ["Sanne", "Daan", "Noor", "Joris"];
/** [person, day, early?] */
const SHIFTS: [number, number, boolean][] = [
  [0, 0, true], [1, 0, false], [2, 1, true], [3, 1, false],
  [1, 2, true], [0, 2, false], [3, 3, true], [2, 3, false],
  [0, 4, true], [3, 4, false],
];
const GX = 66;
const CWD = 63;
const RY = [62, 102, 142, 182];

function Shift({ p, d, early, label, t = "indigo" }: { p: number; d: number; early: boolean; label: string; t?: "indigo" | "red" | "green" }) {
  const fill = t === "red" ? "#fef2f2" : t === "green" ? "#ecfdf5" : early ? C.indigo : C.indigoSoft;
  const stroke = t === "red" ? "#fca5a5" : t === "green" ? "#6ee7b7" : early ? C.indigo : C.indigoLine;
  const color = t === "red" ? "#b91c1c" : t === "green" ? "#047857" : early ? "#fff" : C.indigo;
  return (
    <g transform={`translate(${GX + d * CWD + 3} ${RY[p] + 4})`}>
      <rect width={CWD - 6} height={26} rx={6} fill={fill} stroke={stroke} />
      <Txt x={(CWD - 6) / 2} y={16.5} size={9} weight={600} color={color} anchor="middle">
        {label}
      </Txt>
      {t === "red" && <line x1="8" x2={CWD - 14} y1="13" y2="13" stroke="#b91c1c" strokeWidth="1.2" />}
    </g>
  );
}

export default function Planning({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={8} still={still} tick={800}>
      <Card x={10} y={38} w={380} h={180} flat>
        {t.days.map((d, i) => (
          <Txt key={d} x={GX + i * CWD + CWD / 2} y={17} size={9} weight={600} color={C.muted} anchor="middle">
            {d}
          </Txt>
        ))}
      </Card>
      {PEOPLE.map((p, i) => (
        <g key={p}>
          <line x1="16" x2="384" y1={RY[i] - 1} y2={RY[i] - 1} stroke={C.line} />
          <Txt x={20} y={RY[i] + 21} size={9.5} weight={600}>
            {p}
          </Txt>
        </g>
      ))}

      {SHIFTS.map(([p, d, early]) => {
        const isSick = p === 1 && d === 2;
        return (
          <g key={`${p}-${d}`}>
            <Show at={d + 1} until={isSick ? 6 : undefined} dy={-6}>
              <Shift p={p} d={d} early={early} label={early ? t.early : t.late} />
            </Show>
            {isSick && (
              <>
                <Show at={6} until={7} dy={0}>
                  <Shift p={p} d={d} early={early} label={early ? t.early : t.late} t="red" />
                </Show>
                <Show at={7} dy={-6}>
                  <Shift p={2} d={d} early={early} label={early ? t.early : t.late} t="green" />
                </Show>
              </>
            )}
          </g>
        );
      })}
      <line x1={GX - 3} x2={GX - 3} y1={RY[0] - 1} y2={RY[3] + 34} stroke={C.line} />

      <Show at={6} dy={6}>
        <Card x={10} y={228} w={186} h={58} t="red">
          <Txt x={10} y={20} size={8.5} weight={700} color="#b91c1c">
            {t.msg}
          </Txt>
          <Txt x={10} y={38} size={9.5} color={C.ink}>
            {t.sick}
          </Txt>
        </Card>
      </Show>
      <Show at={7} dy={6}>
        <Card x={204} y={228} w={186} h={58} t="green">
          <AgentMark x={16} y={16} r={6.5} />
          <Check x={172} y={16} r={6} />
          <Txt x={28} y={20} size={8.5} weight={700} color="#047857">
            {t.solved}
          </Txt>
          <Txt x={10} y={38} size={9.5} color={C.ink}>
            {t.fixed}
          </Txt>
        </Card>
      </Show>
    </Scene>
  );
}
