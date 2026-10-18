// One lazily loaded module per 3D object. Each module exports build({ M, font }).
type Loader = () => Promise<{ build: (ctx: { M: unknown; font: string }) => Promise<unknown> | unknown }>;

export const OBJECTS: Record<string, Loader> = {
  "klantenservice-agent": () => import("./objects/klantenservice.js"),
  "ai-op-je-eigen-data": () => import("./objects/eigen-data.js"),
  "offerte-agent": () => import("./objects/offerte.js"),
  factuurverwerking: () => import("./objects/factuur.js"),
  "inbox-agent": () => import("./objects/inbox.js"),
  "sales-opvolging": () => import("./objects/sales.js"),
  "kennisbank-assistent": () => import("./objects/kennisbank.js"),
  "recruitment-screening": () => import("./objects/recruitment.js"),
  "contract-check": () => import("./objects/contract.js"),
  productteksten: () => import("./objects/productteksten.js"),
  "planning-agent": () => import("./objects/planning.js"),
};

export const has3D = (slug: string) => slug in OBJECTS;
