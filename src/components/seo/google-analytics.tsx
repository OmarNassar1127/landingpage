"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-H1BKGBT5FM";

function analyticsAllowed() {
  try {
    return JSON.parse(localStorage.getItem("cookiePreferences") || "{}").analytics === true;
  } catch {
    return false;
  }
}

/**
 * Google Analytics loads only after the visitor allows analytics cookies in
 * the consent banner (AVG / Telecommunicatiewet). Withdrawing consent turns
 * tracking off for the rest of the visit and stops it loading next time.
 */
export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ok = analyticsAllowed();
      setAllowed(ok);
      // GA's documented opt-out switch, for a withdrawal mid-visit
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !ok;
    };
    sync();
    window.addEventListener("cookie-consent-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cookie-consent-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
