"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Contact() {
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

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/xldjpybw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _subject: `New contact from ${formState.name}: ${formState.subject}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      
      // Reset form fields on success
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitted(true);
      
      // Success message will remain until page refresh
      // (removed the automatic timeout that would hide the message)
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "Form submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6 
      },
    },
  };
  
  const formControlVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -right-40 bottom-20 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
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
            {t.contact.title}
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
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-card rounded-xl shadow-sm p-8 border border-primary/5"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="flex flex-col items-center justify-center h-full text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2
                    }}
                  >
                    <CheckCircle className="h-16 w-16 text-primary mb-4" />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-semibold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {t.contact.successTitle}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {t.contact.successMessage}
                  </motion.p>
                </motion.div>
              ) : submitError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="flex flex-col items-center justify-center h-full text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2
                    }}
                  >
                    <svg className="h-16 w-16 text-destructive mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M15 9l-6 6M9 9l6 6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-semibold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {t.contact.errorTitle}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {t.contact.errorMessage}
                  </motion.p>
                  <Button 
                    onClick={() => setSubmitError(null)}
                    className="mt-2"
                  >
                    {t.contact.retryButton}
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  action="https://formspree.io/f/xldjpybw"
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={formControlVariants}
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        {t.contact.name}
                      </label>
                      <motion.input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        {t.contact.email}
                      </label>
                      <motion.input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    variants={formControlVariants}
                    custom={1}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium">
                      {t.contact.subject}
                    </label>
                    <motion.input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    variants={formControlVariants}
                    custom={2}
                  >
                    <label htmlFor="message" className="block text-sm font-medium">
                      {t.contact.message}
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md bg-background resize-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={formControlVariants}
                    custom={3}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      size="lg"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? t.contact.sending : (
                        <span className="flex items-center">
                          {t.contact.send}
                          {!isSubmitting && (
                            <motion.span
                              className="ml-2 inline-block"
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send className="h-4 w-4" />
                            </motion.span>
                          )}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.contact.contactInfo}</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Mail className="h-5 w-5 text-primary" />,
                    title: t.contact.email,
                    content: t.contact.emailAddress,
                    href: `mailto:${t.contact.emailAddress}`
                  },
                  {
                    icon: <Phone className="h-5 w-5 text-primary" />,
                    title: t.contact.phone,
                    content: t.contact.phoneNumber,
                    href: `tel:${t.contact.phoneNumber.replace(/\s+/g, '')}`
                  },
                  {
                    icon: <MapPin className="h-5 w-5 text-primary" />,
                    title: t.contact.location,
                    content: t.contact.locationText,
                    href: null
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="mt-1 mr-3"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.contact.followUs}</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'twitter', icon: <Twitter className="h-5 w-5" /> },
                  { name: 'linkedin', icon: <Linkedin className="h-5 w-5" /> },
                  { name: 'github', icon: <Github className="h-5 w-5" /> },
                  { name: 'website', icon: <ExternalLink className="h-5 w-5" /> }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={`#${social.name}`}
                    className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(var(--primary), 0.2)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
