"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppButton() {
    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3">
            {/* WhatsApp Button - Large Circle */}
            <a
                href="https://wa.me/31687838713"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
            </a>
        </div>
    );
}
