"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
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
    
    if (onDecline) {
      onDecline();
    }
    
    setOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
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

  // Function to reopen the cookie banner
  const reopenConsentBanner = () => {
    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-screen-lg rounded-lg border bg-card p-4 shadow-lg md:p-6",
              className
            )}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">Cookie Settings</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col space-y-3 overflow-hidden rounded-md border bg-background p-4"
                >
                  <div className="flex flex-col space-y-4">
                    <CookiePreferenceItem
                      type="necessary"
                      title="Necessary Cookies"
                      description="These cookies are essential for the website to function properly."
                      isChecked={preferences.necessary}
                      onChange={() => {}} // No change allowed
                      disabled={true}
                    />
                    
                    <CookiePreferenceItem
                      type="analytics"
                      title="Analytics Cookies"
                      description="These cookies help us understand how visitors interact with our website."
                      isChecked={preferences.analytics}
                      onChange={() => handleToggle("analytics")}
                    />
                    
                    <CookiePreferenceItem
                      type="marketing"
                      title="Marketing Cookies"
                      description="These cookies are used to track visitors across websites to display relevant advertisements."
                      isChecked={preferences.marketing}
                      onChange={() => handleToggle("marketing")}
                    />
                    
                    <CookiePreferenceItem
                      type="preferences"
                      title="Preference Cookies"
                      description="These cookies allow the website to remember choices you make and provide enhanced functionality."
                      isChecked={preferences.preferences}
                      onChange={() => handleToggle("preferences")}
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    className="flex-1"
                  >
                    Decline All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleSettings}
                    className="flex-1"
                  >
                    {showSettings ? "Hide Settings" : "Customize"}
                  </Button>
                </div>
                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                  {showSettings && (
                    <Button
                      onClick={handleSavePreferences}
                      className="flex-1"
                    >
                      Save Preferences
                    </Button>
                  )}
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie settings button that can be placed anywhere
      <Button
        variant="outline"
        size="sm"
        onClick={reopenConsentBanner}
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-md"
        aria-label="Cookie Settings"
      >
        <span className="sr-only">Cookie Settings</span>
        <span className="flex items-center">
          <CookieIcon className="mr-2 h-4 w-4" />
          Cookie Settings
        </span>
      </Button> */}
    </>
  );
};

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
          className="h-4 w-4 rounded border-gray-300 text-primary accent-primary focus:ring-primary"
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={`cookie-${type}`}
          className="font-medium text-foreground"
        >
          {title}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// Simple cookie icon component
const CookieIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="12" cy="16" r="1" />
      <circle cx="16" cy="9" r="1" />
    </svg>
  );
};

export { CookieConsent };