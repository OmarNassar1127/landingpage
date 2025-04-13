'use client';

import React, { useEffect, useState } from 'react';
import PrivacyPolicy from '@/components/policies/privacy-policy';
import TermsOfService from '@/components/policies/terms-of-service';
import CookiePolicy from '@/components/policies/cookie-policy';

export default function PolicyRoutes() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Function to extract the route from the hash
    const updatePath = () => {
      // Remove the leading #/ to get the path
      const hash = window.location.hash.substring(2) || '';
      setCurrentPath(hash);
    };

    // Set initial path
    updatePath();

    // Listen for hash changes
    window.addEventListener('hashchange', updatePath);

    // Clean up
    return () => window.removeEventListener('hashchange', updatePath);
  }, []);

  // Render the appropriate policy component based on the path
  const renderPolicy = () => {
    switch (currentPath) {
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-of-service':
        return <TermsOfService />;
      case 'cookie-policy':
        return <CookiePolicy />;
      default:
        return null;
    }
  };

  // Only render if there's a policy path
  if (!currentPath || !['privacy-policy', 'terms-of-service', 'cookie-policy'].includes(currentPath)) {
    return null;
  }

  return (
    <div className="policy-container bg-background dark:bg-background min-h-screen">
      {renderPolicy()}
    </div>
  );
}