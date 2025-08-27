"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle, Mail, Phone, MapPin, Clock, Euro } from "lucide-react";

interface ZzpContactProps {
  isEnglish?: boolean;
}

export default function ZzpContact({ isEnglish = false }: ZzpContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const content = isEnglish ? {
    sectionTitle: "Ready to Start Your Project?",
    sectionSubtitle: "Get in touch with us to discuss your next development project. We'll get back to you within 24 hours.",
    formTitle: "Project Inquiry",
    fields: {
      name: "Your Name",
      email: "Email Address", 
      company: "Company (Optional)",
      projectType: "Project Type",
      budget: "Budget Range",
      timeline: "Timeline",
      message: "Project Description"
    },
    projectTypes: [
      "Web Application",
      "Mobile App",
      "AI Integration",
      "API Development", 
      "E-commerce Solution",
      "Automation System",
      "Other"
    ],
    budgetRanges: [
      "< €5,000",
      "€5,000 - €15,000",
      "€15,000 - €50,000", 
      "€50,000+",
      "Ongoing Partnership"
    ],
    timelines: [
      "ASAP",
      "1-2 weeks",
      "1 month",
      "2-3 months",
      "3+ months"
    ],
    submitButton: "Send Project Inquiry",
    submitting: "Sending...",
    successTitle: "Message Sent!",
    successMessage: "Thank you for your interest! We'll review your project and get back to you within 24 hours.",
    errorTitle: "Something went wrong",
    errorMessage: "Please try again or contact us directly.",
    retryButton: "Try Again",
    contactInfo: {
      title: "Quick Contact",
      email: "Email",
      emailAddress: "robin.bril@gmail.com",
      phone: "Phone", 
      phoneNumber: "+31 6 4044 6732",
      location: "Location",
      locationText: "Amsterdam, Netherlands",
      availability: "Availability",
      availabilityText: "Available for new projects"
    },
    features: [
      {
        icon: Clock,
        title: "Fast Response",
        description: "24h response time"
      },
      {
        icon: Euro,
        title: "Competitive Rates",
        description: "Fair pricing for quality work"
      },
      {
        icon: CheckCircle,
        title: "Quality Guaranteed", 
        description: "Professional development standards"
      }
    ]
  } : {
    sectionTitle: "Klaar om je Project te Starten?",
    sectionSubtitle: "Neem contact met ons op om je volgende ontwikkelproject te bespreken. We reageren binnen 24 uur.",
    formTitle: "Project Aanvraag",
    fields: {
      name: "Jouw Naam",
      email: "E-mailadres",
      company: "Bedrijf (Optioneel)", 
      projectType: "Project Type",
      budget: "Budget Bereik",
      timeline: "Tijdslijn",
      message: "Project Beschrijving"
    },
    projectTypes: [
      "Web Applicatie",
      "Mobiele App", 
      "AI Integratie",
      "API Ontwikkeling",
      "E-commerce Oplossing",
      "Automatiseringssysteem",
      "Anders"
    ],
    budgetRanges: [
      "< €5.000",
      "€5.000 - €15.000", 
      "€15.000 - €50.000",
      "€50.000+",
      "Continue Samenwerking"
    ],
    timelines: [
      "Zo snel mogelijk",
      "1-2 weken",
      "1 maand", 
      "2-3 maanden",
      "3+ maanden"
    ],
    submitButton: "Verstuur Project Aanvraag",
    submitting: "Versturen...",
    successTitle: "Bericht Verzonden!",
    successMessage: "Bedankt voor je interesse! We bekijken je project en reageren binnen 24 uur.",
    errorTitle: "Er ging iets mis",
    errorMessage: "Probeer het opnieuw of neem direct contact met ons op.",
    retryButton: "Probeer Opnieuw",
    contactInfo: {
      title: "Direct Contact",
      email: "E-mail",
      emailAddress: "robin.bril@gmail.com",
      phone: "Telefoon",
      phoneNumber: "+31 6 4044 6732", 
      location: "Locatie",
      locationText: "Amsterdam, Nederland",
      availability: "Beschikbaarheid",
      availabilityText: "Beschikbaar voor nieuwe projecten"
    },
    features: [
      {
        icon: Clock,
        title: "Snelle Reactie",
        description: "24u reactietijd"
      },
      {
        icon: Euro, 
        title: "Concurrerende Tarieven",
        description: "Eerlijke prijzen voor kwaliteitswerk"
      },
      {
        icon: CheckCircle,
        title: "Kwaliteit Gegarandeerd",
        description: "Professionele ontwikkelstandaarden"
      }
    ]
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://formspree.io/f/xldjpybw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          projectType: formState.projectType,
          budget: formState.budget,
          timeline: formState.timeline,
          message: formState.message,
          _subject: `ZZP Project Inquiry from ${formState.name}`,
          _context: "ZZP Freelance Contact Form"
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      setFormState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "Form submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card 
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm"
              style={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(255, 255, 255, 0.1)" 
              }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-2xl font-bold mb-6">{content.formTitle}</h3>
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-2">{content.successTitle}</h4>
                      <p className="text-muted-foreground">{content.successMessage}</p>
                    </motion.div>
                  ) : submitError ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{content.errorTitle}</h4>
                      <p className="text-muted-foreground mb-4">{content.errorMessage}</p>
                      <Button onClick={() => setSubmitError(null)}>
                        {content.retryButton}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {content.fields.name} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {content.fields.email} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {content.fields.company}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      {/* Project Type, Budget, Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {content.fields.projectType} *
                          </label>
                          <select
                            name="projectType"
                            required
                            value={formState.projectType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                          >
                            <option value="">Select...</option>
                            {content.projectTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {content.fields.budget}
                          </label>
                          <select
                            name="budget"
                            value={formState.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                          >
                            <option value="">Select...</option>
                            {content.budgetRanges.map((budget) => (
                              <option key={budget} value={budget}>{budget}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {content.fields.timeline}
                          </label>
                          <select
                            name="timeline"
                            value={formState.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
                          >
                            <option value="">Select...</option>
                            {content.timelines.map((timeline) => (
                              <option key={timeline} value={timeline}>{timeline}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {content.fields.message} *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder={isEnglish ? "Tell us about your project..." : "Vertel ons over je project..."}
                          className="w-full px-4 py-3 border-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-gray-900 dark:text-gray-100 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-3 sm:py-4"
                      >
                        {isSubmitting ? content.submitting : (
                          <>
                            {content.submitButton}
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <Card 
              className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm"
              style={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 50px -12px rgba(255, 255, 255, 0.1)" 
              }}
            >
              <CardContent className="p-4 sm:p-6">
                <h4 className="text-xl font-semibold mb-6">{content.contactInfo.title}</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{content.contactInfo.email}</p>
                      <a 
                        href={`mailto:${content.contactInfo.emailAddress}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {content.contactInfo.emailAddress}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{content.contactInfo.phone}</p>
                      <a 
                        href={`tel:${content.contactInfo.phoneNumber.replace(/\s+/g, '')}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {content.contactInfo.phoneNumber}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{content.contactInfo.location}</p>
                      <p className="text-sm text-muted-foreground">{content.contactInfo.locationText}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    {content.contactInfo.availabilityText}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-4">
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50"
                  style={{ 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                >
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}