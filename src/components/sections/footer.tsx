"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Linkedin, Github, ExternalLink } from "lucide-react";

export default function Footer() {
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
                Creating innovative solutions for modern challenges. We specialize in AI systems,
                SaaS platforms, KYC integrations, and shop automations.
              </p>
            </motion.div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#" },
                { name: "Projects", href: "#projects" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
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
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
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
            &copy; {new Date().getFullYear()} NexBuy. All rights reserved.
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
