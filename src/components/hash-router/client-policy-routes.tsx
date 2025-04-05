"use client";

import React, { useEffect, useState } from "react";
import PrivacyPolicy from "@/components/policies/privacy-policy";
import TermsOfService from "@/components/policies/terms-of-service";
import CookiePolicy from "@/components/policies/cookie-policy";

export default function ClientPolicyRoutes() {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setMounted(true);

    // Function to extract the route from the hash
    const updatePath = () => {
      // Remove the leading #/ to get the path
      const hash = window.location.hash;
      if (hash.startsWith("#/")) {
        setCurrentPath(hash.substring(2));
      } else {
        setCurrentPath("");
      }
    };

    // Set initial path
    updatePath();

    // Listen for hash changes
    window.addEventListener("hashchange", updatePath);

    // Clean up
    return () => window.removeEventListener("hashchange", updatePath);
  }, []);

  // Don't render anything on the server
  if (!mounted) return null;

  // Render the appropriate policy component based on the path
  const renderPolicy = () => {
    switch (currentPath) {
      case "privacy-policy":
        return <PrivacyPolicy />;
      case "terms-of-service":
        return <TermsOfService />;
      case "cookie-policy":
        return <CookiePolicy />;
      default:
        return null;
    }
  };

  // Only render if there's a policy path
  if (
    !currentPath ||
    !["privacy-policy", "terms-of-service", "cookie-policy"].includes(
      currentPath
    )
  ) {
    return null;
  }

  return (
    <div
      className="policy-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        background: "white",
        overflow: "auto",
      }}
    >
      {renderPolicy()}
      
      {/* Back button */}
      <button 
        onClick={() => {
          // Clear the hash and return to main page
          window.location.hash = '';
          // Scroll to top for better UX
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
        }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: '#000',
          color: '#fff',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
