"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EndpointHeader from "@/components/ui/EndpointHeader";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  href: string;
  period: string;
  status: string;
  commitHash: string;
  accent: "amber" | "purple" | "green";
  summary: string;
  techStack: string[];
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Backend Engineer (.NET)",
    company: "Gakk Media Ltd.",
    href: "https://gakktechnology.com/",
    period: "May 2026 - Present",
    status: "CURRENT DEPLOYMENT",
    commitHash: "c8f12a9",
    accent: "amber",
    summary: "Building secure payment infrastructure and business-driven CMS systems.",
    techStack: ["ASP.NET Core", "Pathao Pay", "City Bank API", "PayWall", "SQL Server"],
    achievements: [
      "Integrated Pathao Pay, City Bank, and PayWall for secure and reliable payment processing.",
      "Built the complete CMS platform for products, vouchers, regions, partners, banners, and catalogue operations.",
      "Implemented region-wise product alignment and third-party order API integration.",
    ],
  },
  {
    id: "exp-2",
    role: "Software Engineer (.NET)",
    company: "Snowtex Group",
    href: "https://snowtex.com.bd/",
    period: "Oct 2025 - Apr 2026",
    status: "PRODUCTION RELEASE",
    commitHash: "9a03b4e",
    accent: "purple",
    summary: "Strengthening authentication flows and improving application stability.",
    techStack: [".NET Core", "Cloudflare Turnstile", "JWT Auth", "ADO.NET", "C#"],
    achievements: [
      "Added Cloudflare Turnstile CAPTCHA protection to reduce bot traffic and secure authentication.",
      "Implemented business logic and refresh token-based authentication for backend systems.",
      "Resolved major software defects, enhancing website stability and performance.",
    ],
  },
  {
    id: "exp-3",
    role: "Software Engineer Intern (.NET)",
    company: "Symphony Softtech Ltd.",
    href: "https://symphonysoftt.com/",
    period: "Jul 2025 - Sep 2025",
    status: "INITIAL COMMIT",
    commitHash: "41d7e82",
    accent: "green",
    summary: "Developing practical foundations in APIs, secure coding, and teamwork.",
    techStack: ["REST APIs", "RBAC", "MVC", "Documentation System"],
    achievements: [
      "Developed REST APIs and backend services using .NET Core.",
      "Developed a secure Documentation Management System with RBAC and version control.",
      "Gained practical experience in full-stack development, database design, secure coding, and teamwork.",
    ],
  },
];

const AccentStyles = {
  amber: {
    text: "text-amber",
    border: "border-amber/40",
    bg: "bg-amber/10",
    glow: "shadow-[0_0_20px_rgba(220,214,196,0.35)]",
    dot: "bg-amber",
  },
  purple: {
    text: "text-purple",
    border: "border-purple/40",
    bg: "bg-purple/10",
    glow: "shadow-[0_0_20px_rgba(174,192,172,0.35)]",
    dot: "bg-purple",
  },
  green: {
    text: "text-green",
    border: "border-green/40",
    bg: "bg-green/10",
    glow: "shadow-[0_0_20px_rgba(174,192,172,0.35)]",
    dot: "bg-green",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-line bg-void relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <EndpointHeader path="/api/experience" title="Career Log" />

        <div className="max-w-7xl mx-auto relative">
          {/* Continuous Trunk Line connecting top-to-bottom across all dots */}
          <div className="absolute left-4 top-0 bottom-0 z-0 w-[2px] bg-gradient-to-b from-amber via-purple to-green md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12 md:space-y-0"
          >
            {experiences.map((exp, index) => {
              const theme = AccentStyles[exp.accent];
              const isExpanded = expandedId === exp.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  variants={cardVariants}
                  className={`relative pl-10 sm:pl-20 md:pl-0 md:grid md:grid-cols-[1fr_64px_1fr] md:items-start group ${
                    index > 0 ? "md:-mt-24" : ""
                  }`}
                >
                  {/* Branch Line Connecting Dot to Card on Desktop */}
                  <div
                    aria-hidden="true"
                    className={`hidden md:block absolute top-7 h-px bg-line/80 z-0 pointer-events-none ${
                      isEven ? "left-1/2 right-0" : "left-0 right-1/2"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className={`hidden md:block absolute top-[22px] z-20 text-sm font-bold leading-none ${
                      isEven
                        ? "left-1/2 translate-x-1 text-amber"
                        : "left-1/2 -translate-x-[calc(100%+4px)] text-purple"
                    }`}
                  >
                    {isEven ? "›" : "‹"}
                  </span>

                  {/* Left Column Content (or Spacer) */}
                  <div className={isEven ? "hidden md:block" : "md:col-start-1 md:row-start-1"}>
                    {!isEven && (
                      <div className="md:pr-6">
                        <ExperienceCard
                          exp={exp}
                          theme={theme}
                          isExpanded={isExpanded}
                          toggleExpand={toggleExpand}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column Content (or Spacer) */}
                  <div className={isEven ? "md:col-start-3" : "hidden md:block"}>
                    {(isEven || true) && (
                      <div className={`md:pl-6 ${!isEven ? "md:hidden" : ""}`}>
                        <ExperienceCard
                          exp={exp}
                          theme={theme}
                          isExpanded={isExpanded}
                          toggleExpand={toggleExpand}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Extracted Card sub-component for cleanly handling mobile and alternating desktop slots */
const ExperienceCard: React.FC<{
  exp: ExperienceItem;
  theme: typeof AccentStyles.amber;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
}> = ({ exp, theme, isExpanded, toggleExpand }) => {
  return (
    <div
      className={`relative z-10 bg-panel border border-line rounded-2xl transition-all duration-300 hover:border-purple/60 hover:shadow-2xl overflow-hidden ${
        isExpanded ? "ring-1 ring-purple/30" : ""
      }`}
    >
      <div
        onClick={() => toggleExpand(exp.id)}
        className="p-5 sm:p-6 cursor-pointer select-none border-b border-line/40 hover:bg-raised/40 transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className={`${theme.text} font-bold`}>commit {exp.commitHash}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${theme.bg} ${theme.text} border ${theme.border}`}>
              {exp.status}
            </span>
          </div>
          <span className="font-mono text-xs text-muted/80 bg-raised border border-line px-2.5 py-1 rounded-md">
            {exp.period}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-cavolini text-xl sm:text-2xl font-bold text-main">{exp.role}</h3>
            <a
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 font-mono text-sm ${theme.text} hover:underline mt-1`}
            >
              @{exp.company} <span className="text-xs">↗</span>
            </a>
          </div>

          <button
            type="button"
            className="self-start sm:self-center text-xs font-mono text-muted group-hover:text-main flex items-center gap-1.5 bg-raised px-3 py-1.5 rounded-lg border border-line"
          >
            <span>{isExpanded ? "Hide Details" : "View Details"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="text-purple inline-block text-[10px]"
            >
              ▼
            </motion.span>
          </button>
        </div>

        <p className="text-muted text-sm leading-relaxed mt-3 font-body">{exp.summary}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] bg-raised border border-line text-main/90 px-2.5 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6 bg-void/50 space-y-3 border-t border-line/30">
              <span className="font-mono text-xs text-purple uppercase tracking-wider block">
                // Key Deliverables & Achievements
              </span>
              <ul className="space-y-2.5">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.2 }}
                    className="flex items-start gap-3 text-sm text-muted leading-relaxed font-body"
                  >
                    <span className={`font-mono ${theme.text} mt-0.5`}>&gt;</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceSection;