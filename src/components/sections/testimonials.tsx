"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

interface Testimonial {
  id: number;
  name: string;
  role: { en: string; nl: string };
  image: string;
  content: { en: string; nl: string };
}

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Giulio Piccolo",
      role: { en: "Lead Engineer @ Suit Supply", nl: "Lead Engineer @ Suit Supply" },
      image: "/images/references/giulio.jpeg",
      content: {
        en: "The Virelio team stood out for their rapid development and strong foundation in AI. They independently tackled complex topics and delivered valuable insights. A team with a steep learning curve that quickly makes impact.",
        nl: "Het Virelio team viel op door hun snelle ontwikkeling en sterke basis in AI. Ze pakten zelfstandig complexe onderwerpen op en leverden waardevolle inzichten. Een team met een sterke leercurve dat snel impact maakt.",
      },
    },
    {
      id: 2,
      name: "Cristian Arboleda",
      role: { en: ".NET Developer", nl: ".NET Ontwikkelaar" },
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFpSzu3OzUbsw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1716325332651?e=1749081600&v=beta&t=B0fWr05TNfeqcZf7FU-EvHDq1foIRm8bxTMgJobmGVA",
      content: {
        en: "A talented team with a strong drive to grow and improve. Always supporting their clients, their greatest strength is quickly learning new domains and adapting to any process.",
        nl: "Een getalenteerd team met een sterke drang om te groeien en verbeteren. Ze ondersteunen hun klanten altijd, en hun grootste kracht is het snel leren van nieuwe domeinen en aanpassen aan elk proces.",
      },
    },
    {
      id: 3,
      name: "Ihor Tolkachov",
      role: { en: "Frontend Developer @ Mobility Platform", nl: "Frontend Developer @ Mobiliteitsplatform" },
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHBTYV9e3Cehw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715115312907?e=1749081600&v=beta&t=CLGqT-xHCJk8sDNETLF4xjWWDSJRsev0kcySbUm6FEs",
      content: {
        en: "Working with Virelio showed their reliability and skill. Together we created an automatic fine scanner that reduced a 30-minute process to just 10 seconds — truly impressive efficiency improvement.",
        nl: "Het werken met Virelio toonde hun betrouwbaarheid en vaardigheid. Samen creëerden we een automatische boetescanner die een proces van 30 minuten reduceerde tot slechts 10 seconden — indrukwekkend.",
      },
    },
    {
      id: 4,
      name: "Oeds de Meer",
      role: { en: "Process & Information Manager @ SBB", nl: "Proces- & informatiemanager @ SBB" },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQH9Ry0bTSuBUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1631524405789?e=1749081600&v=beta&t=mDsXjGK-Ji14bo5JFSlLtKWxkOxQAYlpFDJSw-NR2gs",
      content: {
        en: "Virelio consistently delivered sharp analyses and worked with tools like SQL, Looker, and Python. They recognize patterns in data, think analytically, and provide visual insights that drive better decisions.",
        nl: "Virelio leverde continu scherpe analyses en werkte met tools als SQL, Looker en Python. Ze herkennen patronen in data, denken analytisch en leveren visuele inzichten die bijdragen aan betere beslissingen.",
      },
    },
    {
      id: 5,
      name: "Sarah de Vries",
      role: { en: "Product Manager @ TechCorp", nl: "Product Manager @ TechCorp" },
      image: "/images/references/default-avatar.jpg",
      content: {
        en: "Working with Virelio transformed our workflow. The AI agent they built handles our customer inquiries 24/7, saving us countless hours. Professional, fast, and exactly what we needed.",
        nl: "Samenwerken met Virelio transformeerde onze workflow. De AI agent die ze bouwden behandelt 24/7 onze klantvragen en bespaart ons ontelbare uren. Professioneel, snel, en precies wat we nodig hadden.",
      },
    },
    {
      id: 6,
      name: "Laura Britton",
      role: { en: "Project Manager Medical Affairs @ Sedgwick", nl: "Projectmanager Medische Zaken @ Sedgwick" },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGkJk6PNly4Mw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1571232961900?e=1749081600&v=beta&t=ez7LJ5uCSvPdfxyUH_9hjOktsjDkfI8cvQHTTAdUNYI",
      content: {
        en: "Dedicated, helpful and reliable. Always deliver on their promises.",
        nl: "Toegewijd, behulpzaam en betrouwbaar. Komen altijd hun beloftes na.",
      },
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-background overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
            >
              {language === "nl" ? "Wat ze zeggen" : "What they say"}
            </motion.p>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              {language === "nl" ? "Aanbevelingen" : "Testimonials"}
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {language === "nl"
                ? "Wat onze klanten en collega's over ons zeggen"
                : "What our clients and colleagues say about us"}
            </motion.p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="h-full p-8 sm:p-10 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  {/* Accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 to-primary/10" />

                  {/* Quote */}
                  <blockquote className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-8 pl-4">
                    &ldquo;{language === "nl" ? testimonial.content.nl : testimonial.content.en}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pl-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-border"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Ccircle cx='22' cy='22' r='22' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='18' font-weight='600'%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {language === "nl" ? testimonial.role.nl : testimonial.role.en}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
