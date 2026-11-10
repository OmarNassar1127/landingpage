import {
  BookOpen,
  Calculator,
  CalendarDays,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Landmark,
  Mail,
  MessageCircle,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

// Mock data only: generic Dutch SMB names, no real clients.
export type Lang = "nl" | "en";
export type Tool = { label: string; icon: LucideIcon; tint: string };

export type Result =
  | { kind: "order"; title: string; meta: string; rows: { id: string; who: string; what: string; amount: string }[]; source: string }
  | { kind: "quote"; title: string; meta: string; lines: { label: string; qty: string; amount: string }[]; totalLabel: string; total: string; source: string }
  | { kind: "invoice"; title: string; meta: string; fields: { k: string; v: string }[]; booked: string; source: string }
  | { kind: "message"; title: string; meta: string; from: string; question: string; answer: string; source: string }
  | { kind: "plan"; title: string; meta: string; days: string[]; busy: number[][]; pick: { day: number; slot: number; label: string }; proposal: string; source: string };

export type Problem = { chip: string; now: string; inputs: Tool[]; outputs: Tool[]; result: Result };

const tool = (label: string, icon: LucideIcon, tint: string): Tool => ({ label, icon, tint });
// Tool icons sit on the neutral band; the agent pill carries the only accent.
const TINT = "rgb(var(--band))";

const OUTLOOK = tool("Outlook", Mail, TINT);
const GMAIL = tool("Gmail", Mail, TINT);
const EXACT = tool("Exact", Calculator, TINT);
const SHOPIFY = tool("Shopify", ShoppingBag, TINT);
const EXCEL = tool("Excel", FileSpreadsheet, TINT);
const WHATSAPP = tool("WhatsApp", MessageCircle, TINT);
const SHAREPOINT = tool("SharePoint", FolderOpen, TINT);
const TEAMS = tool("Teams", Users, TINT);

const nl: Problem[] = [
  {
    chip: "We typen orders over uit mail",
    now: "Elke order komt binnen als mail en gaat met de hand het systeem in.",
    inputs: [OUTLOOK, tool("Bestelbon", FileText, TINT)],
    outputs: [EXACT],
    result: {
      kind: "order",
      title: "Nieuwe order in Exact",
      meta: "uit mail van 09:41",
      rows: [
        { id: "1042", who: "Van Dijk Installatie", what: "8× kabelgoot 2 m", amount: "€412,00" },
        { id: "1043", who: "Smit & Zn", what: "2× kitpistool", amount: "€96,50" },
        { id: "1044", who: "Jansen Bouw", what: "12× tegellijm 25 kg", amount: "€238,80" },
      ],
      source: "herkend uit bestelbon",
    },
  },
  {
    chip: "Offertes duren dagen",
    now: "Een aanvraag wacht tot iemand tijd heeft om te rekenen en te typen.",
    inputs: [GMAIL, tool("Prijslijst", FileSpreadsheet, TINT)],
    outputs: [tool("Offerte-pdf", FileText, TINT), EXACT],
    result: {
      kind: "quote",
      title: "Concept-offerte",
      meta: "40 m² vloer, leggen inbegrepen",
      lines: [
        { label: "PVC-vloer eiken", qty: "40 m²", amount: "€1.300,00" },
        { label: "Leggen", qty: "40 m²", amount: "€720,00" },
        { label: "Ondervloer", qty: "40 m²", amount: "€180,00" },
      ],
      totalLabel: "Totaal incl. btw",
      total: "€2.662,00",
      source: "uit jullie prijslijst",
    },
  },
  {
    chip: "Facturen handmatig inboeken",
    now: "Pdf openen, bedragen overtypen, btw controleren. Elke week opnieuw.",
    inputs: [tool("Factuur-pdf", FileText, TINT)],
    outputs: [EXACT, tool("Bank", Landmark, TINT)],
    result: {
      kind: "invoice",
      title: "Inkoopfactuur",
      meta: "F-2291",
      fields: [
        { k: "Leverancier", v: "Vloerenhandel Noord" },
        { k: "Bedrag", v: "€1.452,00" },
        { k: "Btw 21%", v: "€252,00" },
        { k: "Vervaldatum", v: "24 nov" },
      ],
      booked: "Klaargezet in Exact, betaling ingepland",
      source: "herkend uit pdf",
    },
  },
  {
    chip: "Klantvragen blijven liggen",
    now: "Mail en WhatsApp lopen vol terwijl jij aan het werk bent.",
    inputs: [GMAIL, WHATSAPP, SHOPIFY],
    outputs: [tool("Antwoord", Mail, TINT)],
    result: {
      kind: "message",
      title: "Concept-antwoord",
      meta: "09:41",
      from: "Lotte",
      question: "Kan ik mijn bestelling na 30 dagen nog retourneren?",
      answer: "Hoi Lotte, retourneren kan tot 30 dagen na ontvangst. Stuur je ordernummer, dan kijken we of ruilen nog lukt.",
      source: "uit retourvoorwaarden",
    },
  },
  {
    chip: "Planning in Excel",
    now: "Wie waar staat, zit in een sheet die één persoon bijhoudt.",
    inputs: [EXCEL],
    outputs: [tool("Agenda", CalendarDays, TINT), WHATSAPP],
    result: {
      kind: "plan",
      title: "Voorstel planning",
      meta: "monteur Ruben",
      days: ["ma", "di", "wo", "do", "vr"],
      busy: [[0, 1, 2], [0, 2, 3], [1, 2], [0], [0, 1, 3]],
      pick: { day: 3, slot: 2, label: "13:00" },
      proposal: "Donderdag 13:00–15:00 bij fam. De Wit",
      source: "uit agenda Ruben",
    },
  },
  {
    chip: "Kennis zit in één hoofd",
    now: "Het team belt jou voor elke vraag over prijzen, regels en werkwijze.",
    inputs: [SHAREPOINT, tool("Handboek", BookOpen, TINT), EXCEL],
    outputs: [TEAMS],
    result: {
      kind: "message",
      title: "Antwoord voor het team",
      meta: "in Teams",
      from: "Sanne",
      question: "Hoeveel garantie geven we op montage?",
      answer: "Twee jaar op de montage. Op de ketel zelf vijf jaar, als hij elk jaar onderhoud krijgt.",
      source: "uit Werkwijze.pdf, p. 12",
    },
  },
];

const en: Problem[] = [
  {
    ...nl[0],
    chip: "We retype orders from email",
    now: "Every order arrives by email and gets typed into the system by hand.",
    inputs: [OUTLOOK, tool("Order form pdf", FileText, TINT)],
    result: {
      kind: "order",
      title: "New order in Exact",
      meta: "from email, 09:41",
      rows: [
        { id: "1042", who: "Van Dijk Installatie", what: "8× cable tray 2 m", amount: "€412.00" },
        { id: "1043", who: "Smit & Zn", what: "2× caulking gun", amount: "€96.50" },
        { id: "1044", who: "Jansen Bouw", what: "12× tile adhesive 25 kg", amount: "€238.80" },
      ],
      source: "read from the order form",
    },
  },
  {
    ...nl[1],
    chip: "Quotes take days",
    now: "A request waits until someone has time to calculate and type.",
    inputs: [GMAIL, tool("Price list", FileSpreadsheet, TINT)],
    outputs: [tool("Quote pdf", FileText, TINT), EXACT],
    result: {
      kind: "quote",
      title: "Draft quote",
      meta: "40 m² floor, fitting included",
      lines: [
        { label: "Oak vinyl floor", qty: "40 m²", amount: "€1,300.00" },
        { label: "Fitting", qty: "40 m²", amount: "€720.00" },
        { label: "Underlay", qty: "40 m²", amount: "€180.00" },
      ],
      totalLabel: "Total incl. VAT",
      total: "€2,662.00",
      source: "from your price list",
    },
  },
  {
    ...nl[2],
    chip: "Invoices entered by hand",
    now: "Open the pdf, retype the amounts, check the VAT. Every week again.",
    inputs: [tool("Invoice pdf", FileText, TINT)],
    result: {
      kind: "invoice",
      title: "Purchase invoice",
      meta: "F-2291",
      fields: [
        { k: "Supplier", v: "Vloerenhandel Noord" },
        { k: "Amount", v: "€1,452.00" },
        { k: "VAT 21%", v: "€252.00" },
        { k: "Due", v: "24 Nov" },
      ],
      booked: "Ready in Exact, payment scheduled",
      source: "read from pdf",
    },
  },
  {
    ...nl[3],
    chip: "Customer questions pile up",
    now: "Email and WhatsApp fill up while you are on the job.",
    outputs: [tool("Reply", Mail, TINT)],
    result: {
      kind: "message",
      title: "Draft reply",
      meta: "09:41",
      from: "Lotte",
      question: "Can I still return my order after 30 days?",
      answer: "Hi Lotte, returns are possible up to 30 days after delivery. Send your order number and we'll see if an exchange still works.",
      source: "from your return policy",
    },
  },
  {
    ...nl[4],
    chip: "Planning in Excel",
    now: "Who goes where lives in a sheet that one person keeps up.",
    outputs: [tool("Calendar", CalendarDays, TINT), WHATSAPP],
    result: {
      kind: "plan",
      title: "Proposed slot",
      meta: "technician Ruben",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      busy: [[0, 1, 2], [0, 2, 3], [1, 2], [0], [0, 1, 3]],
      pick: { day: 3, slot: 2, label: "13:00" },
      proposal: "Thursday 13:00–15:00 at the De Wit home",
      source: "from Ruben's calendar",
    },
  },
  {
    ...nl[5],
    chip: "Knowledge lives in one head",
    now: "The team calls you for every question about prices, rules and how things work.",
    inputs: [SHAREPOINT, tool("Handbook", BookOpen, TINT), EXCEL],
    result: {
      kind: "message",
      title: "Answer for the team",
      meta: "in Teams",
      from: "Sanne",
      question: "How much warranty do we give on installation?",
      answer: "Two years on the installation. Five years on the boiler itself, if it is serviced every year.",
      source: "from Werkwijze.pdf, p. 12",
    },
  },
];

export const PROBLEMS: Record<Lang, Problem[]> = { nl, en };

export const UI = {
  nl: { problem: "Het probleem", agent: "AI-medewerker", label: "Kies een probleem", edit: "Aanpassen", approve: "Goedkeuren", approved: "Goedgekeurd", fresh: "nieuw" },
  en: { problem: "The problem", agent: "AI employee", label: "Pick a problem", edit: "Edit", approve: "Approve", approved: "Approved", fresh: "new" },
};
