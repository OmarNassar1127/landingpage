"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppButton() {
    // On phones the bubble covers the hero's approve button, so it waits until the hero scrolls away.
    const [heroInView, setHeroInView] = useState(false);
    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const io = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting));
        io.observe(hero);
        return () => io.disconnect();
    }, []);

    return (
        <div
            className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3 transition-[opacity,transform] duration-300 ${
                heroInView ? "max-sm:pointer-events-none max-sm:translate-y-4 max-sm:opacity-0" : ""
            }`}
        >
            {/* WhatsApp Button - Large Circle */}
            <a
                href="https://wa.me/31687838713"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            >
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
            </a>
        </div>
    );
}
