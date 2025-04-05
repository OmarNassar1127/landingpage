"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Footer() {
  const { t } = useLanguage();
  
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
              <h3 className="text-2xl font-bold">NexBuy</h3>
              <p className="text-muted-foreground max-w-md">
                {t.footer.description}
              </p>
            </motion.div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { name: t.nav.home, href: "#" },
                { name: t.nav.projects, href: "#projects" },
                { name: t.nav.about, href: "#about" },
                { name: t.nav.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2">
              {[
                { name: t.footer.privacyPolicy, href: "#" },
                { name: t.footer.termsOfService, href: "#" },
                { name: t.footer.cookiePolicy, href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NexBuy. {t.footer.rights}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { name: 'twitter', icon: <Twitter className="h-5 w-5" /> },
              { name: 'linkedin', icon: <Linkedin className="h-5 w-5" /> },
              { name: 'github', icon: <Github className="h-5 w-5" /> },
              { name: 'website', icon: <ExternalLink className="h-5 w-5" /> }
            ].map((social) => (
              <a
                key={social.name}
                href={`#${social.name}`}
                className="text-muted-foreground hover:text-primary"
                aria-label={`${social.name} profile`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
