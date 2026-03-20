"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HashLink } from "@/components/hash-router/hash-router";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const [whatNextOpen, setWhatNextOpen] = useState(false);
  const isWorkshopPage = typeof window !== "undefined" && window.location.pathname.includes("/workshop");

  return (
    <footer className="bg-background border-t border-border/50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <a
                href="/"
                className="inline-block hover:opacity-80 transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className="flex items-center gap-2.5 text-2xl font-black tracking-tight">
                  <img src="/favicon-96x96.png" alt="Virelio logo" className="h-8 w-8 rounded-lg" />
                  Virelio<span className="text-primary">.</span>
                </span>
              </a>
              <p className="text-sm sm:text-base text-muted-foreground max-w-full sm:max-w-md leading-relaxed">
                {language === "nl"
                  ? "AI-oplossingen op maat. Kennisbanken, AI Agents en Automatiseringen. Van idee tot live in 2 weken."
                  : "Custom AI solutions. Knowledge bases, AI Agents, and Automations. From idea to live in 2 weeks."}
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-foreground mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {[
                { name: t.nav.home, href: "#" },
                { name: t.nav.services, href: "#services" },
                { name: language === "nl" ? "Klantresultaten" : "Case studies", href: "#case-studies" },
                { name: language === "nl" ? "Aanbevelingen" : "Testimonials", href: "#testimonials" },
                { name: language === "nl" ? "Contact" : "Contact", href: "#ready-to-start" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href.startsWith("#") ? "/" + link.href : link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.location.pathname !== "/" && window.location.pathname !== "/en" && window.location.pathname !== "/en/") {
                        window.location.href = link.href === "#" ? "/" : "/" + link.href;
                        return;
                      }
                      const handled = navigateFromPolicyPage(link.href);
                      if (!handled) {
                        if (link.href === "#") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          scrollToSection(link.href.replace("#", ""));
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

          {/* Diensten */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-foreground mb-5">
              {language === "nl" ? "Diensten" : "Services"}
            </h4>
            <ul className="space-y-3">
              {[
                { name: language === "nl" ? "AI Agent Bouwen" : "Build AI Agent", href: "/diensten/ai-agent-bouwen" },
                { name: language === "nl" ? "Digitale Medewerker" : "Digital Employee", href: "/diensten/digitale-medewerker" },
                { name: language === "nl" ? "AI voor MKB" : "AI for SMBs", href: "/diensten/ai-automatisering-mkb" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-foreground mb-5">
              {language === "nl" ? "Kennisbank" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "/blog" },
                { name: "AI Agent Workshop", href: "/workshop" },
                { name: language === "nl" ? "Spraakassistent" : "Voice Assistant", href: language === "nl" ? "/spraakassistent" : "/voiceassistant" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-foreground mb-5">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3">
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
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <HashLink
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workshop: What happens next? (collapsible) */}
        {isWorkshopPage && (
          <div className="border-t border-border/50 mt-12 pt-8">
            <div className="max-w-xl mx-auto bg-muted/50 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setWhatNextOpen(!whatNextOpen)}
                className="w-full flex items-center justify-between p-4 font-semibold text-left hover:bg-muted/70 transition-colors"
              >
                {t.workshop.contactForm.whatNext}
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${whatNextOpen ? "rotate-180" : ""}`}
                />
              </button>
              {whatNextOpen && (
                <ul className="px-4 pb-4 text-sm text-muted-foreground space-y-1 list-none">
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">•</span>
                    <span className="text-left"><strong>{t.workshop.contactForm.nextSteps.contact}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">•</span>
                    <span className="text-left"><strong>{t.workshop.contactForm.nextSteps.meeting}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">•</span>
                    <span className="text-left"><strong>{t.workshop.contactForm.nextSteps.proposal}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex-shrink-0">•</span>
                    <span className="text-left"><strong>{t.workshop.contactForm.nextSteps.scheduling}</strong></span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Bottom */}
        <div className="border-t border-border/50 mt-16 pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Virelio. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
