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
            number: "01",
            title: language === 'nl' ? '30 min kennismaken' : '30 min introduction',
            description: language === 'nl'
                ? 'We bespreken je uitdaging, waar je nu staat, en waar je naartoe wilt.'
                : 'We discuss your challenge, where you are now, and where you want to go.'
        },
        {
            icon: FileText,
            number: "02",
            title: language === 'nl' ? 'Voorstel binnen 4u' : 'Proposal within 4h',
            description: language === 'nl'
                ? 'Je krijgt een strak voorstel: wat we bouwen, hoe lang het duurt, en wat het kost.'
                : 'You get a tight proposal: what we\'ll build, how long it takes, and what it costs.'
        },
        {
            icon: Rocket,
            number: "03",
            title: language === 'nl' ? 'Live in 2 weken' : 'Live in 2 weeks',
            description: language === 'nl'
                ? 'Akkoord? We beginnen direct. Binnen 2 weken heb je een werkende oplossing.'
                : 'Approved? We start immediately. Within 2 weeks you have a working solution.'
        }
    ];

    return (
        <section className="py-20 sm:py-28 md:py-32 bg-background relative overflow-hidden" id="intake">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <motion.p
                            className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'Zo werkt het' : 'How it works'}
                        </motion.p>

                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                        >
                            {language === 'nl' ? 'Van idee tot live' : 'From idea to live'}
                        </motion.h2>

                        <motion.p
                            className="text-lg sm:text-xl text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {language === 'nl'
                                ? 'Drie simpele stappen naar je werkende AI-oplossing'
                                : 'Three simple steps to your working AI solution'}
                        </motion.p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="relative"
                                >
                                    <div className="h-full p-8 rounded-2xl border border-border bg-background text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                                        {/* Step number */}
                                        <span className="text-6xl font-black text-primary/10 absolute top-4 right-6">
                                            {step.number}
                                        </span>

                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                                            <Icon className="h-7 w-7 text-primary" />
                                        </div>

                                        <h3 className="font-bold text-xl mb-3 text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        id="ready-to-start"
                        className="rounded-2xl border border-border bg-muted/40 dark:bg-muted/20 p-10 sm:p-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                            {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
                        </h3>

                        <p className="text-lg sm:text-xl text-muted-foreground mb-10">
                            {language === 'nl'
                                ? '30 minuten. Gratis. Geen verplichtingen.'
                                : '30 minutes. Free. No commitments.'}
                        </p>

                        {/* Primary CTA */}
                        <div className="mb-8 flex justify-center">
                            <Button
                                size="lg"
                                asChild
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 sm:px-14 py-6 sm:py-7 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                            >
                                <a
                                    href="https://calendly.com/quotum-consulting/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3"
                                >
                                    {language === 'nl' ? 'Plan een gesprek' : 'Schedule a call'}
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-muted-foreground mb-8">
                            {[
                                language === 'nl' ? 'Binnen 4u reactie' : 'Response within 4h',
                                language === 'nl' ? '18 bedrijven geholpen' : '18 companies helped',
                                language === 'nl' ? 'Geld-terug garantie' : 'Money-back guarantee',
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                                    <span>{text}</span>
                                    </div>
                                ))}
                            </div>

                        {/* Contact Accordion */}
                        <div className="max-w-sm mx-auto">
                            <button
                                onClick={() => setShowContact(!showContact)}
                                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto mb-4"
                            >
                                <span className="text-sm">{language === 'nl' ? 'Of neem direct contact op' : 'Or contact directly'}</span>
                                <ChevronRight
                                    className={`h-4 w-4 transition-transform ${showContact ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {showContact && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-background rounded-xl p-4 space-y-2 border border-border"
                                >
                                    <a href="tel:+31687837135" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                        <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-foreground font-medium text-sm">+31 6 8783 7135</span>
                                    </a>
                                    <a href="mailto:contact@virelio.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-foreground font-medium text-sm">contact@virelio.com</span>
                                    </a>
                                    <a href="https://wa.me/31687837135" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                        <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-foreground font-medium text-sm">WhatsApp</span>
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
