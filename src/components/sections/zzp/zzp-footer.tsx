"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// WhatsApp icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ZzpFooterProps {
  isEnglish?: boolean;
}

export default function ZzpFooter({ isEnglish = false }: ZzpFooterProps) {
  const content = isEnglish ? {
    description: "Virelio Freelance: Expert developers Omar & Robin delivering professional software development services in the Netherlands.",
    quickLinks: "Quick Links",
    contact: "Contact",
    team: "Our Team",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service", 
    cookiePolicy: "Cookie Policy",
    sitemap: "Sitemap",
    rights: "All rights reserved."
  } : {
    description: "Virelio ZZP: Expert developers Omar & Robin leveren professionele software development services in Nederland.",
    quickLinks: "Snelle Links",
    contact: "Contact",
    team: "Ons Team",
    legal: "Juridisch",
    privacyPolicy: "Privacybeleid",
    termsOfService: "Gebruiksvoorwaarden",
    cookiePolicy: "Cookiebeleid", 
    sitemap: "Sitemap",
    rights: "Alle rechten voorbehouden."
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-transparent py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Link 
                href="/" 
                className="text-2xl font-bold tracking-widest bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text hover:opacity-80 transition"
              >
                VIRELIO
              </Link>
              <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                {content.description}
              </p>
            </motion.div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">
              {content.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('profiles')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {content.team}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {content.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{content.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.termsOfService}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.cookiePolicy}
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.sitemap}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Virelio. {content.rights}
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://wa.me/31640446732"
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}