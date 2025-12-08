"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HashLink } from "@/components/hash-router/hash-router";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";

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

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <a
                href="/"
                className="flex items-center hover:opacity-80 transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="text-2xl font-black tracking-tight">
                  Virelio<span className="text-primary">.</span>
                </span>
              </a>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
                {language === 'nl'
                  ? 'AI-oplossingen op maat. Kennisbanken, AI Agents en Automatiseringen. Van idee tot live in 2 weken.'
                  : 'Custom AI solutions. Knowledge bases, AI Agents, and Automations. From idea to live in 2 weeks.'}
              </p>
            </motion.div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {[
                { name: t.nav.home, href: "#" },
                { name: t.nav.projects, href: "#projects" },
                { name: t.nav.about, href: "#about" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href.startsWith('#') ? '/' + link.href : link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const handledPolicyNavigation = navigateFromPolicyPage(
                        link.href
                      );
                      if (!handledPolicyNavigation) {
                        if (link.href === "#") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          const sectionId = link.href.replace("#", "");
                          scrollToSection(sectionId);
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2">
              {[
                { name: t.footer.privacyPolicy, href: "/privacy-policy" },
                { name: t.footer.termsOfService, href: "/terms-of-service" },
                { name: t.footer.cookiePolicy, href: "/cookie-policy" },
                { name: t.footer.sitemap, href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.name}>
                  {link.name === t.footer.sitemap ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <HashLink
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Virelio. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
