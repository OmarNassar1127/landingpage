/**
 * Prices and savings for the MKB page. Every euro figure on the page comes
 * from here, so the ROI arithmetic stays correct in one place.
 * saving = what the business saves per month (its own cost, not a Virelio price).
 * setup  = Virelio one-off price.
 */

export const eur = (n: number) => `€${Math.round(n).toLocaleString("nl-NL")}`;

export const SETUP_FROM = 1000;

export const MAINTENANCE = [
  { id: "basis", name: "Onderhoud Basis", price: 99, text: "Hosting, monitoring, updates en support" },
  { id: "plus", name: "Onderhoud Plus", price: 249, text: "Alles van Basis plus maandelijkse verbeteringen en nieuwe functies" },
] as const;

export type TierId = (typeof MAINTENANCE)[number]["id"];

export const USE_CASES = [
  {
    id: "klantenservice",
    title: "Klantenservice",
    short: "Klantenservice",
    problem: "Uw team beantwoordt elke dag dezelfde vragen over levertijd, retouren en facturen.",
    solution: "Een agent beantwoordt 80% van de tickets via e-mail, WhatsApp en chat. De rest gaat naar de juiste collega.",
    saving: 3500,
    setup: 2000,
  },
  {
    id: "facturatie",
    title: "Facturatie en herinneringen",
    short: "Facturatie",
    problem: "Facturen gaan te laat de deur uit en herinneringen worden vergeten.",
    solution: "Koppelt met Exact Online of Moneybird, maakt de factuur na elke order en stuurt herinneringen op dag 14 en 30.",
    saving: 1800,
    setup: 1250,
  },
  {
    id: "orders",
    title: "Orderverwerking",
    short: "Orders",
    problem: "Orders uit Shopify, mail en telefoon worden met de hand overgetypt.",
    solution: "Pakt orders uit elk kanaal op, checkt voorraad, maakt het label in Sendcloud en mailt de track and trace.",
    saving: 2200,
    setup: 1750,
  },
] as const;

export type UseCaseId = (typeof USE_CASES)[number]["id"];

const WEEKS_PER_MONTH = 52 / 12;

/** Payback of the setup fee in whole weeks, rounded up, net of maintenance. */
export function roi(saving: number, setup: number, maintenance: number) {
  const netMonthly = saving - maintenance;
  return {
    netMonthly,
    paybackWeeks: Math.ceil(setup / (netMonthly / WEEKS_PER_MONTH)),
    netYear1: saving * 12 - setup - maintenance * 12,
  };
}

/** WBSO example: €4.000 project, 35% back, €3.000 saving per month, Onderhoud Basis. */
export const WBSO = (() => {
  const project = 4000;
  const refund = project * 0.35;
  const effective = project - refund;
  const saving = 3000;
  return { project, refund, effective, saving, ...roi(saving, effective, MAINTENANCE[0].price) };
})();
