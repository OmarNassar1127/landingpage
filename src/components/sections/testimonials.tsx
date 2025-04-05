"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the Testimonial type
interface Testimonial {
  id: number;
  name: string;
  role: {
    en: string;
    nl: string;
  };
  relationship: {
    en: string;
    nl: string;
  };
  image: string;
  content: {
    en: string;
    nl: string;
  };
}

export default function Testimonials() {
  const { t, language } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Function to shuffle an array
  const shuffleArray = (array: Testimonial[]): Testimonial[] => {
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [shuffledTestimonials, setShuffledTestimonials] = useState<Testimonial[]>([]);

  // Define original testimonials with both English and Dutch versions
  const originalTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Azeez Bayonle Abideen",
      role: {
        en: "User Experience Designer @ Vloto | UI/UX Design",
        nl: "User Experience Designer @ Vloto | UI/UX Design",
      },
      relationship: {
        en: "Worked with Omar on the same team",
        nl: "Werkte met Omar in hetzelfde team",
      },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGNPRgBSjcK_A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1565036929872?e=1749081600&v=beta&t=mZs2wgjoUvHkxWwCW-8Du3JDs3sJpxRl4lyRwT0QwxQ",
      content: {
        en: "Omar consistently demonstrates exceptional skills as a backend developer, delivering efficient code and tackling complex problems with innovative solutions. He is a proactive problem-solver who enhances our applications' performance and fosters a collaborative team environment.",
        nl: "Omar toont consequent uitzonderlijke vaardigheden als backend-ontwikkelaar, levert efficiënte code en pakt complexe problemen aan met innovatieve oplossingen. Hij is een proactieve probleemoplosser die de prestaties van onze applicaties verbetert en een samenwerkende teamomgeving bevordert.",
      },
    },
    {
      id: 2,
      name: "Cristian Arboleda",
      role: {
        en: ".NET Developer",
        nl: ".NET Ontwikkelaar",
      },
      relationship: {
        en: "Studied together with Omar",
        nl: "Studeerde samen met Omar",
      },
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFpSzu3OzUbsw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1716325332651?e=1749081600&v=beta&t=B0fWr05TNfeqcZf7FU-EvHDq1foIRm8bxTMgJobmGVA",
      content: {
        en: "Omar is a talented developer with a strong drive to grow and improve. Always supporting colleagues, his greatest strength is quickly learning new skills and adapting to processes. It's a pleasure working with him—he's a valuable addition to any team.",
        nl: "Omar is een getalenteerde ontwikkelaar met een sterke drang om te groeien. Hij ondersteunt collega's en leert snel nieuwe vaardigheden. Het is een genoegen om met hem samen te werken—hij is een waardevolle aanwinst voor elk team.",
      },
    },
    {
      id: 3,
      name: "Ihor Tolkachov",
      role: {
        en: "We change the world for deskless workforces🚀",
        nl: "We veranderen de wereld voor werknemers zonder bureau🚀",
      },
      relationship: {
        en: "Worked with Omar on the same team",
        nl: "Werkte met Omar in hetzelfde team",
      },
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHBTYV9e3Cehw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715115312907?e=1749081600&v=beta&t=CLGqT-xHCJk8sDNETLF4xjWWDSJRsev0kcySbUm6FEs",
      content: {
        en: "Working with Omar at Vloto showed his reliability and skill. His communication and coding abilities shined in our projects. Together we created an automatic fine scanner that reduced a 30-minute process to just 10 seconds—truly impressive efficiency improvement.",
        nl: "Het werken met Omar bij Vloto toonde zijn betrouwbaarheid en vaardigheid. Zijn communicatie en codeervaardigheden blonken uit in onze projecten. Samen creëerden we een automatische boetescanner die een proces van 30 minuten reduceerde tot slechts 10 seconden—een indrukwekkende efficiëntieverbetering.",
      },
    },
    {
      id: 4,
      name: "Giulio Piccolo",
      role: {
        en: "Lead Engineer @ Suit Supply",
        nl: "Lead Engineer @ Suit Supply",
      },
      relationship: {
        en: "Worked with Robin on the same team",
        nl: "Werkte met Robin in hetzelfde team",
      },
      image: "https://media.licdn.com/dms/image/v2/C5603AQF-TBZqvZEGVQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1564478846194?e=1749081600&v=beta&t=nTrBUPE2mmjBOWDdRm-lZZ6ihGcUMvCut6hty530LgQ",
      content: {
        en: "Robin worked as a data consultant in our team and stood out for his rapid development and strong foundation in AI. He independently tackled complex topics and delivered valuable insights. A persevering individual with a steep learning curve who quickly makes an impact.",
        nl: "Robin werkte als data consultant mee in ons team en viel op door zijn snelle ontwikkeling en sterke basis in AI. Hij pakte zelfstandig complexe onderwerpen op en leverde waardevolle inzichten. Een doorzetter met een sterke leercurve die snel impact maakt.",
      },
    },
    {
      id: 5,
      name: "Oeds de Meer",
      role: {
        en: "Process & Information Manager @ SBB Ontwikkelen en Bouwen",
        nl: "Proces- & informatiemanager @ SBB Ontwikkelen en Bouwen",
      },
      relationship: {
        en: "Supervised Robin's internship",
        nl: "Begeleidde Robin's stage",
      },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQH9Ry0bTSuBUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1631524405789?e=1749081600&v=beta&t=mDsXjGK-Ji14bo5JFSlLtKWxkOxQAYlpFDJSw-NR2gs",
      content: {
        en: "Robin consistently delivered sharp analyses and worked with tools like Excel, SQL, and Looker. He recognizes patterns in data, thinks analytically, and provides visual insights that contribute to better decisions. Technically proficient, professional, and always engaged.",
        nl: "Robin leverde continu scherpe analyses en werkte met tools als Excel, SQL en Looker. Hij herkent patronen in data, denkt analytisch en levert visuele inzichten die bijdragen aan betere beslissingen. Technisch onderlegd, professioneel en altijd betrokken.",
      },
    },
    {
      id: 6,
      name: "Laura Britton",
      role: {
        en: "Project Manager Medical Affairs @ Sedgwick",
        nl: "Projectmanager Medische Zaken @ Sedgwick",
      },
      relationship: {
        en: "Worked with Robin",
        nl: "Werkte samen met Robin",
      },
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGkJk6PNly4Mw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1571232961900?e=1749081600&v=beta&t=ez7LJ5uCSvPdfxyUH_9hjOktsjDkfI8cvQHTTAdUNYI",
      content: {
        en: "Dedicated, helpful and reliable.",
        nl: "Toegewijd, behulpzaam en betrouwbaar.",
      },
    },
  ];

  // Initialize shuffled testimonials on component mount
  useEffect(() => {
    setShuffledTestimonials(shuffleArray(originalTestimonials));
  }, []);
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // Auto-play the carousel every 5 seconds
    let interval: NodeJS.Timeout | undefined;
    
    if (isAutoPlaying && shuffledTestimonials.length > 0) {
      interval = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % shuffledTestimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, shuffledTestimonials.length]);

  const nextSlide = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when user navigates manually
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % shuffledTestimonials.length);
  }, [shuffledTestimonials.length]);

  const prevSlide = useCallback(() => {
    setIsAutoPlaying(false); // Pause auto-play when user navigates manually
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + shuffledTestimonials.length) % shuffledTestimonials.length);
  }, [shuffledTestimonials.length]);
  
  // Auto-resume after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            className="w-20 h-1 bg-primary mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t.testimonials?.title || (language === "nl" ? "Aanbevelingen" : "Testimonials")}
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t.testimonials?.subtitle || 
              (language === "nl" 
                ? "Wat onze klanten en collega's over ons zeggen" 
                : "What our clients and colleagues say about us")}
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel - Standardized for all screen sizes */}
          <div className="relative overflow-hidden">
            {/* Fixed height container with better mobile responsiveness */}
            <div className="relative h-[400px] sm:h-[350px] md:h-[300px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <Card className="bg-card border border-primary/5 shadow-sm mx-auto max-w-3xl h-full">
                    <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
                      <div>
                        <div className="mb-4 text-primary">
                          <Quote size={24} className="opacity-80" />
                        </div>
                        <p className="text-base md:text-lg italic text-foreground mb-6 leading-relaxed">
                          {shuffledTestimonials.length > 0 && (language === "nl" 
                            ? shuffledTestimonials[activeIndex].content.nl 
                            : shuffledTestimonials[activeIndex].content.en)}
                        </p>
                      </div>
                      <div className="flex items-center mt-auto">
                        {shuffledTestimonials.length > 0 && shuffledTestimonials[activeIndex].image ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={shuffledTestimonials[activeIndex].image} 
                              alt={shuffledTestimonials[activeIndex].name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold text-lg">
                              {shuffledTestimonials.length > 0 ? shuffledTestimonials[activeIndex].name.charAt(0) : ""}
                            </span>
                          </div>
                        )}
                        <div className="ml-4 overflow-hidden">
                          <h4 className="font-semibold text-base sm:text-lg text-foreground truncate">
                            {shuffledTestimonials.length > 0 ? shuffledTestimonials[activeIndex].name : ""}
                          </h4>
                          <p className="text-muted-foreground text-sm sm:text-base truncate">
                            {shuffledTestimonials.length > 0 && (language === "nl" 
                              ? shuffledTestimonials[activeIndex].role.nl 
                              : shuffledTestimonials[activeIndex].role.en)}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 truncate">
                            {shuffledTestimonials.length > 0 && (language === "nl" 
                              ? shuffledTestimonials[activeIndex].relationship.nl 
                              : shuffledTestimonials[activeIndex].relationship.en)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Standardized Navigation Controls positioned clearly below the card */}
            <div className="flex flex-col items-center mt-8 mb-6">
              {/* Arrow controls on a separate row for better mobile access */}
              <div className="flex justify-center w-full mb-4 space-x-6 sm:space-x-8">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 shadow-md hover:shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 shadow-md hover:shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Dot indicators below the arrows */}
              <div className="flex space-x-3 mt-2">
                {shuffledTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-4 rounded-full transition-all ${
                      index === activeIndex
                        ? "bg-primary w-10"
                        : "bg-muted-foreground/40 hover:bg-muted-foreground/60 w-4"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
