import type { Solution } from "./types";

const AGENT_BOUWEN = { name: "AI agent laten bouwen", href: "/diensten/ai-agent-bouwen/" };
const DIGITALE_MEDEWERKER = { name: "Digitale medewerker", href: "/diensten/digitale-medewerker/" };
const MKB = { name: "AI voor het MKB", href: "/diensten/ai-automatisering-mkb/" };

export const solutionsNl: Solution[] = [
  {
    slug: "klantenservice-agent",
    headline: "Klantenservice die nooit slaapt.",
    name: "Klantenservice-agent",
    title: "Klantenservice-agent: 24/7 antwoord via mail, chat en WhatsApp",
    description:
      "Een AI agent die klantvragen 24/7 beantwoordt via e-mail, chat en WhatsApp, en het gesprek overdraagt aan je team als dat nodig is. Vanaf €1.000 eenmalig.",
    keywords: "klantenservice agent, AI klantenservice, klantvragen automatiseren, WhatsApp AI agent, AI chat klantenservice, 24/7 klantenservice",
    pain: "“Elke ochtend staat de inbox vol met vragen die we al honderd keer beantwoord hebben.”",
    teaser: "Beantwoordt klantvragen dag en nacht, en geeft lastige gesprekken door aan je team.",
    intro:
      "De klantenservice-agent beantwoordt de vragen die steeds terugkomen, ook 's nachts en in het weekend. Wordt het lastig, dan zet hij het gesprek door naar een collega, met de context erbij.",
    steps: [
      { title: "Leert je antwoorden", text: "We voeden de agent met je FAQ, je voorwaarden en een stapel echte vragen uit je inbox." },
      { title: "Beantwoordt zelf", text: "Bekende vragen krijgen direct een antwoord in jouw toon, via e-mail, chat of WhatsApp." },
      { title: "Draagt over", text: "Twijfelt hij, of is de klant boos? Dan gaat het gesprek naar je team, met een korte samenvatting." },
    ],
    gets: [
      "Start op het kanaal waar de meeste vragen binnenkomen",
      "Antwoorden op basis van jouw eigen FAQ en beleid",
      "Overdracht aan een collega, met samenvatting",
      "Koppeling met je helpdesk of mailbox, zoals Zendesk of Gmail",
      "Overzicht van de vragen die het vaakst terugkomen",
    ],
    related: ["inbox-agent", "kennisbank-assistent", "ai-receptionist"],
    service: DIGITALE_MEDEWERKER,
  },
  {
    slug: "ai-op-je-eigen-data",
    headline: "Vraag het je database gewoon.",
    name: "AI op je eigen data",
    title: "AI op je eigen data: vragen aan je database in gewoon Nederlands",
    description:
      "Een read-only AI agent op je database of spreadsheets. Stel vragen in gewoon Nederlands en krijg elke week vanzelf je rapport. Vanaf €1.000 eenmalig.",
    keywords: "AI op eigen data, AI database vragen, AI rapportage, weekrapport automatiseren, AI spreadsheet analyse, data vragen in gewoon Nederlands",
    pain: "“Voor elk cijfer moet ik iemand vragen om een export te draaien.”",
    teaser: "Stel vragen aan je database of spreadsheets en krijg elke week je rapport.",
    intro:
      "Deze agent leest mee in je database of spreadsheets, maar kan niets wijzigen. Je stelt een vraag in gewoon Nederlands en krijgt het antwoord, met de bron erbij zodat je ziet waar het getal vandaan komt.",
    steps: [
      { title: "Alleen-lezen toegang", text: "We koppelen de agent met een read-only account aan je database, Google Sheets of Excel. Schrijven kan hij niet." },
      { title: "Vraag het gewoon", text: "‘Welke klanten bestelden dit kwartaal minder dan vorig jaar?’ De agent zoekt het op en laat zien hoe hij eraan kwam." },
      { title: "Weekrapport vanzelf", text: "Je vaste cijfers worden elke week verzameld en als overzicht naar je mail of Slack gestuurd." },
    ],
    gets: [
      "Read-only koppeling met je database of spreadsheets",
      "Antwoorden met de gebruikte query of bron erbij",
      "Een weekrapport met jouw vaste cijfers",
      "Afspraken over welke tabellen hij wel en niet ziet",
      "Vragen stellen via Slack, Teams of e-mail",
    ],
    related: ["kennisbank-assistent", "factuurverwerking", "sales-opvolging"],
    service: MKB,
  },
  {
    slug: "offerte-agent",
    headline: "Van aanvraag naar offerte, zonder avondwerk.",
    name: "Offerte-agent",
    title: "Offerte-agent: van aanvraag naar offerte in je eigen opmaak",
    description:
      "Een AI agent die een aanvraag uit e-mail, formulier of belnotities omzet in een kant-en-klare offerte in je eigen format. Jij checkt en verstuurt. Vanaf €1.000.",
    keywords: "offerte agent, offertes automatiseren, AI offerte maken, offerte software AI, intake naar offerte, sneller offertes maken",
    pain: "“Een offerte maken kost me een avond, en intussen tekent de klant ergens anders.”",
    teaser: "Zet een aanvraag uit mail, formulier of telefoon om in een offerte in jouw format.",
    intro:
      "De offerte-agent leest de aanvraag, rekent met je eigen prijslijst en zet een concept klaar in jouw sjabloon. Jij leest het na en drukt op verzenden.",
    steps: [
      { title: "Leest de aanvraag", text: "Een mail, een ingevuld formulier of je notities na een telefoontje: de agent haalt eruit wat de klant wil." },
      { title: "Rekent met jouw prijzen", text: "Hij gebruikt je prijslijst, kortingsregels en standaardteksten. Ontbreekt er iets, dan zet hij het als vraag voor je klaar." },
      { title: "Concept ter controle", text: "De offerte staat klaar in je eigen Word-, PDF- of offertesjabloon. Er gaat niets de deur uit zonder jouw akkoord." },
    ],
    gets: [
      "Offertes in je eigen huisstijl en sjabloon",
      "Prijzen uit je eigen prijslijst, geen gokwerk",
      "Een lijstje open vragen als de aanvraag niet compleet is",
      "Koppeling met je mailbox of webformulier",
      "Jij keurt goed, de agent verstuurt nooit zelf",
    ],
    related: ["sales-opvolging", "inbox-agent", "contract-check"],
    service: AGENT_BOUWEN,
  },
  {
    slug: "factuurverwerking",
    headline: "Bonnetjes erin, boekingen klaar.",
    name: "Factuurverwerking",
    title: "Factuurverwerking met AI: inkoopfacturen en bonnetjes klaar om te boeken",
    description:
      "Een AI agent die inkoopfacturen en bonnetjes leest en de boeking klaarzet in je boekhoudpakket, zoals Exact Online of Moneybird. Vanaf €1.000 eenmalig.",
    keywords: "factuurverwerking AI, inkoopfacturen automatiseren, bonnetjes verwerken, Exact Online automatisering, Moneybird AI, boekhouding automatiseren",
    pain: "“Aan het eind van de maand zit ik met een stapel bonnetjes en een inbox vol PDF’s.”",
    teaser: "Leest inkoopfacturen en bonnetjes en zet de boeking klaar in je pakket.",
    intro:
      "De agent leest elke inkoopfactuur en elk bonnetje, herkent leverancier, bedrag en btw, en zet de boeking klaar in je boekhoudpakket. Jij of je boekhouder keurt goed.",
    steps: [
      { title: "Alles op één plek", text: "Facturen komen binnen via een vast mailadres of een gedeelde map. Bonnetjes fotografeer je met je telefoon." },
      { title: "Uitlezen en coderen", text: "De agent haalt leverancier, factuurnummer, bedragen en btw eruit en stelt een grootboekrekening voor op basis van eerdere boekingen." },
      { title: "Klaar voor akkoord", text: "De boeking staat als concept in je pakket. Lijkt een factuur dubbel of klopt het btw-tarief niet, dan krijg je een seintje." },
    ],
    gets: [
      "Uitlezen van PDF-facturen en foto’s van bonnetjes",
      "Voorstel voor grootboekrekening en btw-code",
      "Controle op dubbele facturen",
      "Koppeling met je boekhoudpakket, zoals Exact Online of Moneybird",
      "Niets wordt geboekt zonder akkoord",
    ],
    related: ["inbox-agent", "ai-op-je-eigen-data", "contract-check"],
    service: MKB,
  },
  {
    slug: "inbox-agent",
    headline: "Een info@-inbox die zichzelf sorteert.",
    name: "Inbox-agent",
    title: "Inbox-agent: een gedeelde inbox die zichzelf sorteert",
    description:
      "Een AI agent die je gedeelde inbox sorteert, labelt en conceptantwoorden klaarzet. Je team leest na en verstuurt. Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand.",
    keywords: "inbox agent, gedeelde inbox automatiseren, e-mail sorteren AI, AI conceptantwoorden, info mailbox automatiseren, Outlook AI, Gmail AI",
    pain: "“In de info@-inbox weet niemand meer wie wat oppakt.”",
    teaser: "Sorteert en labelt je gedeelde inbox en zet conceptantwoorden klaar.",
    intro:
      "De inbox-agent leest elke binnenkomende mail, geeft hem een label, wijst hem toe aan de juiste collega en schrijft alvast een concept. Je team hoeft alleen nog na te lezen.",
    steps: [
      { title: "Leest mee", text: "De agent kijkt mee in je gedeelde inbox in Gmail of Outlook. Aan jullie werkwijze verandert niets." },
      { title: "Sorteert en wijst toe", text: "Aanvraag, klacht, factuur of spam: elke mail krijgt een label en komt bij de juiste persoon." },
      { title: "Schrijft het concept", text: "Voor mails die een antwoord nodig hebben staat een concept klaar in jullie toon. Versturen doet je team zelf." },
    ],
    gets: [
      "Labels en regels die passen bij jullie werkwijze",
      "Conceptantwoorden in je eigen toon",
      "Toewijzing aan de juiste collega",
      "Werkt in Gmail of Outlook, geen nieuw systeem",
      "Elke dag een lijstje van mails die blijven liggen",
    ],
    related: ["klantenservice-agent", "offerte-agent", "factuurverwerking"],
    service: DIGITALE_MEDEWERKER,
  },
  {
    slug: "sales-opvolging",
    headline: "Elke lead op tijd opgevolgd.",
    name: "Sales-opvolging",
    title: "Sales-opvolging met AI: elke lead op tijd, je CRM op orde",
    description:
      "Een AI agent die elke lead op tijd opvolgt, follow-ups klaarzet en na elk contact je CRM bijwerkt. Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand.",
    keywords: "sales opvolging AI, leads opvolgen, CRM automatiseren, follow-up automatiseren, HubSpot AI, Pipedrive automatisering, sales agent",
    pain: "“Leads zakken weg omdat niemand op tijd terugbelt, en het CRM loopt altijd achter.”",
    teaser: "Volgt elke lead op tijd op en houdt je CRM bij na elk contact.",
    intro:
      "De sales-agent houdt bij wie wanneer opgevolgd moet worden, zet een persoonlijke follow-up klaar en werkt na elk gesprek je CRM bij. Je verkopers voeren gesprekken in plaats van administratie.",
    steps: [
      { title: "Elke lead binnen", text: "Nieuwe aanvragen uit je site, mail of formulieren komen direct in het CRM, met de juiste gegevens." },
      { title: "Op tijd opvolgen", text: "Geen reactie na een offerte? De agent zet op het juiste moment een follow-up klaar, of verstuurt hem als jij dat toestaat." },
      { title: "CRM bijgewerkt", text: "Na een mail of call vat de agent het contact samen en zet hij de volgende stap in het CRM." },
    ],
    gets: [
      "Koppeling met je CRM, zoals HubSpot, Pipedrive of Salesforce",
      "Follow-ups in je eigen toon, op het juiste moment",
      "Een samenvatting van elk contactmoment",
      "Elke week een lijstje leads die aandacht nodig hebben",
      "Jij bepaalt wat hij zelf mag versturen",
    ],
    related: ["offerte-agent", "inbox-agent", "ai-op-je-eigen-data"],
    service: AGENT_BOUWEN,
  },
  {
    slug: "kennisbank-assistent",
    headline: "Het juiste antwoord, met de bron erbij.",
    name: "Kennisbank-assistent",
    title: "Kennisbank-assistent: antwoorden uit je eigen documenten, met bron",
    description:
      "Een AI assistent die vragen van je team beantwoordt uit je eigen documenten, altijd met bronvermelding. Voor SharePoint, Google Drive en Notion. Vanaf €1.000 eenmalig.",
    keywords: "kennisbank assistent, AI kennisbank, interne documenten doorzoeken, RAG, SharePoint AI, Notion AI zoeken, antwoorden met bronvermelding",
    pain: "“Nieuwe collega’s vragen alles drie keer, omdat niemand het juiste document kan vinden.”",
    teaser: "Je team stelt vragen en krijgt antwoord uit je eigen documenten, met bron.",
    intro:
      "De kennisbank-assistent doorzoekt je handboeken, procedures en interne documenten. Je team stelt een vraag en krijgt een kort antwoord met een link naar de bron.",
    steps: [
      { title: "Documenten koppelen", text: "We sluiten de assistent aan op SharePoint, Google Drive, Notion of een map met PDF’s. Wat vertrouwelijk is, blijft erbuiten." },
      { title: "Vragen waar je al werkt", text: "Je team stelt vragen in Slack of Teams. Geen nieuwe tool om te leren." },
      { title: "Antwoord met bron", text: "Elk antwoord verwijst naar het document en de passage. Staat het nergens, dan zegt hij dat eerlijk." },
    ],
    gets: [
      "Antwoorden met bronvermelding",
      "Koppeling met je documentbron",
      "Werkt in Slack, Teams of een eenvoudige webpagina",
      "Rechten per map: niet iedereen ziet alles",
      "Een lijst van vragen waar nog geen document voor is",
    ],
    related: ["ai-op-je-eigen-data", "klantenservice-agent", "contract-check"],
    service: AGENT_BOUWEN,
  },
  {
    slug: "recruitment-screening",
    headline: "Elk cv gelezen. Jij beslist.",
    name: "Recruitment-screening",
    title: "Recruitment-screening met AI: cv’s voorgeselecteerd, gesprekken gepland",
    description:
      "Een AI agent die cv’s naast je vacature legt, een onderbouwde voorselectie maakt en sollicitatiegesprekken inplant. Jij beslist. Vanaf €1.000 eenmalig.",
    keywords: "recruitment screening AI, cv screening, sollicitanten voorselecteren, AI werving, sollicitatiegesprekken plannen, recruitment automatiseren",
    pain: "“Op elke vacature komen stapels cv’s binnen en ik heb geen tijd om ze allemaal goed te lezen.”",
    teaser: "Legt cv’s naast je vacature en plant gesprekken met wie jij uitnodigt.",
    intro:
      "De agent legt elk cv naast de eisen uit je vacature en schrijft per kandidaat kort op wat past en wat ontbreekt. De beslissing blijft bij jou. Wie je uitnodigt, kiest meteen een moment uit je agenda.",
    steps: [
      { title: "Jouw criteria", text: "We zetten je vacature om in duidelijke eisen en wensen. Jij bepaalt wat zwaar weegt." },
      { title: "Voorselectie met uitleg", text: "Elk cv krijgt een korte onderbouwing per criterium. Geen zwarte doos: je ziet waarom." },
      { title: "Gesprek ingepland", text: "Kandidaten die je uitnodigt kiezen zelf een tijd uit je agenda. Afwijzingen staan als concept klaar." },
    ],
    gets: [
      "Voorselectie met onderbouwing per kandidaat",
      "Koppeling met je mailbox of ATS",
      "Gesprekken ingepland via je agenda",
      "Conceptmails voor uitnodiging en afwijzing",
      "Bewaartermijnen volgens jouw privacybeleid",
    ],
    related: ["planning-agent", "inbox-agent", "kennisbank-assistent"],
    service: DIGITALE_MEDEWERKER,
  },
  {
    slug: "contract-check",
    headline: "Weet wat je tekent.",
    name: "Contract-check",
    title: "Contract-check met AI: risicovolle en ontbrekende clausules gemarkeerd",
    description:
      "Een AI agent die contracten leest en risicovolle of ontbrekende clausules markeert, zodat jij of je jurist gericht kan reviewen. Vanaf €1.000 eenmalig.",
    keywords: "contract check AI, contract review AI, contracten controleren, clausules controleren, juridische documenten AI, contractanalyse",
    pain: "“Ik teken contracten die ik eigenlijk niet helemaal gelezen heb.”",
    teaser: "Leest contracten en markeert risicovolle of ontbrekende clausules.",
    intro:
      "De contract-check legt elk contract naast jouw eigen checklist. Hij markeert wat afwijkt, zoals een ruime aansprakelijkheid of een stilzwijgende verlenging, en meldt wat ontbreekt. Het is een eerste lezing, geen juridisch advies.",
    steps: [
      { title: "Jouw checklist", text: "Samen leggen we vast waar je op let: aansprakelijkheid, opzegtermijn, boetes, betalingstermijn." },
      { title: "Lezen en markeren", text: "Stuur een contract door of upload het. Bij elke afwijking zet de agent de passage en de reden." },
      { title: "Gericht reviewen", text: "Je krijgt een kort overzicht om mee naar je jurist te gaan, of om zelf te bepalen wat je terugstuurt." },
    ],
    gets: [
      "Een checklist op maat van jouw contracten",
      "Gemarkeerde passages met uitleg",
      "Een lijst van ontbrekende clausules",
      "Werkt met PDF en Word",
      "Je contracten blijven binnen de EU",
    ],
    related: ["offerte-agent", "kennisbank-assistent", "factuurverwerking"],
    service: AGENT_BOUWEN,
  },
  {
    slug: "productteksten",
    headline: "Elk product een goede tekst, in elke taal.",
    name: "Productteksten",
    title: "Productteksten met AI: beschrijvingen en vertalingen in je eigen toon",
    description:
      "Een AI agent die productbeschrijvingen voor je webshop schrijft en vertaalt in je eigen tone of voice, rechtstreeks uit je productdata. Vanaf €1.000 eenmalig.",
    keywords: "productteksten AI, productbeschrijvingen schrijven, webshop teksten, productteksten vertalen, Shopify AI, WooCommerce teksten",
    pain: "“Honderden producten staan online met een kale omschrijving, en vertalen komt er nooit van.”",
    teaser: "Schrijft en vertaalt productteksten voor je webshop in jouw tone of voice.",
    intro:
      "De agent schrijft productteksten uit je productdata en een paar voorbeelden die je goed vindt. Daarna vertaalt hij ze naar de talen van je webshop, in dezelfde toon.",
    steps: [
      { title: "Jouw toon vastleggen", text: "We beginnen met een handvol teksten waar je trots op bent. Daaruit haalt de agent je stijl, woordkeus en lengte." },
      { title: "Schrijven uit je data", text: "Uit je feed of export haalt hij de specificaties. Hij verzint niets dat niet in de data staat." },
      { title: "Vertalen en terugzetten", text: "De teksten worden vertaald en klaargezet voor je webshop. Jij keurt per batch goed." },
    ],
    gets: [
      "Productteksten in je eigen tone of voice",
      "Vertalingen naar de talen die je nodig hebt",
      "Alleen feiten uit je productdata",
      "Batches ter goedkeuring voordat iets live gaat",
      "Koppeling met Shopify, WooCommerce of een CSV-export",
    ],
    related: ["klantenservice-agent", "kennisbank-assistent", "inbox-agent"],
    service: MKB,
  },
  {
    slug: "planning-agent",
    headline: "Het rooster rond, ook na een ziekmelding.",
    name: "Planning-agent",
    title: "Planning-agent: roosters, afspraken en routes volgens je eigen regels",
    description:
      "Een AI agent die afspraken inplant, roosters maakt en routes plant volgens jouw regels, en wijzigingen direct doorvoert. Vanaf €1.000 eenmalig.",
    keywords: "planning agent, rooster automatiseren, AI planning, routeplanning AI, afspraken inplannen, personeelsplanning automatiseren",
    pain: "“Elke week ben ik uren kwijt aan het rooster, en één ziekmelding gooit alles om.”",
    teaser: "Maakt roosters, plant afspraken en routes volgens jouw eigen regels.",
    intro:
      "De planning-agent kent je regels: wie wat mag, wie wanneer kan, hoe ver een monteur rijdt. Hij maakt een voorstel voor het rooster of de route en past het aan als er iets verandert.",
    steps: [
      { title: "Regels op een rij", text: "We zetten je planningsregels op papier: beschikbaarheid, contracturen, vaardigheden, rijtijden." },
      { title: "Voorstel in je agenda", text: "De agent maakt een rooster, afsprakenplanning of route en zet die in je agenda of planningstool." },
      { title: "Wijzigingen doorgevoerd", text: "Ziekmelding of spoedklus? Hij schuift de planning door en laat zien wat verandert, voordat jij akkoord geeft." },
    ],
    gets: [
      "Planning volgens jouw eigen regels",
      "Koppeling met Google Agenda, Outlook of je planningstool",
      "Bij elke wijziging een voorstel, jij keurt goed",
      "Routes met rijtijden tussen afspraken",
      "Een overzicht van conflicten en gaten in de planning",
    ],
    related: ["recruitment-screening", "ai-receptionist", "sales-opvolging"],
    service: DIGITALE_MEDEWERKER,
  },
];

/** The phone receptionist already has its own page; the catalog points there instead of duplicating it. */
export const receptionistNl = {
  name: "AI-receptionist",
  teaser: "Neemt de telefoon op en plant afspraken in, ook als jij geen tijd hebt.",
  href: "/spraakassistent/",
};
