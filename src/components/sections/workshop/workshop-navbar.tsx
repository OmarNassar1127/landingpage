"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll-utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/i18n/language-context";

export default function WorkshopNavbar() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Workshop-specific navigation links - short and punchy
  const workshopNavLinks = [
    { name: language === "en" ? "Benefits" : "Voordelen", href: "#workshop-benefits" },
    { name: language === "en" ? "Program" : "Programma", href: "#workshop-curriculum" }, 
    { name: language === "en" ? "Audience" : "Doelgroep", href: "#workshop-audience" },
    { name: language === "en" ? "Formats" : "Formaten", href: "#workshop-formats" },
    { name: language === "en" ? "Reviews" : "Reviews", href: "#workshop-testimonials" },
    { name: language === "en" ? "Book" : "Boeken", href: "#workshop-cta" },
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
      const sections = workshopNavLinks
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
  }, [workshopNavLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Update active section
    if (href === "#") {
      setActiveSection("");
    } else {
      setActiveSection(href.replace("#", ""));
    }

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const sectionId = href.replace("#", "");
      scrollToSection(sectionId);
    }

    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {/* Back to main site */}
          <Link
            href={language === "en" ? "/en" : "/"}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon icon={ArrowLeft} className="h-4 w-4" />
            <span className="hidden sm:inline">Back to main site</span>
          </Link>
          
          {/* Workshop title */}
          <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            VIRELIO - AI Workshop
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {workshopNavLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2 }}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-primary relative tracking-tight",
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
                      layoutId="activeWorkshopNavIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <Icon icon={X} className="h-6 w-6" />
            ) : (
              <Icon icon={Menu} className="h-6 w-6" />
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
          className="md:hidden bg-background border-b"
        >
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href={language === "en" ? "/en" : "/"}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all hover:bg-accent rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon icon={ArrowLeft} className="h-4 w-4" />
                  <span>Back to main site</span>
                </Link>
              </li>
              {workshopNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium transition-all hover:bg-accent rounded-lg relative tracking-tight",
                      (activeSection === link.href.replace("#", "") || (link.href === "#" && activeSection === "")) 
                        ? "text-primary font-semibold bg-accent" 
                        : ""
                    )}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
}