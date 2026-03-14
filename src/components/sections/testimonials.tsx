"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Testimonial {
  id: number;
  name: string;
  role: { en: string; nl: string };
  image: string;
  content: { en: string; nl: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Giulio Piccolo",
    role: {
      en: "Lead Engineer @ Suit Supply",
      nl: "Lead Engineer @ Suit Supply",
    },
    image: "/images/references/giulio.jpeg",
    content: {
      en: "The Virelio team stood out for their rapid development and strong foundation in AI. They independently tackled complex topics and delivered valuable insights. A team with a steep learning curve that quickly makes impact.",
      nl: "Het Virelio team viel op door hun snelle ontwikkeling en sterke basis in AI. Ze pakten zelfstandig complexe onderwerpen op en leverden waardevolle inzichten. Een team met een sterke leercurve dat snel impact maakt.",
    },
    rating: 5,
  },
  {
    id: 2,
    name: "Cristian Arboleda",
    role: { en: ".NET Developer", nl: ".NET Ontwikkelaar" },
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQFpSzu3OzUbsw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1716325332651?e=1749081600&v=beta&t=B0fWr05TNfeqcZf7FU-EvHDq1foIRm8bxTMgJobmGVA",
    content: {
      en: "A talented team with a strong drive to grow and improve. Always supporting their clients, their greatest strength is quickly learning new domains and adapting to any process.",
      nl: "Een getalenteerd team met een sterke drang om te groeien en verbeteren. Ze ondersteunen hun klanten altijd, en hun grootste kracht is het snel leren van nieuwe domeinen en aanpassen aan elk proces.",
    },
    rating: 5,
  },
  {
    id: 3,
    name: "Ihor Tolkachov",
    role: {
      en: "Frontend Developer @ Mobility Platform",
      nl: "Frontend Developer @ Mobiliteitsplatform",
    },
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQHBTYV9e3Cehw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715115312907?e=1749081600&v=beta&t=CLGqT-xHCJk8sDNETLF4xjWWDSJRsev0kcySbUm6FEs",
    content: {
      en: "Working with Virelio showed their reliability and skill. Together we created an automatic fine scanner that reduced a 30-minute process to just 10 seconds — truly impressive efficiency improvement.",
      nl: "Het werken met Virelio toonde hun betrouwbaarheid en vaardigheid. Samen creëerden we een automatische boetescanner die een proces van 30 minuten reduceerde tot slechts 10 seconden — indrukwekkend.",
    },
    rating: 5,
  },
  {
    id: 4,
    name: "Oeds de Meer",
    role: {
      en: "Process & Information Manager @ SBB",
      nl: "Proces- & informatiemanager @ SBB",
    },
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQH9Ry0bTSuBUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1631524405789?e=1749081600&v=beta&t=mDsXjGK-Ji14bo5JFSlLtKWxkOxQAYlpFDJSw-NR2gs",
    content: {
      en: "Virelio consistently delivered sharp analyses and worked with tools like SQL, Looker, and Python. They recognize patterns in data, think analytically, and provide visual insights that drive better decisions.",
      nl: "Virelio leverde continu scherpe analyses en werkte met tools als SQL, Looker en Python. Ze herkennen patronen in data, denken analytisch en leveren visuele inzichten die bijdragen aan betere beslissingen.",
    },
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah de Vries",
    role: {
      en: "Product Manager @ TechCorp",
      nl: "Product Manager @ TechCorp",
    },
    image: "/images/references/default-avatar.jpg",
    content: {
      en: "Working with Virelio transformed our workflow. The AI agent they built handles our customer inquiries 24/7, saving us countless hours. Professional, fast, and exactly what we needed.",
      nl: "Samenwerken met Virelio transformeerde onze workflow. De AI agent die ze bouwden behandelt 24/7 onze klantvragen en bespaart ons ontelbare uren. Professioneel, snel, en precies wat we nodig hadden.",
    },
    rating: 5,
  },
  {
    id: 6,
    name: "Laura Britton",
    role: {
      en: "Project Manager Medical Affairs @ Sedgwick",
      nl: "Projectmanager Medische Zaken @ Sedgwick",
    },
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQGkJk6PNly4Mw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1571232961900?e=1749081600&v=beta&t=ez7LJ5uCSvPdfxyUH_9hjOktsjDkfI8cvQHTTAdUNYI",
    content: {
      en: "Dedicated, helpful and reliable. Always deliver on their promises.",
      nl: "Toegewijd, behulpzaam en betrouwbaar. Komen altijd hun beloftes na.",
    },
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
  language,
}: {
  testimonial: Testimonial;
  language: string;
}) {
  return (
    <div className="h-full flex flex-col p-6 sm:p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-all duration-300 group">
      {/* Stars */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-[15px] text-foreground/80 leading-relaxed mb-6">
        &ldquo;
        {language === "nl"
          ? testimonial.content.nl
          : testimonial.content.en}
        &rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-border/40">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-border/50"
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='16' font-weight='600'%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
          }}
        />
        <div>
          <div className="font-semibold text-sm text-foreground">
            {testimonial.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {language === "nl" ? testimonial.role.nl : testimonial.role.en}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="py-20 sm:py-28 md:py-32 bg-background overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary uppercase tracking-widest mb-4"
            >
              {language === "nl" ? "Wat ze zeggen" : "What they say"}
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              {language === "nl" ? "Aanbevelingen" : "Testimonials"}
            </motion.h2>
          </div>

          {/* Navigation arrows — desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex items-center gap-2"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative">
          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mb-4 snap-x snap-mandatory"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="w-[320px] sm:w-[380px] flex-shrink-0 snap-start"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  language={language}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t) => (
                <img
                  key={t.id}
                  src={t.image}
                  alt={t.name}
                  className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='14' font-weight='600'%3E${t.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              ))}
            </div>
            <div className="flex gap-0.5 ml-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground ml-1">
              5.0
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {language === "nl"
              ? "Vertrouwd door 18+ bedrijven in Nederland"
              : "Trusted by 18+ companies in the Netherlands"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
