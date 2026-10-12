"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { WithEmails } from "@/components/ui/email-text";

/* Shared rendering for the three policy documents (terms, privacy, cookies). */

export type PolicyBlock = string | { list: string[] } | { company: true };
export type PolicyArticle = { title: string; body: PolicyBlock[] };
export type PolicyDoc = {
  title: string;
  updated: string;
  back: string;
  intro: string[];
  note?: string;
  numbered: boolean; // number paragraphs as 1.1, 1.2 ...
  articles: PolicyArticle[];
};

export const LAST_UPDATED = { nl: "Laatst bijgewerkt: 12 oktober 2026", en: "Last updated: 12 October 2026" };
export const EN_NOTE =
  "This English text is a translation for convenience. The Dutch version is legally binding. Switch the site language to Dutch to read it.";

const COMPANY = {
  nl: [
    ["Handelsnaam", "Virelio"],
    ["Vestigingsplaats", "Amsterdam, Nederland"],
    ["E-mail", "info@virelio.nl"],
    ["Telefoon", "+31 6 87838713"],
    ["Website", "virelio.nl"],
  ],
  en: [
    ["Trade name", "Virelio"],
    ["Registered in", "Amsterdam, the Netherlands"],
    ["Email", "info@virelio.nl"],
    ["Phone", "+31 6 87838713"],
    ["Website", "virelio.nl"],
  ],
};

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <a key={i} href={m[2]} className="font-medium text-primary hover:underline">
            {m[1]}
          </a>
        ) : (
          <WithEmails key={i} text={part} />
        );
      })}
    </>
  );
}

function CompanyDetails({ lang }: { lang: "nl" | "en" }) {
  return (
    <dl className="grid gap-x-6 gap-y-2 rounded-2xl border border-black/[0.07] bg-zinc-50/60 p-5 text-[15px] sm:grid-cols-[auto_1fr]">
      {COMPANY[lang].map(([label, value]) => (
        <React.Fragment key={label}>
          <dt className="text-zinc-500">{label}</dt>
          <dd className="font-medium text-zinc-900"><WithEmails text={value} /></dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export function PolicyDocument({ doc, showBackLink = true }: { doc: PolicyDoc; showBackLink?: boolean }) {
  const { language } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl bg-white px-5 py-12 text-zinc-600 sm:px-8 sm:py-20">
      {showBackLink && (
        <a href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          {doc.back}
        </a>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{doc.title}</h1>
      <p className="mt-3 text-sm text-zinc-500">{doc.updated}</p>
      {doc.note && (
        <p className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-sm leading-relaxed text-zinc-700">{doc.note}</p>
      )}
      <div className="mt-8 space-y-4 text-base leading-relaxed">
        {doc.intro.map((p) => (
          <p key={p}><Rich text={p} /></p>
        ))}
      </div>

      {doc.articles.map((article, ai) => {
        let n = 0;
        return (
          <section key={article.title} id={`artikel-${ai + 1}`} className="mt-10 scroll-mt-24 border-t border-black/[0.07] pt-8">
            <h2 className="mb-4 flex gap-3 text-lg font-semibold text-zinc-900">
              <span className="tabular-nums text-primary">{ai + 1}.</span>
              {article.title}
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed">
              {article.body.map((block, bi) => {
                if (typeof block === "string") {
                  n += 1;
                  return doc.numbered ? (
                    <div key={bi} className="flex gap-3">
                      <span className="w-9 shrink-0 tabular-nums text-zinc-400">{ai + 1}.{n}</span>
                      <p><Rich text={block} /></p>
                    </div>
                  ) : (
                    <p key={bi}><Rich text={block} /></p>
                  );
                }
                if ("list" in block) {
                  return (
                    <ul key={bi} className={`list-disc space-y-1.5 pl-5 marker:text-primary/60 ${doc.numbered ? "ml-12" : ""}`}>
                      {block.list.map((item) => (
                        <li key={item}><Rich text={item} /></li>
                      ))}
                    </ul>
                  );
                }
                return <CompanyDetails key={bi} lang={language} />;
              })}
            </div>
          </section>
        );
      })}
    </article>
  );
}

const NL: PolicyDoc = {
  title: "Algemene voorwaarden",
  updated: LAST_UPDATED.nl,
  back: "Terug naar home",
  numbered: true,
  intro: [
    "Deze algemene voorwaarden gelden voor alle offertes, opdrachten en diensten van Virelio. Virelio bouwt AI agents, chatbots, spraakassistenten en automatiseringen voor bedrijven. Heeft u een vraag over deze voorwaarden? Mail naar info@virelio.nl.",
  ],
  articles: [
    {
      title: "Definities",
      body: [
        "In deze voorwaarden betekenen de volgende begrippen:",
        {
          list: [
            "Virelio: de onderneming Virelio, gevestigd in Amsterdam, met de gegevens in artikel 26.",
            "Opdrachtgever: de onderneming of organisatie die een offerte vraagt of een overeenkomst sluit met Virelio.",
            "Overeenkomst: elke afspraak tussen Virelio en de opdrachtgever, inclusief de geaccepteerde offerte en deze voorwaarden.",
            "Oplossing: de AI agent, chatbot, spraakassistent, automatisering of andere software die Virelio voor de opdrachtgever bouwt, inclusief broncode, configuratie en documentatie.",
            "Setup: het eenmalige werk om de oplossing te ontwerpen, te bouwen en live te zetten. De setupvergoeding is de vergoeding daarvoor.",
            "Prototype: de eerste werkende versie van de oplossing, die de opdrachtgever test.",
            "Scope: de functies, koppelingen en acceptatiecriteria die schriftelijk zijn afgesproken in de offerte of in een later schriftelijk akkoord.",
            "Onderhoudsplan: het maandelijkse abonnement Onderhoud Basis of Onderhoud Plus.",
            "Verbruikskosten: kosten die afhangen van gebruik, zoals kosten van AI-modellen en API's, hosting, opslag, dataverkeer, telefonie en berichten.",
            "Derde partij: een aanbieder van een dienst die Virelio niet zelf levert, zoals OpenAI, Anthropic, Google, Meta (WhatsApp), Twilio, hostingpartijen en andere softwareleveranciers.",
            "Schriftelijk: per brief of per e-mail.",
          ],
        },
      ],
    },
    {
      title: "Toepasselijkheid",
      body: [
        "Deze voorwaarden gelden voor elke offerte, overeenkomst en dienst van Virelio.",
        "Deze voorwaarden zijn alleen bedoeld voor zakelijke opdrachtgevers (B2B). Virelio sluit geen overeenkomsten met consumenten en mag een aanvraag of opdracht van een consument weigeren.",
        "Bij het accepteren van een offerte bevestigt de opdrachtgever dat hij handelt in de uitoefening van een beroep of bedrijf. Hij geeft daarbij zijn KvK-nummer op.",
        "Virelio stuurt deze voorwaarden mee met elke offerte, als pdf of als link. De voorwaarden staan altijd op [virelio.nl/terms-of-service](/terms-of-service). De opdrachtgever kan ze daar opslaan en printen.",
        "Algemene voorwaarden of inkoopvoorwaarden van de opdrachtgever gelden niet. Virelio wijst die uitdrukkelijk af, ook als ze later worden meegestuurd.",
        "Afwijkingen van deze voorwaarden gelden alleen als ze schriftelijk zijn afgesproken. Staat in een geaccepteerde offerte iets anders dan in deze voorwaarden, dan gaat de offerte voor.",
        "Is een bepaling nietig of wordt die vernietigd, dan blijven de andere bepalingen gelden. Partijen vervangen de bepaling dan door een geldige bepaling die zo dicht mogelijk bij de bedoeling ligt.",
        "De Nederlandse tekst van deze voorwaarden is bindend. Bij verschil met een vertaling gaat de Nederlandse tekst voor.",
      ],
    },
    {
      title: "Website en informatie",
      body: [
        "De informatie op virelio.nl is algemeen. Er kunnen geen rechten aan worden ontleend. Wat Virelio levert, staat in de geaccepteerde offerte en in deze voorwaarden.",
        "Prijzen op de website zijn vanafprijzen of richtprijzen voor standaardprojecten. De prijs voor uw project staat in de offerte.",
        "Cases, rekenvoorbeelden, besparingen, terugverdientijden en percentages op de website zijn illustratief. Ze laten zien wat in een bepaalde situatie is bereikt of mogelijk is. Ze zijn geen belofte of garantie voor uw situatie.",
        "Virelio helpt bij een WBSO-aanvraag als dat is afgesproken. De Rijksdienst voor Ondernemend Nederland (RVO) beslist of subsidie wordt toegekend en hoeveel. Virelio garandeert geen toekenning en geen bedrag.",
      ],
    },
    {
      title: "Offertes en totstandkoming",
      body: [
        "Een offerte is 30 dagen geldig, tenzij in de offerte een andere termijn staat.",
        "Een offerte is vrijblijvend. De overeenkomst komt tot stand als de opdrachtgever de offerte schriftelijk accepteert, of als Virelio met instemming van de opdrachtgever begint met de uitvoering.",
        "Een offerte is gebaseerd op de informatie van de opdrachtgever. Blijkt die informatie onjuist of onvolledig, dan mag Virelio de offerte en de planning aanpassen.",
        "Een gratis intake of adviesgesprek verplicht tot niets.",
        "Kennelijke fouten of vergissingen in een offerte binden Virelio niet.",
      ],
    },
    {
      title: "Prijzen",
      body: [
        "Alle prijzen zijn in euro en exclusief btw en andere heffingen van de overheid.",
        "De setupvergoeding is eenmalig. Het is een vaste prijs voor de afgesproken scope. Werk buiten de scope is meerwerk (artikel 12).",
        "Na oplevering kan de opdrachtgever een onderhoudsplan afnemen. Onderhoud Basis kost € 99 per maand en omvat hosting, monitoring, updates en support. Onderhoud Plus kost € 249 per maand en omvat alles van Basis, plus maandelijkse verbeteringen en nieuwe functies.",
        "De hosting in een onderhoudsplan dekt het normale gebruik van de oplossing, zoals aangenomen in de offerte. Groeien verkeer, opslag of rekenkracht duidelijk boven die aanname uit, dan bespreekt Virelio de extra hostingkosten vooraf met de opdrachtgever. Die kosten gelden dan als verbruikskosten (artikel 6).",
        "Onderhoudsplannen hebben geen minimale looptijd en zijn maandelijks opzegbaar (artikel 23).",
        "Virelio mag haar eigen tarieven wijzigen. Zij meldt een wijziging ten minste 30 dagen vooraf schriftelijk. De opdrachtgever kan een onderhoudsplan opzeggen voordat de wijziging ingaat. Een vaste setupprijs in een geaccepteerde offerte verandert niet.",
        "Virelio mag haar tarieven daarnaast eenmaal per jaar per 1 januari indexeren met de consumentenprijsindex (CPI) van het CBS. Ook dat meldt zij 30 dagen vooraf.",
      ],
    },
    {
      title: "Verbruikskosten en kosten van derden",
      body: [
        "Naast de vergoedingen van Virelio heeft een AI-oplossing verbruikskosten. Voorbeelden zijn kosten per verwerkt token of verzoek bij een AI-model, spraak- en telefoniekosten, WhatsApp-berichten, hosting, opslag en dataverkeer.",
        "Verbruikskosten hangen af van gebruik en volume. Ze kunnen per maand verschillen. Het ene AI-model is duurder dan het andere. Hoe meer gesprekken, berichten of documenten de oplossing verwerkt, hoe hoger de kosten.",
        "Derde partijen bepalen hun eigen tarieven en kunnen die op elk moment wijzigen. Virelio heeft daar geen invloed op en garandeert geen prijzen van derde partijen.",
        "Waar mogelijk heeft de opdrachtgever een eigen account bij de AI- of hostingaanbieder en betaalt hij die aanbieder direct. Kan dat niet, of staat in de offerte dat de kosten via Virelio lopen, dan belast Virelio de verbruikskosten door.",
        "Belast Virelio verbruikskosten door, dan geldt het volgende:",
        {
          list: [
            "Virelio factureert de kosten maandelijks tegen de werkelijke kostprijs, zonder opslag;",
            "Virelio spreekt met de opdrachtgever een verwacht maandbudget af;",
            "Virelio meldt het de opdrachtgever vooraf als het verbruik dat budget met meer dan 25 procent dreigt te overschrijden;",
            "de opdrachtgever kan een harde bestedingslimiet laten instellen.",
          ],
        },
        "Staat in de offerte niets, dan betaalt de opdrachtgever de verbruikskosten direct aan de aanbieder.",
        "Schattingen van verbruikskosten in een offerte, op de website of in een gesprek zijn indicatief. Ze zijn gebaseerd op aannames over volume en op de tarieven van dat moment. Hogere werkelijke kosten zijn geen tekortkoming van Virelio.",
        "Virelio adviseert altijd de beste verhouding tussen prijs en kwaliteit, bijvoorbeeld bij de keuze van een AI-model. Op verzoek stelt Virelio limieten of meldingen in om onverwachte kosten te beperken. De opdrachtgever blijft verantwoordelijk voor het verbruik op zijn eigen accounts.",
        "Stijgen de verbruikskosten sterk, bijvoorbeeld door een tariefwijziging van een derde partij of een veel hoger volume, dan meldt Virelio dat zodra zij het ziet. Partijen kunnen dan samen een ander model of een andere inrichting kiezen.",
      ],
    },
    {
      title: "Uitvoering en levertijd",
      body: [
        "Virelio voert opdrachten uit naar beste inzicht en vermogen en volgens de eisen van goed vakmanschap. Dit is een inspanningsverplichting, tenzij Virelio schriftelijk uitdrukkelijk een resultaat heeft toegezegd.",
        "Live in 1 week is de streeftijd voor een standaardproject, zoals één AI agent met gangbare koppelingen. Projecten met meerdere agents of maatwerkkoppelingen duren langer. De planning per project staat in de offerte.",
        "Een termijn gaat pas lopen als Virelio alle informatie, toegang, materialen en akkoorden van de opdrachtgever heeft. Vertraging aan de kant van de opdrachtgever of van een derde partij verschuift de planning.",
        "Alle termijnen zijn streeftermijnen en geen fatale termijnen. Bij overschrijding stelt de opdrachtgever Virelio eerst schriftelijk in gebreke met een redelijke termijn om alsnog te leveren.",
        "Virelio mag anderen inschakelen bij de uitvoering. Virelio blijft dan verantwoordelijk tegenover de opdrachtgever.",
        "Virelio streeft ernaar om op werkdagen binnen 4 uur persoonlijk te reageren op berichten. Dit is een streeftijd en geen gegarandeerde responstijd. Afspraken over support en reactietijden staan in het onderhoudsplan of de offerte.",
      ],
    },
    {
      title: "Medewerking van de opdrachtgever",
      body: [
        "De opdrachtgever geeft op tijd alle informatie, toegang, accounts, API-sleutels en materialen die Virelio nodig heeft.",
        "De opdrachtgever zorgt dat deze gegevens en materialen juist en volledig zijn, en dat hij het recht heeft om ze te gebruiken en aan Virelio te geven.",
        "De opdrachtgever wijst een contactpersoon aan die beslissingen kan nemen en binnen redelijke tijd reageert.",
        "De opdrachtgever test het prototype en geeft zijn feedback binnen de afgesproken termijn.",
        "De opdrachtgever maakt zelf back-ups van zijn gegevens en systemen, tenzij back-ups uitdrukkelijk onderdeel zijn van de opdracht.",
        "Komt de opdrachtgever deze plichten niet na, dan mag Virelio de uitvoering opschorten en de extra kosten in rekening brengen.",
      ],
    },
    {
      title: "Oplevering, testen en acceptatie",
      body: [
        "Virelio levert eerst een prototype. De opdrachtgever test het prototype aan de hand van de scope.",
        "Binnen de scope voert Virelio aanpassingen kosteloos door, totdat de oplossing doet wat schriftelijk is afgesproken. Nieuwe wensen en wijzigingen buiten de scope zijn meerwerk.",
        "Daarna zet Virelio de productieversie live. De opdrachtgever heeft 5 werkdagen om afwijkingen van de scope schriftelijk te melden.",
        "De oplossing is geaccepteerd zodra een van deze situaties zich voordoet:",
        {
          list: [
            "de opdrachtgever geeft schriftelijk akkoord;",
            "de termijn van 5 werkdagen verstrijkt zonder gemotiveerde melding; of",
            "de opdrachtgever neemt de oplossing in gebruik voor zijn bedrijf.",
          ],
        },
        "Kleine fouten die het gebruik niet wezenlijk hinderen, staan acceptatie niet in de weg. Virelio herstelt die alsnog.",
        "Acceptatie of ingebruikname doet de geld-terug-garantie binnen de termijn van artikel 10 niet vervallen.",
        "Na volledige betaling levert Virelio de repository met de broncode en de documentatie van de oplossing aan de opdrachtgever.",
        "Heeft de opdrachtgever geen onderhoudsplan, dan herstelt Virelio fouten die binnen 30 dagen na acceptatie worden gemeld en die aantoonbaar door Virelio zijn veroorzaakt, kosteloos. Daarna herstelt Virelio fouten tegen het dan geldende uurtarief.",
      ],
    },
    {
      title: "Geld-terug-garantie",
      body: [
        "Virelio biedt een geld-terug-garantie op de setupvergoeding. De garantie geldt alleen onder de voorwaarden in dit artikel.",
        "De garantie geldt als het prototype of de productieversie niet doet wat schriftelijk in de scope is afgesproken, en Virelio dat niet binnen een redelijke termijn kan herstellen. Virelio krijgt daarvoor ten minste 10 werkdagen na de schriftelijke melding van de opdrachtgever.",
        "De opdrachtgever doet schriftelijk een beroep op de garantie, binnen 14 dagen na de livegang of na oplevering van het prototype. De latere datum telt. Hij beschrijft welke afgesproken punten niet werken.",
        "Dat de opdrachtgever de oplossing in gebruik neemt, doet de garantie niet vervallen.",
        "De garantie geldt niet:",
        {
          list: [
            "als het probleem ontstaat door informatie, toegang of medewerking van de opdrachtgever;",
            "als het probleem ontstaat door een storing of onbeschikbaarheid van een dienst van een derde partij. Normaal gedrag van een AI-model binnen de afgesproken scope valt niet onder deze uitzondering;",
            "als de opdrachtgever van gedachten of van wensen verandert, ook niet na de livegang;",
            "voor verbruikskosten, kosten van derde partijen en onderhoudsvergoedingen die al zijn gemaakt of gefactureerd;",
            "voor meerwerk dat al is uitgevoerd.",
          ],
        },
        "Is het beroep terecht, dan betaalt Virelio de betaalde setupvergoeding binnen 14 dagen terug. De garantie dekt alleen de eenmalige setupvergoeding. De opdracht eindigt dan. De opdrachtgever krijgt geen rechten op de oplossing en stopt met het gebruik ervan. Virelio verwijdert de gegevens van de opdrachtgever volgens artikel 18.",
        "Met de terugbetaling zijn alle aanspraken van de opdrachtgever wegens de tekortkoming in de oplossing afgehandeld.",
      ],
    },
    {
      title: "Onderhoud en support",
      body: [
        "Onderhoud Basis omvat hosting (zie artikel 5.4), monitoring, technische updates en support bij storingen en vragen.",
        "Onderhoud Plus omvat alles van Basis, plus maandelijkse verbeteringen en nieuwe functies van een omvang die in de offerte of in overleg is afgestemd. Grotere uitbreidingen zijn meerwerk.",
        "Virelio garandeert geen ononderbroken beschikbaarheid. Gepland onderhoud kondigt Virelio waar mogelijk vooraf aan.",
        "Heeft de opdrachtgever geen onderhoudsplan, dan host hij de oplossing zelf, tenzij anders afgesproken. Virelio is dan niet verantwoordelijk voor het blijven werken van de oplossing, bijvoorbeeld na een wijziging bij een derde partij.",
      ],
    },
    {
      title: "Meerwerk",
      body: [
        "Werk dat niet in de scope staat, is meerwerk. Voorbeelden zijn nieuwe functies, extra koppelingen, wijzigingen na acceptatie en extra werk door wijzigingen in systemen of diensten van derden.",
        "Virelio voert meerwerk pas uit na schriftelijk akkoord van de opdrachtgever op de prijs of het uurtarief. Meerwerk kan de planning verschuiven.",
      ],
    },
    {
      title: "Intellectueel eigendom",
      body: [
        "Virelio draagt de auteursrechten op de broncode en documentatie die zij speciaal voor de opdrachtgever heeft gemaakt, over aan de opdrachtgever. De overdracht gebeurt via de getekende of geaccepteerde offerte. Partijen komen overeen dat die offerte geldt als akte van overdracht in de zin van artikel 2 lid 3 Auteurswet. De overdracht gaat in op het moment dat alle bedragen voor de opdracht volledig zijn betaald.",
        "Virelio doet afstand van haar persoonlijkheidsrechten (artikel 25 Auteurswet), voor zover de wet dat toelaat.",
        "Na volledige betaling levert Virelio de repository met de broncode en de documentatie aan de opdrachtgever (artikel 9).",
        "Tot de volledige betaling heeft de opdrachtgever alleen een tijdelijk recht om de oplossing te gebruiken.",
        "Virelio houdt de rechten op haar algemene kennis, werkwijzen, tools, templates en herbruikbare componenten die zij al had of ook voor andere klanten gebruikt. Zitten die in de oplossing, dan krijgt de opdrachtgever als onderdeel van het opgeleverde werk een eeuwigdurend, niet-exclusief en kosteloos recht om ze te gebruiken, te wijzigen en door anderen te laten onderhouden.",
        "Open-source software en diensten van derden in de oplossing vallen onder de licenties en voorwaarden van die partijen. De opdrachtgever kan daarvoor eigen accounts of abonnementen nodig hebben.",
        "De opdrachtgever blijft eigenaar van zijn eigen gegevens en van de inhoud die hij aanlevert.",
        "Virelio mag het project anoniem noemen als referentie, bijvoorbeeld als een logistiek bedrijf in Noord-Holland, zonder vertrouwelijke informatie. De naam of het logo van de opdrachtgever gebruikt Virelio alleen met toestemming. De opdrachtgever kan een anonieme vermelding schriftelijk uitsluiten.",
      ],
    },
    {
      title: "AI-specifieke bepalingen",
      body: [
        "AI-modellen werken met waarschijnlijkheden. Hun output kan onjuist, onvolledig, verouderd of ongepast zijn, ook als de oplossing goed is gebouwd. Virelio garandeert niet dat output altijd juist is.",
        "De opdrachtgever blijft verantwoordelijk voor het controleren van de output en voor beslissingen die hij op basis van de output neemt. Bij beslissingen met grote gevolgen, zoals juridische, financiële of medische beslissingen of beslissingen over personen, zorgt de opdrachtgever voor menselijke controle.",
        "Virelio garandeert geen specifieke bedrijfsresultaten, zoals een besparing, omzet, conversie of een percentage geautomatiseerde gesprekken.",
        "De opdrachtgever is verantwoordelijk voor het gebruik van de oplossing in zijn organisatie, inclusief de regels voor AI zoals de Europese AI-verordening (AI Act). Hij vertelt mensen die met een AI agent, chatbot of spraakassistent communiceren dat zij met AI te maken hebben, als dat verplicht is. Hij informeert bellers als gesprekken worden opgenomen of uitgeschreven.",
        "AI-aanbieders kunnen een model aanpassen, vervangen of stoppen. Daardoor kan het gedrag van de oplossing veranderen. Virelio past de oplossing daarop aan binnen het onderhoudsplan. Grotere aanpassingen zijn meerwerk.",
        "Virelio gebruikt gegevens van de opdrachtgever niet om eigen AI-modellen te trainen. Waar mogelijk kiest Virelio instellingen waarbij aanbieders de gegevens niet voor training gebruiken.",
      ],
    },
    {
      title: "Diensten van derden",
      body: [
        "De oplossing werkt vaak met diensten van derden, zoals AI-modellen van OpenAI, Anthropic of Google, WhatsApp van Meta, telefonie van Twilio, hosting en de software van de opdrachtgever zelf.",
        "Beschikbaarheid, storingen, tariefwijzigingen, beleidswijzigingen en technische wijzigingen bij derde partijen vallen buiten de invloed van Virelio. Virelio is daarvoor niet aansprakelijk.",
        "De opdrachtgever houdt zich aan de voorwaarden en het beleid van de derde partijen die hij gebruikt, zoals de WhatsApp Business-voorwaarden en het gebruiksbeleid van AI-aanbieders. Blokkeert een derde partij een account of nummer door het gebruik van de opdrachtgever, dan is dat voor rekening van de opdrachtgever.",
        "Neemt Virelio een dienst van een derde partij af voor de opdrachtgever, dan gelden de voorwaarden van die partij ook tussen Virelio en de opdrachtgever.",
      ],
    },
    {
      title: "Aanvaardbaar gebruik",
      body: [
        "De opdrachtgever gebruikt de oplossing niet:",
        {
          list: [
            "voor iets dat in strijd is met de wet;",
            "om mensen te misleiden, bijvoorbeeld door te doen alsof een AI een mens is;",
            "voor spam of ongevraagde berichten;",
            "om inbreuk te maken op rechten van anderen, zoals privacy of auteursrecht;",
            "voor AI-toepassingen die de AI-verordening verbiedt;",
            "om schadelijke, discriminerende of misleidende inhoud te maken of te verspreiden.",
          ],
        },
        "De opdrachtgever vrijwaart Virelio tegen aanspraken van derden die voortkomen uit zijn gebruik van de oplossing, uit de gegevens of materialen die hij aanlevert, of uit het niet naleven van dit artikel.",
        "Heeft Virelio een ernstig vermoeden van misbruik, dan mag zij de oplossing direct tijdelijk uitschakelen. Virelio laat dat de opdrachtgever meteen weten.",
      ],
    },
    {
      title: "Geheimhouding",
      body: [
        "Partijen houden vertrouwelijke informatie van elkaar geheim. Informatie is vertrouwelijk als dat is gezegd of als dat volgt uit de aard van de informatie. Voorbeelden zijn bedrijfsprocessen, klantgegevens, broncode, prijzen en API-sleutels.",
        "Deze plicht geldt niet voor informatie die al openbaar is, die een partij al rechtmatig had, of die een partij moet geven op grond van de wet of een rechterlijke uitspraak.",
        "Virelio geeft alleen toegang tot vertrouwelijke informatie aan mensen die aan de opdracht werken, en legt hun dezelfde plicht op.",
        "De geheimhoudingsplicht blijft gelden na het einde van de overeenkomst.",
      ],
    },
    {
      title: "Gegevensbescherming",
      body: [
        "Partijen houden zich aan de Algemene verordening gegevensbescherming (AVG).",
        "Verwerkt Virelio persoonsgegevens in opdracht van de opdrachtgever, ook bij hosting onder een onderhoudsplan, dan is de opdrachtgever verwerkingsverantwoordelijke en Virelio verwerker. Vanaf de acceptatie van de offerte geldt dan automatisch de verwerkersovereenkomst in Bijlage 1 (artikel 27).",
        "Virelio verwerkt gegevens waar mogelijk binnen de Europese Economische Ruimte (EER) en kiest bij aanbieders waar mogelijk een EU-regio. Sommige AI-aanbieders zijn gevestigd in de Verenigde Staten. Doorgifte gebeurt dan alleen met een passende waarborg, zoals het EU-VS Data Privacy Framework of standaardcontractbepalingen van de Europese Commissie. Op verzoek geeft Virelio per project een overzicht van waar en bij wie gegevens worden verwerkt.",
        "Mogen gegevens het netwerk van de opdrachtgever niet verlaten, dan kan Virelio een oplossing bouwen die bij de opdrachtgever zelf draait (on-premise), tegen de daarvoor afgesproken prijs.",
        "De opdrachtgever zorgt dat hij een grondslag heeft voor de verwerking en dat hij de betrokkenen informeert.",
        "Na het einde van de overeenkomst verwijdert of retourneert Virelio de persoonsgegevens van de opdrachtgever, zoals in Bijlage 1 staat.",
        "Hoe Virelio zelf persoonsgegevens verwerkt, staat in de [privacyverklaring](/privacy-policy).",
      ],
    },
    {
      title: "Betaling",
      body: [
        "Virelio factureert volgens het betaalschema in de offerte. Staat daar niets, dan factureert Virelio 50% van de setupvergoeding bij opdracht en 50% bij oplevering van de productieversie. Onderhoudsplannen factureert Virelio maandelijks vooraf. Verbruikskosten die via Virelio lopen, factureert Virelio maandelijks achteraf.",
        "De betaaltermijn is 14 dagen na factuurdatum.",
        "Betaalt de opdrachtgever niet op tijd, dan is hij zonder ingebrekestelling in verzuim. Vanaf de vervaldag is hij dan de wettelijke handelsrente verschuldigd (artikel 6:119a Burgerlijk Wetboek).",
        "Blijft betaling na een aanmaning uit, dan mag Virelio de vordering uit handen geven. De opdrachtgever betaalt dan ook de buitengerechtelijke incassokosten volgens het Besluit vergoeding voor buitengerechtelijke incassokosten, met een minimum van € 40, en de gerechtelijke kosten.",
        "Bezwaar tegen een factuur meldt de opdrachtgever schriftelijk binnen 14 dagen na factuurdatum. Het bezwaar schort de betaling van het niet betwiste deel niet op.",
        "De opdrachtgever mag bedragen niet verrekenen en zijn betaling niet opschorten.",
      ],
    },
    {
      title: "Opschorting bij niet-betaling",
      body: [
        "Betaalt de opdrachtgever niet binnen 7 dagen na een schriftelijke herinnering, dan mag Virelio haar werk en diensten opschorten. Dat geldt ook voor hosting en het draaien van de oplossing. Virelio kondigt de opschorting in de herinnering aan.",
        "Tijdens de opschorting blijven de vergoedingen en verbruikskosten verschuldigd. Virelio is niet aansprakelijk voor schade door de opschorting.",
        "Virelio hervat de diensten binnen 2 werkdagen nadat alle openstaande bedragen zijn betaald.",
      ],
    },
    {
      title: "Aansprakelijkheid",
      body: [
        "Virelio is alleen aansprakelijk voor directe schade door een toerekenbare tekortkoming in de nakoming van de overeenkomst. De opdrachtgever stelt Virelio eerst schriftelijk in gebreke, met een redelijke termijn om de tekortkoming te herstellen, tenzij herstel blijvend onmogelijk is.",
        "Directe schade is alleen:",
        {
          list: [
            "redelijke kosten om de oorzaak en omvang van de schade vast te stellen;",
            "redelijke kosten om de prestatie van Virelio alsnog aan de overeenkomst te laten voldoen;",
            "redelijke kosten om schade te voorkomen of te beperken.",
          ],
        },
        "Virelio is niet aansprakelijk voor indirecte schade of gevolgschade. Daaronder vallen gederfde winst, gemiste besparingen, omzetverlies, bedrijfsstilstand, reputatieschade, verlies of beschadiging van gegevens, boetes van toezichthouders, schade door beslissingen op basis van AI-output en schade door storingen of wijzigingen bij derde partijen.",
        "De aansprakelijkheid is per gebeurtenis beperkt tot de totale setupvergoeding van de betreffende opdracht, plus de onderhoudsvergoedingen die de opdrachtgever heeft betaald in de 6 maanden voor de gebeurtenis. Doorbelaste verbruikskosten tellen niet mee. Samenhangende gebeurtenissen gelden als één gebeurtenis.",
        "Deze beperkingen gelden niet als de schade het gevolg is van opzet of bewuste roekeloosheid van de bedrijfsleiding van Virelio.",
        "Een vordering vervalt als de opdrachtgever de schade niet binnen 12 maanden schriftelijk bij Virelio meldt nadat hij de schade heeft ontdekt of redelijkerwijs had kunnen ontdekken.",
        "Deze beperkingen gelden ook voor de mensen en partijen die Virelio bij de uitvoering inschakelt.",
      ],
    },
    {
      title: "Overmacht",
      body: [
        "Virelio is niet aansprakelijk als zij door overmacht niet kan nakomen. Overmacht is elke omstandigheid buiten de invloed van Virelio die nakoming verhindert of onredelijk zwaar maakt. Voorbeelden:",
        {
          list: [
            "storingen bij AI-aanbieders, hosting- en cloudpartijen, telefonie- of berichtendiensten;",
            "storingen in internet, stroom of telecommunicatie;",
            "beleidswijzigingen van AI-aanbieders en andere derde partijen;",
            "het stoppen of wijzigen van een model of dienst door een aanbieder;",
            "cyberaanvallen, ziekte van een sleutelpersoon en maatregelen van de overheid.",
          ],
        },
        "Tijdens overmacht worden de verplichtingen opgeschort. Duurt de overmacht langer dan 60 dagen, dan mag elke partij de overeenkomst schriftelijk ontbinden voor het deel dat nog niet is uitgevoerd, zonder schadevergoeding.",
        "Wat Virelio al heeft uitgevoerd, mag zij factureren.",
      ],
    },
    {
      title: "Duur en beëindiging",
      body: [
        "Een setupopdracht eindigt na acceptatie en betaling, of eerder volgens artikel 10.",
        "Een onderhoudsplan loopt voor onbepaalde tijd, zonder minimale looptijd. De opdrachtgever kan het elke maand opzeggen, per het einde van de lopende kalendermaand. Een e-mail naar info@virelio.nl is genoeg. Betaalde maanden worden niet terugbetaald.",
        "Virelio kan een onderhoudsplan opzeggen met een opzegtermijn van één kalendermaand.",
        "Elke partij mag de overeenkomst schriftelijk ontbinden als de andere partij een wezenlijke verplichting niet nakomt, ook niet na een schriftelijke ingebrekestelling met een redelijke termijn. Ontbinding met directe ingang is mogelijk als de andere partij failliet gaat, surseance van betaling krijgt of haar bedrijf beëindigt.",
        "Bij het einde levert Virelio op verzoek de broncode, configuratie en documentatie waarop de opdrachtgever recht heeft, en helpt zij bij de overdracht naar eigen hosting of een andere partij. Een overdracht van normale omvang is inbegrepen. Een uitgebreide migratie is meerwerk.",
        "Virelio stopt de hosting na de laatste betaalde maand. Zij verwijdert de gegevens van de opdrachtgever 30 dagen na het einde, tenzij anders afgesproken of tenzij de wet bewaren verplicht.",
        "Bepalingen die naar hun aard doorlopen, zoals geheimhouding, aansprakelijkheid, intellectueel eigendom en toepasselijk recht, blijven na het einde gelden.",
      ],
    },
    {
      title: "Wijziging van deze voorwaarden",
      body: [
        "Virelio mag deze voorwaarden wijzigen. De nieuwe versie staat met datum op virelio.nl.",
        "Voor lopende onderhoudsplannen gelden wijzigingen 30 dagen na schriftelijke aankondiging. Is de opdrachtgever het er niet mee eens, dan kan hij het onderhoudsplan opzeggen per de datum waarop de wijziging ingaat.",
        "Voor een lopende setupopdracht blijft de versie gelden die gold toen de offerte werd geaccepteerd.",
      ],
    },
    {
      title: "Toepasselijk recht en geschillen",
      body: [
        "Op deze voorwaarden en alle overeenkomsten met Virelio is Nederlands recht van toepassing. Het Weens Koopverdrag (CISG) is niet van toepassing.",
        "Partijen proberen een geschil eerst samen op te lossen. Lukt dat niet, dan legt een partij het geschil voor aan de bevoegde rechter van de rechtbank Amsterdam.",
      ],
    },
    {
      title: "Bedrijfsgegevens",
      body: ["Deze voorwaarden zijn van:", { company: true }],
    },
    {
      title: "Bijlage 1: Verwerkersovereenkomst",
      body: [
        "Deze verwerkersovereenkomst geldt als Virelio persoonsgegevens verwerkt in opdracht van de opdrachtgever (artikel 18). De opdrachtgever is verwerkingsverantwoordelijke en Virelio is verwerker in de zin van artikel 28 AVG. Deze bijlage geldt automatisch vanaf de acceptatie van de offerte.",
        "Onderwerp en duur. Virelio verwerkt persoonsgegevens alleen om de overeenkomst uit te voeren: het bouwen, testen, hosten, onderhouden en ondersteunen van de oplossing. De verwerking duurt zolang de overeenkomst loopt, en daarna tot de gegevens zijn verwijderd of geretourneerd.",
        "Aard en doel. De verwerking bestaat uit het ontvangen, opslaan, analyseren, laten verwerken door AI-modellen, doorsturen en verwijderen van gegevens. Het doel is dat de oplossing doet wat in de scope is afgesproken, zoals vragen beantwoorden, gesprekken voeren, berichten versturen of processen automatiseren.",
        "Categorieën gegevens en betrokkenen. Het gaat om de gegevens die de oplossing verwerkt, zoals naam- en contactgegevens, inhoud van berichten, chats en gesprekken, spraakopnames en transcripties, klant- en ordergegevens en technische gegevens zoals IP-adressen en logbestanden. Betrokkenen zijn klanten, leads, bellers, websitebezoekers en medewerkers van de opdrachtgever. De opdrachtgever laat geen bijzondere persoonsgegevens verwerken, tenzij dat schriftelijk is afgesproken.",
        "Instructies. Virelio verwerkt de gegevens alleen op schriftelijke instructies van de opdrachtgever. De overeenkomst, de offerte en de scope gelden als die instructies. Is Virelio wettelijk verplicht tot een andere verwerking, dan meldt zij dat vooraf, tenzij de wet dat verbiedt. Vindt Virelio een instructie in strijd met de AVG, dan meldt zij dat direct.",
        "Vertrouwelijkheid. Virelio geeft alleen toegang tot de gegevens aan mensen die daarvoor nodig zijn. Zij hebben een geheimhoudingsplicht op grond van een overeenkomst of de wet.",
        "Beveiliging. Virelio neemt passende technische en organisatorische maatregelen volgens artikel 32 AVG. Voorbeelden zijn versleuteling tijdens transport en waar mogelijk bij opslag, toegang alleen voor bevoegde personen, sterke wachtwoorden en tweestapsverificatie, het veilig bewaren van API-sleutels, het bijhouden van updates en het beperken van gegevens tot wat nodig is.",
        "Subverwerkers. De opdrachtgever geeft Virelio algemene schriftelijke toestemming om subverwerkers in te schakelen. Virelio legt hun dezelfde verplichtingen op als in deze bijlage en blijft verantwoordelijk voor hen. De huidige categorieën subverwerkers zijn:",
        {
          list: [
            "aanbieders van AI-modellen, zoals OpenAI, Anthropic en Google;",
            "hosting- en cloudaanbieders;",
            "berichten- en telefoniediensten, zoals WhatsApp (Meta) en Twilio;",
            "e-maildiensten.",
          ],
        },
        "Virelio meldt een nieuwe of vervangende subverwerker vooraf schriftelijk. De opdrachtgever kan binnen 14 dagen gemotiveerd bezwaar maken. Vinden partijen geen oplossing, dan kan de opdrachtgever het betreffende deel van de overeenkomst opzeggen.",
        "Rechten van betrokkenen. Virelio helpt de opdrachtgever, voor zover redelijk, bij verzoeken van betrokkenen, zoals inzage, correctie en verwijdering. Komt een verzoek bij Virelio binnen, dan stuurt zij het door aan de opdrachtgever.",
        "Overige hulp. Virelio helpt de opdrachtgever, voor zover redelijk, bij de verplichtingen uit artikel 32 tot en met 36 AVG, zoals beveiliging, het melden van datalekken, een gegevensbeschermingseffectbeoordeling (DPIA) en voorafgaande raadpleging van de toezichthouder.",
        "Datalekken. Virelio meldt een inbreuk in verband met persoonsgegevens zonder onredelijke vertraging aan de opdrachtgever, en in elk geval binnen 48 uur nadat zij die heeft ontdekt. Zij geeft daarbij de informatie die de opdrachtgever nodig heeft voor een melding aan de Autoriteit Persoonsgegevens en de betrokkenen. De opdrachtgever beslist over die meldingen.",
        "Einde. Na het einde van de overeenkomst verwijdert Virelio de persoonsgegevens, of geeft zij die terug als de opdrachtgever dat vraagt. Dit gebeurt binnen 30 dagen, tenzij de wet bewaren verplicht. Ook kopieën bij subverwerkers worden verwijderd, binnen hun gebruikelijke termijnen.",
        "Audits en informatie. Virelio geeft de opdrachtgever alle informatie die nodig is om aan te tonen dat zij zich aan artikel 28 AVG houdt. De opdrachtgever mag een audit laten uitvoeren door een onafhankelijke deskundige met geheimhoudingsplicht, na een aankondiging van ten minste 14 dagen. De opdrachtgever betaalt de kosten van de audit.",
        "Doorgifte buiten de EER. Gaan gegevens naar een land buiten de EER, dan gebeurt dat alleen met een passende waarborg, zoals het EU-VS Data Privacy Framework of de standaardcontractbepalingen van de Europese Commissie.",
        "Aansprakelijkheid. Voor de aansprakelijkheid onder deze bijlage geldt artikel 21 van deze voorwaarden.",
        "Bij verschil tussen deze bijlage en de rest van de voorwaarden gaat deze bijlage voor, voor zover het gaat om de verwerking van persoonsgegevens.",
      ],
    },
  ],
};

const EN: PolicyDoc = {
  title: "General terms and conditions",
  updated: LAST_UPDATED.en,
  back: "Back to home",
  note: EN_NOTE,
  numbered: true,
  intro: [
    "These general terms and conditions apply to all quotes, assignments and services of Virelio. Virelio builds AI agents, chatbots, voice assistants and automations for businesses. Questions about these terms? Email info@virelio.nl.",
  ],
  articles: [
    {
      title: "Definitions",
      body: [
        "In these terms the following words mean:",
        {
          list: [
            "Virelio: the business Virelio, based in Amsterdam, with the details in article 26.",
            "Client: the business or organisation that requests a quote from or enters into an agreement with Virelio.",
            "Agreement: every arrangement between Virelio and the client, including the accepted quote and these terms.",
            "Solution: the AI agent, chatbot, voice assistant, automation or other software that Virelio builds for the client, including source code, configuration and documentation.",
            "Setup: the one-off work to design, build and launch the solution. The setup fee is the fee for this work.",
            "Prototype: the first working version of the solution, which the client tests.",
            "Scope: the features, integrations and acceptance criteria agreed in writing in the quote or in a later written approval.",
            "Maintenance plan: the monthly subscription Maintenance Basic (Onderhoud Basis) or Maintenance Plus (Onderhoud Plus).",
            "Usage costs: costs that depend on usage, such as costs of AI models and APIs, hosting, storage, data traffic, telephony and messages.",
            "Third party: a provider of a service that Virelio does not supply itself, such as OpenAI, Anthropic, Google, Meta (WhatsApp), Twilio, hosting companies and other software vendors.",
            "In writing: by letter or by email.",
          ],
        },
      ],
    },
    {
      title: "Applicability",
      body: [
        "These terms apply to every quote, agreement and service of Virelio.",
        "These terms are intended only for business clients (B2B). Virelio does not enter into agreements with consumers and may refuse a request or assignment from a consumer.",
        "When accepting a quote, the client confirms that it acts in the course of a profession or business. It provides its Chamber of Commerce (KvK) number at the same time.",
        "Virelio sends these terms with every quote, as a PDF or as a link. The terms are always available at [virelio.nl/terms-of-service](/terms-of-service). The client can save and print them there.",
        "General terms or purchasing terms of the client do not apply. Virelio expressly rejects them, also if they are sent later.",
        "Deviations from these terms apply only if agreed in writing. If an accepted quote differs from these terms, the quote prevails.",
        "If a provision is void or annulled, the other provisions remain in force. The parties then replace that provision with a valid one that comes as close as possible to its purpose.",
        "The Dutch text of these terms is binding. If it differs from a translation, the Dutch text prevails.",
      ],
    },
    {
      title: "Website and information",
      body: [
        "The information on virelio.nl is general. No rights can be derived from it. What Virelio delivers is set out in the accepted quote and in these terms.",
        "Prices on the website are starting prices or guide prices for standard projects. The price for your project is in the quote.",
        "Case studies, worked examples, savings, payback periods and percentages on the website are illustrative. They show what was achieved or is possible in a specific situation. They are not a promise or guarantee for your situation.",
        "Virelio helps with a WBSO application if agreed. The Netherlands Enterprise Agency (RVO) decides whether a subsidy is granted and how much. Virelio does not guarantee a grant or an amount.",
      ],
    },
    {
      title: "Quotes and formation of the agreement",
      body: [
        "A quote is valid for 30 days, unless the quote states another period.",
        "A quote is not binding. The agreement is formed when the client accepts the quote in writing, or when Virelio starts the work with the client's consent.",
        "A quote is based on the information the client provides. If that information turns out to be wrong or incomplete, Virelio may adjust the quote and the planning.",
        "A free intake or advisory call creates no obligation.",
        "Obvious errors or mistakes in a quote do not bind Virelio.",
      ],
    },
    {
      title: "Prices",
      body: [
        "All prices are in euros and exclude VAT and other government levies.",
        "The setup fee is a one-off fee. It is a fixed price for the agreed scope. Work outside the scope is additional work (article 12).",
        "After delivery the client can take a maintenance plan. Maintenance Basic costs € 99 per month and includes hosting, monitoring, updates and support. Maintenance Plus costs € 249 per month and includes everything in Basic, plus monthly improvements and new features.",
        "The hosting in a maintenance plan covers normal use of the solution, as assumed in the quote. If traffic, storage or computing power grows clearly beyond that assumption, Virelio discusses the extra hosting costs with the client in advance. Those costs then count as usage costs (article 6).",
        "Maintenance plans have no minimum term and can be cancelled monthly (article 23).",
        "Virelio may change its own rates. It gives at least 30 days' written notice of a change. The client can cancel a maintenance plan before the change takes effect. A fixed setup price in an accepted quote does not change.",
        "Virelio may also index its rates once a year on 1 January with the consumer price index (CPI) of Statistics Netherlands (CBS). It gives 30 days' notice of this as well.",
      ],
    },
    {
      title: "Usage costs and third-party costs",
      body: [
        "Besides Virelio's fees, an AI solution has usage costs. Examples are costs per processed token or request of an AI model, voice and telephony costs, WhatsApp messages, hosting, storage and data traffic.",
        "Usage costs depend on usage and volume. They can differ from month to month. Some AI models cost more than others. The more conversations, messages or documents the solution handles, the higher the costs.",
        "Third parties set their own rates and can change them at any time. Virelio has no control over this and does not guarantee third-party prices.",
        "Where possible, the client holds its own account with the AI or hosting provider and pays that provider directly. If that is not possible, or the quote states that costs run through Virelio, Virelio passes the usage costs on.",
        "If Virelio passes usage costs on, the following applies:",
        {
          list: [
            "Virelio invoices the costs monthly at actual cost, without a mark-up;",
            "Virelio agrees an expected monthly budget with the client;",
            "Virelio notifies the client in advance if usage is about to exceed that budget by more than 25 percent;",
            "the client can have a hard spending limit set.",
          ],
        },
        "If the quote says nothing about this, the client pays usage costs directly to the provider.",
        "Estimates of usage costs in a quote, on the website or in a conversation are indicative. They are based on assumptions about volume and on the rates at that time. Higher actual costs are not a failure by Virelio.",
        "Virelio always advises the best balance between price and quality, for example when choosing an AI model. On request Virelio sets limits or alerts to prevent unexpected costs. The client remains responsible for the usage on its own accounts.",
        "If usage costs rise sharply, for example because a third party changes its rates or volume grows a lot, Virelio reports this as soon as it notices. The parties can then choose another model or set-up together.",
      ],
    },
    {
      title: "Performance and delivery times",
      body: [
        "Virelio performs assignments to the best of its knowledge and ability and in line with good workmanship. This is a best-efforts obligation, unless Virelio has expressly promised a specific result in writing.",
        "Live in 1 week is the target for a standard project, such as one AI agent with common integrations. Projects with several agents or custom integrations take longer. The planning per project is in the quote.",
        "A period starts only when Virelio has all information, access, materials and approvals from the client. Delays on the side of the client or a third party move the planning.",
        "All periods are targets and not strict deadlines. If a period is exceeded, the client first gives Virelio written notice of default with a reasonable period to deliver.",
        "Virelio may engage others to perform the work. Virelio remains responsible towards the client.",
        "Virelio aims to reply personally to messages within 4 hours on working days. This is a target and not a guaranteed response time. Arrangements on support and response times are in the maintenance plan or the quote.",
      ],
    },
    {
      title: "Cooperation by the client",
      body: [
        "The client provides in good time all information, access, accounts, API keys and materials that Virelio needs.",
        "The client makes sure this data and these materials are correct and complete, and that it has the right to use them and to give them to Virelio.",
        "The client appoints a contact person who can take decisions and replies within a reasonable time.",
        "The client tests the prototype and gives feedback within the agreed period.",
        "The client makes its own backups of its data and systems, unless backups are expressly part of the assignment.",
        "If the client does not meet these obligations, Virelio may suspend the work and charge the extra costs.",
      ],
    },
    {
      title: "Delivery, testing and acceptance",
      body: [
        "Virelio first delivers a prototype. The client tests the prototype against the scope.",
        "Within the scope Virelio makes adjustments free of charge until the solution does what was agreed in writing. New wishes and changes outside the scope are additional work.",
        "Virelio then launches the production version. The client has 5 working days to report deviations from the scope in writing.",
        "The solution is accepted as soon as one of these occurs:",
        {
          list: [
            "the client approves it in writing;",
            "the period of 5 working days passes without a reasoned report; or",
            "the client starts using the solution in its business.",
          ],
        },
        "Minor defects that do not materially hinder use do not prevent acceptance. Virelio still fixes them.",
        "Acceptance or taking the solution into use does not void the money-back guarantee within the period in article 10.",
        "After full payment, Virelio delivers the repository with the source code and the documentation of the solution to the client.",
        "If the client has no maintenance plan, Virelio fixes free of charge the defects that are reported within 30 days after acceptance and that were demonstrably caused by Virelio. After that Virelio fixes defects at its hourly rate at that time.",
      ],
    },
    {
      title: "Money-back guarantee",
      body: [
        "Virelio offers a money-back guarantee on the setup fee. The guarantee applies only under the conditions in this article.",
        "The guarantee applies if the prototype or the production version does not do what was agreed in writing in the scope, and Virelio cannot fix this within a reasonable period. Virelio gets at least 10 working days after the client's written report.",
        "The client invokes the guarantee in writing within 14 days after go-live or after delivery of the prototype, whichever is later. It describes which agreed points do not work.",
        "Taking the solution into use does not by itself void the guarantee.",
        "The guarantee does not apply:",
        {
          list: [
            "if the problem is caused by information, access or cooperation of the client;",
            "if the problem is caused by an outage or unavailability of a third-party service. Ordinary behaviour of an AI model within the agreed scope is not covered by this exception;",
            "if the client changes its mind or its wishes, also not after going live;",
            "to usage costs, third-party costs and maintenance fees already incurred or invoiced;",
            "to additional work already performed.",
          ],
        },
        "If the claim is valid, Virelio refunds the setup fee paid within 14 days. The guarantee covers only the one-off setup fee. The assignment then ends. The client acquires no rights to the solution and stops using it. Virelio deletes the client's data in line with article 18.",
        "The refund settles all claims of the client based on the defect in the solution.",
      ],
    },
    {
      title: "Maintenance and support",
      body: [
        "Maintenance Basic includes hosting (see article 5.4), monitoring, technical updates and support with outages and questions.",
        "Maintenance Plus includes everything in Basic, plus monthly improvements and new features of a size agreed in the quote or in consultation. Larger extensions are additional work.",
        "Virelio does not guarantee uninterrupted availability. Where possible, Virelio announces planned maintenance in advance.",
        "If the client has no maintenance plan, it hosts the solution itself, unless agreed otherwise. Virelio is then not responsible for the solution continuing to work, for example after a change at a third party.",
      ],
    },
    {
      title: "Additional work",
      body: [
        "Work that is not in the scope is additional work. Examples are new features, extra integrations, changes after acceptance and extra work caused by changes in systems or services of third parties.",
        "Virelio performs additional work only after the client has approved the price or hourly rate in writing. Additional work may move the planning.",
      ],
    },
    {
      title: "Intellectual property",
      body: [
        "Virelio transfers to the client the copyright in the source code and documentation it created specifically for the client. The transfer takes place through the signed or accepted quote. The parties agree that this quote serves as the deed of transfer within the meaning of article 2(3) of the Dutch Copyright Act (Auteurswet). The transfer takes effect when all amounts for the assignment have been paid in full.",
        "Virelio waives its personality rights (article 25 Dutch Copyright Act) to the extent the law permits.",
        "After full payment, Virelio delivers the repository with the source code and the documentation to the client (article 9).",
        "Until full payment the client only has a temporary right to use the solution.",
        "Virelio keeps the rights to its general know-how, methods, tools, templates and reusable components that it already had or also uses for other clients. Where these are part of the solution, the client receives, as part of the delivered work, a perpetual, non-exclusive, free right to use and modify them and to have them maintained by others.",
        "Open-source software and third-party services in the solution are subject to the licences and terms of those parties. The client may need its own accounts or subscriptions for them.",
        "The client remains the owner of its own data and of the content it supplies.",
        "Virelio may mention the project anonymously as a reference, for example as a logistics company in North Holland, without confidential information. Virelio uses the client's name or logo only with permission. The client can exclude an anonymous reference in writing.",
      ],
    },
    {
      title: "AI-specific provisions",
      body: [
        "AI models work with probabilities. Their output can be wrong, incomplete, outdated or inappropriate, also when the solution is built well. Virelio does not guarantee that output is always correct.",
        "The client remains responsible for checking the output and for decisions it takes based on the output. For decisions with major consequences, such as legal, financial or medical decisions or decisions about people, the client ensures human review.",
        "Virelio does not guarantee specific business results, such as savings, revenue, conversion or a percentage of automated conversations.",
        "The client is responsible for the use of the solution in its organisation, including the rules for AI such as the EU AI Act. It tells people who communicate with an AI agent, chatbot or voice assistant that they are dealing with AI, where this is required. It informs callers when calls are recorded or transcribed.",
        "AI providers can change, replace or retire a model. This can change the behaviour of the solution. Virelio adapts the solution within the maintenance plan. Larger adaptations are additional work.",
        "Virelio does not use the client's data to train its own AI models. Where possible Virelio chooses settings under which providers do not use the data for training.",
      ],
    },
    {
      title: "Third-party services",
      body: [
        "The solution often works with third-party services, such as AI models from OpenAI, Anthropic or Google, WhatsApp from Meta, telephony from Twilio, hosting and the client's own software.",
        "Availability, outages, rate changes, policy changes and technical changes at third parties are outside Virelio's control. Virelio is not liable for them.",
        "The client complies with the terms and policies of the third parties it uses, such as the WhatsApp Business terms and the usage policies of AI providers. If a third party blocks an account or number because of the client's use, this is at the client's risk.",
        "If Virelio buys a third-party service for the client, the terms of that party also apply between Virelio and the client.",
      ],
    },
    {
      title: "Acceptable use",
      body: [
        "The client does not use the solution:",
        {
          list: [
            "for anything that breaks the law;",
            "to mislead people, for example by pretending that an AI is a human;",
            "for spam or unsolicited messages;",
            "to infringe the rights of others, such as privacy or copyright;",
            "for AI practices prohibited by the EU AI Act;",
            "to create or spread harmful, discriminatory or misleading content.",
          ],
        },
        "The client indemnifies Virelio against third-party claims arising from its use of the solution, from the data or materials it supplies, or from a breach of this article.",
        "If Virelio seriously suspects misuse, it may switch off the solution temporarily with immediate effect. Virelio informs the client straight away.",
      ],
    },
    {
      title: "Confidentiality",
      body: [
        "The parties keep each other's confidential information secret. Information is confidential if this has been stated or follows from its nature. Examples are business processes, customer data, source code, prices and API keys.",
        "This obligation does not apply to information that is already public, that a party already had lawfully, or that a party must disclose by law or court order.",
        "Virelio gives access to confidential information only to people who work on the assignment, and imposes the same obligation on them.",
        "The confidentiality obligation continues after the agreement ends.",
      ],
    },
    {
      title: "Data protection",
      body: [
        "The parties comply with the General Data Protection Regulation (GDPR).",
        "If Virelio processes personal data on behalf of the client, including hosting under a maintenance plan, the client is the controller and Virelio the processor. The data processing agreement in Annex 1 (article 27) then applies automatically from acceptance of the quote.",
        "Where possible Virelio processes data within the European Economic Area (EEA) and chooses an EU region at providers. Some AI providers are based in the United States. Transfers then take place only with an appropriate safeguard, such as the EU-US Data Privacy Framework or the standard contractual clauses of the European Commission. On request Virelio provides an overview per project of where and by whom data is processed.",
        "If data may not leave the client's network, Virelio can build a solution that runs at the client's own premises (on-premise), at the price agreed for this.",
        "The client ensures it has a legal basis for the processing and informs the people concerned.",
        "After the agreement ends, Virelio deletes or returns the client's personal data as set out in Annex 1.",
        "How Virelio itself processes personal data is set out in the [privacy statement](/privacy-policy).",
      ],
    },
    {
      title: "Payment",
      body: [
        "Virelio invoices according to the payment schedule in the quote. If the quote says nothing, Virelio invoices 50% of the setup fee at the start and 50% on delivery of the production version. Virelio invoices maintenance plans monthly in advance. Usage costs that run through Virelio are invoiced monthly in arrears.",
        "The payment term is 14 days from the invoice date.",
        "If the client does not pay on time, it is in default without notice. From the due date it then owes statutory commercial interest (article 6:119a Dutch Civil Code).",
        "If payment is still not made after a reminder, Virelio may hand the claim over for collection. The client then also pays the extrajudicial collection costs under the Dutch decree on extrajudicial collection costs, with a minimum of € 40, and the court costs.",
        "The client reports any objection to an invoice in writing within 14 days of the invoice date. An objection does not suspend payment of the undisputed part.",
        "The client may not set off amounts or suspend its payment.",
      ],
    },
    {
      title: "Suspension for non-payment",
      body: [
        "If the client does not pay within 7 days after a written reminder, Virelio may suspend its work and services. This includes hosting and running the solution. Virelio announces the suspension in the reminder.",
        "During the suspension the fees and usage costs remain due. Virelio is not liable for damage caused by the suspension.",
        "Virelio resumes the services within 2 working days after all outstanding amounts have been paid.",
      ],
    },
    {
      title: "Liability",
      body: [
        "Virelio is liable only for direct damage caused by an attributable failure to perform the agreement. The client first gives Virelio written notice of default, with a reasonable period to remedy the failure, unless remedy is permanently impossible.",
        "Direct damage means only:",
        {
          list: [
            "reasonable costs to establish the cause and extent of the damage;",
            "reasonable costs to make Virelio's performance meet the agreement;",
            "reasonable costs to prevent or limit damage.",
          ],
        },
        "Virelio is not liable for indirect or consequential damage. This includes lost profit, missed savings, lost revenue, business interruption, reputational damage, loss of or damage to data, fines from regulators, damage caused by decisions based on AI output and damage caused by outages or changes at third parties.",
        "Liability per event is limited to the total setup fee of the assignment concerned, plus the maintenance fees the client paid in the 6 months before the event. Usage costs passed through are not counted. Related events count as one event.",
        "These limitations do not apply if the damage results from intent or deliberate recklessness of Virelio's management.",
        "A claim lapses if the client does not report the damage to Virelio in writing within 12 months after it discovered or could reasonably have discovered the damage.",
        "These limitations also apply to the people and parties Virelio engages to perform the work.",
      ],
    },
    {
      title: "Force majeure",
      body: [
        "Virelio is not liable if force majeure prevents it from performing. Force majeure is any circumstance outside Virelio's control that prevents performance or makes it unreasonably burdensome. Examples:",
        {
          list: [
            "outages at AI providers, hosting and cloud companies, telephony or messaging services;",
            "failures of internet, power or telecommunications;",
            "policy changes of AI providers and other third parties;",
            "a provider retiring or changing a model or service;",
            "cyber attacks, illness of a key person and government measures.",
          ],
        },
        "During force majeure the obligations are suspended. If force majeure lasts longer than 60 days, either party may terminate the agreement in writing for the part not yet performed, without compensation.",
        "Virelio may invoice the work it has already performed.",
      ],
    },
    {
      title: "Term and termination",
      body: [
        "A setup assignment ends after acceptance and payment, or earlier under article 10.",
        "A maintenance plan runs for an indefinite period, without a minimum term. The client can cancel it every month, effective at the end of the current calendar month. An email to info@virelio.nl is enough. Months already paid are not refunded.",
        "Virelio can cancel a maintenance plan with one calendar month's notice.",
        "Either party may terminate the agreement in writing if the other party fails to meet a material obligation, also after written notice of default with a reasonable period. Termination with immediate effect is possible if the other party goes bankrupt, obtains a suspension of payments or ends its business.",
        "When the agreement ends, Virelio delivers on request the source code, configuration and documentation the client is entitled to, and helps with the transfer to the client's own hosting or another party. A transfer of normal size is included. An extensive migration is additional work.",
        "Virelio stops hosting after the last paid month. It deletes the client's data 30 days after the end, unless agreed otherwise or the law requires retention.",
        "Provisions that by their nature continue, such as confidentiality, liability, intellectual property and governing law, remain in force after the end.",
      ],
    },
    {
      title: "Changes to these terms",
      body: [
        "Virelio may change these terms. The new version is published with its date on virelio.nl.",
        "For running maintenance plans, changes take effect 30 days after written notice. If the client does not agree, it can cancel the maintenance plan effective on the date the change takes effect.",
        "For a running setup assignment, the version that applied when the quote was accepted remains in force.",
      ],
    },
    {
      title: "Governing law and disputes",
      body: [
        "Dutch law applies to these terms and all agreements with Virelio. The UN Convention on Contracts for the International Sale of Goods (CISG) does not apply.",
        "The parties first try to resolve a dispute together. If that fails, a party submits the dispute to the competent court of the District Court of Amsterdam.",
      ],
    },
    {
      title: "Company details",
      body: ["These terms are issued by:", { company: true }],
    },
    {
      title: "Annex 1: Data processing agreement",
      body: [
        "This data processing agreement applies when Virelio processes personal data on behalf of the client (article 18). The client is the controller and Virelio is the processor within the meaning of article 28 GDPR. This annex applies automatically from acceptance of the quote.",
        "Subject and duration. Virelio processes personal data only to perform the agreement: building, testing, hosting, maintaining and supporting the solution. The processing lasts as long as the agreement runs, and after that until the data has been deleted or returned.",
        "Nature and purpose. The processing consists of receiving, storing, analysing, having AI models process, forwarding and deleting data. The purpose is that the solution does what was agreed in the scope, such as answering questions, holding conversations, sending messages or automating processes.",
        "Categories of data and data subjects. This covers the data the solution processes, such as names and contact details, content of messages, chats and calls, voice recordings and transcripts, customer and order data and technical data such as IP addresses and log files. Data subjects are customers, leads, callers, website visitors and employees of the client. The client does not have special categories of personal data processed, unless agreed in writing.",
        "Instructions. Virelio processes the data only on documented instructions from the client. The agreement, the quote and the scope count as those instructions. If the law requires Virelio to process data otherwise, it informs the client in advance, unless the law forbids this. If Virelio believes an instruction breaches the GDPR, it reports this immediately.",
        "Confidentiality. Virelio gives access to the data only to people who need it. They are bound by confidentiality under an agreement or by law.",
        "Security. Virelio takes appropriate technical and organisational measures under article 32 GDPR. Examples are encryption in transit and where possible at rest, access only for authorised people, strong passwords and two-factor authentication, secure storage of API keys, keeping software updated and limiting data to what is needed.",
        "Sub-processors. The client gives Virelio general written authorisation to engage sub-processors. Virelio imposes the same obligations on them as in this annex and remains responsible for them. The current categories of sub-processors are:",
        {
          list: [
            "AI model providers, such as OpenAI, Anthropic and Google;",
            "hosting and cloud providers;",
            "messaging and telephony services, such as WhatsApp (Meta) and Twilio;",
            "email services.",
          ],
        },
        "Virelio gives advance written notice of a new or replacement sub-processor. The client can object with reasons within 14 days. If the parties find no solution, the client can terminate the part of the agreement concerned.",
        "Data subject rights. Virelio assists the client, as far as reasonable, with requests from data subjects, such as access, rectification and erasure. If a request reaches Virelio, it forwards it to the client.",
        "Other assistance. Virelio assists the client, as far as reasonable, with the obligations under articles 32 to 36 GDPR, such as security, breach notification, a data protection impact assessment (DPIA) and prior consultation of the supervisory authority.",
        "Data breaches. Virelio notifies the client of a personal data breach without undue delay, and in any case within 48 hours after discovering it. It provides the information the client needs to notify the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) and the data subjects. The client decides on those notifications.",
        "End. After the agreement ends, Virelio deletes the personal data, or returns it if the client asks. This happens within 30 days, unless the law requires retention. Copies at sub-processors are also deleted, within their usual periods.",
        "Audits and information. Virelio gives the client all information needed to show that it complies with article 28 GDPR. The client may have an audit carried out by an independent expert bound by confidentiality, with at least 14 days' notice. The client pays the costs of the audit.",
        "Transfers outside the EEA. Data goes to a country outside the EEA only with an appropriate safeguard, such as the EU-US Data Privacy Framework or the standard contractual clauses of the European Commission.",
        "Liability. Liability under this annex is governed by article 21 of these terms.",
        "If this annex differs from the rest of the terms, this annex prevails as far as the processing of personal data is concerned.",
      ],
    },
  ],
};

export default function TermsOfService({ showBackLink = true }: { showBackLink?: boolean }) {
  const { language } = useLanguage();
  return <PolicyDocument doc={language === "en" ? EN : NL} showBackLink={showBackLink} />;
}
