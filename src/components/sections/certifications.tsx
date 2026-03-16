"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface Certification {
  issuer: string;
  title: string;
  date: string;
  skills: string[];
  color: string;
  logo: React.ReactNode;
}

// SVG logos for each issuer
const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm1.04 5.814l-2.36 6.085h4.718l-2.359-6.085z" />
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#F25022" d="M1 1h10v10H1z" />
    <path fill="#7FBA00" d="M13 1h10v10H13z" />
    <path fill="#00A4EF" d="M1 13h10v10H1z" />
    <path fill="#FFB900" d="M13 13h10v10H13z" />
  </svg>
);

const OracleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#C74634">
    <path d="M8.754 18.295c-3.477 0-6.3-2.822-6.3-6.295s2.823-6.295 6.3-6.295h6.492c3.477 0 6.3 2.822 6.3 6.295s-2.823 6.295-6.3 6.295H8.754zm6.282-2.114c2.305 0 4.174-1.871 4.174-4.181s-1.869-4.181-4.174-4.181H8.964c-2.305 0-4.174 1.871-4.174 4.181s1.869 4.181 4.174 4.181h6.072z" />
  </svg>
);

// Randomized order
const certifications: Certification[] = [
  {
    issuer: "Google",
    title: "Machine Learning Operations (MLOps) for Generative AI",
    date: "Feb 2025",
    skills: ["Artificial Intelligence", "Machine Learning", "MLOps"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Anthropic",
    title: "Certificate of Completion: Agent Skills",
    date: "Mar 2026",
    skills: ["Autonomous Agents", "Multi-Step Reasoning", "Tool Use"],
    color: "bg-neutral-900",
    logo: <div className="text-white"><AnthropicLogo /></div>,
  },
  {
    issuer: "Microsoft",
    title: "Azure AI Fundamentals (AI-900)",
    date: "Sep 2024",
    skills: ["Azure AI Services", "Machine Learning", "NLP"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Google",
    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    date: "Oct 2025",
    skills: ["Artificial Intelligence", "Gemini API", "RAG"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Anthropic",
    title: "Model Context Protocol: Advanced Topics",
    date: "Mar 2026",
    skills: ["MCP Servers", "Tool Integration", "Agentic Workflows"],
    color: "bg-neutral-900",
    logo: <div className="text-white"><AnthropicLogo /></div>,
  },
  {
    issuer: "Oracle",
    title: "OCI Generative AI Professional",
    date: "Nov 2024",
    skills: ["Oracle Cloud", "Generative AI", "LLM Deployment"],
    color: "bg-white dark:bg-neutral-800",
    logo: <OracleLogo />,
  },
  {
    issuer: "Google",
    title: "Prompt Design in Vertex AI",
    date: "Oct 2025",
    skills: ["Artificial Intelligence", "Gemini API", "Prompt Engineering"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Anthropic",
    title: "Claude Code in Action",
    date: "Mar 2026",
    skills: ["AI-Powered Development", "CLI Automation", "Pair Programming"],
    color: "bg-neutral-900",
    logo: <div className="text-white"><AnthropicLogo /></div>,
  },
  {
    issuer: "Microsoft",
    title: "Azure Data Fundamentals (DP-900)",
    date: "Jun 2024",
    skills: ["Azure Data", "SQL", "Data Analytics"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Google",
    title: "Advanced: Generative AI for Developers",
    date: "Jan 2025",
    skills: ["Artificial Intelligence", "Google Gemini", "LLM Development"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Microsoft",
    title: "Azure AI Engineer Associate (AI-102)",
    date: "Mar 2025",
    skills: ["Azure Cognitive Services", "NLP", "Computer Vision"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Google",
    title: "Building AI Agents with Vertex AI and LangChain",
    date: "Dec 2025",
    skills: ["AI Agents", "LangChain", "Vertex AI"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Microsoft",
    title: "Develop AI Agents using Azure OpenAI and Semantic Kernel",
    date: "Jan 2026",
    skills: ["AI Agents", "Azure OpenAI", "Semantic Kernel"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Google",
    title: "Multi-Agent Systems with Vertex AI",
    date: "Nov 2025",
    skills: ["Multi-Agent Systems", "Orchestration", "Vertex AI"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Google",
    title: "Responsible AI: Applying AI Principles",
    date: "Sep 2025",
    skills: ["Responsible AI", "Ethics", "Governance"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
  {
    issuer: "Microsoft",
    title: "Azure Solutions Architect Expert (AZ-305)",
    date: "Aug 2024",
    skills: ["Cloud Architecture", "Azure", "Infrastructure"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Microsoft",
    title: "Build Copilot AI Agents with Azure AI Studio",
    date: "Feb 2026",
    skills: ["Copilot Studio", "Azure AI", "Agent Orchestration"],
    color: "bg-white dark:bg-neutral-800",
    logo: <MicrosoftLogo />,
  },
  {
    issuer: "Google",
    title: "Automating Workflows with Google Cloud Functions",
    date: "Jul 2025",
    skills: ["Cloud Functions", "Automation", "Serverless"],
    color: "bg-white dark:bg-neutral-800",
    logo: <GoogleLogo />,
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="w-[260px] sm:w-[280px] flex-shrink-0">
      <div className="h-full p-5 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl ${cert.color} border border-border/30 flex items-center justify-center`}>
            {cert.logo}
          </div>
          <span className="text-[11px] text-muted-foreground">{cert.date}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-1">{cert.issuer}</p>
        <h4 className="text-[13px] font-semibold text-foreground leading-snug mb-3 min-h-[36px] line-clamp-2">
          {cert.title}
        </h4>
        <div className="flex flex-wrap gap-1">
          {cert.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-muted/50 text-[9px] text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const shuffledCerts = useMemo(() => shuffleArray(certifications), []);

  return (
    <section className="py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              {isNL ? "Certificeringen" : "Certifications"}
            </span>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {isNL
              ? "Gecertificeerd door de beste"
              : "Certified by the best"}
          </motion.h3>
        </div>

        {/* Infinite marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="flex gap-4 items-stretch animate-cert-scroll">
              {[...Array(3)].flatMap((_, setIdx) =>
                shuffledCerts.map((cert, i) => (
                  <CertCard key={`${setIdx}-${i}`} cert={cert} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Issuer logos */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mt-10">
          {[
            { name: "Anthropic", logo: <AnthropicLogo /> },
            { name: "Google", logo: <GoogleLogo /> },
            { name: "Microsoft", logo: <MicrosoftLogo /> },
            { name: "Oracle", logo: <OracleLogo /> },
          ].map((issuer) => (
            <div key={issuer.name} className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
              <div className="w-5 h-5">{issuer.logo}</div>
              <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
                {issuer.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes cert-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-cert-scroll {
          animation: cert-scroll 80s linear infinite;
          will-change: transform;
        }
        .animate-cert-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
