"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Using React.memo to prevent unnecessary re-renders
export default React.memo(function BackgroundEffect() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none will-change-transform">
      {/* Main S shape gradient - OPTIMIZED */}
      <div
        className="absolute w-[120%] top-0 bottom-0 opacity-30 dark:opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 58%, rgba(139,92,246,0.08) 80%, rgba(139,92,246,0.12) 100%)",
          filter: "blur(40px)",
          transform: "translateX(-10%)",
          willChange: "opacity, filter"
        }}
      />

      {/* S-curve path with blur and glow - OPTIMIZED */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Static vertical line with limited height for better readability */}
        <div
          className="absolute h-[70vh] w-[2px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"
          style={{
            filter: "blur(3px)",
            willChange: "transform",
            top: "10vh", /* Position from top instead of stretching full height */
          }}
        />
        
        {/* S-curve main element - SIMPLIFIED FOR PERFORMANCE */}
        {mounted && (
          <svg 
            width="100%" 
            height="120%" 
            viewBox="0 0 100 120" 
            preserveAspectRatio="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
          >
            {/* Main S curve path - simplified */}
            <path
              d="M 50,5 
                 C 75,5 85,25 85,40 
                 C 85,60 15,60 15,80 
                 C 15,100 40,115 65,115"
              stroke="url(#gradientLine)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
            />
            
            <defs>
              <linearGradient id="gradientLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(139,92,246,0)" />
                <stop offset="20%" stopColor="rgba(139,92,246,0.6)" />
                <stop offset="50%" stopColor="rgba(139,92,246,1)" />
                <stop offset="80%" stopColor="rgba(139,92,246,0.6)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
              </linearGradient>
            </defs>
          </svg>
        )}
        
        {/* Simplified bright point with optimized animations */}
        {mounted && (
          <>
            <motion.div
              className="absolute w-5 h-5 rounded-full bg-primary/90 will-change-transform"
              style={{
                filter: "blur(10px)",
                boxShadow: "0 0 20px 10px rgba(139,92,246,0.5)",
                willChange: "transform",
              }}
              animate={{
                y: ["-30vh", "30vh"],
              }}
              transition={{
                y: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                useCompositeLayer: true
              }}
            />
            
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-blue-400/90 will-change-transform"
              style={{
                filter: "blur(8px)",
                boxShadow: "0 0 18px 8px rgba(96,165,250,0.5)",
                willChange: "transform",
              }}
              animate={{
                y: ["25vh", "-25vh"],
              }}
              transition={{
                y: { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                delay: 2,
                useCompositeLayer: true
              }}
            />
          </>
        )}
      </div>
      
      {/* Simplified ambient glow effects - optimized for performance */}
      <div
        className="absolute top-1/4 -left-20 w-[45vw] h-[45vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0) 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      
      <div
        className="absolute bottom-1/4 -right-20 w-[50vw] h-[50vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.10) 0%, rgba(96,165,250,0) 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      
      {/* Main S-shaped static gradient with limited height for better performance and readability */}
      <div 
        className="absolute left-1/2 w-1 h-[80vh] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        style={{
          transform: "translateX(-50%)",
          top: "5vh", /* Position from top instead of stretching full height */
        }}
      />
      
      {/* Subtle vertical light column with limited height */}
      <div 
        className="absolute left-1/2 w-[20vw] h-[85vh] opacity-[0.04]"
        style={{
          background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          transform: "translateX(-50%)",
          filter: "blur(20px)",
          top: "0",
        }}
      />
      
      {/* S-shaped masked plasma effect - OPTIMIZED FOR PERFORMANCE */}
      {/* Removed complex SVG filters for better performance */}

      {/* Simplified noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
        }}
      />
    </div>
  );
});