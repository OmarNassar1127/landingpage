"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { EN_NOTE, LAST_UPDATED, PolicyDocument, type PolicyDoc } from "./terms-of-service";

const NL: PolicyDoc = {
  title: "Cookieverklaring",
  updated: LAST_UPDATED.nl,
  back: "Terug naar home",
  numbered: false,
  intro: [
    "Op virelio.nl gebruiken wij zo min mogelijk cookies. In deze verklaring staat welke cookies en vergelijkbare technieken wij gebruiken, waarvoor, en hoe u uw keuze aanpast.",
  ],
  articles: [
    {
      title: "Wat zijn cookies",
      body: [
        "Een cookie is een klein tekstbestand dat een website in uw browser opslaat. Vergelijkbare technieken, zoals local storage, werken op dezelfde manier. In deze verklaring noemen wij ze allemaal cookies.",
      ],
    },
    {
      title: "Functionele cookies",
      body: [
        "Deze cookies zijn nodig om de website te laten werken. Hiervoor is geen toestemming nodig.",
        {
          list: [
            "cookiePreferences (local storage, virelio.nl): bewaart uw cookiekeuze, zodat wij die niet steeds opnieuw vragen. Blijft bewaard tot u die zelf wist.",
            "language (local storage, virelio.nl): bewaart of u de website in het Nederlands of het Engels leest. Blijft bewaard tot u die zelf wist.",
            "Cloudflare: onze beveiligingspartij kan een functionele cookie plaatsen om de website te beschermen tegen bots en misbruik, zoals __cf_bm. Deze cookie blijft maximaal 30 minuten bewaard.",
          ],
        },
        "Local storage blijft in uw eigen browser. Die gegevens worden niet naar ons verstuurd.",
      ],
    },
    {
      title: "Analytische cookies",
      body: [
        "Alleen als u daarvoor toestemming geeft, gebruiken wij Google Analytics 4. Zo zien wij welke pagina's worden bezocht en hoe wij de website kunnen verbeteren.",
        {
          list: [
            "_ga (Google Analytics): onderscheidt bezoekers met een willekeurig ID. Bewaartermijn 2 jaar.",
            "_ga_H1BKGBT5FM (Google Analytics): houdt de status van uw bezoek bij. Bewaartermijn 2 jaar.",
          ],
        },
        "Welke gegevens Google Analytics verwerkt en met wie wij die delen, staat in onze [privacyverklaring](/privacy-policy).",
      ],
    },
    {
      title: "Geen marketingcookies",
      body: [
        "Wij plaatsen geen marketing- of advertentiecookies en wij volgen u niet over andere websites. De keuzes voor marketing- en voorkeurscookies in de cookiebanner hebben daarom op dit moment geen effect.",
        "Klikt u op een link naar een andere dienst, zoals WhatsApp, Calendly of LinkedIn, dan kan die dienst op haar eigen website cookies plaatsen. Daarvoor geldt het cookiebeleid van die dienst.",
      ],
    },
    {
      title: "Uw toestemming",
      body: [
        "Bij uw eerste bezoek vragen wij in een banner om toestemming. U kiest Alles accepteren, Alles weigeren of stelt per soort cookie zelf in. Weigert u, dan plaatsen wij alleen functionele cookies. De website werkt dan gewoon.",
      ],
    },
    {
      title: "Toestemming wijzigen of intrekken",
      body: [
        "U kunt uw toestemming op elk moment intrekken. Zo werkt het:",
        {
          list: [
            "Wis in uw browser de cookies en websitegegevens van virelio.nl. In de meeste browsers vindt u dit bij Instellingen, onder Privacy.",
            "Bij uw volgende bezoek verschijnt de cookiebanner opnieuw. Kies dan Alles weigeren of pas uw keuze aan.",
          ],
        },
        "U kunt Google Analytics ook op alle websites blokkeren met de browser-add-on van Google: [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout).",
      ],
    },
    {
      title: "Cookies via uw browser beheren",
      body: [
        "In uw browserinstellingen kunt u cookies bekijken, verwijderen en blokkeren. Blokkeert u alle cookies, dan onthoudt de website uw taal- en cookiekeuze niet meer. Kijk voor uitleg in de helppagina's van uw browser, zoals Chrome, Safari, Firefox of Edge.",
      ],
    },
    {
      title: "Wijzigingen en contact",
      body: [
        "Gaan wij andere cookies gebruiken, dan passen wij deze verklaring aan en vragen wij waar nodig opnieuw om toestemming. Vragen? Mail naar info@virelio.nl.",
      ],
    },
  ],
};

const EN: PolicyDoc = {
  title: "Cookie policy",
  updated: LAST_UPDATED.en,
  back: "Back to home",
  note: EN_NOTE,
  numbered: false,
  intro: [
    "On virelio.nl we use as few cookies as possible. This policy explains which cookies and similar technologies we use, what for, and how you change your choice.",
  ],
  articles: [
    {
      title: "What cookies are",
      body: [
        "A cookie is a small text file that a website stores in your browser. Similar technologies, such as local storage, work the same way. In this policy we call them all cookies.",
      ],
    },
    {
      title: "Functional cookies",
      body: [
        "These cookies are needed to make the website work. They do not require consent.",
        {
          list: [
            "cookiePreferences (local storage, virelio.nl): stores your cookie choice so we do not ask again each time. Kept until you clear it.",
            "language (local storage, virelio.nl): stores whether you read the website in Dutch or English. Kept until you clear it.",
            "Cloudflare: our security provider may set a functional cookie to protect the website against bots and abuse, such as __cf_bm. This cookie is kept for at most 30 minutes.",
          ],
        },
        "Local storage stays in your own browser. This data is not sent to us.",
      ],
    },
    {
      title: "Analytics cookies",
      body: [
        "Only if you consent, we use Google Analytics 4. This shows us which pages are visited and how we can improve the website.",
        {
          list: [
            "_ga (Google Analytics): distinguishes visitors with a random ID. Kept for 2 years.",
            "_ga_H1BKGBT5FM (Google Analytics): keeps track of the state of your visit. Kept for 2 years.",
          ],
        },
        "Which data Google Analytics processes and with whom we share it is described in our [privacy statement](/privacy-policy).",
      ],
    },
    {
      title: "No marketing cookies",
      body: [
        "We do not set marketing or advertising cookies and we do not track you across other websites. The marketing and preference options in the cookie banner therefore currently have no effect.",
        "If you click a link to another service, such as WhatsApp, Calendly or LinkedIn, that service may set cookies on its own website. Its own cookie policy applies.",
      ],
    },
    {
      title: "Your consent",
      body: [
        "On your first visit a banner asks for your consent. You choose Accept all, Decline all or set each type of cookie yourself. If you decline, we only set functional cookies. The website still works normally.",
      ],
    },
    {
      title: "Changing or withdrawing consent",
      body: [
        "You can withdraw your consent at any time. This is how:",
        {
          list: [
            "Clear the cookies and site data for virelio.nl in your browser. In most browsers this is under Settings, in the Privacy section.",
            "On your next visit the cookie banner appears again. Choose Decline all or adjust your choice.",
          ],
        },
        "You can also block Google Analytics on all websites with Google's browser add-on: [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout).",
      ],
    },
    {
      title: "Managing cookies in your browser",
      body: [
        "In your browser settings you can view, delete and block cookies. If you block all cookies, the website no longer remembers your language and cookie choice. See the help pages of your browser, such as Chrome, Safari, Firefox or Edge.",
      ],
    },
    {
      title: "Changes and contact",
      body: [
        "If we start using other cookies, we update this policy and ask for consent again where needed. Questions? Email info@virelio.nl.",
      ],
    },
  ],
};

export default function CookiePolicy({ showBackLink = true }: { showBackLink?: boolean }) {
  const { language } = useLanguage();
  return <PolicyDocument doc={language === "en" ? EN : NL} showBackLink={showBackLink} />;
}
