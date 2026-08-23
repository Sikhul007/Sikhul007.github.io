import React from "react";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { experienceLogs } from "@/data/site";

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-line bg-void grid-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader path="/api/experience" title="Experience" />

        <div className="max-w-3xl mx-auto bg-panel border border-line rounded-xl overflow-hidden card-hover">
          <div className="flex items-center gap-2 px-4 py-3 bg-raised border-b border-line">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="font-mono text-xs text-muted ml-3">experience.log</span>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-main">
                  Software Engineer Intern
                </h3>
                <a
                  href="https://www.symphonysofttech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple font-medium hover:underline underline-offset-4 text-sm"
                >
                  Symphony Softtech Ltd. ↗
                </a>
              </div>
              <span className="font-mono text-xs bg-raised border border-line text-green px-3 py-1 rounded-full w-fit">
                Jul 2025 — Present
              </span>
            </div>
            <ul className="space-y-3">
              {experienceLogs.map((log, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="font-mono text-green flex-shrink-0 mt-0.5">[OK]</span>
                  <span>{log}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
