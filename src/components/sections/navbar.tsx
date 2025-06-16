"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: t.nav.home, href: "#" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.testimonials, href: "#testimonials" },
    { name: t.nav.bookMeeting, href: "#book-meeting" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Check which section is currently in view
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      // Check if we're at the top of the page
      if (scrollPosition < 200) {
        setActiveSection("");
        return;
      }
      
      // Check each section
      const sections = navLinks
        .filter(link => link.href !== "#")
        .map(link => ({
          id: link.href.replace("#", ""),
          position: document.getElementById(link.href.replace("#", ""))?.offsetTop || 0
        }));
      
      // Sort sections by position (top to bottom)
      sections.sort((a, b) => a.position - b.position);
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's an external link (starts with / but not #), don't prevent default
    if (href.startsWith('/') && !href.startsWith('#')) {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return; // Let the default link behavior handle the navigation
    }

    e.preventDefault();

    // Update active section
    if (href === "#") {
      setActiveSection("");
    } else {
      setActiveSection(href.replace("#", ""));
    }

    // Check if we're navigating from a policy page
    const handledPolicyNavigation = navigateFromPolicyPage(href);

    // If not handled as a policy navigation, do regular scrolling
    if (!handledPolicyNavigation) {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const sectionId = href.replace("#", "");
        scrollToSection(sectionId);
      }
    }

    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 overflow-x-hidden",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-primary flex-shrink-0"
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text hover:opacity-80 transition"
          >
            VIRELIO
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <ul className="flex space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2 }}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-primary relative tracking-tight whitespace-nowrap",
                    (activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")) 
                      ? "text-primary font-semibold" 
                      : ""
                  )}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                  {(activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")) && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="flex items-center space-x-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <Icon icon={X} className="h-5 w-5" />
            ) : (
              <Icon icon={Menu} className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-background/98 backdrop-blur-xl border-b shadow-xl"
        >
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
            <div className="container mx-auto py-6 px-4 sm:px-6">
              {/* Navigation Links */}
              <nav className="mb-8">
                <ul className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          "flex items-center px-6 py-4 text-base font-medium transition-all hover:bg-primary/10 hover:text-primary rounded-2xl relative tracking-tight min-h-[56px] border border-transparent hover:border-primary/20 group",
                          (activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")) 
                            ? "text-primary font-semibold bg-primary/10 border-primary/30" 
                            : "text-foreground hover:shadow-sm"
                        )}
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        {(activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")) && (
                          <motion.div 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                            layoutId="activeMobileNavIndicator"
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                        )}
                        <span className="truncate text-lg pl-2">{link.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Contact Buttons Section */}
              <motion.div 
                className="border-t border-border/50 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                  {t.contact?.contactInfo || "Contact Us"}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* Phone Button */}
                  <motion.a
                    href={`tel:${t.contact?.phoneNumber?.replace(/\s+/g, '') || '+31640446732'}`}
                    className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
                      <Icon icon={Phone} className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-700 dark:text-green-300">
                        {t.contact?.phone || "Call Us"}
                      </p>
                      <p className="text-sm text-green-600/80 dark:text-green-400/80">
                        {t.contact?.phoneNumber || "+31 6 4044 6732"}
                      </p>
                    </div>
                  </motion.a>

                  {/* Email Button */}
                  <motion.a
                    href={`mailto:${t.contact?.emailAddress || 'contact@virelio.com'}`}
                    className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                      <Icon icon={Mail} className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-700 dark:text-blue-300">
                        {t.contact?.email || "Email Us"}
                      </p>
                      <p className="text-sm text-blue-600/80 dark:text-blue-400/80 truncate">
                        {t.contact?.emailAddress || "contact@virelio.com"}
                      </p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
