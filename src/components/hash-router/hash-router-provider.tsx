'use client';

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PrivacyPolicyPage from '@/app/privacy-policy/page';
import TermsOfServicePage from '@/app/terms-of-service/page';
import CookiePolicyPage from '@/app/cookie-policy/page';

export default function HashRouterProvider() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Routes>
    </HashRouter>
  );
}