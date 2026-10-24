import type { BlogPost } from "./blog-data";

/** Plain-language guides for webshop owners. Kept apart from blog-data.ts to keep that file small. */

const MAIL = "info@virelio.nl";

function mailto(subject: string) {
  return `mailto:${MAIL}?subject=${encodeURIComponent(subject)}`;
}

export const PRICE = "Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand.";

const productFaq = [
  {
    question: "Verzint de AI dingen over mijn producten?",
    answer: "Nee. Hij gebruikt alleen wat in je productgegevens staat. En jij leest alles na voordat het online gaat.",
  },
  {
    question: "Klinkt het straks als een robot?",
    answer: "Nee. We halen je stijl uit een paar teksten die je zelf goed vindt. Bij de gratis eerste tien zie je of het klopt.",
  },
  {
    question: "Werkt dit met mijn webshop?",
    answer: "Ja, als je je producten kunt exporteren: Shopify, WooCommerce of een Excel- of CSV-bestand. Je krijgt hetzelfde bestand terug.",
  },
  {
    question: "Is een tekst die met AI is geschreven slecht voor Google?",
    answer: "Google kijkt of een tekst nuttig is, niet hoe hij gemaakt is. Een eigen tekst werkt beter dan de leverancierstekst die op tien andere webshops staat.",
  },
  {
    question: "Wat kost het?",
    answer: `${PRICE} Excl. btw. Het AI-gebruik betaal je apart aan de aanbieder. De eerste tien teksten zijn gratis.`,
  },
];

const serviceFaq = [
  {
    question: "Gaat de assistent zomaar dingen beloven aan mijn klanten?",
    answer: "Nee. Hij volgt alleen jouw regels, zoals verzendtijden en retourbeleid. Twijfelt hij of is een klant boos, dan gaat de vraag naar jou, met een samenvatting.",
  },
  {
    question: "Moet ik meteen alles uit handen geven?",
    answer: "Nee. Eerst schrijft de assistent een concept en druk jij op versturen. Pas als je erop vertrouwt, beantwoordt hij de makkelijke vragen zelf.",
  },
  {
    question: "Via welke kanalen werkt het?",
    answer: "E-mail, de chat op je website en WhatsApp. Ook te koppelen aan een helpdesk zoals Zendesk of aan Gmail.",
  },
  {
    question: "Merken mijn klanten dat het een assistent is?",
    answer: "Ja, dat zetten we er eerlijk bij. Wil een klant een mens spreken, dan komt het bericht bij jou.",
  },
  {
    question: "Wat kost het?",
    answer: `${PRICE} Excl. btw. Het AI-gebruik betaal je apart aan de aanbieder. De eerste tien antwoorden zijn gratis.`,
  },
];

/** Real before/after product copy from Dutch webshops, names left out. */
export const productExamples = [
  {
    tag: "Herenmode",
    product: "Premium chino",
    before:
      "Deze Premium Chino met artikelnummer 1-96-007-84-600, in een Slim Fit (Fitnaam: Stockholm) kan je dragen naar een informele gelegenheid. Deze Premium Chino is van mooie stof(fen) geproduceerd (98% Katoen, 2% Elastaan).",
    after:
      "Slim fit chino in een rustig blauw. Katoen met 2% elastaan, dus hij geeft net wat mee. Met rits en zijzakken. Gewoon wasbaar op 30 graden.",
  },
  {
    tag: "Woontextiel",
    product: "Dekbed met ruches",
    before: "Elegante ruches rand / In seconden opgemaakt / Volledig wasbaar en sneldrogend / Warm en knus op koude nachten",
    after:
      "Dit dekbed in gebroken wit maakt je bed in een paar seconden af. De ruches langs de rand geven je slaapkamer meteen een zachte finishing touch. Volledig wasbaar en snel droog.",
  },
  {
    tag: "Kleding",
    product: "Shirt",
    before: "Tennis staart. Materiaal: 95% Katoen / 5% Elastan",
    after: "Slanke pasvorm van 95% katoen en 5% elastaan: zacht op de huid en rekt mee. Met een iets langer achterpand.",
  },
];

export type ChatMsg = { from: "klant" | "shop"; text: string; time: string; link?: string };

/** Invented shop and customers; the questions are the ones every webshop gets. Short bubbles, like a person types. */
export const chatExamples: { tag: string; rule: string; name: string; messages: ChatMsg[] }[] = [
  {
    tag: "Bezorging",
    rule: "Voor 16:00 besteld, zelfde dag verstuurd met PostNL.",
    name: "Sanne",
    messages: [
      { from: "klant", time: "21:47", text: "Hoi! Ik heb woensdagavond besteld (10482) en nog niks binnen. Waar blijft mijn bestelling?" },
      { from: "shop", time: "21:47", text: "Hoi Sanne! Even kijken… 🔎" },
      { from: "shop", time: "21:47", text: "Gevonden! Je bestelling 10482 is donderdag met PostNL verstuurd en ligt nu bij het sorteercentrum." },
      { from: "shop", time: "21:48", text: "Morgen tussen 14:00 en 17:00 wordt hij bij je bezorgd 📦 Hier is je track & trace:", link: "PostNL · bestelling 10482" },
      { from: "klant", time: "21:48", text: "Top, dank je wel! 🙏" },
    ],
  },
  {
    tag: "Retour",
    rule: "Ruilen binnen 30 dagen, met label. Retour is gratis.",
    name: "Mark",
    messages: [
      { from: "klant", time: "08:15", text: "Hoi, ik kreeg drie weken geleden een jas maar hij is te klein 😅 Kan ik hem nog ruilen?" },
      { from: "shop", time: "08:15", text: "Hoi Mark! Dat kan zeker 👍" },
      { from: "shop", time: "08:15", text: "Je hebt 30 dagen om te ruilen, dus je zit nog goed. Laat het label er wel aan." },
      { from: "shop", time: "08:15", text: "Welke maat wil je hebben?" },
      { from: "klant", time: "08:16", text: "Een L graag" },
      { from: "shop", time: "08:16", text: "Geregeld! Hier is je gratis retourlabel. Zodra je jas binnen is, sturen we de L op.", link: "Retourlabel · gratis" },
    ],
  },
];

export const webshopPosts: BlogPost[] = [
  {
    slug: "productteksten-laten-schrijven",
    title: "Productteksten laten schrijven voor je webshop (met voorbeelden)",
    description:
      "Honderden producten met alleen een rijtje specificaties? Laat je productteksten schrijven in je eigen stijl. Bekijk echte voorbeelden. De eerste reeks is gratis.",
    publishedAt: "2026-10-24",
    author: "Virelio Team",
    readingTime: 4,
    keywords: [
      "productteksten laten schrijven",
      "productbeschrijvingen webshop",
      "productteksten AI",
      "productomschrijving schrijven",
      "webshop teksten",
    ],
    faq: productFaq,
    cta: {
      title: "Stuur ons tien producten",
      text: "Mail je productlijst of een link naar je webshop. Wij schrijven de eerste tien teksten gratis, zodat je ziet wat je krijgt.",
      label: "Mail je productlijst",
      href: mailto("Productteksten: gratis eerste reeks"),
    },
    // Rendered by components/blog-visual, not as HTML.
    content: "",
  },
  {
    slug: "klantvragen-automatisch-beantwoorden",
    title: "Klantvragen van je webshop automatisch laten beantwoorden",
    description:
      "Elke dag dezelfde vragen over bezorging en retour? Laat een slimme assistent je klantenservice beantwoorden met jouw regels. Met voorbeeld. Eerste reeks gratis.",
    publishedAt: "2026-10-24",
    author: "Virelio Team",
    readingTime: 4,
    keywords: [
      "klantenservice webshop automatiseren",
      "AI klantenservice webshop",
      "klantvragen automatisch beantwoorden",
      "webshop klantenservice",
      "veelgestelde vragen webshop",
    ],
    faq: serviceFaq,
    cta: {
      title: "Stuur ons je veelgestelde vragen",
      text: "Mail je veelgestelde vragen en een paar echte klantmails. Wij laten gratis zien welke antwoorden de assistent zou sturen.",
      label: "Mail je vragen",
      href: mailto("Klantenservice: gratis eerste reeks"),
    },
    // Rendered by components/blog-visual, not as HTML.
    content: "",
  },
];
