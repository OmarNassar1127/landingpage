"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function GuaranteeSection() {
    const { language } = useLanguage();

    const guarantees = [
        language === 'nl'
            ? 'Geld terug als je niet tevreden bent; geen vragen, geen gedoe'
            : 'Money back if you\'re not satisfied; no questions, no hassle',
        language === 'nl'
            ? 'Binnen 4 uur persoonlijke reactie van Robin'
            : 'Personal response from Robin within 4 hours',
        language === 'nl'
            ? 'Past het niet perfect? Gratis aanpassingen tot het klopt'
            : 'Doesn\'t fit perfectly? Free adjustments until it\'s right'
    ];

    return (
        <section className="py-24 bg-[#EFF6FF]" id="guarantee">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4 text-[#111827]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {language === 'nl' ? 'Jouw tevredenheid, gegarandeerd' : 'Your satisfaction, guaranteed'}
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-600 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {language === 'nl' ? 'Wij nemen het risico, niet jij.' : 'We take the risk, not you.'}
                    </motion.p>

                    <div className="space-y-6 max-w-2xl mx-auto">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center justify-center gap-4 text-center"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <div className="flex-shrink-0">
                                    <Check className="h-6 w-6 text-blue-600" strokeWidth={3} />
                                </div>
                                <p className="text-lg text-gray-800 leading-relaxed">
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
