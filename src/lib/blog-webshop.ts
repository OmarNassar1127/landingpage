import type { BlogPost } from "./blog-data";

/** Plain-language guides for webshop owners. Kept apart from blog-data.ts to keep that file small. */

const MAIL = "info@virelio.nl";

function mailto(subject: string) {
  return `mailto:${MAIL}?subject=${encodeURIComponent(subject)}`;
}

function faqHtml(faq: { question: string; answer: string }[]) {
  return faq.map((f) => `<h3>${f.question}</h3>\n<p>${f.answer}</p>`).join("\n\n");
}

const PRICE = "Vanaf €1.000 eenmalig, onderhoud vanaf €99 per maand.";

const productFaq = [
  {
    question: "Verzint de AI dingen over mijn producten?",
    answer:
      "Nee. Hij schrijft alleen op wat in je productgegevens staat, zoals het materiaal, de maat en de kleur. Staat iets er niet in, dan komt het ook niet in de tekst. En jij leest alles na voordat het online gaat.",
  },
  {
    question: "Klinkt het straks als een robot?",
    answer:
      "Nee. Je geeft ons een paar teksten die je zelf goed vindt. Daar halen we je stijl uit: hoe lang, hoe los, je of u. Bij de gratis eerste reeks zie je meteen of het klopt.",
  },
  {
    question: "Werkt dit met mijn webshop?",
    answer:
      "Ja, als je je producten kunt exporteren. We werken met Shopify, WooCommerce of gewoon een Excel- of CSV-bestand. De nieuwe teksten krijg je terug in hetzelfde bestand, zodat je ze in één keer kunt inladen.",
  },
  {
    question: "Is een tekst die met AI is geschreven slecht voor Google?",
    answer:
      "Google kijkt of een tekst nuttig is voor de bezoeker, niet hoe hij gemaakt is. Een eigen, duidelijke tekst werkt beter dan de leverancierstekst die ook op tien andere webshops staat.",
  },
  {
    question: "Wat kost het?",
    answer: `${PRICE} Prijzen zijn exclusief btw. Het gebruik van de AI zelf betaal je apart aan de aanbieder. De eerste reeks maken we gratis, zodat je eerst kunt zien wat je krijgt.`,
  },
];

const serviceFaq = [
  {
    question: "Gaat de assistent zomaar dingen beloven aan mijn klanten?",
    answer:
      "Nee. Hij antwoordt alleen op basis van jouw eigen regels, zoals je verzendtijden en je retourbeleid. Weet hij het niet zeker, of is een klant boos? Dan stuurt hij de vraag door naar jou, met een korte samenvatting erbij.",
  },
  {
    question: "Moet ik meteen alles uit handen geven?",
    answer:
      "Nee. Je kunt beginnen met conceptantwoorden: de assistent schrijft het antwoord, jij leest het en drukt op versturen. Pas als je erop vertrouwt, laat je de makkelijke vragen zelf beantwoorden.",
  },
  {
    question: "Via welke kanalen werkt het?",
    answer:
      "Via e-mail, de chat op je website en WhatsApp. We beginnen op het kanaal waar de meeste vragen binnenkomen. Gebruik je een helpdesk zoals Zendesk of gewoon Gmail, dan koppelen we hem daaraan.",
  },
  {
    question: "Merken mijn klanten dat het een assistent is?",
    answer:
      "Ja, dat zetten we er eerlijk bij. Wil een klant liever een mens spreken, dan komt het bericht bij jou of je team terecht.",
  },
  {
    question: "Wat kost het?",
    answer: `${PRICE} Prijzen zijn exclusief btw. Het gebruik van de AI zelf betaal je apart aan de aanbieder. De eerste reeks maken we gratis, zodat je eerst kunt zien wat je krijgt.`,
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
    content: `<p>Je hebt 800 producten en de helft heeft alleen een rijtje specificaties. Of de tekst van de leverancier, dezelfde die op tien andere webshops staat. Je weet dat een goede tekst helpt, maar naast het inpakken, de mail en de inkoop kom je er nooit aan toe.</p>

<p>Wij schrijven die teksten voor je, met hulp van AI. In jouw stijl, alleen met feiten uit je eigen productgegevens. Jij leest mee en keurt goed. Hieronder zie je hoe dat eruitziet.</p>

<h2>Zo ziet dat eruit</h2>

<p>Drie echte voorbeelden van Nederlandse webshops. We hebben de namen weggelaten.</p>

<h3>Voorbeeld 1: een chino van een herenkledingwinkel</h3>

<p><strong>Voor</strong>, een vast sjabloon dat bij elk product hetzelfde is:</p>
<p><em>"Deze Premium Chino met artikelnummer 1-96-007-84-600, in een Slim Fit (Fitnaam: Stockholm) kan je dragen naar een informele gelegenheid. Deze Premium Chino is van mooie stof(fen) geproduceerd (98% Katoen, 2% Elastaan)."</em></p>
<p><strong>Na</strong>:</p>
<blockquote><p>Slim fit chino in een rustig blauw. Katoen met 2% elastaan, dus hij geeft net wat mee. Met rits en zijzakken. Gewoon wasbaar op 30 graden.</p></blockquote>

<h3>Voorbeeld 2: een dekbed van een woontextielwinkel</h3>

<p><strong>Voor</strong>, alleen losse punten:</p>
<p><em>"Elegante ruches rand / In seconden opgemaakt / Volledig wasbaar en sneldrogend / Warm en knus op koude nachten"</em></p>
<p><strong>Na</strong>:</p>
<blockquote><p>Dit dekbed in gebroken wit maakt je bed in een paar seconden af. De ruches langs de rand geven je slaapkamer meteen een zachte finishing touch. Volledig wasbaar en snel droog, dus hij blijft zonder gedoe fris.</p></blockquote>

<h3>Voorbeeld 3: een shirt van een kledingmerk</h3>

<p><strong>Voor</strong>, letterlijk vertaald uit het Engels:</p>
<p><em>"Tennis staart" en "Materiaal: 95% Katoen / 5% Elastan"</em></p>
<p><strong>Na</strong>:</p>
<blockquote><p>Slanke pasvorm van 95% katoen en 5% elastaan: zacht op de huid en rekt mee. Met een iets langer achterpand.</p></blockquote>

<p>In alle drie de gevallen staat er niets nieuws in de tekst. Alles kwam al uit de productgegevens. Het verschil is dat een klant nu in één keer snapt wat hij koopt.</p>

<h2>Hoe het werkt</h2>

<ol>
  <li><strong>Jij stuurt je productlijst.</strong> Een export uit je webshop is genoeg, plus een paar teksten die je zelf goed vindt.</li>
  <li><strong>Wij zetten het op.</strong> We leggen je stijl vast en schrijven de teksten uit je eigen gegevens. Kan het in meer talen, dan vertalen we ze in dezelfde stijl.</li>
  <li><strong>Jij keurt goed.</strong> Je krijgt de teksten per reeks te zien. Pas als jij akkoord bent, gaan ze online.</li>
</ol>

<h2>Wat kost het?</h2>

<p><strong>${PRICE}</strong> Prijzen zijn exclusief btw. Het gebruik van de AI zelf betaal je apart aan de aanbieder. Wil je weten wat er precies in zit, kijk dan bij <a href="/oplossingen/productteksten/">productteksten met AI</a>.</p>

<h2>De eerste reeks maken we gratis</h2>

<p>Stuur ons tien producten. Wij schrijven de nieuwe teksten gratis, zodat je eerst kunt zien of het bij je webshop past. Bevalt het niet, dan kost het je niets. Mail naar <a href="${mailto("Productteksten: gratis eerste reeks")}">${MAIL}</a>.</p>

<h2>Veelgestelde vragen</h2>

${faqHtml(productFaq)}`,
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
    content: `<p>Elke ochtend open je je mail en staan er weer twintig vragen. Waar blijft mijn pakket? Kan ik dit nog ruilen? Hebben jullie deze ook in maat 40? Je weet het antwoord al, maar je typt het toch elke keer opnieuw. En als je een dag vrij bent, wacht je klant.</p>

<p>Een slimme assistent kan die vragen voor je beantwoorden, dag en nacht. Hij gebruikt alleen jouw eigen regels, zoals je verzendtijden en je retourbeleid. Twijfelt hij, dan stuurt hij de vraag door naar jou.</p>

<h2>Zo ziet dat eruit</h2>

<p>Dit is een voorbeeld. De webshop en de klant zijn verzonnen, de vragen zijn de vragen die elke webshop krijgt.</p>

<h3>Voorbeeld 1: "Waar blijft mijn bestelling?"</h3>

<p>De regels van de webshop: <em>"Op werkdagen voor 16:00 besteld, dan versturen we dezelfde dag met PostNL. Bezorging in 1 tot 2 werkdagen. Je krijgt een track &amp; trace per mail."</em></p>

<p><strong>De klant schrijft</strong>:</p>
<p><em>"Hoi, ik heb vorige week dinsdag besteld (bestelnummer 10482) en ik heb nog niks ontvangen. Waar blijft mijn bestelling?"</em></p>

<p><strong>De assistent antwoordt</strong>, nadat hij de bestelling heeft opgezocht:</p>
<blockquote><p>Hoi Sanne, vervelend dat je nog wacht. Je bestelling 10482 is woensdag met PostNL verstuurd. Volgens de track &amp; trace was je niet thuis, en ligt het pakket nu bij het PostNL-punt bij jou in de buurt. Je kunt het daar tot en met zaterdag ophalen met je legitimatie. Lukt dat niet? Laat het weten, dan zoeken we samen een oplossing.</p></blockquote>

<h3>Voorbeeld 2: "Kan ik dit nog ruilen?"</h3>

<p>De regel van de webshop: <em>"Ruilen of retour kan binnen 30 dagen na ontvangst. Ongedragen en met label. Retourneren is gratis."</em></p>

<p><strong>De klant schrijft</strong>:</p>
<p><em>"Ik heb drie weken geleden een jas gekregen maar hij is te klein. Kan ik hem nog ruilen voor een maat groter?"</em></p>

<p><strong>De assistent antwoordt</strong>:</p>
<blockquote><p>Hoi Mark, ja, dat kan nog. Je hebt 30 dagen na ontvangst om te ruilen, dus je zit nog goed. Zorg dat het label er nog aan zit. Via de link hieronder maak je gratis een retourlabel aan. Kies bij de reden "ruilen" en de maat die je wilt, dan sturen we die op zodra we je jas binnen hebben.</p></blockquote>

<p>Is de jas kapot aangekomen, of is de klant boos? Dan antwoordt de assistent niet zelf. Hij zet de vraag bij jou neer, met een korte samenvatting, zodat je meteen weet wat er speelt.</p>

<h2>Hoe het werkt</h2>

<ol>
  <li><strong>Jij stuurt je veelgestelde vragen.</strong> Plus je verzend- en retourregels en een stapel echte klantmails. Namen mag je eruit halen.</li>
  <li><strong>Wij zetten het op.</strong> We leren de assistent jouw antwoorden en koppelen hem aan je mail, chat of WhatsApp.</li>
  <li><strong>Jij keurt goed.</strong> Eerst zie je elk antwoord voordat het weggaat. Pas als je erop vertrouwt, laat je de makkelijke vragen zelf beantwoorden.</li>
</ol>

<h2>Wat kost het?</h2>

<p><strong>${PRICE}</strong> Prijzen zijn exclusief btw. Het gebruik van de AI zelf betaal je apart aan de aanbieder. Wil je weten wat er precies in zit, kijk dan bij de <a href="/oplossingen/klantenservice-agent/">klantenservice-assistent</a>.</p>

<h2>De eerste reeks maken we gratis</h2>

<p>Stuur ons je veelgestelde vragen en tien echte klantmails. Wij laten gratis zien welke antwoorden de assistent zou sturen. Zo zie je eerst of het klopt, voordat je iets betaalt. Mail naar <a href="${mailto("Klantenservice: gratis eerste reeks")}">${MAIL}</a>.</p>

<h2>Veelgestelde vragen</h2>

${faqHtml(serviceFaq)}`,
  },
];
