"use client";

import { Phone } from "lucide-react";
import type { Lang } from "@/lib/solutions";
import { AgentMark, Avatar, Bubble, C, Card, Chip, Glyph, Scene, Show, Txt } from "./kit";

const T = {
  nl: {
    title: "Telefoon",
    label: "Een beller vraagt of hij morgen langs kan komen. De AI receptionist neemt op, biedt een tijd aan en zet de afspraak in de agenda.",
    call: "Inkomend gesprek",
    caller: "B",
    q: ["Kan ik morgen even langskomen?"],
    a: ["Ja, morgen om 10:30 is er plek.", "Zal ik dat voor je vastzetten?"],
    yes: ["Graag!"],
    booked: "Afspraak ingepland: wo 10:30",
  },
  en: {
    title: "Phone",
    label: "A caller asks whether they can come by tomorrow. The AI receptionist answers, offers a time and puts the appointment in the calendar.",
    call: "Incoming call",
    caller: "C",
    q: ["Can I drop by tomorrow?"],
    a: ["Yes, there is a slot at 10:30.", "Shall I book that for you?"],
    yes: ["Yes please!"],
    booked: "Appointment booked: Wed 10:30",
  },
};

export default function Receptionist({ lang, still }: { lang: Lang; still?: boolean }) {
  const t = T[lang];
  return (
    <Scene title={t.title} label={t.label} steps={5} still={still} tick={1000}>
      <Card x={14} y={42} w={372} h={36}>
        <circle cx={22} cy={18} r={10} fill="#ecfdf5" stroke="#a7f3d0" />
        <Glyph icon={Phone} x={16} y={12} s={12} color="#047857" />
        <Txt x={40} y={22} size={10.5} weight={600}>
          {t.call}
        </Txt>
        <Txt x={360} y={22} size={10} color={C.muted} anchor="end">
          0:42
        </Txt>
      </Card>
      <Show at={1}>
        <Avatar x={26} y={106} initial={t.caller} t="muted" r={9} />
        <Bubble x={42} y={94} w={200} lines={t.q} />
      </Show>
      <Show at={2}>
        <AgentMark x={374} y={152} r={9} />
        <Bubble x={168} y={136} w={196} lines={t.a} from="agent" />
      </Show>
      <Show at={3}>
        <Bubble x={42} y={196} w={90} lines={t.yes} />
      </Show>
      <Show at={4}>
        <Chip x={386} y={250} text={t.booked} t="green" anchor="end" dot />
      </Show>
    </Scene>
  );
}
