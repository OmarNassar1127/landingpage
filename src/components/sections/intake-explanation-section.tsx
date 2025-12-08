"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Rocket, ArrowRight, ChevronRight, Phone, Mail, MessageCircle, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "@/components/demo-request-modal";

export default function IntakeExplanationSection() {
    const { language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const steps = [
        {
            icon: Calendar,
            title: language === 'nl' ? '30 min kennismaken' : '30 min introduction',
            description: language === 'nl'
                ? 'We bespreken je uitdaging, waar je nu staat, en waar je naartoe wilt.'
                : 'We discuss your challenge, where you are now, and where you want to go.'
        },
        {
            icon: FileText,
            title: language === 'nl' ? 'Voorstel binnen 4u' : 'Proposal within 4h',
            description: language === 'nl'
                ? 'Je krijgt een strak voorstel: wat we bouwen, hoe lang het duurt, en wat het kost.'
                : 'You get a tight proposal: what we\'ll build, how long it takes, and what it costs.'
        },
        {
            icon: Rocket,
            title: language === 'nl' ? 'Live in 2 weken' : 'Live in 2 weeks',
            description: language === 'nl'
                ? 'Akkoord? We beginnen direct. Binnen 2 weken heb je een werkende oplossing.'
                : 'Approved? We start immediately. Within 2 weeks you have a working solution.'
        }
    ];

    return (
        <section className="py-10 sm:py-16 bg-background relative overflow-hidden" id="intake">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'Hoe werkt het?' : 'How does it work?'}
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-muted-foreground px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {language === 'nl'
                                ? 'Van kennismaking tot werkende oplossing in 3 simpele stappen'
                                : 'From introduction to working solution in 3 simple steps'}
                        </motion.p>
                    </div>

                    {/* Steps with Progress Bar */}
                    <div className="relative mb-32">
                        {/* Progress bar container */}
                        <div className="absolute top-[60px] left-0 right-0 h-1 bg-gray-200 hidden md:block">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {/* Step number badge - centered at top */}
                                        <div className="flex justify-center mb-6">
                                            <motion.div
                                                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg z-10 relative"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                                            >
                                                {index + 1}
                                            </motion.div>
                                        </div>

                                        {/* Card */}
                                        <div className="bg-card border border-border rounded-xl p-6 h-full text-center">
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                                <Icon className="h-7 w-7 text-primary" />
                                            </div>

                                            <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clean CTA Section */}
                    <motion.div
                        id="ready-to-start"
                        className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                            {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
                        </h3>

                        <p className="text-base sm:text-lg text-muted-foreground mb-8">
                            {language === 'nl'
                                ? '30 minuten. Gratis. Geen verplichtingen.'
                                : '30 minutes. Free. No commitments.'}
                        </p>

                        {/* Primary CTA */}
                        <div className="mb-6 flex justify-center">
                            <Button
                                size="lg"
                                asChild
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <a
                                    href="https://calendly.com/quotum-consulting/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    {language === 'nl' ? 'Plan een gesprek' : 'Schedule a call'}
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* Contact Accordion */}
                        <div className="max-w-sm mx-auto">
                            <button
                                onClick={() => setShowContact(!showContact)}
                                className="flex items-center justify-center gap-2 text-foreground/70 hover:text-foreground transition-colors mx-auto group mb-4"
                            >
                                <span className="text-base">{language === 'nl' ? 'Of neem direct contact op' : 'Or contact directly'}</span>
                                <ChevronRight
                                    className={`h-5 w-5 transition-transform ${showContact ? 'rotate-90' : ''}`}
                                />
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                                <span>{language === 'nl' ? 'Binnen 4u reactie' : 'Response within 4h'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                                <span>{language === 'nl' ? '18 bedrijven geholpen' : '18 companies helped'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                                <span>{language === 'nl' ? 'Geld-terug garantie' : 'Money-back guarantee'}</span>
                            </div>
                        </div>
                    </a>
                </motion.div>
                            )}
            </div>
        </motion.div>
                </div >
            </div >


        {/* Demo Request Modal */ }
        < DemoRequestModal isOpen = { isModalOpen } onClose = {() => setIsModalOpen(false)
} />
        </section >
    );
}
