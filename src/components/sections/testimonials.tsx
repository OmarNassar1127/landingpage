"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useAnimationControls } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: {
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
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);

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
        en: "Robin worked as a data consultant in our team and stood out for his rapid development and strong foundation in AI. He independently tackled complex topics and delivered valuable insights.",
        nl: "Robin werkte als data consultant mee in ons team en viel op door zijn snelle ontwikkeling en sterke basis in AI. Hij pakte zelfstandig complexe onderwerpen op en leverde waardevolle inzichten.",
      },
    },
    {
      id: 2,
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
    },
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Handle click to pause for 10 seconds
  const handleCardClick = () => {
    setIsPaused(true);

    // Clear existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Resume after 10 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // Navigation functions
  const scrollLeft = () => {
    const currentX = x.get();
    controls.start({ x: currentX + 620 });
    handleCardClick(); // Pause on manual navigation
  };

  const scrollRight = () => {
    const currentX = x.get();
    controls.start({ x: currentX - 620 });
    handleCardClick(); // Pause on manual navigation
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const shouldAnimate = !isPaused && !isHovered;

  return (
    <section className="py-16 bg-background overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {language === 'nl' ? 'Aanbevelingen' : 'Testimonials'}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {language === 'nl'
                ? "Wat onze klanten en collega's over ons zeggen"
                : "What our clients and colleagues say about us"}
            </motion.p>
          </div>

          <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                bg-background/70 backdrop-blur-xl border border-white/20 
                rounded-full p-2.5 
                opacity-0 group-hover:opacity-100
                hover:bg-background/80 hover:border-primary/30 hover:scale-110
                transition-all duration-300 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                bg-background/70 backdrop-blur-xl border border-white/20 
                rounded-full p-2.5 
                opacity-0 group-hover:opacity-100
                hover:bg-background/80 hover:border-primary/30 hover:scale-110
                transition-all duration-300 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div
              className="relative px-16"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                dragElastic={0.1}
                style={{ x }}
                animate={controls}
                className="flex gap-6 cursor-grab active:cursor-grabbing"
                transition={{
                  x: shouldAnimate ? {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  } : {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                }}
                onAnimationComplete={() => {
                  // Reset position for infinite loop
                  if (shouldAnimate) {
                    const currentX = x.get();
                    if (currentX <= -1400) {
                      x.set(0);
                    }
                  }
                }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    className="flex-shrink-0 w-[90vw] sm:w-[500px] md:w-[600px] bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-colors"
                    onClick={handleCardClick}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Quote */}
                    <blockquote className="text-lg text-foreground leading-relaxed mb-6 italic">
                      "{language === 'nl' ? testimonial.content.nl : testimonial.content.en}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='20' font-weight='bold'%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'nl' ? testimonial.role.nl : testimonial.role.en}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
