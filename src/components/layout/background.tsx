"use client";

import React from "react";

// Enhanced background with more visual richness
export default React.memo(function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Solid background */}
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a]" />

      {/* Subtle gradient overlays - more visible on mobile */}
      <div
        className="absolute top-1/4 -left-20 w-[60vw] h-[60vh] rounded-full opacity-[0.08] sm:opacity-[0.05] dark:opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute bottom-1/4 -right-20 w-[65vw] h-[65vh] rounded-full opacity-[0.08] sm:opacity-[0.05] dark:opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Additional gradient for middle section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full opacity-[0.06] sm:opacity-[0.03] dark:opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(134,239,172,0.1) 0%, rgba(134,239,172,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
        }}
      />
    </div>
  );
});