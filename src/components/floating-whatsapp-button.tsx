"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function FloatingWhatsAppButton() {
    const { language } = useLanguage();

    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-white dark:bg-card border border-border shadow-lg">
                <div className="relative">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="font-semibold text-foreground text-xs sm:text-sm">
                    {language === 'nl' ? 'Robin is online!' : 'Robin is online!'}
                </span>
            </div>

            {/* WhatsApp Button - Large Circle */}
            <a
                href="https://wa.me/31640446732"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
            </a>
        </div>
    );
}
