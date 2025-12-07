"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  SiSlack,
  SiNotion,
  SiGoogledrive,
  SiTrello,
  SiAsana,
  SiGooglesheets,
} from "react-icons/si";
import { Zap, Workflow, Bot, Database, Mail, Calendar } from "lucide-react";

// Tool icon configuration with colors and positions
const tools = [
  { Icon: SiSlack, color: "from-purple-500 to-purple-600", name: "Slack", angle: 0 },
  { Icon: SiNotion, color: "from-gray-800 to-gray-900", name: "Notion", angle: 45 },
  { Icon: SiGoogledrive, color: "from-blue-500 to-blue-600", name: "Drive", angle: 90 },
  { Icon: Zap, color: "from-orange-500 to-orange-600", name: "Zapier", angle: 135 },
  { Icon: SiTrello, color: "from-blue-400 to-blue-500", name: "Trello", angle: 180 },
  { Icon: SiAsana, color: "from-pink-500 to-rose-600", name: "Asana", angle: 225 },
  { Icon: Bot, color: "from-emerald-500 to-green-600", name: "AI", angle: 270 },
  { Icon: SiGooglesheets, color: "from-green-600 to-green-700", name: "Sheets", angle: 315 },
];

// Desktop-only additional tools for richer visual
const desktopTools = [
  { Icon: Database, color: "from-indigo-500 to-indigo-600", name: "Database", angle: 22.5, distance: 1.3 },
  { Icon: Mail, color: "from-red-500 to-red-600", name: "Email", angle: 67.5, distance: 1.3 },
  { Icon: Workflow, color: "from-violet-500 to-violet-600", name: "Make", angle: 112.5, distance: 1.3 },
  { Icon: Calendar, color: "from-cyan-500 to-cyan-600", name: "Calendar", angle: 292.5, distance: 1.3 },
];

const AutomationsShowcase = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Calculate position on orbital ring
  const getOrbitPosition = (angle: number, distance: number = 1) => {
    const radius = 180 * distance; // Base radius in pixels
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t.automationsShowcase?.title || "Turn Manual Tasks into Automations"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.automationsShowcase?.subtitle || "Connect your tools and automate your workflow"}
          </p>
        </motion.div>

        {/* 3D Pipeline Animation Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Main animation stage with 3D perspective */}
          <div
            className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center center",
            }}
          >
            {/* 3D scene container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 20 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Central automation target */}
              <div className="relative">
                {/* Outer rings with depth */}
                {[0, 1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    animate={shouldReduceMotion ? {} : {
                      scale: [1, 1.05, 1],
                      opacity: [0.6 - ring * 0.1, 0.8 - ring * 0.1, 0.6 - ring * 0.1],
                    }}
                    transition={{
                      duration: 3 + ring * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ring * 0.2,
                    }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    style={{
                      width: `${120 + ring * 40}px`,
                      height: `${120 + ring * 40}px`,
                      top: `50%`,
                      left: `50%`,
                      transform: `translate(-50%, -50%) translateZ(${-ring * 5}px)`,
                      boxShadow: `0 ${4 + ring * 2}px ${20 + ring * 10}px rgba(var(--primary-rgb, 59, 130, 246), ${0.15 - ring * 0.03})`,
                    }}
                  />
                ))}

                {/* Core bullseye */}
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center"
                  style={{
                    boxShadow: `
                      0 0 0 8px hsl(var(--primary) / 0.2),
                      0 0 0 16px hsl(var(--primary) / 0.1),
                      0 8px 32px rgba(var(--primary-rgb, 59, 130, 246), 0.4),
                      inset 0 2px 8px rgba(255, 255, 255, 0.2)
                    `,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                  }}
                >
                  {/* Inner concentric circles */}
                  <div className="absolute inset-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                    <div className="absolute inset-3 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-white drop-shadow-lg" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Orbiting tool icons */}
                <div className="absolute inset-0">
                  {tools.map((tool, index) => {
                    const pos = getOrbitPosition(tool.angle);
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={shouldReduceMotion ? {} : {
                          rotate: [0, 360],
                          y: [0, -8, 0],
                        }}
                        transition={{
                          default: {
                            duration: 0.5,
                            delay: 0.5 + index * 0.08,
                            type: "spring",
                            stiffness: 200,
                          },
                          rotate: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          y: {
                            duration: 2 + (index % 3) * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15,
                          },
                        }}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: "translate(-50%, -50%) translateZ(30px)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Icon container with glassmorphism */}
                        <div
                          className={`
                            relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                            rounded-2xl bg-gradient-to-br ${tool.color}
                            flex items-center justify-center
                            shadow-xl hover:scale-110 transition-transform duration-300
                            cursor-pointer group
                          `}
                          style={{
                            boxShadow: `
                              0 4px 16px rgba(0, 0, 0, 0.1),
                              0 8px 32px rgba(0, 0, 0, 0.08),
                              inset 0 1px 0 rgba(255, 255, 255, 0.3)
                            `,
                          }}
                        >
                          <tool.Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-md" />

                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <div className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
                              {tool.name}
                            </div>
                          </div>

                          {/* Subtle glow on hover */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-white/20" />
                        </div>

                        {/* Pipeline connector line to center */}
                        <svg
                          className="absolute top-1/2 left-1/2 pointer-events-none"
                          style={{
                            width: `${Math.abs(pos.x) + 100}px`,
                            height: `${Math.abs(pos.y) + 100}px`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <motion.line
                            x1="50%"
                            y1="50%"
                            x2={pos.x > 0 ? "0%" : "100%"}
                            y2={pos.y > 0 ? "0%" : "100%"}
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            opacity="0.2"
                            animate={shouldReduceMotion ? {} : {
                              strokeDashoffset: [0, -8],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </svg>
                      </motion.div>
                    );
                  })}

                  {/* Desktop-only outer ring icons */}
                  <div className="hidden xl:block">
                    {desktopTools.map((tool, index) => {
                      const pos = getOrbitPosition(tool.angle, tool.distance);
                      return (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          animate={shouldReduceMotion ? {} : {
                            y: [0, -6, 0],
                          }}
                          transition={{
                            default: {
                              duration: 0.5,
                              delay: 0.9 + index * 0.08,
                              type: "spring",
                            },
                            y: {
                              duration: 2.5 + (index % 2) * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }
                          }}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${pos.x}px)`,
                            top: `calc(50% + ${pos.y}px)`,
                            transform: "translate(-50%, -50%) translateZ(20px)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <div
                            className={`
                              w-12 h-12 md:w-14 md:h-14 rounded-xl 
                              bg-gradient-to-br ${tool.color}
                              flex items-center justify-center shadow-lg
                              hover:scale-110 transition-transform duration-300
                            `}
                            style={{
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <tool.Icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-md" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats badge - keeping the 200+ number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                200+
              </span>
            </div>
            <div className="w-px h-6 bg-primary/20" />
            <span className="text-sm font-medium text-muted-foreground">
              Automations Built & Delivered
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationsShowcase;