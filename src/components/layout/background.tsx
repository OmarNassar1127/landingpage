"use client";

import React from "react";

export default React.memo(function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      {/* Top-right gradient orb */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[55vw] h-[45vh] rounded-full opacity-[0.035] dark:opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Bottom-left gradient orb */}
      <div
        className="absolute bottom-[-5%] left-[-10%] w-[45vw] h-[35vh] rounded-full opacity-[0.025] dark:opacity-[0.015]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Fine noise for depth */}
      <div
        className="absolute inset-0 opacity-[0.012] dark:opacity-[0.006] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
});
