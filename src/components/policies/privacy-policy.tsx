"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { EN_NOTE, LAST_UPDATED, PolicyDocument, type PolicyDoc } from "./terms-of-service";

const NL: PolicyDoc = {
  title: "Privacyverklaring",
  updated: LAST_UPDATED.nl,
  back: "Terug naar home",
  numbered: false,
  intro: [
    "In deze privacyverklaring leest u welke persoonsgegevens Virelio verwerkt, waarom, hoe lang en welke rechten u heeft. Wij houden ons aan de Algemene verordening gegevensbescherming (AVG). Wij verzamelen niet meer gegevens dan nodig en wij verkopen geen gegevens.",
  ],
  articles: [
    {
      title: "Wie is verantwoordelijk",
      body: [
        "Virelio is de verwerkingsverantwoordelijke voor de verwerkingen in deze verklaring. Vragen over privacy stuurt u naar info@virelio.nl.",
        { company: true },
      ],
    },
    {
      title: "Voor wie deze verklaring geldt",
      body: [
        "Deze verklaring geldt voor bezoekers van virelio.nl, voor mensen die contact met ons opnemen of een afspraak plannen, en voor contactpersonen bij klanten, leveranciers en andere zakelijke relaties.",
        "Bouwen wij voor een klant een oplossing die persoonsgegevens verwerkt, zoals een chatbot of spraakassistent, dan zijn wij verwerker en is de klant verantwoordelijk. Die verwerking valt onder de verwerkersovereenkomst met de klant en onder de privacyverklaring van die klant.",
      ],
    },
    {
      title: "Welke gegevens wij verwerken en waarom",
      body: [
        {
          list: [
            "Contactformulieren. Vult u een formulier op de website in, dan ontvangen wij uw naam en e-mailadres en, afhankelijk van het formulier, uw telefoonnummer, bedrijfsnaam, teamgrootte, type project, budget, planning en uw bericht. Het formulier wordt verwerkt via Formspree en doorgestuurd naar onze mailbox. Wij gebruiken deze gegevens om uw vraag te beantwoorden en u een voorstel te doen.",
            "E-mail en telefoon. Mailt of belt u ons, dan verwerken wij uw naam, contactgegevens en de inhoud van het contact om u te helpen.",
            "WhatsApp. De WhatsApp-knop op de website is een link. Er gaan pas gegevens naar WhatsApp als u op de knop klikt en een gesprek begint. Wij zien dan uw telefoonnummer, profielnaam, profielfoto en berichten. WhatsApp (Meta) verwerkt daarnaast gegevens volgens haar eigen privacybeleid.",
            "Afspraken via Calendly. Plant u een gesprek via onze Calendly-link, dan verwerkt Calendly voor ons uw naam, e-mailadres, het gekozen tijdstip en de antwoorden die u invult. Wij gebruiken deze gegevens om het gesprek te plannen en voor te bereiden.",
            "Websitestatistieken. Alleen als u daarvoor toestemming geeft, gebruiken wij Google Analytics 4. Google Analytics verwerkt dan welke pagina's u bekijkt, hoe lang, via welke website u binnenkwam, uw apparaat, browser en besturingssysteem, uw globale locatie op basis van uw IP-adres en een willekeurig bezoekers-ID in een cookie. Google Analytics 4 slaat volgens Google geen IP-adressen op. Wij gebruiken deze gegevens om te zien hoe de website wordt gebruikt en om haar te verbeteren.",
            "Hosting en beveiliging. Om de website te tonen en te beschermen tegen misbruik, verwerken onze hostingpartijen GitHub Pages en Cloudflare technische gegevens, zoals uw IP-adres, browser, de opgevraagde pagina en het tijdstip.",
            "Klanten en leveranciers. Van contactpersonen bij klanten en leveranciers verwerken wij naam, functie, zakelijke contactgegevens en correspondentie. Voor facturen verwerken wij ook bedrijfsnaam, adres, btw-nummer en bankgegevens.",
            "Instellingen in uw browser. Uw taalkeuze en uw cookiekeuze bewaren wij alleen in uw eigen browser (local storage). Die gegevens worden niet naar ons verstuurd.",
          ],
        },
        "Wij gebruiken uw gegevens niet om AI-modellen te trainen. U bent niet verplicht om gegevens aan ons te geven. Zonder contactgegevens kunnen wij u alleen niet antwoorden.",
      ],
    },
    {
      title: "Grondslagen",
      body: [
        "Wij verwerken persoonsgegevens alleen als daar een grondslag uit artikel 6 AVG voor is:",
        {
          list: [
            "Toestemming, voor Google Analytics. U kunt uw toestemming altijd intrekken (zie de [cookieverklaring](/cookie-policy)). Dat geldt vanaf het moment van intrekken.",
            "Overeenkomst, voor het uitvoeren van een opdracht en voor stappen die u vóór een overeenkomst vraagt, zoals een offerte of een intakegesprek.",
            "Wettelijke plicht, voor onze administratie en belastingaangifte.",
            "Gerechtvaardigd belang, voor het beantwoorden van vragen, het onderhouden van zakelijke contacten en het veilig houden van de website. Wij wegen ons belang af tegen uw privacy. U kunt tegen deze verwerking bezwaar maken.",
          ],
        },
      ],
    },
    {
      title: "Hoe lang wij gegevens bewaren",
      body: [
        {
          list: [
            "Contactverzoeken, e-mails, WhatsApp-gesprekken en afspraken die niet tot een opdracht leiden: 12 maanden na het laatste contact.",
            "Gegevens van klanten en leveranciers en de correspondentie: zolang de overeenkomst loopt en 2 jaar daarna.",
            "Facturen en andere administratie: 7 jaar, vanwege de fiscale bewaarplicht.",
            "Google Analytics: volgens de bewaarinstelling van Google Analytics, maximaal 14 maanden. Daarna verwijdert Google de gegevens op bezoekersniveau.",
            "Technische logs bij hosting: zo kort als GitHub en Cloudflare die voor beveiliging nodig hebben.",
          ],
        },
        "Daarna verwijderen of anonimiseren wij de gegevens.",
      ],
    },
    {
      title: "Wie uw gegevens ontvangen",
      body: [
        "Wij geven gegevens alleen aan partijen die ze nodig hebben voor de doelen hierboven. Met verwerkers hebben wij afspraken over beveiliging en geheimhouding, via een verwerkersovereenkomst of de gegevensbeschermingsvoorwaarden van de aanbieder.",
        {
          list: [
            "GitHub (Microsoft): hosting van de website.",
            "Cloudflare: domeinnaam, beveiliging, snelle levering van de website en het doorsturen van e-mail.",
            "Google: Google Analytics, alleen na uw toestemming.",
            "Formspree: verwerking van de contactformulieren.",
            "Calendly: het plannen van afspraken.",
            "WhatsApp (Meta): gesprekken die u via WhatsApp start. Meta is voor haar eigen verwerkingen zelf verantwoordelijk.",
            "Onze e-mailprovider en kantoorsoftware: e-mail en documenten.",
            "Onze boekhoudsoftware en boekhouder: facturen en belastingaangifte.",
            "AI-aanbieders, zoals OpenAI, Anthropic en Google: alleen bij projecten voor klanten, als subverwerker onder de verwerkersovereenkomst met die klant.",
            "Overheidsinstanties, zoals de Belastingdienst: alleen als de wet ons daartoe verplicht.",
          ],
        },
      ],
    },
    {
      title: "Doorgifte buiten de Europese Economische Ruimte",
      body: [
        "Een aantal van deze partijen is gevestigd in de Verenigde Staten of verwerkt daar gegevens. Wij geven gegevens alleen door met een passende waarborg. Is de aanbieder gecertificeerd onder het EU-VS Data Privacy Framework, dan is dat de waarborg. Anders gebruiken wij de standaardcontractbepalingen van de Europese Commissie, zo nodig met aanvullende maatregelen. Waar mogelijk kiezen wij voor verwerking binnen de EU.",
      ],
    },
    {
      title: "Beveiliging",
      body: [
        "Wij beveiligen persoonsgegevens met passende technische en organisatorische maatregelen. De website gebruikt een versleutelde verbinding (HTTPS). Alleen mensen die gegevens nodig hebben voor hun werk krijgen toegang. Onze accounts zijn waar mogelijk beveiligd met tweestapsverificatie. Wij bewaren niet meer gegevens dan nodig.",
        "Gaat er toch iets mis, dan melden wij een datalek waar dat verplicht is binnen 72 uur bij de Autoriteit Persoonsgegevens en informeren wij u als het lek een hoog risico voor u heeft.",
      ],
    },
    {
      title: "Uw rechten",
      body: [
        "U heeft de volgende rechten:",
        {
          list: [
            "inzage: weten welke gegevens wij van u hebben;",
            "rectificatie: onjuiste gegevens laten verbeteren;",
            "verwijdering: gegevens laten wissen;",
            "beperking: de verwerking tijdelijk laten stoppen;",
            "overdraagbaarheid: uw gegevens in een gangbaar bestand ontvangen of laten doorsturen;",
            "bezwaar: bezwaar maken tegen verwerking op basis van gerechtvaardigd belang;",
            "toestemming intrekken: een gegeven toestemming op elk moment intrekken.",
          ],
        },
        "Stuur uw verzoek naar info@virelio.nl. Wij reageren binnen één maand. Bij een ingewikkeld verzoek kunnen wij die termijn met twee maanden verlengen. Dat laten wij u dan binnen de eerste maand weten. Wij kunnen vragen om te bevestigen dat het verzoek van u komt. Wij vragen geen kopie van uw identiteitsbewijs als dat niet nodig is. Een verzoek is gratis.",
      ],
    },
    {
      title: "Klacht indienen",
      body: [
        "Bent u niet tevreden over hoe wij met uw gegevens omgaan? Laat het ons weten via info@virelio.nl. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens via [autoriteitpersoonsgegevens.nl](https://autoriteitpersoonsgegevens.nl).",
      ],
    },
    {
      title: "Geautomatiseerde besluitvorming",
      body: [
        "Wij nemen over bezoekers van de website en mensen die contact met ons opnemen geen besluiten die alleen op geautomatiseerde verwerking berusten, en wij maken geen profielen van u.",
      ],
    },
    {
      title: "Kinderen",
      body: [
        "Onze diensten zijn bedoeld voor bedrijven. Wij verwerken niet bewust gegevens van kinderen jonger dan 16 jaar.",
      ],
    },
    {
      title: "Wijzigingen",
      body: [
        "Wij kunnen deze verklaring aanpassen, bijvoorbeeld als wij een nieuwe dienst gaan gebruiken. De datum bovenaan laat zien wanneer de verklaring voor het laatst is bijgewerkt. Bij belangrijke wijzigingen melden wij dat op de website.",
      ],
    },
    {
      title: "Contact",
      body: [
        "Vragen over deze verklaring of over uw gegevens? Mail naar info@virelio.nl of bel +31 6 87838713. Lees ook onze [cookieverklaring](/cookie-policy) en onze [algemene voorwaarden](/terms-of-service).",
      ],
    },
  ],
};

const EN: PolicyDoc = {
  title: "Privacy statement",
  updated: LAST_UPDATED.en,
  back: "Back to home",
  note: EN_NOTE,
  numbered: false,
  intro: [
    "This privacy statement explains which personal data Virelio processes, why, for how long and which rights you have. We comply with the General Data Protection Regulation (GDPR). We collect no more data than needed and we do not sell data.",
  ],
  articles: [
    {
      title: "Who is responsible",
      body: [
        "Virelio is the controller for the processing described in this statement. Send privacy questions to info@virelio.nl.",
        { company: true },
      ],
    },
    {
      title: "Who this statement applies to",
      body: [
        "This statement applies to visitors of virelio.nl, to people who contact us or book a call, and to contact persons at clients, suppliers and other business relations.",
        "When we build a solution for a client that processes personal data, such as a chatbot or voice assistant, we are the processor and the client is the controller. That processing is covered by the data processing agreement with the client and by the client's privacy statement.",
      ],
    },
    {
      title: "Which data we process and why",
      body: [
        {
          list: [
            "Contact forms. When you fill in a form on the website, we receive your name and email address and, depending on the form, your phone number, company name, team size, project type, budget, timeline and your message. The form is processed by Formspree and forwarded to our mailbox. We use this data to answer your question and make you a proposal.",
            "Email and phone. When you email or call us, we process your name, contact details and the content of the contact to help you.",
            "WhatsApp. The WhatsApp button on the website is a link. No data goes to WhatsApp until you click the button and start a chat. We then see your phone number, profile name, profile photo and messages. WhatsApp (Meta) also processes data under its own privacy policy.",
            "Bookings through Calendly. When you book a call through our Calendly link, Calendly processes on our behalf your name, email address, the chosen time and the answers you enter. We use this data to plan and prepare the call.",
            "Website statistics. Only if you consent, we use Google Analytics 4. Google Analytics then processes which pages you view, for how long, which website referred you, your device, browser and operating system, your approximate location based on your IP address and a random visitor ID in a cookie. According to Google, Google Analytics 4 does not store IP addresses. We use this data to see how the website is used and to improve it.",
            "Hosting and security. To show the website and protect it against abuse, our hosting providers GitHub Pages and Cloudflare process technical data, such as your IP address, browser, the page requested and the time.",
            "Clients and suppliers. For contact persons at clients and suppliers we process name, job title, business contact details and correspondence. For invoices we also process company name, address, VAT number and bank details.",
            "Settings in your browser. We store your language choice and your cookie choice only in your own browser (local storage). This data is not sent to us.",
          ],
        },
        "We do not use your data to train AI models. You are not required to give us data. Without contact details we simply cannot reply to you.",
      ],
    },
    {
      title: "Legal bases",
      body: [
        "We process personal data only when there is a legal basis under article 6 GDPR:",
        {
          list: [
            "Consent, for Google Analytics. You can withdraw your consent at any time (see the [cookie policy](/cookie-policy)). This applies from the moment of withdrawal.",
            "Contract, to perform an assignment and for steps you request before a contract, such as a quote or an intake call.",
            "Legal obligation, for our accounting and tax returns.",
            "Legitimate interest, to answer questions, maintain business contacts and keep the website secure. We weigh our interest against your privacy. You can object to this processing.",
          ],
        },
      ],
    },
    {
      title: "How long we keep data",
      body: [
        {
          list: [
            "Contact requests, emails, WhatsApp chats and bookings that do not lead to an assignment: 12 months after the last contact.",
            "Data of clients and suppliers and the correspondence: for as long as the agreement runs and 2 years after.",
            "Invoices and other accounting records: 7 years, because of the statutory tax retention period.",
            "Google Analytics: according to the Google Analytics retention setting, at most 14 months. After that Google deletes the visitor-level data.",
            "Technical hosting logs: as briefly as GitHub and Cloudflare need them for security.",
          ],
        },
        "After that we delete or anonymise the data.",
      ],
    },
    {
      title: "Who receives your data",
      body: [
        "We share data only with parties that need it for the purposes above. With processors we have arrangements on security and confidentiality, through a data processing agreement or the provider's data protection terms.",
        {
          list: [
            "GitHub (Microsoft): hosting of the website.",
            "Cloudflare: domain name, security, fast delivery of the website and email forwarding.",
            "Google: Google Analytics, only after your consent.",
            "Formspree: processing of the contact forms.",
            "Calendly: booking calls.",
            "WhatsApp (Meta): chats you start through WhatsApp. Meta is itself responsible for its own processing.",
            "Our email provider and office software: email and documents.",
            "Our accounting software and bookkeeper: invoices and tax returns.",
            "AI providers, such as OpenAI, Anthropic and Google: only in projects for clients, as a sub-processor under the data processing agreement with that client.",
            "Public authorities, such as the Dutch Tax Administration: only when the law requires it.",
          ],
        },
      ],
    },
    {
      title: "Transfers outside the European Economic Area",
      body: [
        "Some of these parties are based in the United States or process data there. We transfer data only with an appropriate safeguard. If the provider is certified under the EU-US Data Privacy Framework, that is the safeguard. Otherwise we use the standard contractual clauses of the European Commission, with additional measures where needed. Where possible we choose processing within the EU.",
      ],
    },
    {
      title: "Security",
      body: [
        "We protect personal data with appropriate technical and organisational measures. The website uses an encrypted connection (HTTPS). Only people who need data for their work get access. Our accounts are protected with two-step verification where possible. We keep no more data than needed.",
        "If something does go wrong, we report a data breach to the Dutch Data Protection Authority within 72 hours where required, and we inform you if the breach poses a high risk to you.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You have the following rights:",
        {
          list: [
            "access: know which data we hold about you;",
            "rectification: have incorrect data corrected;",
            "erasure: have data deleted;",
            "restriction: have the processing paused;",
            "portability: receive your data in a common file format or have it sent on;",
            "objection: object to processing based on legitimate interest;",
            "withdraw consent: withdraw consent you gave at any time.",
          ],
        },
        "Send your request to info@virelio.nl. We reply within one month. For a complex request we can extend this by two months. We then tell you within the first month. We may ask you to confirm that the request comes from you. We do not ask for a copy of your ID unless needed. A request is free of charge.",
      ],
    },
    {
      title: "Filing a complaint",
      body: [
        "Not happy with how we handle your data? Let us know at info@virelio.nl. You can also file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at [autoriteitpersoonsgegevens.nl](https://autoriteitpersoonsgegevens.nl).",
      ],
    },
    {
      title: "Automated decision-making",
      body: [
        "We take no decisions about website visitors or people who contact us that are based solely on automated processing, and we do not profile you.",
      ],
    },
    {
      title: "Children",
      body: ["Our services are meant for businesses. We do not knowingly process data of children under 16."],
    },
    {
      title: "Changes",
      body: [
        "We may update this statement, for example when we start using a new service. The date at the top shows when it was last updated. We announce important changes on the website.",
      ],
    },
    {
      title: "Contact",
      body: [
        "Questions about this statement or your data? Email info@virelio.nl or call +31 6 87838713. Also read our [cookie policy](/cookie-policy) and our [terms and conditions](/terms-of-service).",
      ],
    },
  ],
};

export default function PrivacyPolicy({ showBackLink = true }: { showBackLink?: boolean }) {
  const { language } = useLanguage();
  return <PolicyDocument doc={language === "en" ? EN : NL} showBackLink={showBackLink} />;
}
