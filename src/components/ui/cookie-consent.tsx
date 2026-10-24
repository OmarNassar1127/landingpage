"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type CookieType = "necessary" | "analytics" | "marketing" | "preferences";

interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void;
  onDecline?: () => void;
  className?: string;
}

const CookieConsent = ({
  onAccept,
  onDecline,
  className,
}: CookieConsentProps) => {
  const pathname = usePathname() || "";
  const isEnglish = pathname.startsWith("/en") || pathname.startsWith("/voiceassistant");
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const storedPreferences = localStorage.getItem("cookiePreferences");
    
    if (!storedPreferences) {
      // Show the banner immediately when no preferences are stored
      setOpen(true);
    } else {
      try {
        setPreferences(JSON.parse(storedPreferences));
      } catch (e) {
        // If stored preferences are invalid, show the banner
        setOpen(true);
      }
    }
    const reopen = () => { setShowSettings(true); setOpen(true); };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    window.dispatchEvent(new Event("cookie-consent-change"));
    
    if (onAccept) {
      onAccept(allAccepted);
    }
    
    setOpen(false);
  };

  const handleDecline = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    setPreferences(minimalPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(minimalPreferences));
    window.dispatchEvent(new Event("cookie-consent-change"));
    
    if (onDecline) {
      onDecline();
    }
    
    setOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    window.dispatchEvent(new Event("cookie-consent-change"));
    
    if (onAccept) {
      onAccept(preferences);
    }
    
    setOpen(false);
  };

  const handleToggle = (type: CookieType) => {
    if (type === "necessary") return; // Cannot toggle necessary cookies
    
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const t = isEnglish ? TEXT.en : TEXT.nl;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="region"
            aria-label={t.title}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[60] border-t border-black/[0.08] bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.25)] backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:mx-auto sm:max-w-screen-md sm:rounded-2xl sm:border sm:px-5 sm:pb-4 sm:pt-4",
              className
            )}
          >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[13px] leading-snug text-zinc-600 sm:flex-1 sm:text-sm">
                {t.line}{" "}
                <button
                  type="button"
                  onClick={toggleSettings}
                  className="font-medium text-zinc-900 underline underline-offset-2"
                >
                  {showSettings ? t.hide : t.settings}
                </button>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDecline} className="h-9 flex-1 sm:flex-none sm:px-5">
                  {t.decline}
                </Button>
                {showSettings ? (
                  <Button size="sm" onClick={handleSavePreferences} className="h-9 flex-1 sm:flex-none sm:px-5">
                    {t.save}
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleAcceptAll} className="h-9 flex-1 sm:flex-none sm:px-5">
                    {t.accept}
                  </Button>
                )}
              </div>
            </div>

            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-3 flex max-h-[45vh] flex-col gap-3 overflow-y-auto rounded-xl border border-black/[0.07] bg-zinc-50 p-3"
              >
                {(["necessary", "analytics", "marketing", "preferences"] as CookieType[]).map((type) => (
                  <CookiePreferenceItem
                    key={type}
                    type={type}
                    title={t.items[type][0]}
                    description={t.items[type][1]}
                    isChecked={preferences[type]}
                    onChange={() => handleToggle(type)}
                    disabled={type === "necessary"}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TEXT = {
  nl: {
    title: "Cookies",
    line: "We gebruiken cookies om de site te verbeteren.",
    settings: "Instellingen",
    hide: "Verbergen",
    accept: "Accepteren",
    decline: "Weigeren",
    save: "Opslaan",
    items: {
      necessary: ["Noodzakelijk", "Nodig om de site te laten werken."],
      analytics: ["Statistieken", "Laat ons zien hoe bezoekers de site gebruiken."],
      marketing: ["Marketing", "Voor relevante advertenties op andere sites."],
      preferences: ["Voorkeuren", "Onthoudt je keuzes, zoals je taal."],
    },
  },
  en: {
    title: "Cookies",
    line: "We use cookies to improve the site.",
    settings: "Settings",
    hide: "Hide",
    accept: "Accept",
    decline: "Decline",
    save: "Save",
    items: {
      necessary: ["Necessary", "Needed for the site to work."],
      analytics: ["Analytics", "Shows us how visitors use the site."],
      marketing: ["Marketing", "For relevant ads on other sites."],
      preferences: ["Preferences", "Remembers your choices, such as language."],
    },
  },
} as const;

interface CookiePreferenceItemProps {
  type: CookieType;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const CookiePreferenceItem = ({
  type,
  title,
  description,
  isChecked,
  onChange,
  disabled = false,
}: CookiePreferenceItemProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex h-6 items-center">
        <input
          id={`cookie-${type}`}
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary accent-primary focus:ring-primary"
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={`cookie-${type}`}
          className="text-sm font-medium text-foreground"
        >
          {title}
        </label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export { CookieConsent };