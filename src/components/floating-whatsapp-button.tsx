"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function FloatingWhatsAppButton() {
    const { language } = useLanguage();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-card border border-border shadow-lg">
                <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="font-semibold text-foreground text-sm">
                    {language === 'nl' ? 'Robin is online!' : 'Robin is online!'}
                </span>
            </div>

            {/* WhatsApp Button - Large Circle */}
            <a
                href="https://wa.link/0640446732"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
                <MessageCircle className="h-8 w-8 text-white" strokeWidth={2.5} />
            </a>
        </div>
    );
}
