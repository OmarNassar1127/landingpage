"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection } from "@/lib/scroll-utils";
import { Video, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookMeeting() {
  const { language } = useLanguage();
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#book-meeting') {
      const timer = setTimeout(() => {
        scrollToSection('book-meeting');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
  };

  return (
    <section id="book-meeting" className="py-24 relative overflow-hidden">
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
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {language === 'nl' ? 'Plan een kennismaking' : 'Book a meeting'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {language === 'nl'
              ? 'Kies hoe je contact wilt maken. Gratis en vrijblijvend.'
              : 'Choose how you want to connect. Free and non-binding.'}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {/* Modern Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Google Meet */}
            <motion.a
              href="https://meet.google.com/new"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="p-8 rounded-2xl border-2 border-border hover:border-primary bg-card transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Google Meet</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {language === 'nl' ? 'Start direct een videocall' : 'Start a video call immediately'}
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all"
                >
                  {language === 'nl' ? 'Start call →' : 'Start call →'}
                </Button>
              </div>
            </motion.a>

            {/* Gmail */}
            <motion.a
              href="mailto:robin.bril@gmail.com"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="p-8 rounded-2xl border-2 border-border hover:border-primary bg-card transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Email</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  robin.bril@gmail.com
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                >
                  {language === 'nl' ? 'Stuur email →' : 'Send email →'}
                </Button>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/31640446732"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="p-8 rounded-2xl border-2 border-border hover:border-primary bg-card transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">WhatsApp</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  +31 6 4044 6732
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all"
                >
                  {language === 'nl' ? 'Open chat →' : 'Open chat →'}
                </Button>
              </div>
            </motion.a>
          </div>

          {/* Alternative text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            {language === 'nl'
              ? 'Of bel direct: '
              : 'Or call directly: '}
            <a
              href="tel:+31640446732"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              06-4044 6732
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
