"use client";

import React from "react";
import { motion } from "framer-motion";
import { HashLink } from "@/components/hash-router/hash-router";
import { useLanguage } from "@/lib/i18n/language-context";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background border-t border-border/50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
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
                <span className="text-2xl font-black tracking-tight">
                  Virelio<span className="text-primary">.</span>
                </span>
              </a>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
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
                { name: language === "nl" ? "Aanbevelingen" : "Testimonials", href: "#testimonials" },
                { name: language === "nl" ? "Contact" : "Contact", href: "#ready-to-start" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href.startsWith("#") ? "/" + link.href : link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
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
