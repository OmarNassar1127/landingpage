"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import DemoRequestModal from "@/components/demo-request-modal";
import Timeline, { type Step } from "@/components/sections/intake/timeline";
import CtaPanel from "@/components/sections/intake/cta-panel";

export default function IntakeExplanationSection() {
    const { language } = useLanguage();
    const isNL = language === 'nl';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reduce = useReducedMotion();

    const steps: Step[] = [
        {
            value: "30",
            unit: "min",
            title: isNL ? '30 min kennismaken' : '30 min introduction',
            description: isNL
                ? 'We bespreken je uitdaging, waar je nu staat en waar je naartoe wilt.'
                : 'We discuss your challenge, where you are now and where you want to go.'
        },
        {
            value: "4",
            unit: isNL ? "uur" : "hours",
            title: isNL ? 'Voorstel binnen 4u' : 'Proposal within 4h',
            description: isNL
                ? 'Je krijgt een strak voorstel: wat we bouwen, hoe lang het duurt en wat het kost.'
                : 'You get a tight proposal: what we\'ll build, how long it takes and what it costs.'
        },
        {
            value: "1",
            unit: "week",
            title: 'Live in 1 week',
            description: isNL
                ? 'Akkoord? We beginnen direct. Binnen 1 week heb je een werkende oplossing.'
                : 'Approved? We start immediately. Within 1 week you have a working solution.'
        }
    ];

    const rise = (delay = 0) =>
        reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
            };

    return (
        <section aria-labelledby="intake-title" className="relative overflow-hidden bg-background py-20 sm:py-28 md:py-32" id="intake">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
                        <motion.p {...rise()} className="mb-5 inline-flex items-center rounded-full border border-primary/10 bg-primary/[0.05] px-3.5 py-1.5 text-xs font-medium text-primary sm:text-sm">
                            {isNL ? 'Zo werkt het' : 'How it works'}
                        </motion.p>
                        <motion.h2 {...rise(0.05)} id="intake-title" className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            {isNL ? 'Van idee tot live' : 'From idea to live'}
                        </motion.h2>
                        <motion.p {...rise(0.1)} className="text-lg text-muted-foreground sm:text-xl">
                            {isNL
                                ? 'Drie simpele stappen naar je werkende AI-oplossing'
                                : 'Three simple steps to your working AI solution'}
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="mb-20 sm:mb-28">
                        <Timeline steps={steps} />
                    </div>

                    <CtaPanel isNL={isNL} />
                </div>
            </div>

            <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
