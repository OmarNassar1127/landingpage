"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";
import { useLanguage } from "@/lib/i18n/language-context";

// WhatsApp icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

  // Handle automatic scroll to section on page load with hash
  useEffect(() => {
    // Check if there's a hash in the URL that matches this section
    const hash = window.location.hash;
    if (hash === '#contact') {
      // Small delay to ensure the page is fully loaded and rendered
      const timer = setTimeout(() => {
        scrollToSection('contact');
      }, 500); // 500ms delay should be enough for the page to fully load
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array means this runs only once on component mount

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
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
          phone: formState.phone,
          message: formState.message,
          _subject: `New contact from ${formState.name}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }
      
      // Reset form fields on success
      setFormState({
        name: "",
        email: "",
        phone: "",
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
    <section id="contact" className="py-24 relative overflow-hidden">
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
            className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm"
            style={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(255, 255, 255, 0.1)" 
            }}
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
                    size="mobile"
                    className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
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
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.name}
                      </label>
                      <motion.input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.email}
                      </label>
                      <motion.input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-1"
                    variants={formControlVariants}
                    custom={1}
                  >
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.phone}
                    </label>
                    <motion.input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-1"
                    variants={formControlVariants}
                    custom={2}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.message}
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows={4}
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
                    className="flex justify-center"
                  >
                    <Button
                      type="submit"
                      size="mobile"
                      className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg hover:shadow-xl transition-all duration-300"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? t.contact.sending : (
                        <span className="flex items-center gap-3">
                          {t.contact.send}
                          {!isSubmitting && (
                            <motion.span
                              className="inline-block"
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send className="h-5 w-5" />
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
            {/* Robin's Image */}
            <motion.div 
              className="flex items-center space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src="/images/contact/robin.jpeg"
                  alt="Robin - Contact Person"
                  className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white dark:border-gray-800"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Robin</h4>
                <p className="text-xs text-muted-foreground">Contactpersoon</p>
              </div>
            </motion.div>

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
              <div className="flex">
                <motion.a
                  href="https://wa.me/31640446732"
                  className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.2 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">WhatsApp</span>
                  <WhatsAppIcon className="h-5 w-5 text-black dark:text-white" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
