"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { skillGroups, SkillDetail } from "@/data/skills";

const getTabFileDetails = (label: string) => {
  switch (label.toLowerCase()) {
    case "backend":
      return { filename: "Backend.cs", ext: "C#" };
    case "databases":
      return { filename: "Databases.json", ext: "JSON" };
    case "frontend":
      return { filename: "Frontend.tsx", ext: "TSX" };
    default:
      return { filename: "Tools.config", ext: "ENV" };
  }
};

const AboutSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const currentGroup = skillGroups[activeTab];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSkill(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader path="/api/about" title="About Me" />

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 max-w-7xl mx-auto">
          <div className="md:w-3/5 text-muted leading-relaxed space-y-4 text-base text-justify">
            <p>
              I&apos;m a{" "}
              <a
                href="https://gakktechnology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Backend Engineer (.NET) at Gakk Media Ltd.
              </a>,
              focused on building reliable, secure, and business-driven backend systems. I work
              primarily with <span className="text-amber font-medium">ASP.NET Core, REST APIs, JWT/RBAC authentication,
              and SQL Server, MySQL &amp; PostgreSQL</span>.
            </p>
            <p>
              At{" "}
              <a
                href="https://gakktechnology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Gakk Media
              </a>{" "}
              I&apos;ve integrated <span className="text-amber font-medium">Pathao Pay, City Bank, and PayWall</span>,
              while developing CMS features for <span className="text-amber font-medium">products, vouchers, regions, partners,
              and catalogue operations</span>. Previously, I worked at{" "}
              <a
                href="https://snowtex.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Snowtex Group
              </a>{" "}
              and{" "}
              <a
                href="https://symphonysoftt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Symphony Softtech Ltd.
              </a>,
              building authentication, refresh-token flows, CAPTCHA protection, documentation systems,
              and payroll-related solutions.
            </p>
            <p>
              I&apos;m a <span className="text-amber font-medium"> Computer Science graduate </span> from{" "}
              <a
                href="https://www.aiub.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                AIUB
              </a>{" "}
              with a <span className="text-amber font-medium">CGPA of 3.87</span>,
              and I&apos;m interested in designing software that is secure, maintainable, scalable,
              and useful.
            </p>
          </div>
          <div className="md:w-2/5 flex items-center justify-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-xl overflow-hidden border border-line glow-purple">
              <Image
                src="/images/shihab2.jpg"
                alt="Md. Sikhul Islam Shihab"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 card-hover">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h3 className="font-cavolini text-xl font-bold text-main">
                BSc in Computer Science &amp; Engineering
              </h3>
              <span className="font-mono text-xs bg-raised border border-line text-green px-3 py-1 rounded-full w-fit">
                2022 — 2025
              </span>
            </div>
            <p className="text-purple font-medium mb-2">
              American International University-Bangladesh (AIUB)
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Focused on software engineering, web development and software requirement
              analysis. Graduated with a CGPA of{" "}
              <span className="text-amber font-semibold">3.87 / 4.00</span> and five Dean&apos;s
              Awards for academic excellence.
            </p>
          </div>
        </div>

        {/* Tech Stack IDE */}
        <div className="mt-20 max-w-5xl mx-auto px-2 sm:px-0">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-semibold tracking-widest text-amber uppercase bg-amber/10 border border-amber/20 px-3 py-1 rounded-full">
              // Capabilities
            </span>
            <h3 className="font-cavolini text-3xl sm:text-4xl font-bold text-main mt-3">
              Tech Stack &amp; Architecture
            </h3>
            <p className="text-muted text-sm mt-2 max-w-lg mx-auto">
              Interactive view of production-tested frameworks, databases, and tooling. Click any module to inspect.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="bg-void border-b border-line px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber/80" />
                <span className="w-3 h-3 rounded-full bg-muted/80" />
                <span className="w-3 h-3 rounded-full bg-green/80" />
                <span className="font-mono text-xs text-muted/60 ml-2 hidden sm:inline-block">
                  ~/capabilities/runtime
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="text-muted hidden sm:inline">Active Scope</span>
                <span className="text-xs bg-raised border border-line text-main px-2 py-0.5 rounded">
                  {currentGroup.items.length} Items Loaded
                </span>
              </div>
            </div>

            <div className="flex border-b border-line bg-void/50 overflow-x-auto scroll-thin">
              {skillGroups.map((group, index) => {
                const { filename, ext } = getTabFileDetails(group.label);
                const isActive = activeTab === index;

                return (
                  <button
                    key={group.label}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2.5 px-5 py-3 font-mono text-xs transition-all border-r border-line shrink-0 cursor-pointer relative ${
                      isActive
                        ? "bg-panel text-main font-medium border-t-2 border-t-purple"
                        : "text-muted hover:text-main hover:bg-raised/40"
                    }`}
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-raised border border-line ${group.color}`}>
                      {ext}
                    </span>
                    <span>{filename}</span>
                    {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple" />}
                  </button>
                );
              })}
            </div>

            <div className="p-6 sm:p-8 bg-panel relative grid-bg min-h-[320px]">
              <div className="font-mono text-xs sm:text-sm mb-6 flex items-center justify-between">
                <div>
                  <span className="text-purple">namespace</span>{" "}
                  <span className={`font-semibold ${currentGroup.color}`}>
                    System.SkillSet.{currentGroup.label.toUpperCase()}
                  </span>
                </div>
                <span className="text-muted/50 text-xs hidden sm:inline">// Click module to expand details</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {currentGroup.items.map((skill, skillIdx) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className="group text-left bg-raised/80 hover:bg-raised border border-line hover:border-purple rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple/10 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-mono text-[10px] text-muted/60 group-hover:text-purple transition-colors">
                        {String(skillIdx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-mono text-amber bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded">
                        {skill.experience}
                      </span>
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-main group-hover:text-purple transition-colors">
                      {skill.name}
                    </div>
                    <div className="mt-3 text-[10px] font-mono text-muted/70 flex items-center justify-between w-full">
                      <span>{skill.level}</span>
                      <span className="text-purple opacity-0 group-hover:opacity-100 transition-opacity">Inspect &amp;rarr;</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs sm:text-sm text-muted/60 mt-8 pt-4 border-t border-line/40 flex justify-between items-center">
                <span>{"}"} // namespace end</span>
                <span className="text-[11px] font-mono text-muted/40">UTF-8 • Runtime Ready</span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
                onClick={() => setSelectedSkill(null)}
              >
                <motion.div
                  key="modal-card"
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                  className="bg-panel border border-line rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-purple/20 relative"
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="skill-inspector-title"
                >
                  <div className="bg-void border-b border-line px-5 py-3 flex items-center justify-between">
                    <span id="skill-inspector-title" className="text-purple font-mono text-xs font-semibold">
                      // Skill Inspector
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(null)}
                      className="text-muted hover:text-main font-mono text-xs px-2 py-0.5 rounded hover:bg-raised transition-colors cursor-pointer"
                    >
                      [ESC] x
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-mono text-xl font-bold text-main">{selectedSkill.name}</h4>
                        <span className="inline-block mt-1 text-xs font-mono text-green bg-green/10 border border-green/20 px-2 py-0.5 rounded">
                          {selectedSkill.level}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-muted block">Experience</span>
                        <span className="text-sm font-mono text-amber font-semibold">{selectedSkill.experience}</span>
                      </div>
                    </div>
                    <div className="bg-raised border border-line rounded-lg p-3.5">
                      <p className="text-xs text-muted leading-relaxed font-body">{selectedSkill.description}</p>
                    </div>
                    {selectedSkill.keyProjects && selectedSkill.keyProjects.length > 0 && (
                      <div>
                        <span className="text-xs font-mono text-purple uppercase tracking-wider block mb-2">
                          // Applied Experience
                        </span>
                        <ul className="space-y-1.5">
                          {selectedSkill.keyProjects.map((project) => (
                            <li key={project} className="text-xs font-mono text-main bg-void border border-line/60 rounded px-2.5 py-1.5 flex items-center gap-2">
                              <span className="text-amber">&gt;</span> {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="bg-void border-t border-line px-6 py-3 flex justify-between items-center text-[11px] font-mono text-muted">
                    <span>Status: Production Verified</span>
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(null)}
                      className="bg-raised border border-line text-main hover:border-purple px-3 py-1 rounded transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
