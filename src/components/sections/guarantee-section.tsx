"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function GuaranteeSection() {
    const { language } = useLanguage();

    const guarantees = [
        language === 'nl'
            ? 'Geld terug als je niet tevreden bent — geen vragen, geen gedoe'
            : 'Money back if you\'re not satisfied — no questions asked',
        language === 'nl'
            ? 'Binnen 4 uur persoonlijke reactie van ons team'
            : 'Personal response from our team within 4 hours',
        language === 'nl'
            ? 'Past het niet perfect? Gratis aanpassingen tot het klopt'
            : 'Not perfect? Free revisions until it is'
    ];

    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden" id="guarantee">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.p
                        className="text-sm font-medium text-primary uppercase tracking-widest mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {language === 'nl' ? 'Onze belofte' : 'Our promise'}
                    </motion.p>

                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                    >
                        {language === 'nl' ? 'Jouw tevredenheid, gegarandeerd' : 'Your Satisfaction, Guaranteed'}
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl text-muted-foreground mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {language === 'nl' ? 'Wij nemen het risico, niet jij.' : 'We take the risk. Not you.'}
                    </motion.p>

                    <div className="space-y-5 max-w-2xl mx-auto">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-background border border-border/50"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + index * 0.08 }}
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                                </div>
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-left">
                                    {guarantee}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
