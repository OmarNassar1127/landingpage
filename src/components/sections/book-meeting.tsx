"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import Script from "next/script";

export default function BookMeeting() {
  const { t } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Handle automatic scroll to section on page load with hash
  useEffect(() => {
    // Check if there's a hash in the URL that matches this section
    const hash = window.location.hash;
    if (hash === '#book-meeting') {
      // Small delay to ensure the page is fully loaded and rendered
      const timer = setTimeout(() => {
        scrollToSection('book-meeting');
      }, 500); // 500ms delay should be enough for the page to fully load
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array means this runs only once on component mount

  // This effect will initialize the Calendly widget when the component mounts
  useEffect(() => {
    // Create a cleanup function to remove the Calendly script if the component unmounts
    return () => {
      // Cleanup Calendly related elements if needed
      const existingScript = document.getElementById('calendly-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="book-meeting" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Calendly Script */}
      <Script
        id="calendly-script"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -left-40 -bottom-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="w-20 h-1 bg-primary mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t.bookMeeting?.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {t.bookMeeting?.subtitle}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {/* Calendly Inline Widget */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/quotum-consulting/30min"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
