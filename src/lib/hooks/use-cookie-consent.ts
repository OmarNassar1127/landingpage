"use client";

import { useState, useEffect } from "react";

export interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const storedPreferences = localStorage.getItem("cookiePreferences");
    
    if (storedPreferences) {
      try {
        setPreferences(JSON.parse(storedPreferences));
      } catch (e) {
        // Invalid stored preferences, reset to defaults
        localStorage.removeItem("cookiePreferences");
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Function to check if a specific cookie type is allowed
  const isAllowed = (type: keyof CookiePreferences): boolean => {
    if (!isLoaded) return false; // Don't allow anything until preferences are loaded
    
    // Necessary cookies are always allowed
    if (type === "necessary") return true;
    
    return preferences[type];
  };

  // Function to update cookie preferences
  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
  };

  // Function to clear all preferences
  const clearPreferences = () => {
    localStorage.removeItem("cookiePreferences");
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: false,
    });
  };

  // Function to check if user has made a choice
  const hasConsented = (): boolean => {
    return localStorage.getItem("cookiePreferences") !== null;
  };

  return {
    preferences,
    isLoaded,
    isAllowed,
    updatePreferences,
    clearPreferences,
    hasConsented,
  };
}