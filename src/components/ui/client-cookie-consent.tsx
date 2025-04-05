"use client";

import { CookieConsent } from "./cookie-consent";
import { useCookieConsent, CookiePreferences } from "@/lib/hooks/use-cookie-consent";

export function ClientCookieConsent() {
  const { updatePreferences } = useCookieConsent();
  
  const handleAccept = (preferences: CookiePreferences) => {
    updatePreferences(preferences);
    
    // Here you can initialize analytics or other scripts based on preferences
    if (preferences.analytics) {
      // Initialize analytics
      console.log("Analytics cookies accepted");
    }
    
    if (preferences.marketing) {
      // Initialize marketing tools
      console.log("Marketing cookies accepted");
    }
  };
  
  const handleDecline = () => {
    // Handle decline - typically only necessary cookies will be enabled
    console.log("All optional cookies declined");
  };
  
  return (
    <CookieConsent 
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}