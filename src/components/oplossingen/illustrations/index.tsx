"use client";

import type { ComponentType } from "react";
import type { Lang } from "@/lib/solutions";
import Klantenservice from "./klantenservice";
import EigenData from "./eigen-data";
import Offerte from "./offerte";
import Factuur from "./factuur";
import Inbox from "./inbox";
import Sales from "./sales";
import Kennisbank from "./kennisbank";
import Recruitment from "./recruitment";
import Contract from "./contract";
import Productteksten from "./productteksten";
import Planning from "./planning";
import Receptionist from "./receptionist";

type Illustration = ComponentType<{ lang: Lang; still?: boolean }>;

const SCENES: Record<string, Illustration> = {
  "klantenservice-agent": Klantenservice,
  "ai-op-je-eigen-data": EigenData,
  "offerte-agent": Offerte,
  factuurverwerking: Factuur,
  "inbox-agent": Inbox,
  "sales-opvolging": Sales,
  "kennisbank-assistent": Kennisbank,
  "recruitment-screening": Recruitment,
  "contract-check": Contract,
  productteksten: Productteksten,
  "planning-agent": Planning,
  /** Only used on the overview tile that links to the voice assistant page. */
  "ai-receptionist": Receptionist,
};

/** The illustration for a solution, or nothing if it has none. `still` is the static tile version. */
export default function SolutionIllustration({ slug, lang, still }: { slug: string; lang: Lang; still?: boolean }) {
  const Scene = SCENES[slug];
  return Scene ? <Scene lang={lang} still={still} /> : null;
}
