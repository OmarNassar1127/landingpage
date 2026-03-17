"use client";

import React, { useState, useEffect } from "react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  customNavLinks?: NavLink[];
}

export default function Navbar({ customNavLinks }: NavbarProps = {}) {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const defaultNavLinks = [
    { name: t.nav.services, href: "#services" },
    { name: language === 'nl' ? 'Klantresultaten' : 'Case studies', href: "#case-studies" },
    { name: language === 'nl' ? 'Aanbevelingen' : 'Testimonials', href: "#testimonials" },
  ];

  const navLinks = customNavLinks || defaultNavLinks;

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const isHomePage = window.location.pathname === '/' || window.location.pathname.startsWith('/en');
      if (!isHomePage) { setActiveSection(""); return; }

      const scrollPosition = window.scrollY + 100;
      if (scrollPosition < 200) { setActiveSection(""); return; }

      const sections = navLinks
        .filter(link => link.href !== "#")
        .map(link => ({
          id: link.href.replace("#", ""),
          position: document.getElementById(link.href.replace("#", ""))?.offsetTop || 0
        }));

      sections.sort((a, b) => a.position - b.position);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('/') && !href.startsWith('#')) {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();

    if (href === "#") {
      setActiveSection("");
    } else {
      setActiveSection(href.replace("#", ""));
    }

    const handledPolicyNavigation = navigateFromPolicyPage(href);

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
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled || mobileMenuOpen
            ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-background/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center flex-shrink-0"
          >
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center hover:opacity-80 transition"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Virelio<span className="text-primary">.</span>
              </span>
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
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                onClick={() => scrollToSection('contact')}
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-5 py-2 rounded-lg shadow-sm"
              >
                {language === 'nl' ? 'Plan intake' : 'Book intake'}
              </Button>
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center md:hidden gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background" />

            {/* Content */}
            <div className="relative h-full flex flex-col pt-20 pb-24 px-6">
              {/* Nav links — large, centered feel */}
              <nav className="flex-1 flex flex-col justify-center -mt-16">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.06, duration: 0.25 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            "block py-4 text-3xl font-bold tracking-tight transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-foreground/70 active:text-foreground"
                          )}
                        >
                          {link.name}
                          {isActive && (
                            <motion.div
                              layoutId="activeMobileNav"
                              className="h-[3px] w-12 bg-primary rounded-full mt-1"
                            />
                          )}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="space-y-4"
              >
                {/* Main CTA */}
                <button
                  onClick={() => {
                    scrollToSection("ready-to-start");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-4 rounded-2xl text-base active:scale-[0.98] transition-transform"
                >
                  {language === "nl" ? "Plan gratis intake" : "Book free intake"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Contact row */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${t.contact?.phoneNumber?.replace(/\s+/g, '') || '+31687838713'}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border/50 text-sm font-medium text-foreground/70 active:bg-muted/50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {language === "nl" ? "Bel ons" : "Call us"}
                  </a>
                  <a
                    href={`mailto:${t.contact?.emailAddress || 'info@virelio.nl'}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border/50 text-sm font-medium text-foreground/70 active:bg-muted/50 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>

                {/* Subtle branding */}
                <p className="text-center text-xs text-muted-foreground/40 pt-2">
                  Virelio — Amsterdam, NL
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
